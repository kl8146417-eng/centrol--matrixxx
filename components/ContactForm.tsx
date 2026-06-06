'use client';

import { useState } from 'react';

type State = 'idle' | 'sending' | 'sent' | 'error';

export function ContactForm() {
  const [state, setState] = useState<State>('idle');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState('sending');
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Request failed');
      setState('sent');
      form.reset();
    } catch {
      setState('error');
    }
  }

  if (state === 'sent') {
    return (
      <div className="border-t border-ink/10 pt-10">
        <p className="font-display text-3xl text-ink">
          Got it. <span className="italic text-accent">We&apos;ll be in touch.</span>
        </p>
        <p className="mt-3 text-[15px] text-muted">
          Usually within a day or two. If it&apos;s urgent, just email us directly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-6">
      {/* honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden
      />

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Your name" name="name" required />
        <Field label="Email" name="email" type="email" required />
      </div>
      <Field label="Company (optional)" name="company" />

      <label className="block">
        <span className="text-[13px] uppercase tracking-wordmark text-muted">
          What do you want to build?
        </span>
        <textarea
          name="message"
          required
          minLength={10}
          rows={5}
          className="mt-3 w-full border-b border-ink/20 bg-transparent pb-2 text-[17px] text-ink outline-none transition-colors focus:border-accent"
        />
      </label>

      <div className="flex flex-wrap items-center gap-4 pt-2">
        <button
          type="submit"
          disabled={state === 'sending'}
          className="rounded-full bg-accent px-6 py-3.5 text-[15px] font-semibold text-white transition-[transform,background-color] duration-200 hover:bg-accent-dark hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60"
        >
          {state === 'sending' ? 'Sending…' : 'Send it over'}
        </button>
        {state === 'error' && (
          <span className="text-[14px] text-accent">
            Something broke. Try again or email us.
          </span>
        )}
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = 'text',
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-[13px] uppercase tracking-wordmark text-muted">{label}</span>
      <input
        type={type}
        name={name}
        required={required}
        className="mt-3 w-full border-b border-ink/20 bg-transparent pb-2 text-[17px] text-ink outline-none transition-colors focus:border-accent"
      />
    </label>
  );
}
