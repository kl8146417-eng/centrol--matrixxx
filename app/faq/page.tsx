import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/PageHeader';
import { faq } from '@/content/faq';
import { agency, waLink } from '@/content/agency';

export const metadata: Metadata = { title: 'FAQ', description: 'Ordering, production, payments and how the studio works.', alternates: { canonical: '/faq' } };
const groups = ['Ordering', 'Production', 'Payments', 'Studio'] as const;

export default function FAQPage() {
  const ld = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <PageHeader eyebrow="FAQ" title="Questions," accent="answered." />
      <div className="mx-auto max-w-3xl px-5 pb-24 sm:px-8">
        {groups.map((g) => (
          <section key={g} className="mb-12">
            <h2 className="text-[12px] uppercase tracking-wordmark text-accent">{g}</h2>
            {faq.filter((f) => f.group === g).map((f) => (
              <details key={f.q} className="group border-b border-ink/10 py-5">
                <summary className="cursor-pointer list-none font-display text-xl text-ink">{f.q}</summary>
                <p className="mt-3 text-[16px] leading-relaxed text-ink-soft">{f.a}</p>
              </details>
            ))}
          </section>
        ))}
        <p className="text-[15px] text-muted">Still unsure? <Link href="/contact" className="text-accent underline">Contact us</Link>, email <a className="underline" href={`mailto:${agency.email}`}>{agency.email}</a> or <a className="underline" href={waLink()} target="_blank" rel="noopener noreferrer">WhatsApp {agency.whatsappDisplay}</a>.</p>
      </div>
    </>
  );
}
