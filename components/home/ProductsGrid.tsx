/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { products, type Product } from '@/content/products';
import { AutoVideo } from './AutoVideo';
import { AnimIcon } from '@/components/icons/AnimIcon';

const thumb = (p: Product) => p.thumb || p.desktop || p.screens[0];

function Tile({ p }: { p: Product }) {
  const img = thumb(p);
  return (
    <a href={p.visit || p.url} target="_blank" rel="noopener noreferrer" data-icon-host className="group flex flex-col overflow-hidden rounded-3xl bg-white transition hover:-translate-y-1">
      <div className={`relative aspect-[16/10] overflow-hidden ${p.desktop && !p.thumb ? 'bg-[#E9E7E2]' : 'bg-ink-section'}`}>
        {img && <img src={img} alt={`${p.name} screenshot`} loading="lazy" className={`absolute inset-0 h-full w-full transition-transform duration-700 group-hover:scale-[1.04] ${p.thumb || p.desktop ? 'object-cover object-left-top' : 'object-contain py-4'}`} />}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-3">
          {p.icon && <img src={p.icon} alt="" className="h-9 w-9 rounded-lg" loading="lazy" />}
          <div>
            <h3 className="font-display text-2xl leading-none text-ink">{p.name}</h3>
            <p className="mt-1 text-[13px] text-muted">{p.kind}</p>
          </div>
        </div>
        <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">{p.short || p.blurb}</p>
        {p.stat && <p className="mt-3 text-[13px] font-medium text-ink">{p.stat}</p>}
        <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[14px] font-semibold text-accent">Visit {p.name} <AnimIcon name="arrowUR" size={15} /></span>
      </div>
    </a>
  );
}

/** Home: ORVA as the fashion-web proof, then every product we run as a compact tile. */
export function ProductsGrid() {
  const orva = products.find((p) => p.id === 'orva');
  const hanger = products.find((p) => p.id === 'hanger-club');
  const rest = products.filter((p) => p.id !== 'orva' && p.id !== 'hanger-club');
  return (
    <section id="products" className="bg-[#F4F4F2] py-24 sm:py-32">
      <div className="mx-auto max-w-editorial px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end" data-reveal>
          <h2 className="max-w-3xl font-display text-display-md text-ink">We build and run our own products. <span className="italic text-accent">Yours get the same team.</span></h2>
          <Link href="/apps" className="self-start rounded-full bg-ink px-5 py-2.5 text-[14px] font-semibold text-white transition hover:bg-accent md:self-auto">All products →</Link>
        </div>

        {orva && (
          <article data-reveal className="mt-12 grid overflow-hidden rounded-[2rem] bg-ink-section text-white lg:grid-cols-5">
            <div className="relative aspect-[16/10] lg:col-span-3 lg:aspect-auto lg:min-h-[440px]">
              <AutoVideo src={orva.video!} poster={orva.poster} label="ORVA storefront demo" className="absolute inset-0 h-full w-full object-cover" />
            </div>
            <div className="flex flex-col justify-center p-8 sm:p-12 lg:col-span-2">
              <p className="text-[13px] text-[#7DA2FF]">Storefront · our in-house clothing label</p>
              <h3 className="mt-3 font-display text-[clamp(40px,4vw,60px)] leading-none">ORVA</h3>
              <p className="mt-5 text-[16px] leading-relaxed text-white/80">{orva.blurb}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/work/orva" className="rounded-full bg-white px-6 py-3 text-[15px] font-semibold text-ink transition hover:bg-[#7DA2FF]">Read the case study</Link>
                {orva.visit && <a href={orva.visit} target="_blank" rel="noopener noreferrer" className="rounded-full bg-white/10 px-6 py-3 text-[15px] font-semibold text-white transition hover:bg-white/20">Try the rail ↗</a>}
              </div>
              {hanger?.visit && (
                <a href={hanger.visit} target="_blank" rel="noopener noreferrer" className="mt-8 flex items-center gap-4 rounded-2xl bg-white/5 p-3 pr-5 transition hover:bg-white/10">
                  <img src={hanger.screens[0]} alt="" className="h-16 w-11 rounded-lg object-cover object-top" loading="lazy" />
                  <span className="text-[14px] leading-snug text-white/80"><span className="font-semibold text-white">Hanger Club</span>, the same rail as a wardrobe app: add your own pieces from a photo ↗</span>
                </a>
              )}
            </div>
          </article>
        )}

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" data-stagger>
          {rest.map((p) => <Tile key={p.id} p={p} />)}
        </div>
      </div>
    </section>
  );
}
