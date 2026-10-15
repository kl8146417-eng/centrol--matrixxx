'use client';
import { useState } from 'react';
import data from '@/content/real-work.json';

type It = (typeof data.items)[number];
export function Showreel() {
  const [open, setOpen] = useState<It | null>(null);
  const loop = [...data.items, ...data.items];
  return (
    <section className="relative overflow-hidden bg-ink-section pb-20 pt-6 text-white sm:pb-28">
      <div className="mx-auto mb-8 flex max-w-editorial items-end justify-between gap-6 px-5 sm:px-8">
        <div data-reveal>
          <p className="text-[12px] uppercase tracking-wordmark text-[#7DA2FF]">Showreel · {data.items.length} published pieces</p>
          <h2 className="mt-3 font-display text-display-md">Made in our pipeline.</h2>
        </div>
        <p className="hidden max-w-sm text-[15px] text-white/60 md:block">UGC ads, product films, fashion, jewellery, social clips and property reels. Hover to play, tap to watch.</p>
      </div>
      <div className="group flex w-max gap-4 animate-[cm-marquee_90s_linear_infinite] hover:[animation-play-state:paused]">
        {loop.map((it, k) => (
          <button key={`${it.id}-${k}`} type="button" onClick={() => setOpen(it)} aria-label={`Play ${it.title}`}
            className="relative h-[300px] shrink-0 overflow-hidden rounded-2xl bg-white/5 sm:h-[380px]" style={{ aspectRatio: `${it.w} / ${it.h}` }}>
            <video poster={it.thumb} muted loop playsInline preload="none" className="h-full w-full object-cover"
              onMouseEnter={(e) => { const v = e.currentTarget; if (!v.src) v.src = it.video; v.play().catch(() => {}); }}
              onMouseLeave={(e) => e.currentTarget.pause()} />
            <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-3 text-left">
              <span className="block text-[10px] uppercase tracking-wider text-[#7DA2FF]">{it.tag}</span>
              <span className="block text-[14px] font-medium">{it.title}</span>
            </span>
          </button>
        ))}
      </div>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4" role="dialog" aria-modal="true" aria-label={open.title} onClick={() => setOpen(null)}>
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <video src={open.video} poster={open.poster} controls autoPlay playsInline className="max-h-[85vh] max-w-full rounded-xl" />
            <p className="mt-3 max-w-xl text-[14px] text-white/80">{open.caption || open.title}</p>
            <button type="button" onClick={() => setOpen(null)} className="absolute -top-10 right-0 text-3xl text-white" aria-label="Close">×</button>
          </div>
        </div>
      )}
    </section>
  );
}
