import { agency } from './agency';
import { auditFaq, AUDIT_TURNAROUND } from './audit';

export type Group = 'Free audit' | 'Ordering' | 'Production' | 'Payments' | 'Studio';
export interface QA { q: string; a: string; group: Group }

// No outcome promises (sales, ROAS, rankings). Payments are invoice-only today: Stripe/Razorpay are off.
export const faq: QA[] = [
  ...auditFaq.map((f) => ({ ...f, group: 'Free audit' as const })),
  { group: 'Free audit', q: 'What happens after the audit?', a: `Asutosh emails your report within ${AUDIT_TURNAROUND}. If you want help with what it finds, reply and we send a fixed quote for the fixes. There’s no follow-up sequence and no pressure if you don’t.` },

  { group: 'Ordering', q: 'Do I need a call before ordering?', a: `No. Every package has a fixed scope and price, so you can order online, fill in a short brief and upload your product photos. If you’d rather talk first, call ${agency.phone} (our AI assistant takes a message and Asutosh calls you back) or email ${agency.email}.` },
  { group: 'Ordering', q: 'What do you need from me?', a: 'Your brand name, links to the products, three to five photos per product (clean phone photos are fine) and any references you like. The brief at checkout walks you through it, and you can send more files later.' },

  { group: 'Production', q: 'How fast is delivery?', a: 'Turnaround is listed on every package and starts once your brief and photos are in: a single UGC video in 3 days, a 10-image photo set in 5 days, a Storefront Starter store in about 14 days. Rush delivery cuts that roughly in half.' },
  { group: 'Production', q: 'How many revisions are included?', a: 'Each package lists its revision rounds (usually one to three). Small fixes such as typos, crops and colour tweaks don’t count as a round.' },
  { group: 'Production', q: 'Will the AI product images look like my actual product?', a: 'That is the whole job. We start from your real photos, keep colour, logo, label and material details locked, and check every image by hand before delivery. Images that misrepresent the product get rejected, not delivered.' },
  { group: 'Production', q: 'Can I use these images on Amazon?', a: 'Yes, as secondary images. Keep a real photo of the product on a white background as your main image; we make the rest of the set: lifestyle scenes, angles, in-use shots and close-ups, sized for Amazon and Shopify.' },
  { group: 'Production', q: 'Will people be able to tell it is AI?', a: 'We work so they can’t tell from the product: your real photo is the source, and we check colour, print, stitching and fit against it before anything ships. For people and scenes we aim for phone-camera realism, not glossy renders. We still recommend keeping one real photo as the main listing image.' },
  { group: 'Production', q: 'Are AI UGC ads allowed on Meta and TikTok?', a: 'Yes, as long as they aren’t deceptive. We don’t invent testimonials, fake reviews or claims you can’t back up, and we can add AI labels where a platform asks for them.' },
  { group: 'Production', q: 'Do AI images and videos need a label?', a: 'Sometimes. Meta and TikTok label some AI content, and some countries require synthetic media to be marked. We deliver files ready to label and never present AI people as real customers.' },
  { group: 'Production', q: 'Do you build on Shopify?', a: 'Yes, by default: theme customisation plus custom sections, and fixes to existing stores. For special projects we also build custom storefronts, like our ORVA demo. Either way you own it.' },

  { group: 'Payments', q: 'How do I pay?', a: 'By invoice. Place your order and we email you a secure payment link within one business day. Work starts once it’s paid.' },
  { group: 'Payments', q: 'Which currencies do you accept?', a: 'Prices are set and billed in US dollars. The currency switch on the pricing page shows approximate GBP, EUR, AUD, CAD and INR amounts so you can budget.' },
  { group: 'Payments', q: 'Can I cancel a monthly plan?', a: 'UGC Factory is month to month: cancel any time before your next billing date. For the monthly creative retainer we suggest three months so there’s time to test, but there’s no lock-in contract.' },
  { group: 'Payments', q: 'What is your refund policy?', a: 'If we haven’t started production, you get a full refund. After that, we revise until the work matches the brief, and unused parts of a package can be refunded pro rata. See the refund policy for details.' },

  { group: 'Studio', q: 'Where are you based? What about time zones?', a: 'We’re a three-person team working from India with brands in the US and elsewhere. Asutosh books calls in your working hours, and project updates come by email. Our US number is answered around the clock by an AI assistant that takes a message.' },
  { group: 'Studio', q: 'Who owns the work?', a: 'You do. Once the order is paid in full, you get full commercial rights to every deliverable: images, videos, copy and code.' },
  { group: 'Studio', q: 'Is ORVA a real client?', a: 'No. ORVA is our in-house concept label, built end to end to show what we do: the storefront, the product photo pipeline and the creative. It is a live demo you can click through, not a paid client project.' },
];

export const faqGroups: Group[] = ['Free audit', 'Ordering', 'Production', 'Payments', 'Studio'];
