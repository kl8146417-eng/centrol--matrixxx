import { json, error } from '@/lib/http';
import { loadOrder, saveOrder } from '@/lib/commerce/store';
import { requireAdmin, STATUSES } from '@/lib/commerce/admin';
export const dynamic = 'force-dynamic';
export async function GET(req: Request, { params }: { params: { id: string } }) {
  const deny = await requireAdmin(req); if (deny) return deny;
  const o = await loadOrder(params.id); return o ? json({ order: o }) : error(404, 'Not found');
}
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const deny = await requireAdmin(req); if (deny) return deny;
  const o = await loadOrder(params.id); if (!o) return error(404, 'Not found');
  const b = await req.json().catch(() => ({}));
  if (b.status !== undefined) {
    if (!STATUSES.includes(b.status)) return error(400, 'Bad status');
    if (b.status !== o.status) { o.history.push({ at: new Date().toISOString(), event: `Status → ${b.status}` }); o.status = b.status; }
    if (b.status === 'Paid' && o.payment.status !== 'paid') Object.assign(o.payment, { status: 'paid', paidAt: new Date().toISOString(), reference: 'manual' });
  }
  if (typeof b.adminNotes === 'string') o.adminNotes = b.adminNotes.slice(0, 10000);
  await saveOrder(o); return json({ order: o });
}
