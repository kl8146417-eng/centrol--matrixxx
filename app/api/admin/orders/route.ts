import { json } from '@/lib/http';
import { listOrders } from '@/lib/commerce/store';
import { requireAdmin, STATUSES } from '@/lib/commerce/admin';
export const dynamic = 'force-dynamic';
export async function GET(req: Request) {
  const deny = await requireAdmin(req); if (deny) return deny;
  return json({ orders: await listOrders(), statuses: STATUSES });
}
