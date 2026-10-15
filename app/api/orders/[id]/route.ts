import { json, error } from '@/lib/http';
import { loadOrder } from '@/lib/commerce/store';
import { payments, publicOrder, tokenOk } from '@/lib/commerce/pay';
export const dynamic = 'force-dynamic';
export async function GET(req: Request, { params }: { params: { id: string } }) {
  const o = await loadOrder(params.id);
  if (!tokenOk(o, new URL(req.url).searchParams.get('t'))) return error(404, 'Order not found');
  return json({ order: publicOrder(o), payments: payments() });
}
