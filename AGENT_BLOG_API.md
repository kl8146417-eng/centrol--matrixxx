# Centrol Matrix — Blog API for AI agents

This is the only file an automation needs to publish a blog post to
`https://centrolmatrix.com`. Send one authenticated HTTP request. No login, no dashboard.

---

## 1. What you need

- **Base URL:** `https://centrolmatrix.com` (the `centrol-matrix.netlify.app` subdomain also works).
- **A bearer token** with the `blog:write` scope. Ask the site owner to mint one:
  `npm run issue-token "my agent name"`. The token looks like `cm_xxxxxxxx…` and is shown once.
- Send it on every write request:
  `Authorization: Bearer cm_xxxxxxxx…`

Keep the token secret. Treat it like a password. If it leaks, the owner revokes it.

---

## 2. Publish a post (the main thing)

`POST /api/blog` with `Content-Type: application/json`.

### Minimum body
```json
{
  "title": "Your post title",
  "contentMarkdown": "## A heading\n\nYour post body in Markdown."
}
```

### Full body (all optional except title + one content field)
```jsonc
{
  "title": "How we automate carousel posting",   // REQUIRED
  "slug": "automate-carousel-posting",            // optional — auto-made from title, kept unique
  "excerpt": "One or two sentence summary for cards and SEO.",
  "contentMarkdown": "## Heading\n\nBody in **Markdown**. Lists, links, code, images all work.",
  "contentHtml": "<h2>Heading</h2><p>Or send sanitized HTML instead of Markdown.</p>",
  "coverImageUrl": "https://example.com/cover.jpg",
  "tags": ["automation", "social"],
  "author": "Centrol Matrix",                     // defaults to "Centrol Matrix"
  "status": "published",                          // "published" (default) or "draft"
  "publishedAt": "2026-06-07T12:00:00Z"           // optional ISO date; defaults to now
}
```

Rules:
- Provide **`title`** and **one of** `contentMarkdown` **or** `contentHtml`.
- Markdown is converted to HTML and **sanitized** server-side (scripts, iframes, and event
  handlers are stripped). You cannot inject unsafe HTML even if you try.
- `slug` is optional. If you omit it, it's generated from the title and made unique
  (`my-post`, `my-post-2`, …). If you want a stable URL, set it yourself.
- `status: "draft"` saves the post without showing it publicly. Publish later with `PUT`.

### Success
`201 Created`, returning the post including its public URL:
```json
{
  "id": "f4c1…uuid",
  "slug": "automate-carousel-posting",
  "title": "How we automate carousel posting",
  "status": "published",
  "readingTime": 3,
  "url": "https://centrolmatrix.com/blog/automate-carousel-posting",
  "...": "..."
}
```
The post is live immediately at that `url`, and appears on `/blog`, in `sitemap.xml`, and `/feed.xml`.

---

## 3. Other operations

| Method | Path | Auth | Use |
|---|---|---|---|
| `POST` | `/api/blog` | `blog:write` | Create a post (above) |
| `GET` | `/api/blog` | none | List published posts. Query: `?page=1&perPage=12&q=search` |
| `GET` | `/api/blog/{slug}` | none | Read one published post by slug |
| `GET` | `/api/blog/{id}` | none | Read one post by UUID (any status) |
| `PUT` | `/api/blog/{id}` | `blog:write` | Update a post (send only the fields to change) |
| `DELETE` | `/api/blog/{id}` | `blog:write` | Remove a post (soft delete) |

`PUT` example — publish a draft and fix the title:
```json
{ "status": "published", "title": "A better title" }
```

---

## 3a. Upload a cover image (host it on our domain)

The blog only stores a **public image URL** (`coverImageUrl`) — it does not store the post
without one being reachable. If you generated or downloaded an image and need a public URL on
`centrolmatrix.com`, upload it first, then use the returned `url` as `coverImageUrl`.

`POST /api/media` — scope `blog:write`. The bytes are stored in our database and served back at
a stable URL `https://centrolmatrix.com/media/<id>.<ext>`.

**Accepted:** JPEG, PNG, or WebP. **Max 5 MB.**

Two ways to send it:

### A. JSON with base64 (easiest for scripts)
```jsonc
{
  "imageBase64": "/9j/4AAQSkZJRg…",   // bare base64 OR a full "data:image/jpeg;base64,…" URI
  "filename": "cover.jpg"             // optional, cosmetic
}
```
```bash
curl -X POST https://centrolmatrix.com/api/media \
  -H "Authorization: Bearer $CM_BLOG_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"imageBase64\":\"$(base64 -w0 cover.jpg)\",\"filename\":\"cover.jpg\"}"
```

### B. multipart/form-data with a file
```bash
curl -X POST https://centrolmatrix.com/api/media \
  -H "Authorization: Bearer $CM_BLOG_TOKEN" \
  -F "file=@cover.jpg;type=image/jpeg"
```

### Response — `201 Created`
```json
{
  "id": "8b1f…uuid",
  "url": "https://centrolmatrix.com/media/8b1f…uuid.jpg",
  "mimeType": "image/jpeg",
  "byteSize": 184213,
  "width": 1600,
  "height": 900
}
```

Then create the post with that URL:
```json
{ "title": "…", "contentMarkdown": "…", "coverImageUrl": "https://centrolmatrix.com/media/8b1f…uuid.jpg" }
```

Upload errors: `413` too large (>5 MB), `415` unsupported type (send JPEG/PNG/WebP),
`422` empty/missing image, `503` storage not configured.

---

## 4. Responses & errors

| Code | Meaning | What to do |
|---|---|---|
| `201` | Created | Post is live. Read `url`. |
| `200` | OK | For GET/PUT/DELETE success. |
| `400` | Bad JSON, or used a slug where an id (UUID) is required | Fix the request shape. |
| `401` | Missing or invalid token | Check the `Authorization` header. |
| `403` | Token lacks `blog:write` | Ask for a token with the right scope. |
| `404` | Post not found | Check the slug/id. |
| `422` | Validation failed | Read `fields` in the response; fix those keys. |
| `429` | Rate limited (≈60 writes/min per token) | Back off; retry after `retryAfter` seconds. |

A `422` looks like:
```json
{ "error": "Validation failed.", "fields": { "title": "title is required" } }
```

---

## 5. Copy-paste examples

### curl
```bash
curl -X POST https://centrolmatrix.com/api/blog \
  -H "Authorization: Bearer $CM_BLOG_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Hello from the automation",
    "excerpt": "First post published over the API.",
    "contentMarkdown": "## It works\n\nThis post was created by an agent.",
    "tags": ["test"]
  }'
```

### Node / fetch
```js
const res = await fetch("https://centrolmatrix.com/api/blog", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${process.env.CM_BLOG_TOKEN}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    title: "Hello from the automation",
    contentMarkdown: "## It works\n\nThis post was created by an agent.",
    status: "published",
  }),
});
const post = await res.json();
console.log(res.status, post.url);
```

### Python / requests
```python
import os, requests

r = requests.post(
    "https://centrolmatrix.com/api/blog",
    headers={"Authorization": f"Bearer {os.environ['CM_BLOG_TOKEN']}"},
    json={
        "title": "Hello from the automation",
        "contentMarkdown": "## It works\n\nThis post was created by an agent.",
        "status": "published",
    },
)
print(r.status_code, r.json().get("url"))
```

### n8n (the "SEO + Blog Post" agent)
1. Add an **HTTP Request** node.
2. Method `POST`, URL `https://centrolmatrix.com/api/blog`.
3. Authentication → **Header Auth** → name `Authorization`, value `Bearer cm_…`.
4. Body → JSON → map your generated `title`, `excerpt`, `contentMarkdown`, `tags`.
5. The node's response gives you the live `url`. Done.

---

## 6. Writing guidance (so posts don't look AI-generated)

The site is intentionally editorial. Posts should match:
- Plain, confident sentences. No "delve", "elevate", "seamless", "unlock", "in today's
  fast-paced world", and no em-dash tic.
- Real specifics over filler. If you don't know a number, don't invent one.
- Use Markdown headings (`##`), short paragraphs, and lists. Keep one idea per section.
- A good `excerpt` (1–2 sentences) improves how the post looks on `/blog` and in search.
