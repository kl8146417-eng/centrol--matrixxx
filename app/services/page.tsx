/* eslint-disable @next/next/no-img-element */
import { pageMeta } from '@/lib/seo';
import { BreadcrumbLd } from '@/components/Breadcrumbs';
import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/PageHeader';
import { CTASection } from '@/components/CTASection';
import { offers, offerPackages, fromPrice } from '@/content/offer';
import type { Service } from '@/content/agency';

export const metadata: Metadata = pageMeta({
  path: '/services',
  title: 'Services: product photos, UGC ads, Shopify stores & follow-up',
  description: 'Product and Amazon listing photos, UGC-style video ads, Shopify store builds and fixes, lead follow-up automation and apps for e-commerce brands. What you get, turnaround and prices.',
  image: '/og/services.jpg',
});

function Package({ s }: { s: Service }) {
  const price = s.enquiry || !s.price_usd ? (s.price_note?.split(' · ')[0] ?? 'Quote') : `$${s.price_usd.toLocaleString('en-US')}${s.billing === 'monthly' ? '/mo' : ''}`;
  const when = s.billing === 'monthly' ? 'Delivered through the month' : s.turnaround_days ? `${s.turnaround_days} days` : null;
  return (
    <li className="border-t border-ink/10 py-6">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <h4 className="font-display text-[24px] leading-tight text-ink">{s.name}</h4>
        <p className="text-[16px] font-semibold text-ink">{price}{when && <span className="font-normal text-muted"> · {when}</span>}</p>
      </div>
      <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-ink-soft">{s.description}</p>
      {s.deliverables?.length > 0 && (
        <ul className="mt-3 grid gap-x-6 gap-y-1 text-[14px] text-ink-soft sm:grid-cols-2">
          {s.deliverables.map((d) => <li key={d} className="flex gap-2"><span aria-hidden="true" className="text-accent">✓</span>{d}</li>)}
        </ul>
      )}
    </li>
  );
}

export default function ServicesPage() {
  return (
    <>
      <BreadcrumbLd items={[{ name: 'Services', path: '/services' }]} />
      <PageHeader
        eyebrow="Services"
        title="What we make for"
        accent={<><span className="whitespace-nowrap">e-commerce</span> brands.</>}
        intro="Five things, each with a fixed scope and a listed price where we can give one. Not sure where to start? The free store audit shows what your store needs first."
      />

      <nav aria-label="Services on this page" className="border-b border-ink/10 bg-white">
        <ul className="mx-auto flex max-w-editorial gap-2 overflow-x-auto px-5 py-3 [scrollbar-width:none] sm:px-8">
          {offers.map((o) => (
            <li key={o.id}><a href={`#${o.id}`} className="inline-flex min-h-[44px] shrink-0 items-center whitespace-nowrap rounded-full border border-ink/10 px-4 text-[14px] font-medium text-ink hover:border-ink/40">{o.title}</a></li>
          ))}
        </ul>
      </nav>

      {offers.map((o, i) => {
        const pkgs = offerPackages(o);
        return (
          <section key={o.id} id={o.id} className={`${i % 2 ? 'bg-[#F4F4F2]' : 'bg-white'}`}>
            <div className="mx-auto grid max-w-editorial gap-10 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-12 lg:gap-14">
              <div className="lg:col-span-5">
                <div className="lg:sticky lg:top-28">
                  <p className="font-display text-xl text-accent">0{i + 1}</p>
                  <h2 className="mt-2 font-display text-display-md text-ink">{o.title}</h2>
                  <p className="mt-3 text-[16px] font-semibold text-ink">{fromPrice(o)}</p>
                  <p className="mt-5 text-[16px] leading-relaxed text-ink-soft">{o.body}</p>
                  {o.notes?.map((n) => <p key={n} className="mt-4 border-l-2 border-accent pl-4 text-[15px] leading-relaxed text-ink-soft">{n}</p>)}
                  <div className={`relative mt-8 aspect-[4/3] overflow-hidden rounded-3xl ${o.id === 'follow-up' ? 'bg-accent' : 'bg-ink'}`}>
                    <img src={o.image} alt={o.imageAlt} loading="lazy" className={`absolute inset-0 h-full w-full ${o.id === 'follow-up' ? 'object-contain p-10' : 'object-cover'}`} />
                  </div>
                </div>
              </div>
              <div className="lg:col-span-7">
                <h3 className="text-[12px] uppercase tracking-wordmark text-muted">What you get</h3>
                <ul className="mt-4 border-b border-ink/10">
                  {pkgs.map((s) => <Package key={s.id} s={s} />)}
                </ul>
                <div className="mt-8 flex flex-col gap-3 min-[420px]:flex-row min-[420px]:flex-wrap">
                  {pkgs.some((s) => !s.enquiry) && (
                    <Link href={`/pricing#${pkgs.find((s) => !s.enquiry)?.category}`} className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-accent px-7 text-[16px] font-semibold text-white transition hover:bg-accent-dark">Order on the pricing page</Link>
                  )}
                  {o.id === 'shopify' ? (
                    <Link href="/audit" className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-ink px-7 text-[16px] font-semibold text-white transition hover:bg-accent">Start with a free audit</Link>
                  ) : (
                    <Link href={`/contact?service=${o.id}`} className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-ink/15 px-7 text-[16px] font-semibold text-ink transition hover:border-ink">{pkgs.every((s) => s.enquiry) ? 'Ask for a quote' : 'Ask a question'}</Link>
                  )}
                </div>
              </div>
            </div>
          </section>
        );
      })}

      <section className="mx-auto max-w-editorial px-5 pt-20 sm:px-8">
        <div className="grid gap-6 border-t border-ink/10 pt-10 md:grid-cols-3">
          <h2 className="font-display text-3xl text-ink">Also on the menu</h2>
          <p className="text-[15px] leading-relaxed text-ink-soft">Short-form clipping, social posting and carousels, jewellery films and ad remakes are all on the <Link href="/pricing" className="font-semibold text-accent underline-offset-4 hover:underline">pricing page</Link>.</p>
          <p className="text-[15px] leading-relaxed text-ink-soft">Selling property? Floor-plan walkthroughs, virtual staging and listing films live at <a href="https://homes.centrolmatrix.com" className="font-semibold text-accent underline-offset-4 hover:underline">homes.centrolmatrix.com</a>. Clothing brand? See <Link href="/fashion" className="font-semibold text-accent underline-offset-4 hover:underline">our page for clothing brands</Link>.</p>
        </div>
      </section>

      <CTASection />
    </>
  );
}
