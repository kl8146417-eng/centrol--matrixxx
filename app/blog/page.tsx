import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/PageHeader';
import { safeListPublished, dbConfigured } from '@/lib/blog/safe';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Notes on building websites, content engines, and AI automation.',
  alternates: { canonical: '/blog' },
};

function formatDate(d: Date | null) {
  if (!d) return '';
  return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default async function BlogIndex({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = Number(searchParams.page) || 1;
  const { posts, totalPages } = await safeListPublished(page);

  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title="Notes from"
        accent="the studio."
        intro="What we're learning about building things that work — published by us and by the automations that run our content engine."
      />

      <section className="mx-auto max-w-editorial px-5 pb-24 sm:px-8 sm:pb-32">
        {posts.length === 0 ? (
          <div className="border-t border-ink/10 pt-10">
            <p className="font-display text-2xl text-ink">No posts yet.</p>
            <p className="mt-3 max-w-md text-[15px] leading-relaxed text-muted">
              {dbConfigured()
                ? 'The first post will appear here the moment one is published.'
                : 'The blog goes live once the database connection is wired up. Posts can then be published over the API.'}
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-ink/10 border-t border-ink/10">
            {posts.map((post) => (
              <li key={post.id} className="py-8 sm:py-10">
                <Link href={`/blog/${post.slug}`} className="group block">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] text-muted">
                    <time dateTime={post.publishedAt?.toISOString()}>
                      {formatDate(post.publishedAt)}
                    </time>
                    <span aria-hidden>·</span>
                    <span>{post.readingTime} min read</span>
                    {post.tags.length > 0 && (
                      <>
                        <span aria-hidden>·</span>
                        <span>{post.tags.join(', ')}</span>
                      </>
                    )}
                  </div>
                  <h2 className="mt-3 font-display text-3xl text-ink transition-opacity group-hover:opacity-70 sm:text-4xl">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-ink-soft">
                      {post.excerpt}
                    </p>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        )}

        {totalPages > 1 && (
          <nav className="mt-12 flex gap-3" aria-label="Pagination">
            {page > 1 && (
              <Link
                href={`/blog?page=${page - 1}`}
                className="rounded-full border border-ink/15 px-4 py-2 text-[14px] hover:bg-ink/5"
              >
                ← Newer
              </Link>
            )}
            {page < totalPages && (
              <Link
                href={`/blog?page=${page + 1}`}
                className="rounded-full border border-ink/15 px-4 py-2 text-[14px] hover:bg-ink/5"
              >
                Older →
              </Link>
            )}
          </nav>
        )}
      </section>
    </>
  );
}
