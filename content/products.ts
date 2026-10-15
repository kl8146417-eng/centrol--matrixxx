// Products the studio built. Facts only from public store listings / live sites (checked Oct 2026).
export type Product = {
  id: string; name: string; kind: string; blurb: string; url?: string;
  icon?: string; screens: string[]; desktop?: string; video?: string; poster?: string;
  stores?: { label: string; href: string }[]; tone: 'dark' | 'light' | 'blue';
};

export const products: Product[] = [
  {
    id: 'hanger-club', name: 'Hanger Club', kind: 'Wardrobe app · 3D rail', tone: 'dark',
    blurb: 'A digital closet on a real rail. Swipe, lift and spin garments by hand, build outfits, and add your own pieces from a photo: AI identifies the item and cuts it out to hang alongside the rest.',
    screens: ['/products/hanger-club/screen-1.webp', '/products/hanger-club/screen-3.webp', '/products/hanger-club/screen-2.webp'],
  },
  {
    id: 'siteory', name: 'Siteory', kind: 'SaaS · Website audit', tone: 'light', url: 'https://siteory.co/',
    icon: '/products/siteory/icon.png',
    blurb: 'Crawls a website, checks SEO and AI-answer readiness, investigates security signals, and turns the findings into a prioritised fix list, with prompts you can paste into coding agents.',
    screens: ['/products/siteory/mobile.webp'], desktop: '/products/siteory/desktop.webp',
  },
  {
    id: 'dupgs', name: 'Delhi PGs', kind: 'Android app + marketplace', tone: 'blue', url: 'https://dupgs.com',
    icon: '/products/dupgs/icon.webp',
    blurb: 'Find PG accommodation near Delhi University and across Delhi: verified listings with rent, room types, amenities and photos, filters by budget and gender, favourites and alerts.',
    screens: ['/products/dupgs/screen-2.webp', '/products/dupgs/screen-4.webp', '/products/dupgs/screen-5.webp'],
    stores: [{ label: 'Google Play', href: 'https://play.google.com/store/apps/details?id=com.delhipgs.app' }],
  },
  {
    id: 'giftfeels', name: 'GiftFeels', kind: 'iOS + Android app', tone: 'light', url: 'https://giftfeels.com/',
    icon: '/products/giftfeels/icon.webp',
    blurb: 'Make a private digital gift website in minutes: photos, memories and a message for birthdays, couples and friends, shared as a surprise link.',
    screens: ['/products/giftfeels/screen-1.webp', '/products/giftfeels/screen-2.webp', '/products/giftfeels/screen-3.webp'],
    stores: [
      { label: 'App Store', href: 'https://apps.apple.com/us/app/giftfeels-couples-friends/id6803380723' },
      { label: 'Google Play', href: 'https://play.google.com/store/apps/details?id=com.giftfeels.app' },
    ],
  },
  {
    id: 'orva', name: 'ORVA', kind: 'Storefront demo', tone: 'dark', url: '/work/orva',
    blurb: 'A clothing storefront you browse like a rail: garments turn on hover and drag, with quick view, product pages, cart and AI product photography from our own pipeline.',
    screens: [], video: '/work/orva/orva-desktop.mp4', poster: '/work/orva/orva-desktop-poster.webp',
  },
];
