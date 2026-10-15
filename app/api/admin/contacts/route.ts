import { json } from '@/lib/http';
import { listContacts } from '@/lib/commerce/store';
import { requireAdmin } from '@/lib/commerce/admin';
export const dynamic = 'force-dynamic';
export async function GET(req: Request) {
  const deny = await requireAdmin(req); if (deny) return deny;
  return json({ messages: await listContacts() });
}
