// Order/contact persistence. Primary: Neon (Drizzle `orders`/`contacts` tables, migration 0002).
// Fallback: Netlify Blobs (store "cm-orders"/"cm-contacts") when the DB or tables aren't there yet,
// so previews keep working before the migration is applied. Uploaded files always go to Blobs ("cm-uploads").
import { desc, eq } from 'drizzle-orm';
import { getStore } from '@netlify/blobs';
import { getDb } from '@/lib/db';
import { orders, contacts } from '@/lib/db/schema';
import { dbConfigured } from '@/lib/blog/safe';

export interface Upload { name: string; stored: string; type: string; size: number }
export interface Order {
  id: string; token: string; createdAt: string; updatedAt: string; status: string;
  items: { id: string; name: string; category: string; qty: number; unit_usd: number; total_usd: number; billing?: string; note?: string }[];
  totals: { subtotal_usd: number; total_usd: number };
  display: { currency: string; rate: number; approxTotal: number };
  etaDays: number; rush: boolean; hasMonthly: boolean; estimatedDelivery: string;
  brief: Record<string, string>; contact: Record<string, string>;
  payment: { mode: string; status: string; currency: string; amount_usd: number; sessionId?: string; linkId?: string; url?: string; paidAt?: string; reference?: string; error?: string };
  uploads: Upload[]; history: { at: string; event: string }[]; adminNotes: string; meta?: Record<string, string>;
}
export interface Contact { id: string; createdAt: string; name: string; email: string; company?: string; whatsapp?: string; message: string; meta?: Record<string, string> }

const blob = (name: string) => getStore({ name, consistency: 'strong' });
async function withDb<T>(fn: () => Promise<T>): Promise<{ ok: true; v: T } | { ok: false }> {
  if (!dbConfigured()) return { ok: false };
  try { return { ok: true, v: await fn() }; } catch (e) { console.warn('[commerce] DB unavailable, using Blobs:', (e as Error).message); return { ok: false }; }
}

export async function saveOrder(o: Order) {
  o.updatedAt = new Date().toISOString();
  const row = { id: o.id, token: o.token, status: o.status, totalUsd: Math.round(o.totals.total_usd * 100), email: o.contact.email, brandName: o.brief.brandName || null, data: o, adminNotes: o.adminNotes || '', updatedAt: new Date() };
  const r = await withDb(() => getDb().insert(orders).values(row).onConflictDoUpdate({ target: orders.id, set: row }));
  if (!r.ok) await blob('cm-orders').setJSON(o.id, o);
}
export async function loadOrder(id: string): Promise<Order | null> {
  if (!/^[A-Z0-9][A-Z0-9-]{5,40}$/.test(id)) return null;
  const r = await withDb(() => getDb().select().from(orders).where(eq(orders.id, id)).limit(1));
  if (r.ok && r.v[0]) return { ...(r.v[0].data as Order), status: r.v[0].status, adminNotes: r.v[0].adminNotes };
  try { return ((await blob('cm-orders').get(id, { type: 'json' })) as Order) ?? null; } catch { return null; }
}
export async function listOrders(): Promise<Order[]> {
  const out = new Map<string, Order>();
  try {
    const s = blob('cm-orders'); const { blobs } = await s.list();
    for (const b of blobs) { const o = (await s.get(b.key, { type: 'json' })) as Order | null; if (o) out.set(o.id, o); }
  } catch { /* blobs unavailable locally */ }
  const r = await withDb(() => getDb().select().from(orders).orderBy(desc(orders.createdAt)).limit(500));
  if (r.ok) for (const row of r.v) out.set(row.id, { ...(row.data as Order), status: row.status, adminNotes: row.adminNotes });
  return [...out.values()].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}
export async function saveContact(c: Omit<Contact, 'id' | 'createdAt'>) {
  const r = await withDb(() => getDb().insert(contacts).values({ name: c.name, email: c.email, company: c.company || null, whatsapp: c.whatsapp || null, message: c.message, meta: c.meta ?? null }));
  if (r.ok) return;
  try {
    const id = `MSG-${Date.now().toString(36).toUpperCase()}`;
    await blob('cm-contacts').setJSON(id, { ...c, id, createdAt: new Date().toISOString() });
  } catch (e) { console.warn('[contact] not stored:', (e as Error).message); }
}
export async function listContacts(): Promise<Contact[]> {
  const out: Contact[] = [];
  const r = await withDb(() => getDb().select().from(contacts).orderBy(desc(contacts.createdAt)).limit(500));
  if (r.ok) for (const x of r.v) out.push({ id: x.id, createdAt: x.createdAt.toISOString(), name: x.name, email: x.email, company: x.company ?? undefined, whatsapp: x.whatsapp ?? undefined, message: x.message });
  try { const s = blob('cm-contacts'); const { blobs } = await s.list(); for (const b of blobs) { const c = (await s.get(b.key, { type: 'json' })) as Contact | null; if (c) out.push(c); } } catch { /* */ }
  return out.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}
export const uploads = () => blob('cm-uploads');
