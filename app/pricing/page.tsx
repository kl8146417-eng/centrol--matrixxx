import type { Metadata } from 'next';
import { PageHeader } from '@/components/PageHeader';
import { Catalogue } from '@/components/shop/Catalogue';

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Fixed-price packages for websites, AI UGC ads, product imagery and ad creatives, plus scoped consulting for automation, growth and content systems.',
  alternates: { canonical: '/pricing' },
};

export default function PricingPage() {
  return (
    <>
      <PageHeader eyebrow="Pricing" title="Fixed prices," accent="no surprises." intro="Order a package directly, or enquire about scoped work. All prices in USD; switch currency for an estimate." />
      <Catalogue />
    </>
  );
}
