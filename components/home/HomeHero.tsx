/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { AutoVideo } from './AutoVideo';
import { PhoneLine } from '@/components/PhoneLine';

const MAKES = [
  { w: 'Product photos', href: '/services#photos' },
  { w: 'Amazon listing images', href: '/services#photos' },
  { w: 'UGC video ads', href: '/services#ugc' },
  { w: 'Shopify stores & fixes', href: '/services#shopify' },
  { w: 'Lead follow-up', href: '/services#follow-up' },
];

export function HomeHero() {
  return (
    <section className="relative bg-[#F4F4F2] text-ink">
      <div className="mx-auto grid max-w-editorial gap-12 px-5 pb-14 pt-28 sm:px-8 sm:pt-36 lg:grid-cols-12 lg:gap-10 lg:pb-24">
        <div className="flex flex-col justify-center lg:col-span-7">
          <p className="text-[15px] font-medium text-ink-soft">For brands selling on Shopify and Amazon</p>
          <h1 className="mt-4 font-display text-[clamp(40px,6.4vw,100px)] leading-[0.98] tracking-[-0.02em]">
            Product photos, UGC ads and Shopify fixes <span className="italic text-accent">for e-commerce brands.</span>
          </h1>
          <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-ink-soft sm:text-[18px]">
            We turn the product shots you already have into lifestyle and listing images, make UGC-style video ads from them, and build or fix the Shopify store they point to. Fixed prices, delivered in days.
          </p>
          <div className="mt-8 flex flex-col gap-3 min-[420px]:flex-row min-[420px]:flex-wrap min-[420px]:items-center">
            <Link href="/audit" data-track="audit_cta" data-track-label="hero" className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-accent px-7 text-[16px] font-semibold text-white transition hover:bg-accent-dark">Get a free site audit</Link>
            <Link href="/pricing" className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-white px-7 text-[16px] font-semibold transition hover:bg-ink hover:text-white">See prices</Link>
            <Link href="/work" className="inline-flex min-h-[44px] items-center px-2 text-[15px] font-semibold text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-ink">See work</Link>
          </div>
          <PhoneLine size="sm" className="mt-8 border-l-2 border-accent pl-4" />
        </div>

        <div className="relative lg:col-span-5">
          <figure className="relative mx-auto w-full max-w-[460px] lg:mr-0">
            <div className="relative aspect-square overflow-hidden rounded-[1.75rem] bg-[#E9E7E2]">
              <img src="/media/angleforge/bag-lifestyle.webp" alt="AI-generated lifestyle shot of a white blossom-print shoulder bag on a wooden table by a window." fetchPriority="high" className="absolute inset-0 h-full w-full object-cover object-[50%_60%]" />
              <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[12px] font-medium text-ink">Product photo sample</span>
            </div>
            <div className="absolute -bottom-8 -left-3 w-[34%] max-w-[150px] overflow-hidden rounded-2xl border-4 border-[#F4F4F2] bg-ink shadow-xl sm:-left-8">
              <div className="relative aspect-[9/16]">
                <img src="/media/real/park-mic-ugc-480.webp" alt="" className="absolute inset-0 h-full w-full object-cover lg:hidden" />
                <div className="absolute inset-0 hidden lg:block">
                  <AutoVideo src="/media/real/park-mic-ugc-480.mp4" poster="/media/real/park-mic-ugc-480.webp" label="AI UGC ad sample" className="absolute inset-0 h-full w-full object-cover" />
                </div>
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-2 pb-2 pt-6 text-[11px] font-medium text-white">UGC ad sample</span>
              </div>
            </div>
            <figcaption className="mt-12 text-[13px] leading-relaxed text-muted lg:pl-[30%]">
              Samples made with our own tools (AngleForge and our UGC pipeline). AI-generated, not client work.
            </figcaption>
          </figure>
        </div>
      </div>

      <nav aria-label="What we make" className="mx-auto max-w-editorial px-5 pb-12 sm:px-8">
        <ul className="flex flex-wrap gap-2">
          {MAKES.map((d) => (
            <li key={d.w}><Link href={d.href} className="inline-flex min-h-[44px] items-center rounded-full bg-white px-4 text-[14px] font-medium text-ink-soft transition-colors hover:text-accent">{d.w}</Link></li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
