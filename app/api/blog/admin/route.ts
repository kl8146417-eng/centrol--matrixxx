import { authenticate } from '@/lib/auth/token';
import { rateLimit } from '@/lib/rate-limit';
import { adminListPosts } from '@/lib/blog/posts';
import { json, error, serializePost } from '@/lib/http';

export const dynamic = 'force-dynamic';

/**
 * GET /api/blog/admin — list ALL posts (drafts + published), newest first.
 * Private: requires a valid token with the blog:write scope.
 * Doubles as a token-validation check for the dashboard login.
 *
 * Query: ?page=1&perPage=50&status=draft|published&q=search
 */
export async function GET(req: Request) {
  const auth = await authenticate(req, 'blog:write').catch((e) => ({
    ok: false as const,
    status: 401 as const,
    error: String(e instanceof Error ? e.message : e),
  }));
  if (!auth.ok) return error(auth.status, auth.error);

  const limited = rateLimit(auth.token.id);
  if (!limited.allowed)
    return error(429, 'Rate limit exceeded.', { retryAfter: limited.retryAfter });

  const url = new URL(req.url);
  const page = Number(url.searchParams.get('page')) || 1;
  const perPage = Number(url.searchParams.get('perPage')) || 50;
  const q = url.searchParams.get('q') ?? undefined;
  const statusParam = url.searchParams.get('status');
  const status =
    statusParam === 'draft' || statusParam === 'published' ? statusParam : undefined;

  try {
    const result = await adminListPosts({ page, perPage, q, status });
    return json({
      ...result,
      posts: result.posts.map(serializePost),
      tokenLabel: auth.token.label,
    });
  } catch (e) {
    return error(500, e instanceof Error ? e.message : 'Failed to list posts.');
  }
}
