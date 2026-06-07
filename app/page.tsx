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
      {/* Opaque layer that scrolls up over the hero's fixed dark backdrop. */}
      <div className="relative z-10 bg-bg">
        <BrandMarquee />
        <ServicesGrid />
        <AgentSystem />
        <SelectedWork />
        <CTASection />
      </div>
    </>
  );
}
