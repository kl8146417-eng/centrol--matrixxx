import { work } from '@/content/site';

/**
 * Looping strip of work/products we've shipped. CSS-driven, pauses on hover,
 * collapses to a static row under reduced motion (handled in globals.css).
 */
export function BrandMarquee() {
  const items = [...work, ...work]; // duplicate once for a seamless loop
  return (
    <section aria-label="Work we've shipped" className="border-y border-ink/10 py-7 sm:py-9">
      <div className="group relative overflow-hidden">
        <div className="flex w-max animate-[marquee_28s_linear_infinite] items-center gap-14 group-hover:[animation-play-state:paused] sm:gap-20">
          {items.map((w, i) => (
            <span
              key={`${w.name}-${i}`}
              className="font-display text-2xl text-ink/45 transition-colors duration-200 hover:text-ink sm:text-3xl"
              aria-hidden={i >= work.length}
            >
              {w.name}
            </span>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-\\[marquee_28s_linear_infinite\\] { animation: none; }
        }
      `}</style>
    </section>
  );
}
