import { pageMeta } from '@/lib/seo';
import { BreadcrumbLd } from '@/components/Breadcrumbs';
import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/PageHeader';
import { faq, faqGroups as groups } from '@/content/faq';
import { agency } from '@/content/agency';

export const metadata: Metadata = pageMeta({ path: '/faq', title: 'FAQ', description: 'Answers on the free store audit, ordering, delivery times, Amazon images, revisions, payment by invoice and ownership at Centrol Matrix.' });

export default function FAQPage() {
  const ld = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) };
  return (
    <>
      <BreadcrumbLd items={[{"name": "FAQ", "path": "/faq"}]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <PageHeader eyebrow="FAQ" title="Questions," accent="answered." />
      <div className="mx-auto max-w-3xl px-5 pb-24 sm:px-8">
        {groups.map((g) => (
          <section key={g} className="mb-12">
            <h2 className="text-[12px] uppercase tracking-wordmark text-accent">{g}</h2>
            {faq.filter((f) => f.group === g).map((f) => (
              <details key={f.q} className="group border-b border-ink/10 py-5">
                <summary className="flex min-h-[48px] cursor-pointer list-none items-center font-display text-xl text-ink">{f.q}</summary>
                <p className="mt-3 text-[16px] leading-relaxed text-ink-soft">{f.a}</p>
              </details>
            ))}
          </section>
        ))}
        <p className="text-[15px] text-muted">Still unsure? <Link href="/contact" className="text-accent underline">Contact us</Link>, email <a className="underline" href={`mailto:${agency.email}`}>{agency.email}</a> or call <a className="underline" href={agency.phoneHref}>{agency.phone}</a> ({agency.phoneNote.toLowerCase().replace(/\.$/, '')}).</p>
      </div>
    </>
  );
}
