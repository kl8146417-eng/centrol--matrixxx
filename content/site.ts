// Single source of truth for site copy + structured content.
// All copy here is human-written. No AI filler, no buzzwords, no placeholder numbers.

export const site = {
  name: 'Centrol Matrix',
  wordmark: 'CENTROL MATRIX',
  monogram: 'CM',
  email: 'contact@centrolmatrix.com',
  linkedin: 'https://www.linkedin.com/company/centrol-matrix',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://centrolmatrix.com',
  // Placeholder logo. Swap for self-hosted /logo.svg once the final mark is approved.
  logoPlaceholder:
    'https://media.licdn.com/dms/image/v2/D560BAQFr3NJZL9tmzg/company-logo_100_100/B56Z5la2yiIoAI-/0/1779818000058/centrol_matrix_logo?e=1782345600&v=beta&t=oWgfPbOQbVXdK_Jrsx_E6UQnAEUfEdfExih-4XqBH3g',
  description:
    'Centrol Matrix makes product photos, Amazon and Shopify listing images and UGC-style video ads for e-commerce brands, builds and fixes Shopify stores, and sets up lead follow-up. Start with a free store audit.',
} as const;

// Main nav (v6, US e-commerce first). The CTA button ("Free site audit") is rendered separately.
export const nav = [
  { label: 'Services', href: '/services' },
  { label: 'Work', href: '/work' },
  { label: 'Free audit', href: '/audit' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const;

// Footer-only links: verticals, our own products, the blog. /fashion stays live for email links.
export const footerMore = [
  { label: 'For clothing brands', href: '/fashion' },
  { label: 'Real estate', href: 'https://homes.centrolmatrix.com' },
  { label: 'Tools we built', href: '/apps' },
  { label: 'Websites we built', href: '/websites' },
  { label: 'Blog', href: '/blog' },
  { label: 'FAQ', href: '/faq' },
] as const;

// Work / products we've shipped. Framed as portfolio ONLY — never as "old brands".
// - `url`     : the live destination the card/marquee links to.
// - `viewUrl` : what the "See now" modal opens in an iframe (demos use their demo URL).
// - `image`   : homepage screenshot served from /public/work.
// - `home`    : show in the three-card row on the home page.
// - `embed`   : the two scroll-choreographed live embeds at the top of home.
export type WorkItem = {
  name: string;
  domain: string;
  url: string;
  image: string;
  blurb: string;
  viewUrl?: string;
  embedUrl?: string;
  home?: boolean;
  // Whether the live site allows being shown inside an iframe. Sites that send
  // X-Frame-Options / restrictive CSP can't be previewed inline, so the "See
  // now" modal falls back to the screenshot + an open-in-new-tab button.
  framable?: boolean;
};

export const work: WorkItem[] = [
  // --- The two live demo sites: powering the scroll embeds on the home page. ---
  {
    name: 'Hotel prototype',
    domain: 'hoteldemosite.vishalchauhan.in',
    url: 'https://hoteldemosite.vishalchauhan.in/',
    viewUrl: 'https://hoteldemosite.vishalchauhan.in/',
    embedUrl: 'https://hoteldemosite.vishalchauhan.in/',
    image: '/work/hotel-demo.webp',
    framable: true,
    blurb: 'A booking-ready hotel website prototype: rooms, rates and a clean reservation flow.',
  },
  {
    name: 'Dental website',
    domain: 'dental-demo.vishalchauhan.in',
    url: 'https://dental-demo.vishalchauhan.in/',
    viewUrl: 'https://dental-demo.vishalchauhan.in/',
    embedUrl: 'https://dental-demo.vishalchauhan.in/',
    image: '/work/dental-demo.webp',
    framable: true,
    blurb: 'A family dental clinic site built to explain treatments and take appointments.',
  },

  // --- Featured on the home page (the three cards under the embeds). ---
  {
    name: 'GiftFeels',
    domain: 'giftfeels.com',
    url: 'https://giftfeels.com',
    image: '/work/giftfeels-1440.webp',
    home: true,
    blurb: 'Personal digital gift pages and a private app for couples, designed, built and run by us.',
  },
  {
    name: 'DUPGS',
    domain: 'dupgs.com',
    url: 'https://dupgs.com',
    image: '/work/dupgs-1440.webp',
    home: true,
    blurb: 'A Delhi PG and rooms marketplace we designed, shipped, and run.',
  },
  {
    name: 'AngleForge',
    domain: 'angleforge.studio',
    url: 'https://angleforge.studio',
    image: '/work/angleforge.webp',
    home: true,
    blurb: 'Our product-photo tool: one product photo in, studio, angle, lifestyle and close-up shots out.',
  },

  // --- The rest of the portfolio (shown on /websites). ---
  {
    name: 'Soni Singh Artistry',
    domain: 'sonisinghartistry.com',
    url: 'https://sonisinghartistry.com/',
    image: '/work/sonisingh-portfolio.webp',
    framable: true,
    blurb: 'A bridal makeup artist’s portfolio site built to book consultations.',
  },
  {
    name: 'Kangaroo House',
    domain: 'kangaroohousing.in',
    url: 'https://kangaroohousing.in',
    image: '/work/kangaroo-housing.webp',
    blurb: 'A student-housing site built to fill rooms near East Delhi colleges.',
  },
  {
    name: 'recl.app',
    domain: 'recl.app',
    url: 'https://recl.app',
    image: '/work/recl-1440.webp',
    blurb: 'Save what matters, then actually recall it: summaries, search and daily nudges.',
  },
  {
    name: 'Waste Pickers Welfare Foundation',
    domain: 'wwfngo.org',
    url: 'https://wwfngo.org',
    image: '/work/wwfngo.webp',
    blurb: 'An NGO site for a Delhi foundation supporting waste pickers and their families.',
  },
  {
    name: 'CheaperAI',
    domain: 'cheaperai.tech',
    url: 'https://cheaperai.tech',
    image: '/work/cheaperai.webp',
    blurb: 'A leaner way to run AI workloads without paying enterprise prices for them.',
  },
];
