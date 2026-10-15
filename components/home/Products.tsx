import type React from 'react';
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { products, type Product } from '@/content/products';
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
