import type { Metadata } from 'next';
import { PageHeader } from '@/components/PageHeader';
import { CTASection } from '@/components/CTASection';
import { apps } from '@/content/site';

export const metadata: Metadata = {
  title: 'Apps',
  description: 'Products we built and published to the App Store and Google Play.',
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

      <CTASection />
    </>
  );
}
