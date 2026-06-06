import type { Metadata } from 'next';
import { PageHeader } from '@/components/PageHeader';
import { ServicesGrid } from '@/components/ServicesGrid';
import { AgentSystem } from '@/components/AgentSystem';
import { CTASection } from '@/components/CTASection';
import { studioServices } from '@/content/site';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Websites, content systems, marketing, lead generation, and AI automation — built and run by one studio.',
  alternates: { canonical: '/services' },
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="One studio,"
        accent="end to end."
        intro="Strategy, design, build, content, and automation come from the same room. No hand-offs, no diluted execution."
      />

      <ServicesGrid heading={false} />

      <section className="mx-auto max-w-editorial px-5 py-20 sm:px-8 sm:py-28">
        <h2 className="font-display text-display-md text-ink">
          And the hands-on <span className="italic text-accent">craft.</span>
        </h2>
        <div className="mt-12 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {studioServices.map((s) => (
            <div key={s.title} className="border-t border-ink/10 pt-5">
              <h3 className="font-display text-2xl text-ink">{s.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      <AgentSystem />
      <CTASection />
    </>
  );
}
