import { pageMeta } from '@/lib/seo';
import { BreadcrumbLd } from '@/components/Breadcrumbs';
import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/PageHeader';
import { ContactForm } from '@/components/ContactForm';
import { PhoneLine } from '@/components/PhoneLine';
import { site } from '@/content/site';
import { agency, serviceById, waLink } from '@/content/agency';
import { offers } from '@/content/offer';

export const metadata: Metadata = pageMeta({
  path: '/contact',
  title: 'Contact Asutosh',
  description: `Talk to Centrol Matrix about product photos, UGC ads or your Shopify store. Call ${agency.phone} (answered by our AI assistant; Asutosh calls back) or email ${agency.email}.`,
});

export default function ContactPage({ searchParams }: { searchParams: { service?: string } }) {
  const id = typeof searchParams.service === 'string' ? searchParams.service.slice(0, 40) : '';
  const service = offers.find((o) => o.id === id)?.title || serviceById(id)?.name || '';
  return (
    <>
      <BreadcrumbLd items={[{ name: 'Contact', path: '/contact' }]} />
      <PageHeader
        eyebrow="Contact"
        title="Talk to"
        accent="Asutosh."
        intro="A question, a quote, or a project that doesn’t fit a package. You’ll get a reply from a person, usually within one business day."
      />

      <section className="mx-auto max-w-editorial px-5 py-16 sm:px-8 sm:py-24">
        <div className="grid gap-14 lg:grid-cols-[1.5fr_1fr]">
          <div>
            {service && <p className="mb-6 inline-flex rounded-full bg-[#F4F4F2] px-4 py-2 text-[15px] text-ink">About: <span className="ml-1 font-semibold">{service}</span></p>}
            <ContactForm service={service} />
          </div>

          <aside className="space-y-8 lg:border-l lg:border-ink/10 lg:pl-10">
            <div>
              <p className="text-[12px] uppercase tracking-wordmark text-muted">Phone</p>
              <PhoneLine size="lg" className="mt-1" />
            </div>
            <div>
              <p className="text-[12px] uppercase tracking-wordmark text-muted">Email</p>
              <a href={`mailto:${site.email}`} className="mt-1 inline-flex min-h-[44px] items-center text-[18px] text-accent underline-offset-4 hover:underline">{site.email}</a>
            </div>
            <div className="rounded-3xl bg-[#F4F4F2] p-6">
              <p className="font-display text-2xl text-ink">Not sure what you need?</p>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">Start with the free store audit. It shows what to fix first, and it’s free.</p>
              <Link href="/audit" className="mt-4 inline-flex min-h-[48px] items-center rounded-full bg-accent px-6 text-[15px] font-semibold text-white transition hover:bg-accent-dark">Get a free site audit</Link>
            </div>
            <div>
              <p className="text-[12px] uppercase tracking-wordmark text-muted">Also</p>
              <p className="mt-1 flex flex-wrap gap-x-6">
                <a href={waLink()} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] items-center text-[15px] text-ink underline-offset-4 hover:underline">WhatsApp {agency.whatsappDisplay}</a>
                <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] items-center text-[15px] text-ink underline-offset-4 hover:underline">LinkedIn</a>
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
