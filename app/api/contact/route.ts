import { z } from 'zod';
import { json, error } from '@/lib/http';
import { site } from '@/content/site';
import { saveContact } from '@/lib/commerce/store';
import { rateLimit, clientIp } from '@/lib/rate-limit';
import { cleanSite } from '@/lib/personalize';

export const dynamic = 'force-dynamic';

// One endpoint for every public form: general contact, the free store audit (/audit) and the
// fashion "3 free looks" sample request. Everything lands in the Neon `contacts` table
// (Netlify Blobs fallback) and is emailed through Resend only when RESEND_API_KEY is set.
const contactSchema = z
  .object({
    type: z.enum(['contact', 'audit', 'sample']).default('contact'),
    name: z.string().trim().min(1).max(120),
    email: z.string().trim().email().max(200),
    company: z.string().trim().max(160).optional(),
    site: z.string().trim().max(200).optional(),
    phone: z.string().trim().max(40).optional(),
    message: z.string().trim().max(4000).optional().default(''),
    // First-touch attribution (utm/ref/landing page), set client-side.
    source: z.string().max(600).optional(),
    // Honeypot: real users never see or fill this field.
    website: z.string().max(200).optional(),
  })
  .superRefine((d, ctx) => {
    if (d.type === 'contact' && d.message.length < 10)
      ctx.addIssue({ code: 'custom', path: ['message'], message: 'Tell us a little more (10 characters or more).' });
    if (d.type === 'audit' && !cleanSite(d.site))
      ctx.addIssue({ code: 'custom', path: ['site'], message: 'Enter your store address, like yourstore.com.' });
  });

const LIMIT = 5; // submissions per IP...
const WINDOW_MS = 10 * 60_000; // ...per 10 minutes

export async function POST(req: Request) {
  const ip = clientIp(req);
  const limited = rateLimit(`contact:${ip}`, LIMIT, WINDOW_MS);
  if (!limited.allowed) return error(429, 'Too many messages from this connection. Please wait a few minutes, or email us directly.', { retryAfter: limited.retryAfter });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return error(400, 'Invalid JSON body.');
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    const fields: Record<string, string> = {};
    for (const i of parsed.error.issues) fields[i.path.join('.') || '_'] ??= i.message;
    return error(422, 'Please check the form fields.', { fields });
  }
  const d = parsed.data;

  // Honeypot tripped: pretend success, drop silently.
  if (d.website) return json({ ok: true });

  const store = cleanSite(d.site);
  const heading = d.type === 'audit' ? 'FREE STORE AUDIT REQUEST' : '';
  const message = [
    heading,
    d.type === 'audit' ? `Store: ${store}` : '',
    d.type === 'audit' && d.site && d.site !== store ? `Store (as typed): ${d.site}` : '',
    d.phone ? `Phone: ${d.phone}` : '',
    d.type === 'audit' ? (d.message ? `Notes: ${d.message}` : 'Notes: (none)') : d.message,
    d.source ? `\n[source] ${d.source}` : '',
  ].filter(Boolean).join('\n');

  // Save first, so the request is kept even when email isn't configured or Resend fails.
  await saveContact({ name: d.name, email: d.email, company: d.company || (store || undefined), whatsapp: d.phone, message, meta: { type: d.type, ...(store ? { site: store } : {}) } });

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.info('[contact] saved (no RESEND_API_KEY):', { type: d.type, name: d.name, site: store || undefined });
    return json({ ok: true, delivered: false });
  }

  const subject =
    d.type === 'audit' ? `Free audit request: ${store} (${d.name})`
    : d.type === 'sample' ? `Free looks request from ${d.name}${d.company ? ` (${d.company})` : ''}`
    : `New project inquiry from ${d.name}${d.company ? ` (${d.company})` : ''}`;
  try {
    const { Resend } = await import('resend');
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: `${site.name} <noreply@centrolmatrix.com>`,
      to: process.env.CONTACT_TO_EMAIL ?? site.email,
      reply_to: d.email,
      subject,
      text: `From: ${d.name} <${d.email}>\nCompany: ${d.company || '-'}\nType: ${d.type}\n\n${message}`,
    });
    return json({ ok: true, delivered: true });
  } catch (e) {
    // The message is already saved in the admin inbox; don't make the visitor retry.
    console.error('[contact] saved but email failed:', e instanceof Error ? e.message : e);
    return json({ ok: true, delivered: false });
  }
}
