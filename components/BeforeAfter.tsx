'use client';
/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import { track } from '@/lib/track';

export type LookPair = { id: string; category: string; before: string; after: string; alt_before: string; alt_after: string; style?: string };

/**
 * Drag (or arrow-key) between the flat lay a brand sends and the on-model image we make.
 * A native range input drives it, so it works with a thumb, a mouse and a keyboard, and
 * without script it still shows the finished image.
 */
export function BeforeAfter({ pair, className = '', priority = false, labels = ['Flat lay you send', 'What we deliver'] }: { pair: LookPair; className?: string; priority?: boolean; labels?: [string, string] }) {
  const [x, setX] = useState(50);
  const [moved, setMoved] = useState(false);
  return (
    <figure className={`relative select-none overflow-hidden bg-[#E9E7E2] ${className}`}>
      <img src={pair.after} alt={pair.alt_after} className="absolute inset-0 h-full w-full object-cover" loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} />
      <img src={pair.before} alt={pair.alt_before} className="absolute inset-0 h-full w-full object-cover" style={{ clipPath: `inset(0 ${100 - x}% 0 0)` }} loading={priority ? 'eager' : 'lazy'} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 w-[2px] bg-white" style={{ left: `${x}%` }}>
        <span className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[15px] font-semibold text-ink">⇆</span>
      </div>
      <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[12px] font-medium text-ink">{labels[0]}</span>
      <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-ink/85 px-3 py-1 text-[12px] font-medium text-white">{labels[1]}</span>
      <input
        type="range" min={0} max={100} value={x}
        onChange={(e) => { setX(Number(e.target.value)); if (!moved) { setMoved(true); track('slider_drag', { item: pair.id }); } }}
        aria-label={`Compare: ${labels[0]} and ${labels[1]}`}
        className="absolute inset-0 h-full w-full cursor-ew-resize appearance-none bg-transparent opacity-0"
      />
    </figure>
  );
}
