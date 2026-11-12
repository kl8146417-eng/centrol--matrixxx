# Handoff: centrolmatrix.com v6 (US e-commerce relaunch)

Date: 2026-11-13 · Branch: `v6-us-ecom` (from `v5-redesign`) · PR: kl8146417-eng/centrol--matrixxx#3
Brief: `docs/briefs/2026-11-13-site-rebuild-BRIEF.md`

## Status

| Step | State |
|---|---|
| Build, lint, type-check | Pass (`npm run build`, `npm run lint`, `tsc --noEmit`). |
| Deploy preview | **Ready:** https://deploy-preview-3--centrol-matrix.netlify.app (deploy `6af6287752577ef84425d1a2`, commit `82ee748`). |
| Old-URL smoke test on the preview | Every old URL returns 200; the 8 new 301s land correctly; the blog API lists only the kept post. |
| Production | **Live.** PR #3 merged as `7da04ac`; Netlify deploy `6af62a3508d938bef1aa36b7` was ready at 21:07 (2026-11-13). centrolmatrix.com and `/audit` checked at 390 and 1440: every old URL returns 200, the 301s work, and the blog API lists 1 post. |
| Live test entry | One `/audit` submission named "TEST - ignore" (test-ignore@example.com, site example.com) through the real form. The API returned 200 `{ok: true, delivered: false}` and the thank-you message showed. **Delete it from `/admin` → contacts once seen.** Confirming the row itself needs `/admin` with a token, which this session didn't have. |

## How production deploys

- Netlify site `centrol-matrix` (`8dc00469-950c-48ec-a7e7-5530cae88a1a`) is git-linked to GitHub.
- Merging into `main` builds production; every PR gets a deploy preview.
- (`v5-redesign` went live the same way, as PR #2.)

## What changed, by page

- **`/audit` (new)**: the free store audit page that the cold email and the AI caller point to.
  - Personalised by `?first=&site=&brand=`, e.g. `/audit?first=Kate&site=katemaller.com` shows "Hi Kate, here's how the free audit works for katemaller.com." Odd or unknown values fall back to generic copy.
  - Sections:
    - the headline "Your free store audit, from Asutosh at Centrol Matrix" plus the "Got a call from our AI assistant?" line;
    - the form: first name, email, store URL, notes;
    - the five checks in plain words;
    - the three next steps;
    - AngleForge samples;
    - the FAQ;
    - phone and email.
  - The form posts to `/api/contact` with `type: "audit"` and lands in `contacts` with the message headed **FREE STORE AUDIT REQUEST** and `meta.type = audit`.
  - On success it says "Asutosh will email your report within 2 business days".
- **Home (`/`)**, in the brief's order:
  1. hero ("Product photos, UGC ads and Shopify fixes for e-commerce brands", free audit CTA, phone);
  2. sample rail, labelled as AI samples, not client work;
  3. five-service list with live from-prices;
  4. AngleForge before/after;
  5. free audit;
  6. how it works (3 steps);
  7. pricing teaser;
  8. Meet Asutosh;
  9. FAQ;
  10. contact block with the form.
- **`/services`**: one section per offer with every package, turnaround and price from `content/services.json`:
  1. Product & listing photos (AngleForge; Amazon secondary images);
  2. UGC video ads & ad creative;
  3. Shopify stores & fixes;
  4. Lead & customer follow-up (quote);
  5. Apps.
  - The consulting-buzzword grid and the "Eleven agents" diagram are gone.
- **`/pricing`**:
  - Categories renamed and reordered for e-commerce.
  - Retired consulting packages are flagged `hidden` in `services.json` (not deleted).
  - WhatsApp buttons are replaced by "Ask for a quote".
  - Copy says invoice / payment link.
- **`/work`**: framed as "Samples from our pipeline" (AI-generated, not client work). The 480p preview loads on hover; phones open the 480p file.
- **`/about`**: Asutosh named as founder and contact, Vishal and Karan listed, plus how we work and our AI policy.
- **`/contact`**:
  - Form (16px, 52px fields), US phone with the AI note, email, and the free audit.
  - WhatsApp and LinkedIn as secondary links.
  - `?service=` labels the enquiry.
- **`/apps`**: "Tools we built and use". Siteory and AngleForge first, then Recl, GiftFeels, WishCuts and the rest.
- **`/fashion`**:
  - Left the main nav; it's in the footer as "For clothing brands".
  - "Pay online by card" is now "We send an invoice with a payment link".
  - The WhatsApp CTAs are now prices, phone and email.
  - The comparison table becomes stacked cards on phones. It has its own OG image.
- **`/for/[slug]`**: WhatsApp is replaced by "Email Asutosh" and "Call +1 (218) 438-4731" with the AI note.
- **Nav**:
  - Services · Work · Pricing · About · Contact, plus the "Free site audit" button.
  - Mobile gets a full-height menu sheet. "Free audit" stays visible in the bar on phones.
- **Footer**:
  - Studio links.
  - More: For clothing brands, **Real estate → https://homes.centrolmatrix.com**, Tools we built, Websites we built, Blog, FAQ.
  - Phone with the AI note, email, WhatsApp (secondary), LinkedIn.
- **Legal (`/terms`, `/privacy`)**:
  - Neutral "Who we are" (no operator name or address until the owner supplies them).
  - Invoice-only payment wording and a free-audit clause.
  - A US privacy section: CCPA basics, processors (Netlify, Neon, Resend, payment provider), no sale or sharing, how to request access or deletion.
  - Phone calls: AI assistant, possible recording and transcription, opting out of calls.
  - A cookie line that is true (no ads or analytics cookies).
- **Sitewide**:
  - US phone **+1 (218) 438-4731** with "Answered 24/7 by our AI assistant. Asutosh calls you back." in the header menu, footer, contact, `/audit` and JSON-LD (`telephone`, `contactPoint` areaServed US).
  - WhatsApp only on `/contact` and in the footer.
  - New titles and descriptions naming Shopify, Amazon, product photos, UGC ads and the free audit.
  - New 1200×630 OG images: `public/og/{home,audit,services,pricing,fashion}.jpg`.

## Claims fixed (brief §4)

- Hero "that sell your product" and the outcome lines in `services.json`/bento: rewritten as deliverables.
- "Pay online by card" (`/fashion`) and the FAQ "By card through Stripe or Razorpay": now invoice / payment link.
- "Eleven agents" with 10 listed: the section is removed.
- AngleForge "ten marketplace-ready shots in under a minute": replaced with what angleforge.studio itself says (one photo in; studio, angle, lifestyle and close-up shots out).
- GiftFeels App Store link `id6803380723`: it now opens **"Little Us: Couple Games & Quiz App"**, so the store badges are removed.
- "Creator-style UGC (Seedance)": renamed. The "pink monogram-style handbag" sample is removed from every gallery; the media file stays in `/public`.
- "+63", "Spartan Rich", "India" in `agency.ts`, `legal.ts` and the structured data: replaced.
  - The FAQ and privacy page still say, truthfully, that the team works from India.
  - Governing law stays India.

## Redirects added (all 301, in `next.config.mjs`)

- `/free-audit`, `/site-audit`, `/store-audit` → `/audit`.
- Each unpublished blog post (below) → `/blog`.
- No existing URL was moved or renamed. `/fashion`, `/for/*`, `/blog/*`, `/pricing`, `/contact`, `/work`, `/apps`, `/websites` all still return 200.

## Blog posts taken down (none deleted)

Posts live in the Neon `posts` table. I had no database credentials or `blog:write` token on this PC: the DB URL is injected at runtime by Netlify DB, and `netlify env:get` has no value for it. So they are **hidden in code**. `content/blog-unpublished.ts` filters them out of the blog index, post pages, `/api/blog`, RSS and the sitemap, and the redirects above send each URL to `/blog`. Their rows are untouched.

| Slug | Title |
|---|---|
| `how-to-sell-ai-websites-for-5000` | How to Sell AI Websites for $5000 in 2025 |
| `sell-ai-websites-for-5000-realistic-path-by-2028` | Sell AI Websites for $5000: Realistic Path by 2028 (near-duplicate) |
| `six-figures-selling-information-products` | Six Figures Selling Information Products: Audience First |
| `build-saas-with-claude` | Build SaaS with Claude on $20 a Month |
| `build-saas-with-claude-for-20-a-month-one-laptop-workflow` | Build SaaS with Claude for $20 a Month: One Laptop Workflow (near-duplicate) |
| `ai-generated-cartoon-20000` | How One Creator Made $20k From an AI-Generated Cartoon |

Kept: `single-product-shopify-store-ai-and-short-video-playbook` (on topic).

To also set them to `draft` in the database: `CM_BLOG_TOKEN=<blog:write token> node scripts/blog-unpublish.mjs`. That's a dry run; add `--apply` to make the change. The admin UI (`/admin`) works too.

## Hardening

- `/api/contact`:
  - Per-IP limit of 5 submissions per 10 minutes (429), keyed on `x-nf-client-connection-ip`.
  - A hidden honeypot field and Zod validation with field errors.
  - Saves to `contacts` first, so a missing or failing Resend never shows the visitor an error. Locally verified: audit 200, missing site 422, short message 422, honeypot dropped, 6th request 429.
- Production has **no `RESEND_API_KEY`** set (checked by name only), so submissions are saved but not emailed. Watch `/admin` for new requests, or set the key.

## Responsive

See `docs/2026-11-13-responsive-audit.md`. In short:
- Zero horizontal overflow, zero tap targets under 44px and zero form fields under 16px on every public page at 360, 390, 414, 768, 1024, 1280 and 1440.
- Phones never autoplay video: they get a poster, and the 480p file loads on tap.
- Before/after sheets: `docs/screens/compare/` (home, services, pricing, work, contact, fashion, apps, the new `/audit`, the mobile menu).
- Full-page captures are on disk only (gitignored): `docs/screens/before/{live,local}`, `docs/screens/after/{local,preview}`.

## Deploy and rollback

- **Production right now:** deploy `6ad0ac2b44a166cc99efab84` (main @ `d59a396`, v5). **Keep this ID to roll back.**
- **v6 production deploy:** `6af62a3508d938bef1aa36b7` (main @ `7da04ac`, PR #3 merged 2026-11-13).
- **To roll back:** Netlify UI → Deploys → `6ad0ac2b…` → "Publish deploy", or `npx netlify-cli api restoreSiteDeploy --data '{"site_id":"8dc00469-950c-48ec-a7e7-5530cae88a1a","deploy_id":"6ad0ac2b44a166cc99efab84"}'`.
- Live captures: `docs/screens/after/live/` (on disk, gitignored).

## Env vars

Nothing was changed on Netlify. The phone defaults to +1 (218) 438-4731 in code (`NEXT_PUBLIC_PHONE` overrides it). WhatsApp stays on the existing default. `NEXT_PUBLIC_CAL_URL` is unset, so no "Book a call" buttons render anywhere.

## Open owner questions

1. **Legal operator name and a business/postal address** for the footer and terms. "Who we are" is neutral until then.
2. **WhatsApp:** kept as a secondary contact (+63 951 568 0964) per the owner's answer. Change it with `NEXT_PUBLIC_WHATSAPP` if a new number is wanted.
3. **Booking link** (Cal.com or Calendly) for "Book a call with Asutosh". None yet; set `NEXT_PUBLIC_CAL_URL` and the buttons appear.
4. **Analytics:** none, by the owner's choice. If GA4 or Pixel is added later, add a consent banner and update the privacy "Cookies and tracking" section.
5. **Photos** of Asutosh, Vishal and Karan: put them in `public/team/` and set `photo` in `content/team.ts`. Initials show until then.
6. **Roles for Vishal and Karan**, so they can be added in `content/team.ts`.
7. **GiftFeels App Store listing:** is "Little Us" (id6803380723) the renamed GiftFeels app? If yes, re-add the badge in `content/products.ts`.
8. **Resend:** set `RESEND_API_KEY` (and optionally `CONTACT_TO_EMAIL`) on Netlify so audit requests are emailed as well as saved.
9. **Blog drafts:** run `scripts/blog-unpublish.mjs` with a `blog:write` token if the six posts should also be `draft` in the DB.
