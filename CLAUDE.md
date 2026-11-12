# CLAUDE.md — Centrol Matrix website

Build instructions for any AI coding agent (Claude, Copilot, etc.) working in this repo.

## 0. Current direction (v6, Nov 2026): read this first

v6 (`docs/briefs/2026-11-13-site-rebuild-BRIEF.md`, handoff in `docs/2026-11-13-us-ecom-relaunch-HANDOFF.md`)
supersedes the home spec in §6 and the v5 fashion-first plan (`docs/REDESIGN_PLAN.md`). Visual tokens are
still `DESIGN.md` (v4: blue accent, Playfair + Inter).

**Positioning.** US e-commerce first. The pitch is product photos (with AngleForge), Amazon and Shopify
listing images, UGC-style video ads, Shopify store builds and fixes, and lead/customer follow-up, for brands
selling on Shopify and Amazon. Apps come second. Our own products (Siteory, AngleForge, Recl, GiftFeels,
WishCuts) are "tools we built and use", not the main pitch.

**Outreach landing page: `/audit`.** Cold email and the AI cold-caller send prospects here, with
`?first=&site=&brand=`. Siteory runs the checks; Asutosh reviews and emails the report within 2 business days.
Copy lives in `content/audit.ts`. Keep the "Got a call from our AI assistant?" line.

**People and contact.**
- **Asutosh is the public face and the contact.** Never list Karan, or anyone else, as the contact.
- The main phone is **+1 (218) 438-4731** (`agency.phone`, override with `NEXT_PUBLIC_PHONE`), answered 24/7 by an
  AI receptionist that books a callback with Asutosh. Wherever the number appears, show the note via `<PhoneLine />`:
  "Answered 24/7 by our AI assistant. Asutosh calls you back."
- WhatsApp is secondary: `/contact` and the footer only.
- No booking link yet: booking CTAs render only when `NEXT_PUBLIC_CAL_URL` is set.
- No analytics. If you add any, add a consent banner and update the privacy page.

**Claim limits (hard).**
- No revenue, conversion, sales, ROAS or ranking promises. No fake stats, testimonials or client logos.
- Siteory *reports*; it doesn't fix (fixing is our paid work). Never quote Siteory scores. Never say "penetration testing".
- Never pitch Facebook, Instagram or TikTok ads to CBD or ingestible-supplement brands.
- Label AI samples as samples.
- Payments are invoice / payment link only (Stripe and Razorpay are off).
- AngleForge claims must match angleforge.studio.

**Structure.**
- Nav: Services · Work · Pricing · About · Contact, plus the "Free site audit" CTA.
- `/fashion` stays live for email links but sits in the footer ("For clothing brands").
- "Real estate" links out to **https://homes.centrolmatrix.com** (built elsewhere; don't build it here).
- Content sources:
  - `content/offer.ts`: the five offers;
  - `content/services.json`: packages and prices. Retire packages with `hidden: true`, never delete;
  - `content/angleforge.ts`: before/after pairs;
  - `content/blog-unpublished.ts`: hidden posts, kept in sync with the redirects in `next.config.mjs`.

**Rules that stay.**
- Don't break inbound links (`/fashion`, `/for/*`, `/blog/*`, `/pricing`, `/contact`, `/work`, `/apps`): add 301s with
  `statusCode: 301` in `next.config.mjs` (`permanent: true` sends 308).
- Unpublish blog posts, never delete them.
- Production deploys from `main` (Netlify git-linked; PRs get deploy previews). Work on a branch, open a PR, merge normally.
- Every page must pass the responsive bar at 360 to 1440: no sideways scroll, 44px tap targets, 16px+ inputs, no autoplay
  video on phones (`AutoVideo` handles it).

Read this **before** writing code. It overrides framework defaults. Companion docs:
`PLAN.md` (the why), `VIDEO_ANALYSIS.md` (the hero reference), `.github/copilot-instructions.md`
(the anti-slop hard rules).

---

## 1. What we're building

A single studio site for **Centrol Matrix** — a boutique AI-automation + web/content studio.
The website is the portfolio piece, so its craft *is* the pitch.

**Positioning rule (hard):** present Centrol Matrix as a brand-new, self-contained studio.
**Never** say or imply on the site that it is a rebrand, merger, or continuation of any prior
brand. `dupgs.com`, `angleforge.com`, `giftfeels.in`, `recl.app`, and `delhipgs` are simply
**work / products we've shipped** — show them as portfolio, never as "old brands" or "what we
used to be". `northlark` is a private design reference only and must never be named on the site.

Two things matter most:
1. The site must look **hand-built and editorial — never AI-generated**.
2. It ships a **token-authenticated blog API** so any approved partner/automation can publish a
   post over HTTP.

---

## 2. The anti-slop contract (hard rules — do not break)

Every change to markup, CSS, or copy must pass all of these.

- **Fonts:** Playfair Display (display serif) + Inter (UI/body) via `next/font`. One display
  style, one italic accent, everything else 14–16px sans. **No** Poppins, no "Inter everywhere"
  as the headline font, no generic Google pairings, no third font.
- **Color:** white `#FFFFFF` / warm `#F4F4F2` canvas, near-black ink `#0E0E0E`, **one** blue accent
  `#1D4ED8` (`#7DA2FF` on dark). Near-black sections `#0B0B0C`. (v4 replaced the old hot pink; see
  `DESIGN.md`.) **No** purple→blue gradients, no
  teal SaaS gradient, no beige/brass "premium" cliché.
- **Motion:** justified only. Headline stagger, portal reveal, carousel crossfade, hover
  micro-interactions, Lenis smooth scroll. **No** universal fade-up-on-scroll, no float loops, no
  default ease everywhere. Always honor `prefers-reduced-motion` (collapse to instant fades).
- **Layout:** editorial, asymmetric, real whitespace. **No** "centered hero + 3 equal cards +
  CTA" template.
- **Copy:** confident, plain, lightly provocative (hero voice: *"You should be excited about your
  website. No, really."*). **No** em-dash tic, **no** "delve / elevate / seamless / unlock /
  in today's fast-paced world", no buzzword filler, no hallucinated facts/placeholder numbers.

Before any UI ships: run the anti-slop pass (`.agents/skills/anti-slop/SKILL.md` /
`.agents/skills/deslop/SKILL.md`) over the diff and visible copy.

When building any page/component, read the matching skill first
(see `.github/copilot-instructions.md` for the table — start with
`.agents/skills/frontend-design/SKILL.md`).

---

## 3. Design tokens

```ts
// tailwind.config.ts → theme.extend.colors
ink:        '#0E0E0E',
'ink-soft': '#1A1A1A',
muted:      '#6B6B6B',
accent:     '#1D4ED8',
'accent-dark': '#1740A6',
bg:         '#FFFFFF',
'ink-section': '#0B0B0C',
```

Type scale:
- `display-xl`: `clamp(56px, 7vw, 112px)`, Playfair 500, leading 1.05, tracking -0.01em
- `display-italic`: same size, Playfair **italic**, color `accent`
- `nav` / `body`: 15px Inter 500 / 16px Inter 400
- `brand-mark`: Playfair 700; `brand-wordmark`: Inter 500 uppercase, tracking 0.32em

Fonts exposed as CSS vars `--font-display`, `--font-sans` via `next/font`.

---

## 4. Tech stack (fixed)

- **Next.js 14 (App Router) + TypeScript**
- **Tailwind CSS** (+ minimal CSS modules for the circular clip)
- **GSAP** + ScrollTrigger, **Lenis** for smooth scroll
- Custom crossfade carousel hook (no Swiper/Embla)
- **Netlify DB (Postgres, powered by Neon)** via **Drizzle ORM** (`drizzle-orm/neon-http` +
  `@neondatabase/serverless`). Connection comes from `NETLIFY_DATABASE_URL` (auto-injected on
  Netlify after `netlify db init`); falls back to `DATABASE_URL` locally.
- **Zod** for validation, **remark/rehype** + sanitize for blog content, **Resend** for email
- **Hosting: Netlify** via `@netlify/plugin-nextjs`. Read all config from env; never hard-code keys.

Package manager: `pnpm` preferred (fall back to `npm` if unavailable).

---

## 5. Project structure (target)

```
app/
  layout.tsx                fonts, metadata, <LenisProvider>
  page.tsx                  home composition
  globals.css               reset, focus styles, smooth scroll
  about/page.tsx            studio story — Centrol Matrix as a new studio, no "rebrand" framing
  services/page.tsx
  work/page.tsx
  apps/page.tsx             products we've shipped (giftfeels, recl.app, delhipgs)
  contact/page.tsx
  blog/page.tsx             index (reads DB)
  blog/[slug]/page.tsx      single post (sanitized HTML)
  feed.xml/route.ts         RSS
  sitemap.ts  robots.ts
  api/
    blog/route.ts           POST(create, token) | GET(list)
    blog/[id]/route.ts      GET | PUT | DELETE (token)
    contact/route.ts        POST
components/
  Nav.tsx  Footer.tsx  Hero.tsx
  PortfolioPortal.tsx       circular auto-rotating portal (+ usePortfolioRotation)
  PauseButton.tsx
  BrandMarquee.tsx          looping logo strip (dupgs/angleforge/giftfeels/recl/delhipgs)
  ServicesGrid.tsx          near-black numbered grid (human copy)
  AgentSystem.tsx           the 11 automation agents as a connected system
  CTASection.tsx
hooks/
  useLenis.ts  usePortfolioRotation.ts
lib/
  db/schema.ts  db/index.ts (drizzle)
  auth/token.ts             hash + verify API tokens
  blog/markdown.ts          md → sanitized html, reading time
  validation.ts             zod schemas
content/                    seed copy (human-written), placeholder asset manifest
public/                     logo.svg, favicons, placeholder media
drizzle/                    migrations
```

---

## 6. Home page spec (the signature piece)

Reference: `VIDEO_ANALYSIS.md` (SA Solutions clone). Adapt the *device* and *voice*, not the
client's exact words.

1. **Sticky nav** — `CM` monogram + `CENTROL MATRIX` wordmark; links About / Work / Services /
   Apps / Blog / Contact; pink pill CTA "Start a project". Nav hover: opacity 0.6, 180ms.
   Focus-visible: 2px solid `accent`, offset 4px.
2. **Editorial hero** — 2-line Playfair headline + 1 pink italic accent line, written fresh for
   Centrol Matrix (do not reuse the client's literal sentence). Load animation: stagger the
   lines (700ms, `power4.out`, y +16→0, opacity 0→1, 0.12s stagger; italic adds scale 0.96→1).
3. **Circular portfolio portal** — `clip-path: circle()` / `border-radius:50%; overflow:hidden`,
   `width: clamp(420px, 55vw, 700px)`, `aspect-ratio: 1/1`. Auto-crossfades a stack of project
   mockups every ~1.5s (600ms crossfade + 1.04→1 scale Ken-Burns). Pause/play button (48px,
   white 10% bg, 1px white 30% border, two white bars). Subtle ±6px mouse parallax on inner
   stack. Reveal: scale 0→1, opacity 0→1, 1200ms `expo.out`, starting ~0.7s after load.
   **Use placeholder media now** (client supplies real photos/videos later).
4. **Work marquee** — looping logo strip of products/work we've shipped (dupgs, angleforge,
   giftfeels, recl.app, delhipgs). Frame as portfolio only — never as "former brands".
5. **Services preview** — near-black numbered grid (matches `services offer ref ... .png`),
   3-across desktop, with **human-written** descriptions; links to `/services`.
6. **Automation engine** — the 11 agents as a connected diagram/list, not 11 equal cards.
7. **Selected work** — 3–4 featured projects, asymmetric layout.
8. **CTA band** → contact.
9. **Footer** — email `contact@centrolmatrix.com`, LinkedIn `company/centrol-matrix`, brand list,
   legal, GA.

---

## 7. Content sources (use these, write human copy)

- **Services (image):** AI Automation Consulting, Workflow Optimization, SEO & Organic Growth,
  Content Systems, Digital Marketing Strategy, Lead Generation Pipelines, Brand Positioning,
  Content Repurposing, AI-Powered Operations. *(The reference image says: do NOT use AI-generated
  descriptions — write them like a human or leave them for client approval.)*
- **Studio services (notes):** website making · UGC video (we manage models, pay & hire, like
  dansugc.com) · quick-commerce/product photography · clipping · social media handling ·
  auto-carousel marketing (tens of carousels to tens of channels).
- **11 agents:** Lead Generation (Google Scraper); SEO + Blog Post on WordPress via n8n; Calling
  Agent; Product Listing → angle.forge; (reserved); YouTube Shorts Copy Automation; Instagram
  Carousel + YT Shorts from Images; Website Making; WP JS (personalized WordPress automation);
  Hermes + OpenClaw; Post to all socials via Hermes.
- **Apps shipped:** giftfeels, recl.app, delhipgs (dupgs.in) — 2 published to iOS + Android.
- **Contact:** form + `contact@centrolmatrix.com` + LinkedIn `company/centrol-matrix`.

Reference aesthetics: `northlark.netlify.app/services` (services layout) and `dansugc.com` (UGC).

---

## 8. Blog API (token-authenticated) — implement exactly

The "SEO + Blog Post" agent (and any approved partner) publishes via HTTP.

### Tables (Drizzle)
- `posts(id uuid pk, slug unique, title, excerpt, content_markdown, content_html,
  cover_image_url, tags text[], author, status['draft'|'published'], reading_time int,
  published_at, created_at, updated_at, created_by_token fk, deleted_at)`
- `api_tokens(id uuid pk, label, token_hash unique, scopes text[], revoked bool,
  expires_at, created_at, last_used_at)`

### Auth
- Caller sends `Authorization: Bearer <token>`.
- Hash presented token (SHA-256), look up in `api_tokens`; reject if missing, `revoked`, expired,
  or lacking the required scope (`blog:write` for writes).
- Provide a one-off script `scripts/issue-token.ts` to mint a token: print the **plaintext once**,
  store only the hash. Per-token rate limit (~60/min).

### Endpoints
```
POST   /api/blog        create   (blog:write)
GET    /api/blog        list published (public, paginated)
GET    /api/blog/:slug  fetch one (public)   ← note: read by slug
PUT    /api/blog/:id    update   (blog:write)
DELETE /api/blog/:id    soft-delete (blog:write)
```

### POST body (Zod-validated)
```jsonc
{
  "title": "string (required)",
  "slug": "string (optional; derived + uniquified from title)",
  "excerpt": "string (optional)",
  "contentMarkdown": "string",      // one of contentMarkdown | contentHtml required
  "contentHtml": "string",
  "coverImageUrl": "url (optional)",
  "tags": ["string"],
  "author": "string (default: 'Centrol Matrix')",
  "status": "draft | published (default: published)",
  "publishedAt": "ISO datetime (optional)"
}
```

### Processing
1. Validate with Zod; 400 on bad input with field errors.
2. Derive + uniquify slug if absent.
3. `contentMarkdown` → render via remark/rehype → **sanitize** (`rehype-sanitize`).
   `contentHtml` → sanitize before storing. Never store unsanitized HTML.
4. Compute `reading_time` (words / 200).
5. Insert; return `201` with the post + canonical URL `…/blog/<slug>`.
6. Errors: `401` no/bad token, `403` wrong scope, `409` slug conflict it can't resolve,
   `422` validation, `429` rate limit.

### Rendering
- `/blog`: `status='published' AND deleted_at IS NULL`, newest first, paginated, editorial cards.
- `/blog/[slug]`: render sanitized HTML; Playfair headings, Inter body, `accent` links; per-post
  metadata + OG + JSON-LD `Article`.
- `/feed.xml`: RSS of published posts.

### Smoke test
```bash
curl -X POST $BASE/api/blog \
  -H "Authorization: Bearer $CM_BLOG_TOKEN" -H "Content-Type: application/json" \
  -d '{"title":"Hello","contentMarkdown":"## Hi\n\nFirst post.","status":"published"}'
# → 201, then GET $BASE/blog/hello renders it
```

---

## 9. SEO / AEO / GEO

- `sitemap.ts` + `robots.ts` (App Router). Include blog slugs dynamically.
- Per-page `metadata`: title, description, canonical, OG, Twitter.
- JSON-LD: `Organization` sitewide, `Article` per post, `BreadcrumbList`.
- GA4 / Search Console / tags injected from **env** (`NEXT_PUBLIC_GA_ID`, verification meta) —
  never hard-coded. **IDs are TBD from the client; gate behind env presence.**
- Semantic landmarks, alt text on every image, fast LCP (priority on first portal image).

---

## 10. Environment variables

```
NETLIFY_DATABASE_URL=postgres://...    # auto-injected on Netlify after `netlify db init`
DATABASE_URL=postgres://...            # local-dev fallback (any Postgres/Neon URL)
CM_TOKEN_PEPPER=...                    # extra secret mixed into token hashing
RESEND_API_KEY=...                     # contact form email (optional until contact built)
CONTACT_TO_EMAIL=contact@centrolmatrix.com
NEXT_PUBLIC_SITE_URL=https://centrolmatrix.com
NEXT_PUBLIC_GA_ID=                     # client provides (none yet; needs a consent banner if added)
NEXT_PUBLIC_PHONE=12184384731          # main phone (AI receptionist); this is the code default
NEXT_PUBLIC_WHATSAPP=                  # secondary contact; code default is the +63 number
NEXT_PUBLIC_CAL_URL=                   # booking link; booking buttons hidden while empty
```
`.env` already contains an OpenRouter key used only by `analyze_video.py` — **never expose it
client-side and never commit secrets**. Add `.env*` to `.gitignore`.

---

## 11. Accessibility & performance

- Skip-to-content link as first focusable element.
- Semantic `<header> <nav> <main> <footer>`; real `<button>`s with `aria-label` (pause/play).
- Focus-visible: 2px solid `accent`, 4px offset.
- `next/image` for portal/work media with explicit dims; `priority` on the first.
- Targets: Lighthouse perf ≥ 95, a11y 100, SEO 100.
- All motion gated behind `prefers-reduced-motion`.

---

## 12. Definition of done (per change)

1. Read the relevant `SKILL.md` first.
2. Build the change; no TypeScript/lint errors.
3. Run the anti-slop pass over copy + diff.
4. Verify the five hard rules: fonts, color, motion, layout, copy.
5. For blog API changes: run the smoke test (create → render → list).
6. Keep secrets out of the client bundle and out of git.

---

## 13. Known open items (client to supply)

- Final logo/favicon (LinkedIn mark is a placeholder), GA4 + Search Console IDs, real
  photos/videos, **Netlify DB** provisioned via `netlify db init`, approved services copy and
  hero tagline. (Hosting is Netlify.) Track these in `PLAN.md §9`. Use tasteful placeholders until
  provided.
```

