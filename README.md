# Centrol Matrix — website

A studio site for **Centrol Matrix** (websites, content systems, AI automation), plus a
**token-authenticated blog API** so any approved partner or automation can publish a post over
HTTP.

Built per `CLAUDE.md` (build contract) and `PLAN.md` (the why). Editorial, hand-built look —
**not AI-generated**: Playfair Display + Inter, white canvas, near-black ink, one hot-pink accent.

---

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS, GSAP + Lenis (motion / smooth scroll)
- Supabase (Postgres) via Drizzle ORM — blog storage
- Zod (validation), remark/rehype + sanitize (blog content), Resend (contact email)
- Hosting: Vercel

---

## Getting started

```bash
pnpm install          # or npm install
cp .env.example .env.local   # then fill in values
pnpm dev              # http://localhost:3000
```

The site renders fully **without** a database connected — the blog shows an empty state and the
contact form accepts submissions (logged, not emailed) until env is wired up.

### Environment

See `.env.example`. Minimum to run locally: nothing. To enable the blog + email:

| Var | Needed for |
|---|---|
| `DATABASE_URL` | Blog (Supabase **pooled** connection string) |
| `CM_TOKEN_PEPPER` | Blog token hashing (any long random string) |
| `RESEND_API_KEY` | Contact form email delivery |
| `CONTACT_TO_EMAIL` | Where contact emails go |
| `NEXT_PUBLIC_SITE_URL` | Canonical URLs, sitemap, RSS |
| `NEXT_PUBLIC_GA_ID` | GA4 (analytics stays off until set) |
| `NEXT_PUBLIC_SEARCH_CONSOLE_VERIFICATION` | Search Console meta tag |

---

## Database (Supabase)

1. Create a Supabase project. Copy the **pooled** connection string
   (Project Settings → Database → Connection pooling) into `DATABASE_URL`.
2. Generate + run migrations:

```bash
pnpm db:generate     # creates SQL in ./drizzle from lib/db/schema.ts
pnpm db:migrate      # applies them
# or, for quick dev: pnpm db:push
```

Tables: `posts`, `api_tokens` (see `lib/db/schema.ts`).

---

## Blog API (token-authenticated)

Mint a token (prints the plaintext **once**; only the hash is stored):

```bash
pnpm issue-token "n8n SEO agent"          # default scope blog:write
pnpm issue-token "Partner X" blog:write
```

Send it as `Authorization: Bearer <token>`.

| Method | Path | Auth | Purpose |
|---|---|---|---|
| `POST` | `/api/blog` | `blog:write` | Create a post |
| `GET` | `/api/blog` | public | List published (`?page=&perPage=&q=`) |
| `GET` | `/api/blog/:idOrSlug` | public | Fetch one (slug = published; UUID = any) |
| `PUT` | `/api/blog/:id` | `blog:write` | Update |
| `DELETE` | `/api/blog/:id` | `blog:write` | Soft-delete |

### Create payload

```jsonc
{
  "title": "How we automate carousel posting",     // required
  "slug": "automate-carousel-posting",             // optional; derived + uniquified
  "excerpt": "Short summary for cards + SEO.",
  "contentMarkdown": "## Heading\n\nBody...",       // one of contentMarkdown | contentHtml
  "contentHtml": "<h2>Heading</h2><p>Body</p>",
  "coverImageUrl": "https://.../cover.jpg",
  "tags": ["automation", "social"],
  "author": "Centrol Matrix",                       // default
  "status": "published",                            // draft | published (default published)
  "publishedAt": "2026-06-07T12:00:00Z"             // optional
}
```

Content is rendered (Markdown → HTML) and **sanitized** before storage — scripts/iframes/event
handlers are stripped regardless of source. Reading time is computed automatically. Slugs are
made unique. Per-token rate limit is ~60 requests/minute.

### Status codes

`201` created · `200` ok · `400` bad JSON / wrong id type · `401` missing/invalid token ·
`403` missing scope · `404` not found · `422` validation (returns `fields`) · `429` rate limited.

### Smoke test

```bash
BASE=http://localhost:3000
curl -X POST $BASE/api/blog \
  -H "Authorization: Bearer $CM_BLOG_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"Hello","contentMarkdown":"## Hi\n\nFirst post.","status":"published"}'
# → 201, then open $BASE/blog/hello
```

---

## Project layout

```
app/          routes (pages + /api), layout, sitemap, robots, feed.xml
components/    Nav, Footer, Hero, PortfolioPortal, ServicesGrid, AgentSystem, ContactForm, …
hooks/        useLenis, usePortfolioRotation
lib/          db (drizzle), auth/token, blog (markdown + posts), validation, rate-limit, http
content/      site.ts (human-written copy), placeholders.ts (inline SVG mockups)
scripts/      migrate.ts, issue-token.ts
drizzle/      generated migrations
```

---

## Still placeholder (swap when assets arrive)

- **Logo:** `content/site.ts` → `logoPlaceholder` (LinkedIn CDN). Self-host `/public/logo.svg`.
- **Portal / work media:** inline SVG mockups in `content/placeholders.ts`. Replace with real
  `next/image` sources in `/public`.
- **Analytics / Search Console:** add env IDs; features are gated off until present.
- **Services copy:** human-written drafts in `content/site.ts` — refine/approve.

## Notes

- All motion honors `prefers-reduced-motion`.
- `.env*` is gitignored. The OpenRouter key in `.env` is only used by `analyze_video.py`; never
  expose it client-side.
