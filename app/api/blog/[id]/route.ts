import { authenticate } from '@/lib/auth/token';
import { rateLimit } from '@/lib/rate-limit';
import { updatePostSchema, fieldErrors } from '@/lib/validation';
import { getById, getBySlug, updatePost, softDeletePost } from '@/lib/blog/posts';
import { json, error, serializePost, UUID_RE } from '@/lib/http';

export const dynamic = 'force-dynamic';

/**
 * GET /api/blog/:idOrSlug — public.
 * Accepts a UUID (any status, for owners) or a slug (published only).
 */
export async function GET(_req: Request, { params }: { params: { id: string } }) {
  try {
    const post = UUID_RE.test(params.id)
      ? await getById(params.id)
      : await getBySlug(params.id);
    if (!post) return error(404, 'Post not found.');
    return json(serializePost(post));
  } catch (e) {
    return error(500, e instanceof Error ? e.message : 'Failed to fetch post.');
  }
}

/** PUT /api/blog/:id — update (scope: blog:write). */
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  if (!UUID_RE.test(params.id)) return error(400, 'Update requires a post id (UUID).');

  const auth = await authenticate(req, 'blog:write').catch((e) => ({
    ok: false as const,
    status: 401 as const,
    error: String(e instanceof Error ? e.message : e),
  }));
  if (!auth.ok) return error(auth.status, auth.error);

  const limited = rateLimit(auth.token.id);
  if (!limited.allowed) return error(429, 'Rate limit exceeded.', { retryAfter: limited.retryAfter });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return error(400, 'Invalid JSON body.');
  }

  const parsed = updatePostSchema.safeParse(body);
  if (!parsed.success) return error(422, 'Validation failed.', { fields: fieldErrors(parsed.error) });

  try {
    const post = await updatePost(params.id, parsed.data);
    if (!post) return error(404, 'Post not found.');
    return json(serializePost(post));
  } catch (e) {
    return error(500, e instanceof Error ? e.message : 'Failed to update post.');
  }
}

/** DELETE /api/blog/:id — soft delete (scope: blog:write). */
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  if (!UUID_RE.test(params.id)) return error(400, 'Delete requires a post id (UUID).');

  const auth = await authenticate(req, 'blog:write').catch((e) => ({
    ok: false as const,
    status: 401 as const,
    error: String(e instanceof Error ? e.message : e),
  }));
  if (!auth.ok) return error(auth.status, auth.error);

  try {
    const ok = await softDeletePost(params.id);
    if (!ok) return error(404, 'Post not found or already deleted.');
    return json({ deleted: true, id: params.id });
  } catch (e) {
    return error(500, e instanceof Error ? e.message : 'Failed to delete post.');
  }
}
