import { randomBytes, createHash } from 'crypto';
import { json, error } from '@/lib/http';
import { computeQuote } from '@/lib/pricing.mjs';
import { agency, services } from '@/content/agency';
import { saveOrder, uploads, type Order, type Upload } from '@/lib/commerce/store';
import { payments, startPayment, publicOrder, notify, addDays } from '@/lib/commerce/pay';
import { ALLOWED_EXT, MAX_FILES, MAX_TOTAL_MB } from '@/lib/commerce/limits';
import { rateLimit } from '@/lib/rate-limit';

export const dynamic = 'force-dynamic';
const str = (v: unknown, max = 2000) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

function newOrderId() {
  const d = new Date();
  const ymd = `${String(d.getFullYear()).slice(2)}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
  const a = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  return `${agency.orderPrefix}-${ymd}-${[...randomBytes(5)].map((b) => a[b % a.length]).join('')}`;
}

export async function POST(req: Request) {
  const ip = (req.headers.get('x-nf-client-connection-ip') || req.headers.get('x-forwarded-for') || '').split(',')[0].trim();
  if (!rateLimit(`order:${ip}`).allowed) return error(429, 'Too many orders from this address. Please try later or contact us.');
  let form: FormData;
  try { form = await req.formData(); } catch { return error(400, 'Expected multipart/form-data.'); }
  if (form.get('website_url')) return error(400, 'Rejected');
  let p: { items?: { id: string; qty: number }[]; brief?: Record<string, unknown>; contact?: Record<string, unknown>; paymentMethod?: string; currency?: string; acceptTerms?: boolean };
  try { p = JSON.parse(String(form.get('payload') || '{}')); } catch { return error(400, 'Invalid payload'); }

  const quote = computeQuote(p.items ?? [], services.filter((s) => !s.enquiry));
  if (!quote.lines.length || quote.total_usd <= 0) return error(400, 'Your cart is empty.');
  const b = p.brief || {}; const c = p.contact || {};
  const brief = { brandName: str(b.brandName, 120), website: str(b.website, 300), instagram: str(b.instagram, 200), productLinks: str(b.productLinks, 4000), targetAudience: str(b.targetAudience, 2000), references: str(b.references, 4000), deadline: str(b.deadline, 40), notes: str(b.notes, 6000) };
  const contact = { name: str(c.name, 120), email: str(c.email, 200).toLowerCase(), whatsapp: str(c.whatsapp, 40), country: str(c.country, 80), company: str(c.company, 160), billingAddress: str(c.billingAddress, 600), taxId: str(c.taxId, 60) };
  const errs: string[] = [];
  if (!brief.brandName) errs.push('Brand name is required.');
  if (!contact.name) errs.push('Your name is required.');
  if (!isEmail(contact.email)) errs.push('A valid email is required.');
  if (!contact.country) errs.push('Country is required.');
  if (!p.acceptTerms) errs.push('Please accept the terms.');
  if (errs.length) return error(422, errs.join(' '), { errors: errs });

  const files = form.getAll('files').filter((f): f is File => f instanceof File && f.size > 0);
  if (files.length > MAX_FILES) return error(413, `Max ${MAX_FILES} files.`);
  if (files.reduce((a, f) => a + f.size, 0) > MAX_TOTAL_MB * 1048576) return error(413, `Files total more than ${MAX_TOTAL_MB} MB. Send large files after ordering.`);
  for (const f of files) { const ext = '.' + (f.name.split('.').pop() || '').toLowerCase(); if (!ALLOWED_EXT.has(ext)) return error(415, `File type not allowed: ${f.name}`); }

  const pay = payments();
  let mode: string = p.paymentMethod && ['stripe', 'razorpay', 'invoice'].includes(p.paymentMethod) ? p.paymentMethod : 'invoice';
  if (!pay[mode as keyof typeof pay]) mode = pay.invoice ? 'invoice' : pay.stripe ? 'stripe' : 'razorpay';
  const cur = (p.currency && p.currency in agency.currencies ? p.currency : 'USD') as keyof typeof agency.currencies;
  const rate = agency.currencies[cur].rate;
  const id = newOrderId(); const now = new Date().toISOString();

  const stored: Upload[] = [];
  if (files.length) {
    try {
      const s = uploads();
      for (const [i, f] of files.entries()) {
        const name = f.name.replace(/[^\w.\- ()]+/g, '_').slice(-120) || 'file';
        const key = `${String(i + 1).padStart(2, '0')}-${name}`;
        await s.set(`${id}/${key}`, await f.arrayBuffer(), { metadata: { type: f.type, name } });
        stored.push({ name, stored: key, type: f.type, size: f.size });
      }
    } catch (e) { console.warn('[orders] upload storage failed', (e as Error).message); return error(503, 'File storage is unavailable. Place the order without files and send them by email.'); }
  }

  const order: Order = {
    id, token: randomBytes(18).toString('base64url'), createdAt: now, updatedAt: now, status: 'New',
    items: quote.lines, totals: { subtotal_usd: quote.subtotal_usd, total_usd: quote.total_usd },
    display: { currency: cur, rate, approxTotal: Math.round(quote.total_usd * rate) },
    etaDays: quote.etaDays, rush: quote.rush, hasMonthly: quote.hasMonthly, estimatedDelivery: addDays(now, 1 + quote.etaDays),
    brief, contact,
    payment: { mode, status: mode === 'invoice' ? 'invoice_pending' : 'awaiting', currency: 'USD', amount_usd: quote.total_usd },
    uploads: stored, history: [{ at: now, event: 'Order placed' }], adminNotes: '',
    meta: { ua: str(req.headers.get('user-agent'), 300), ipHash: createHash('sha256').update(ip).digest('hex').slice(0, 16) },
  };
  try { await saveOrder(order); } catch (e) { console.error('[orders] save failed', e); return error(500, 'Could not place the order. Please try again or email us.'); }
  notify(`New order ${id}: ${brief.brandName}, $${quote.total_usd} (${mode})`, publicOrder(order));
  let redirect: string | null = null; let paymentError: string | null = null;
  if (mode !== 'invoice') {
    try { redirect = await startPayment(order, req); await saveOrder(order); }
    catch (e) {
      paymentError = (e as Error).message;
      Object.assign(order.payment, { status: 'invoice_pending', error: paymentError });
      order.history.push({ at: new Date().toISOString(), event: 'Online payment unavailable, switched to invoice' });
      await saveOrder(order);
    }
  }
  return json({ id, token: order.token, redirect, paymentError }, 201);
}
