import type { Metadata } from 'next';
import { PageHeader } from '@/components/PageHeader';
import { CTASection } from '@/components/CTASection';
import Link from 'next/link';
import { apps, work } from '@/content/site';
import { agency } from '@/content/agency';

export const metadata: Metadata = {
  title: 'Apps',
  description: 'Apps we built and published, plus live demos you can click through.',
  alternates: { canonical: '/apps' },
};

export default function AppsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Apps"
        title="Products we"
        accent="put in the store."
        intro="We don't just design apps. We build them, ship them, and keep them running."
      />

      <section className="mx-auto max-w-editorial px-5 pb-24 sm:px-8 sm:pb-32">
        <div className="grid gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 sm:grid-cols-3">
          {apps.map((a) => (
            <div key={a.name} className="bg-bg p-8">
              <h2 className="font-display text-3xl text-ink">{a.name}</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">{a.detail}</p>
              {a.store && (
                <span className="mt-5 inline-block rounded-full border border-ink/15 px-3 py-1 text-[12px] uppercase tracking-wordmark text-ink-soft">
                  iOS · Android
                </span>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-editorial px-5 pb-24 sm:px-8 sm:pb-32">
        <p className="text-[12px] uppercase tracking-wordmark text-accent">Live demos</p>
        <h2 className="mt-3 font-display text-display-md text-ink">Click through <span className="italic text-accent">the real thing.</span></h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <Link href="/work/orva" className="rounded-2xl border border-ink/10 p-6 hover:border-ink/30">
            <h3 className="font-display text-2xl text-ink">ORVA storefront</h3>
            <p className="mt-2 text-[15px] text-muted">Interactive hanging-rail clothing store with AI product photography. Read the case study{agency.demo.url ? ' and open the demo' : ''}.</p>
          </Link>
          {agency.wardrobe.url && (
            <a href={agency.wardrobe.url} target="_blank" rel="noopener noreferrer" className="rounded-2xl border border-ink/10 p-6 hover:border-ink/30">
              <h3 className="font-display text-2xl text-ink">{agency.wardrobe.name} ↗</h3>
              <p className="mt-2 text-[15px] text-muted">A wardrobe and styling app demo.</p>
            </a>
          )}
          {work.filter((w) => w.embedUrl).map((w) => (
            <a key={w.name} href={w.url} target="_blank" rel="noopener noreferrer" className="rounded-2xl border border-ink/10 p-6 hover:border-ink/30">
              <h3 className="font-display text-2xl text-ink">{w.name} ↗</h3>
              <p className="mt-2 text-[15px] text-muted">{w.blurb}</p>
            </a>
          ))}
        </div>
      </section>

      <CTASection />
    </>
  );
}
