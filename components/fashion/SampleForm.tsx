'use client';
import { useState } from 'react';
import { attributionLine, track } from '@/lib/track';

type State = 'idle' | 'sending' | 'sent' | 'error';
const field = 'mt-2 w-full rounded-xl bg-white px-4 py-3 text-[16px] text-ink outline-none ring-1 ring-ink/10 transition focus:ring-2 focus:ring-accent';

/** "3 free looks" request. Posts to /api/contact so it lands in the same inbox and admin list. */
export function SampleForm({ brand = '', first = '' }: { brand?: string; first?: string }) {
  const [state, setState] = useState<State>('idle');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState('sending');
    const f = Object.fromEntries(new FormData(e.currentTarget).entries()) as Record<string, string>;
    const message = [
      'FREE SAMPLE REQUEST (3 looks)',
      `Brand: ${f.brand}`,
      `Store / Instagram: ${f.store}`,
      f.products ? `Products to use: ${f.products}` : '',
      f.whatsapp ? `WhatsApp: ${f.whatsapp}` : '',
    ].filter(Boolean).join('\n');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: f.name, email: f.email, company: f.brand, message, website: f.website, source: attributionLine() }),
      });
      if (!res.ok) throw new Error();
      track('sample_request', { brand: f.brand });
      setState('sent');
    } catch {
      setState('error');
    }
  }

  if (state === 'sent') {
    return (
      <div className="rounded-3xl bg-white p-8">
        <p className="font-display text-3xl text-ink">Got it. <span className="italic text-accent">Your looks are next.</span></p>
        <p className="mt-3 text-[16px] text-ink-soft">We&apos;ll pick three products from your store, make the looks and email you a private link within two working days. Nothing to pay, nothing to ship.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5 rounded-3xl bg-white/60 p-6 sm:p-8">
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-[14px] font-medium text-ink">Your name<input name="name" required defaultValue={first} className={field} autoComplete="name" /></label>
        <label className="block text-[14px] font-medium text-ink">Email<input name="email" type="email" required className={field} autoComplete="email" /></label>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-[14px] font-medium text-ink">Brand<input name="brand" required defaultValue={brand} className={field} autoComplete="organization" /></label>
        <label className="block text-[14px] font-medium text-ink">Store link or Instagram<input name="store" required placeholder="yourbrand.com or @yourbrand" className={field} /></label>
      </div>
      <label className="block text-[14px] font-medium text-ink">Which products? <span className="font-normal text-muted">(optional, we can pick)</span><input name="products" className={field} placeholder="Links or names of up to 3 products" /></label>
      <label className="block text-[14px] font-medium text-ink">WhatsApp <span className="font-normal text-muted">(optional, for a faster reply)</span><input name="whatsapp" type="tel" className={field} autoComplete="tel" /></label>
      <div className="flex flex-wrap items-center gap-4 pt-1">
        <button type="submit" disabled={state === 'sending'} className="rounded-full bg-accent px-7 py-3.5 text-[16px] font-semibold text-white transition hover:bg-accent-dark active:scale-[0.98] disabled:opacity-60">
          {state === 'sending' ? 'Sending…' : 'Send me 3 free looks'}
        </button>
        <p className="text-[14px] text-muted">No card, no call. One email with your looks.</p>
      </div>
      {state === 'error' && <p role="alert" className="text-[14px] text-red-700">That didn&apos;t send. Email contact@centrolmatrix.com or WhatsApp us instead.</p>}
    </form>
  );
}
