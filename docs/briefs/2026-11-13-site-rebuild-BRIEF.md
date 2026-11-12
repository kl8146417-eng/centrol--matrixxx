# BRIEF: Rebuild centrolmatrix.com for US e-commerce sellers (fix, restructure, make it fully responsive, deploy)

Written 2026-11-13 by the Claude session that runs Centrol Matrix's outreach. You are the dedicated site session for this repo.
The owner (Asutosh) wants this done end to end: fix, restructure, make it responsive everywhere, and deploy to production.
Keep the context you learn in this repo. At the end, update `CLAUDE.md` with the new direction so future sessions start from it.

---

## 1. Why this matters now

Centrol Matrix (3-person studio: Asutosh, Vishal, Karan; **Asutosh is the public face and contact, never Karan**) has started outbound to **US Shopify / Amazon / e-commerce sellers**:
- Cold email (plain text, offering a free website audit).
- An **AI cold-call agent** (Fish Audio, persona "Clara, an AI assistant calling for Asutosh at Centrol Matrix"). It calls from **+1 (218) 438-4731**, points out one real issue on the prospect's store, and offers a **free site audit report emailed by Asutosh**, plus an optional callback.
- Inbound calls to +1 (218) 438-4731 are answered by an **AI receptionist** for Centrol Matrix that takes a message and books a callback with Asutosh (being set up now by the other session).

Every prospect who hears the call googles centrolmatrix.com. **Today the site does not back up the pitch.** It reads as a fashion studio for Indian clothing brands, and shows a Philippines WhatsApp number, "operated by Spartan Rich in India", course-seller blog posts and a "pay by card" claim that is false. Nothing on it mentions a free audit. The owner also says the current structure is very bad. Fix all of that.

The three brands:
- **Centrol Matrix** (this site): AI UGC videos, ad creatives, product photos, Shopify sites, apps, lead follow-up automation.
- **Siteory** (siteory.co): the owner's own website audit tool. It finds SEO, AI-search-visibility and security issues and gives a ranked fix list. It is the source of the **free audit**.
- **AngleForge** (angleforge.studio): their AI product-photo tool. It turns white-background product shots into lifestyle and ad-style images.

New sister site being built in parallel by another session: **homes.centrolmatrix.com** (real-estate offer: 3D walkthroughs from floor plans, virtual staging, listing films, AI phone receptionist). Link to it from this site as "Real estate". Don't build it here.

## 2. Hard rules

1. **Claims.**
   - No revenue, conversion, sales or ranking promises ("sell more", "built to sell", "never throttles spend" and similar must go).
   - No fake stats, testimonials or client logos.
   - Don't say Siteory "fixes" sites: it reports, and fixing is Centrol Matrix's paid work.
   - Don't say "penetration testing".
   - Never quote Siteory scores.
   - Never pitch Facebook/Instagram/TikTok ads to CBD or ingestible-supplement brands.
2. **Honesty about AI.** Where the phone number appears, say it's answered by an AI assistant and that Asutosh calls back personally. Label AI-generated samples as samples.
3. **Don't break inbound links.** `/fashion`, `/for/[slug]`, `/blog/*`, `/pricing`, `/contact`, `/work`, `/apps` are linked from emails, the blog and Google. If you move or rename anything, add 301 redirects (`next.config.mjs` `redirects()` or `netlify.toml`).
4. **Data.**
   - Don't delete database rows or media.
   - To take a blog post down, unpublish it (draft or hidden), never delete, and list each one in the handoff.
   - Don't send any email to anyone except an explicit test.
5. **Secrets.** Never print, commit or paste API keys or tokens. `.env*` stays out of git. Read env names only.
6. **Git.**
   - Work on a new branch `v6-us-ecom` created from `v5-redesign` (which is what's live).
   - Commit in logical steps.
   - Never force-push, never rewrite history, never push to `main` without merging normally.
7. **Out of scope.** Don't touch the Fish Audio agents, the cold-email files, Resend/Zoho settings or the DNS of the apex domain.
8. **Build gate.** `npm run build` (and `npm run lint` if configured) must pass before any deploy.

## 3. Verified facts about the current setup (2026-11-13)

- **Live build:** the repo's v5. Branch `v5-redesign` is 10 commits ahead of `origin/main`. Remote is `github.com/kl8146417-eng/centrol--matrixxx`; the `gh` CLI is logged in as `asutoosh` with push rights.
- **Hosting:** Netlify (`Server: Netlify`). The Netlify CLI is **logged in on this PC** (user "asutosh pattanayak") but not installed globally, so use `npx netlify-cli ...`.
  - **First find out how production deploys:** `npx netlify-cli status`, `npx netlify-cli sites:list`, and the site's build settings (is it git-linked, and to which production branch, or manual deploys?).
- **Stack:** Next.js 14 App Router with `@netlify/plugin-nextjs`; Node 20 on Netlify, Node 22 locally.
- **Contact:** forms post to `/api/contact`, which saves to the Neon `contacts` table (Netlify Blobs fallback) and emails via Resend only if a key is set (unverified whether it does). No rate limit.
- **Phone and booking:**
  - The WhatsApp number comes from `NEXT_PUBLIC_WHATSAPP`, defaulting to `639515680964` in `content/agency.ts:5`. It appears in about 53 places.
  - `NEXT_PUBLIC_CAL_URL` is empty, so every "Book a call" button is hidden.
- **Payments:** Stripe and Razorpay are both off on live (`/api/config`), so orders are invoice-only.
- **DNS:** at Spaceship (launch1/2.spaceship.net).

## 4. Problems found in review (fix all of them)

The review cited these file:line references. Re-verify each one before editing; lines may have moved.

**Identity and trust**
- `content/agency.ts:5,14-15`: +63 WhatsApp fallback; `founder: 'Spartan Rich'`, `location: 'India'`.
- `content/legal.ts:11`: "operated by Spartan Rich in India". **Ask the owner for the legal operator name and business/postal address.** Until then, don't publish a placeholder: phrase it neutrally and list it under owner input.
- `app/layout.tsx:75`: structured data lists the +63 phone. Switch to the US number.
- `content/team.ts`: initials only. Make Asutosh the named contact (founder, outreach). Add roles. Leave photo slots that work without photos, or use real photos if the repo has them.
- No postal address anywhere (see the ask list).

**False or unverified claims**
- `app/fashion/page.tsx:37` says "Pay online by card", and `content/faq.ts:15` says "By card through a secure Stripe or Razorpay checkout". Both are false today. Say "We send an invoice / payment link".
- `components/AgentSystem.tsx:16`: "Eleven agents." but 10 are listed.
- `content/site.ts:95`: AngleForge "ten marketplace-ready shots in under a minute" is unverified. Soften it, or check angleforge.studio's own claims.
- `content/products.ts:52-61`: the GiftFeels App Store link now opens a different app ("Little Us"). Fix or remove it.
- Outcome promises at `content/services.json:203,274` and `components/home/ServicesBento.tsx:30`, plus the hero line "Ads, shoots and stores that sell your product." Rewrite them as what you deliver, not results.
- `content/real-work.json:67,116`: a caption names the AI tool ("Seedance"), and a "pink monogram-style handbag" is a trademark-lookalike risk. Rename the caption and drop or replace that sample.

**Wrong audience and structure**
- The nav is fashion-first ("For fashion brands", `content/site.ts:21`). Amazon appears nowhere. `/services` opens with consulting buzzwords (`content/site.ts:139-185`) and "No hand-offs, no diluted execution" (`app/services/page.tsx:21`).
- Clothing-only package copy at `content/services.json:203,344,396`.
- The blog has off-topic posts that make the studio look like a course seller ("How to Sell AI Websites for $5000 in 2025", "Six Figures Selling Information Products", plus near-duplicate pairs). Unpublish them.
- The default OG image (`public/og/default.jpg`, used by home, `/fashion` and `/contact`) shows the Delhi PG-rental app with a +91 field. Make new OG images.
- SEO titles and descriptions don't mention Shopify, Amazon, product photos or audits (`app/layout.tsx:33`, `app/page.tsx:13`, `lib/seo.ts`).

**Missing**
- A page that matches the outreach (`/audit`).
- A visible US phone number.
- A booking path.
- Analytics. GA4, Pixel and Search Console are not set. Only add them if the owner provides IDs. If you add any tracking, add a consent banner and update `content/legal.ts:34` ("No advertising or tracking cookies...").
- A US privacy section (CCPA basics, and phone calls: AI assistant, call recording and transcripts if enabled).
- A rate limit on `/api/contact`.

## 5. What to build

### Phase 0: Understand and snapshot (no edits)
- Read `CLAUDE.md`, `PLAN.md`, `DESIGN.md`, `README.md`, `docs/`, `app/`, `components/`, `content/`, `lib/`.
- Start the dev server and screenshot the current live site and local build at **360, 390, 768, 1024, 1440** wide, for `/`, `/services`, `/pricing`, `/work`, `/contact`, `/fashion`, `/apps`, `/blog`. Playwright is fine (`npx playwright`); save them in `docs/screens/before/`.
- Write down every responsive bug you see: overflow, cut text, broken grids, tiny tap targets, video jank, nav problems.

### Phase 1: New structure
Proposed site map (keep the old URLs working through redirects):
- **Home** `/`: for US e-commerce brands on Shopify and Amazon.
  1. Hero: plain promise of what we make. Suggested direction: "Product photos, UGC ads and Shopify fixes for e-commerce brands", with sub-copy naming Shopify and Amazon. Primary CTA "Get a free site audit" goes to `/audit`; secondary "See work" or "See prices".
  2. Proof strip of real work samples (labelled honestly).
  3. Services: 4 to 6 cards.
  4. AngleForge before/after slider (white background to lifestyle).
  5. Free-audit section.
  6. How it works (3 steps).
  7. Pricing teaser.
  8. Meet Asutosh / team.
  9. FAQ.
  10. Contact block with email, the US phone (AI receptionist note) and the form.
- **Services** `/services`: one clear section per service, each with what you get, turnaround and a "from" price where `services.json` has one.
  - Product photos (AngleForge).
  - UGC & ad creatives (with the CBD/supplement note internally: never pitch Meta/TikTok ads to them).
  - Shopify stores & fixes.
  - Amazon listing images. Only if it maps to an existing package; otherwise list it as part of product photos.
  - Lead & customer follow-up automation.
  - Apps.
- **Free site audit** `/audit` (NEW, top priority, linked from the main nav). See Phase 2.
- **Work** `/work`, **Pricing** `/pricing`, **About** `/about` (Asutosh named), **Contact** `/contact`, **Blog** `/blog`.
- **Verticals:** `/fashion` stays as a landing page (it's linked from emails) but leaves the main nav. Group it in the footer or under Services as "For clothing brands". Add "Real estate" pointing to https://homes.centrolmatrix.com (external, opens normally).
- **Our products:** Siteory, AngleForge (add it as a product with a link), Recl, GiftFeels, WishCuts. Keep it as a section or `/apps`, framed as "tools we built and use", not the main pitch.
- **Nav:** Services · Work · Free audit · Pricing · About · Contact (CTA button: "Free site audit"). Mobile: a proper menu sheet with large tap targets.

### Phase 2: `/audit` landing page (the outreach match)
- **Personalisation:** reuse `lib/personalize.ts` and the `/fashion` pattern. Support `?brand=&first=&site=`, for example "Hi Kate, here's how the free audit works for katemaller.com". Unknown params fall back to generic copy.
- **Headline idea:** "Your free store audit, from Asutosh at Centrol Matrix". Optionally add a line for people who got a call: "Got a call from our AI assistant? This is where the report comes from."
- **What's checked,** in owner language, not jargon:
  - Links that show no picture when shared.
  - Page titles Google cuts off.
  - Search descriptions that get trimmed.
  - Product images Google can't read.
  - Missing or slow pages.

  Siteory runs the audit, and Asutosh reviews and emails the report. No scores in marketing copy.
- **Form:** first name, email, store URL (required), anything else (optional). Post it to `/api/contact` with a `type`/`source` of `audit`. Reuse `components/fashion/SampleForm.tsx` if it fits. After submit, show "Asutosh will email your report within 2 business days".
- **Also on the page:** what happens next (3 steps), a small AngleForge before/after as "while you're here", the FAQ ("Is it really free?", "Do you need access to my store?" (no, it's from public pages), "Who are you?"), and the contact options.
- `noindex` is not needed. Give it a proper title and description.

### Phase 3: Identity & trust
- **Phone:**
  - Display **+1 (218) 438-4731** as the main phone sitewide (header or contact, footer, structured data), with the note "Answered 24/7 by our AI assistant; Asutosh calls you back."
  - Change `content/agency.ts` so the phone isn't derived from WhatsApp. Add a separate `phone` / `NEXT_PUBLIC_PHONE`.
  - WhatsApp: keep it as a secondary link only (contact page and footer). **Ask the owner** whether to keep +63 or which number to use. Until answered, keep the existing env value but don't show it in the hero or as a primary CTA.
- **Email:** keep contact@centrolmatrix.com.
- **Booking:** if the owner gives a Cal.com or Calendly URL, set `NEXT_PUBLIC_CAL_URL`. Until then, make sure the UI doesn't show dead "Book a call" buttons.
- **Legal:**
  - Rewrite "Who we are" neutrally. Ask for the legal name and address.
  - Add a US privacy section: what the forms collect, Neon and Resend as processors, no sale of data, how to request deletion, and calls (AI assistant, possible recording and transcription, how to opt out of calls).
  - Make the cookie line true.

### Phase 4: Responsive everything
- **Every page must work at 360, 390, 414, 768, 1024, 1280 and 1440:**
  - no horizontal scroll;
  - no text clipped or overlapping;
  - grids collapse cleanly;
  - tap targets at least 44px;
  - form inputs at least 16px font (no iOS zoom);
  - sticky header doesn't cover anchors;
  - images and videos keep their aspect ratio;
  - mobile serves the 480p previews and lazy-loads video;
  - no autoplaying heavy video above the fold on mobile.
- Check the admin pages only for not being broken; they don't need polish.
- Re-take the screenshots into `docs/screens/after/` and compare.

### Phase 5: Content cleanup
- Unpublish the off-topic blog posts. Find out how posts are stored (DB vs `content/`) and use the admin or a script to set them to draft. Record the slugs.
- Fix every item in section 4.
- Rewrite the services and package copy for general e-commerce, removing the outcome promises. Add a "Lead follow-up automation" package only if `services.json` already has the pieces. Don't invent prices for new packages: show "Quote" or ask the owner.
- New OG images (1200x630) for home, `/audit`, `/services`, `/pricing`, `/fashion`, generated from real site visuals. Wire them in `lib/seo.ts`.
- Titles and descriptions: name Shopify, Amazon, product photos, UGC ads and the free store audit where true.

### Phase 6: Hardening
- Rate-limit `/api/contact`: a simple per-IP limit (Netlify Blobs or in-memory with a short window) plus a honeypot field.
- Make sure a form submission still saves when Resend isn't configured.
- Run `npm run build`, lint, and type-check.

## 6. Using Codex (allowed, recommended for parallel chunks)

The Codex CLI is installed (`codex`, v0.166). Use it for well-scoped, parallel work. Example: `codex exec "Make app/pricing and components/pricing/* fully responsive at 360-1440px; no copy changes; run npm run build"`.
- **Avoid conflicts:** give each Codex job its own git worktree (`git worktree add ../cm-wt-pricing v6-us-ecom`), or run jobs one after another.
- **Review every Codex diff before merging it** into `v6-us-ecom`.
- **Codex must not deploy,** and must not touch env vars or secrets.
- **You own the result:** re-run the build and the screenshots after merging.

## 7. Deploy

1. Find out how production deploys (section 3).
2. Deploy a **preview first**: `npx netlify-cli deploy --build` (draft URL), or a branch deploy. Screenshot the preview at 390 and 1440 for `/`, `/audit`, `/services`, `/pricing`, `/contact`, `/fashion`, `/for/demo`.
3. Smoke-test that every old URL still returns 200 or a 301 to the right place. Submit one test entry on `/audit`, clearly marked "TEST - ignore", and confirm it lands in `contacts`.
4. **Production:**
   - If Netlify is git-linked: merge `v6-us-ecom` into the production branch normally and push, then watch the deploy.
   - If it deploys manually: `npx netlify-cli deploy --build --prod`.
5. **Netlify env vars:** you may set `NEXT_PUBLIC_PHONE` (and the WhatsApp/CAL values once the owner answers) with `npx netlify-cli env:set`. Never print existing secret values.
6. **After deploy,** verify https://centrolmatrix.com and https://centrolmatrix.com/audit live at 390 and 1440. Keep the previous deploy id so it can be rolled back (`npx netlify-cli api restoreSiteDeploy` or the UI).

## 8. Ask the owner (in this terminal) and don't block on it

Ask once, up front, then continue with neutral wording until answered:
1. Legal operator name and a business/postal address for the site footer and terms.
2. WhatsApp: keep +63 951 568 0964 as a secondary contact, switch to another number (which?), or remove it?
3. A booking link (Cal.com or Calendly) for "Book a call with Asutosh", if any.
4. Analytics IDs (GA4, Meta Pixel, Search Console verification), if wanted.
5. A real photo of Asutosh (and the team) for About and `/audit`, if available.

## 9. Finish

- Write `docs/2026-11-13-us-ecom-relaunch-HANDOFF.md` covering:
  - what changed (by page), the redirects added and the blog posts unpublished;
  - before/after screenshots;
  - the deploy id and URL, and how to roll back;
  - open owner questions.
- Update `CLAUDE.md` with the new positioning (US e-commerce first, `/audit` as the outreach landing page, phone and AI receptionist, claim limits, homes. link).
- Final message in this terminal: a short summary, the live URLs, and anything that still needs the owner.
