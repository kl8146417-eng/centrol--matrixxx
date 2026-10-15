import { breadcrumbLd } from '@/lib/seo';
export function BreadcrumbLd({ items }: { items: { name: string; path: string }[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd(items)) }} />;
}
