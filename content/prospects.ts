// Private sample pages for cold-email prospects, served at /for/<slug> (noindex, not in sitemap).
// To add one: put their images in public/prospects/<slug>/, add an entry here, deploy, and send
// https://centrolmatrix.com/for/<slug>?ref=<slug> in the follow-up email. See docs/OUTREACH.md.
import type { LookPair } from '@/components/BeforeAfter';
import { lookbook } from './lookbook';

export type Prospect = {
  slug: string;
  brand: string;
  first?: string;
  /** Before/after pairs made from their real product photos. */
  looks: LookPair[];
  /** Optional 9:16 UGC-style sample. */
  video?: { src: string; poster?: string };
  /** Optional Loom walkthrough URL. */
  loom?: string;
  /** Package we suggest they order next (services.json id). */
  suggest?: string;
  /** ISO date after which the page asks them to get in touch instead. */
  expires?: string;
  note?: string;
};

export const prospects: Prospect[] = [
  // Demo page (our own ORVA garments) so the team can preview the format at /for/demo.
  { slug: 'demo', brand: 'your brand', looks: lookbook.slice(0, 3), suggest: 'mockups-25', note: 'This is a demo built on our own garments. Yours will use your products.' },
];

export const prospectBySlug = (slug: string) => prospects.find((p) => p.slug === slug.toLowerCase());
