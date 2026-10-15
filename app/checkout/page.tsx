'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useCart } from '@/lib/cart';
import { AddonPicker, CartLines, Totals } from '@/components/CartDrawer';
import { otherCountries, priorityCountries } from '@/content/countries';
import { agency } from '@/content/agency';
import { track } from '@/lib/track';

type Pay = { stripe: boolean; razorpay: boolean; invoice: boolean };
interface Cfg { payments: Pay; maxUploadMb: number; maxFiles: number; allowed: string[] }
const BRIEF = { brandName: '', website: '', instagram: '', productLinks: '', targetAudience: '', references: '', deadline: '', notes: '' };
const CONTACT = { name: '', email: '', whatsapp: '', country: '', company: '', billingAddress: '', taxId: '' };
const STEPS = ['Order', 'Brief', 'Details', 'Review & pay'];
const DRAFT = 'cmx.checkout';
const input = 'mt-1.5 w-full rounded-xl border border-ink/15 bg-bg px-4 py-3 text-[15px] outline-none focus:border-accent';
const fmtSize = (n: number) => (n > 1048576 ? `${(n / 1048576).toFixed(1)} MB` : `${Math.max(1, Math.round(n / 1024))} KB`);

function Field({ label, id, error, hint, optional, children }: { label: string; id: string; error?: string; hint?: string; optional?: boolean; children: ReactNode }) {
  return (
    <div className="mb-5">
      <label htmlFor={id} className="text-[14px] font-medium text-ink">{label}{optional ? <span className="font-normal text-muted"> (optional)</span> : <span className="text-accent"> *</span>}</label>
      {children}
      {hint && !error && <p className="mt-1 text-[13px] text-muted">{hint}</p>}
      {error && <p className="mt-1 text-[13px] text-red-700" role="alert">{error}</p>}
    </div>
  );
}

export default function CheckoutPage() {
  const { quote, items, money, clear, currency, ready } = useCart();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [brief, setBrief] = useState(BRIEF);
  const [contact, setContact] = useState(CONTACT);
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [method, setMethod] = useState<'invoice' | 'stripe' | 'razorpay'>('invoice');
  const [accept, setAccept] = useState(false);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);
  const [submitErr, setSubmitErr] = useState('');
  const [cfg, setCfg] = useState<Cfg | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const hp = useRef<HTMLInputElement>(null);
  const pay = cfg?.payments || { stripe: false, razorpay: false, invoice: true };
  const online = pay.stripe || pay.razorpay;
  const hasPackage = quote.lines.some((l) => l.category !== 'addon');

  useEffect(() => {
    try { const d = JSON.parse(localStorage.getItem(DRAFT) || '{}'); if (d.brief) setBrief({ ...BRIEF, ...d.brief }); if (d.contact) setContact({ ...CONTACT, ...d.contact }); } catch { /* */ }
    track('checkout_start');
    fetch('/api/config').then((r) => r.json()).then((c: Cfg) => { setCfg(c); setMethod(c.payments.stripe ? 'stripe' : c.payments.razorpay ? 'razorpay' : 'invoice'); }).catch(() => {});
  }, []);
  useEffect(() => { localStorage.setItem(DRAFT, JSON.stringify({ brief, contact })); }, [brief, contact]);
  useEffect(() => { if (ready && step > 1 && !hasPackage && !busy) setStep(1); }, [ready, step, hasPackage, busy]);
  const go = (n: number) => { setStep(n); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  const b = (k: keyof typeof BRIEF) => ({ id: `b-${k}`, value: brief[k], className: input, 'aria-invalid': !!errors[k] || undefined, onChange: (e: { target: { value: string } }) => setBrief({ ...brief, [k]: e.target.value }) });
  const c = (k: keyof typeof CONTACT) => ({ id: `c-${k}`, value: contact[k], className: input, 'aria-invalid': !!errors[k] || undefined, onChange: (e: { target: { value: string } }) => setContact({ ...contact, [k]: e.target.value }) });

  function addFiles(list: FileList | null) {
    if (!list) return;
    const maxMb = cfg?.maxUploadMb || 5; const maxN = cfg?.maxFiles || 10; const allowed = cfg?.allowed || [];
    const next = [...files]; const errs: string[] = [];
    for (const f of Array.from(list)) {
      const ext = '.' + (f.name.split('.').pop() || '').toLowerCase();
      if (allowed.length && !allowed.includes(ext)) { errs.push(`${f.name}: file type not supported`); continue; }
      if (next.reduce((a, x) => a + x.size, 0) + f.size > maxMb * 1048576) { errs.push(`${f.name}: uploads are limited to ${maxMb} MB in total. Send bigger files after ordering.`); continue; }
      if (next.length >= maxN) { errs.push(`Max ${maxN} files.`); break; }
      if (!next.some((x) => x.name === f.name && x.size === f.size)) next.push(f);
    }
    setFiles(next); setErrors((e) => ({ ...e, files: errs.join(' · ') }));
  }

  function validate(s: number) {
    const e: Record<string, string> = {};
    if (s === 2 && !brief.brandName.trim()) e.brandName = 'Please tell us your brand name.';
    if (s === 3) {
      if (!contact.name.trim()) e.name = 'Please enter your name.';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(contact.email.trim())) e.email = 'Please enter a valid email. We send your order updates here.';
      if (!contact.country) e.country = 'Please choose your country.';
      if (contact.whatsapp && !/^\+?[\d\s()-]{7,20}$/.test(contact.whatsapp)) e.whatsapp = 'Include the country code, e.g. +1 555 123 4567.';
    }
    if (s === 4 && !accept) e.accept = 'Please accept the terms to place your order.';
    setErrors(e);
    return !Object.keys(e).length;
  }
  const next = (s: number) => (e: React.FormEvent) => { e.preventDefault(); if (validate(s)) go(s + 1); };

  function placeOrder(e: React.FormEvent) {
    e.preventDefault();
    if (!validate(4) || busy) return;
    setBusy(true); setSubmitErr(''); setProgress(0);
    const fd = new FormData();
    fd.append('payload', JSON.stringify({ items, brief, contact, currency, paymentMethod: method, acceptTerms: accept }));
    if (hp.current?.value) fd.append('website_url', hp.current.value);
    files.forEach((f) => fd.append('files', f, f.name));
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/orders');
    xhr.upload.onprogress = (ev) => ev.lengthComputable && setProgress(Math.round((ev.loaded / ev.total) * 100));
    xhr.onload = () => {
      let r: { id?: string; token?: string; redirect?: string; error?: string; paymentError?: string } = {};
      try { r = JSON.parse(xhr.responseText); } catch { /* */ }
      if (xhr.status === 201 && r.id) {
        clear(); localStorage.removeItem(DRAFT);
        if (r.redirect) { window.location.href = r.redirect; return; }
        router.push(`/order/${r.id}?t=${r.token}${r.paymentError ? '&payfail=1' : ''}`);
      } else { setBusy(false); setSubmitErr(r.error || `Something went wrong (${xhr.status}). Please try again or email ${agency.email}.`); }
    };
    xhr.onerror = () => { setBusy(false); setSubmitErr(`Network error. Please try again, or email ${agency.email}.`); };
    xhr.send(fd);
  }

  const btn = 'rounded-full bg-ink px-7 py-3.5 text-[15px] font-semibold text-white hover:opacity-85 disabled:opacity-50';
  const back = 'text-[14px] text-muted underline';
  return (
    <div className="mx-auto max-w-editorial px-5 pb-24 pt-28 sm:px-8 sm:pt-36">
      <h1 className="font-display text-display-md text-ink">Checkout</h1>
      <ol className="mt-6 flex flex-wrap gap-2" aria-label="Checkout progress">
        {STEPS.map((s, i) => (
          <li key={s} aria-current={i + 1 === step ? 'step' : undefined}>
            <button type="button" disabled={i + 1 > step || busy} onClick={() => go(i + 1)} className={`rounded-full px-4 py-1.5 text-[13px] ${i + 1 === step ? 'bg-accent text-white' : i + 1 < step ? 'bg-ink/10 text-ink' : 'border border-ink/10 text-muted'}`}>{i + 1}. {s}</button>
          </li>
        ))}
      </ol>

      <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_380px]">
        <div>
          {step === 1 && (
            <section>
              <h2 className="font-display text-3xl text-ink">Your order</h2>
              <div className="mt-4"><CartLines /></div>
              {hasPackage ? <AddonPicker /> : <p className="mt-4"><Link href="/pricing" className="text-accent underline">Browse packages</Link> to get started.</p>}
              <div className="mt-8 flex justify-end"><button type="button" className={btn} disabled={!hasPackage} onClick={() => go(2)}>Continue to brief</button></div>
            </section>
          )}
          {step === 2 && (
            <form onSubmit={next(2)} noValidate>
              <h2 className="mb-6 font-display text-3xl text-ink">Project brief</h2>
              <Field label="Brand name" id="b-brandName" error={errors.brandName}><input {...b('brandName')} /></Field>
              <div className="grid gap-x-5 sm:grid-cols-2">
                <Field label="Website" id="b-website" optional><input {...b('website')} placeholder="yourbrand.com" /></Field>
                <Field label="Instagram / TikTok" id="b-instagram" optional><input {...b('instagram')} /></Field>
              </div>
              <Field label="Product links" id="b-productLinks" optional hint="One per line."><textarea {...b('productLinks')} rows={3} /></Field>
              <Field label="Deadline" id="b-deadline" optional><input {...b('deadline')} type="date" /></Field>
              <div className="mb-5">
                <p className="text-[14px] font-medium text-ink">Files <span className="font-normal text-muted">(optional)</span></p>
                <div className="mt-1.5 rounded-xl border border-dashed border-ink/25 p-6 text-center text-[14px]" onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); addFiles(e.dataTransfer.files); }}>
                  <p><strong>Drag &amp; drop</strong> or <button type="button" className="text-accent underline" onClick={() => fileInput.current?.click()}>browse</button></p>
                  <p className="mt-1 text-[12px] text-muted">Photos, logos, PDFs. Up to {cfg?.maxFiles || 10} files, {cfg?.maxUploadMb || 5} MB in total. Larger files can be sent after ordering.</p>
                  <input ref={fileInput} type="file" multiple className="sr-only" accept={(cfg?.allowed || []).join(',')} onChange={(e) => { addFiles(e.target.files); e.target.value = ''; }} />
                </div>
                {errors.files && <p className="mt-1 text-[13px] text-red-700">{errors.files}</p>}
                {files.length > 0 && (
                  <ul className="mt-3 space-y-1 text-[14px]">
                    {files.map((f, i) => <li key={f.name + f.size} className="flex justify-between"><span>{f.name} <span className="text-muted">({fmtSize(f.size)})</span></span><button type="button" className="text-muted underline" onClick={() => setFiles(files.filter((_, j) => j !== i))}>Remove</button></li>)}
                  </ul>
                )}
              </div>
              <Field label="Target audience" id="b-targetAudience" optional><textarea {...b('targetAudience')} rows={2} /></Field>
              <Field label="References you love" id="b-references" optional><textarea {...b('references')} rows={2} /></Field>
              <Field label="Anything else?" id="b-notes" optional><textarea {...b('notes')} rows={3} /></Field>
              <div className="flex items-center justify-between"><button type="button" className={back} onClick={() => go(1)}>← Back</button><button className={btn}>Continue to details</button></div>
            </form>
          )}
          {step === 3 && (
            <form onSubmit={next(3)} noValidate>
              <h2 className="mb-6 font-display text-3xl text-ink">Contact &amp; billing</h2>
              <div className="grid gap-x-5 sm:grid-cols-2">
                <Field label="Full name" id="c-name" error={errors.name}><input {...c('name')} autoComplete="name" /></Field>
                <Field label="Email" id="c-email" error={errors.email}><input {...c('email')} type="email" autoComplete="email" /></Field>
                <Field label="WhatsApp" id="c-whatsapp" optional error={errors.whatsapp}><input {...c('whatsapp')} type="tel" placeholder="+1 555 123 4567" /></Field>
                <Field label="Country" id="c-country" error={errors.country}>
                  <select {...c('country')}>
                    <option value="">Select…</option>
                    <optgroup label="Common">{priorityCountries.map((x) => <option key={x}>{x}</option>)}</optgroup>
                    <optgroup label="All others">{otherCountries.map((x) => <option key={x}>{x}</option>)}</optgroup>
                  </select>
                </Field>
                <Field label="Company / legal name" id="c-company" optional><input {...c('company')} /></Field>
                <Field label="VAT / Tax ID" id="c-taxId" optional><input {...c('taxId')} /></Field>
              </div>
              <Field label="Billing address" id="c-billingAddress" optional><textarea {...c('billingAddress')} rows={2} /></Field>
              <input ref={hp} type="text" name="website_url" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
              <div className="flex items-center justify-between"><button type="button" className={back} onClick={() => go(2)}>← Back</button><button className={btn}>Review order</button></div>
            </form>
          )}
          {step === 4 && (
            <form onSubmit={placeOrder} noValidate>
              <h2 className="font-display text-3xl text-ink">Review &amp; pay</h2>
              <div className="mt-4"><CartLines editable={false} /></div>
              <dl className="mt-4 grid grid-cols-[120px_1fr] gap-y-1 text-[14px]">
                <dt className="text-muted">Brand</dt><dd>{brief.brandName}</dd>
                <dt className="text-muted">Contact</dt><dd>{contact.name} · {contact.email}</dd>
                <dt className="text-muted">Country</dt><dd>{contact.country}</dd>
                <dt className="text-muted">Files</dt><dd>{files.length ? `${files.length} (${fmtSize(files.reduce((a, f) => a + f.size, 0))})` : 'None yet'}</dd>
              </dl>
              <fieldset className="mt-8 space-y-3">
                <legend className="mb-3 font-medium text-ink">Payment</legend>
                {pay.stripe && <label className="flex gap-3 rounded-xl border border-ink/15 p-4"><input type="radio" checked={method === 'stripe'} onChange={() => setMethod('stripe')} /><span><strong>Card, Apple Pay, Google Pay</strong><br /><small className="text-muted">Secure Stripe Checkout, billed in USD</small></span></label>}
                {pay.razorpay && <label className="flex gap-3 rounded-xl border border-ink/15 p-4"><input type="radio" checked={method === 'razorpay'} onChange={() => setMethod('razorpay')} /><span><strong>Razorpay</strong><br /><small className="text-muted">International cards and more, billed in USD</small></span></label>}
                {pay.invoice && <label className="flex gap-3 rounded-xl border border-ink/15 p-4"><input type="radio" checked={method === 'invoice'} onChange={() => setMethod('invoice')} /><span><strong>Pay later: invoice / payment link</strong><br /><small className="text-muted">Place your order now. We email a secure payment link within 1 business day. Work starts once it&apos;s paid.</small></span></label>}
                {!online && <p className="rounded-xl bg-ink/5 p-4 text-[14px]">No charge is made today. Your payment link is emailed to {contact.email || 'you'}.</p>}
              </fieldset>
              <label className="mt-6 flex gap-3 text-[14px]">
                <input type="checkbox" checked={accept} onChange={(e) => setAccept(e.target.checked)} />
                <span>I agree to the <Link href="/terms" target="_blank" className="underline">Terms</Link>, <Link href="/refunds" target="_blank" className="underline">Refund policy</Link> and <Link href="/privacy" target="_blank" className="underline">Privacy policy</Link>.</span>
              </label>
              {errors.accept && <p className="mt-1 text-[13px] text-red-700" role="alert">{errors.accept}</p>}
              {submitErr && <p className="mt-4 rounded-xl bg-red-50 p-4 text-[14px] text-red-800" role="alert">{submitErr}</p>}
              <button className="mt-6 w-full rounded-full bg-accent px-7 py-4 text-[16px] font-semibold text-white hover:bg-accent-dark disabled:opacity-60" disabled={busy}>
                {busy ? (files.length && progress < 100 ? `Uploading… ${progress}%` : 'Placing order…') : method === 'invoice' ? `Place order · ${money(quote.total_usd)}` : `Pay ${money(quote.total_usd)}`}
              </button>
              <div className="mt-4"><button type="button" className={back} onClick={() => go(3)} disabled={busy}>← Back</button></div>
            </form>
          )}
        </div>
        <aside className="h-fit rounded-2xl border border-ink/10 p-6 lg:sticky lg:top-24" aria-label="Order summary">
          <h2 className="font-display text-2xl text-ink">Summary</h2>
          <ul className="mt-3 space-y-1 text-[14px]">
            {quote.lines.filter((l) => l.category !== 'addon').map((l) => <li key={l.id} className="flex justify-between gap-3"><span>{l.name}{l.qty > 1 ? ` × ${l.qty}` : ''}</span><span>{money(l.total_usd)}</span></li>)}
          </ul>
          <div className="mt-4"><Totals /></div>
          <ul className="mt-4 space-y-1 text-[13px] text-muted"><li>✓ Fixed price, no hidden fees</li><li>✓ Revisions included</li><li>✓ Full refund before production starts</li></ul>
        </aside>
      </div>
    </div>
  );
}
