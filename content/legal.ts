import { agency as site } from './agency';

export type Kind = 'terms' | 'privacy' | 'refunds' | 'delivery';
export const UPDATED = '9 October 2026';
const N = site.agencyName;

export const DOCS: Record<Kind, { title: string; desc: string; sections: [string, string[]][] }> = {
  terms: {
    title: 'Terms of Service', desc: `Terms for ordering creative and web services from ${N}.`,
    sections: [
      ['1. Who we are', [`${N} ("we", "us") is an independent creative and web studio operated by ${site.founder} in ${site.location}. Contact: ${site.email}.`]],
      ['2. Orders', ['An order is placed when you complete checkout. Each package has the scope, deliverables, revision rounds and turnaround shown on the Services page at the time of ordering. Work outside that scope is quoted separately before we start it.']],
      ['3. Prices & payment', ['Prices are set in US dollars (USD). Amounts in other currencies are approximate and shown for convenience only. Payment is due before production starts, by card via our payment providers (Stripe or Razorpay) or by an emailed payment link / invoice. Monthly plans are billed in advance each month until cancelled. You are responsible for any bank, currency-conversion or local taxes.']],
      ['4. Turnaround', ['Turnaround starts once payment is received and we have the brief and assets needed. Delays caused by late feedback or missing assets extend the timeline accordingly. Rush delivery prioritises your order; it does not change scope.']],
      ['5. Your materials', ['You confirm you have the rights to the photos, logos, product designs and other materials you send us, and that they may be used to create your deliverables.']],
      ['6. AI-generated content', ['Some deliverables are created with AI tools and edited by us. We check product accuracy by hand, but you are responsible for reviewing deliverables before publishing them, and for complying with advertising rules and platform policies (including any AI-disclosure requirements) where you run them. We do not create fake reviews or testimonials.']],
      ['7. Ownership', ['On payment in full, you own the final deliverables and may use them commercially worldwide. We keep ownership of our tools, templates and pre-existing code, and grant you a perpetual licence to use them as part of your deliverables. We may show non-confidential work in our portfolio unless you ask us not to.']],
      ['8. Revisions & acceptance', ['Revision rounds are listed per package. Deliverables are accepted when you approve them or 7 days after delivery without a revision request.']],
      ['9. Cancellation & refunds', ['See our Refund Policy.']],
      ['10. Liability', ['Our total liability for any order is limited to the amount you paid for it. We are not liable for indirect losses, including lost profits or ad spend. We do not guarantee specific sales, ROAS or ad-platform approval.']],
      ['11. Governing law', [`These terms are governed by the laws of ${site.location}, without prejudice to mandatory consumer protections in your country.`]],
    ],
  },
  privacy: {
    title: 'Privacy Policy', desc: `How ${N} collects and uses personal data.`,
    sections: [
      ['What we collect', ['When you order or contact us: your name, email, WhatsApp number, country, company and billing details, your project brief and the files you upload. We also keep basic technical logs (a hashed IP address and browser type) for security.']],
      ['Why we use it', ['To deliver the services you ordered, communicate with you about your project, process payments, keep accounting records and protect the site from abuse. Legal bases (GDPR / UK GDPR): performance of a contract, legitimate interests and legal obligations.']],
      ['Payments', ['Card payments are processed by Stripe or Razorpay. We never see or store your full card details. Their privacy policies apply to the payment step.']],
      ['Sharing', ['We do not sell your data. We share it only with service providers we need to deliver our services (hosting, payments, email, file storage), under appropriate safeguards, or where required by law.']],
      ['International transfers', [`We are based in ${site.location} and may process data there and in the countries of our providers. Where required, we use standard contractual clauses or equivalent safeguards.`]],
      ['Retention', ['Order records are kept for as long as required for accounting and tax purposes (typically up to 8 years). Uploaded project files are deleted 12 months after delivery unless you ask us to keep them longer, or sooner on request.']],
      ['Your rights', [`You can ask to access, correct, export or delete your data, or object to its use, by emailing ${site.email}. You can also complain to your local data-protection authority.`]],
      ['Cookies', ['This site uses only essential storage (your cart and currency preference in your browser, and a secure session cookie for our admin). No advertising or tracking cookies are set without consent.']],
    ],
  },
  refunds: {
    title: 'Refund & Cancellation Policy', desc: `Refunds and cancellations for ${N} orders.`,
    sections: [
      ['Before production starts', ['Cancel any time before we start work on your order and you get a full refund, no questions asked.']],
      ['After production starts', ['Because creative work is custom, we focus on getting it right: we revise within the package scope until the deliverables match the agreed brief. If we can’t deliver what was agreed, we refund the undelivered part of the order pro rata.']],
      ['Packs & monthly plans', ['For multi-asset packs, unused assets can be refunded pro rata. Monthly plans can be cancelled any time before the next billing date. The current month is not refunded but its deliverables are completed.']],
      ['Rush fees', ['Rush fees are refunded in full if we miss the rush deadline through our own fault.']],
      ['How to request', [`Email ${site.email} with your order ID. Approved refunds are issued to the original payment method within 5–10 business days. Your bank may apply currency-conversion differences.`]],
    ],
  },
  delivery: {
    title: 'Delivery Policy', desc: `How ${N} delivers digital services.`,
    sections: [
      ['Digital delivery only', ['All our services are digital. Nothing physical is shipped. Deliverables (images, videos, design files, website access) are delivered by email, shared cloud folder (e.g. Google Drive) or directly into your Shopify or hosting account.']],
      ['Timelines', ['Each package shows its standard turnaround in days. The clock starts once payment is received and we have your brief and assets. Rush delivery shortens turnaround by roughly half for eligible packages.']],
      ['Updates', ['You receive progress updates by email or WhatsApp, and a final delivery message with links and a walkthrough where relevant.']],
      ['Problems with delivery', [`If you can’t access a delivery link or a file is missing, email ${site.email} and we’ll resend within one business day.`]],
    ],
  },
};

