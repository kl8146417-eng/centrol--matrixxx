'use client';
import { useEffect, useRef, useState } from 'react';

/**
 * Muted looping video.
 * - Desktop/tablet: loads and plays only while on screen.
 * - Phones (<768px) and reduced-motion users: never autoplays. Shows the poster with a play button
 *   and loads `mobileSrc` (the 480p preview) only when tapped.
 * Place it inside a positioned container; the play button covers that container.
 */
export function AutoVideo({ src, poster, className = '', label, mobileSrc }: { src: string; poster?: string; className?: string; label?: string; mobileSrc?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [tap, setTap] = useState(false);

  useEffect(() => {
    const v = ref.current; if (!v) return;
    const small = window.matchMedia('(max-width: 767px)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (small || reduce) { setTap(true); return; }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { if (!v.src) v.src = src; v.play().catch(() => {}); } else v.pause();
    }, { rootMargin: '150px' });
    io.observe(v); return () => io.disconnect();
  }, [src]);

  const start = () => {
    const v = ref.current; if (!v) return;
    if (!v.src) v.src = mobileSrc || src;
    v.play().catch(() => {});
    setTap(false);
  };

  return (
    <>
      <video ref={ref} poster={poster} muted loop playsInline preload="none" aria-label={label} className={className} />
      {tap && (
        <button type="button" onClick={start} aria-label={`Play ${label || 'video'}`} className="absolute inset-0 flex items-center justify-center">
          <span aria-hidden="true" className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 pl-1 text-[18px] text-ink shadow-lg">▶</span>
        </button>
      )}
    </>
  );
}
