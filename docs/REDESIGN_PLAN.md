# Centrol Matrix: v5 redesign plan (fashion-first, full agency)

Date: 2026-10-15 · Branch base: `merge-agency` (`a822ab2`) · Preview: https://deploy-preview-1--centrol-matrix.netlify.app/

**Goal.** We cold-email clothing sellers and D2C apparel brands. The site has to turn that click
into a reply, a WhatsApp chat, a booked call or a paid order. It should still sell the whole studio:
shoots, UGC ads, short-form/clipping, social and carousels, websites and storefronts, apps, and
automation. Our own products (Recl, Siteory, GiftFeels, WishCuts, Delhi PGs, Hanger Club, ORVA) are
proof of craft.

**Research behind this plan** (all in `docs/research/`):
- `site-audit.md`: browser audit of all 17 pages plus partner sites, with the top 25 problems.
- `design-research.md`: design galleries, animated icons, competitor teardown, cold-email playbook.
- `PLAYBOOK.md` and `PROMPTS_APPENDIX.md`: 65 X posts, about 2,400 tweets and about 520 Reddit items.
  Covers anti-slop AI image/UGC prompting, the video pipeline, apparel ad angles and outreach.
- `skills-installed.md`: the 68 design, motion and CRO skills now in `~/.claude/skills`.

---

## 0. What the research says, in seven lines

1. **Who we're talking to.** The page never says who it's for. A clothing founder lands on four
   giant words (Websites / Apps / UGC ads / Product shoots), then about 4,500px of PG, couples and
   SaaS cards before any fashion work.
2. **Trust breaks in small ways.** "Role to be added" ×3, two blank WishCuts posters, phone-in-phone
   Delhi PGs screens, a +63 WhatsApp number on an "India-based" studio, "operated by Spartan Rich",
   and a Google Play badge on a pre-register-only app.
3. **Nothing is measured.** No pixel, no GA, no booking link. The canonical tag points to
   centrolmatrix.com, which still serves a 130-day-old build.
4. **The strongest assets are under-used:**
   - the ORVA rail demo, which is genuinely fashion-specific
   - the honest FAQ
   - fixed-price packages with a real cart and checkout
   - realistic showreel quality
5. **What wins in this market:** "send the flat lay, get the model". The most effective offer seen
   is a free first set made on the brand's own product. No competitor offers small Indian apparel
   brands one done-for-you package with clear ₹ prices.
6. **The "looks like AI" objection is real.** Shoppers react badly to obvious AI. The fix:
   - Keep the hero/listing image a real photo.
   - Use AI for scenes, models, volume and hook-testing.
   - Lock the garment's details.
   - Say it plainly in the copy and FAQ.
   - India requires AI labels from 20 Feb 2026, so this goes in contracts too.
7. **Trademark risk.** Patek, Chanel and Nike items in sample ads are an IP and credibility risk.
   Replace them.

---

## 1. Decisions

| # | Decision | Default |
|---|---|---|
| D1 | Positioning | **Decided: generalist home** (full studio, sharper who/outcome copy, fashion work promoted) + **`/fashion`** as the cold-email landing page + `/for/[brand]` personalised sample pages. |
| D2 | Accent | Keep **blue `#1D4ED8`** (v4, already in code; it also matches the new Recl brain logo). Update `CLAUDE.md`, `PLAN.md` and `copilot-instructions.md`, which still say pink or "SA Solutions". |
| D3 | Currency | **Decided: keep USD base** with the existing currency switch. Fix the Razorpay INR amount bug. |
| D4 | Proof policy | Only real, checkable claims. No invented logos, testimonials or numbers. AI samples are labelled "AI-generated sample, made by us". |
| D5 | Image generation | **Decided: Codex** (GPT Image via ChatGPT login) for samples and lookbook pairs. |
| D6 | Fonts | Playfair Display + Inter stay. No third font. |

**Inputs needed from the team:**
- Real +91 WhatsApp number
- Team roles and real photos (Asutosh, Vishal, Karan)
- Cal.com (or Calendly) link
- Legal entity name and address for Terms
- Whether we can show any client work or brand names

---

## 2. Information architecture (target)

```
/                     D2C-first home (section list in §3)
/fashion              cold-email landing page for apparel brands (§4), noindex=false, own OG
/for/[slug]           personalised sample page per prospect (noindex): their 3 looks + 1 ad + Loom
/services             hub with 6 buckets → /services/[bucket] detail pages (SEO, examples, price, turnaround)
/work                 filterable wall: Fashion · Jewellery · Beauty · Product · Social/clipping · Web
/work/orva            keep; becomes the template for every case study
/apps                 "Products we build and run": Recl, Siteory, GiftFeels, WishCuts, Delhi PGs, Hanger Club
/websites             merge into /work?type=web (redirect)
/pricing              reordered: D2C packages first, INR/USD, turnaround on every card, consulting last
/about                real team, photos, roles, how we work, where we are
/contact              form + WhatsApp + Cal.com embed + reply-time promise
/blog                 re-scoped to D2C creative/ads topics; unpublish off-ICP posts
/faq /terms /privacy /refunds /delivery   keep; fix entity name and AI-disclosure clause
```

Service taxonomy: one source of truth in `content/services.json`. Delete the duplicate
`site.ts` `services` and `studioServices`.
1. **Shoots and lookbooks.** On-model from flat lay, ghost mannequin, lifestyle scenes, marketplace
   (Myntra/Ajio/Meesho/Amazon) image sets.
2. **UGC and ad creative.** AI UGC, real-creator UGC (pick one honest framing, §5), statics,
   ad remakes, hook-testing packs.
3. **Short-form and clipping.** Reels/Shorts editing, podcast and long-form clipping, captions.
4. **Social and carousels.** Monthly handling, auto-carousel engine, posting to every channel.
5. **Websites and storefronts.** Shopify setup, custom storefronts (ORVA), landing pages, Siteory
   audit.
6. **Apps and automation.** Mobile and web apps (our products as proof), the agents: lead gen,
   SEO blog, calling, listings.

---

## 3. Home page, section by section

> D1 chose a generalist home. The fashion-only sections (slider, lookbook tabs, comparison) live on `/fashion`; home gets the sharper hero, the unified 6-bucket services, a fashion-forward work wall and a compact products grid.

Build with the `taste-skill`, `impeccable`, `emil-design-eng` and `cro` skills. Verify each section
at 1440, 390 and 360px.

1. **Nav: floating pill.**
   - Blurred, hides on scroll down and returns on scroll up.
   - Links: Work, Services, Pricing, Apps, About.
   - CTA: **"Get 3 free looks"**, plus a WhatsApp icon button.
   - On mobile: wordmark and CTA always visible (currently missing).
2. **Hero.**
   - Who it's for and the outcome. Draft: *"Your new drop, shot, cut and selling by Friday."*
     Sub: *"On-model photos from your flat lays, UGC ads that look like your customers made them,
     and the storefront to send them to. For clothing and D2C brands."*
   - CTAs: "Get 3 free looks" (store URL + Instagram, two fields) and "See the work".
   - Visual: a **before/after drag slider** (flat lay → on-model) beside a 9:16 UGC clip.
   - Mobile shows it stacked. Load the 480p videos only, with poster as LCP.
   - Proof row underneath: "We also build and run Recl · Siteory · GiftFeels · WishCuts" as icons
     linking to `/apps`.
3. **"Flat lay → on-model → ad".** A 3-step horizontal strip on one real garment (ORVA pieces),
   with labelled chips. This is the core demo of what we sell.
4. **Work wall.**
   - 9:16 phone-frame cards numbered #01…, with tabs: Ethnic · Streetwear · Activewear ·
     Jewellery · Beauty · Product.
   - Muted, play when on screen or on hover, `preload="none"`.
   - Replace trademarked-product samples with unbranded or our own.
5. **Services bento (6 buckets).** Each tile has a real example, "from ₹/$", turnaround and a
   lucide-animated icon (hover or once in view). Fix the text/image overlaps.
6. **Storefronts: the ORVA rail.** Embed the interactive hanging-rail (or a scrubbed video with a
   "Try it" link). Hanger Club sits beside it. This is our fashion-web proof.
7. **Comparison table.** Studio shoot vs creator UGC vs Centrol Matrix, compared on cost (₹/$),
   days, re-shoots and variations. Use the r/StartUpIndia pain line as a header: *"Stock sits 2–6
   weeks waiting for a ₹50k–₹3L shoot."*
8. **How it works: pinned, 4 steps.**
   - Send links → we make 3 free looks → approve → full set + ads in 48–72h.
   - GSAP ScrollTrigger pin on desktop, a plain list on mobile and under reduced motion.
   - Optional hand-drawn canvas line animation per step (`hand-drawn-canvas-animation` skill),
     drawn once, small, lazy.
9. **Products we built and run.** A compact grid, not six full-screen cards. Honest stats only:
   - giftfeels.com "42,696+ joined"
   - Recl paid plans and live on Android
   - Siteory pricing
   - Store badges only where the listing is live. GiftFeels Android is pre-register, so the badge
     says "Pre-register".
10. **Pricing teaser.** Three tiers (Pilot / Catalog / Catalog + Ads) with anchor line and INR/USD
    toggle. The free-sample tier sits first.
11. **Team.** Real photos and roles, plus one founder line. Fix the 360px overflow.
12. **FAQ objections:**
    - Does it look like AI?
    - Colour and fabric accuracy?
    - Usage rights?
    - AI labelling (India 2026, Meta)?
    - UPI/GST invoice?
    - What do I need to send?
13. **Final CTA.** Cal.com inline embed + WhatsApp (pre-filled with brand) + email. Big-type
    footer (footer.design pattern) with work, products and legal.

Cut from home: the duplicated 25-clip marquee (62 `<video>` elements), the stand-alone Process
section (now §8) and long product cards. Targets: desktop ≈ 8–9k px (from 13k), mobile ≈ 12k px
(from 19.8k).

---

## 4. Cold-email conversion path

- **`/fashion`.** Same system as home, but only apparel. Order:
  1. personalised banner
  2. hero slider
  3. "your samples" block (when a slug is present)
  4. lookbook tabs
  5. UGC wall
  6. comparison
  7. how it works
  8. proof
  9. pricing
  10. FAQ
  11. Cal.com
- **URL personalisation.** `?brand=&first=&p=` gives the headline "{Brand}'s {product}, on-model in
  48h". Values are sanitised (length cap, text only) with a generic fallback.
- **`/for/[slug]`.**
  - Data in `content/prospects/<slug>.json`, or Netlify Blobs written from `/admin`:
    brand, first name, 3–6 sample images, 1 video, optional Loom URL, expiry date.
  - Watermarked, `noindex`.
  - CTAs: "Do the full catalogue" (→ checkout with the package preselected) and "WhatsApp us".
- **Tracking:**
  - GA4 + Meta Pixel (env-gated) with events: `cta_click`, `sample_request`, `whatsapp_click`,
    `book_call`, `add_to_cart`, `checkout_start`, `purchase`.
  - UTM/ref saved onto contact and order rows.
  - Instantly link `?ref=` maps to the prospect.
- **Speed for email traffic.** `/fashion` and `/for/*` LCP < 1.8s on 4G. No autoplay above the fold
  except one 480p clip.

The outreach machine runs outside the site (`docs/research/design-research.md` §5 and
`PLAYBOOK.md` §5):
- **Sending setup.**
  - 2–3 secondary domains, SPF/DKIM/DMARC, 2–4 weeks of warmup, 20–40 emails per inbox per day.
  - Plain text, no tracking pixel, no link in email 1.
- **Finding brands.**
  - Apify Meta Ad Library scraper ("kurti", "co-ord set", "oversized tee", India).
  - Shopify detection.
  - IG labels that only have flat lays.
- **Sequence.**
  1. Day 0: permission ask ("made 3 looks for {brand}, want them?").
  2. Day 3: `/for/{slug}` link + GIF thumbnail of the Loom.
  3. Day 7: Meta-ads angle with a UGC sample.
  4. Day 12: breakup.
- **Sample production SOP.** Lock the real product photo, generate scene/model only, check garment
  details against the source (stripe count, collar, label), make 5 and keep the best, label as AI.

---

## 5. Copy and trust fixes (site-wide)

- Pick one UGC story. **Recommended:** "AI UGC for volume and hook tests; real creators for hero
  ads when you want them." That resolves the "without creators" vs "roster of creators" clash.
- Remove the em-dash tic (24 in TSX), "no hand-offs, no diluted execution", "software that never
  sleeps".
- Run the `copy-editing` and `anti-slop` passes on every page.
- "Eleven agents" currently shows 9 with gaps. Renumber and retitle to the real count.
- GiftFeels:
  - The app and giftfeels.com are two products; present them separately.
  - The 40K/42.7K figure belongs to the web product only.
  - Drop the nav-link "features".
- Recl claims: Android on Play (`app.recl.mobile`; the audit saw closed beta, so confirm), iOS
  "coming soon". Delhi PGs: 100+ downloads; keep it, but smaller.
- `site.ts` description and default title: align to the new positioning.
- Remove `services/mainthing.txt` ("rebranding to centrol galaxy") from anything public, and drop
  any rebrand framing.
- Blog:
  - Unpublish or rewrite the off-ICP AI posts ("sell AI websites for $5000", "six figures info
    products", duplicates, "in 2025").
  - Seed 4–6 D2C posts built from the playbook (e.g. "How we turn a flat lay into an on-model set
    without changing the fabric").

---

## 6. Visual assets

| Asset | Fix | Source / method |
|---|---|---|
| Recl thumbnail (`public/work/recl.png`, old teal "Private beta") | Replace. Add Recl to `products.ts` with icon, phone screens and desktop shot | `H:\recl\apps\mobile\store-assets\play-feature-graphic-1024x500.png`, `play-icon-512.png`, `screenshots-ios-v1\iphone-6_7_0{1..6}*.png`, `H:\recl\apps\landing\public\product\screens\graph.webp` (avoid `library` because it shows real people's YouTube thumbs) |
| WishCuts posters 2 and 3 (blank) | Re-export real posters | wishcuts.com designs |
| Delhi PGs screens (phone-in-phone) | Use real app screenshots, or show feature graphics flat (no phone frame) | Play listing |
| Website thumbs (left text cropped) | Recapture at 1440×900 → webp, `object-position: left top` | Playwright script |
| 3D rocket and gear (white box) | Re-export with alpha or swap for 3dicons.co (CC0) PNGs | 3dicons.co |
| Trademarked ad samples (Patek, Chanel, Nike) | Remove or regenerate with unbranded products | AI pipeline |
| Lookbook before/after pairs (×8–12) | New. Flat lay → on-model, per category | ORVA garments + GPT Image / Nano Banana with `PLAYBOOK.md` §1.2 templates |
| Team photos | New, real | team |
| OG images | One per key page (home, /fashion, /pricing, /apps) | `next/og` route |

Icons: stay with **lucide-animated** (MIT, shadcn registry, same `motion/react` setup we already
use). Fill gaps from **itshover** (keep the license note). Don't mix heroicons-animated. Icons
animate on host hover/focus and once in view, and are off under reduced motion.

Motion budget (Emil/Jakub rules):
- Replace the global `[data-reveal]` fade-up-everything with section-specific entrances.
- Keep Lenis.
- One pinned section.
- Before/after slider with spring physics.
- Optional: one small shader accent (shaders.com / Unicorn Studio) on the dark CTA band, lazy and
  disabled on low-end devices.

---

## 7. Performance, SEO and plumbing

- **Video.**
  - Transcode all 27 MP4s (87 MB) with `ffmpeg`: H.264 CRF 28, `+faststart`, 720p and 480p, no
    audio track where silent. Target ≤1.5 MB per clip; total under 30 MB.
  - Hero uses 480p.
  - Delete unused `.jpg` posters (about 1.3 MB), `logo.jpg` (4.2 MB) and other dead assets (list in
    `site-audit.md` / `codebase` notes).
- **Images.** PNG screenshots → WebP/AVIF, plus `next/image` with sizes.
- **Domain.**
  - Promote this branch to production on centrolmatrix.com.
  - Set `NEXT_PUBLIC_SITE_URL` so canonical, sitemap and OG agree.
  - Add an OG image route.
- **Analytics.** GA4 (`G-…` from env), Meta Pixel + CAPI-lite via the order webhook, Search Console
  verification.
- **Commerce bug.** Razorpay amount uses `total_usd*100` even when `RAZORPAY_CURRENCY=INR`. Convert
  with the ₹ price table.
- **`.env.example`.** Add the missing Stripe/Razorpay/notify/ORVA/Wardrobe vars and remove the real
  GA ID from the example.
- **Dead code to delete:**
  - `Hero.tsx`, `PortfolioPortal.tsx`, `PauseButton.tsx`, `usePortfolioRotation.ts`,
    `placeholders.ts`, `.hero-section` CSS
  - `BrandMarquee.tsx`, `SelectedWork.tsx`, `LiveSiteEmbed.tsx`
  - `homeEmbeds`/`homeFeatured`, the stray `drizzle/0000_create_planets.sql`
- **Merge** the two video modal players (`Showreel` and `VideoGallery`).
- **Mobile.**
  - Pricing filter: collapse to a single horizontal scroll row, not sticky.
  - Fix horizontal overflow at 360px.
- **Targets.** Lighthouse mobile perf ≥ 90, a11y 100, SEO 100. CLS stays 0.

---

## 8. Execution order

| Phase | Scope | How |
|---|---|---|
| **P0: Hygiene** (½ day) | +91 number, team roles, blank posters, phone-in-phone, 3D alpha, pricing mobile bar, GiftFeels/Recl claims, trademark samples hidden, em-dashes, doc colour contradictions | me, direct edits |
| **P1: Foundation** (1 day) | single service taxonomy + ₹ price table, analytics/events, canonical/OG, video transcode, dead-code purge | me + Codex (`codex exec` for the ffmpeg batch and asset conversion) |
| **P2: Home v5** (2 days) | §3 sections, new nav/footer, slider, work wall, pinned steps | me (taste-skill / impeccable), reviewed with Chrome screenshots at 3 widths |
| **P3: Cold-email path** (1–1.5 days) | `/fashion`, `/for/[slug]`, URL personalisation, admin upload for samples, Cal.com, WhatsApp prefill | parallel subagent in a worktree |
| **P4: Assets** (parallel with P2–P3) | Recl/WishCuts/DUPGS/website thumbs, lookbook pairs, OG images, team photos | Codex image generation + Playwright recaptures |
| **P5: Pages** (1 day) | /services hub + 6 detail pages, /pricing reorder, /apps rework, /about, /contact, /work filters, blog cleanup | 2 subagents in worktrees |
| **P6: QA** (½ day) | `landing-page-conversion-audit`, `web-quality-audit`, `accessibility`, `review-animations`, anti-slop copy pass, `next build`, Netlify deploy preview, browser check of every page at 1440/390/360 | me |

Each phase ends with `npm run build` and lint clean, a Netlify deploy preview and a screenshot
review. Commits go on `merge-agency` (or `v5/*` branches merged into it). Nothing is pushed to
`main` or production without your OK.
