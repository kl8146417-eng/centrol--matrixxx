import { authenticate } from '@/lib/auth/token';
import { rateLimit } from '@/lib/rate-limit';
import { createPostSchema, fieldErrors } from '@/lib/validation';
import { createPost, listPublished } from '@/lib/blog/posts';
import { dbConfigured } from '@/lib/blog/safe';
import { json, error, serializePost } from '@/lib/http';

export const dynamic = 'force-dynamic';

/**
 * POST /api/blog — create a post (scope: blog:write).
 * Auth: Authorization: Bearer <token>
 */
export async function POST(req: Request) {
  const auth = await authenticate(req, 'blog:write').catch((e) => {
    return { ok: false as const, status: 401 as const, error: String(e instanceof Error ? e.message : e) };
  });
  if (!auth.ok) return error(auth.status, auth.error);

  const limited = rateLimit(auth.token.id);
  if (!limited.allowed)
    return error(429, 'Rate limit exceeded.', { retryAfter: limited.retryAfter });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return error(400, 'Invalid JSON body.');
  }

  const parsed = createPostSchema.safeParse(body);
  if (!parsed.success) return error(422, 'Validation failed.', { fields: fieldErrors(parsed.error) });

  try {
    const post = await createPost(parsed.data, auth.token.id);
    return json(serializePost(post), 201);
  } catch (e) {
    return error(500, e instanceof Error ? e.message : 'Failed to create post.');
  }
}

/**
 * GET /api/blog — list published posts (public, paginated).
 * Query: ?page=1&perPage=12&q=search
 */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const page = Number(url.searchParams.get('page')) || 1;
  const perPage = Number(url.searchParams.get('perPage')) || 12;
  const q = url.searchParams.get('q') ?? undefined;

  // Public endpoint: when the database isn't configured yet, return an empty
  // page instead of a 500 so the blog reads cleanly before content exists.
  if (!dbConfigured()) {
    return json({ posts: [], page, perPage, total: 0, totalPages: 0 });
  }

  try {
    const result = await listPublished({ page, perPage, q });
    return json({
      ...result,
      posts: result.posts.map(serializePost),
    });
  } catch (e) {
    return error(500, e instanceof Error ? e.message : 'Failed to list posts.');
  }
}
