'use client';
import { useEffect, useState } from 'react';
import data from '@/content/real-work.json';

type Item = { id: string; section: string; title: string; caption?: string; tag?: string; video: string; poster: string; thumb?: string; w: number; h: number; duration: number; lead?: boolean };
const items = data.items as Item[];
const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, '0')}`;

function Card({ it, onOpen }: { it: Item; onOpen: () => void }) {
  return (
    <figure className="group">
      <button type="button" onClick={onOpen} aria-label={`Play: ${it.title}`} className="relative block w-full overflow-hidden rounded-2xl bg-ink" style={{ aspectRatio: `${it.w} / ${it.h}` }}>
        <video
          className="h-full w-full object-cover"
          src={it.video} poster={it.thumb || it.poster} muted loop playsInline preload="none"
          onMouseEnter={(e) => e.currentTarget.play().catch(() => {})}
          onMouseLeave={(e) => { e.currentTarget.pause(); }}
        />
        <span className="absolute bottom-3 left-3 rounded-full bg-black/60 px-2.5 py-0.5 text-[12px] text-white">▶ {fmt(it.duration)}</span>
      </button>
      <figcaption className="mt-3">
        {it.tag && <span className="text-[11px] uppercase tracking-wordmark text-accent">{it.tag}</span>}
        <p className="font-medium text-ink">{it.title}</p>
      </figcaption>
    </figure>
  );
}

export function VideoGallery() {
  const [open, setOpen] = useState<Item | null>(null);
  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(null);
    window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k);
  }, [open]);
  return (
    <div className="mx-auto max-w-editorial px-5 sm:px-8">
      {data.sections.map((s) => {
        const list = items.filter((i) => i.section === s.id);
        if (!list.length) return null;
        return (
          <section key={s.id} id={s.id} className="scroll-mt-24 border-t border-ink/10 py-16">
            <p className="text-[12px] uppercase tracking-wordmark text-accent">{s.eyebrow}</p>
            <h2 className="mt-3 max-w-3xl font-display text-display-md text-ink">{s.title}</h2>
            <p className="mt-3 max-w-xl text-[16px] text-muted">{s.blurb}</p>
            <div className="mt-10 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
              {list.map((it) => <Card key={it.id} it={it} onOpen={() => setOpen(it)} />)}
            </div>
          </section>
        );
      })}
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4" role="dialog" aria-modal="true" aria-label={open.title} onClick={() => setOpen(null)}>
          <div className="relative max-h-full" onClick={(e) => e.stopPropagation()}>
            <video src={open.video} poster={open.poster} controls autoPlay playsInline className="max-h-[85vh] max-w-full rounded-xl" />
            <p className="mt-3 max-w-xl text-[14px] text-white/80">{open.caption || open.title}</p>
            <button type="button" onClick={() => setOpen(null)} className="absolute -top-10 right-0 text-3xl text-white" aria-label="Close">×</button>
          </div>
        </div>
      )}
    </div>
  );
}
export const videoCount = items.length;
