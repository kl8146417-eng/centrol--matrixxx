import { authenticate } from '@/lib/auth/token';
import { markdownToSafeHtml } from '@/lib/blog/markdown';
import { json, error } from '@/lib/http';

export const dynamic = 'force-dynamic';

/**
 * POST /api/blog/preview — render markdown to the same sanitized HTML the
 * site stores, so the editor preview is faithful. Private (blog:write).
 * Body: { markdown: string }
 */
export async function POST(req: Request) {
  const auth = await authenticate(req, 'blog:write').catch((e) => ({
    ok: false as const,
    status: 401 as const,
    error: String(e instanceof Error ? e.message : e),
  }));
  if (!auth.ok) return error(auth.status, auth.error);

  let body: { markdown?: string };
  try {
    body = await req.json();
  } catch {
    return error(400, 'Invalid JSON body.');
  }

  try {
    const html = await markdownToSafeHtml(body.markdown ?? '');
    return json({ html });
  } catch (e) {
    return error(500, e instanceof Error ? e.message : 'Failed to render preview.');
  }
}
