import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/seo';
import { safeListPublished } from '@/lib/blog/safe';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Same origin as canonicals, so search engines never see two hosts.
  const base = SITE;
  const staticRoutes = ['', '/fashion', '/websites', '/services', '/apps', '/about', '/blog', '/contact', '/work', '/work/orva', '/pricing', '/faq', '/terms', '/privacy', '/refunds', '/delivery'].map(
    (path) => ({
      url: `${base}${path}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: path === '' ? 1 : 0.7,
    })
  );

  const { posts } = await safeListPublished(1);
  const postRoutes = posts.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: p.updatedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...postRoutes];
}
