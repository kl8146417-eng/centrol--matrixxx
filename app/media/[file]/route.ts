import { getMedia } from '@/lib/blog/media';
import { UUID_RE } from '@/lib/http';

export const dynamic = 'force-dynamic';

/**
 * GET /media/<id>.<ext> — serve a stored image (public, read-only).
 * The extension is cosmetic (for nice URLs); the UUID identifies the row and
 * the stored mime type sets the Content-Type.
 */
export async function GET(_req: Request, { params }: { params: { file: string } }) {
  const id = params.file.replace(/\.[a-z0-9]+$/i, '');
  if (!UUID_RE.test(id)) {
    return new Response('Not found', { status: 404 });
  }

  let row;
  try {
    row = await getMedia(id);
  } catch {
    return new Response('Unavailable', { status: 503 });
  }
  if (!row) return new Response('Not found', { status: 404 });

  const bytes = Buffer.isBuffer(row.data) ? row.data : Buffer.from(row.data as Uint8Array);

  return new Response(new Uint8Array(bytes), {
    status: 200,
    headers: {
      'Content-Type': row.mimeType,
      'Content-Length': String(bytes.length),
      // Images are immutable once uploaded (new upload = new id).
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
