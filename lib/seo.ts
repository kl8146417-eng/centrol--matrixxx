import type { Metadata } from 'next';

export const SITE = 'https://centrolmatrix.com';
export const abs = (p: string) => (p.startsWith('http') ? p : `${SITE}${p}`);

/** Unique title/description, absolute canonical, OG + Twitter for a page. */
export function pageMeta({ path, title, description, image = '/og/default.jpg', noindex }: { path: string; title: string; description: string; image?: string; noindex?: boolean }): Metadata {
  const url = abs(path);
  const images = [{ url: abs(image), width: 1200, height: 630, alt: title }];
  return {
    title, description,
    alternates: { canonical: url },
    openGraph: { type: 'website', siteName: 'Centrol Matrix', url, title: `${title} · Centrol Matrix`, description, images },
    twitter: { card: 'summary_large_image', title: `${title} · Centrol Matrix`, description, images: images.map((i) => i.url) },
    ...(noindex ? { robots: { index: false, follow: false } } : {}),
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Home', path: '/' }, ...items].map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: abs(it.path) })),
  };
}
