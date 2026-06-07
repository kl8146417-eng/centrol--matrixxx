import { authenticate } from '@/lib/auth/token';
import { rateLimit } from '@/lib/rate-limit';
import { uploadMediaSchema, fieldErrors } from '@/lib/validation';
import { dbConfigured } from '@/lib/blog/safe';
import { json, error } from '@/lib/http';
import { site } from '@/content/site';
import {
  ALLOWED_MIME,
  MAX_MEDIA_BYTES,
  extFor,
  inspectImage,
  insertMedia,
} from '@/lib/blog/media';

export const dynamic = 'force-dynamic';

/**
 * POST /api/media — upload an image (scope: blog:write).
 *
 * Accepts either:
 *   • multipart/form-data with a `file` field, or
 *   • application/json { "imageBase64": "...", "filename": "cover.jpg" }
 *     (imageBase64 may be a bare base64 string or a data: URI).
 *
 * Stores the bytes in Postgres and returns a stable public URL:
 *   { "url": "https://centrolmatrix.com/media/<id>.<ext>", "id": "...", ... }
 *
 * Use that url as `coverImageUrl` when creating a post.
 */
export async function POST(req: Request) {
  const auth = await authenticate(req, 'blog:write').catch((e) => ({
    ok: false as const,
    status: 401 as const,
    error: String(e instanceof Error ? e.message : e),
  }));
  if (!auth.ok) return error(auth.status, auth.error);

  if (!dbConfigured()) return error(503, 'Media storage is not configured.');

  const limited = rateLimit(auth.token.id);
  if (!limited.allowed)
    return error(429, 'Rate limit exceeded.', { retryAfter: limited.retryAfter });

  let buffer: Buffer;
  let filename: string | null = null;

  const contentType = req.headers.get('content-type') ?? '';

  try {
    if (contentType.includes('multipart/form-data')) {
      const form = await req.formData();
      const file = form.get('file');
      if (!(file instanceof Blob)) return error(422, 'Missing `file` field.');
      buffer = Buffer.from(await file.arrayBuffer());
      if (file instanceof File && file.name) filename = file.name;
    } else {
      const body = await req.json().catch(() => null);
      const parsed = uploadMediaSchema.safeParse(body);
      if (!parsed.success)
        return error(422, 'Validation failed.', { fields: fieldErrors(parsed.error) });
      const raw = parsed.data.imageBase64.replace(/^data:[^;]+;base64,/, '');
      buffer = Buffer.from(raw, 'base64');
      filename = parsed.data.filename ?? null;
    }
  } catch {
    return error(400, 'Could not read upload body.');
  }

  if (buffer.length === 0) return error(422, 'Empty image.');
  if (buffer.length > MAX_MEDIA_BYTES)
    return error(413, `Image too large. Max ${Math.floor(MAX_MEDIA_BYTES / 1024 / 1024)} MB.`);

  const { mimeType, width, height } = inspectImage(buffer);
  if (!mimeType || !ALLOWED_MIME.has(mimeType))
    return error(415, 'Unsupported image type. Send JPEG, PNG, or WebP bytes.');

  try {
    const row = await insertMedia({
      data: buffer,
      mimeType,
      filename,
      width,
      height,
      uploadedByToken: auth.token.id,
    });
    const ext = extFor(mimeType);
    const url = `${site.url.replace(/\/$/, '')}/media/${row.id}.${ext}`;
    return json(
      {
        id: row.id,
        url,
        mimeType: row.mimeType,
        byteSize: row.byteSize,
        width: row.width,
        height: row.height,
      },
      201
    );
  } catch (e) {
    return error(500, e instanceof Error ? e.message : 'Failed to store image.');
  }
}
