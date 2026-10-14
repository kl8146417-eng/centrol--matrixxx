'use client';
import Link from 'next/link';
import { useCart } from '@/lib/cart';
import { categories, displayPrice, services, waLink, type Service } from '@/content/agency';
import { CurrencySwitch } from '@/components/CartDrawer';

function ServiceCard({ s }: { s: Service }) {
  const { add, has, setDrawer, money } = useCart();
  const inCart = has(s.id);
  return (
    <article className={`flex flex-col rounded-2xl border p-6 ${s.popular ? 'border-accent' : 'border-ink/10'}`} data-service={s.id}>
      {s.popular && <span className="mb-3 self-start rounded-full bg-accent px-3 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-white">Popular</span>}
      <h3 className="font-display text-2xl text-ink">{s.name}</h3>
      <p className="mt-2 text-[15px] leading-relaxed text-muted">{s.description}</p>
      {s.deliverables?.length > 0 && (
        <ul className="mt-4 space-y-1.5 text-[14px] text-ink-soft">
          {s.deliverables.map((d) => <li key={d} className="flex gap-2"><span className="text-accent">✓</span>{d}</li>)}
        </ul>
      )}
      <div className="mt-auto pt-6">
        {s.enquiry ? (
          <>
            <p className="text-[14px] text-muted">{s.price_note || 'Scoped on a call'}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Link href={`/contact?service=${s.id}`} className="rounded-full bg-ink px-5 py-2.5 text-[14px] font-semibold text-white hover:opacity-85">Enquire</Link>
              <a href={waLink(`Hi Centrol Matrix, I'm interested in ${s.name}.`)} target="_blank" rel="noopener noreferrer" className="rounded-full border border-ink/15 px-5 py-2.5 text-[14px] font-semibold">WhatsApp</a>
            </div>
          </>
        ) : (
          <>
            <p className="font-display text-3xl text-ink">
              {s.pricing ? 'from ' : ''}{money(displayPrice(s))}{s.billing === 'monthly' ? <span className="text-base text-muted">/mo</span> : null}
            </p>
            <p className="text-[13px] text-muted">{s.price_note || (s.turnaround_days ? `${s.turnaround_days} day turnaround` : '')}</p>
            <button type="button" onClick={() => { if (!inCart) add(s.id); setDrawer(true); }} className="mt-4 w-full rounded-full bg-accent px-5 py-3 text-[15px] font-semibold text-white hover:bg-accent-dark">
              {inCart ? 'In cart · view' : 'Add to cart'}
            </button>
          </>
        )}
      </div>
    </article>
  );
}

export function Catalogue() {
  return (
    <div className="mx-auto max-w-editorial px-5 pb-24 sm:px-8">
      <div className="sticky top-16 z-10 -mx-5 mb-10 flex flex-wrap items-center gap-2 bg-bg/95 px-5 py-3 backdrop-blur-sm sm:-mx-8 sm:px-8">
        {categories.map((c) => <a key={c.id} href={`#${c.id}`} className="rounded-full border border-ink/10 px-3 py-1 text-[13px] hover:border-ink/40">{c.name}</a>)}
        <span className="ml-auto"><CurrencySwitch /></span>
      </div>
      {categories.map((c) => (
        <section key={c.id} id={c.id} className="scroll-mt-32 border-t border-ink/10 py-14">
          <p className="text-[12px] uppercase tracking-wordmark text-accent">{c.group}</p>
          <h2 className="mt-3 font-display text-display-md text-ink">{c.name}</h2>
          {c.tagline && <p className="mt-3 max-w-xl text-[16px] text-muted">{c.tagline}</p>}
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.filter((s) => s.category === c.id).map((s) => <ServiceCard key={s.id} s={s} />)}
          </div>
        </section>
      ))}
    </div>
  );
}
