import { HomeHero } from '@/components/home/HomeHero';
import { Showreel } from '@/components/home/Showreel';
import { ServicesBento } from '@/components/home/ServicesBento';
import { Products } from '@/components/home/Products';
import { WorkByCategory } from '@/components/home/WorkByCategory';
import { Process } from '@/components/home/Process';
import { PricingTeaser, FaqTeaser } from '@/components/home/PricingFaq';
import { CTASection } from '@/components/CTASection';
import { TeamTeaser } from '@/components/Team';

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <Showreel />
      <ServicesBento />
      <Products />
      <TeamTeaser />
      <WorkByCategory />
      <Process />
      <PricingTeaser />
      <FaqTeaser />
      <CTASection />
    </>
  );
}
