'use client';
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { computeQuote, MAX_QTY, type Quote } from '@/lib/pricing.mjs';
import { agency, services, serviceById, type Currency } from '@/content/agency';

export interface CartItem { id: string; qty: number }
interface Cart {
  items: CartItem[]; quote: Quote; count: number; ready: boolean;
  add: (id: string, qty?: number) => void; setQty: (id: string, qty: number) => void; remove: (id: string) => void; has: (id: string) => boolean; clear: () => void;
  drawer: boolean; setDrawer: (v: boolean) => void;
  currency: Currency; setCurrency: (c: Currency) => void; money: (usd: number) => string;
}
const Ctx = createContext<Cart | null>(null);

export function fmtMoney(usd: number, cur: Currency = 'USD') {
  const c = agency.currencies[cur] || agency.currencies.USD;
  const v = usd * c.rate;
  const r = cur === 'USD' ? v : cur === 'INR' ? Math.round(v / 100) * 100 : Math.round(v);
  const n = new Intl.NumberFormat(cur === 'INR' ? 'en-IN' : 'en-US', { maximumFractionDigits: cur === 'USD' && v % 1 ? 2 : 0 }).format(r);
  return `${cur === 'USD' ? '' : '≈ '}${c.symbol}${n}`;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [currency, setCur] = useState<Currency>('USD');
  const [drawer, setDrawer] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try {
      setItems((JSON.parse(localStorage.getItem('cmx.cart') || '[]') as CartItem[]).filter((i) => serviceById(i.id)));
      const c = JSON.parse(localStorage.getItem('cmx.currency') || '"USD"'); if (c in agency.currencies) setCur(c);
    } catch { /* */ }
    setReady(true);
  }, []);
  useEffect(() => { if (ready) localStorage.setItem('cmx.cart', JSON.stringify(items)); }, [items, ready]);
  const setCurrency = useCallback((c: Currency) => { setCur(c); localStorage.setItem('cmx.currency', JSON.stringify(c)); }, []);
  const add = useCallback((id: string, qty = 1) => setItems((p) => {
    const s = serviceById(id); if (!s || s.enquiry) return p;
    const ex = p.find((i) => i.id === id);
    if (ex) return s.category === 'addon' ? p : p.map((i) => (i.id === id ? { ...i, qty: Math.min(MAX_QTY, i.qty + qty) } : i));
    return [...p, { id, qty }];
  }), []);
  const setQty = useCallback((id: string, qty: number) => setItems((p) => p.map((i) => (i.id === id ? { ...i, qty: Math.max(1, Math.min(MAX_QTY, qty)) } : i))), []);
  const remove = useCallback((id: string) => setItems((p) => p.filter((i) => i.id !== id)), []);
  const has = useCallback((id: string) => items.some((i) => i.id === id), [items]);
  const clear = useCallback(() => setItems([]), []);
  const quote = useMemo(() => computeQuote(items, services), [items]);
  const money = useCallback((usd: number) => fmtMoney(usd, currency), [currency]);
  const count = items.filter((i) => serviceById(i.id)?.category !== 'addon').reduce((a, i) => a + i.qty, 0);
  return <Ctx.Provider value={{ items, quote, count, ready, add, setQty, remove, has, clear, drawer, setDrawer, currency, setCurrency, money }}>{children}</Ctx.Provider>;
}
export const useCart = () => { const c = useContext(Ctx); if (!c) throw new Error('CartProvider missing'); return c; };
