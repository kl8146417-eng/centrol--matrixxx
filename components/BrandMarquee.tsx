import { work } from '@/content/site';

/**
 * Looping strip of work/products we've shipped. A static "Our creations" label
 * sits on the left; the items loop endlessly to its right. CSS-driven, pauses
 * on hover, collapses to a static row under reduced motion.
 */
export function BrandMarquee() {
  const items = [...work, ...work]; // duplicate once for a seamless loop
  return (
    <section aria-label="Work we've shipped" className="border-y border-ink/10 py-7 sm:py-9">
      <div className="flex items-center gap-6 sm:gap-10">
        {/* Static label — never scrolls. */}
        <div className="shrink-0 pl-5 sm:pl-8">
          <span className="block text-[11px] font-medium uppercase tracking-[0.18em] text-muted">
            Our creations
          </span>
          <span className="mt-1 block h-px w-10 bg-accent" aria-hidden />
        </div>

        {/* Looping track. The left fade hides the seam where items meet the label. */}
        <div className="group relative flex-1 overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-bg to-transparent"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-bg to-transparent"
          />
          <div className="flex w-max animate-[marquee_28s_linear_infinite] items-center gap-14 group-hover:[animation-play-state:paused] sm:gap-20">
            {items.map((w, i) => {
              const dupe = i >= work.length;
              return (
                <a
                  key={`${w.name}-${i}`}
                  href={w.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={dupe ? -1 : 0}
                  aria-hidden={dupe}
                  aria-label={`${w.name} — ${w.domain} (opens in a new tab)`}
                  className="group/item shrink-0 font-display text-2xl text-ink/45 transition-colors duration-200 hover:text-ink sm:text-3xl"
                >
                  {w.name}
                  <span className="ml-2 align-middle text-sm text-accent opacity-0 transition-opacity duration-200 group-hover/item:opacity-100">
                    ↗
                  </span>
                </a>
              );
            })}
          </div>
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
