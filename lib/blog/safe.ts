// Wrappers used by server-rendered pages so the site builds and renders even
// before the database is provisioned. They degrade to empty results instead of throwing.

import { listPublished, getBySlug } from '@/lib/blog/posts';
import type { Post } from '@/lib/db/schema';

export function dbConfigured(): boolean {
  return Boolean(
    process.env.NETLIFY_DATABASE_URL ||
      process.env.NETLIFY_DATABASE_URL_UNPOOLED ||
      process.env.DATABASE_URL
  );
}

export async function safeListPublished(page = 1) {
  if (!dbConfigured()) {
    return { posts: [] as Post[], page, perPage: 12, total: 0, totalPages: 0 };
  }
  try {
    return await listPublished({ page });
  } catch {
    return { posts: [] as Post[], page, perPage: 12, total: 0, totalPages: 0 };
  }
}

export async function safeGetBySlug(slug: string): Promise<Post | null> {
  if (!dbConfigured()) return null;
  try {
    return await getBySlug(slug);
  } catch {
    return null;
  }
}
