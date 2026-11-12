'use client';
import { useState } from 'react';
import { attributionLine, track } from '@/lib/track';
import { AUDIT_TURNAROUND } from '@/content/audit';

type State = 'idle' | 'sending' | 'sent' | 'error';
export const fieldCls = 'mt-2 block min-h-[52px] w-full rounded-xl bg-white px-4 text-[16px] text-ink outline-none ring-1 ring-ink/15 transition placeholder:text-ink/35 focus:ring-2 focus:ring-accent';
const labelCls = 'block text-[15px] font-medium text-ink';

/** The free store audit request. Posts to /api/contact with type "audit" (lands in the admin inbox). */
export function AuditForm({ first = '', site = '', dark = false }: { first?: string; site?: string; dark?: boolean }) {
  const [state, setState] = useState<State>('idle');
  const [name, setName] = useState('');
  const [err, setErr] = useState<Record<string, string>>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState('sending');
    setErr({});
    const f = Object.fromEntries(new FormData(e.currentTarget).entries()) as Record<string, string>;
    try {
      const res = await fetch('/api/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'audit', name: f.name, email: f.email, site: f.site, message: f.notes, website: f.website, source: attributionLine() }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        if (j.fields) setErr(j.fields);
        if (res.status === 429) setErr({ _: j.error });
        throw new Error();
      }
      track('audit_request', { site: f.site });
      setName(f.name.split(' ')[0] || '');
      setState('sent');
    } catch {
      setState('error');
    }
  }

  if (state === 'sent') {
    return (
      <div role="status" className="rounded-3xl bg-white p-7 sm:p-9">
        <p className="font-display text-[clamp(28px,3vw,36px)] leading-tight text-ink">Thanks{name ? `, ${name}` : ''}. <span className="italic text-accent">It’s on the list.</span></p>
        <p className="mt-3 text-[16px] leading-relaxed text-ink-soft">Asutosh will email your report within {AUDIT_TURNAROUND}. Nothing to pay, and nobody needs access to your store.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={`grid gap-5 rounded-3xl p-6 sm:p-8 ${dark ? 'bg-white' : 'bg-white/70 ring-1 ring-ink/5'}`}>
      <div aria-hidden="true" className="sr-only">
        <label>Leave this empty<input type="text" name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className={labelCls}>First name
          <input name="name" required defaultValue={first} autoComplete="given-name" className={fieldCls} aria-invalid={!!err.name} />
        </label>
        <label className={labelCls}>Email
          <input name="email" type="email" required autoComplete="email" inputMode="email" className={fieldCls} aria-invalid={!!err.email} />
          {err.email && <span className="mt-1 block text-[14px] text-red-700">Check the email address.</span>}
        </label>
      </div>
      <label className={labelCls}>Store URL
        <input name="site" required defaultValue={site} placeholder="yourstore.com" autoComplete="url" inputMode="url" autoCapitalize="none" spellCheck={false} className={fieldCls} aria-invalid={!!err.site} />
        {err.site && <span className="mt-1 block text-[14px] text-red-700">{err.site}</span>}
      </label>
      <label className={labelCls}>Anything else? <span className="font-normal text-muted">(optional)</span>
        <textarea name="notes" rows={3} placeholder="A page you’re worried about, where you sell (Shopify, Amazon), anything we should know." className={`${fieldCls} py-3`} />
      </label>
      <div className="flex flex-col items-start gap-3 pt-1 sm:flex-row sm:items-center sm:gap-5">
        <button type="submit" disabled={state === 'sending'} className="inline-flex min-h-[52px] items-center rounded-full bg-accent px-8 text-[16px] font-semibold text-white transition hover:bg-accent-dark active:scale-[0.98] disabled:opacity-60">
          {state === 'sending' ? 'Sending…' : 'Get my free audit'}
        </button>
        <p className="text-[14px] text-muted">No card, no call, no store login.</p>
      </div>
      {state === 'error' && (
        <p role="alert" className="text-[14px] text-red-700">{err._ || 'That didn’t send. Check the fields above, or email contact@centrolmatrix.com with your store link.'}</p>
      )}
    </form>
  );
}
