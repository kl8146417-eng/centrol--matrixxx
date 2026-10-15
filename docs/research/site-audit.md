# Centrol Matrix preview: visual and conversion audit

**Target:** https://deploy-preview-1--centrol-matrix.netlify.app/ (Netlify deploy preview #1)
**Date:** 2026-10-15
**Method:** Claude-in-Chrome. Desktop was the real browser viewport (1536x776 CSS px; the maximized window refused `resize_window`, so the "1440" pass was done at 1536). Mobile was emulated with same-origin iframes 382px wide with scrollbars hidden, four viewports side by side, all at real CSS widths, so media queries fire. Page text and structure came from SSR HTML (curl plus a parser). Console, performance, image-pixel and video checks ran through `javascript_tool`. Nothing was submitted or paid. The checkout was viewed up to step 2 (brief) only.
**Severity:** **P0** breaks trust or looks broken to a first-time visitor. **P1** costs conversions or is clearly visible. **P2** polish.

---

## 0. Site-wide facts

| Item | Finding |
|---|---|
| Pages found | `/`, `/services`, `/work`, `/work/orva`, `/apps`, `/websites`, `/pricing`, `/about`, `/blog` (+7 posts), `/contact`, `/faq`, `/checkout`, `/delivery`, `/privacy`, `/terms`, `/refunds`, 404. All return 200 (404 returns a real 404). |
| Nav | Work · Websites · Services · Pricing · Apps · About · Blog · Contact · cart · **Start a project**. That is 8 text links plus cart plus CTA. "Work", "Websites" and "Apps" overlap heavily. |
| Console | No errors or warnings on home, measured after a fresh reload. |
| Stack | Next.js (`/_next/image`), Tailwind, SSR. JSON-LD present: Organization, WebSite, ContactPoint, ItemList, SiteNavigationElement. |
| Analytics / pixel | **None found** in any page HTML (no GA, GTM, Meta pixel, Plausible, Clarity or PostHog). Ads can't be measured or retargeted. **P1** |
| Booking link | **None** (no Calendly or cal.com). The FAQ promises "book a 15-minute call". **P1** |
| Canonical vs sitemap | Canonicals point to `https://centrolmatrix.com/...`, but `sitemap.xml` and `robots.txt` list `https://centrol-matrix.netlify.app`. **P1 (SEO)** |
| OG image | `og:image` = `https://centrolmatrix.com/og/default.jpg`, which returns **404** on the live domain. The preview's own `/og/default.jpg` returns 200. centrolmatrix.com currently serves an old cached build (Netlify edge Age ≈ 130 days). Share cards will break until this deploy goes live. **P1** |
| Contact identity | WhatsApp is **+63** (Philippines) on every page. The FAQ says "based in India", and Terms say "operated by **Spartan Rich** in India". Payments are Stripe/Razorpay, the Play developer is "JInx Studios" / "GiftFeels Studio", and the App Store developer is Asutosh Pattanayak. Too many identities. **P1 trust** |
| 3D assets | `/3d/rocket.webp` (in the CTA block on **every page**) and `/3d/setting.webp` (automation bento card) render with a **solid white rectangle background** on dark or blue panels. **P1** |
| Reveal animations | Sections fade in late. On fast scroll on mobile, whole viewports are blank or faded for about 1–2 s (seen on home, FAQ and process steps). **P2** |
| Footer | Repeats "Tell us what you're building." directly under the CTA that uses the same line. The "Work" column lists client sites plus "GiftFeels", "DUPGS" (named "Delhi PGs" elsewhere), but omits Siteory, WishCuts, Hanger Club and ORVA. **P2** |
| Mobile header | Logo collapses to the squiggle mark only (no "Centrol Matrix" wordmark) plus cart plus hamburger. There's no visible CTA until the menu opens. The menu itself is good: links, "Start a project", "WhatsApp us". **P2** |

### Performance (home, desktop, fresh reload, after warm cache for images)
- TTFB 618 ms · FCP 1.10 s · LCP 1.10 s (a text SPAN, the hero h1) · CLS 0.000 · DCL 832 ms · load 1.78 s.
  - A first cold load in a background tab measured FCP 7.6 s and load 7.1 s. Treat that as background-tab noise, but the video weight below is real.
- **Transferred on load: ~5.7 MB, of which 5.6 MB is video.** The two hero tiles autoplay full-size MP4s (`park-mic-ugc.mp4` 2.4 MB, `handbag-showcase.mp4` 3.2 MB) instead of the `-480` variants that exist for the posters. **P1** on Indian mobile data.
- JS: 19 files, about 221 KB compressed (720 KB decoded). CSS about 324 KB decoded. 3 font files.
- **62 `<video>` elements** on home: hero 2, showreel 50 (25 pieces duplicated for the marquee), ORVA 1, work-by-category 9 or so. Only 2 play at load (the hero). The rest are `preload="none"` with posters and hover-to-play. That's a sensible pattern, but the duplicated marquee doubles DOM and memory.
- The DOM has about 1,088 elements. Home height is **12,978 px on desktop and about 19,750 px on mobile**. That's very long.
- During screenshotting, Chrome's `Page.captureScreenshot` **timed out once (renderer unresponsive for 30 s)** mid-scroll on home. That points to heavy main-thread work or too many decoders. **P2, but watch**.
- Partner sites (curl total time): giftfeels.in to giftfeels.com 4.3 s (redirect), wwfngo.org 5.6 s, wishcuts 3.5 s, angleforge 3.6 s.

### Copy and voice (em-dash and AI-slop scan)
- Em-dashes in visible text: **pricing 17 (+7 en-dashes)**, home 5, about 4, services 2, websites 2, apps 1, orva 1, blog index 1, 404 title 1. The site voice is otherwise em-dash-free, so pricing reads like it was pasted from a different writer ("AI UGC Ad — 5-Pack", "creative testing — the minimum viable test set for Meta", "UGC video: We manage a roster of creators — hired, briefed, and paid —").
- AI-slop phrases are mostly absent, which is good. Tells that remain:
  - "We don't just pitch it. We ship it." (the not-just pattern)
  - "No hand-offs, no diluted execution" and "no agencies of agencies" (no-X-no-Y lists, repeated on 3 pages)
  - "software that never sleeps" (used twice)
  - "Quiet software running in the background"
  - "the feed never goes quiet" (twice)
- Contradictions:
  - Home: "Creator-style ads, **without the creators**" (AI UGC). Services "UGC video": "We manage a **roster of creators — hired, briefed, and paid**". **P1**
  - FAQ: "Turnaround is listed on every package". `/pricing` cards show **no turnaround**. Home cards and cart do show it. **P1**
  - About: "Three people. Every product on this site." But all three roles read **"Role to be added"**. **P0**

---

## 1. Home `/`

### Section inventory (desktop y-offsets)
1. **Hero** (0–1193). Eyebrow "CENTROL MATRIX · STUDIO" and "WEBSITES / APPS / ADS / AUTOMATION". The h1 is a numbered list in giant serif type: "We make 01 Websites → 02 Apps → 03 UGC ads → 04 Product shoots →". Sub: "A three-person studio. We built and run Siteory, Delhi PGs and GiftFeels, and we make the ads, shoots and sites for brands that want the same care." CTAs are "Start a project" and "Fixed-price packages". On the right is a bento: UGC ad video (0:10), Delhi PGs app screenshot, handbag "Product shoot" video, and a Siteory website screenshot.
2. **Showreel** (1193–1841). Dark band, "Showreel · 25 published pieces / Made in our pipeline." Auto-scrolling marquee of 25 posters, hover to play.
3. **What we do: "Eight disciplines. One brief."** (1841–3332). Bento of 8 cards:
   - Websites & storefronts (from $2,997)
   - Mobile apps (scoped on a call)
   - AI UGC ads (from $129)
   - Product ads & mockups (from $247)
   - Social posts & content (scoped)
   - Fashion & T-shirt shoots (from $247)
   - AI automation, SEO & lead gen (scoped)
   - Real estate video (from $197)
4. **Products: "We don't just pitch it. We ship it."** (3332–7818, **4,486 px tall**). Six large stacked cards: ORVA, Siteory, Delhi PGs, GiftFeels, WishCuts, Hanger Club. Then a "More sites we've shipped" grid of 8 thumbnails (Hotel, Dental, AngleForge, Soni Singh, Kangaroo House, **recl.app**, WWF NGO, CheaperAI).
5. **Team strip**: avatars "A V K", "Built by Asutosh, Vishal and Karan.", "Meet the team →".
6. An empty light-grey band (about 178 px) with no content. **P2**
7. **Work by category: "Creator-style ads, without the creators."** Tabs: AI UGC ads, Product ads, Fashion clothes, Jewellery video, Social content, Video replication, Beyond fashion · Real estate. A 4-video grid and "See all work".
8. **How we work: "From brief to live, without hand-offs."** 4 icon cards: Brief, Plan & design, Build & produce, Launch & iterate.
9. **Pricing: "Fixed prices. Order online."** 4 cards: AI UGC 5-Pack $497 (7-day), Lookbook AI 25 $497 ("Most popular"), Storefront Starter $2,997 (14-day), Growth Pod $2,997/mo (30-day).
10. **FAQ: "Good questions."** 4 accordions.
11. **CTA**: "Tell us what you're building. We'll take it from there." WhatsApp +63…, email, "Or order a package".
12. **Footer**: blurb, contact, Studio links, Work links, LinkedIn, a giant "Centrol Matrix" watermark, legal links.

### Issues
- **P0. WishCuts card: 2 of 3 phone screenshots look broken.** `wishcuts/poster-3.webp` is **pure black** (pixel mean 1/255, SD 0). `poster-2.webp` is a dark, mostly empty letterboxed video frame. This shows on home and on `/apps`, on desktop and mobile.
- **P0. Delhi PGs screenshots are store marketing graphics placed inside a phone mockup.** The result is a phone inside a phone, and the left side of the baked-in headline is cropped ("r Perfect / G Awaits in / elhi"). It's visible in the hero bento tile and in the Delhi PGs card. Use raw app screens, not Play Store feature graphics.
- **P1. Hero h1 is a list of nouns, not a promise.** At 1440x900 the four giant words fill the whole first screen, and both CTAs and the value line sit **below the fold**. A D2C founder can't tell in 5 seconds what outcome they get, who it's for, or what it costs. The h1 also reads to screen readers as "01Websites→02Apps→…".
- **P1. The hero UGC video tile has a black dead zone.** The video ends about two-thirds of the way down the tile, and the caption bar ("UGC AD 0:10") floats mid-tile above an empty black block. Seen on desktop and mobile.
- **P1. The hero's "Websites" proof is Siteory (a SaaS audit tool), not a storefront.** For a clothing brand, ORVA should be the website proof in the hero and in the "Websites & storefronts" bento card (which also uses the Siteory screenshot).
- **P1. "Eight disciplines" doesn't match `/services` (9 consulting + 6 craft items) or `/pricing` (11 categories).** Clipping, auto-carousels and social media handling, which the user wants sold, appear only as one-liners on `/services`. They have no card, no price and no example. Product photography is folded into "Product ads & mockups" and "Lookbook AI" under three different names.
- **P1. Real estate video sits in the core 8-card grid** and in the work tabs. For a fashion and D2C positioning, it dilutes focus. Move it to "Other verticals".
- **P1. Bento overlap bugs.**
  - Desktop "Social posts & content": the chat icon sits on the eyebrow text.
  - Mobile "Websites & storefronts": the Siteory screenshot sits under "FROM $2,997" and the heading, so the text is hard to read.
  - Mobile "Mobile apps": the phone image overlaps "SCOPED ON A CALL".
  - Mobile "AI automation": the 3D gear covers "SCOPED ON A CA…" and "SEO &".
  - "Real estate" card: the baked-in "557 KUPULAU DR. KIHEI" sign collides with "FROM $197".
  - "Social" card: the baked-in "PHYSICALLY LAUNCHED" text sits behind the body copy.
- **P1. Gear 3D image has a white background box** on the blue automation card.
- **P1. Trademark exposure in the showcase.** Posters and filenames feature **Patek Philippe** ("watch-patek", visible on the "Product ads & mockups" card), **Chanel** ("perfume-chanel") and **Nike** hoodies. AI ads with third-party luxury marks are risky to publish as portfolio, and a careful brand client will notice.
- **P1. GiftFeels card claims.**
  - "iOS + Android app" with a **Get it on Google Play** badge: on Play the app is **"Pre-register"** (not released).
  - The iOS listing has **no ratings yet**.
  - "Trusted by 40K+ users (as shown on app.giftfeels.com)" is a hedge that reads as unverified. The 40K figure really belongs to the **giftfeels.com web gift-link product** (42,696+ "joined" counter), not the couples app.
- **P1. GiftFeels chips are meaningless.** "A day together · Widgets · How it works · Screens · Journal" are app.giftfeels.com's **nav links** copied in as feature chips. Replace them with real features: sealed daily question, "ember" nudge, Memory Box, countdowns, widgets.
- **P1. The products section is 4,486 px** (about 6 desktop screens, about 7,000 px on mobile), placed before any client proof, process or pricing. Four of the six products (Siteory, Delhi PGs, GiftFeels, WishCuts) are unrelated to fashion and D2C. A clothing-brand visitor scrolls through PG listings and a couples app before seeing the fashion work.
- **P1. "More sites we've shipped" thumbnails crop the left edge of each hero** ("otel, car & / xperiences", "oni Singh : Hair", "ave what / atters. Recall / forever." for **recl.app**). The 8 items in a 5-column grid leave 2 empty slots. On mobile, domains collide across columns ("hoteldemosite.vishalchauhan.indental-…").
- **P1. Recl is buried.** recl.app is a polished, paid AI-learning SaaS ($9/mo, $60/yr, Chrome extension, Android closed beta, iOS in review). Here it appears only as a cropped 230 px thumbnail labelled "recl.app". It deserves a product card ahead of Delhi PGs if the goal is to show product craft.
- **P1. Team strip has no photos.** Initials in colored circles. On mobile (≤ 365 px CSS) the strip **overflows horizontally**, forcing one word per line ("Built by / Asutosh, / Vishal / and / Karan.") and causing page-level horizontal scroll on 360 px Android, the most common width in India.
- **P1. No social proof anywhere**: no client logos, testimonials, results (ROAS, CTR, CVR), case-study metrics, review stars or "brands we've worked with". The only numbers are the GiftFeels 40K hedge and, on `/apps`, a TrustMRR badge showing **$2,299 total revenue** (which undercuts more than it helps).
- **P2.** The pricing card "Most popular: Lookbook AI — Set of 25" makes a popularity claim with no evidence. `/pricing` marks **five** packages "Popular".
- **P2.** Showreel: 25 pieces are duplicated in the DOM for the marquee, which means 50 video elements. The section has about 110 px of dead black space under the strip, then a white gap. The labels mix model names ("Creator-style UGC (Seedance)") into client-facing titles.
- **P2.** "How we work" uses generic icon-in-square cards, which read as a template.
- **P2.** FAQ shows only 4 questions with large empty whitespace. CTA and footer duplicate the same headline.
- **P2.** The work-by-category tabs on mobile overflow off-screen to the right with no fade or affordance.

### Conversion observations
- There are two good primary paths ("Start a project" and "Fixed-price packages"), but the hero doesn't say *for whom*. Add one line such as "Ads, product imagery and Shopify storefronts for clothing and D2C brands. Fixed prices, 7-day delivery."
- Order of persuasion is: services → our own apps → team → work → process → price. For D2C buyers, a better order is: fashion work and results → packages → process → products as credibility.
- The WhatsApp number is +63 while the audience is Indian and global D2C. There's no floating WhatsApp button on mobile.

---

## 2. `/services`

**Sections**
- Dark hero "One studio, end to end." with about 300 px of empty space.
- 9 numbered consulting items (AI Automation Consulting, Workflow Optimization, SEO & Organic Growth, Content Systems, Digital Marketing Strategy, Lead Generation Pipelines, Brand Positioning, Content Repurposing, AI-Powered Operations).
- "And the hands-on craft." with 6 items (Website making, UGC video, Product & quick-commerce photography, Clipping, Social media handling, Auto-carousel marketing).
- "Ready to order?" bar.
- "The engine: Eleven agents. One system." (Hermes + OpenClaw orchestrator plus agent list).
- CTA and footer.

**Issues**
- **P1. Text-only page.** There's not a single image, video, price or link per service. This is the page that should *sell* UGC, product photography, clipping, carousels and social to a clothing brand, and it's the least visual page on the site.
- **P1. Order is wrong for the ICP.** Nine B2B consulting services (workflow optimization, lead-gen scraping, AI operations) come first. The D2C craft services come second, with one-line descriptions ("Catalog-ready product shots, fast.").
- **P1. The "Eleven agents" list shows 9 items numbered 01,02,03,04,06,07,08,09,11.** 05 and 10 are missing. It's internal jargon ("Hermes + OpenClaw", "WP JS: Personalized WordPress automation", "Pipes products into AngleForge"). It exposes the internal tool stack without explaining the client benefit, and "Google scraper" and "Calling Agent" can scare brand clients.
- **P1. The UGC-with-human-creators contradiction** (see section 0).
- **P2.** Em-dashes in the UGC line. "No hand-offs, no diluted execution" is repeated.

**Conversion:** Each craft service needs a card with 2–3 example thumbnails, a "from $X" price, turnaround, and a "See examples" / "Order" link. Clipping and carousels need sample outputs.

---

## 3. `/work`

**Sections**
- Dark hero "Content that earns its keep."
- Two cards: "ORVA, the hanging-rail store" and "Sites we've shipped, live" (thumbnail is giftfeels.com).
- Video sections with hover-to-play and duration chips:
  - AI UGC ads (6)
  - Product ads (6)
  - Fashion clothes (3)
  - Jewellery video (1)
  - Social content (2)
  - Video replication (3)
  - Real estate (4)
- CTA.

**Issues**
- **P1. Fashion gets only 3 videos and jewellery 1**, on a site positioned at clothing brands. The jewellery row is one tile with three empty columns.
- **P1. Mixed aspect ratios break the grid.** "Skincare UGC, talking head" is a landscape tile in a portrait row, leaving a hole.
- **P1. No outcomes.** No brand names, CTR/ROAS, "used in Meta ads for X", or before/after (product photo in, ad out). AI UGC buyers want to see the input photo next to the output video.
- **P2.** Hover-to-play works (verified). On touch it needs a tap. The 25 MP4s are `preload=none`, which is good.
- **P2.** The "Sites we've shipped" card thumbnail is giftfeels.com, which isn't a client site.

---

## 4. `/work/orva` (case study)

**Sections**
- Hero "ORVA: a storefront you can browse like a rail."
- Meta row: Client "ORVA, our in-house concept label", Scope, Timeline 14 days, Stack React + TypeScript.
- CTAs "Open the live demo ↗" and "Get a storefront like this · $2,997".
- Autoplay desktop video.
- Problem statement.
- 6 feature cards: rail, quick view, PDP, cart, AI photo pipeline, mobile first.
- 12-shot gallery (8 desktop, 4 mobile).
- CTA.

**Verdict:** The best page on the site. It's clear, visual, honest about being a concept, and has a priced CTA.

**Issues**
- **P1.** The demo isn't a real client and has no metrics. Add even proxy metrics (Lighthouse score, LCP, number of AI images produced, cost versus a studio shoot).
- **P1.** Pricing says storefronts are **Shopify by default**, but ORVA is **React + TypeScript**. The CTA "Get a storefront like this · $2,997" implies the Shopify Starter delivers this rail, which the scope list ("custom theme or premium theme customization… interactive hero / lookbook section") doesn't clearly promise.
- **P2.** In the gallery, "Editorial sections" sits alone in a 2-column row. The live demo (orva-centrol-matrix.netlify.app) has title "Store" in SSR, no meta description, and a "Powered by Netlify" badge.

---

## 5. `/apps`

**Sections**
- Dark hero "Products we built and run."
- The same 6 product cards as home, plus a TrustMRR "Verified revenue" badge on GiftFeels.
- "Live demos: Click through the real thing." (ORVA, Hanger Club, Hotel prototype, Dental website).
- CTA.

**Issues**
- **P0. Same WishCuts black and blank screenshots, and the same cropped Delhi PGs phone-in-phone screens** as on home.
- **P1. TrustMRR badge: "Total revenue $2,299"** next to "Trusted by 40K+ users". Small verified revenue placed beside a large unverified user claim invites doubt. Either drop it or reframe it ("bootstrapped, profitable from month X").
- **P1. Duplicate content.** The page is almost identical to the home products section, so there's no reason to visit both.
- **P1. Missing products.** Recl (live SaaS with pricing), giftfeels.com (web gifting, 42,696+ joined, $5–$35 premium paths), and AngleForge (product-photo tool, listed only as a "website").
- **P2.** The "Live demos" hotel and dental prototypes live on `vishalchauhan.in` subdomains, which looks like a personal portfolio rather than the studio.
- **P2. Rocket 3D image with a white box** in the CTA (seen clearly here).
- **P2.** Mobile cards have large empty areas, with tiny phone mockups pushed to the bottom of the Siteory and Delhi PGs cards.

---

## 6. `/websites`

**Sections**
- Hero "Sites we built you can open." ("Hit 'See now' to preview it live, right here.")
- 10 cards with screenshot, "See now", domain and a one-liner: Hotel prototype, Dental website, GiftFeels (giftfeels.in), DUPGS, AngleForge, Soni Singh Artistry, Kangaroo House, recl.app, Waste Pickers Welfare Foundation, CheaperAI.
- CTA.

**Issues**
- **P1. No fashion or D2C storefront** in the list. **ORVA, the best storefront proof, isn't on the Websites page.**
- **P1. GiftFeels** is linked as `giftfeels.in` (which redirects to giftfeels.com, 4.3 s) and described as "A gifting app we designed and shipped to iOS and Android". giftfeels.com is actually the web gift-link product, and the couples app is a different product. The description is inaccurate.
- **P1.** Two of the ten are "prototypes" or "demos" on a personal subdomain. There are no client logos and no "what we did / result" line per site.
- **P2.** recl.app's line "Save what matters, then actually recall it — summaries, search, and daily nudges" doesn't match Recl's real positioning ("AI learning app… summarizes, quizzes you, nudges you until you remember"). The page has 2 em-dashes.

---

## 7. `/pricing`

**Sections**
- Dark hero "Fixed prices, no surprises."
- An 11-chip category bar plus a currency switcher (USD/GBP/EUR/AUD/CAD/INR).
- Sections in this order:
  - AI Automation (4 cards, all "Scoped on a call")
  - Growth & Strategy (3, scoped)
  - Content Systems (2, scoped)
  - AI UGC Ads (Single $129, 5-Pack $497, UGC Factory $1,997/mo)
  - Lookbook AI (10 for $247, 25 for $497)
  - Ad Creatives (Creative Burst $697, Jewellery Video Pack $797, Ad Remake $297)
  - Real Estate (Visualisation $997, Reel Edit $197)
  - Websites & Storefronts (Starter $2,997, Pro $6,997)
  - Retainer (Growth Pod $2,997/mo)
  - Bundles (Launch $3,497, Creative Engine 90-day $5,497)
  - Add-ons (Domain $97, Shopify Setup $497, Conversion Copywriting $697, Rush from $297)
- Page is 10,512 px on desktop and **17,857 px on mobile**.

**Issues**
- **P0 (mobile). The sticky category bar wraps to 5 rows (about 230 px) and pins under the header**, covering about a third of the phone screen for the entire scroll.
- **P1. The first ~2,200 px are nine "Scoped on a call" consulting cards with no prices**, on a page whose headline is "Fixed prices". The first real price appears about 3 desktop screens down (y≈2955).
- **P1. No turnaround on any pricing card**, despite the FAQ promise. Home cards and the cart do show it ("3 day turnaround").
- **P1. No apps package**, though the section subtitle says "plus apps we design, ship and run". Clipping, social media management and carousels also have **no package**, so three services the brief wants sold can't be bought.
- **P1. No visual proof on cards.** Not one thumbnail or sample per package. Buyers are paying $129–$6,997 blind.
- **P1. Five "Popular" badges** (5-Pack, Lookbook 25, Storefront Starter, Growth Pod, Launch Bundle). When half the packages are "popular", the badge means nothing.
- **P2.** 17 em-dashes and 7 en-dashes. Copy tone shifts to sales-template ("scroll-stopping", "minimum viable test set", "creative fatigue never throttles spend").
- **P2.** The sticky chip bar hides section headings on desktop too ("Websites & Storefronts" is clipped). Add `scroll-margin-top`.
- **P2.** Rush pricing is "Flat $297 or 30%, whichever is higher", which means a $129 single costs $426 with rush.
- **P2. Cart drawer add-ons are irrelevant for most packages.** A UGC single is offered Domain Connection and Shopify Setup.

**Verified pricing math:** Launch Bundle saves $494 ✓. Creative Engine saves $1,191 ✓. Lookbook per-image math ✓.

---

## 8. `/checkout`

**Sections**
- 4-step stepper (Order → Brief → Details → Review & pay).
- Empty state "Your cart is empty. Browse packages".
- With a cart: line item with turnaround, add-on checkboxes, Summary card with "✓ Fixed price, no hidden fees / Revisions included / Full refund before production starts".
- Step 2 brief fields: Brand name*, Website, Instagram/TikTok, Product links, Deadline, Target audience, References, Anything else. I stopped there and submitted nothing.

**Issues**
- **P1.** No payment-method trust row (Stripe/Razorpay/UPI/cards logos) and no "secure checkout" signal.
- **P2.** The meta description and OG title are the generic old tagline ("Centrol Matrix — websites, content engines, AI automation"). The brief step didn't visibly expose product-photo upload, even though the FAQ says "upload your product photos". Verify step 3.

---

## 9. `/about`

**Sections**
- Hero "A small studio that ships."
- 3 paragraphs plus "How we work" / "What we ship".
- "Three people. Every product on this site." with cards for Asutosh, Vishal and Karan.
- CTA.

**Issues**
- **P0. All three team cards say "Role to be added"**, with initial avatars and no photos, links or bios. This is the single most damaging trust bug on the site.
- **P1.** No founder story, no location, no LinkedIn per person, no years of experience, no "brands we've worked with".
- **P2.** 4 em-dashes. The positioning ("a website, a content engine, and the automations that run behind them") differs from the home hero (websites, apps, UGC ads, product shoots).

---

## 10. `/blog` and posts

**Index:** "Notes from the studio." The sub says posts are "published by us and by the automations that run our content engine". 7 posts dated June 2026:
- Single Product Shopify Store: AI and Short Video Playbook
- How One Creator Made $20k From an AI-Generated Cartoon
- Build SaaS with Claude on $20 a Month
- How to Sell AI Websites for $5000 **in 2025**
- Six Figures Selling Information Products
- Build SaaS with Claude for $20 a Month: One Laptop Workflow (duplicate topic)
- Sell AI Websites for $5000: Realistic Path by 2028 (duplicate topic)

**Issues**
- **P1. Off-ICP and self-undermining.** "How to sell AI websites for $5,000" and "six figures selling info products" target would-be agency owners, not clothing brands. A D2C founder reading these concludes the studio is a side-hustle content mill.
- **P1. Posts are AI rewrites of social posts.** For example: "The source post claims a 20-year-old founder in Italy is making about $32,000 per day…". There are two near-duplicate pairs, "in 2025" in a 2026 post title, and the index openly says automations publish them.
- **P2.** No images on the index. Three posts have no excerpt or tags while the others do. Some posts are heavy on en-dashes (20 in the info-products post).
- Keep only the Shopify and short-video playbook post (on-ICP). Add D2C posts on AI UGC testing, lookbook versus studio shoot cost, and PDP conversion.

---

## 11. `/contact`

**Sections:** Hero "Start a project."; form (Your name, Email, Company optional, What do you want to build?, "Send it over"; plus a hidden honeypot `website`); side panel with Email and LinkedIn.

**Issues**
- **P1.** **WhatsApp, the main channel everywhere else, is missing from the contact page side panel.** There's also no booking link, budget or service selector, or response-time promise ("reply within 1 business day").
- **P2.** No confirmation of where form data goes. Fine for preview.

---

## 12. `/faq`

**Sections:** Ordering (2), Production (4), Payments (4), Studio (3), plus "Still unsure?" with email and WhatsApp.

**Good:** Honest answers on AI UGC ethics, product fidelity, ownership, "Is ORVA a real client?". This is the most trust-building copy on the site.

**Issues**
- **P1.** "Based in India", but the WhatsApp number is +63.
- **P1.** "Turnaround is listed on every package" is false on `/pricing`.
- **P1.** "Book a 15-minute call" has no booking link anywhere.
- **P2.** Some of these answers (AI disclosure, fidelity QC) should be surfaced on `/pricing` and home, not only here.

---

## 13. Legal: `/delivery`, `/refunds`, `/privacy`, `/terms`

- These are clean, short and sensible: digital-only delivery, full refund before production, pro-rata after, rush refund if late.
- **P1.** Terms name the operator as **"Spartan Rich in India"**, an entity name that appears nowhere else. There's no registered address or GST, which Razorpay and Stripe review typically expect on the site.
- **P2.** All four pages say "Last updated 9 October 2026".

## 14. 404

- "This page wandered off the rail." with Home / Work / Pricing / Contact buttons, on a dark gradient with a large "404". It looks good.
- **P2.** The `<title>` is the old tagline with an em-dash ("Centrol Matrix — websites, content engines, AI automation").

---

## Mobile summary (382 px emulation)
- Home is about **19,750 px tall**.
- The hero is good on mobile: the h1 fits, and both CTAs are visible in the first viewport.
- **Horizontal overflow at ≤ 365 px** from the team strip.
- **The pricing sticky chip bar covers about 30% of the screen.**
- **Bento cards overlap text with imagery** (Websites, Mobile apps, AI automation, Real estate).
- **Product cards have tall empty areas** with tiny phones at the bottom. The WishCuts black phones are prominent.
- "More sites" domains overlap. The mobile menu works well. There's no persistent CTA or WhatsApp FAB.

---

# Top 25 problems (ranked by conversion impact)

1. **P0. About page shows "Role to be added" ×3** with initials only. The team is the main trust asset of a 3-person studio.
2. **P0. Broken-looking app thumbnails.** WishCuts poster-3 is solid black and poster-2 is a dark blank frame. Both appear on home and `/apps`, desktop and mobile.
3. **P0. Delhi PGs "screens" are Play Store feature graphics inside a phone mockup.** The result is phone-in-phone with cropped headlines, in the hero and the product card.
4. **P0 (mobile). The `/pricing` sticky 5-row category bar** eats about a third of the viewport for the whole page.
5. **P1. The hero doesn't say who it's for or what outcome it delivers.** The giant 4-word list fills the desktop fold and pushes the CTAs below it.
6. **P1. Zero client social proof.** No logos, testimonials, results or review stars. The only numbers are a hedged "40K+ (as shown on…)" and "$2,299 total revenue".
7. **P1. Fashion and D2C work is thin and buried** (3 fashion videos, 1 jewellery). It comes after 4,500 px of PG, couples and SaaS product cards.
8. **P1. Services aren't sellable.** `/services` is text-only with no prices or examples. Clipping, carousels, social handling and apps have no package. "Eight disciplines" vs 15 services vs 11 pricing categories don't line up.
9. **P1. Pricing opens with 9 unpriced consulting cards** under a "Fixed prices" headline. D2C packages start about 3 screens down.
10. **P1. No turnaround on pricing cards**, contradicting the FAQ. "Popular" is used five times.
11. **P1. Identity inconsistency.** +63 WhatsApp, "based in India", "operated by Spartan Rich", and three different store developer names.
12. **P1. GiftFeels claims overreach.** The Android app is pre-register only, but shows a "Get it on Google Play" badge. iOS has no ratings. The 40K figure belongs to the web product. The chips are copied nav links.
13. **P1. UGC contradiction.** "without the creators" (AI) vs "a roster of creators — hired, briefed, and paid".
14. **P1. Off-ICP, AI-generated blog** ("sell AI websites for $5000", "six figures info products", duplicates, "in 2025").
15. **P1. 3D rocket and gear images have white rectangular backgrounds** on dark and blue panels. The rocket is on every page.
16. **P1. Hero loads 5.6 MB of full-size MP4** (2.4 MB + 3.2 MB) instead of the 480p variants.
17. **P1. No analytics or Meta pixel and no booking link.** Ad spend can't be measured, and the FAQ's "book a call" leads nowhere.
18. **P1. SEO and share plumbing.** Canonical is centrolmatrix.com, the sitemap is on netlify.app, and the OG image 404s on the live domain, which is serving a 130-day-old build.
19. **P1. Bento text and image overlaps** on desktop (Social card icon) and mobile (Websites, Apps, Automation, Real estate cards).
20. **P1. Trademarked luxury products (Patek, Chanel, Nike) in AI ad samples** used as portfolio. This is an IP risk and a credibility risk.
21. **P1. "More sites" thumbnails crop left-side text**, including the Recl thumbnail. The grid has empty slots, and domains overlap on mobile.
22. **P1. Recl, giftfeels.com (42.7K joined) and AngleForge are under-sold or missing as products.** Meanwhile the weakest product (Delhi PGs, 100+ downloads) gets a full card.
23. **P1. Contact page lacks WhatsApp, a booking link and a response-time promise.** No payment-trust row at checkout.
24. **P1. Mobile team strip overflows** at 360 px, causing horizontal page scroll. The mobile header has no wordmark or CTA.
25. **P2. Length and repetition.** Home is 13k px desktop and 19.8k px mobile. The `/apps` page duplicates home. "No hand-offs, no diluted execution" and "software that never sleeps" are repeated. Pricing is em-dash-heavy. Slow scroll-reveal leaves blank viewports. A renderer stall was observed.

# What's good: keep it
- **Visual identity:** Playfair-style display serif with italic blue accents, warm off-white and near-black palette, pill nav. It feels premium and distinct from template agencies.
- **ORVA case study** (`/work/orva`): honest "in-house concept label" framing, clear scope and timeline, 12-shot gallery, live demo, priced CTA. Use it as the template for every case study.
- **ORVA demo** itself: the hanging-rail interaction is a genuinely memorable, fashion-specific hook. Make it the hero.
- **Fixed-price packages with a real cart and checkout** (4-step, brief capture, refund promise). This is rare for agencies and a strong differentiator. The bundle maths is correct.
- **FAQ copy:** honest answers on AI-UGC ethics ("we don't invent testimonials"), product fidelity QC, ownership, and ORVA-is-not-a-client. It's the best trust copy on the site.
- **Showreel quality:** the AI UGC and product videos look realistic. Hover-to-play with posters and `preload=none` is the right pattern, and durations are labelled.
- **Package naming and scope details** (deliverables lists, revision rounds, "angle naming sheet for Ads Manager"). These read as practitioner-grade for Meta advertisers.
- **Clean tech:** no console errors, CLS 0, fast text LCP (~1.1 s warm), SSR HTML, JSON-LD, a proper 404 status and a good 404 page.
- **Mobile menu** with "Start a project" and "WhatsApp us" buttons.
- **Legal pages:** short, plain-English and complete enough for payment gateways (apart from the entity name and address).
- **Real shipped products** (Siteory, Recl, WishCuts, GiftFeels web, Hanger Club). Proof of building is a real asset; it just needs to be placed after the fashion proof, not before it.

---

# Extracted data: companion sites, apps and store listings

## Store URLs (every store link found)
| App | Store | URL | Status (15 Oct 2026) |
|---|---|---|---|
| Delhi PGs | Google Play | https://play.google.com/store/apps/details?id=com.delhipgs.app | Live. **100+ downloads**, no rating shown, "Rated for 3+", House & Home, updated Sep 6 2026. Developer listed as **"JInx Studios"** (contact Asutosh Pattanayak, Digapahandi, Odisha). Support support@dupgs.com |
| GiftFeels: Couples & Friends | Google Play | https://play.google.com/store/apps/details?id=com.giftfeels.app | **Pre-register only (not released).** Developer "GiftFeels Studio" (contact Vishal Chauhan, Mau, UP; vishaal.builds@gmail.com, +91 9005762006). Rated 12+, in-app purchases, Lifestyle, updated Sep 23 2026. No downloads or ratings |
| GiftFeels: Couples & Friends | App Store | https://apps.apple.com/us/app/giftfeels-couples-friends/id6803380723 | Live, iPhone only. Subtitle "Love Quizzes & Date Ideas". Free + IAP. 88.6 MB. Social Networking. Age 4+. Developer **Asutosh Pattanayak**. **"Hasn't received enough ratings"**. New: "Catch a Memory" widget |
| Recl | Play / App Store | No public store links. Per recl.app FAQ: Android in closed beta on Play, iOS in App Store review. Chrome extension exists | n/a |

Store links found on each site:
- giftfeels.com links: App Store (id6803380723), Play (com.giftfeels.app), app.giftfeels.com, store.giftfeels.com, wishcuts.com, centrolmatrix.com, instagram.com/giftfeels.com, facebook.com/giftfeels.com, WhatsApp wa.me/919214861772, Google Form.
- app.giftfeels.com links: the same App Store and Play links, instagram.com/giftfeels.in, giftfeels.com legal pages.
- dupgs.com links: Play (com.delhipgs.app), blog.dupgs.com, fills.dupgs.com, Instagram @dupgs.official, YouTube @dupgs, X @dupgs, LinkedIn /company/dupgs, Facebook /dupgs.

## giftfeels.com (web gift-link product)
- **Title:** "Digital Gifts & Surprise Gift Links — Make One in 5 Min | GiftFeels"
- **Hero:** "Personalized Digital Gifts & Surprise Links — ready in 5 min." Social proof counter **"42,696+ joined"** (rendered client-side). Points: "No app needed · free to start", "Premium 90-day expiry", "Private link", "Opens on any phone". CTAs "Create your gift" (Google sign-in) and "Open DEMO".
- **Templates:**
  - Seasonal Halloween set: Haunted House, Pumpkin Carving, Love Potion, Trick or Treat.
  - Core: Birthday Surprise, Wedding Invitation (countdown + RSVP), Love Letter (wax seal, anonymous), Memoryverse (photos + hidden notes).
  - Premium: blooming Rose, a **$5 personalized song**, AI photo styles ($5 unlock, free preview), "$35 Premium curated".
- **How it works:** pick a template → personalize → share a private link (WhatsApp/SMS/iMessage).
- **Nav:** Templates, Tools, Custom Gifts, Store (store.giftfeels.com), Pricing, Dashboard, Create Gift. Footer credits centrolmatrix.com.
- **Copy:** 31 em-dashes on the homepage. Strong seasonal merchandising. Floating WhatsApp button.

## app.giftfeels.com (couples app landing)
- **Title:** "GiftFeels — Couples App for Two | iOS & Android". Meta: "On Google Play and the App Store" (Play is actually pre-register).
- **Tagline:** "Made for two people. Nobody else gets in." Claim: **"Trusted by 40K+ users"**.
- **Features:**
  - Sealed daily question: hidden until both answer, "+10 ♥".
  - "Ember" flame tap to send a sign.
  - Anniversary countdowns.
  - Shared Memory Box.
  - Widgets.
  - "No feed, no streaks".
  - Plus tier for extra spaces (parent or best friend).
- **Nav:** A day together · Widgets · How it works · Screens · Journal · Get the app. These are the five "chips" the agency site copied.

## siteory.co
- **Title:** "Complete website audit for SEO, AI visibility, and security | Siteory".
- **Hero:** "Know exactly what's wrong before [Google] ranks you." Steps: Website URL → Complete audit → Developer-ready fixes. "Your first full audit is free · No credit card."
- **Pricing:**
  - **Free $0**: quick preview plus 1 full audit with a verified account (about 8 pages, depth 2).
  - **Single $9**: 1 full paid audit (about 25 pages, depth 3).
  - **Pro $49/mo**: 10 audits a month, about $4.90 each.
- **Product details:** Exports summary.md, prioritized-fixes.md, seo.md, aeo.md and security.md, and outputs prompts for Claude, Cursor, Codex or OpenCode. Honest scope section ("Not a penetration test").
- **Credit:** "Built by Vishal." (x.com/davishaal). No user counts or ratings shown.

## recl.app (redirects to www.recl.app)
- **Title:** "Recl — AI Learning App to Remember Everything You Save".
- **Hero:** "Remember everything you save." "Send Recl a link. It writes the summary, builds a quiz, and keeps asking until the idea is yours." CTAs "Start remembering" and "Read a real summary".
- **Features:** Ingests YouTube, podcasts, articles, PDFs, X posts, TikTok, Instagram, notes and selected text via the Chrome extension or the mobile share sheet. Spaced review (today → 3 days → a week → a month). "Ask Recl" chat over your saves. Public profile ("Show people who you are"). Public library at library.recl.app.
- **Pricing:** **No free plan**. **$9/month** or **$60/year** (about $5/mo), with all features on both.
- **Platforms:** Web live. Android closed beta. iOS in review. Chrome extension. Social: twitter.com/recl_app.
- **Design:** Dark, polished, 3D brain and box illustrations. Clearly one of the studio's strongest products.

## wishcuts.com
- **Title:** "Birthday Invitation Video Maker Online · WishCuts".
- **Hero:** "The video invitation for their [wedding / birthday…]". "Pick a design, tell us the names and the date, and a designer builds your video by hand — ready to share on WhatsApp."
- **Pricing:** Launch price "**Every design is $9, down from $20**. Express delivery is $10 more." Delivery in 12–24 hours.
- **Occasions nav:** Wedding, Engagement, Reception, Birthday, Anniversary, Sangeet, Mehendi, Haldi, House warming, Baby shower, Naming ceremony, and more. Free tools. Track order. Account.
- **Proof points:** "Made by a designer", "Preview before delivery", "WhatsApp-ready", "No watermark". No review counts shown.

## Play Store: Delhi PGs (com.delhipgs.app)
- Tagline: "Find verified PG accommodation near Delhi University & across Delhi."
- Features: discover PGs near college or work, real details (rent, room types, amenities, photos), save and compare favourites, filters (gender, budget, location, amenities), new-listing alerts, "Built for Delhi students".
- **100+ downloads**, no rating.
- dupgs.com title: "DUPGS — Verified PG in Delhi for Boys, Girls & Couples from ₹4,000". Strong local SEO pages (Laxmi Nagar, Mukherjee Nagar, and others).

## hanger-club-centrol-matrix.netlify.app
- Title "Hanger Club — My Wardrobe". Client-side SPA with no SSR text or meta description.
- Desktop shows a phone-frame app: "Hanger Club" header, Tops/Bottoms/Accessories tabs, a 3D rail with "Garden Club Crewneck", bottom nav (Closet, Outfits, Add, Saved, Profile). "Powered by Netlify" badge.

## orva-centrol-matrix.netlify.app
- SSR title "Store", description "Independent clothing label." (live title "ORVA — From Lisboa, with love.").
- Hanging rail of 8 garments, "FROM LISBOA, WITH LOVE. Hover to turn. Click to explore.", orange marquee ("Designed & produced in Portugal · Free shipping over €80"). "Powered by Netlify" badge.

## Other sites linked from the agency site (all 200 OK)
hoteldemosite.vishalchauhan.in, dental-demo.vishalchauhan.in, angleforge.studio, sonisinghartistry.com, kangaroohousing.in, wwfngo.org (5.6 s), cheaperai.tech, dupgs.com, linkedin.com/company/centrol-matrix, trustmrr.com/startup/giftfeels (badge: GiftFeels total revenue **$2,299**).
