'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { usePortfolioRotation } from '@/hooks/usePortfolioRotation';
import { PauseButton } from '@/components/PauseButton';
import { portalFrames } from '@/content/placeholders';

export function PortfolioPortal() {
  const { index, paused, toggle } = usePortfolioRotation(portalFrames.length, 1500);
  const wrapRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="relative mx-auto mt-16 sm:mt-20" style={{ width: 'clamp(320px, 55vw, 700px)' }}>
      <div
        ref={wrapRef}
        className="relative overflow-hidden rounded-full bg-ink-section"
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

      <p className="mt-5 text-center text-[13px] uppercase tracking-wordmark text-muted">
        {portalFrames[index].label} · work we&apos;ve shipped
      </p>
    </div>
  );
}
