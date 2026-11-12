/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { offers, fromPrice } from '@/content/offer';
import { services } from '@/content/agency';
import { faq } from '@/content/faq';
import { auditChecks, AUDIT_TURNAROUND } from '@/content/audit';
import { angleforgePairs, ANGLEFORGE_LABELS, ANGLEFORGE_NOTE, ANGLEFORGE_URL } from '@/content/angleforge';
import { LookbookTabs } from '@/components/fashion/LookbookTabs';
import { ContactForm } from '@/components/ContactForm';
import { PhoneLine } from '@/components/PhoneLine';
import { AnimIcon } from '@/components/icons/AnimIcon';
import { agency } from '@/content/agency';

/** 3. Services: an editorial numbered list, not a card grid. */
export function ServicesList() {
  return (
    <section id="services" className="mx-auto max-w-editorial px-5 py-20 sm:px-8 sm:py-28">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end" data-reveal>
        <h2 className="max-w-3xl font-display text-display-md text-ink">What we make, <span className="italic text-accent">at a fixed price.</span></h2>
        <Link href="/services" className="inline-flex min-h-[44px] items-center self-start rounded-full bg-ink px-5 text-[14px] font-semibold text-white transition hover:bg-accent md:self-auto">All services →</Link>
      </div>
      <ol className="mt-10 border-t border-ink/10 sm:mt-12">
        {offers.map((o, i) => (
          <li key={o.id} className="border-b border-ink/10">
            <Link href={`/services#${o.id}`} className="group grid grid-cols-[1fr_auto] items-center gap-x-5 gap-y-2 py-6 sm:grid-cols-[3rem_1fr_auto] sm:gap-x-8 sm:py-7 lg:grid-cols-[4rem_1.1fr_1fr_auto]">
              <span className="hidden font-display text-xl text-accent sm:block">0{i + 1}</span>
              <div className="min-w-0">
                <h3 className="font-display text-[clamp(24px,2.6vw,36px)] leading-tight text-ink transition-colors group-hover:text-accent">{o.title}</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-ink-soft lg:hidden">{o.short}</p>
                <p className="mt-2 text-[14px] font-medium text-ink sm:hidden">{fromPrice(o)}</p>
              </div>
              <p className="hidden text-[15px] leading-relaxed text-ink-soft lg:block">{o.short}</p>
              <div className="flex items-center gap-6">
                <span className="hidden whitespace-nowrap text-[14px] font-medium text-ink sm:block">{fromPrice(o)}</span>
                <span className={`relative block h-16 w-16 shrink-0 overflow-hidden rounded-2xl sm:h-20 sm:w-20 ${o.id === 'follow-up' ? 'bg-accent' : 'bg-ink'}`}>
                  <img src={o.image} alt="" loading="lazy" className={`absolute inset-0 h-full w-full transition-transform duration-500 group-hover:scale-105 ${o.id === 'follow-up' ? 'object-contain p-2' : 'object-cover'}`} />
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}

/** 4. AngleForge: studio shot to lifestyle scene. */
export function AngleForgeShowcase() {
  const photos = offers.find((o) => o.id === 'photos');
  return (
    <section className="bg-ink-section py-20 text-white sm:py-28">
      <div className="mx-auto grid max-w-editorial gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:items-center lg:gap-16">
        <div className="lg:col-span-5" data-reveal>
          <p className="text-[12px] uppercase tracking-wordmark text-[#7DA2FF]">AngleForge</p>
          <h2 className="mt-3 font-display text-display-md">One product photo in. <span className="italic text-[#7DA2FF]">The rest of the set out.</span></h2>
          <p className="mt-5 max-w-md text-[16px] leading-relaxed text-white/75">AngleForge is the product-photo tool we built. From one photo of your product it makes clean studio shots, angles, lifestyle scenes and close-ups. Our photo packages start there, and every image is checked by hand against your real product before you see it.</p>
          <div className="mt-8 flex flex-col gap-3 min-[420px]:flex-row min-[420px]:flex-wrap">
            <Link href="/services#photos" className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-white px-6 text-[15px] font-semibold text-ink transition hover:bg-[#7DA2FF]">Photo packages{photos ? `, ${fromPrice(photos)}` : ''}</Link>
            <a href={ANGLEFORGE_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-white/20 px-6 text-[15px] font-semibold text-white transition hover:bg-white/10">Try AngleForge ↗</a>
          </div>
        </div>
        <div className="lg:col-span-7">
          <LookbookTabs pairs={angleforgePairs} labels={ANGLEFORGE_LABELS} note={ANGLEFORGE_NOTE} dark priority={false} tabsLabel="Choose a sample product"
            frameClass="mx-auto aspect-square w-full max-w-[560px] rounded-[1.75rem]" />
        </div>
      </div>
    </section>
  );
}

/** 5. The free audit: the offer behind every call and cold email. */
export function AuditTeaser() {
  return (
    <section id="audit" className="bg-[#F4F4F2]">
      <div className="mx-auto grid max-w-editorial gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-12">
        <div className="lg:col-span-5" data-reveal>
          <p className="text-[12px] uppercase tracking-wordmark text-accent">Free store audit</p>
          <h2 className="mt-3 font-display text-display-md text-ink">Five things shoppers notice <span className="italic text-accent">before you do.</span></h2>
          <p className="mt-5 max-w-md text-[17px] leading-relaxed text-ink-soft">Send your store link and we check your public pages for them. Siteory, the audit tool we built, runs the checks; Asutosh reads the results and emails you a plain-English report within {AUDIT_TURNAROUND}.</p>
          <Link href="/audit" data-track="audit_cta" data-track-label="home-audit" data-icon-host className="mt-8 inline-flex min-h-[52px] items-center gap-2 rounded-full bg-accent px-7 text-[16px] font-semibold text-white transition hover:bg-accent-dark">
            Get a free site audit <AnimIcon name="arrow" size={18} />
          </Link>
          <p className="mt-4 text-[14px] text-muted">No card, no call, no store login.</p>
        </div>
        <ol className="lg:col-span-7">
          {auditChecks.map((c, i) => (
            <li key={c.t} className="flex gap-5 border-t border-ink/10 py-5 last:border-b sm:gap-7">
              <span aria-hidden="true" className="font-display text-3xl leading-none text-accent">{i + 1}</span>
              <div>
                <h3 className="text-[18px] font-semibold text-ink">{c.t}</h3>
                <p className="mt-1 text-[15px] leading-relaxed text-ink-soft">{c.d}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

const STEPS = [
  { t: 'Start with the audit, or a package', d: 'Send your store link for the free audit, or order a fixed-price package with a short brief and your product photos. We email an invoice, and work starts once it’s paid.' },
  { t: 'We make it, or fix it', d: 'Turnaround is listed on every package, from 3 days. You get progress by email, and revisions are included.' },
  { t: 'You approve it and own it', d: 'Every image, video and line of code is yours to use anywhere, with full commercial rights.' },
];

/** 6. How it works, in three steps. */
export function HowItWorks() {
  return (
    <section className="mx-auto max-w-editorial px-5 py-20 sm:px-8 sm:py-28">
      <h2 className="max-w-2xl font-display text-display-md text-ink" data-reveal>How it works.</h2>
      <ol className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8" data-stagger>
        {STEPS.map((s, i) => (
          <li key={s.t} className="border-t-2 border-ink pt-6">
            <span className="font-display text-6xl leading-none text-accent">{i + 1}</span>
            <h3 className="mt-5 font-display text-[26px] leading-tight text-ink">{s.t}</h3>
            <p className="mt-3 text-[16px] leading-relaxed text-ink-soft">{s.d}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

const PICK = ['mockups-10', 'ugc-5pack', 'rail-starter'];

/** 7. Pricing teaser: three real packages and the audit-based fixes. */
export function PricingTeaser() {
  const list = PICK.map((id) => services.find((s) => s.id === id)).filter((s): s is NonNullable<typeof s> => !!s);
  return (
    <section className="border-t border-ink/10">
      <div className="mx-auto max-w-editorial px-5 py-20 sm:px-8 sm:py-28">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end" data-reveal>
          <div>
            <p className="text-[12px] uppercase tracking-wordmark text-accent">Pricing</p>
            <h2 className="mt-3 max-w-2xl font-display text-display-md text-ink">Fixed prices, <span className="italic text-accent">listed up front.</span></h2>
          </div>
          <p className="max-w-sm text-[15px] text-muted">Order online and we email an invoice. Fixes, follow-up setups and apps are quoted first.</p>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" data-stagger>
          {list.map((s) => (
            <Link key={s.id} href={`/pricing#${s.category}`} className="group flex flex-col rounded-3xl border border-ink/10 bg-white p-7 transition hover:-translate-y-1 hover:border-ink/30">
              <p className="text-[12px] uppercase tracking-wordmark text-muted">{s.turnaround_days ? `${s.turnaround_days}-day turnaround` : 'Monthly'}</p>
              <h3 className="mt-4 font-display text-2xl text-ink">{s.name}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-muted">{s.description}</p>
              <p className="mt-auto pt-8 font-display text-4xl text-ink">${s.price_usd.toLocaleString('en-US')}</p>
              <span className="mt-3 text-[14px] font-semibold text-accent">View package →</span>
            </Link>
          ))}
          <Link href="/audit" className="flex flex-col rounded-3xl bg-accent p-7 text-white transition hover:-translate-y-1">
            <p className="text-[12px] uppercase tracking-wordmark text-white/70">Quoted from your audit</p>
            <h3 className="mt-4 font-display text-2xl">Store fixes</h3>
            <p className="mt-2 text-[14px] leading-relaxed text-white/80">Titles, descriptions, share images, alt text, broken and slow pages. We quote a fixed price for what your free audit finds.</p>
            <p className="mt-auto pt-8 font-display text-4xl">Free audit</p>
            <span className="mt-3 text-[14px] font-semibold">Start with the audit →</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

const FAQ_PICK = ['Is it really free?', 'Do you need access to my store?', 'How fast is delivery?', 'Will the AI product images look like my actual product?', 'Can I use these images on Amazon?', 'How do I pay?', 'Who owns the work?'];

/** 9. FAQ. */
export function FaqTeaser({ picks = FAQ_PICK, title = 'Good questions.' }: { picks?: string[]; title?: string }) {
  const qs = picks.map((q) => faq.find((f) => f.q === q)).filter((f): f is NonNullable<typeof f> => !!f);
  return (
    <section className="mx-auto grid max-w-editorial gap-10 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-3 lg:gap-12">
      <div data-reveal>
        <p className="text-[12px] uppercase tracking-wordmark text-accent">FAQ</p>
        <h2 className="mt-3 font-display text-display-md text-ink">{title}</h2>
        <Link href="/faq" className="mt-5 inline-flex min-h-[44px] items-center text-[15px] font-semibold text-accent">All answers →</Link>
      </div>
      <div className="lg:col-span-2">
        {qs.map((f) => (
          <details key={f.q} className="group border-b border-ink/10">
            <summary className="flex min-h-[64px] cursor-pointer list-none items-center justify-between gap-6 py-4 font-display text-[22px] leading-snug text-ink sm:text-2xl">
              {f.q}<span aria-hidden="true" className="text-2xl text-accent transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="max-w-2xl pb-6 text-[16px] leading-relaxed text-ink-soft">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

/** 10. Contact: email, the US phone (AI receptionist note) and the form. */
export function ContactBlock() {
  return (
    <section id="contact" className="bg-[#F4F4F2]">
      <div className="mx-auto grid max-w-editorial gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="text-[12px] uppercase tracking-wordmark text-accent">Contact</p>
          <h2 className="mt-3 font-display text-display-md text-ink">Talk to <span className="italic text-accent">Asutosh.</span></h2>
          <p className="mt-5 max-w-md text-[17px] leading-relaxed text-ink-soft">A question, a quote, or a project that doesn’t fit a package. You’ll get a reply from a person, usually within one business day.</p>
          <div className="mt-8 space-y-5">
            <PhoneLine size="lg" />
            <a href={`mailto:${agency.email}`} className="inline-flex min-h-[44px] items-center text-[18px] text-accent underline-offset-4 hover:underline">{agency.email}</a>
          </div>
        </div>
        <div className="rounded-3xl bg-white p-6 sm:p-8 lg:col-span-7">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
