import { pageMeta } from '@/lib/seo';
import { BreadcrumbLd } from '@/components/Breadcrumbs';
import type { Metadata } from 'next';
import { PageHeader } from '@/components/PageHeader';
import { CTASection } from '@/components/CTASection';
import Link from 'next/link';
import { work } from '@/content/site';
import { products } from '@/content/products';
import { ProductCard } from '@/components/home/Products';
import { agency } from '@/content/agency';

export const metadata: Metadata = pageMeta({ path: '/apps', title: 'Apps & products', description: 'Products built by Centrol Matrix: Siteory, Delhi PGs, GiftFeels, Hanger Club and the ORVA storefront demo.', image: '/og/apps.jpg' });

export default function AppsPage() {
  return (
    <>
      <BreadcrumbLd items={[{"name": "Apps & products", "path": "/apps"}]} />
      <PageHeader
        eyebrow="Apps"
        title="Products we"
        accent="built and run."
        intro="Every app and product here was designed, built and shipped by Centrol Matrix."
      />

      <section className="mx-auto max-w-editorial space-y-6 px-5 py-20 sm:px-8">
        {products.map((p, i) => <ProductCard key={p.id} p={p} flip={i % 2 === 1} />)}
      </section>

      <section className="mx-auto max-w-editorial px-5 pb-24 sm:px-8 sm:pb-32">
        <p className="text-[12px] uppercase tracking-wordmark text-accent">Live demos</p>
        <h2 className="mt-3 font-display text-display-md text-ink">Click through <span className="italic text-accent">the real thing.</span></h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <Link href="/work/orva" className="rounded-2xl border border-ink/10 p-6 hover:border-ink/30">
            <h3 className="font-display text-2xl text-ink">ORVA storefront</h3>
            <p className="mt-2 text-[15px] text-muted">Interactive hanging-rail clothing store with AI product photography. Read the case study{agency.demo.url ? ' and open the demo' : ''}.</p>
          </Link>
          {agency.wardrobe.url && (
            <a href={agency.wardrobe.url} target="_blank" rel="noopener noreferrer" className="rounded-2xl border border-ink/10 p-6 hover:border-ink/30">
              <h3 className="font-display text-2xl text-ink">{agency.wardrobe.name} ↗</h3>
              <p className="mt-2 text-[15px] text-muted">A wardrobe and styling app demo.</p>
            </a>
          )}
          {work.filter((w) => w.embedUrl).map((w) => (
            <a key={w.name} href={w.url} target="_blank" rel="noopener noreferrer" className="rounded-2xl border border-ink/10 p-6 hover:border-ink/30">
              <h3 className="font-display text-2xl text-ink">{w.name} ↗</h3>
              <p className="mt-2 text-[15px] text-muted">{w.blurb}</p>
            </a>
          ))}
        </div>
      </section>

      <CTASection />
    </>
  );
}
