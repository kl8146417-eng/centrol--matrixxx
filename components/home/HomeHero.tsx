/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { AutoVideo } from './AutoVideo';

// Editorial, asymmetric hero: real work up front, specific copy, no gradients.
const LINES = [
  { w: 'Websites', href: '/websites' },
  { w: 'Apps', href: '/apps' },
  { w: 'UGC ads', href: '/work#ugc' },
  { w: 'Product shoots', href: '/work#product' },
];

export function HomeHero() {
  return (
    <section className="relative bg-[#F4F4F2] text-ink">
      <div className="mx-auto max-w-editorial px-5 pb-14 pt-28 sm:px-8 sm:pt-32 lg:pb-20">
        <div className="flex items-center justify-between border-b border-ink/15 pb-3 text-[12px] uppercase tracking-wordmark text-muted">
          <span>Centrol Matrix · Studio</span>
          <span className="hidden sm:inline">Websites / Apps / Ads / Automation</span>
        </div>

        <div className="mt-8 grid gap-10 lg:mt-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <p className="text-[15px] font-medium text-ink-soft">We make</p>
            <h1 className="mt-2 font-display text-[clamp(52px,9vw,128px)] leading-[0.92] tracking-[-0.02em]">
              {LINES.map((l, i) => (
                <Link key={l.w} href={l.href} className="group flex items-baseline gap-3 border-b border-ink/10 py-1 last:border-0 sm:gap-5">
                  <span className="font-sans text-[12px] font-medium tracking-normal text-muted sm:text-[13px]">0{i + 1}</span>
                  <span className="transition-colors group-hover:text-accent">{l.w}</span>
                  <span aria-hidden="true" className="ml-auto self-center font-sans text-[18px] text-ink/30 transition group-hover:translate-x-1 group-hover:text-accent sm:text-[24px]">→</span>
                </Link>
              ))}
            </h1>
            <p className="mt-8 max-w-lg text-[17px] leading-relaxed text-ink-soft">
              A three-person studio. We built and run <a href="#products" className="font-semibold text-ink underline decoration-accent decoration-2 underline-offset-4">Siteory, Delhi PGs and GiftFeels</a>, and we make the ads, shoots and sites for brands that want the same care.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/contact" className="rounded-full bg-ink px-7 py-3.5 text-[15px] font-semibold text-white transition hover:bg-accent">Start a project</Link>
              <Link href="/pricing" className="rounded-full border border-ink/20 px-7 py-3.5 text-[15px] font-semibold transition hover:border-ink">Fixed-price packages</Link>
            </div>
          </div>

          {/* Real-work collage */}
          <div className="relative grid grid-cols-12 grid-rows-[auto_auto] gap-3 lg:col-span-5">
            <figure className="col-span-7 row-span-2 overflow-hidden rounded-2xl bg-ink">
              <div className="relative aspect-[9/16]">
                <AutoVideo src="/media/real/park-mic-ugc.mp4" poster="/media/real/park-mic-ugc.webp" label="AI UGC ad" className="absolute inset-0 h-full w-full object-cover" />
              </div>
              <figcaption className="flex justify-between px-3 py-2 text-[11px] uppercase tracking-wider text-white/70"><span>UGC ad</span><span>0:10</span></figcaption>
            </figure>
            <figure className="col-span-5 overflow-hidden rounded-2xl border border-ink/10 bg-white">
              <img src="/products/dupgs/screen-2.webp" alt="Delhi PGs app" className="aspect-[9/16] w-full object-cover object-top" />
              <figcaption className="px-3 py-2 text-[11px] uppercase tracking-wider text-muted">Delhi PGs · App</figcaption>
            </figure>
            <figure className="col-span-5 overflow-hidden rounded-2xl bg-ink">
              <div className="relative aspect-square">
                <AutoVideo src="/media/real/handbag-showcase.mp4" poster="/media/real/handbag-showcase-480.webp" label="Product film" className="absolute inset-0 h-full w-full object-cover" />
              </div>
              <figcaption className="px-3 py-2 text-[11px] uppercase tracking-wider text-white/70">Product shoot</figcaption>
            </figure>
            <figure className="col-span-12 overflow-hidden rounded-2xl border border-ink/10 bg-white">
              <img src="/products/siteory/desktop.webp" alt="Siteory website" className="aspect-[16/7] w-full object-cover object-top" />
              <figcaption className="flex justify-between px-3 py-2 text-[11px] uppercase tracking-wider text-muted"><span>Siteory · Website</span><span>siteory.co</span></figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
