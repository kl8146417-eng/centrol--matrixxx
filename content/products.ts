// Products the studio built. Facts only from public store listings / live sites (checked Oct 2026).
export const ORVA_URL = process.env.NEXT_PUBLIC_ORVA_URL || 'https://orva-centrol-matrix.netlify.app';
export const WARDROBE_URL = process.env.NEXT_PUBLIC_WARDROBE_URL || 'https://hanger-club-centrol-matrix.netlify.app';

export type Product = {
  id: string; name: string; kind: string; blurb: string; url?: string;
  icon?: string; screens: string[]; desktop?: string; video?: string; poster?: string;
  stores?: { label: string; href: string }[]; visit?: string; tagline?: string; stat?: string; features?: string[]; tone: 'dark' | 'light' | 'blue';
};

export const products: Product[] = [
  {
    id: 'orva', name: 'ORVA', kind: 'Storefront demo', tone: 'dark', url: '/work/orva', visit: ORVA_URL,
    blurb: 'A clothing storefront you browse like a rail: garments turn on hover and drag, with quick view, product pages, cart and AI product photography from our own pipeline.',
    screens: [], video: '/work/orva/orva-desktop.mp4', poster: '/work/orva/orva-desktop-poster.webp',
  },
  {
    id: 'siteory', name: 'Siteory', kind: 'SaaS · Website audit', tone: 'light', url: 'https://siteory.co/', visit: 'https://siteory.co/',
    icon: '/products/siteory/icon.png',
    blurb: 'Crawls a website, checks SEO and AI-answer readiness, investigates security signals, and turns the findings into a prioritised fix list, with prompts you can paste into coding agents.',
    screens: ['/products/siteory/mobile.webp'], desktop: '/products/siteory/desktop.webp',
  },
  {
    id: 'dupgs', name: 'Delhi PGs', kind: 'Android app + marketplace', tone: 'blue', url: 'https://dupgs.com', visit: 'https://play.google.com/store/apps/details?id=com.delhipgs.app',
    icon: '/products/dupgs/icon.webp',
    blurb: 'Find PG accommodation near Delhi University and across Delhi: verified listings with rent, room types, amenities and photos, filters by budget and gender, favourites and alerts.',
    screens: ['/products/dupgs/screen-2.webp', '/products/dupgs/screen-4.webp', '/products/dupgs/screen-5.webp'],
    stores: [{ label: 'Google Play', href: 'https://play.google.com/store/apps/details?id=com.delhipgs.app' }],
  },
  {
    id: 'giftfeels', name: 'GiftFeels', kind: 'iOS + Android app', tone: 'light', url: 'https://app.giftfeels.com/', visit: 'https://app.giftfeels.com/',
    icon: '/products/giftfeels/icon.webp',
    tagline: 'Made for two people. Nobody else gets in.',
    blurb: 'One quiet space for you and one person you love. Send a small sign you are thinking of them, answer a question together each day, and keep the photos and dates that matter to just you two. No feed, no streaks.',
    stat: 'Trusted by 40K+ users (as shown on app.giftfeels.com)',
    features: ['A day together', 'Widgets', 'How it works', 'Screens', 'Journal'],
    screens: ['/products/giftfeels/today-home.webp', '/products/giftfeels/ember-flame.webp', '/products/giftfeels/memory-box.webp'],
    stores: [
      { label: 'App Store', href: 'https://apps.apple.com/us/app/giftfeels-couples-friends/id6803380723' },
      { label: 'Google Play', href: 'https://play.google.com/store/apps/details?id=com.giftfeels.app' },
    ],
  },
  {
    id: 'wishcuts', name: 'WishCuts', kind: 'Web app · Video invitations', tone: 'dark', url: 'https://wishcuts.com/', visit: 'https://wishcuts.com/',
    icon: '/products/wishcuts/icon.png',
    tagline: 'The video invitation for their big day.',
    blurb: 'Personalised birthday and anniversary invitation videos, made by a designer rather than a template filler. Pick a design, add the names and date, approve a preview, and get a WhatsApp-ready video in 12 to 24 hours.',
    features: ['Made by a designer', 'Preview before delivery', 'WhatsApp-ready', 'No watermark'],
    screens: ['/products/wishcuts/poster-1.webp', '/products/wishcuts/poster-2.webp', '/products/wishcuts/poster-3.webp'],
  },
  {
    id: 'hanger-club', name: 'Hanger Club', kind: 'Wardrobe app · 3D rail', tone: 'dark', visit: WARDROBE_URL,
    blurb: 'A digital closet on a real rail. Swipe, lift and spin garments by hand, build outfits, and add your own pieces from a photo: AI identifies the item and cuts it out to hang alongside the rest.',
    screens: ['/products/hanger-club/screen-1.webp', '/products/hanger-club/screen-3.webp', '/products/hanger-club/screen-2.webp'],
  },
];
