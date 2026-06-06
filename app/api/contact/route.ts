import { z } from 'zod';
import { json, error } from '@/lib/http';
import { site } from '@/content/site';

export const dynamic = 'force-dynamic';

const contactSchema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email(),
  company: z.string().max(160).optional(),
  message: z.string().min(10).max(4000),
  // Honeypot: real users leave this empty.
  website: z.string().max(0).optional(),
});

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return error(400, 'Invalid JSON body.');
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) return error(422, 'Please check the form fields.');

  // Honeypot tripped — pretend success, drop silently.
  if (parsed.data.website) return json({ ok: true });

  const { name, email, company, message } = parsed.data;
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? site.email;

  // If email isn't configured yet, accept the submission so the form works in
  // dev/preview. (Wire RESEND_API_KEY to actually deliver.)
  if (!apiKey) {
    console.info('[contact] (no RESEND_API_KEY) submission:', { name, email, company });
    return json({ ok: true, delivered: false });
  }

  try {
    const { Resend } = await import('resend');
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: `${site.name} <noreply@centrolmatrix.com>`,
      to,
      reply_to: email,
      subject: `New project inquiry from ${name}${company ? ` (${company})` : ''}`,
      text: `From: ${name} <${email}>\nCompany: ${company ?? '—'}\n\n${message}`,
    });
    return json({ ok: true, delivered: true });
  } catch (e) {
    return error(500, e instanceof Error ? e.message : 'Failed to send message.');
  }
}
