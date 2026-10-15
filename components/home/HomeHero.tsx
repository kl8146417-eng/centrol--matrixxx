'use client';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import data from '@/content/real-work.json';

const CAPS = ['Websites', 'Mobile apps', 'AI UGC ads', 'Product ads & mockups', 'Social posts', 'Fashion & T-shirt shoots', 'Real estate video', 'AI automation'];
const vertical = data.items.filter((i) => i.h > i.w);
const cols = [0, 1, 2].map((c) => vertical.filter((_, k) => k % 3 === c).slice(0, 5));

function Column({ items, dir, play }: { items: typeof vertical; dir: 'up' | 'down'; play: boolean }) {
  const loop = [...items, ...items];
  return (
    <div className="relative h-full overflow-hidden">
      <div className={`flex flex-col gap-4 ${dir === 'up' ? 'animate-[cm-up_60s_linear_infinite]' : 'animate-[cm-down_60s_linear_infinite]'}`}>
        {loop.map((it, k) => (
          <div key={`${it.id}-${k}`} className="relative aspect-[9/16] w-full overflow-hidden rounded-2xl bg-white/5">
            {play && k === 1 ? (
              <video src={it.video} poster={it.thumb} muted loop autoPlay playsInline preload="metadata" className="h-full w-full object-cover" />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={it.thumb} alt="" loading={k < 3 ? 'eager' : 'lazy'} className="h-full w-full object-cover" />
            )}
            <span className="absolute bottom-2 left-2 rounded-full bg-black/55 px-2 py-0.5 text-[10px] uppercase tracking-wider text-white/80 backdrop-blur">{it.tag}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function HomeHero() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.from('[data-hero-line]', { yPercent: 110, duration: 1.2, ease: 'power4.out', stagger: 0.09, delay: 0.1 });
      gsap.from('[data-hero-fade]', { y: 24, autoAlpha: 0, duration: 1, ease: 'power3.out', stagger: 0.08, delay: 0.5 });
      gsap.from('[data-hero-cols]', { autoAlpha: 0, scale: 0.96, duration: 1.4, ease: 'power3.out', delay: 0.2 });
    }, root);
    return () => ctx.revert();
  }, []);
  return (
    <section ref={root} className="relative overflow-hidden bg-ink-section text-white">
      <div aria-hidden="true" className="pointer-events-none absolute -left-40 top-20 h-[520px] w-[520px] rounded-full bg-accent/30 blur-[140px]" />
      <div className="relative mx-auto grid max-w-editorial gap-12 px-5 pb-16 pt-32 sm:px-8 lg:min-h-[100svh] lg:grid-cols-12 lg:items-center lg:pb-0 lg:pt-16">
        <div className="lg:col-span-7">
          <p data-hero-fade className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1 text-[12px] uppercase tracking-wordmark text-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" /> Full-service studio
          </p>
          <h1 className="mt-7 font-display text-[clamp(46px,6vw,92px)] leading-[0.98] tracking-tight">
            <span className="block overflow-hidden pb-1"><span data-hero-line className="block">Everything your</span></span>
            <span className="block overflow-hidden pb-1"><span data-hero-line className="block">brand needs online,</span></span>
            <span className="block overflow-hidden pb-2"><span data-hero-line className="block italic text-[#7DA2FF]">built in one room.</span></span>
          </h1>
          <p data-hero-fade className="mt-7 max-w-xl text-[17px] leading-relaxed text-white/70">
            We design and ship websites and apps, produce AI UGC ads, product films, mockups and social content, and automate the busywork behind them. One team, one brief, one bill.
          </p>
          <ul data-hero-fade className="mt-7 flex max-w-2xl flex-wrap gap-2">
            {CAPS.map((c) => <li key={c} className="rounded-full border border-white/12 bg-white/[0.04] px-3 py-1 text-[13px] text-white/80">{c}</li>)}
          </ul>
          <div data-hero-fade className="mt-9 flex flex-wrap items-center gap-3">
            <Link href="/contact" className="rounded-full bg-accent px-7 py-3.5 text-[15px] font-semibold text-white transition hover:bg-accent-dark hover:scale-[1.02]">Start a project</Link>
            <Link href="/pricing" className="rounded-full border border-white/20 px-7 py-3.5 text-[15px] font-semibold text-white transition hover:bg-white hover:text-ink">See pricing</Link>
            <Link href="/work" className="px-2 py-3.5 text-[15px] text-white/70 underline-offset-4 hover:text-white hover:underline">Watch the work →</Link>
          </div>
          <a href="#products" data-hero-fade className="mt-10 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] py-1.5 pl-1.5 pr-4 text-[13px] text-white/70 backdrop-blur-md transition hover:border-white/25">
            <span className="flex -space-x-2">
              {['/products/siteory/icon.png', '/products/dupgs/icon.webp', '/products/giftfeels/icon.webp'].map((src) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={src} src={src} alt="" className="h-7 w-7 rounded-full bg-white object-cover ring-2 ring-ink-section" />
              ))}
            </span>
            Makers of Siteory, Delhi PGs and GiftFeels
          </a>
        </div>
        <div data-hero-cols aria-hidden="true" className="relative h-[420px] lg:col-span-5 lg:h-[100svh]">
          <div className="absolute inset-0 grid grid-cols-3 gap-4 [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)]">
            <Column items={cols[0]} dir="up" play />
            <div className="translate-y-[-8%]"><Column items={cols[1]} dir="down" play /></div>
            <Column items={cols[2]} dir="up" play />
          </div>
        </div>
      </div>
    </section>
  );
}
