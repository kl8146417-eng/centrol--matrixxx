import Link from 'next/link';
import { services } from '@/content/site';

/**
 * Near-black numbered services grid (matches the supplied reference image).
 * Human-written descriptions only — no AI filler.
 */
export function ServicesGrid({ heading = true }: { heading?: boolean }) {
  return (
    <section className="bg-ink-section text-white">
      <div className="mx-auto max-w-editorial px-5 py-20 sm:px-8 sm:py-28">
        {heading && (
          <div className="mb-14 flex flex-col gap-4 sm:mb-20 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="font-display text-display-md">
              What we do, <span className="italic text-accent">in plain terms.</span>
            </h2>
            <Link
              href="/services"
              className="text-[15px] text-white/70 underline-offset-4 transition-opacity hover:opacity-60 hover:underline"
            >
              See the full list →
            </Link>
          </div>
        )}

        <div className="grid gap-x-12 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div key={s.n} className="border-t border-white/15 pt-5">
              <span className="font-display text-sm text-accent">{s.n}</span>
              <h3 className="mt-3 font-display text-2xl">{s.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-white/65">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
