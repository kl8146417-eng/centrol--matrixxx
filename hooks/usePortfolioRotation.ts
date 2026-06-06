'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Auto-advances an index through `count` frames every `intervalMs`.
 * Pausable. Respects prefers-reduced-motion by slowing/stopping auto-advance.
 */
export function usePortfolioRotation(count: number, intervalMs = 1500) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedRef = useRef(false);

  useEffect(() => {
    reducedRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  useEffect(() => {
    if (paused || count <= 1) return;
    // With reduced motion we still rotate, just slower and without the scale tween (handled in UI).
    const step = reducedRef.current ? intervalMs * 2.5 : intervalMs;
    const t = setInterval(() => setIndex((i) => (i + 1) % count), step);
    return () => clearInterval(t);
  }, [paused, count, intervalMs]);

  return {
    index,
    paused,
    toggle: () => setPaused((p) => !p),
    goTo: (i: number) => setIndex(((i % count) + count) % count),
  };
}
