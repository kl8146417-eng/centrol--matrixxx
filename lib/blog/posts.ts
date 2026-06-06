import { and, desc, eq, isNull, like, or, sql } from 'drizzle-orm';
import { getDb } from '@/lib/db';
import { posts, type Post } from '@/lib/db/schema';
import { markdownToSafeHtml, sanitizeHtml, readingTime, slugify } from '@/lib/blog/markdown';
import type { CreatePostInput, UpdatePostInput } from '@/lib/validation';

/** Make a slug unique by appending -2, -3, ... if needed. */
async function uniqueSlug(base: string, ignoreId?: string): Promise<string> {
  const db = getDb();
  let candidate = base || 'post';
  let n = 1;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const rows = await db
      .select({ id: posts.id })
      .from(posts)
      .where(eq(posts.slug, candidate))
      .limit(1);
    const clash = rows[0] && rows[0].id !== ignoreId;
    if (!clash) return candidate;
    n += 1;
    candidate = `${base}-${n}`;
  }
}

async function renderContent(input: { contentMarkdown?: string; contentHtml?: string }) {
  if (input.contentMarkdown) {
    const html = await markdownToSafeHtml(input.contentMarkdown);
    return { html, markdown: input.contentMarkdown };
  }
  const html = await sanitizeHtml(input.contentHtml ?? '');
  return { html, markdown: null as string | null };
}

export async function createPost(input: CreatePostInput, tokenId: string): Promise<Post> {
  const db = getDb();
  const { html, markdown } = await renderContent(input);
  const slug = await uniqueSlug(input.slug ? slugify(input.slug) : slugify(input.title));
  const status = input.status ?? 'published';

  const [row] = await db
    .insert(posts)
    .values({
      slug,
      title: input.title,
      excerpt: input.excerpt ?? null,
      contentMarkdown: markdown,
      contentHtml: html,
      coverImageUrl: input.coverImageUrl ?? null,
      tags: input.tags ?? [],
      author: input.author ?? 'Centrol Matrix',
      status,
      readingTime: readingTime(html),
      publishedAt: input.publishedAt
        ? new Date(input.publishedAt)
        : status === 'published'
          ? new Date()
          : null,
      createdByToken: tokenId,
    })
    .returning();

  return row;
}

export async function updatePost(id: string, input: UpdatePostInput): Promise<Post | null> {
  const db = getDb();
  const [existing] = await db.select().from(posts).where(eq(posts.id, id)).limit(1);
  if (!existing || existing.deletedAt) return null;

  const patch: Partial<typeof posts.$inferInsert> = { updatedAt: new Date() };

  if (input.contentMarkdown || input.contentHtml) {
    const { html, markdown } = await renderContent(input);
    patch.contentHtml = html;
    patch.contentMarkdown = markdown;
    patch.readingTime = readingTime(html);
  }
  if (input.title !== undefined) patch.title = input.title;
  if (input.excerpt !== undefined) patch.excerpt = input.excerpt;
  if (input.coverImageUrl !== undefined) patch.coverImageUrl = input.coverImageUrl;
  if (input.tags !== undefined) patch.tags = input.tags;
  if (input.author !== undefined) patch.author = input.author;
  if (input.status !== undefined) patch.status = input.status;
  if (input.publishedAt !== undefined) patch.publishedAt = new Date(input.publishedAt);
  if (input.slug !== undefined) patch.slug = await uniqueSlug(slugify(input.slug), id);

  const [row] = await db.update(posts).set(patch).where(eq(posts.id, id)).returning();
  return row ?? null;
}

export async function softDeletePost(id: string): Promise<boolean> {
  const db = getDb();
  const [row] = await db
    .update(posts)
    .set({ deletedAt: new Date(), updatedAt: new Date() })
    .where(and(eq(posts.id, id), isNull(posts.deletedAt)))
    .returning({ id: posts.id });
  return Boolean(row);
}

const publishedFilter = and(eq(posts.status, 'published'), isNull(posts.deletedAt));

export async function listPublished(opts: { page?: number; perPage?: number; q?: string } = {}) {
  const db = getDb();
  const page = Math.max(1, opts.page ?? 1);
  const perPage = Math.min(50, Math.max(1, opts.perPage ?? 12));
  const offset = (page - 1) * perPage;

  const where = opts.q
    ? and(publishedFilter, or(like(posts.title, `%${opts.q}%`), like(posts.excerpt, `%${opts.q}%`)))
    : publishedFilter;

  const rows = await db
    .select()
    .from(posts)
    .where(where)
    .orderBy(desc(posts.publishedAt))
    .limit(perPage)
    .offset(offset);

  const [{ count }] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(posts)
    .where(where);

  return { posts: rows, page, perPage, total: count, totalPages: Math.ceil(count / perPage) };
}

export async function getBySlug(slug: string): Promise<Post | null> {
  const db = getDb();
  const [row] = await db
    .select()
    .from(posts)
    .where(and(eq(posts.slug, slug), publishedFilter))
    .limit(1);
  return row ?? null;
}

export async function getById(id: string): Promise<Post | null> {
  const db = getDb();
  const [row] = await db.select().from(posts).where(eq(posts.id, id)).limit(1);
  return row && !row.deletedAt ? row : null;
}
