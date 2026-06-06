import { NextResponse } from 'next/server';
import { site } from '@/content/site';
import type { Post } from '@/lib/db/schema';

export function json(data: unknown, status = 200) {
  return NextResponse.json(data, { status });
}

export function error(status: number, message: string, extra?: Record<string, unknown>) {
  return NextResponse.json({ error: message, ...extra }, { status });
}

/** Shape a post for API responses (adds canonical url, hides internal token id). */
export function serializePost(post: Post) {
  const { createdByToken: _omit, ...rest } = post;
  return { ...rest, url: `${site.url}/blog/${post.slug}` };
}

export const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
