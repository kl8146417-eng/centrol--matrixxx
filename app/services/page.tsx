import { pageMeta } from '@/lib/seo';
import { BreadcrumbLd } from '@/components/Breadcrumbs';
import type { Metadata } from 'next';
import { PageHeader } from '@/components/PageHeader';
import { ServicesGrid } from '@/components/ServicesGrid';
import { AgentSystem } from '@/components/AgentSystem';
import { CTASection } from '@/components/CTASection';
import Link from 'next/link';
import { studioServices } from '@/content/site';

export const metadata: Metadata = pageMeta({ path: '/services', title: 'Services', description: 'Websites, mobile apps, AI UGC ads, product ads and mockups, social content, fashion shoots, real estate video and AI automation from one studio.' });

export default function ServicesPage() {
  return (
    <>
      <BreadcrumbLd items={[{"name": "Services", "path": "/services"}]} />
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

      <section className="mx-auto max-w-editorial px-5 pb-20 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-ink/10 p-8 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-display text-3xl text-ink">Ready to order?</h2>
            <p className="mt-2 text-[15px] text-muted">Fixed-price packages with checkout, or enquire about scoped work.</p>
          </div>
          <Link href="/pricing" className="rounded-full bg-accent px-6 py-3 text-[15px] font-semibold text-white hover:bg-accent-dark">See packages &amp; pricing</Link>
        </div>
      </section>

      <AgentSystem />
      <CTASection />
    </>
  );
}
