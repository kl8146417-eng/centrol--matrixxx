import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import { HomeHero } from '@/components/home/HomeHero';
import { WorkRail } from '@/components/home/WorkRail';
import { ServicesList, AngleForgeShowcase, AuditTeaser, HowItWorks, PricingTeaser, FaqTeaser, ContactBlock } from '@/components/home/Sections';
import { MeetAsutosh } from '@/components/Team';

export const metadata: Metadata = {
  ...pageMeta({
    path: '/',
    title: 'Product photos, UGC ads & Shopify fixes for e-commerce brands',
    description: 'Product photos and Amazon listing images from the shots you already have, UGC-style video ads, and Shopify store builds and fixes for e-commerce brands. Start with a free store audit.',
    image: '/og/home.jpg',
  }),
  title: { absolute: 'Centrol Matrix: product photos, UGC ads & Shopify fixes for e-commerce brands' },
};

// v6 home (US e-commerce first). Section order follows docs/briefs/2026-11-13-site-rebuild-BRIEF.md §5.
export default function HomePage() {
  return (
    <>
      <HomeHero />
      <WorkRail only={['ugc', 'product', 'fashion', 'jewellery', 'replication']} />
      <ServicesList />
      <AngleForgeShowcase />
      <AuditTeaser />
      <HowItWorks />
      <PricingTeaser />
      <MeetAsutosh />
      <FaqTeaser />
      <ContactBlock />
    </>
  );
}
