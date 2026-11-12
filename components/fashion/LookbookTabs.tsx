'use client';
import { useState, type ReactNode } from 'react';
import { BeforeAfter, type LookPair } from '@/components/BeforeAfter';

const FASHION_NOTE = 'Demo pairs from our pipeline. Every on-model image is AI-generated from the garment photo on the left; for your brand we start from your real product photos.';

/** Pick a pair, drag between before and after. Used for the /fashion lookbook and the AngleForge samples. */
export function LookbookTabs({
  pairs, labels, note = FASHION_NOTE, frameClass = 'mx-auto aspect-[2/3] w-full max-w-[460px] rounded-[1.75rem]', tabsLabel = 'Choose a garment', dark = false, priority = true,
}: { pairs: LookPair[]; labels?: [string, string]; note?: ReactNode; frameClass?: string; tabsLabel?: string; dark?: boolean; priority?: boolean }) {
  const [i, setI] = useState(0);
  if (!pairs.length) return null;
  const cur = pairs[i];
  return (
    <div>
      <BeforeAfter key={cur.id} pair={cur} priority={priority && i === 0} labels={labels} className={frameClass} />
      <div role="tablist" aria-label={tabsLabel} className="mt-4 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
        {pairs.map((p, k) => (
          <button key={p.id} type="button" role="tab" aria-selected={k === i} onClick={() => setI(k)}
            className={`min-h-[44px] shrink-0 rounded-full px-5 text-[14px] font-medium transition-colors ${k === i ? (dark ? 'bg-white text-ink' : 'bg-ink text-white') : dark ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-white text-ink hover:bg-ink/10'}`}>
            {p.category}
          </button>
        ))}
      </div>
      {note && <p className={`mt-3 text-[13px] leading-relaxed ${dark ? 'text-white/60' : 'text-muted'}`}>{note}</p>}
    </div>
  );
}
