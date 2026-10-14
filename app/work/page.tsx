import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/PageHeader';
import { CTASection } from '@/components/CTASection';
import { VideoGallery, videoCount } from '@/components/shop/VideoGallery';

export const metadata: Metadata = {
  title: 'Work',
  description: 'AI UGC ads, product films, fashion and jewellery video, social content and the ORVA storefront case study.',
  alternates: { canonical: '/work' },
};

export default function WorkPage() {
  return (
    <>
      <PageHeader eyebrow="Work" title="Content that" accent="earns its keep." intro={`${videoCount} published videos from our creative pipeline, the ORVA storefront build, and the websites we've shipped.`} />
      <section className="mx-auto grid max-w-editorial gap-5 px-5 pb-16 sm:px-8 md:grid-cols-2">
        <Link href="/work/orva" className="group overflow-hidden rounded-2xl border border-ink/10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/work/orva/photos-desktop-home-hover-sm.webp" alt="ORVA storefront: garments on an interactive rail" className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
          <div className="p-6">
            <p className="text-[12px] uppercase tracking-wordmark text-accent">Case study · Storefront + imagery</p>
            <h2 className="mt-2 font-display text-3xl text-ink">ORVA, the hanging-rail store</h2>
          </div>
        </Link>
        <Link href="/websites" className="group overflow-hidden rounded-2xl border border-ink/10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/work/giftfeels.png" alt="Websites we've built" className="aspect-[16/10] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]" />
          <div className="p-6">
            <p className="text-[12px] uppercase tracking-wordmark text-accent">Websites &amp; apps</p>
            <h2 className="mt-2 font-display text-3xl text-ink">Sites we&apos;ve shipped, live</h2>
          </div>
        </Link>
      </section>
      <VideoGallery />
      <CTASection />
    </>
  );
}
