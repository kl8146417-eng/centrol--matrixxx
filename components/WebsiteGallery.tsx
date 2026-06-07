'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import type { WorkItem } from '@/content/site';

/**
 * Grid of every website we've shipped. Each card has a screenshot, a short
 * description, and a "See now" button that opens the live site in a modal
 * iframe. Esc / backdrop / close button all dismiss it; focus is trapped to the
 * dialog and scroll is locked while it's open.
 */
export function WebsiteGallery({ items }: { items: WorkItem[] }) {
  const [active, setActive] = useState<WorkItem | null>(null);

  const close = useCallback(() => setActive(null), []);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKey);
    // Lock background scroll while the modal is open.
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [active, close]);

  return (
    <>
      <section className="mx-auto max-w-editorial px-5 pb-24 sm:px-8 sm:pb-32">
        <ul className="grid gap-x-10 gap-y-14 sm:grid-cols-2">
          {items.map((w) => (
              <li key={w.name}>
                <div className="group relative overflow-hidden rounded-2xl border border-ink/10 bg-white">
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={w.image}
                      alt={`${w.name} — ${w.domain}`}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-contain object-top transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </div>
                  {/* See now — sits on the image, bottom-right. */}
                  <button
                    type="button"
                    onClick={() => setActive(w)}
                    className="absolute bottom-4 right-4 rounded-full bg-ink px-4 py-2 text-[13px] font-medium text-white shadow-lg transition hover:bg-accent focus-visible:bg-accent"
                  >
                    See now
                  </button>
                </div>

                <div className="mt-4 flex items-baseline justify-between gap-4">
                  <h2 className="font-display text-2xl text-ink">{w.name}</h2>
                  <a
                    href={w.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 text-[12px] text-muted underline-offset-4 transition-colors hover:text-ink hover:underline"
                  >
                    {w.domain}
                  </a>
                </div>
                <p className="mt-1.5 max-w-md text-[15px] leading-relaxed text-muted">{w.blurb}</p>
              </li>
            ))}
        </ul>
      </section>

      {/* Live preview modal. */}
      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${active.name} — live preview`}
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6"
        >
          {/* Backdrop. */}
          <button
            type="button"
            aria-label="Close preview"
            onClick={close}
            className="absolute inset-0 bg-ink/70 backdrop-blur-sm"
          />

          <div className="relative z-10 flex h-[88vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl bg-bg shadow-2xl">
            {/* Title bar. */}
            <div className="flex items-center justify-between gap-4 border-b border-ink/10 px-4 py-3 sm:px-5">
              <div className="min-w-0">
                <p className="truncate font-display text-lg text-ink">{active.name}</p>
                <p className="truncate text-[12px] text-muted">{active.domain}</p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <a
                  href={active.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-ink/15 px-3 py-1.5 text-[12px] text-ink transition-colors hover:border-ink/40"
                >
                  Open in new tab ↗
                </a>
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close preview"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:border-ink/40 hover:bg-ink/5"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden fill="none">
                    <path
                      d="M3 3l10 10M13 3L3 13"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Live site, or a screenshot fallback for sites that block framing. */}
            {active.framable ? (
              <iframe
                src={active.viewUrl ?? active.url}
                title={`${active.name} — live site`}
                className="h-full w-full flex-1 border-0 bg-white"
                sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="relative flex-1 overflow-auto bg-ink-section">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={active.image}
                  alt={`${active.name} — ${active.domain}`}
                  className="block w-full"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col items-center gap-3 bg-gradient-to-t from-ink/90 via-ink/50 to-transparent p-6 pt-16 text-center">
                  <p className="text-[13px] text-white/80">
                    {active.name} can’t be previewed inside this window. Open it to see the real
                    thing.
                  </p>
                  <a
                    href={active.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pointer-events-auto rounded-full bg-white px-5 py-2.5 text-[14px] font-medium text-ink transition hover:bg-accent hover:text-white"
                  >
                    Open {active.domain} ↗
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
