import Link from 'next/link';
import { services } from '@/content/agency';
import { faq } from '@/content/faq';
import { AnimIcon } from '@/components/icons/AnimIcon';

const pick = ['ugc-5pack', 'mockups-25', 'rail-starter', 'growth-retainer'];
export function PricingTeaser() {
  const list = pick.map((id) => services.find((s) => s.id === id)).filter((s): s is NonNullable<typeof s> => !!s);
  return (
    <section className="mx-auto max-w-editorial px-5 py-24 sm:px-8 sm:py-32">
      <div data-reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="text-[12px] uppercase tracking-wordmark text-accent">Pricing</p>
          <h2 className="mt-3 max-w-2xl font-display text-display-md text-ink">Fixed prices. <span className="italic text-accent">Order online.</span></h2>
        </div>
        <p className="max-w-sm text-[15px] text-muted">Pick a package, fill a short brief, pay now or later. Consulting and apps are scoped on a call.</p>
      </div>
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" data-stagger>
        {list.map((s, i) => (
          <Link key={s.id} href={`/pricing#${s.category}`} data-icon-host className={`group flex flex-col rounded-3xl border p-7 transition hover:-translate-y-1 ${i === 1 ? 'border-accent bg-accent text-white' : 'border-ink/10 bg-white hover:border-ink/30'}`}>
            <p className={`text-[12px] uppercase tracking-wordmark ${i === 1 ? 'text-white/70' : 'text-muted'}`}>{i === 1 && s.popular ? 'Most popular' : s.turnaround_days ? `${s.turnaround_days}-day turnaround` : 'Monthly'}</p>
            <h3 className="mt-4 font-display text-2xl">{s.name}</h3>
            <p className={`mt-2 text-[14px] leading-relaxed ${i === 1 ? 'text-white/80' : 'text-muted'}`}>{s.description}</p>
            <p className="mt-auto pt-8 font-display text-4xl">${s.price_usd.toLocaleString('en-US')}<span className="text-base opacity-60">{s.billing === 'monthly' ? '/mo' : ''}</span></p>
            <span className="mt-4 inline-flex items-center gap-2 text-[14px] font-semibold">View package <AnimIcon name="arrow" size={16} /></span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function FaqTeaser() {
  const qs = faq.filter((f) => ['How fast is delivery?', 'How do I pay?', 'Who owns the work?', 'Do I need a call before ordering?'].includes(f.q));
  return (
    <section className="mx-auto grid max-w-editorial gap-12 px-5 pb-24 sm:px-8 lg:grid-cols-3">
      <div data-reveal>
        <p className="text-[12px] uppercase tracking-wordmark text-accent">FAQ</p>
        <h2 className="mt-3 font-display text-display-md text-ink">Good questions.</h2>
        <Link href="/faq" className="mt-6 inline-block text-[15px] font-semibold text-accent">All answers →</Link>
      </div>
      <div className="lg:col-span-2" data-stagger>
        {qs.map((f) => (
          <details key={f.q} className="group border-b border-ink/10 py-6">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-2xl text-ink">
              {f.q}<span className="text-2xl text-accent transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-ink-soft">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
