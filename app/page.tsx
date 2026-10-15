import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import { HomeHero } from '@/components/home/HomeHero';
import { WorkRail } from '@/components/home/WorkRail';
import { ServicesBento } from '@/components/home/ServicesBento';
import { ProductsGrid } from '@/components/home/ProductsGrid';
import { Process } from '@/components/home/Process';
import { PricingTeaser, FaqTeaser } from '@/components/home/PricingFaq';
import { CTASection } from '@/components/CTASection';
import { TeamTeaser } from '@/components/Team';

export const metadata: Metadata = {
  ...pageMeta({ path: '/', title: 'Websites, apps, UGC ads & product shoots', description: 'Centrol Matrix builds websites and apps, produces AI UGC ads, product films, mockups and social content, and automates the work behind them. Makers of Recl, Siteory and GiftFeels.' }),
  title: { absolute: 'Centrol Matrix: websites, apps, UGC ads & product shoots' },
};

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <WorkRail />
      <ServicesBento />
      <ProductsGrid />
      <Process />
      <TeamTeaser />
      <PricingTeaser />
      <FaqTeaser />
      <CTASection />
    </>
  );
}
