'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { agency, waLink } from '@/content/agency';
import { fmtMoney } from '@/lib/cart';

interface Order {
  id: string; createdAt: string; status: string; etaDays: number; rush: boolean; estimatedDelivery: string;
  items: { id: string; name: string; qty: number; total_usd: number; billing?: string }[];
  totals: { total_usd: number }; display: { currency: string };
  brief: { brandName: string }; contact: { name: string; email: string };
  payment: { mode: string; status: string; paidAt?: string };
  uploads: { name: string; size: number }[];
}
const d = (iso: string) => new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

export default function OrderPage() {
  const { id } = useParams<{ id: string }>();
  const t = useSearchParams().get('t') || '';
  const [order, setOrder] = useState<Order | null>(null);
  const [pay, setPay] = useState<{ stripe: boolean; razorpay: boolean } | null>(null);
  const [err, setErr] = useState('');
  useEffect(() => {
    fetch(`/api/orders/${encodeURIComponent(id)}?t=${encodeURIComponent(t)}`).then(async (r) => {
      const j = await r.json(); if (!r.ok) throw new Error(j.error || 'Not found'); setOrder(j.order); setPay(j.payments);
    }).catch((e) => setErr(e.message));
  }, [id, t]);
  const wrap = 'mx-auto max-w-3xl px-5 pb-24 pt-32 sm:px-8 sm:pt-40';
  if (err) return (
    <section className={wrap}><h1 className="font-display text-display-md text-ink">We couldn&apos;t find that order.</h1>
      <p className="mt-4 text-muted">Use the full link from your confirmation, or contact us at <a className="underline" href={`mailto:${agency.email}`}>{agency.email}</a> with your order ID.</p></section>
  );
  if (!order) return <section className={wrap} aria-busy="true"><p className="text-muted">Loading your order…</p></section>;
  const paid = order.payment.status === 'paid';
  const money = (u: number) => fmtMoney(u, 'USD');
  const startPay = async (method: string) => {
    const r = await fetch(`/api/orders/${order.id}/pay?t=${encodeURIComponent(t)}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ method }) });
    const j = await r.json(); if (j.redirect) window.location.href = j.redirect; else alert(j.error || 'Payment unavailable');
  };
  const steps = [
    ['Order placed', d(order.createdAt), true],
    [paid ? 'Payment received' : 'Payment link emailed', paid ? d(order.payment.paidAt || order.createdAt) : `Within 1 business day to ${order.contact.email}`, paid],
    ['Kickoff', 'We confirm the plan by email / WhatsApp within 1 business day of payment', ['In progress', 'Delivered'].includes(order.status)],
    ['Production', `${order.etaDays} days${order.rush ? ' (rush)' : ''}`, order.status === 'Delivered'],
    ['Delivery', `Estimated ${d(order.estimatedDelivery)}`, order.status === 'Delivered'],
  ] as const;
  return (
    <section className={wrap}>
      <p className="text-[12px] uppercase tracking-wordmark text-accent">Order {order.id}</p>
      <h1 className="mt-4 font-display text-display-md text-ink">Thank you, {order.contact.name.split(' ')[0]}.</h1>
      <p className="mt-4 text-[17px] text-ink-soft">{paid ? 'Payment received. ' : 'Your order is confirmed. No charge has been made yet. '}A confirmation is on its way to {order.contact.email}. Save this page to track progress.</p>
      <ol className="mt-10 space-y-4 border-l border-ink/15 pl-6">
        {steps.map(([title, sub, done]) => (
          <li key={title}><p className={`font-medium ${done ? 'text-accent' : 'text-ink'}`}>{done ? '✓ ' : ''}{title}</p><p className="text-[14px] text-muted">{sub}</p></li>
        ))}
      </ol>
      <div className="mt-10 rounded-2xl border border-ink/10 p-6">
        <h2 className="font-display text-2xl text-ink">{order.brief.brandName}</h2>
        <ul className="mt-3 space-y-1 text-[15px]">{order.items.map((l) => <li key={l.id} className="flex justify-between"><span>{l.name}{l.qty > 1 ? ` × ${l.qty}` : ''}</span><span>{money(l.total_usd)}{l.billing === 'monthly' ? '/mo' : ''}</span></li>)}</ul>
        <p className="mt-3 flex justify-between border-t border-ink/10 pt-3 font-semibold"><span>Total</span><span>{money(order.totals.total_usd)}</span></p>
        {order.uploads.length > 0 && <p className="mt-2 text-[13px] text-muted">{order.uploads.length} file(s) received.</p>}
      </div>
      {!paid && (pay?.stripe || pay?.razorpay) && (
        <div className="mt-6 flex flex-wrap gap-3">
          {pay.stripe && <button type="button" onClick={() => startPay('stripe')} className="rounded-full bg-accent px-6 py-3 font-semibold text-white">Pay now by card</button>}
          {pay.razorpay && <button type="button" onClick={() => startPay('razorpay')} className="rounded-full border border-ink/15 px-6 py-3 font-semibold">Pay with Razorpay</button>}
        </div>
      )}
      <div className="mt-10 flex flex-wrap gap-3 text-[15px]">
        <a href={waLink(`Hi, about my order ${order.id}`)} target="_blank" rel="noopener noreferrer" className="rounded-full bg-ink px-6 py-3 font-semibold text-white">WhatsApp {agency.whatsappDisplay}</a>
        <a href={`mailto:${agency.email}?subject=${encodeURIComponent(`Order ${order.id}`)}`} className="rounded-full border border-ink/15 px-6 py-3 font-semibold">Email us</a>
        <Link href="/" className="px-2 py-3 underline">Back home</Link>
      </div>
    </section>
  );
}
