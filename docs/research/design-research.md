# Centrol Matrix redesign research: apparel / D2C cold-email funnel
Researched 2026-10-15 with WebFetch and WebSearch only (no browser).

**Caveat:** Most gallery sites (supahero, cta.gallery, navbar.gallery, footer.design, saaspo (403), websitevice (empty), curations.supply (522), mobbin (login), icons.lndev.me ("Loading icons...")) render in JS. Fetching them returned only site names and category taxonomies. The patterns below combine those taxonomies, the example names that did come back, and the competitor pages fetched in full.

## Current site (deploy-preview-1) baseline
- Hero: "We make Websites / Apps / UGC ads / Product shoots". It's a generalist pitch for a three-person studio. Primary CTA is "Start a project".
- Sections: showreel (25 pieces), 8 services, built-by products (ORVA, Siteory, Delhi PGs, GiftFeels, WishCuts, Hanger Club), team, AI UGC work, process, pricing, FAQ, contact.
- Pricing: AI UGC 5-pack $497, Lookbook AI 25 images $497, Storefront Starter $2,997, Growth Pod $2,997/mo. **Inconsistency:** the services grid says "AI UGC from $129" but the pricing section shows $497.
- Contact: WhatsApp on a +63 (Philippines) number, which is a trust issue for Indian prospects. Consider an Indian +91 WhatsApp Business number. Email contact@centrolmatrix.com. No booking embed.
- Already in repo: motion ^14.2, React 18.3, Next 14.2, GSAP 3.12, Lenis, lucide-animated icons in components/icons/animated (they use `motion/react` and `useAnimation`).

## 1. Design references: steal-able patterns

| Source | What it is | Example names returned | Pattern to steal |
|---|---|---|---|
| supahero.io | Hero library (now part of screensdesign) | Anubi, Better Stack, Lando Norris, Zed, 35mm, Wope, Red Antler, Dribbble, Casa Lunara | Lando Norris / Red Antler style: full-bleed media hero with a huge display headline overlapping the media. For apparel, the media is a model photo or 9:16 video, not an abstract 3D object. |
| cta.gallery | CTA library. Categories: Button, Call-to-Buy, Download, Form, Modal, Newsletter, Pricing | Kronborg, Studioloop, Mojostudio, Native Security, cm.studio, elegantseagulls | Closing CTA as a full-width "final block": big statement, one primary button, one secondary contact (WhatsApp), and a reassurance line ("Free samples, no card, reply in 24h"). |
| navbar.gallery | Navbar library. Types: static, dropdown, mega, sidebar, announcement bar, full-screen | Supaste, Browserbase, Cloudflare, Asana, Big Dirty Agency, Hosier Brown | Announcement bar plus a floating pill nav. Use the bar for personalisation ("Made for {Brand}: your 3 free samples are below"). Keep the nav to 4 links and a single CTA. |
| footer.design | Footer library. Styles: Typographic, Large Type, Animated, Cards, Bold | Trove (Editor's Choice), Nothin', Decimals, Playfolly, Harvest Hall | Large-type footer: giant "CENTROL MATRIX" wordmark clipped at the bottom edge, a CTA row above it, minimal link columns. |
| styles.refero.design | 2,000+ "AI-readable design systems" with DESIGN.md exports | Categories: "Luxury e-commerce", "Quiet luxury", "Film grain & photos", "Earthy terracotta". Examples: Intercom (warm cream editorial), Brex (white concrete + one ember accent), Wise (moss + lime) | Art direction for fashion: warm off-white paper, one accent colour, an editorial serif paired with a grotesk, film-grain overlay. DESIGN.md files can be fed to Claude Code. |
| scrolltide.co | Scroll-driven templates, components and shaders (React/Next/GSAP/Lenis, the same stack as this site) | Components: Parallax Row, Scroll Index, Zoom Reveal, Image Tunnel, Step Path, Orbit Gallery, Photo Stack, Image Trail. Shaders: Tide Swirl, Halftone Tide | (a) Zoom Reveal: hero image scales from card to full-bleed on scroll. (b) Step Path / Scroll Index: pinned process section. (c) Photo Stack: before/after cards stacking. (d) Image Trail: cursor leaves a trail of lookbook photos in the hero (desktop only). |
| glass.samasante.com | "liquid-glass — refract the live DOM, in every browser" | n/a | Optional glass refraction on the nav pill. It's experimental, so prefer CSS `backdrop-filter: blur(16px) saturate(140%)` for speed. |
| 3dicons.co | 3D icon renders (1,400+), CC0, no attribution needed. Figma plugin available. | n/a | Use sparingly for 1–2 decorative accents (e.g. a camera or shopping bag in the services bento). Fashion audiences respond better to real product imagery than to 3D icons. |
| shaders.com | WebGPU effects library. `npm install shaders`, React components from `shaders/react` (Aurora, Plasma, LinearGradient, Glass, Blur, Glow). Core is free; Pro adds a preset editor and MCP. | n/a | A subtle animated grain or gradient behind the pricing or final CTA. WebGPU needs a static fallback, and it should be lazy-loaded below the fold. |
| onepromptdesign.com | AI image prompt library (posters, mockups, backdrops) | "Blue Grain Editorial", "Velvet Editorial" | Prompt ideas for backdrops and editorial textures. Also a good model for showing "prompt series with variants" in the portfolio. |
| 404s.design | 404 library | BOC Studio (glitch, custom cursor), Pensatori Irrazionali (game), Native Security (large type) | A large-type 404 that reads "This page went out of stock" with a CTA back to /fashion. |
| savee.com | Moodboard network | n/a | Use it to collect a fashion moodboard. No patterns could be extracted. |
| purelanding.page | Landing page gallery with an "Agency" filter | MATE the Label ("Dress Clean", clothing), Deserve Studio (ad agency), Grid OS | MATE the Label: clean apparel D2C, product-forward. |
| rebrand.gallery | Rebrand reveals | McLaren, Fulham FC, Replit, Sanity, TBWA | Case-study card format: wide hero image, a "2026 · by Studio" label, and a small logo thumbnail. Reuse it for client work cards. |
| component.gallery / 60fps.design | Component and motion references. 60fps has 2,100+ shots, tagged by effect (blur, morph, shimmer, stagger, spring, liquid glass) and pattern (card stack, carousel, shared element). | CRED (bills stack, swipe-to-pay), District (scroll-snap cards), Opal (border glow) | CRED-style card stack for pricing tiers on mobile. Opal-style animated border glow on the "Most popular" plan. District-style scroll-snap carousel for the mobile video wall. |
| uncut.wtf | Free commercial-use fonts (66 sans, 27 serif, 23 mono, 47 display). Check each font's licence. | Uncut Sans | Body or UI in Uncut Sans (or General Sans / Satoshi from Fontshare, which are free). Pair with an editorial serif or display face for headlines. |

### Top 10 patterns to adopt (specific)
1. **URL-personalised hero plus announcement bar.** `?brand=urbanmonkey&p=kurta-set` sets the headline to "Urban Monkey's next drop, shot on AI models in 48 hours". The bar reads "We made 3 free samples for Urban Monkey ↓". Fall back to generic copy when there's no parameter.
2. **Flat-lay to on-model before/after slider in the hero.** This follows Botika's "Send the flat lay. Get the model." Build it with clip-path and GSAP Draggable (or a range input), plus a 3-step chip row: Flat lay, On-model, UGC video.
3. **Floating pill nav.** Blur background, 4 links (Work, Pricing, Process, FAQ), primary CTA "Get free samples", WhatsApp icon button. The nav hides on scroll down and returns on scroll up.
4. **9:16 UGC video wall.** Phone-frame cards that play muted only while in the viewport (IntersectionObserver) or on hover, with a numbered "#01" label and a category tag (ethnic, streetwear, activewear). Format borrowed from the UGC Factory, Arcads and Insense grids. Use poster frames and `preload="none"` for speed.
5. **Category-tabbed lookbook gallery** (Kurtis/Ethnic, Streetwear/Tees, Activewear, Kids, Jewellery). Each tile flips or crossfades from the raw product to the AI output.
6. **Pinned "how it works" scroll section** (Scrolltide Step Path). Steps: send products → we style and generate → you review in 48h → delivery and revisions. Use GSAP ScrollTrigger pin with scrub; fall back to a static list on mobile and for reduced motion.
7. **Comparison table** (DansUGC and UGC Factory both use this): studio shoot vs UGC creators vs Centrol Matrix, compared on cost per look, turnaround, re-shoots and model diversity. Show INR and USD.
8. **Anchored pricing cards.** Three tiers with the middle one highlighted with a glow border (Opal). Each card carries an anchor line ("Studio shoot ≈ ₹30–50k/day") and a "start with free samples" escape hatch below the cards. Add an INR/USD toggle that defaults by geography (Netlify geo header or `Intl` timezone).
9. **Large-type CTA footer.** A Cal.com inline embed prefilled from URL params, a WhatsApp button with a prefilled message including the brand name, then the giant wordmark.
10. **Editorial fashion art direction instead of SaaS gradients.** Warm off-white or ink-black base, one accent colour, editorial serif display with grotesk body, a 3–4% film-grain overlay, real photography edge-to-edge, Lenis smooth scroll, and Zoom Reveal on the first gallery image. Animated icons go only on the services bento hover.

## 2. Animated icons comparison

| Library | Licence | Install | Deps / compatibility | Size / quality |
|---|---|---|---|---|
| **lucide-animated.com** (pqoqubbw/icons, 8.2k stars) | MIT, free commercial | shadcn registry: `npx shadcn@latest add "https://lucide-animated.com/r/<name>.json"`. Copy-paste also works. | `motion` (`motion/react`), auto-added by the CLI. React 18+ (per docs), so fine on Next 14. Already used in the repo. | 350–468 icons. Most polished and consistent; the Lucide stroke matches the existing icons. |
| heroicons-animated.com | MIT | `pnpm dlx shadcn@latest add @heroicons-animated/<name>` | Motion | 316 icons. Good quality, but the Heroicons 1.5 stroke looks different next to Lucide. |
| hugeicons-animated.com | MIT (free) | `npx shadcn add @hugeicons-animated/<name>` | motion + `@hugeicons/core-free-icons` | Only 85 icons. Adds an extra dependency. |
| animateicons.in | "Free and open source", **no licence named** | `npm install @animateicons/react` or `npx shadcn@latest add @animateicons/lu-x` | Not stated | 1,170 icons (669 Lucide + 501 Huge). Largest set, but confirm the licence before use. |
| itshover.com (itshover/itshover, 2.7k stars) | **Apache-2.0** (the README says MIT, which conflicts). Keep a NOTICE file. | `npx shadcn@latest add https://itshover.com/r/<name>.json` or copy-paste | `motion/react` | 186+ icons. Expressive hover animations. |
| 21st.dev/icons | Aggregator. Each set keeps its own licence. | Copy button | n/a | 17k icons, 1,867 of them animated. Good for discovery; check each set's licence. |
| icons.lndev.me | Couldn't load (JS only); no repo found | n/a | n/a | Unverified, so skip. |

**Recommendation:** Standardise on **lucide-animated**: MIT licence, shadcn registry, same `motion/react` API as the icons already in components/icons/animated, React 18 OK. Keep the existing pattern of copying icons into `components/icons/animated` and updating LICENSE-NOTE.txt. If an icon is missing, pull it from **itshover** and record the Apache-2.0 attribution. Don't mix in heroicons-animated or Hugeicons on the same page, because the stroke styles differ. Trigger animations on the parent card's hover or focus (the existing icons expose `startAnimation`/`stopAnimation` via ref in the pqoqubbw pattern), and skip them under `prefers-reduced-motion`. Keep icons to service cards and CTAs only; fashion buyers care about the imagery.

## 3. Competitors and benchmarks

| Company | Hero | Offer / pricing display | Proof | CTA | Before/after & samples |
|---|---|---|---|---|---|
| **Botika** (botika.com) | "AI fashion models", trusted by world-class fashion brands | Flat lay, hanger or ghost-mannequin shots → on-model; bulk upload; 150+ models; managed custom-model launch: "We create the first set together, then it's yours to scale." **No public pricing.** | Logos (Forever 21, Jordache, La Redoute, Perry Ellis); 500k+ images/month; 3,000 brands; Jordache −90% production cost; sample-to-live in 24h vs 6 weeks; Nil+Mon 4x conversion | Get Started, Book a Call | "Send the flat lay. Get the model." Jacket flat lay next to the same jacket on a model. First set made on your own products. |
| **FASHN** (fashn.ai) | "The AI agent for fashion e-commerce" | Product → model → 5s video; pricing on a separate page | Logos (About You, Pinterest, Shopify) | Get started, "No credit card required" | Hero shows a dress input then model outputs; coat + model reference → studio image → video |
| **Photoroom** | "Sell at first sight" | Create/Edit/Scale suite; fashion models, virtual try-on, ghost mannequin, recolour clothing. Plans: Start free / Contact sales. | 1M+ businesses; Decathlon "99% cost reduction per image"; Palm Angels; SOC 2 | Start creating, Contact sales | Feature spotlights; "models hold the real product" |
| **Pixelcut** | "The AI Video and Image Platform", 70M sellers | AI UGC ads, Personas (consistent character) | Logo wall (H&M, Nike, Gucci); 3 testimonials | Start creating for free | Before/after pairs per tool |
| **Arcads** | "Create winning ads with AI", 1,000+ AI actors | Time-limited promo with countdown; free trial; no prices | Ad performance cards ($16K revenue, +195%); thought-leader quotes | Create your AI ad, Book a demo | Muted video grid of actors; "Avatar holding your product"; 30+ languages |
| **DansUGC** | "Real human reactions, for ads that go viral" | **Fully transparent**: $11/clip; custom from $25/video ($250 min); subscriptions at $99/$299/$999 | 5B+ views, $0.20 CPM, case studies with before→after numbers; **"0% AI", "AI UGC sucks"** | Sign up free, Start a custom order | Hover-to-play grid; comparison table: agencies $150–500 and 2–4 weeks vs AI avatars $20–60 vs DansUGC $11 |
| **UGC Factory** (ugcfactory.io) | "Performance UGC agency for DTC brands" | Package: 24 ads/month, 3 creators, full licensing, 3-week delivery, strategist, raw files. **No price shown.** | 50,000+ ads, $100M+ sales; case studies (ROAS 2.36→3.40); video testimonials | Book a Strategy Call | Numbered portfolio grid #01–#22 "Tap to preview"; comparison vs marketplaces; disclaimer "Results may vary" |
| **Billo** | "Turn creator marketing into your most profitable growth channel" | Free sign-up, demo; no prices | 37,000+ brands; Billo vs non-Billo CTR +25%, CPA −11%, hook rate 30% vs 24% | Sign up free, Book a demo | Creator cards with ratings |
| **Insense** | "All-In-One Solution for UGC + Influencer Marketing" | Self-serve trial vs managed "Book a free strategy call" | 3,500+ DTC brands; Meta/TikTok partner badges; Bones Coffee 54 ads, 2.16 ROAS | Book a demo, Try it free | Phone and feed mockups, creator cards with engagement rate |
| Low-end / India | Koro (₹999/month, India blogs for kurti and ethnic wear), Fiverr AI model gigs (~$50), AutoRetouch (from €2/image), Shopify "AI Model Photoshoot" app ($19–99/month) | | | | LensGo: free sample shoot at sign-up |

### Takeaways
- Tools (Botika, FASHN, Photoroom) win on **visual proof**: a garment shown next to the model in the hero. Agencies (UGC Factory, Insense managed) win on **case-study metrics and booking a call**.
- **Price transparency is rare and differentiating.** Only DansUGC publishes prices. Small apparel brands, especially Indian ones, want a number, so show "from ₹" and "from $".
- **The free first set is the strongest offer.** Botika makes the first set on the brand's own products, and LensGo gives a free sample shoot. Make this the core of the cold email.
- **Objection to pre-empt:** "AI UGC sucks / looks fake" (DansUGC). Answer it with garment accuracy (colour, print, fit), real-looking phone-camera UGC (mirror try-on, street candid, GRWM, unboxing hands, per vantaige.io), and a "review before you pay" guarantee.
- **Gap in the market:** no one offers all-in-one, done-for-you services (images, UGC video, storefront, social, automation) for small and mid apparel brands with transparent INR and USD pricing and a personalised free sample. That's the positioning.
- Cost anchors to cite:
  - Human UGC: $60–200/video and $150–300/piece on average (vantaige; ppc.io).
  - Agency UGC: $150–500 and 2–4 weeks (DansUGC).
  - India studio shoot: ₹30–50k/day, or ₹2–5k/SKU (Koro, a vendor source).
  - AI tools: $0.10–0.60/image.

## 4. Conversion best practices (cold email to landing page)
- **Dedicated vertical page.** Route `/fashion`, alias `/for-apparel-brands`. No generalist services (apps, real estate). Hide the global nav, or reduce it to anchor links, to keep the attention ratio near 1:1. Unbounce's 2024 benchmark: median landing page conversion is 6.6%, and email-driven traffic converts highest at 19.3% average. Lower reading difficulty correlates with conversion. (unbounce.com conversion benchmark report; searchengineland summary)
- **URL personalisation.** Params `?brand=&first=&p=&cat=&ref=`. The headline, announcement bar, Cal prefill and WhatsApp prefill all read them. Sanitise the values: whitelist characters and cap length so a parameter can't inject arbitrary text. Generic fallback copy is required (rightmessage.com; OptiMonk; LeadSquared docs). Vendor claims put the lift up to ~20%.
- **Best version: per-prospect spec pages.** `/fashion/s/[slug]` (noindex) shows the 3 spec images or 1 spec ad generated from the prospect's own product, plus a 60–90s Loom. Store the data in the existing Neon/Netlify Blobs setup. This is the "Trojan horse" of cold email.
- **Loom.** Personalised video is reported at 10–16% reply rates vs ~3–4% for text. These are vendor and anecdotal numbers, and video only works when specific. Use a GIF thumbnail linking to the spec page, not a raw Loom link, which hurts deliverability. (prospeo.io/s/video-cold-email; syncgtm.com; firstsales.io)
- **Booking.** Cal.com inline embed via `@calcom/embed-react` (React 18/19 peer). Prefill with `config={{ name, email }}`. Use a 15-minute event (cal.com/help/embedding/prefill-booking-form-embed). Lazy-load it when it scrolls into view.
- **WhatsApp for India.** Link format `https://wa.me/91XXXXXXXXXX?text=` with a URL-encoded prefill, e.g. "Hi, I'm from {brand}, want my free samples". Show it as an equal-weight CTA for India geo and secondary elsewhere (u2l.ai; spurnow). Use an Indian WhatsApp Business number.
- **Social proof without fake stats.**
  - Real owned products: GiftFeels "40K+ users" with store links, Hanger Club, ORVA.
  - Real before/after pairs.
  - Founder faces and names.
  - "Made for" category chips instead of fake logos.
  - Specific process facts (48h turnaround, 2 revision rounds).
  - Add a UGC Factory-style "results vary" honesty line.
  - Never invent ROAS. Replace the numbers with client quotes as they come in.
- **Pricing anchoring.** Show the studio and creator costs next to yours, highlight the middle tier, and offer a low-risk entry: free samples, then a paid starter pack. Resolve the "$129 vs $497" inconsistency on the current site.
- **Risk reversal.** "Approve the samples before you pay", "Unlimited re-renders on fit and colour", and "Full commercial rights" (already in the current FAQ).
- **Speed.**
  - Hero media: AVIF/WebP via next/image with `priority`; videos as poster plus lazy MP4 (H.264 + WebM), ≤1.5MB each, no autoplay off-screen.
  - Load GSAP and Lenis only on the client after paint; ScrollTrigger only for sections in view.
  - Cal, shaders and the video wall load lazily.
  - Target LCP < 2.5s on 4G India (Moto G-class device).
- **Tracking.** UTM plus `ref` per campaign and email step; Plausible/PostHog event on CTA clicks; log ?brand= visits to the DB so a "visited" signal can trigger a follow-up.

## 5. Cold email playbook for apparel brands

**Infrastructure**
- 2–3 secondary domains (e.g. centrolmatrix.co, trycentrolmatrix.com), each redirecting to the main site.
- 2 inboxes per domain on Google Workspace plus some Microsoft 365.
- SPF, DKIM and DMARC (p=none to start), plus RFC 8058 one-click List-Unsubscribe headers.
- Warm up for 2–4 weeks; ramp 5–10/day up to 30–50/day.
- Steady state 20–40 cold emails per inbox per day; 16 inboxes ≈ 500/day.
- Bounce rate under 1–2%; spam complaints under 0.3% (Google/Yahoo threshold).
- Verify every list (MillionVerifier, ZeroBounce or Instantly's built-in).
- Plain text, open tracking off, at most one link and none in email 1 if possible; custom tracking domain.

Sources: instantly.ai/blog/how-to-achieve-90-cold-email-deliverability; leadhaste.com Google Workspace limits; hub.causo.ai H1 2026 report.

**Tools**
- **Instantly** or **Smartlead** for sending, warm-up, inbox rotation and unibox.
- **Apollo** for founder and marketing-head emails, with Hunter as backup.
- **Clay** (optional) for enrichment and AI first lines.
- **Store Leads** (13M stores; filter by platform = Shopify, category = Apparel, country, estimated revenue and installed apps).
- Apify actors: "Shopify Stores Running Meta Ads – Agency Lead Finder" (~$84 per 1,000 leads) and StoreInspect.
- **Meta Ad Library**: filter country = IN/US/UK, search "kurti", "co-ord set", "oversized tee", "streetwear", "activewear". Brands running ads already pay for creative, which makes them the best intent signal. Note their ad count and creative style for personalisation.
- **Instagram**: D2C brands with link-in-bio Shopify stores; check whether their product shots are flat-lay-only.
- Shopify detection: `/products.json` or `/meta.json`, `cdn.shopify.com` in the HTML, or the Wappalyzer/Koala Inspector extensions.
- India: also Myntra/Ajio/Flipkart sellers with their own D2C site, and Dukaan/Shiprocket stores.

**Qualify**
- Shopify or WooCommerce store.
- 20–500 SKUs.
- Flat-lay or mannequin-only imagery, or few videos.
- Active Meta ads but repetitive creative.
- Founder-led, roughly 2–50 employees.

**Offer**
- Lead with a free spec: 3 on-model images from one of their real products, or 1 AI UGC ad (9:16).
- Ask permission first ("want me to send them over?"), or link to their personalised spec page.
- Paid entry after that: starter pack (e.g. 25 looks or 5 ads).

**Benchmarks**
- Average reply rate is 3.43%; top 10% reach 10.7%.
- 58% of replies come from email 1.
- Use 4–7 steps, each under 80 words. (Instantly 2026 benchmark via lemlist and somethinginc)
- Generic emails get 1–3% replies; adding one specific detail lifts that to 5–9%. A spec made from their own product is about as specific as it gets.
- Research-first Shopify outreach reports 6–12% replies (moderninbound, a vendor source).

**Subject lines** (lowercase, 2–4 words, no spam words)
- "{brand} on-model shots"
- "made this for {brand}"
- "{product} ad idea"
- "quick q, {first}"
- "your {product} on a model"
- "3 looks for {brand}"

**Sample sequence (send Tue–Thu, local morning; IST for India)**

**Email 1 (day 0)**
> Subject: made this for {brand}
>
> Hi {first}, saw the {product} on your site, currently shot flat-lay. We ran it through our AI studio and put it on 3 models (studio, street, mirror-selfie UGC). Colour and print are true to the original. Want me to send them over? Free, no strings. {sender}, Centrol Matrix

**Email 2 (day 3)**
> Here they are: {spec page link /fashion/s/brand}, with a 60s walkthrough. Studio shoots in {city} run ~₹30–50k/day; this was 48h. Worth doing for the rest of the {collection}?

**Email 3 (day 7)**
> Noticed you're running {n} Meta ads, mostly static. We also cut 9:16 UGC-style videos from the same product photos: mirror try-on, GRWM, unboxing. Example: {link}. Want one for {product}?

**Email 4 (day 12, breakup)**
> Should I close the file on {brand}? If imagery isn't a priority this quarter, no worries. Reply "later" and I'll check back after your next drop.

**WhatsApp follow-up (India)**
Only after a reply, or if the number is listed publicly as business contact. Short message with the spec link.

**Compliance**
- Include the sender identity, a physical address and an opt-out line.
- India's DPDP Act 2023 is moving toward consent for marketing; the commencement of its marketing provisions is disputed or phased (target ~2027), so keep emails B2B-relevant and honour opt-outs immediately.
- UK/EU recipients need GDPR legitimate-interest care (not researched; get legal input).

Sources: rainmaker.co.in, echai.ventures, Hogan Lovells.

**Ops**
- Put the `?brand=` link only in email 2 so email 1 stays link-free.
- Log spec-page visits so visitors can be followed up within 24h, using the ref param per step.

## Ideal /fashion landing page (section list)
0. **Announcement bar.** Personalised ("{Brand}: your 3 free looks are ready ↓"); generic version: "Free sample shoot for apparel brands this month".
1. **Hero.**
   - Headline: "Your clothes on models. Your ads in 48 hours." Personalised variant: "{Brand}'s {product}, shot on AI models".
   - Subhead: AI on-model photos, UGC video ads and storefronts for clothing brands, with no studio, models or shipping samples.
   - Before/after slider (flat lay → model).
   - CTAs: "Get 3 free looks" and "WhatsApp us".
   - Micro-proof line: "Built by the team behind GiftFeels (40K+ users)".
2. **Your samples** (only with ?brand or the /s/ route). Spec images and Loom.
3. **Lookbook gallery.** Category tabs: Ethnic/Kurtis, Streetwear/Tees, Activewear, Western/Dresses, Kids, Accessories/Jewellery. Raw → output on each tile.
4. **UGC video wall.** 9:16 mirror try-on, GRWM, street candid and unboxing formats, with the hook text visible.
5. **What we make** (bento with animated icons):
   - AI model photography (PDP + lifestyle)
   - AI UGC ads
   - Short-form reels
   - Social posts and carousels
   - Shopify storefronts
   - Automation (catalogue → images pipeline, WhatsApp/DM replies, review requests)
6. **Comparison table.** Studio shoot vs UGC creators vs Centrol Matrix (₹/$, days, re-shoots, model diversity).
7. **How it works.** Pinned scroll section with 4 steps; "You don't ship anything, just send product photos".
8. **Proof.** Own brands (ORVA clothing storefront, Hanger Club, GiftFeels), founder faces, honest client quotes as they arrive; no invented metrics.
9. **Pricing.** INR/USD toggle.
   - Free sample (3 looks)
   - Lookbook 25 looks
   - UGC 5-pack (marked Popular)
   - Storefront
   - Growth Pod retainer
   - Anchor line plus "approve before you pay".
10. **FAQ / objections.**
    - Will it look AI?
    - Are colour, print and fit accurate?
    - Do I need to send garments?
    - Usage rights?
    - Meta/Instagram AI disclosure?
    - Turnaround?
    - Revisions?
    - Indian payment (UPI/GST invoice) vs international (Stripe/PayPal)?
11. **Final CTA.** Cal.com inline embed (prefilled), WhatsApp, email; "Reply within 24h (IST)".
12. **Large-type footer** with the wordmark and minimal links; the main site's /services stays separate.
