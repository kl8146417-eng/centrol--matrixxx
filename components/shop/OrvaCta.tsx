'use client';
import { useCart } from '@/lib/cart';
import { serviceById } from '@/content/agency';
export function OrvaCta() {
  const { add, setDrawer, money } = useCart();
  const s = serviceById('rail-starter');
  if (!s) return null;
  return <button type="button" onClick={() => { add(s.id); setDrawer(true); }} className="rounded-full border border-ink/15 px-6 py-3 font-semibold">Get a storefront like this · {money(s.price_usd)}</button>;
}
