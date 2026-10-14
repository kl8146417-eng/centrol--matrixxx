'use client';
import Link from 'next/link';
import { useEffect } from 'react';
import { useCart } from '@/lib/cart';
import { addons, agency, serviceById, type Currency } from '@/content/agency';

export function CartButton() {
  const { count, setDrawer } = useCart();
  return (
    <button type="button" onClick={() => setDrawer(true)} aria-label={`Cart, ${count} items`} className="relative flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-ink transition-opacity hover:opacity-70">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M6 7h12l-1 13H7L6 7Z" /><path d="M9 7a3 3 0 0 1 6 0" /></svg>
      {count > 0 && <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[11px] font-semibold text-white">{count}</span>}
    </button>
  );
}

export function CurrencySwitch() {
  const { currency, setCurrency } = useCart();
  return (
    <select aria-label="Currency" value={currency} onChange={(e) => setCurrency(e.target.value as Currency)} className="rounded-full border border-ink/15 bg-bg px-3 py-1.5 text-[13px]">
      {Object.keys(agency.currencies).map((c) => <option key={c}>{c}</option>)}
    </select>
  );
}

export function CartLines({ editable = true }: { editable?: boolean }) {
  const { quote, setQty, remove, money } = useCart();
  if (!quote.lines.length) return <p className="text-[15px] text-muted">Your cart is empty.</p>;
  return (
    <ul className="divide-y divide-ink/10">
      {quote.lines.map((l) => (
        <li key={l.id} className="flex items-start justify-between gap-4 py-4">
          <div>
            <p className="font-medium text-ink">{l.name}</p>
            <p className="text-[13px] text-muted">{l.note || (l.billing === 'monthly' ? 'Billed monthly' : serviceById(l.id)?.turnaround_days ? `${serviceById(l.id)?.turnaround_days} day turnaround` : '')}</p>
            {editable && (
              <div className="mt-2 flex items-center gap-3 text-[13px]">
                {l.category !== 'addon' && !l.note && (
                  <span className="inline-flex items-center rounded-full border border-ink/15">
                    <button type="button" className="px-2.5 py-0.5" aria-label="Decrease" onClick={() => setQty(l.id, l.qty - 1)}>−</button>
                    <span aria-live="polite">{l.qty}</span>
                    <button type="button" className="px-2.5 py-0.5" aria-label="Increase" onClick={() => setQty(l.id, l.qty + 1)}>+</button>
                  </span>
                )}
                <button type="button" className="text-muted underline" onClick={() => remove(l.id)}>Remove</button>
              </div>
            )}
          </div>
          <p className="whitespace-nowrap font-medium">{money(l.total_usd)}{l.billing === 'monthly' ? '/mo' : ''}</p>
        </li>
      ))}
    </ul>
  );
}

export function Totals() {
  const { quote, money, currency } = useCart();
  return (
    <div className="border-t border-ink/10 pt-4 text-[15px]">
      {quote.warnings.map((w) => <p key={w} className="mb-2 text-[13px] text-red-700">{w}</p>)}
      <div className="flex justify-between font-semibold text-ink"><span>Total</span><span>{money(quote.total_usd)}</span></div>
      {quote.etaDays > 0 && <p className="mt-1 text-[13px] text-muted">Estimated delivery: about {quote.etaDays} days{quote.rush ? ' (rush)' : ''}</p>}
      {currency !== 'USD' && <p className="mt-1 text-[12px] text-muted">Billed in USD (${quote.total_usd.toLocaleString('en-US')}).</p>}
    </div>
  );
}

export function AddonPicker() {
  const { has, add, remove, money } = useCart();
  return (
    <div className="mt-6">
      <p className="text-[12px] uppercase tracking-wordmark text-muted">Add-ons</p>
      <ul className="mt-3 space-y-2">
        {addons.map((a) => (
          <li key={a.id}>
            <label className="flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-ink/10 px-4 py-3 text-[14px]">
              <span className="flex items-center gap-3"><input type="checkbox" checked={has(a.id)} onChange={() => (has(a.id) ? remove(a.id) : add(a.id))} />{a.name}</span>
              <span className="text-muted">{a.pricing ? `${a.pricing.percent}% (min ${money(a.pricing.min_usd)})` : money(a.price_usd)}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function CartDrawer() {
  const { drawer, setDrawer, quote } = useCart();
  useEffect(() => {
    if (!drawer) return;
    const k = (e: KeyboardEvent) => e.key === 'Escape' && setDrawer(false);
    window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k);
  }, [drawer, setDrawer]);
  if (!drawer) return null;
  const hasPkg = quote.lines.some((l) => l.category !== 'addon');
  return (
    <div className="fixed inset-0 z-[100]" role="dialog" aria-modal="true" aria-label="Your cart">
      <button type="button" aria-label="Close cart" className="absolute inset-0 bg-ink/40" onClick={() => setDrawer(false)} />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col overflow-y-auto bg-bg p-6 shadow-2xl">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-3xl text-ink">Your cart</h2>
          <button type="button" onClick={() => setDrawer(false)} className="text-2xl" aria-label="Close">×</button>
        </div>
        <div className="mt-4 flex-1">
          <CartLines />
          {hasPkg && <AddonPicker />}
        </div>
        {hasPkg && (
          <div className="mt-6">
            <Totals />
            <Link href="/checkout" onClick={() => setDrawer(false)} className="mt-5 block rounded-full bg-accent px-5 py-3.5 text-center text-[15px] font-semibold text-white hover:bg-accent-dark">Checkout</Link>
          </div>
        )}
        {!hasPkg && <Link href="/pricing" onClick={() => setDrawer(false)} className="mt-6 block rounded-full border border-ink/15 px-5 py-3 text-center text-[15px] font-semibold">Browse packages</Link>}
      </aside>
    </div>
  );
}
