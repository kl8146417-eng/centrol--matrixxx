import type { Metadata } from 'next';
import { PageHeader } from '@/components/PageHeader';
import { CTASection } from '@/components/CTASection';

export const metadata: Metadata = {
  title: 'About',
  description: 'Centrol Matrix is a studio for websites, content, and AI automation.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="A small studio"
        accent="that ships."
        intro="Centrol Matrix is a studio for businesses that want a website, a content engine, and the automations that run behind them — built by people who care how it looks and works."
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
              The automation work runs quietly in the background — scraping leads, drafting content,
              answering calls, posting everywhere — so the people we work with can spend their time
              on the parts only people can do.
            </p>
          </div>

          <aside className="space-y-8">
            <div className="border-t border-ink/10 pt-5">
              <p className="text-[12px] uppercase tracking-wordmark text-accent">How we work</p>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">
                One room. Strategy, design, engineering, media, content, and AI — no agencies of
                agencies, no diluted execution.
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

      <CTASection />
    </>
  );
}
