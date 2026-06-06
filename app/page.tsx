import { Hero } from '@/components/Hero';
import { BrandMarquee } from '@/components/BrandMarquee';
import { ServicesGrid } from '@/components/ServicesGrid';
import { AgentSystem } from '@/components/AgentSystem';
import { SelectedWork } from '@/components/SelectedWork';
import { CTASection } from '@/components/CTASection';

export default function HomePage() {
  return (
    <>
      <Hero />
      <BrandMarquee />
      <ServicesGrid />
      <AgentSystem />
      <SelectedWork />
      <CTASection />
    </>
  );
}
