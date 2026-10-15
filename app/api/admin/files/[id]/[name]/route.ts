import { error } from '@/lib/http';
import { loadOrder, uploads } from '@/lib/commerce/store';
import { requireAdmin } from '@/lib/commerce/admin';
export const dynamic = 'force-dynamic';
export async function GET(req: Request, { params }: { params: { id: string; name: string } }) {
  const deny = await requireAdmin(req); if (deny) return deny;
  const o = await loadOrder(params.id);
  const name = decodeURIComponent(params.name);
  const u = o?.uploads.find((x) => x.stored === name);
  if (!o || !u) return error(404, 'Not found');
  const data = await uploads().get(`${o.id}/${u.stored}`, { type: 'arrayBuffer' });
  if (!data) return error(404, 'Not found');
  return new Response(data, { headers: { 'Content-Type': 'application/octet-stream', 'Content-Disposition': `attachment; filename="${u.name.replace(/"/g, '')}"`, 'Cache-Control': 'private, no-store' } });
}
