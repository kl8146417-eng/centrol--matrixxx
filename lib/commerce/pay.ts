// Payment providers (ported from server.mjs). Every provider is optional: with no keys the site runs in pay-later (invoice) mode.
import { createHmac, timingSafeEqual } from 'crypto';
import { agency } from '@/content/agency';
import { saveOrder, type Order } from './store';

const env = process.env;
export const payments = () => ({
  stripe: !!env.STRIPE_SECRET_KEY,
  razorpay: !!(env.RAZORPAY_KEY_ID && env.RAZORPAY_KEY_SECRET),
  invoice: env.ALLOW_INVOICE !== 'false' || !(env.STRIPE_SECRET_KEY || env.RAZORPAY_KEY_ID),
});
export const baseUrl = (req: Request) => env.PUBLIC_BASE_URL?.replace(/\/$/, '') || new URL(req.url).origin;
const safeEq = (a: string, b: string) => a.length === b.length && timingSafeEqual(Buffer.from(a), Buffer.from(b));
export const tokenOk = (o: Order | null, t: string | null): o is Order => !!o && typeof t === 'string' && safeEq(t, o.token);
export const addDays = (iso: string, d: number) => { const x = new Date(iso); x.setDate(x.getDate() + d); return x.toISOString(); };

export function publicOrder(o: Order) {
  const { token: _t, meta: _m, adminNotes: _a, ...rest } = o;
  return { ...rest, uploads: (o.uploads || []).map((u) => ({ name: u.name, size: u.size })) };
}

async function stripeCreate(o: Order, req: Request) {
  const base = baseUrl(req); const p = new URLSearchParams();
  p.append('mode', 'payment');
  p.append('success_url', `${base}/api/pay/stripe/return?order=${o.id}&t=${o.token}&session_id={CHECKOUT_SESSION_ID}`);
  p.append('cancel_url', `${base}/order/${o.id}?t=${o.token}&cancelled=1`);
  p.append('client_reference_id', o.id); p.append('customer_email', o.contact.email);
  p.append('metadata[orderId]', o.id); p.append('payment_intent_data[metadata][orderId]', o.id);
  p.append('payment_intent_data[description]', `${agency.agencyName} order ${o.id}`);
  o.items.forEach((l, i) => {
    p.append(`line_items[${i}][quantity]`, String(l.qty));
    p.append(`line_items[${i}][price_data][currency]`, 'usd');
    p.append(`line_items[${i}][price_data][unit_amount]`, String(Math.round(l.unit_usd * 100)));
    p.append(`line_items[${i}][price_data][product_data][name]`, l.billing === 'monthly' ? `${l.name} (first month)` : l.name);
  });
  const r = await fetch('https://api.stripe.com/v1/checkout/sessions', { method: 'POST', body: p, headers: { Authorization: `Bearer ${env.STRIPE_SECRET_KEY}`, 'Content-Type': 'application/x-www-form-urlencoded' } });
  const d = await r.json();
  if (!r.ok) throw new Error(`Stripe: ${d?.error?.message || r.status}`);
  return { sessionId: d.id as string, url: d.url as string };
}
export async function stripeVerify(id: string) {
  const r = await fetch(`https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(id)}`, { headers: { Authorization: `Bearer ${env.STRIPE_SECRET_KEY}` } });
  const d = await r.json();
  if (!r.ok) throw new Error(`Stripe: ${d?.error?.message || r.status}`);
  return d;
}
export function stripeWebhookValid(raw: string, header: string | null) {
  if (!env.STRIPE_WEBHOOK_SECRET || !header) return false;
  const parts = Object.fromEntries(header.split(',').map((kv) => kv.split('=')));
  const sig = createHmac('sha256', env.STRIPE_WEBHOOK_SECRET).update(`${parts.t}.${raw}`).digest('hex');
  const v1 = header.split(',').filter((s) => s.startsWith('v1=')).map((s) => s.slice(3));
  return Math.abs(Date.now() / 1000 - Number(parts.t)) < 600 && v1.some((v) => safeEq(v, sig));
}
const rzpAuth = () => 'Basic ' + Buffer.from(`${env.RAZORPAY_KEY_ID}:${env.RAZORPAY_KEY_SECRET}`).toString('base64');
async function razorpayCreate(o: Order, req: Request) {
  const body = {
    amount: Math.round(o.totals.total_usd * 100), currency: env.RAZORPAY_CURRENCY || 'USD', accept_partial: false, reference_id: o.id,
    description: `${agency.agencyName} order ${o.id}`,
    customer: { name: o.contact.name, email: o.contact.email, ...(o.contact.whatsapp ? { contact: o.contact.whatsapp.replace(/[^\d+]/g, '') } : {}) },
    notify: { email: true, sms: false }, reminder_enable: true, notes: { orderId: o.id },
    callback_url: `${baseUrl(req)}/api/pay/razorpay/callback?order=${o.id}&t=${o.token}`, callback_method: 'get',
  };
  const r = await fetch('https://api.razorpay.com/v1/payment_links', { method: 'POST', headers: { Authorization: rzpAuth(), 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  const d = await r.json();
  if (!r.ok) throw new Error(`Razorpay: ${d?.error?.description || r.status}`);
  return { linkId: d.id as string, url: d.short_url as string };
}
export function razorpaySigOk(q: URLSearchParams) {
  const payload = `${q.get('razorpay_payment_link_id')}|${q.get('razorpay_payment_link_reference_id')}|${q.get('razorpay_payment_link_status')}|${q.get('razorpay_payment_id')}`;
  const sig = createHmac('sha256', env.RAZORPAY_KEY_SECRET || '').update(payload).digest('hex');
  return safeEq(q.get('razorpay_signature') || '', sig);
}
export async function startPayment(o: Order, req: Request) {
  if (o.payment.mode === 'stripe') { const s = await stripeCreate(o, req); Object.assign(o.payment, { sessionId: s.sessionId, url: s.url, status: 'awaiting' }); }
  else if (o.payment.mode === 'razorpay') { if (!o.payment.linkId) Object.assign(o.payment, await razorpayCreate(o, req)); o.payment.status = 'awaiting'; }
  return o.payment.url ?? null;
}
export async function markPaid(o: Order, how: string, ref: string) {
  if (o.payment.status === 'paid') return o;
  Object.assign(o.payment, { status: 'paid', paidAt: new Date().toISOString(), reference: ref });
  if (o.status === 'New') o.status = 'Paid';
  o.estimatedDelivery = addDays(new Date().toISOString(), 1 + (o.etaDays || 0));
  o.history.push({ at: new Date().toISOString(), event: `Payment received via ${how}` });
  await saveOrder(o); notify(`Payment received for ${o.id} (${how})`, { id: o.id });
  return o;
}
export function notify(text: string, data: unknown) {
  if (!env.NOTIFY_WEBHOOK_URL) return;
  fetch(env.NOTIFY_WEBHOOK_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text, content: text, data }) }).catch(() => {});
}
// Admin auth reuses the existing blog token system (Bearer cm_… token).
export { authenticate } from '@/lib/auth/token';
