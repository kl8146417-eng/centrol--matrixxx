// The free store audit: the offer behind our cold email and cold calls.
// Claim limits (hard): Siteory *reports*, it does not fix. Never quote Siteory scores. No ranking or
// sales promises. Asutosh reviews every report before it goes out. Turnaround: 2 business days.

export const AUDIT_TURNAROUND = '2 business days';

/** What the audit looks at, in shop-owner language (no jargon, no scores). */
export const auditChecks: { t: string; d: string }[] = [
  { t: 'Links that show no picture when shared', d: 'When someone pastes your product link into a text, WhatsApp or Facebook, does a photo show up, or a blank box?' },
  { t: 'Page titles Google cuts off', d: 'Titles that run too long get chopped mid-word in search results, so shoppers never see the end.' },
  { t: 'Search descriptions that get trimmed', d: 'The two lines under your link in Google: missing, duplicated, or cut short.' },
  { t: 'Product images Google can’t read', d: 'Images with no description (alt text), so search engines and screen readers can’t tell what they show.' },
  { t: 'Missing or slow pages', d: 'Links that lead nowhere, pages that load slowly on a phone, and pages search engines can’t reach.' },
];

export const auditSteps: { t: string; d: string }[] = [
  { t: 'Send your store link', d: 'Your name, email and store URL. That’s all. No logins, no access, no call.' },
  { t: 'We check your public pages', d: 'Siteory, the audit tool we built, scans the pages any shopper can see. Then Asutosh reads through every result.' },
  { t: 'Your report, by email', d: `A short report in plain English within ${AUDIT_TURNAROUND}: what’s wrong, why it matters, and what to fix first. Fix it yourself, or ask us for a fixed quote.` },
];

export const auditFaq: { q: string; a: string }[] = [
  {
    q: 'Is it really free?',
    a: 'Yes. No card and no call needed. The report is yours to keep. If you want us to fix what it finds, we send a fixed quote; if you’d rather fix it yourself or hand it to your own developer, that’s fine too.',
  },
  {
    q: 'Do you need access to my store?',
    a: 'No. The audit only reads your public pages, the same ones any shopper or search engine sees. We never ask for logins, admin access or customer data.',
  },
  {
    q: 'Who are you?',
    a: 'Centrol Matrix is a three-person studio that makes product photos and video ads for e-commerce brands, and builds and fixes Shopify stores. Asutosh runs outreach and reads every audit before it goes out. Siteory, the tool that runs the checks, is one we built ourselves.',
  },
  {
    q: 'Why did an AI assistant call me?',
    a: 'Our calls to store owners are made by an AI assistant on Asutosh’s behalf. It mentions one thing it noticed on your store and offers this audit. If you’d rather not get calls from us, say so on the call or email contact@centrolmatrix.com and we’ll take your number off our list.',
  },
];
