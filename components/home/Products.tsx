import type React from 'react';
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { products, type Product } from '@/content/products';
import { work } from '@/content/site';
import { Phone, StoreBadge } from './Phone';
import { AutoVideo } from './AutoVideo';
import { AnimIcon } from '@/components/icons/AnimIcon';

const toneCls = { dark: 'bg-ink-section text-white', light: 'bg-[#F4F4F2] text-ink', blue: 'bg-accent text-white' } as const;

export function ProductCard({ p, flip, extra }: { p: Product; flip?: boolean; extra?: React.ReactNode }) {
  const dark = p.tone !== 'light';
  const ext = p.url?.startsWith('http');
  return (
    <article data-reveal className={`grid overflow-hidden rounded-[2rem] lg:grid-cols-2 ${toneCls[p.tone]}`}>
      <div className={`flex flex-col justify-center p-8 sm:p-12 ${flip ? 'lg:order-2' : ''}`}>
        <div className="flex items-center gap-3">
          {p.icon && <img src={p.icon} alt="" className="h-12 w-12 rounded-xl" />}
          <p className={`text-[12px] uppercase tracking-wordmark ${dark ? 'text-white/60' : 'text-muted'}`}>{p.kind}<span className="block normal-case tracking-normal opacity-80">Built by Centrol Matrix</span></p>
        </div>
        <h3 className="mt-5 font-display text-[clamp(40px,4.5vw,64px)] leading-none">{p.name}</h3>
        {p.tagline && <p className="mt-4 font-display text-2xl italic text-accent">{p.tagline}</p>}
        <p className={`mt-5 max-w-md text-[16px] leading-relaxed ${dark ? 'text-white/75' : 'text-ink-soft'}`}>{p.blurb}</p>
        {p.features && <ul className="mt-5 flex flex-wrap gap-2">{p.features.map((f) => <li key={f} className={`rounded-full border px-3 py-1 text-[13px] ${dark ? 'border-white/20' : 'border-ink/15'}`}>{f}</li>)}</ul>}
        {p.stat && <p className={`mt-5 text-[14px] font-semibold ${dark ? 'text-white' : 'text-ink'}`}>{p.stat}</p>}
        {extra}
        <div className="mt-7 flex flex-wrap items-center gap-3">
          {p.visit && (
            <a href={p.visit} target="_blank" rel="noopener noreferrer" data-icon-host
              className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-[15px] font-semibold transition hover:scale-[1.02] ${p.tone === 'blue' ? 'bg-white text-accent' : dark ? 'bg-accent text-white hover:bg-accent-dark' : 'bg-ink text-white'}`}>
              Visit {p.name} <AnimIcon name="arrowUR" size={16} />
            </a>
          )}
          {p.stores?.map((s) => <StoreBadge key={s.label} {...s} dark={!dark} />)}
          {p.url && ext && p.url !== p.visit && (
            <a href={p.url} target="_blank" rel="noopener noreferrer" className={`rounded-full border px-5 py-2.5 text-[14px] font-semibold ${dark ? 'border-white/25 hover:bg-white hover:text-ink' : 'border-ink/15 hover:border-ink'}`}>{p.url.replace(/^https?:\/\//, '').replace(/\/$/, '')} ↗</a>
          )}
          {p.url && !ext && <Link href={p.url} className={`rounded-full border px-5 py-2.5 text-[14px] font-semibold ${dark ? 'border-white/25 hover:bg-white hover:text-ink' : 'border-ink/15'}`}>Case study →</Link>}
        </div>
      </div>
      <div className={`relative flex min-h-[380px] items-end justify-center gap-4 overflow-hidden px-6 pt-12 sm:min-h-[520px] ${flip ? 'lg:order-1' : ''}`}>
        {p.video ? (
          <AutoVideo src={p.video} poster={p.poster} label={`${p.name} demo`} className="absolute inset-6 h-[calc(100%-3rem)] w-[calc(100%-3rem)] rounded-2xl object-cover" />
        ) : p.desktop ? (
          <>
            <img src={p.desktop} alt={`${p.name} homepage`} loading="lazy" className="w-[88%] rounded-t-2xl border border-ink/10 shadow-2xl" data-parallax="-6" />
            {p.screens[0] && <Phone src={p.screens[0]} alt={`${p.name} on mobile`} className="absolute bottom-[-40px] right-6 w-[30%] max-w-[180px]" />}
          </>
        ) : p.flatScreens ? (
          p.screens.map((s, i) => <img key={s} src={s} alt={`${p.name} store graphic ${i + 1}`} loading="lazy" className={`w-[30%] max-w-[210px] rounded-2xl shadow-2xl ${i === 1 ? 'mb-10' : '-mb-6'}`} />)
        ) : (
          p.screens.map((s, i) => <Phone key={s} src={s} alt={`${p.name} screen ${i + 1}`} className={`w-[30%] max-w-[210px] ${i === 1 ? 'mb-10' : '-mb-10'}`} />)
        )}
      </div>
    </article>
  );
}

export function Products() {
  return (
    <section id="products" className="mx-auto max-w-editorial px-5 py-24 sm:px-8 sm:py-32">
      <div data-reveal>
        <p className="text-[12px] uppercase tracking-wordmark text-accent">Built by Centrol Matrix</p>
        <h2 className="mt-3 max-w-3xl font-display text-display-md text-ink">We don&apos;t just pitch it. <span className="italic text-accent">We ship it.</span></h2>
        <p className="mt-4 max-w-xl text-[16px] text-muted">Apps in the stores, a SaaS product and storefront demos. Every one designed, built and run by Centrol Matrix, the same team that builds for clients.</p>
      </div>
      <div className="mt-14 space-y-6">
        {products.map((p, i) => <ProductCard key={p.id} p={p} flip={i % 2 === 1} />)}
      </div>
      <div className="mt-16" data-reveal>
        <div className="flex items-end justify-between gap-4">
          <h3 className="font-display text-3xl text-ink">More sites we&apos;ve shipped</h3>
          <Link href="/websites" className="text-[14px] font-semibold text-accent">See them live →</Link>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5" data-stagger>
          {work.filter((w) => !['GiftFeels', 'DUPGS'].includes(w.name)).map((w) => (
            <a key={w.name} href={w.url} target="_blank" rel="noopener noreferrer" className="group">
              <div className="overflow-hidden rounded-2xl border border-ink/10"><img src={w.image} alt={`${w.name} website`} loading="lazy" className="aspect-[4/3] w-full object-cover object-top transition-transform duration-500 group-hover:scale-105" /></div>
              <p className="mt-2 text-[14px] font-medium text-ink">{w.name}</p>
              <p className="text-[12px] text-muted">{w.domain}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
