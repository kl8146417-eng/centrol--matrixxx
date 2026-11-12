'use client';

import { useState } from 'react';
import { attributionLine, track } from '@/lib/track';
import { fieldCls } from '@/components/audit/AuditForm';

type State = 'idle' | 'sending' | 'sent' | 'error';
const labelCls = 'block text-[15px] font-medium text-ink';

export function ContactForm({ service = '' }: { service?: string }) {
  const [state, setState] = useState<State>('idle');
  const [err, setErr] = useState<Record<string, string>>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState('sending');
    setErr({});
    const form = e.currentTarget;
    const f = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    const message = [service ? `Interested in: ${service}` : '', f.message].filter(Boolean).join('\n');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'contact', name: f.name, email: f.email, company: f.company, phone: f.phone, message, website: f.website, source: attributionLine() }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        setErr(j.fields || (j.error ? { _: j.error } : {}));
        throw new Error('Request failed');
      }
      track('contact_submit', { page: window.location.pathname });
      setState('sent');
      form.reset();
    } catch {
      setState('error');
    }
  }

  if (state === 'sent') {
    return (
      <div role="status" className="rounded-3xl bg-[#F4F4F2] p-7 sm:p-9">
        <p className="font-display text-3xl text-ink">Got it. <span className="italic text-accent">Asutosh will reply.</span></p>
        <p className="mt-3 text-[16px] text-ink-soft">Usually within one business day, by email.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5">
      <div aria-hidden="true" className="sr-only">
        <label>Leave this empty<input type="text" name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className={labelCls}>Your name<input name="name" required autoComplete="name" className={fieldCls} /></label>
        <label className={labelCls}>Email<input name="email" type="email" required autoComplete="email" inputMode="email" className={fieldCls} /></label>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className={labelCls}>Store or company <span className="font-normal text-muted">(optional)</span><input name="company" autoComplete="organization" placeholder="yourstore.com" className={fieldCls} /></label>
        <label className={labelCls}>Phone <span className="font-normal text-muted">(optional)</span><input name="phone" type="tel" autoComplete="tel" className={fieldCls} /></label>
      </div>
      <label className={labelCls}>What do you need?
        <textarea name="message" required minLength={10} rows={5} className={`${fieldCls} py-3`} placeholder="Product photos for 12 SKUs, a few UGC ads, help with a Shopify store…" />
        {err.message && <span className="mt-1 block text-[14px] text-red-700">{err.message}</span>}
      </label>
      <div className="flex flex-wrap items-center gap-4 pt-1">
        <button type="submit" disabled={state === 'sending'} className="inline-flex min-h-[52px] items-center rounded-full bg-accent px-8 text-[16px] font-semibold text-white transition hover:bg-accent-dark active:scale-[0.98] disabled:opacity-60">
          {state === 'sending' ? 'Sending…' : 'Send message'}
        </button>
        {state === 'error' && <span role="alert" className="text-[14px] text-red-700">{err._ || 'That didn’t send. Check the fields, or email contact@centrolmatrix.com.'}</span>}
      </div>
    </form>
  );
}
