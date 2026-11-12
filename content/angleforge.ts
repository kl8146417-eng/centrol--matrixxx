// AngleForge sample pairs, taken from angleforge.studio's own demo set (both images in each pair are
// AngleForge output from one product photo). Label them as samples wherever they appear.
import type { LookPair } from '@/components/BeforeAfter';

export const ANGLEFORGE_URL = 'https://angleforge.studio';

export const angleforgePairs: LookPair[] = [
  { id: 'af-headphones', category: 'Headphones', before: '/media/angleforge/headphones-studio.webp', after: '/media/angleforge/headphones-lifestyle.webp',
    alt_before: 'Navy over-ear wireless headphones on a plain cream studio background.',
    alt_after: 'The same navy headphones resting on a knit blanket on a wooden desk beside a mug and an open book.' },
  { id: 'af-bag', category: 'Shoulder bag', before: '/media/angleforge/bag-studio.webp', after: '/media/angleforge/bag-lifestyle.webp',
    alt_before: 'White studded shoulder bag with a blue blossom print and a silver chain strap, on a plain cream background.',
    alt_after: 'The same white blossom-print bag on a rustic wooden table by a window, next to a cup of coffee.' },
  { id: 'af-mug', category: 'Mug', before: '/media/angleforge/mug-studio.webp', after: '/media/angleforge/mug-lifestyle.webp',
    alt_before: 'Plain white ceramic mug of black coffee on a cream studio background.',
    alt_after: 'The same white mug on a wooden table with an open book, a linen napkin and a potted fern.' },
];

export const ANGLEFORGE_LABELS: [string, string] = ['Plain studio shot', 'Lifestyle scene'];
export const ANGLEFORGE_NOTE = 'Samples from AngleForge, the product-photo tool we built: both images in each pair were generated from one product photo. Not a client’s product.';
