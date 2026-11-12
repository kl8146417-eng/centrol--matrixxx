import { pageMeta } from '@/lib/seo';
import { BreadcrumbLd } from '@/components/Breadcrumbs';
import type { Metadata } from 'next';
import { PageHeader } from '@/components/PageHeader';
import { Catalogue } from '@/components/shop/Catalogue';

export const metadata: Metadata = pageMeta({ path: '/pricing', title: 'Pricing: product photos, UGC ads & Shopify packages', description: 'Fixed prices for product photo sets, UGC video ads, ad creatives and Shopify storefronts, each with a delivery time. Order online and pay by invoice. Store fixes are quoted from a free audit.', image: '/og/pricing.jpg' });

export default function PricingPage() {
  return (
    <>
      <BreadcrumbLd items={[{"name": "Pricing & packages", "path": "/pricing"}]} />
      <PageHeader eyebrow="Pricing" title="Fixed prices," accent="listed up front." intro="Product photos, UGC ads and Shopify packages, each with a fixed price and delivery time. Order online and we email an invoice. Store fixes and follow-up setups are quoted first. Prices in USD." />
      <Catalogue />
    </>
  );
}
