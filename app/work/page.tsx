import type { Metadata } from 'next';
import Image from 'next/image';
import { PageHeader } from '@/components/PageHeader';
import { CTASection } from '@/components/CTASection';
import { work } from '@/content/site';
import { portalFrames } from '@/content/placeholders';

export const metadata: Metadata = {
  title: 'Work',
  description: 'Products and projects we designed, built, and shipped.',
  alternates: { canonical: '/work' },
};

export default function WorkPage() {
  return (
    <>
      <PageHeader
        eyebrow="Work"
        title="Things we built"
        accent="and shipped."
        intro="A selection of products and projects we designed and built end to end. Real screenshots replace these placeholders soon."
      />

      <section className="mx-auto max-w-editorial px-5 pb-24 sm:px-8 sm:pb-32">
        <div className="grid gap-12 sm:grid-cols-2">
          {work.map((w, i) => (
            <article key={w.name} className="group">
              <div className="relative aspect-[16/11] overflow-hidden rounded-2xl bg-ink-section">
                <Image
                  src={portalFrames[i % portalFrames.length].src}
                  alt={`${w.name} (placeholder)`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="mt-5 flex items-baseline justify-between gap-4">
                <h2 className="font-display text-3xl text-ink">{w.name}</h2>
                <span className="text-[13px] text-muted">{w.domain}</span>
              </div>
              <p className="mt-2 max-w-md text-[15px] leading-relaxed text-muted">{w.blurb}</p>
            </article>
          ))}
        </div>
      </section>

      <CTASection />
    </>
  );
}
