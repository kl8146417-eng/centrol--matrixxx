import { pageMeta } from '@/lib/seo';
import { BreadcrumbLd } from '@/components/Breadcrumbs';
import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/PageHeader';
import { CTASection } from '@/components/CTASection';
import { TeamSection } from '@/components/Team';

export const metadata: Metadata = pageMeta({
  path: '/about',
  title: 'About Centrol Matrix and Asutosh',
  description: 'Centrol Matrix is a three-person studio (Asutosh, Vishal and Karan) making product photos, UGC ads and Shopify stores for e-commerce brands. Asutosh is your contact.',
});

export default function AboutPage() {
  return (
    <>
      <BreadcrumbLd items={[{ name: 'About', path: '/about' }]} />
      <PageHeader
        eyebrow="About"
        title="A small studio"
        accent="that ships."
        intro="Three people who make product photos, video ads and Shopify stores for e-commerce brands, and build our own tools to do it."
      />

      <section className="mx-auto max-w-editorial px-5 pb-4 pt-16 sm:px-8 sm:pt-20">
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="space-y-6 text-[17px] leading-relaxed text-ink-soft">
            <p>
              Centrol Matrix is Asutosh, Vishal and Karan. We work with brands that sell on Shopify and
              Amazon: product and listing photos, UGC-style video ads, and the store those ads point to.
            </p>
            <p>
              We build the tools we use. AngleForge makes our product photos. Siteory runs the free store
              audits. Recl, GiftFeels and WishCuts are products we built and run ourselves, so we know what
              it takes to keep a store or an app working after launch.
            </p>
            <p>
              Asutosh is the person you talk to: outreach, quotes and every client conversation. Our US
              number is answered around the clock by an AI assistant that takes your message, and Asutosh
              calls you back.
            </p>
          </div>

          <aside className="space-y-6">
            <div className="border-t border-ink/10 pt-5">
              <p className="text-[12px] uppercase tracking-wordmark text-accent">How we work</p>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">Fixed scope and price up front, an invoice before we start, progress by email, and revisions included. You own everything we deliver.</p>
            </div>
            <div className="border-t border-ink/10 pt-5">
              <p className="text-[12px] uppercase tracking-wordmark text-accent">About AI</p>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">Our photos and UGC ads are AI-generated from your real product photos, then checked by hand. We label samples as samples, never present AI people as real customers, and never write fake reviews.</p>
            </div>
            <div className="border-t border-ink/10 pt-5">
              <p className="text-[12px] uppercase tracking-wordmark text-accent">What we built</p>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">See the tools and apps on <Link href="/apps" className="font-semibold text-accent underline-offset-4 hover:underline">tools we built</Link>, and samples on <Link href="/work" className="font-semibold text-accent underline-offset-4 hover:underline">our work page</Link>.</p>
            </div>
          </aside>
        </div>
      </section>

      <TeamSection />
      <CTASection />
    </>
  );
}
