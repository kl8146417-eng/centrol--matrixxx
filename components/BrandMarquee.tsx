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
