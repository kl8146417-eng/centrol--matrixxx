/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { AutoVideo } from './AutoVideo';
import { BeforeAfter } from '@/components/BeforeAfter';
import { lookbook } from '@/content/lookbook';
import { products } from '@/content/products';
import { agency } from '@/content/agency';

const DISCIPLINES = [
  { w: 'UGC ads', href: '/pricing#ai_ugc' },
  { w: 'Product shoots', href: '/fashion' },
  { w: 'Websites & storefronts', href: '/pricing#website' },
  { w: 'Apps', href: '/apps' },
  { w: 'Social & clipping', href: '/pricing#content' },
  { w: 'Automation', href: '/pricing#automation' },
];
const PROOF = ['recl', 'siteory', 'giftfeels', 'wishcuts'];

export function HomeHero() {
  const pair = lookbook.find((l) => l.style !== 'ugc') ?? lookbook[0];
  const proof = PROOF.map((id) => products.find((p) => p.id === id)).filter((p): p is NonNullable<typeof p> => !!p);
  return (
    <section className="relative bg-[#F4F4F2] text-ink">
      <div className="mx-auto grid max-w-editorial gap-10 px-5 pb-16 pt-28 sm:px-8 sm:pt-32 lg:grid-cols-12 lg:gap-12 lg:pb-24">
        <div className="flex flex-col justify-center lg:col-span-7">
          <p className="text-[15px] font-medium text-ink-soft">Centrol Matrix, a three-person studio</p>
          <h1 className="mt-4 font-display text-[clamp(48px,7.2vw,112px)] leading-[0.95] tracking-[-0.02em]">
            Ads, shoots and stores <span className="italic text-accent">that sell your product.</span>
          </h1>
          <p className="mt-7 max-w-xl text-[18px] leading-relaxed text-ink-soft">
            We turn your product photos into UGC ads and on-model shots, build the storefront they point to, and automate the busywork behind it. Fixed prices, delivered in days.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            {agency.calUrl ? (
              <a href={agency.calUrl} target="_blank" rel="noopener noreferrer" className="rounded-full bg-ink px-7 py-3.5 text-[15px] font-semibold text-white transition hover:bg-accent">Book a 15-minute call</a>
            ) : (
              <Link href="/contact" className="rounded-full bg-ink px-7 py-3.5 text-[15px] font-semibold text-white transition hover:bg-accent">Start a project</Link>
            )}
            <Link href="/pricing" className="rounded-full bg-white px-7 py-3.5 text-[15px] font-semibold transition hover:bg-ink hover:text-white">See fixed prices</Link>
          </div>
          <Link href="/fashion" data-track="fashion_link" className="mt-5 inline-flex w-fit items-center gap-2 text-[15px] font-semibold text-accent underline decoration-2 underline-offset-4">
            Clothing brand? Get 3 on-model looks free →
          </Link>

          <nav aria-label="What we make" className="mt-10 flex flex-wrap gap-x-5 gap-y-2 text-[15px] text-ink-soft">
            {DISCIPLINES.map((d) => <Link key={d.w} href={d.href} className="transition-colors hover:text-accent">{d.w}</Link>)}
          </nav>
        </div>

        <div className="relative lg:col-span-5">
          {pair ? (
            <>
              <BeforeAfter pair={pair} priority className="mx-auto aspect-[2/3] w-full max-w-[440px] rounded-[1.75rem] lg:mr-0" />
              <p className="mx-auto mt-3 max-w-[440px] text-[13px] text-muted lg:mr-0">Drag to compare. A demo pair from our pipeline: garment photo on the left, AI-generated on-model shot on the right. With your brand, we start from your real photos.</p>
              <figure className="absolute left-0 top-[38%] hidden w-[30%] max-w-[170px] overflow-hidden rounded-2xl border-4 border-[#F4F4F2] bg-ink lg:block xl:-left-6">
                <div className="relative aspect-[9/16]"><AutoVideo src="/media/real/park-mic-ugc-480.mp4" poster="/media/real/park-mic-ugc-480.webp" label="AI UGC ad sample" className="absolute inset-0 h-full w-full object-cover" /></div>
              </figure>
            </>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              <figure className="overflow-hidden rounded-2xl bg-ink"><div className="relative aspect-[9/16]"><AutoVideo src="/media/real/park-mic-ugc-480.mp4" poster="/media/real/park-mic-ugc-480.webp" label="AI UGC ad" className="absolute inset-0 h-full w-full object-cover" /></div></figure>
              <figure className="mt-10 overflow-hidden rounded-2xl bg-ink"><div className="relative aspect-[9/16]"><AutoVideo src="/media/real/graphic-tee-ad-480.mp4" poster="/media/real/graphic-tee-ad-480.webp" label="Fashion ad" className="absolute inset-0 h-full w-full object-cover" /></div></figure>
            </div>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-editorial px-5 pb-12 sm:px-8">
        <Link href="/apps" className="flex flex-wrap items-center gap-x-6 gap-y-3 rounded-2xl bg-white px-6 py-4 transition hover:bg-white/70">
          <span className="text-[14px] font-medium text-ink">We also build and run</span>
          {proof.map((p) => (
            <span key={p.id} className="inline-flex items-center gap-2 text-[14px] text-ink-soft">
              {p.icon && <img src={p.icon} alt="" className="h-6 w-6 rounded-md" />}{p.name}
            </span>
          ))}
          <span className="ml-auto text-[14px] font-semibold text-accent">See the products →</span>
        </Link>
      </div>
    </section>
  );
}
