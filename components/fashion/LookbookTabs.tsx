'use client';
import { useState } from 'react';
import { BeforeAfter, type LookPair } from '@/components/BeforeAfter';

/** The live thing on /fashion: pick a garment, drag between the flat lay and the result. */
export function LookbookTabs({ pairs }: { pairs: LookPair[] }) {
  const [i, setI] = useState(0);
  if (!pairs.length) return null;
  const cur = pairs[i];
  return (
    <div>
      <BeforeAfter key={cur.id} pair={cur} priority={i === 0} className="aspect-[4/5] w-full rounded-[1.75rem]" />
      <div role="tablist" aria-label="Choose a garment" className="mt-4 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
        {pairs.map((p, k) => (
          <button key={p.id} type="button" role="tab" aria-selected={k === i} onClick={() => setI(k)}
            className={`shrink-0 rounded-full px-4 py-2 text-[13px] font-medium capitalize transition-colors ${k === i ? 'bg-ink text-white' : 'bg-white text-ink hover:bg-ink/10'}`}>
            {p.category}
          </button>
        ))}
      </div>
      <p className="mt-3 text-[13px] text-muted">AI-generated samples, made by us from the garment photo on the left.</p>
    </div>
  );
}
