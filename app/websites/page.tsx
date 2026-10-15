import { pageMeta } from '@/lib/seo';
import { BreadcrumbLd } from '@/components/Breadcrumbs';
import type { Metadata } from 'next';
import { PageHeader } from '@/components/PageHeader';
import { CTASection } from '@/components/CTASection';
import { WebsiteGallery } from '@/components/WebsiteGallery';
import { work } from '@/content/site';

export const metadata: Metadata = pageMeta({ path: '/websites', title: 'Websites we have built', description: 'Live websites and storefronts designed and built by Centrol Matrix, with previews you can click through.' });

export default function WebsitesPage() {
  return (
    <>
      <BreadcrumbLd items={[{"name": "Websites we have built", "path": "/websites"}]} />
      <PageHeader
        eyebrow="Websites"
        title="Sites we built"
        accent="you can open."
        intro="Every project below is a real site we designed and shipped. Hit “See now” to preview it live, right here."
      />
      <WebsiteGallery items={work} />
      <CTASection />
    </>
  );
}
