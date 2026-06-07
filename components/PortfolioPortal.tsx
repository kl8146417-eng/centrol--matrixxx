'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePortfolioRotation } from '@/hooks/usePortfolioRotation';
import { PauseButton } from '@/components/PauseButton';
import { portalFrames } from '@/content/placeholders';

gsap.registerPlugin(ScrollTrigger);

export function PortfolioPortal() {
  const { index, paused, toggle } = usePortfolioRotation(portalFrames.length, 1500);
  const wrapRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const growRef = useRef<HTMLDivElement>(null);

  // Reveal: scale 0 -> 1, opacity 0 -> 1, ~0.7s after load.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      gsap.set(el, { opacity: 1, scale: 1 });
      return;
    }
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 1, duration: 1.2, ease: 'expo.out', delay: 0.7 }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  // Subtle ±6px mouse parallax on the inner stack.
  useEffect(() => {
    const wrap = wrapRef.current;
    const stack = stackRef.current;
    if (!wrap || !stack) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const onMove = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
      const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
      gsap.to(stack, { x: dx * 6, y: dy * 6, duration: 0.4, ease: 'power2.out' });
    };
    const onLeave = () => gsap.to(stack, { x: 0, y: 0, duration: 0.4, ease: 'power2.out' });

    wrap.addEventListener('pointermove', onMove);
    wrap.addEventListener('pointerleave', onLeave);
    return () => {
      wrap.removeEventListener('pointermove', onMove);
      wrap.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  // Scroll-driven growth: a fixed dark circle, pinned to the portal's live
  // screen position and matched to its size, scales up as you scroll the hero
  // until it fills the viewport — so the portal itself appears to swell out and
  // flood the page with its colour. Sits behind the portal media (z-0), so at
  // rest it's perfectly hidden under the real circle. Reverses on scroll-up and
  // flips surrounding chrome to light past the crossover.
  useEffect(() => {
    const wrap = wrapRef.current;
    const grow = growRef.current;
    const hero = wrap?.closest('.hero-section') as HTMLElement | null;
    if (!wrap || !grow || !hero) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      gsap.set(grow, { opacity: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      // Pin the grow-circle to the portal's current footprint (centre + size).
      const sync = () => {
        const r = wrap.getBoundingClientRect();
        gsap.set(grow, {
          width: r.width,
          height: r.height,
          left: r.left + r.width / 2,
          top: r.top + r.height / 2,
          xPercent: -50,
          yPercent: -50,
        });
      };
      sync();

      // Scale needed to cover the viewport diagonal from the portal's footprint.
      const targetScale = () => {
        const base = wrap.getBoundingClientRect().width || 1;
        const diag = Math.hypot(window.innerWidth, window.innerHeight);
        return (diag / base) * 1.2;
      };

      gsap.set(grow, { scale: 1, opacity: 1, transformOrigin: '50% 50%' });

      // Toggle the fixed circle's visibility so it only paints while the hero
      // is in play. Once the hero has scrolled away, hide it completely so it
      // can never cover later sections (e.g. the footer).
      const show = (on: boolean) =>
        gsap.set(grow, { autoAlpha: on ? 1 : 0 });

      const st = ScrollTrigger.create({
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.2,
        onRefresh: (self) => {
          sync();
          // Hidden when we're already past the hero on refresh/resize.
          show(self.progress < 1);
        },
        onUpdate: (self) => {
          const p = self.progress;
          sync();
          gsap.set(grow, { scale: 1 + (targetScale() - 1) * p });
          document.documentElement.toggleAttribute('data-hero-dark', p > 0.45);
        },
        // Hero scrolled out of view: kill the fixed circle entirely.
        onLeave: () => show(false),
        // Scrolling back into the hero: bring it back.
        onEnterBack: () => show(true),
        onLeaveBack: () => document.documentElement.removeAttribute('data-hero-dark'),
      });

      return () => {
        st.kill();
        document.documentElement.removeAttribute('data-hero-dark');
      };
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative mx-auto mt-16 sm:mt-20" style={{ width: 'clamp(320px, 55vw, 700px)' }}>
      {/* Scroll-driven growing circle — fixed, pinned to the portal, behind the
          media. Becomes the page background as it swells out. */}
      <div
        ref={growRef}
        aria-hidden
        className="pointer-events-none fixed z-0 rounded-full bg-ink-section"
        style={{ willChange: 'transform' }}
      />

      <div
        ref={wrapRef}
        className="relative z-10 overflow-hidden rounded-full bg-ink-section"
        style={{ aspectRatio: '1 / 1', willChange: 'transform, opacity' }}
      >
        <div ref={stackRef} className="absolute inset-0">
          {portalFrames.map((f, i) => {
            const active = i === index;
            return (
              <div
                key={f.id}
                aria-hidden={!active}
                className="absolute inset-0 transition-opacity duration-[600ms] ease-[cubic-bezier(0.65,0,0.35,1)]"
                style={{ opacity: active ? 1 : 0 }}
              >
                <Image
                  src={f.src}
                  alt={`${f.label} — project mockup (placeholder)`}
                  fill
                  priority={i === 0}
                  sizes="(max-width: 768px) 90vw, 700px"
                  className="object-cover transition-transform duration-[1500ms] ease-out"
                  style={{ transform: active ? 'scale(1)' : 'scale(1.04)' }}
                />
              </div>
            );
          })}
        </div>

        {/* soft inner porthole edge */}
        <div className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_0_60px_rgba(0,0,0,0.45)]" />

        <div className="absolute inset-x-0 bottom-6 flex justify-center">
          <PauseButton paused={paused} onToggle={toggle} />
        </div>
      </div>

      <p className="hero-portal-caption mt-5 text-center text-[13px] uppercase tracking-wordmark text-muted">
        {portalFrames[index].label} · work we&apos;ve shipped
      </p>
    </div>
  );
}
