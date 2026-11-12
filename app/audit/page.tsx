import type { Metadata } from 'next';
import Link from 'next/link';
import { pageMeta } from '@/lib/seo';
import { BreadcrumbLd } from '@/components/Breadcrumbs';
import { personalize } from '@/lib/personalize';
import { auditChecks, auditSteps, auditFaq, AUDIT_TURNAROUND } from '@/content/audit';
import { angleforgePairs, ANGLEFORGE_LABELS, ANGLEFORGE_NOTE, ANGLEFORGE_URL } from '@/content/angleforge';
import { agency } from '@/content/agency';
import { contactPerson } from '@/content/team';
import { AuditForm } from '@/components/audit/AuditForm';
import { LookbookTabs } from '@/components/fashion/LookbookTabs';
import { PhoneLine } from '@/components/PhoneLine';
import { Avatar } from '@/components/Team';

export const metadata: Metadata = pageMeta({
  path: '/audit',
  title: 'Free store audit for Shopify and e-commerce stores',
  description: `Send your store link and get a free, plain-English audit by email within ${AUDIT_TURNAROUND}: share previews, page titles, search descriptions, image alt text, and missing or slow pages. No login or access needed.`,
  image: '/og/audit.jpg',
});

// The outreach landing page. Cold emails and the AI caller send people here, often with
// ?first=Kate&site=katemaller.com&brand=Kate%20Maller. Unknown or odd params fall back to generic copy.
export default function AuditPage({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) {
  const { first, site, brand } = personalize(searchParams);
  const store = site || brand;
  const faqLd = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: auditFaq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) };

  return (
    <>
      <BreadcrumbLd items={[{ name: 'Free store audit', path: '/audit' }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      {/* Hero + form: the whole job of the page, above the fold on desktop. */}
      <section className="bg-[#F4F4F2] text-ink">
        <div className="mx-auto grid max-w-editorial gap-10 px-5 pb-16 pt-28 sm:px-8 sm:pt-36 lg:grid-cols-12 lg:gap-14 lg:pb-24">
          <div className="lg:col-span-6">
            {(first || store) && (
              <p className="mb-5 inline-flex rounded-full bg-white px-4 py-2 text-[15px] font-medium text-ink">
                {first ? `Hi ${first}, ` : 'Hi, '}here’s how the free audit works{store ? ` for ${store}` : ''}.
              </p>
            )}
            <h1 className="font-display text-[clamp(40px,5.8vw,88px)] leading-[0.98] tracking-[-0.02em]">
              Your free store audit, <span className="italic text-accent">from {contactPerson.name} at Centrol Matrix.</span>
            </h1>
            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-ink-soft sm:text-[18px]">
              We check the public pages of your store for the small things that cost you clicks and shares, then {contactPerson.name} emails you a short report within {AUDIT_TURNAROUND}: what’s wrong, why it matters, and what to fix first.
            </p>
            <p className="mt-5 max-w-xl border-l-2 border-accent pl-4 text-[15px] leading-relaxed text-ink-soft">
              Got a call from our AI assistant? This is where the report comes from.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <Avatar m={contactPerson} size="sm" />
              <p className="text-[14px] leading-snug text-muted"><span className="font-semibold text-ink">{contactPerson.name}</span>, {contactPerson.role?.toLowerCase()}<br />reads every audit before it goes out.</p>
            </div>
          </div>
          <div id="request" className="lg:col-span-6">
            <AuditForm first={first} site={site} />
          </div>
        </div>
      </section>

      {/* What's checked, in plain words. */}
      <section className="mx-auto max-w-editorial px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5" data-reveal>
            <p className="text-[12px] uppercase tracking-wordmark text-accent">What we check</p>
            <h2 className="mt-3 font-display text-display-md text-ink">Five things shoppers notice <span className="italic text-accent">before you do.</span></h2>
            <p className="mt-5 max-w-md text-[16px] leading-relaxed text-ink-soft">Siteory, the audit tool we built, runs the checks. It reports what it finds; it doesn’t change anything on your store. {contactPerson.name} turns the results into a short list, in order of what to fix first.</p>
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

      {/* What happens next. */}
      <section className="bg-ink-section text-white">
        <div className="mx-auto max-w-editorial px-5 py-20 sm:px-8 sm:py-28">
          <h2 className="font-display text-display-md" data-reveal>What happens next.</h2>
          <ol className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
            {auditSteps.map((s, i) => (
              <li key={s.t} className="border-t-2 border-white/30 pt-6">
                <span className="font-display text-6xl leading-none text-[#7DA2FF]">{i + 1}</span>
                <h3 className="mt-5 font-display text-[26px] leading-tight">{s.t}</h3>
                <p className="mt-3 text-[16px] leading-relaxed text-white/70">{s.d}</p>
              </li>
            ))}
          </ol>
          <a href="#request" className="mt-12 inline-flex min-h-[52px] items-center rounded-full bg-white px-7 text-[16px] font-semibold text-ink transition hover:bg-[#7DA2FF]">Request the audit</a>
        </div>
      </section>

      {/* While you're here: AngleForge. */}
      <section className="mx-auto max-w-editorial px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5" data-reveal>
            <p className="text-[12px] uppercase tracking-wordmark text-accent">While you’re here</p>
            <h2 className="mt-3 font-display text-display-md text-ink">One product photo, <span className="italic text-accent">the whole set.</span></h2>
            <p className="mt-5 max-w-md text-[16px] leading-relaxed text-ink-soft">We also make product and listing photos with AngleForge, the tool we built for it: studio shots, angles and lifestyle scenes from the photos you already have, for Shopify and Amazon.</p>
            <div className="mt-7 flex flex-col gap-3 min-[420px]:flex-row min-[420px]:flex-wrap">
              <Link href="/services#photos" className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-ink px-6 text-[15px] font-semibold text-white transition hover:bg-accent">Photo packages</Link>
              <a href={ANGLEFORGE_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-ink/15 px-6 text-[15px] font-semibold text-ink transition hover:border-ink">Try AngleForge ↗</a>
            </div>
          </div>
          <div className="lg:col-span-7">
            <LookbookTabs pairs={angleforgePairs} labels={ANGLEFORGE_LABELS} note={ANGLEFORGE_NOTE} priority={false} tabsLabel="Choose a sample product"
              frameClass="mx-auto aspect-square w-full max-w-[480px] rounded-[1.75rem]" />
          </div>
        </div>
      </section>

      {/* Questions. */}
      <section className="border-t border-ink/10">
        <div className="mx-auto grid max-w-editorial gap-10 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-3 lg:gap-12">
          <h2 className="font-display text-display-md text-ink">Fair questions.</h2>
          <div className="lg:col-span-2">
            {auditFaq.map((f, i) => (
              <details key={f.q} className="group border-b border-ink/10" open={i === 0}>
                <summary className="flex min-h-[64px] cursor-pointer list-none items-center justify-between gap-6 py-4 font-display text-[22px] leading-snug text-ink sm:text-2xl">
                  {f.q}<span aria-hidden="true" className="text-2xl text-accent transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="max-w-2xl pb-6 text-[16px] leading-relaxed text-ink-soft">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Other ways to reach us. */}
      <section className="bg-[#F4F4F2]">
        <div className="mx-auto grid max-w-editorial gap-10 px-5 py-16 sm:px-8 sm:py-20 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <h2 className="font-display text-[clamp(30px,3vw,40px)] leading-tight text-ink">Rather talk first?</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">Call or email. Either way it reaches {contactPerson.name}.</p>
          </div>
          <PhoneLine size="lg" />
          <div>
            <a href={`mailto:${agency.email}?subject=${encodeURIComponent(`Free audit${store ? `: ${store}` : ''}`)}`} className="inline-flex min-h-[44px] items-center text-[clamp(20px,2vw,24px)] text-accent underline-offset-4 [overflow-wrap:anywhere] hover:underline">{agency.email}</a>
            <p className="text-[13px] text-muted">Put your store link in the email and we’ll take it from there.</p>
          </div>
        </div>
      </section>
    </>
  );
}
