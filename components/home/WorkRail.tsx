'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import data from '@/content/real-work.json';
import { AnimIcon } from '@/components/icons/AnimIcon';

type It = (typeof data.items)[number];
// Small preview encodes sit next to each full video (scripts/media). Full file plays in the viewer.
const preview = (it: It) => it.video.replace(/\.mp4$/, '-480.mp4');

/**
 * One rail of everything we've published, filterable by category. Replaces the doubled
 * marquee: each clip exists once, previews load on hover/focus only, tap opens the full cut.
 */
export function WorkRail({ dark = true, heading = 'Made in our pipeline.', only }: { dark?: boolean; heading?: string; only?: string[] }) {
  const pool = only ? data.items.filter((i) => only.includes(i.section)) : data.items;
  const secs = data.sections.filter((s) => pool.some((i) => i.section === s.id));
  const [cur, setCur] = useState<string>('all');
  const [open, setOpen] = useState<It | null>(null);
  const rail = useRef<HTMLDivElement>(null);
  // "All" leads with fashion, the work most visitors come for.
  const ORDER = ['fashion', 'ugc', 'jewellery', 'product', 'replication', 'social', 'realestate'];
  const items = cur === 'all' ? [...pool].sort((a, b) => ORDER.indexOf(a.section) - ORDER.indexOf(b.section)) : pool.filter((i) => i.section === cur);
  const sec = secs.find((s) => s.id === cur);

  useEffect(() => { rail.current?.scrollTo({ left: 0, behavior: 'smooth' }); }, [cur]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const nudge = (dir: 1 | -1) => rail.current?.scrollBy({ left: dir * rail.current.clientWidth * 0.8, behavior: 'smooth' });
  const play = (v: HTMLVideoElement, it: It) => { if (!v.src) v.src = preview(it); v.play().catch(() => {}); };

  return (
    <section id="work" className={`py-20 sm:py-28 ${dark ? 'bg-ink-section text-white' : 'bg-[#F4F4F2] text-ink'}`}>
      <div className="mx-auto max-w-editorial px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div data-reveal className="max-w-2xl">
            <h2 className="font-display text-display-md">{sec ? sec.title : heading}</h2>
            <p className={`mt-3 text-[16px] ${dark ? 'text-white/70' : 'text-muted'}`}>
              {sec ? sec.blurb : only ? 'Hover to preview, tap to watch the full cut.' : `${data.items.length} published pieces: UGC ads, product films, fashion, jewellery, social clips and property reels. Hover to preview, tap to watch.`}
            </p>
          </div>
          <div role="tablist" aria-label="Work categories" className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] lg:mx-0 lg:flex-wrap lg:justify-end lg:px-0">
            {[{ id: 'all', eyebrow: 'All work' }, ...secs].map((s) => (
              <button key={s.id} type="button" role="tab" aria-selected={cur === s.id} onClick={() => setCur(s.id)}
                className={`shrink-0 rounded-full px-4 py-2 text-[13px] font-medium transition-colors ${cur === s.id ? (dark ? 'bg-white text-ink' : 'bg-ink text-white') : dark ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-white text-ink hover:bg-ink/10'}`}>
                {s.eyebrow}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="relative mt-10">
        <div ref={rail} className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pb-4 [scrollbar-width:none] sm:scroll-px-8 sm:px-8 xl:px-[max(2rem,calc((100vw-1320px)/2+2rem))]">
          {items.map((it) => (
            <button key={`${cur}-${it.id}`} type="button" onClick={() => setOpen(it)} aria-label={`Watch ${it.title}`}
              onMouseEnter={(e) => { const v = e.currentTarget.querySelector('video'); if (v) play(v, it); }}
              onMouseLeave={(e) => e.currentTarget.querySelector('video')?.pause()}
              onFocus={(e) => { const v = e.currentTarget.querySelector('video'); if (v) play(v, it); }}
              onBlur={(e) => e.currentTarget.querySelector('video')?.pause()}
              className="group relative h-[340px] shrink-0 snap-start overflow-hidden rounded-2xl bg-black/20 text-left sm:h-[420px]"
              style={{ aspectRatio: `${it.w} / ${it.h}` }}>
              <video poster={it.thumb} muted loop playsInline preload="none" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
              <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 pt-12 text-white">
                <span className="block text-[12px] text-[#7DA2FF]">{it.tag}</span>
                <span className="block text-[15px] font-medium leading-snug">{it.title}</span>
              </span>
              <span aria-hidden="true" className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[13px] text-ink transition group-hover:scale-110">▶</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-6 flex max-w-editorial items-center justify-between gap-4 px-5 sm:px-8">
        <Link href={cur === 'all' ? '/work' : `/work#${cur}`} data-icon-host className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-[15px] font-semibold transition ${dark ? 'bg-white text-ink hover:bg-[#7DA2FF]' : 'bg-ink text-white hover:bg-accent'}`}>
          See all work <AnimIcon name="arrow" size={18} />
        </Link>
        <div className="hidden gap-2 sm:flex">
          <button type="button" onClick={() => nudge(-1)} aria-label="Scroll work left" className={`h-11 w-11 rounded-full text-lg transition ${dark ? 'bg-white/10 hover:bg-white/20' : 'bg-white hover:bg-ink/10'}`}>←</button>
          <button type="button" onClick={() => nudge(1)} aria-label="Scroll work right" className={`h-11 w-11 rounded-full text-lg transition ${dark ? 'bg-white/10 hover:bg-white/20' : 'bg-white hover:bg-ink/10'}`}>→</button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4" role="dialog" aria-modal="true" aria-label={open.title} onClick={() => setOpen(null)}>
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <video src={open.video} poster={open.poster} controls autoPlay playsInline className="max-h-[82vh] max-w-full rounded-xl" />
            <p className="mt-3 max-w-xl text-[14px] text-white/80">{open.caption || open.title}</p>
            <button type="button" onClick={() => setOpen(null)} className="absolute -top-11 right-0 h-10 w-10 text-3xl text-white" aria-label="Close" autoFocus>×</button>
          </div>
        </div>
      )}
    </section>
  );
}
