import Link from 'next/link';
import Image from 'next/image';
import { work } from '@/content/site';
import { portalFrames } from '@/content/placeholders';

/**
 * Asymmetric selected-work layout: first item large, the rest stacked.
 * Placeholder media now; swap for real screenshots later.
 */
export function SelectedWork() {
  const [lead, ...others] = work;
  const frameFor = (i: number) => portalFrames[i % portalFrames.length].src;

  return (
    <section className="mx-auto max-w-editorial px-5 py-20 sm:px-8 sm:py-28">
      <div className="mb-12 flex items-end justify-between">
        <h2 className="font-display text-display-md text-ink">Selected work</h2>
        <Link
          href="/work"
          className="text-[15px] text-ink underline-offset-4 transition-opacity hover:opacity-60 hover:underline"
        >
          See all →
        </Link>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
        <article className="group">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-ink-section">
            <Image
              src={frameFor(0)}
              alt={`${lead.name} (placeholder)`}
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </div>
          <h3 className="mt-5 font-display text-3xl text-ink">{lead.name}</h3>
          <p className="mt-2 max-w-md text-[15px] leading-relaxed text-muted">{lead.blurb}</p>
        </article>

        <div className="grid content-start gap-8">
          {others.slice(0, 2).map((w, i) => (
            <article key={w.name} className="group">
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-ink-section">
                <Image
                  src={frameFor(i + 1)}
                  alt={`${w.name} (placeholder)`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <h3 className="mt-4 font-display text-2xl text-ink">{w.name}</h3>
              <p className="mt-1 text-[14px] leading-relaxed text-muted">{w.blurb}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
