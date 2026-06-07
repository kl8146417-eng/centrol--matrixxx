import { eq } from 'drizzle-orm';
import { getDb } from '@/lib/db';
import { media, type Media } from '@/lib/db/schema';

export const MAX_MEDIA_BYTES = 5 * 1024 * 1024; // 5 MB
export const ALLOWED_MIME = new Set(['image/jpeg', 'image/png', 'image/webp']);

const EXT_BY_MIME: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
};

export function extFor(mimeType: string): string {
  return EXT_BY_MIME[mimeType] ?? 'jpg';
}

/** Best-effort sniff of image type + dimensions from the leading bytes. */
export function inspectImage(buf: Buffer): {
  mimeType: string | null;
  width: number | null;
  height: number | null;
} {
  // JPEG: FF D8 FF
  if (buf.length > 3 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) {
    return { mimeType: 'image/jpeg', ...jpegSize(buf) };
  }
  // PNG: 89 50 4E 47 0D 0A 1A 0A
  if (
    buf.length > 24 &&
    buf[0] === 0x89 &&
    buf[1] === 0x50 &&
    buf[2] === 0x4e &&
    buf[3] === 0x47
  ) {
    return {
      mimeType: 'image/png',
      width: buf.readUInt32BE(16),
      height: buf.readUInt32BE(20),
    };
  }
  // WEBP: "RIFF"...."WEBP"
  if (
    buf.length > 12 &&
    buf.toString('ascii', 0, 4) === 'RIFF' &&
    buf.toString('ascii', 8, 12) === 'WEBP'
  ) {
    return { mimeType: 'image/webp', ...webpSize(buf) };
  }
  return { mimeType: null, width: null, height: null };
}

function jpegSize(buf: Buffer): { width: number | null; height: number | null } {
  let offset = 2;
  while (offset < buf.length) {
    if (buf[offset] !== 0xff) return { width: null, height: null };
    const marker = buf[offset + 1];
    // SOF markers carry the dimensions.
    if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
      return {
        height: buf.readUInt16BE(offset + 5),
        width: buf.readUInt16BE(offset + 7),
      };
    }
    offset += 2 + buf.readUInt16BE(offset + 2);
  }
  return { width: null, height: null };
}

function webpSize(buf: Buffer): { width: number | null; height: number | null } {
  const format = buf.toString('ascii', 12, 16);
  try {
    if (format === 'VP8 ') {
      return { width: buf.readUInt16LE(26) & 0x3fff, height: buf.readUInt16LE(28) & 0x3fff };
    }
    if (format === 'VP8L') {
      const b = buf.readUInt32LE(21);
      return { width: (b & 0x3fff) + 1, height: ((b >> 14) & 0x3fff) + 1 };
    }
    if (format === 'VP8X') {
      const w = buf[24] | (buf[25] << 8) | (buf[26] << 16);
      const h = buf[27] | (buf[28] << 8) | (buf[29] << 16);
      return { width: w + 1, height: h + 1 };
    }
  } catch {
    /* fall through */
  }
  return { width: null, height: null };
}

export async function insertMedia(input: {
  data: Buffer;
  mimeType: string;
  filename?: string | null;
  width?: number | null;
  height?: number | null;
  uploadedByToken?: string | null;
}): Promise<Media> {
  const db = getDb();
  const [row] = await db
    .insert(media)
    .values({
      data: input.data,
      mimeType: input.mimeType,
      byteSize: input.data.length,
      filename: input.filename ?? null,
      width: input.width ?? null,
      height: input.height ?? null,
      uploadedByToken: input.uploadedByToken ?? null,
    })
    .returning();
  return row;
}

export async function getMedia(id: string): Promise<Media | undefined> {
  const db = getDb();
  const [row] = await db.select().from(media).where(eq(media.id, id)).limit(1);
  return row;
}
