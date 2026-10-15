import { pageMeta } from '@/lib/seo';
import { BreadcrumbLd } from '@/components/Breadcrumbs';
import type { Metadata } from 'next';
import { PageHeader } from '@/components/PageHeader';
import { Catalogue } from '@/components/shop/Catalogue';

export const metadata: Metadata = pageMeta({ path: '/pricing', title: 'Pricing & packages', description: 'Fixed-price packages for websites, AI UGC ads, product imagery and ad creatives, with online checkout. Consulting and apps scoped on a call.' });

export default function PricingPage() {
  return (
    <>
      <BreadcrumbLd items={[{"name": "Pricing & packages", "path": "/pricing"}]} />
      <PageHeader eyebrow="Pricing" title="Fixed prices," accent="no surprises." intro="Order a package directly, or enquire about scoped work. All prices in USD; switch currency for an estimate." />
      <Catalogue />
    </>
  );
}
