import { authenticate } from '@/lib/auth/token';
import { error } from '@/lib/http';
// Admin endpoints reuse the existing token auth (same token the blog admin uses).
export async function requireAdmin(req: Request) {
  const a = await authenticate(req).catch((e) => ({ ok: false as const, status: 401 as const, error: String((e as Error).message) }));
  if (!a.ok) return error(a.status, a.error);
  if (!a.token.scopes.some((s) => s === 'blog:write' || s === 'orders:read' || s === 'admin')) return error(403, 'Token lacks admin scope.');
  return null;
}
export const STATUSES = ['New', 'In progress', 'Delivered', 'Paid'];
