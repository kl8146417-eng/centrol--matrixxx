// The five things we sell to e-commerce brands, in one place for the home page and /services.
// Prices and turnaround come from services.json (the same catalogue /pricing sells), never typed here.
import { services, type Service } from './agency';

export type Offer = {
  id: 'photos' | 'ugc' | 'shopify' | 'follow-up' | 'apps';
  title: string;
  short: string;
  body: string;
  /** services.json categories whose packages belong to this offer. */
  cats: string[];
  image: string;
  imageAlt: string;
  /** Shown instead of a "from" price when nothing in the catalogue has a fixed price. */
  quote?: string;
  notes?: string[];
};

export const offers: Offer[] = [
  {
    id: 'photos', title: 'Product & listing photos',
    short: 'Studio, angle and lifestyle images from the product photos you already have.',
    body: 'Send a few photos of each product. We make the rest of the set with AngleForge, the tool we built for it: clean studio shots, 45° angles, lifestyle scenes and close-ups, checked by hand against the real product, exported for Shopify and Amazon.',
    cats: ['product_mockups'], image: '/media/angleforge/headphones-lifestyle.webp', imageAlt: 'AI-generated lifestyle shot of navy headphones on a knit blanket beside a mug and a book.',
    notes: ['Amazon: we make the secondary images (lifestyle, angles, in-use, close-ups). Keep a real photo on white as your main image.'],
  },
  {
    id: 'ugc', title: 'UGC video ads & ad creative',
    short: 'Creator-style video ads and static ads, made from your product photos.',
    body: 'Talking heads, unboxings, try-ons and product demos with a hook, a demo and a call to action, cut to 9:16 and 1:1 for Meta, TikTok and Reels. Static ads and remakes of ad formats that already work, too. AI-generated, and labelled where a platform asks.',
    cats: ['ai_ugc', 'ad_creatives'], image: '/media/real/park-mic-ugc-480.webp', imageAlt: 'Still from an AI-generated UGC ad: a woman in sunglasses talking into a microphone in a park.',
  },
  {
    id: 'shopify', title: 'Shopify stores & fixes',
    short: 'New Shopify storefronts, store setup, and fixes for what your audit finds.',
    body: 'Start with the free audit: it shows what is broken or missing on your store. We fix those at a fixed, quoted price, or build a new storefront from scratch: homepage, collection and product templates, policy pages, and a mobile and speed pass before launch.',
    cats: ['website'], image: '/work/orva/photos-desktop-home-sm.webp', imageAlt: 'Homepage of ORVA, our demo clothing storefront, with garments hanging on a rail.',
  },
  {
    id: 'follow-up', title: 'Lead & customer follow-up',
    short: 'Replies, reminders and routing, so no enquiry sits unanswered.',
    body: 'Form replies that go out straight away, follow-up emails for quotes and abandoned enquiries, enquiries routed into your inbox or CRM, and an AI phone assistant that takes messages and books callbacks. Our own phone line is answered by one.',
    cats: ['automation'], image: '/3d/setting.webp', imageAlt: '',
    quote: 'Quoted after a short call',
  },
  {
    id: 'apps', title: 'Apps & custom builds',
    short: 'Mobile and web apps, designed, built, shipped and kept running.',
    body: 'When a store needs more than a theme: a companion app, a custom storefront, an internal tool. We design, build and ship them to the App Store and Google Play, and keep them running. Recl, GiftFeels and Siteory are ours.',
    cats: ['apps'], image: '/products/recl/feature.webp', imageAlt: 'Recl app promo graphic.',
    quote: 'Scoped on a call',
  },
];

export const offerPackages = (o: Offer): Service[] => services.filter((s) => o.cats.includes(s.category));

/** "from $247 · 5 days" from the live catalogue, or the offer's quote line. */
export function fromPrice(o: Offer): string {
  const priced = offerPackages(o).filter((s) => !s.enquiry && s.price_usd > 0);
  if (!priced.length) return o.quote ?? 'Quoted on request';
  const min = priced.reduce((a, b) => (b.price_usd < a.price_usd ? b : a));
  return `from $${min.price_usd.toLocaleString('en-US')}${min.turnaround_days && min.billing !== 'monthly' ? ` · ${min.turnaround_days} days` : ''}`;
}
