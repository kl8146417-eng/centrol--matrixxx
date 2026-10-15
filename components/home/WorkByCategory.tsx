'use client';
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { useState } from 'react';
import data from '@/content/real-work.json';
import { AutoVideo } from './AutoVideo';
import { AnimIcon } from '@/components/icons/AnimIcon';

export function WorkByCategory() {
  const secs = data.sections.filter((s) => data.items.some((i) => i.section === s.id));
  const [cur, setCur] = useState(secs[0].id);
  const sec = secs.find((s) => s.id === cur)!;
  const items = data.items.filter((i) => i.section === cur).slice(0, 4);
  return (
    <section id="work" className="bg-[#F4F4F2] py-24 sm:py-32">
      <div className="mx-auto max-w-editorial px-5 sm:px-8">
        <div data-reveal className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="text-[12px] uppercase tracking-wordmark text-accent">Work by category</p>
            <h2 className="mt-3 max-w-2xl font-display text-display-md text-ink">{sec.title}</h2>
            <p className="mt-3 max-w-xl text-[16px] text-muted">{sec.blurb}</p>
          </div>
          <div role="tablist" aria-label="Work categories" className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 lg:mx-0 lg:flex-wrap lg:justify-end lg:px-0">
            {secs.map((s) => (
              <button key={s.id} role="tab" aria-selected={cur === s.id} onClick={() => setCur(s.id)}
                className={`shrink-0 rounded-full px-4 py-2 text-[13px] font-medium transition ${cur === s.id ? 'bg-ink text-white' : 'border border-ink/15 bg-white text-ink hover:border-ink/40'}`}>{s.eyebrow}</button>
            ))}
          </div>
        </div>
        <div key={cur} className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {items.map((it) => (
            <figure key={it.id} className="overflow-hidden rounded-3xl bg-ink">
              <div className="relative aspect-[9/14]"><AutoVideo src={it.video} poster={it.thumb} label={it.title} className="absolute inset-0 h-full w-full object-cover" /></div>
              <figcaption className="p-4 text-white"><p className="text-[10px] uppercase tracking-wider text-[#7DA2FF]">{it.tag}</p><p className="text-[14px] font-medium">{it.title}</p></figcaption>
            </figure>
          ))}
        </div>
        <Link href={`/work#${cur}`} data-icon-host className="mt-10 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-[15px] font-semibold text-white">See all work <AnimIcon name="arrow" size={18} /></Link>
      </div>
    </section>
  );
}
