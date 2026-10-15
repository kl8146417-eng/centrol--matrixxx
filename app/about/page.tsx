import { pageMeta } from '@/lib/seo';
import { BreadcrumbLd } from '@/components/Breadcrumbs';
import type { Metadata } from 'next';
import { PageHeader } from '@/components/PageHeader';
import { CTASection } from '@/components/CTASection';
import { TeamSection } from '@/components/Team';

export const metadata: Metadata = pageMeta({ path: '/about', title: 'About the studio', description: 'Centrol Matrix is a three-person studio (Asutosh, Vishal and Karan) building websites, apps, AI UGC ads, product shoots and automations.' });

export default function AboutPage() {
  return (
    <>
      <BreadcrumbLd items={[{"name": "About the studio", "path": "/about"}]} />
      <PageHeader
        eyebrow="About"
        title="A small studio"
        accent="that ships."
        intro="Centrol Matrix is a small studio that makes websites, apps, ads and content, and automates the busywork behind them. We care how it looks and whether it sells."
      />

      <section className="mx-auto max-w-editorial px-5 pb-8 sm:px-8">
        <div className="grid gap-12 border-t border-ink/10 pt-12 lg:grid-cols-2">
          <div className="space-y-6 text-[17px] leading-relaxed text-ink-soft">
            <p>
              We&apos;re a tight team that does the strategy, the design, the build, and the
              automation in one place. That&apos;s the whole point: nothing gets lost in a hand-off.
            </p>
            <p>
              We&apos;d rather make fewer things and make them properly. Every site we ship is
              meant to load fast, read clearly, and be easy to keep up to date long after we&apos;re
              gone.
            </p>
            <p>
              The automation work runs quietly in the background. It scrapes leads, drafts content,
              answers calls and posts everywhere, so the people we work with can spend their time
              on the parts only people can do.
            </p>
          </div>

          <aside className="space-y-8">
            <div className="border-t border-ink/10 pt-5">
              <p className="text-[12px] uppercase tracking-wordmark text-accent">How we work</p>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">
                The same three people plan, design, build, shoot and ship. Nothing gets passed to a
                subcontractor you never meet.
              </p>
            </div>
            <div className="border-t border-ink/10 pt-5">
              <p className="text-[12px] uppercase tracking-wordmark text-accent">What we ship</p>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">
                Websites, mobile apps, content systems, and the automations that keep them fed.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <TeamSection />
      <CTASection />
    </>
  );
}
