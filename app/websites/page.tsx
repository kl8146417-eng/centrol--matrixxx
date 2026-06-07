import type { Metadata } from 'next';
import { PageHeader } from '@/components/PageHeader';
import { CTASection } from '@/components/CTASection';
import { WebsiteGallery } from '@/components/WebsiteGallery';
import { work } from '@/content/site';

export const metadata: Metadata = {
  title: 'Websites',
  description: 'Websites and products we designed, built, and shipped. Preview each one live.',
  alternates: { canonical: '/websites' },
};

export default function WebsitesPage() {
  return (
    <>
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
