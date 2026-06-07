'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { hero } from '@/content/site';
import { PortfolioPortal } from '@/components/PortfolioPortal';

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const lines = root.querySelectorAll<HTMLElement>('[data-hero-line]');
    const accent = root.querySelector<HTMLElement>('[data-hero-accent]');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced) {
      gsap.set([...lines, accent].filter(Boolean), { opacity: 1, y: 0, scale: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        lines,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power4.out', stagger: 0.12 }
      );
      if (accent) {
        gsap.fromTo(
          accent,
          { y: 16, opacity: 0, scale: 0.96 },
          { y: 0, opacity: 1, scale: 1, duration: 0.9, ease: 'power4.out', delay: 0.25 }
        );
      }
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="hero-section relative px-5 pb-8 pt-32 sm:px-8 sm:pt-40">
      <div className="relative z-10 mx-auto max-w-editorial">
        <h1 className="font-display text-display-xl text-ink">
          <span data-hero-line className="block opacity-0">
            {hero.line1}
          </span>
          <span data-hero-line className="block opacity-0">
            {hero.line2}
          </span>
          <span data-hero-accent className="mt-1 block italic text-accent opacity-0">
            {hero.accent}
          </span>
        </h1>

        <p className="hero-lede mt-8 max-w-xl text-[17px] leading-relaxed text-ink-soft">
          We build websites, content engines, and AI automations that earn their keep. No theme
          packs, no filler, no work you have to redo in six months.
        </p>
      </div>

      <div className="relative z-10">
        <PortfolioPortal />
      </div>
    </section>
  );
}
