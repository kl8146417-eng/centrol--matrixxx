import { agency as site } from './agency';

export type Kind = 'terms' | 'privacy' | 'refunds' | 'delivery';
export const UPDATED = '13 November 2026';
const N = site.agencyName;

// OWNER INPUT PENDING: legal operator name and a business/postal address. Until provided, "Who we are"
// stays neutral and lists only the studio name and contact details (no placeholder entity or address).
export const DOCS: Record<Kind, { title: string; desc: string; sections: [string, string[]][] }> = {
  terms: {
    title: 'Terms of Service', desc: `Terms for ordering creative and web services from ${N}.`,
    sections: [
      ['1. Who we are', [`${N} ("we", "us") is an independent creative and web studio. Contact: ${site.email} or ${site.phone}.`]],
      ['2. Orders', ['An order is placed when you complete checkout or accept a written quote. Each package has the scope, deliverables, revision rounds and turnaround shown on the Pricing page at the time of ordering. Work outside that scope is quoted separately before we start it.']],
      ['3. Prices & payment', ['Prices are set in US dollars (USD). Amounts in other currencies are approximate and shown for convenience only. We send an invoice with a secure payment link after you order; payment is due before production starts. Monthly plans are invoiced in advance each month until cancelled. You are responsible for any bank, currency-conversion or local taxes.']],
      ['4. Turnaround', ['Turnaround starts once payment is received and we have the brief and assets needed. Delays caused by late feedback or missing assets extend the timeline accordingly. Rush delivery prioritises your order; it does not change scope.']],
      ['5. Your materials', ['You confirm you have the rights to the photos, logos, product designs and other materials you send us, and that they may be used to create your deliverables.']],
      ['6. AI-generated content', ['Some deliverables are created with AI tools and edited by us. We check product accuracy by hand, but you are responsible for reviewing deliverables before publishing them, and for complying with advertising rules, marketplace rules and platform policies (including any AI-disclosure requirements) where you use them. We do not create fake reviews or testimonials.']],
      ['7. Free store audit', ['The free audit is a report based on your public web pages only. It describes issues we found and suggested fixes; it is not a guarantee of search ranking, traffic or sales, and it does not change your site. Fixes are separate, paid work, quoted before we start.']],
      ['8. Ownership', ['On payment in full, you own the final deliverables and may use them commercially worldwide. We keep ownership of our tools, templates and pre-existing code, and grant you a perpetual licence to use them as part of your deliverables. We may show non-confidential work in our portfolio unless you ask us not to.']],
      ['9. Revisions & acceptance', ['Revision rounds are listed per package. Deliverables are accepted when you approve them or 7 days after delivery without a revision request.']],
      ['10. Cancellation & refunds', ['See our Refund Policy.']],
      ['11. Liability', ['Our total liability for any order is limited to the amount you paid for it. We are not liable for indirect losses, including lost profits or ad spend. We do not guarantee specific sales, rankings, return on ad spend or ad-platform approval.']],
      ['12. Governing law', ['These terms are governed by the laws of India, without prejudice to mandatory consumer protections in your country or state.']],
    ],
  },
  privacy: {
    title: 'Privacy Policy', desc: `How ${N} collects and uses personal data, including US privacy rights and phone calls.`,
    sections: [
      ['What we collect', ['When you contact us, request a free audit or order: your name, email, store or website address, company, phone or WhatsApp number if you give one, billing details, your message or brief, and any files you upload. For security we also keep basic technical logs (such as IP address and browser type) for a short time.']],
      ['Why we use it', ['To reply to you, prepare the audit you asked for, deliver the services you ordered, send invoices, keep accounting records and protect the site from abuse. Legal bases where GDPR / UK GDPR apply: performance of a contract, legitimate interests and legal obligations.']],
      ['Who processes it for us', ['We use a small number of service providers to run the site: Netlify (hosting), Neon (the database that stores form submissions and orders), Resend (sending email), and a payment provider when we send you a payment link. They process data on our instructions only. We never see or store your full card details.']],
      ['Phone calls', [`Our number, ${site.phone}, is answered by an AI assistant that takes your message and books a callback with Asutosh. Calls to and from this number may be recorded and transcribed so we have an accurate note of what you asked; we use recordings and transcripts only to respond to you and keep a record of the conversation, and we don’t sell them.`, 'We also call businesses with an AI assistant that says it is an AI calling for Asutosh at Centrol Matrix. To stop calls from us, say so on the call or email us, and we will add your number to our do-not-call list.']],
      ['Selling and sharing', ['We do not sell your personal information, and we do not share it for cross-context behavioural advertising. We share it only with the service providers above, under appropriate safeguards, or where the law requires it.']],
      ['Your US privacy rights', [`Depending on your state (for example California under the CCPA/CPRA), you can ask to know what personal information we hold about you, to get a copy, to correct it, or to delete it. Email ${site.email} with "Privacy request" in the subject. We will confirm your request, may ask you to verify it from the email address we have on file, and will respond within the time the law allows (45 days in California). We won’t treat you differently for using these rights. You can use an authorised agent to make a request.`]],
      ['Other rights', [`If you are in the EU, UK or elsewhere, you can also object to or restrict our use of your data, or export it, by emailing ${site.email}. You can complain to your local data-protection authority.`]],
      ['International transfers', ['Our team works from India, and our providers may process data in the United States and other countries. Where required, we use standard contractual clauses or equivalent safeguards.']],
      ['Retention', ['Messages and audit requests are kept while we are in touch with you about them, and deleted sooner on request. Order records are kept for as long as required for accounting and tax purposes (typically up to 8 years). Uploaded project files are deleted 12 months after delivery unless you ask us to keep them longer, or sooner on request.']],
      ['Cookies and tracking', ['We don’t use advertising or analytics cookies, and there is no tracking pixel on this site. Your browser stores your cart and currency choice, and remembers for the current visit which link brought you here (so we know where a message came from). Our admin area uses a session cookie. If we ever add analytics or ads tracking, we will ask for your consent first and update this page.']],
    ],
  },
  refunds: {
    title: 'Refund & Cancellation Policy', desc: `Refunds and cancellations for ${N} orders.`,
    sections: [
      ['Before production starts', ['Cancel any time before we start work on your order and you get a full refund, no questions asked.']],
      ['After production starts', ['Because creative work is custom, we focus on getting it right: we revise within the package scope until the deliverables match the agreed brief. If we can’t deliver what was agreed, we refund the undelivered part of the order pro rata.']],
      ['Packs & monthly plans', ['For multi-asset packs, unused assets can be refunded pro rata. Monthly plans can be cancelled any time before the next billing date. The current month is not refunded but its deliverables are completed.']],
      ['Rush fees', ['Rush fees are refunded in full if we miss the rush deadline through our own fault.']],
      ['How to request', [`Email ${site.email} with your order ID. Approved refunds are issued to the original payment method within 5 to 10 business days. Your bank may apply currency-conversion differences.`]],
    ],
  },
  delivery: {
    title: 'Delivery Policy', desc: `How ${N} delivers digital services.`,
    sections: [
      ['Digital delivery only', ['All our services are digital. Nothing physical is shipped. Deliverables (images, videos, design files, website access) are delivered by email, shared cloud folder (for example Google Drive) or directly into your Shopify or hosting account.']],
      ['Timelines', ['Each package shows its standard turnaround in days. The clock starts once payment is received and we have your brief and assets. Rush delivery shortens turnaround by roughly half for eligible packages.']],
      ['Updates', ['You receive progress updates by email, and a final delivery message with links and a walkthrough where relevant.']],
      ['Problems with delivery', [`If you can’t access a delivery link or a file is missing, email ${site.email} and we’ll resend within one business day.`]],
    ],
  },
};
