# Centrol Matrix — Website Plan

> **Centrol Matrix** is a boutique AI-automation + web/content studio. The site itself is the
> proof: it must look hand-built and editorial, **never AI-generated**.
>
> **Positioning rule:** Present Centrol Matrix as a brand-new, self-contained studio. **Do not**
> say or imply anywhere on the site that it is a rebrand or merger of prior brands. `dupgs.com`,
> `angleforge.com`, and `giftfeels.in` (and the apps below) are simply **work / products we've
> shipped** — never described as "old brands" or "what we used to be". `northlark` is a private
> design reference only and is never named on the site.

---

## 0. North star

One sentence: *Centrol Matrix builds the websites, content engines, and AI automations that
do the boring work so a business can grow.*

The site has to do three jobs, in order:

1. **Prove taste** — the homepage convinces a skeptical founder we can make them look good.
2. **Explain the machine** — services + the 11 automation agents, shown as a working system.
3. **Capture intent** — contact form, email, LinkedIn, and a self-serve "scope my project".

Plus one infrastructure feature: a **token-authenticated blog API** so any approved partner /
automation (e.g. the n8n "SEO + Blog Post" agent) can publish a post by POSTing JSON with a
bearer token.

---

## 1. Brand & art direction (the anti-slop contract)

These are non-negotiable and override any framework default.

| Token | Value | Role |
|---|---|---|
| `--bg` | `#FFFFFF` | page canvas |
| `--ink` | `#0E0E0E` | primary text, brand mark |
| `--ink-soft` | `#1A1A1A` | secondary text |
| `--muted` | `#6B6B6B` | meta / labels |
| `--accent` | `#E63A8E` | the one hot-pink accent |
| `--accent-dark` | `#C92E78` | accent hover |
| `--rule` | `#000000 @ 1px` | hairline rules |
| `--ink-section` | `#0B0B0C` | optional near-black section (services grid, like ref image) |

**Type:** Playfair Display (display serif, 400 / 500 / 500i / 700) + Inter (UI/body, 400/500/600).
Loaded via `next/font` and exposed as `--font-display` / `--font-sans`. One display style + one
italic accent. Everything else 14–16px sans. No third font.

**Motion:** purposeful only. Headline stagger on load, the circular portal reveal, carousel
crossfade, hover micro-interactions. Lenis smooth scroll. `prefers-reduced-motion` kills all of
it down to instant fades. **No** universal fade-up-on-scroll, no float loops, no default ease.

**Layout:** editorial, asymmetric, real whitespace. No "centered hero + 3 equal cards + CTA"
template. The services section may use the near-black numbered grid (matching the supplied
reference image) but with **human-written** descriptions — no AI filler.

**Copy rules:** no em-dash tic, no "delve / elevate / seamless / unlock / fast-paced world".
Confident, plain, a little provocative (the SA Solutions hero voice: *"You should be excited
about your website. No, really."*). Every visible string gets an anti-slop pass.

---

## 2. Tech stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 14 (App Router) + TypeScript** | SEO, RSC, API routes for the blog endpoint |
| Styling | **Tailwind CSS** + a few CSS modules (the portal clip) | tokens above live in `tailwind.config.ts` |
| Animation | **GSAP** (+ ScrollTrigger) | headline stagger, portal reveal, scroll reveals |
| Smooth scroll | **Lenis** | the "buttery" feel from the refs |
| Carousel/gallery | custom crossfade hook (no Swiper signature) | matches portal + work gallery |
| Blog storage | **Supabase (Postgres)** via **Drizzle ORM** | typed schema, easy migrations, Supabase connection string |
| Blog auth | bearer token (hashed) in `Authorization` header | so automations can publish |
| Content render | **MDX / sanitized HTML** | posts arrive as Markdown or HTML, rendered safely |
| Forms | API route → email (Resend) + DB row | contact + "scope my project" |
| Analytics | GA4 + Search Console (IDs TBD by client) | injected via env, not hard-coded |
| Hosting | **Vercel** | Next.js-native; Vercel features are fine to use |

> Hosting is **Vercel** and the DB is **Supabase**. Connect to Supabase Postgres over its pooled
> connection string (use the connection-pooling URL for serverless functions). Vercel-native
> features (Edge config, ISR, `@vercel/og`, etc.) are allowed.

---

## 3. Information architecture

```
/                 Home (the showcase hero + studio pitch)
/services         The full capability list (numbered editorial grid + the 11 agents)
/work             Portfolio gallery (placeholder media now, real later)
/about            Studio story (Centrol Matrix as a new studio — no "rebrand" framing)
/apps             Products we've shipped: giftfeels, recl.app, delhipgs (dupgs.in)
/blog             Blog index (reads from Postgres)
/blog/[slug]      Single post
/contact          Form + email + LinkedIn
/api/blog         POST (token) create, GET list  ← the automated-blog feature
/api/blog/[id]    GET / PUT / DELETE (token)
/api/contact      POST form submissions
sitemap.xml, robots.txt, /feed.xml (RSS)
```

### Home sections (top → bottom)
1. **Sticky nav** — "CM" monogram + "CENTROL MATRIX" wordmark; links: About, Work, Services,
   Apps, Blog, Contact; pink pill CTA "Start a project".
2. **Editorial hero** — big serif headline + one pink italic accent line, in the SA Solutions
   voice but written fresh for Centrol Matrix.
3. **Circular portfolio portal** — the signature device: a clip-circle auto-rotating through
   project mockups (placeholder image/video stack now; real later), with a pause/play control.
4. **Work / product marquee** — dupgs, angleforge, giftfeels, recl.app, delhipgs shown as a
   looping logo strip of **work we've shipped** (the "coursel loop / gallery" the brief asks
   for). Frame as portfolio, never as "former brands".
5. **Services preview** — the near-black numbered grid (from the reference image), 3 across,
   linking to `/services`.
6. **Automation engine** — the 11 agents shown as a connected system, not 11 equal cards.
7. **Selected work** — 3–4 featured projects, asymmetric.
8. **CTA band** — "Tell us what you're building" → contact.
9. **Footer** — email, LinkedIn, brand list, legal, GA.

---

## 4. Services & capabilities (verbatim source, human-described)

From the reference image + `services/*` notes. Descriptions on the site must be rewritten by a
human (the reference image literally says *"don't add AI-generated descriptions"*).

**Core grid (from image):** AI Automation Consulting · Workflow Optimization · SEO & Organic
Growth · Content Systems · Digital Marketing Strategy · Lead Generation Pipelines · Brand
Positioning · Content Repurposing · AI-Powered Operations.

**Studio services (from notes):** Website making · UGC video (we have models, pay & hire, like
dansugc.com) · quick-commerce / product photography · clipping · social media handling ·
auto-carousel marketing (post tens of automated carousels to tens of channels).

**The 11 automation agents** (`services/automations`):
1. Lead Generation (Google Scraper)
2. SEO + Blog Post on WordPress via n8n
3. Calling Agent
4. Product Listing → angle.forge
5. *(reserved)*
6. YouTube Shorts Copy Automation
7. Instagram Carousel + YouTube Shorts from Images
8. Website Making
9. WP JS (Personalized WordPress Automation)
10. Hermes + OpenClaw
11. Post to all social media via Hermes

> Agent #2 (SEO + Blog Post) is the consumer of the blog API below — it can publish straight
> into `/blog` instead of WordPress.

---

## 5. The automated blog API (key feature)

**Goal:** any approved client or automation can publish a blog post with a single authenticated
HTTP request — no dashboard login required.

### Auth
- Long-lived **API tokens** issued out-of-band, stored **hashed** (SHA-256) in an `api_tokens`
  table with a label, scopes (`blog:write`), and `revoked` flag.
- Caller sends `Authorization: Bearer <token>`.
- Middleware hashes the presented token and looks it up; rejects on miss/revoked/expired.
- Rate-limit per token (e.g. 60 req/min) to stop runaway automations.

### Endpoints
```
POST   /api/blog          create a post           (scope: blog:write)
GET    /api/blog          list published posts    (public)
GET    /api/blog/:slug    fetch one post          (public)
PUT    /api/blog/:id      update                  (scope: blog:write)
DELETE /api/blog/:id      soft-delete             (scope: blog:write)
```

### POST payload
```jsonc
{
  "title": "How we automate carousel posting",
  "slug": "automate-carousel-posting",   // optional; derived from title if absent
  "excerpt": "Short summary for cards + SEO.",
  "contentMarkdown": "## Heading\n\nBody in markdown...", // OR contentHtml
  "coverImageUrl": "https://.../cover.jpg",
  "tags": ["automation", "social"],
  "author": "Centrol Matrix",
  "status": "published",                  // draft | published
  "publishedAt": "2026-06-06T12:00:00Z"   // optional
}
```

### Processing & safety
- Validate with **Zod**. Reject missing title/content.
- Generate slug if absent; ensure uniqueness (append `-2`, `-3`…).
- If `contentMarkdown`: render to HTML server-side (`remark`/`rehype`) then **sanitize**
  (`rehype-sanitize` / DOMPurify on server) so an attacker token can't inject scripts.
- If `contentHtml`: sanitize aggressively before storing.
- Compute reading time + word count.
- Store both raw markdown and sanitized HTML.
- Return `201` with the created post + canonical URL.

### `posts` table (Drizzle)
```
id (uuid)  slug (unique)  title  excerpt  content_markdown  content_html
cover_image_url  tags (text[])  author  status  reading_time
published_at  created_at  updated_at  created_by_token (fk)  deleted_at
```

### Rendering
- `/blog` lists `status=published AND deleted_at IS NULL`, newest first, paginated.
- `/blog/[slug]` renders sanitized HTML with editorial typography (Playfair headings, Inter body,
  pink links). Generates per-post `<title>`, OpenGraph, JSON-LD `Article`.
- RSS at `/feed.xml` so the blog is syndicate-able.

### Example call
```bash
curl -X POST https://centrolmatrix.com/api/blog \
  -H "Authorization: Bearer $CM_BLOG_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"Hello","contentMarkdown":"## Hi\n\nFirst post.","status":"published"}'
```

---

## 6. SEO / AEO / GEO (client to provide IDs)

- `next-sitemap` (or app-router `sitemap.ts`) → `sitemap.xml` + `robots.txt`.
- Per-page `metadata` (title, description, canonical, OG, Twitter).
- JSON-LD: `Organization` (sitewide), `Article` (posts), `BreadcrumbList`.
- GA4 + Search Console + any tag manager injected from **env vars** (`NEXT_PUBLIC_GA_ID`,
  verification meta tags) — never hard-coded. **Ask client for the IDs.**
- AEO/GEO: clean semantic headings, FAQ schema where relevant, fast LCP, alt text everywhere.

---

## 7. Assets

- **Logo:** the LinkedIn CDN URL is a placeholder; download and self-host as `/public/logo.svg`
  + favicon set. (Client to confirm final mark.) Note: this is the Centrol Matrix mark — do not
  surface any prior-brand logos as the site's identity.
- **Hero portal media + work gallery:** placeholder image/video now; client adds real media.
- Reuse photos/videos from the old brands where licensed.
- Fonts self-hosted via `next/font`.

---

## 8. Build phases

1. **Scaffold** — Next.js 14 + TS + Tailwind, tokens, fonts, Lenis provider, base layout.
2. **Home** — nav, editorial hero, circular portal, brand marquee.
3. **Services + Agents** — numbered grid + 11-agent system view (human copy).
4. **Work / Apps / About** — galleries + studio story.
5. **Blog infra** — Postgres + Drizzle, `posts` + `api_tokens`, the API routes, validation,
   sanitization, rate-limit.
6. **Blog UI** — index + post page + RSS.
7. **Contact** — form → email (Resend) + DB.
8. **SEO/analytics** — sitemap, robots, JSON-LD, GA/GSC env wiring.
9. **Anti-slop QA** — run the `anti-slop` / `deslop` pass over copy + diff; verify fonts, color,
   motion, layout, copy all pass the hard rules.

---

## 9. Open items for the client

- [ ] Final logo file + favicon (confirm the LinkedIn mark).
- [ ] GA4 ID, Search Console verification, any GTM/tag IDs.
- [ ] Real hero/work photos & videos.
- [x] Hosting: **Vercel**.
- [ ] Supabase project + Postgres connection string (pooled URL for serverless).
- [ ] Confirm services copy (we draft human descriptions; client approves).
- [ ] Tagline for the hero (or approve a drafted one).
```

