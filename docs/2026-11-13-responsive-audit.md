# Responsive audit: v5 (before) → v6 (after)

Captured 2026-11-13 with Playwright (Chromium 147, `reducedMotion: reduce`, iPhone UA below 768px).
The script loads each page, walks it to trigger lazy media, then records:
- horizontal overflow (`scrollWidth - innerWidth`);
- elements poking past the viewport outside a scroll container;
- interactive elements smaller than 44×44px (inline text links inside paragraphs excluded);
- form fields under 16px font (iOS zooms these);
- videos playing above the fold on first load.

Full-page captures (not committed, ~30 MB per set) are in `docs/screens/before/{live,local}/` and
`docs/screens/after/`. The committed side-by-side sheets live in `docs/screens/compare/`.

## Before (live centrolmatrix.com = `v5-redesign` = `main` @ d59a396)

Widths: 360, 390, 768, 1024, 1440. Pages: `/`, `/services`, `/pricing`, `/work`, `/contact`, `/fashion`, `/apps`, `/blog`.

**No page scrolls sideways** at any width (overflowX = 0 everywhere). The problems are elsewhere.

### Tap targets (every page)
- Mobile nav: the logo link is 72×24, and the cart and menu buttons are 40×40.
- Mobile nav: no primary CTA, so the "Start a project" pill is hidden below `sm`.
- Footer: link list items are 19px tall, and the email/WhatsApp links are 23px tall.
- Small targets per page at 390px:
  - home: 39;
  - `/pricing`: 56;
  - `/fashion`: 34;
  - `/contact`: 23;
  - every other page: 18 to 21.
- `/pricing`: the category chips are 30px tall.
- `/fashion`: the lookbook tabs and work-rail filter chips are 36px tall.
- Home: the "What we make" discipline links are 23px tall, and the "Clothing brand? Get 3 on-model looks" link is 23px.
- `/apps`: the "Pre-register on Google Play" pill is 42px; the case-study and domain pills are 43px.

### Forms
- `/pricing`: the currency `<select>` is 13px, so iOS zooms the page on focus.
- `/contact`: the fields are underline-only, 35px tall, with 13px uppercase labels. They look like dividers, not inputs.

### Layout bugs seen in the captures
- `/pricing` at 360/390:
  - The category chip row runs under the currency select, so the third chip is cut to a sliver.
  - The page is about 20,700px long at 360.
- `/fashion` at 360/390: the comparison table needs sideways scrolling (`min-w-[560px]`), and the "Creator UGC" column is cut off with no hint.
- Home bento at 390:
  - "Mobile & web apps": the Recl screenshot crops mid-word ("e what matters. all it forever.").
  - "Automation": the 3D gear sits on top of the arrow icon.
- Shared CTA band at 390: the "WhatsApp +63 951 568 0964" button wraps the number onto two lines.
- Home is about 15,700px long at 390 (9,300px at 1440). It has ten sections, and four of them are about our own products, not the visitor.

### Video
- Home at ≥1024px: the hero UGC clip autoplays (480p, fine on desktop).
- Below 1024px no hero video plays, which is correct.
- Every other `AutoVideo` loads the full file as soon as it scrolls into view, mobile included. The ORVA demo is the full-size desktop MP4.

### Content/trust problems visible in the captures (fixed in Phase 5)
- The +63 WhatsApp number is in the footer, the CTA band and the `/fashion` hero.
- "Ads, shoots and stores that sell your product."
- Fashion-first nav. No phone number. No audit offer.

## After (v6, local production build + deploy preview 3)

Widths: 360, 390, 414, 768, 1024, 1280, 1440.
Pages: `/`, `/audit`, `/services`, `/pricing`, `/work`, `/contact`, `/fashion`, `/apps`, `/blog`, `/about`, `/faq`, `/for/demo`, `/privacy`, plus `/admin`, which is only checked for not being broken.

| Check | Before (v5 live) | After (v6) |
|---|---|---|
| Horizontal overflow | 0 | 0 on every page and width |
| Tap targets under 44px (per page, at 390) | 18 to 56 | 0 on every public page |
| Form fields under 16px | currency select (13px) | none |
| Video autoplaying above the fold on phones | none | none. Phones never autoplay: poster plus play button, 480p loaded on tap |
| Mobile menu | small dropdown, no CTA in the bar | full-height sheet: 60px rows, focus moves in, Escape closes, page scroll locked. "Free audit" stays visible in the bar |
| Anchors under the fixed nav | not handled | one `scroll-padding-top: 96px`, no stacked offsets |
| Home length at 390 | ~15,700px | ~13,500px |

Fixed along the way:
- Display headings no longer break "e-" / "commerce".
- The hero caption no longer sits under the UGC sample card.
- The `/audit` contact row no longer overflows at 768px.
- `/fashion`'s comparison table becomes stacked cards on phones.
- The `/pricing` currency select sits on its own row on phones.

Admin (`/admin`) loads and works, with one small sign-in field (not polished, as agreed in the brief).
Committed comparison sheets: `docs/screens/compare/*.jpg` (live v5 vs v6 at 390 and 1440).
