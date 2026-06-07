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
    'Centrol Matrix is a studio that builds websites, content engines, and AI automations for businesses that want to grow without hiring a department to do it.',
} as const;

export const nav = [
  { label: 'Work', href: '/websites' },
  { label: 'Services', href: '/services' },
  { label: 'Apps', href: '/apps' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
] as const;

// Hero — written fresh, in the confident/provocative editorial voice.
export const hero = {
  line1: 'Your website should',
  line2: 'do more than sit there.',
  accent: 'So make it work.',
} as const;

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
    image: '/work/hotel-demo.png',
    framable: true,
    blurb: 'A booking-ready hotel website prototype — rooms, rates, and a clean reservation flow.',
  },
  {
    name: 'Dental website',
    domain: 'dental-demo.vishalchauhan.in',
    url: 'https://dental-demo.vishalchauhan.in/',
    viewUrl: 'https://dental-demo.vishalchauhan.in/',
    embedUrl: 'https://dental-demo.vishalchauhan.in/',
    image: '/work/dental-demo.png',
    framable: true,
    blurb: 'A family dental clinic site built to explain treatments and take appointments.',
  },

  // --- Featured on the home page (the three cards under the embeds). ---
  {
    name: 'GiftFeels',
    domain: 'giftfeels.in',
    url: 'https://giftfeels.in',
    image: '/work/giftfeels.png',
    home: true,
    blurb: 'A gifting app we designed and shipped to iOS and Android.',
  },
  {
    name: 'DUPGS',
    domain: 'dupgs.com',
    url: 'https://dupgs.com',
    image: '/work/dupgs.png',
    home: true,
    blurb: 'A Delhi PG and rooms marketplace we designed, shipped, and run.',
  },
  {
    name: 'AngleForge',
    domain: 'angleforge.studio',
    url: 'https://angleforge.studio',
    image: '/work/angleforge.png',
    home: true,
    blurb: 'Turns one product photo into ten marketplace-ready shots in under a minute.',
  },

  // --- The rest of the portfolio (shown on /websites). ---
  {
    name: 'Soni Singh Artistry',
    domain: 'sonisinghartistry.com',
    url: 'https://sonisinghartistry.com/',
    image: '/work/sonisingh-portfolio.png',
    framable: true,
    blurb: 'A bridal makeup artist’s portfolio site built to book consultations.',
  },
  {
    name: 'Kangaroo House',
    domain: 'kangaroohousing.in',
    url: 'https://kangaroohousing.in',
    image: '/work/kangaroo-housing.png',
    blurb: 'A student-housing site built to fill rooms near East Delhi colleges.',
  },
  {
    name: 'recl.app',
    domain: 'recl.app',
    url: 'https://recl.app',
    image: '/work/recl.png',
    blurb: 'Save what matters, then actually recall it — summaries, search, and daily nudges.',
  },
  {
    name: 'Waste Pickers Welfare Foundation',
    domain: 'wwfngo.org',
    url: 'https://wwfngo.org',
    image: '/work/wwfngo.png',
    blurb: 'An NGO site for a Delhi foundation supporting waste pickers and their families.',
  },
  {
    name: 'CheaperAI',
    domain: 'cheaperai.tech',
    url: 'https://cheaperai.tech',
    image: '/work/cheaperai.png',
    blurb: 'A leaner way to run AI workloads without paying enterprise prices for them.',
  },
];

// The two scroll-choreographed embeds at the top of the home page.
export const homeEmbeds = work.filter((w) => w.embedUrl);
// The three featured cards under the embeds on the home page.
export const homeFeatured = work.filter((w) => w.home);

// Services — the reference image explicitly says NOT to use AI-generated descriptions.
// These are short, human, plain-spoken. Client can refine.
export const services = [
  {
    n: '01',
    title: 'AI Automation Consulting',
    body: 'We find the repetitive work eating your week and hand it to software that never sleeps.',
  },
  {
    n: '02',
    title: 'Workflow Optimization',
    body: 'Map how work actually moves through your business, then cut the steps that cost you time.',
  },
  {
    n: '03',
    title: 'SEO & Organic Growth',
    body: 'Technical fixes, real content, and the patience to rank and stay ranked.',
  },
  {
    n: '04',
    title: 'Content Systems',
    body: 'A repeatable engine for posts, carousels, and shorts so the feed never goes quiet.',
  },
  {
    n: '05',
    title: 'Digital Marketing Strategy',
    body: 'One plan that ties your site, content, and ads to outcomes you can count.',
  },
  {
    n: '06',
    title: 'Lead Generation Pipelines',
    body: 'Scrape, qualify, and route leads to the people who can actually close them.',
  },
  {
    n: '07',
    title: 'Brand Positioning',
    body: 'Decide what you stand for, then say it the same way everywhere.',
  },
  {
    n: '08',
    title: 'Content Repurposing',
    body: 'Turn one good idea into a week of posts across every channel that matters.',
  },
  {
    n: '09',
    title: 'AI-Powered Operations',
    body: 'Quiet software running in the background so your team can do the work only people can.',
  },
] as const;

// Studio services from the notes — what we make hands-on.
export const studioServices = [
  { title: 'Website making', body: 'Custom-built sites designed to convert and easy to keep updated.' },
  { title: 'UGC video', body: 'We manage a roster of creators — hired, briefed, and paid — to produce native-feeling video.' },
  { title: 'Product & quick-commerce photography', body: 'Catalog-ready product shots, fast.' },
  { title: 'Clipping', body: 'Long-form cut into the short clips each platform actually rewards.' },
  { title: 'Social media handling', body: 'We run the calendar, the posting, and the replies.' },
  { title: 'Auto-carousel marketing', body: 'Tens of carousels posted automatically across tens of channels.' },
] as const;

// The 11 automation agents — shown as a connected system, not 11 equal cards.
// #5 is intentionally reserved.
export const agents = [
  { id: 1, name: 'Lead Generation', detail: 'Google scraper that builds qualified lead lists.' },
  { id: 2, name: 'SEO + Blog Post', detail: 'Drafts and publishes posts (and can publish straight into this blog via API).' },
  { id: 3, name: 'Calling Agent', detail: 'Voice agent that handles inbound calls and qualifies leads.' },
  { id: 4, name: 'Product Listing', detail: 'Pipes products into AngleForge as publish-ready listings.' },
  { id: 6, name: 'YouTube Shorts Copy', detail: 'Writes shorts copy at volume.' },
  { id: 7, name: 'Carousel + Shorts from Images', detail: 'Turns a folder of images into carousels and shorts.' },
  { id: 8, name: 'Website Making', detail: 'Spins up site scaffolds on demand.' },
  { id: 9, name: 'WP JS', detail: 'Personalized WordPress automation.' },
  { id: 10, name: 'Hermes + OpenClaw', detail: 'The orchestration layer the other agents run through.' },
  { id: 11, name: 'Omni-post', detail: 'Posts to every social channel via Hermes.' },
] as const;

// Apps we've shipped. 2 published to iOS + Android.
export const apps = [
  { name: 'GiftFeels', detail: 'Published to iOS and Android.', store: true },
  { name: 'recl.app', detail: 'Published to iOS and Android.', store: true },
  { name: 'DelhiPGS', detail: 'Live at dupgs.in.', store: false },
] as const;
