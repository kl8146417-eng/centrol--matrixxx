import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { safeGetBySlug } from '@/lib/blog/safe';
import { site } from '@/content/site';

export const dynamic = 'force-dynamic';

function formatDate(d: Date | null) {
  if (!d) return '';
  return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await safeGetBySlug(params.slug);
  if (!post) return { title: 'Post not found' };
  return {
    title: post.title,
    description: post.excerpt ?? undefined,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt ?? undefined,
      url: `${site.url}/blog/${post.slug}`,
      images: post.coverImageUrl ? [post.coverImageUrl] : undefined,
      publishedTime: post.publishedAt?.toISOString(),
      authors: [post.author],
    },
  };
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await safeGetBySlug(params.slug);
  if (!post) notFound();

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt ?? undefined,
    image: post.coverImageUrl ? [post.coverImageUrl] : undefined,
    datePublished: post.publishedAt?.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    author: { '@type': 'Organization', name: post.author },
    publisher: { '@type': 'Organization', name: site.name, url: site.url },
    mainEntityOfPage: `${site.url}/blog/${post.slug}`,
  };

  return (
    <article className="mx-auto max-w-3xl px-5 pb-28 pt-32 sm:px-8 sm:pt-40">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <Link
        href="/blog"
        className="text-[13px] uppercase tracking-wordmark text-muted hover:text-ink"
      >
        ← All posts
      </Link>

      <header className="mt-8">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] text-muted">
          <time dateTime={post.publishedAt?.toISOString()}>{formatDate(post.publishedAt)}</time>
          <span aria-hidden>·</span>
          <span>{post.readingTime} min read</span>
          <span aria-hidden>·</span>
          <span>{post.author}</span>
        </div>
        <h1 className="mt-4 font-display text-display-md text-ink">{post.title}</h1>
        {post.excerpt && (
          <p className="mt-5 text-[18px] leading-relaxed text-ink-soft">{post.excerpt}</p>
        )}
      </header>

      {post.coverImageUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.coverImageUrl}
          alt=""
          className="mt-10 w-full rounded-2xl"
          loading="lazy"
        />
      )}

      <div
        className="prose-cm mt-10"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
    </article>
  );
}
