# Video Analysis - Clone Spec

**Source:** `Recording 2026-06-06 223845.mp4`  
**Duration:** 73.6s  
**Resolution:** 1898x1074  
**Frames analyzed:** 50 (sampled evenly across recording)  
**Primary model:** `minimax/minimax-m3` via OpenRouter  
**Second-opinion model:** `xiaomi/mimo-v2.5`  

---

# Primary Analysis (minimax/minimax-m3)

## 1. Overview

**Brand:** SA Solutions
**Type:** Boutique web design / custom website agency landing page
**What it does:** Markets a small agency's services (custom websites, templates, ongoing support) and showcases client work through a single, bold hero that demonstrates portfolio depth in one circular carousel.
**Target users:** Small business owners, cafés/restaurants, healthcare practices, non-profits, and security community organizers who need a "make me look credible" website.
**Vibe / emotional tone:** Confident, editorial, playful, opinionated. The line "You should be excited about your website. No, really." sets a tone of friendly provocation. Minimal chrome, big typography, lots of white space, a single hot-pink italic accent, and a single rotating portfolio window.
**Reference point:** Studio-y agency aesthetic (think Locomotive / Active Theory / Softmal) — a "one headline, one proof point" hero pattern.

## 2. Page Structure & Section-by-Section Walkthrough

### 2.1 Sticky Top Navigation (visible t=0.0s → t=10.6s)
- Full-bleed, fixed to top, white background
- Left: monogram "SA" + wordmark "SOLUTIONS" (all caps, tracked, serif, black)
- Right: horizontal nav — "About", "Our work", "Custom websites", "Templates+", "Ongoing support", "Contact", and a pill-shaped pink CTA "Get started"
- Items: regular weight, black, with "Templates+" carrying a small superscript plus
- Spacing: roughly 32–48 px horizontal gap between items
- Container height ≈ 64–72 px; logo baseline aligned to text baseline of nav

### 2.2 Hero — Headline Block (t=0.0s → t=10.6s)
- Full-bleed white canvas, content centered horizontally
- Two-line serif headline, very large: "You should be excited" / "about your website."
- Below it, italic hot-pink serif line: "No, really."
- Vertical rhythm: headline block sits in upper-mid of viewport; large empty space above and below suggests it's vertically anchored ~38% from top
- Beneath headline, an enormous empty zone (intentional) frames a single circular portal

### 2.3 Hero — Circular Portfolio Portal (t=1.5s → t=10.6s)
- A circular viewport (~600–680 px diameter at desktop) that crops a scrollable/animated inner image stack
- Position: horizontally centered, lower portion of viewport
- The circle auto-rotates through a series of project mockups appearing inside a MacBook Pro photography scene:
  - t=1.5s: "LS KO" branding (a café/ko project) on a laptop screen inside the circle
  - t=3.0s: nature photo with overlaid "Healthy wa[tersheds] for toda[y and tomor]row" (Central Lake Ontario Conservation Authority)
  - t=4.0s: a stage photo with red/purple lighting and "erts" visible (likely a performing arts project)
  - t=4.5s: laptop with the same conservation site fully visible
  - t=5.0s: a security conference site — "Tap into the collective knowledge of the security community, with best practices and research from industry thought leaders." (CTA in frame: "BECOME A: Member / Speaker / Sponsor"; nav: "RESOURCES / EVENTS"; footer: "KIMBERLY FONG · GAYLYNNE MORR · REBECA DIAZ WA")
  - t=5.5s: "BOWLS BY KO" — restaurant homepage with menu nav (MENU, CATERING, GIFT CARDS, CONTACT) and a hero photo of hands holding a noodle bowl
  - t=6.5s: Central Lake Ontario Conservation Authority site — full view: teal nav "Conservation Area / Planning & Permits / Get Involved / Education / Watershed Management / About / Library"; top status bar "CURRENT FLOOD STATUS / Lake Water Status / Lake Ontario Shoreline / Creeks and Streams"; green CTA "ACCESS GUIDE" and "DONATE"; hero photo of a young woman by a stream with copy "Healthy watersheds for today and tomorrow."
  - t=7.5s: "CHASE Medical Communications, Inc." — "Smart. Strategic. Tactical." subhead, blue→red gradient hero with liquid/abstract water bubbles image, headline "Your Medical Communication Experts" overlaid bottom-left; nav "Home / About / Services / Publications / Contact"
- The circle remains static in place; the content inside scales up from a smaller circle (≤80 px) to its final size while fading in
- A small white pause icon (||) sits in the lower-center of the circle (a custom carousel control)

### 2.4 Persistent Accessibility Widget (all frames, bottom-right)
- A small blue circular button (≈44 px diameter) with a stylized human figure (accessibility icon)
- Fixed position, 24 px from right and bottom edges
- This is a third-party plugin (UserWay / AccessiBe / Recite Me / EqualWeb) — keep as a feature, not as a custom element

## 3. Color Palette (exact hex codes)

| Token | Hex | Role | Where used |
|---|---|---|---|
| `--bg` | `#FFFFFF` | page background | whole site canvas |
| `--ink` | `#0E0E0E` | primary text | headline, nav, brand mark |
| `--ink-soft` | `#1A1A1A` | near-black variant | sub-labels |
| `--accent-pink` | `#E63A8E` | accent / italic line | "No, really."; "Get started" button |
| `--accent-pink-hover` | `#C92E78` | hover state for pink CTA | button hover |
| `--a11y-blue` | `#1E4E8C` | accessibility widget | bottom-right floater |
| `--a11y-blue-icon` | `#FFFFFF` | icon within widget | human figure |
| `--rule` | `#000000` (1px) | hairline rules | none observed in hero, likely for later sections |
| `--muted` | `#6B6B6B` | meta text | footer / nav sub-labels (not seen in hero but reserved) |
| Gradient — Chase hero | `#0F2E66` → `#7B1F4A` (approx. 135° linear) | hero bg | inside the "Chase" portfolio card |

No dark mode toggled. No drop shadows on the page chrome itself.

## 4. Typography

| Style | Family (guess) | Weight | Size (px / rem) | Line-height | Letter-spacing | Color | Transform |
|---|---|---|---|---|---|---|---|
| Brand mark "SA" | Playfair Display (serif) | 700 | 28 / 1.75 | 1 | 0 | `#0E0E0E` | none |
| Wordmark "SOLUTIONS" | Playfair Display or Inter (spaced) | 500 | 14 / 0.875 | 1 | 0.35em | `#0E0E0E` | uppercase |
| Nav item | Inter / system sans | 500 | 15 / 0.9375 | 1.2 | 0 | `#0E0E0E` | none |
| CTA "Get started" | Inter | 600 | 15 / 0.9375 | 1 | 0 | `#FFFFFF` | none |
| Display headline (black) | Playfair Display / Canela / Lyon | 500 (Regular serif) | clamp(64px, 7vw, 112px) / 4–7 rem | 1.05 | -0.01em | `#0E0E0E` | none |
| Accent italic line "No, really." | Playfair Display Italic | 500 italic | clamp(56px, 6vw, 96px) / 3.5–6 rem | 1.05 | -0.01em | `#E63A8E` | none |
| Subhead (within circle) | varies — project site specific | — | — | — | — | — | — |
| Pause icon (||) | system | 400 | 22 | 1 | 0 | `#FFFFFF` | none |

Display vs body distinction: only one display style + one accent italic. Everything else is 14–16 px sans. Very editorial. Font pair appears to be **Playfair Display (serif display) + Inter (UI/body)**.

## 5. Components

### 5.1 Pill Button (Primary CTA — "Get started")
- Shape: pill, `border-radius: 999px`
- Padding: 12 px V / 22 px H
- Background: `--accent-pink` `#E63A8E`
- Text: white, 600, 15 px
- Hover: darken to `#C92E78`, slight scale 1.02 (transform), 200 ms ease-out
- Active: scale 0.98, 100 ms
- No shadow

### 5.2 Text Link (Nav items)
- Plain `#0E0E0E` 15 px
- Hover: opacity 0.6, 180 ms ease-out
- Underline: none; can add 1 px underline-on-hover from left
- Focus ring: 2 px solid `#E63A8E` outline-offset 4 px

### 5.3 Circular Portfolio Portal (custom)
- Outer wrapper: `border-radius: 50%`, `overflow: hidden`
- Diameter: clamp(420px, 55vw, 700px)
- Background: white (or transparent over hero)
- Inner: an absolute-positioned image stack of project mockups, each `100%` width, transitioned with `transform: scale()` + `opacity`
- Bottom-center: pause / play button, 48 px circle, white 8% bg, 1 px white 30% border, pause icon inside

### 5.4 Accessibility Widget
- 44 px blue circle (`#1E4E8C`), white pictogram inside
- Fixed bottom-right
- Drop shadow: `0 6px 18px rgba(0,0,0,0.18)`
- Opens a side panel (not seen, but expected)

### 5.5 Pause / Play Button
- 48 × 48 px circle
- Background `rgba(255,255,255,0.10)`, border `1px solid rgba(255,255,255,0.3)`
- Icon: two white 3 × 18 px bars, gap 6 px, centered
- Hover: bg `rgba(255,255,255,0.20)`

## 6. Animations & Motion

### 6.1 Page Load
- Headline first line "You should be excited" — fade in + 16 px Y translate up, 700 ms, `cubic-bezier(0.22, 1, 0.36, 1)` (easeOutQuint), 0 ms delay
- Second line "about your website." — same, 120 ms delay
- Italic pink "No, really." — fade in + slight scale 0.96 → 1, 900 ms, 250 ms delay
- Stagger: ~120 ms between each line
- Reduced-motion: replace with instant fade 200 ms

### 6.2 Circle Reveal
- Circle starts at 0 px scale from `transform-origin: center`, opacity 0
- Animates to full scale 1, opacity 1, 1200 ms, `cubic-bezier(0.16, 1, 0.3, 1)`, starting ~700 ms after page load (so it begins as the headline finishes)
- Background: a soft white "porthole" with a faint inset shadow appearing with the circle

### 6.3 Inner Carousel (auto-rotating project mockups)
- 6 project cards cycling
- Each card visible for ~1.5 s
- Transition: crossfade 600 ms + 1.04 → 1.0 scale (subtle Ken Burns)
- Pause button toggles `animation-play-state: paused`
- Easing: `cubic-bezier(0.65, 0, 0.35, 1)`

### 6.4 Hover Micro-interactions
- Nav items: opacity 0.6, 180 ms ease-out
- CTA button: background-color 200 ms + scale 1.02 200 ms
- Pause button: bg opacity 200 ms
- Circle on cursor-over: very subtle parallax (mouse-tracked ±6 px translate inside the circle, ease 400 ms)

### 6.5 Scroll Behavior
- No obvious scroll-jacking in the captured clip
- Expect later sections to use a **smooth scroll with Lenis** (Likely GSAP ScrollTrigger / Framer Motion scroll-based reveals)
- Page likely continues below the fold with a marquee of client logos, services, testimonials, and contact

## 7. Interactions & Micro-interactions

- **Custom cursor:** not visible. Default OS cursor throughout (arrow becomes text I-beam on hover over the "really." word — this is just a normal browser behavior since text is selectable).
- **Click feedback:** standard button press, no ripple
- **Focus rings:** not visible in recording but should be set: 2 px solid pink, 4 px offset
- **Form interactions:** none in hero
- **Hover states on links:** subtle opacity shift
- **Scroll behavior:** smooth (Likely `scroll-behavior: smooth` or Lenis)
- **Scroll-jacking:** none observed
- **Anchor jumps:** nav items presumably scroll to in-page anchors (`#about`, `#work`, `#contact`)
- **Pause control:** clickable, with hover and active state

## 8. Imagery, Video & Media

All imagery is contained **inside the circular portfolio portal** — the rest of the page is purely typographic.

1. **Project 1 — "LS KO"** (t=1.5s) — partial: a hand-held food/café branding card with a small bowl icon
2. **Project 2 — Conservation / Nature** (t=3.0s) — woman in a stream; overlaid white copy "Healthy watersheds for today and tomorrow."
3. **Project 3 — Performing Arts** (t=4.0s) — stage scene with red and blue lighting; partial word "erts"
4. **Project 4 — Security conference site** (t=4.5s, 5.0s) — laptop displaying "Tap into the collective knowledge of the security community, with best practices and research from industry thought leaders."; CTA group "BECOME A: Member / Speaker / Sponsor"; nav "RESOURCES / EVENTS"; footer credits "KIMBERLY FONG · GAYLYNNE MOR · REBECA DIAZ WA"
5. **Project 5 — Bowls by KO** (t=5.5s) — laptop showing a noodle-bowl hero photo with menu nav (MENU, CATERING, GIFT CARDS, CONTACT) and large white wordmark "BOWLS BY KO"
6. **Project 6 — Central Lake Ontario Conservation Authority** (t=6.5s) — laptop on a wooden desk with a small dried-grass vase to the right; the laptop displays the full CLOCA website: logo, teal nav, status bar with red/orange/green indicators, green CTAs "ACCESS GUIDE" and "DONATE", hero photo of a smiling young woman by a sunlit stream
7. **Project 7 — Chase Medical Communications** (t=7.5s) — laptop on a wooden desk with a small dried-grass vase to the right and a white coffee mug partially visible; the laptop displays a hero with a blue→red gradient over an abstract water-bubble / fabric image, "CHASE Medical Communications, Inc." logo box top-left with tagline "Smart. Strategic. Tactical."; nav "Home / About / Services / Publications / Contact"; headline "Your Medical Communication Experts" bottom-left

The portal is masked by an SVG `<clipPath>` circle, no border, no shadow. Subtle white "porthole" frame on hover.

Aspect ratio: 1:1 circle. All inside-card images preserve their native aspect; the clipping creates the circle.

No video, no WebGL, no Lottie, no 3D observed in the recording.

## 9. Content Inventory (verbatim text)

**Top nav (left to right):**
- "SA SOLUTIONS" (logo, "SA" stacked over "SOLUTIONS")
- "About"
- "Our work"
- "Custom websites"
- "Templates+"
- "Ongoing support"
- "Contact"
- "Get started" (button)

**Hero:**
- "You should be excited"
- "about your website."
- "No, really." (italic pink)
- (At t=0.0s edge of frame) "Tap into t…" — appears to be a teaser caption emerging from the bottom of the page before the circle fully appears

**Inside circle (project sites, in order shown):**
- "LS KO" / "BOWLS BY KO" (café brand)
- "Healthy wa[tersheds] for toda[y and] tomor[row]." — Central Lake Ontario Conservation Authority
- "erts" (clipped, performing arts project)
- "Tap into the collective knowledge of the security community, with best practices and research from industry thought leaders." + "BECOME A: Member / Speaker / Sponsor" + "RESOURCES / EVENTS" + footer "KIMBERLY FONG · GAYLYNNE MOR · REBECA DIAZ WA"
- "BOWLS BY KO" + "MENU / CATERING / GIFT CARDS / CONTACT"
- "Central Lake Ontario Conservation Authority" + "CURRENT FLOOD STATUS" + "Lake Water Status" + "Lake Ontario Shoreline" + "Creeks and Streams" + "Conservation Area / Planning & Permits / Get Involved / Education / Watershed Management / About / Library" + "ACCESS GUIDE" + "DONATE" + "Healthy watersheds for today and tomorrow."
- "CHASE Medical Communications, Inc." + "Smart. Strategic. Tactical." + "Home / About / Services / Publications / Contact" + "Your Medical Communication Experts"

**Persistent:**
- Accessibility widget icon (no text visible)

## 10. Iconography & Graphic Elements

- **Brand mark:** "SA" as a stylized two-letter monogram in serif (looks like a single ligature-friendly treatment). Wordmark "SOLUTIONS" set in a wide-tracked sans.
- **Pause / play icon:** two vertical white bars (Material-style pause)
- **Accessibility icon:** international access symbol (person with arms out)
- **Decorative shapes:** the circle is the only graphic device; it acts as both a window and a metaphor
- **Dividers:** none observed in the hero region
- **Icon style overall:** line / minimal, white-on-image overlays
- **Logos inside carousel:** various client logos (CLOCA leaf icon, CHASE boxed logo, etc.) — these are not part of the SA Solutions site, they are content within the portfolio portal

## 11. Responsive & Breakpoint Hints

The recording is at desktop (~1280 × 720). Likely breakpoints:
- `>= 1200 px`: full layout as shown; circle ~600 px; nav horizontal
- `768–1199 px`: headline scales to ~5.5 vw; circle ~70 vw; nav may still be horizontal but tighter gaps
- `< 768 px`: nav collapses to hamburger; headline ~12 vw; circle ~92 vw centered; pause button repositioned
- `< 480 px`: circle full width with 24 px side margins; the pink italic line may wrap to two lines

No explicit mobile frames are shown, so these are inferences. The use of `clamp()` for headline and `clamp(420px, 55vw, 700px)` for circle is highly likely.

## 12. Likely Tech Stack

- **Framework:** Next.js 14 (App Router) — agency sites of this type are almost always Next.js for SEO and hosting client demos
- **Styling:** Tailwind CSS (utility classes evident in spacing, flex behaviors) + a touch of CSS modules for the circle
- **Animation:** GSAP + ScrollTrigger for scroll-driven reveals; Lenis for smooth scroll; Framer Motion is also plausible
- **Carousel:** custom (no Embla/Swiper signatures visible) — implemented as a CSS-keyframed crossfade with `transform: scale`
- **Typography:** `next/font` loading **Playfair Display** + **Inter** (or self-hosted woff2)
- **3D / WebGL:** none
- **CMS:** none evident — content is static / hard-coded
- **Hosting:** Vercel (very likely given the agency-style Next.js build)
- **Accessibility widget:** UserWay or EqualWeb (third-party script)

## 13. Asset List

To clone this site you'd need to recreate:
1. SA Solutions brand mark (SVG, "SA" monogram + "SOLUTIONS" wordmark)
2. Project portfolio images inside the circle:
   - LS KO / Bowls by KO hero (food/noodle bowl photo + laptop)
   - Central Lake Ontario Conservation Authority site screenshot (laptop-on-desk photography)
   - Performing Arts project (stage photo with red/blue lighting)
   - Security conference site (text-heavy layout with abstract illustration)
   - Chase Medical Communications (gradient + water-bubble abstract hero)
3. Optional: physical desk background photo with dried-grass vase + white mug (used in the CLOCA and Chase frames)
4. Pause / play icon (inline SVG)
5. Fonts: Playfair Display (400, 500, 500 italic, 700) + Inter (400, 500, 600)
6. Favicon
7. (Third-party) Accessibility widget script and CSS

## 14. Complete Clone-Build Prompt

Build a pixel-perfect clone of the SA Solutions agency landing page (single-screen hero) using **Next.js 14 (App Router) + TypeScript + Tailwind CSS + GSAP + Lenis**. Use `next/font/google` to load **Playfair Display** (weights 400, 500, 500i, 700) as `--font-display` and **Inter** (weights 400, 500, 600) as `--font-sans`. The page has a single hero section on a pure white (`#FFFFFF`) canvas with a sticky top nav and a centered headline plus a circular auto-rotating portfolio portal.

**Color tokens (Tailwind `theme.extend.colors`):**
- `ink: '#0E0E0E'`
- `ink-soft: '#1A1A1A'`
- `pink: '#E63A8E'` (also `pink-dark: '#C92E78'` for hover)
- `bg: '#FFFFFF'`
- `muted: '#6B6B6B'`
- `a11y: '#1E4E8C'`

**Type scale:**
- `display-xl`: `clamp(64px, 7vw, 112px)`, weight 500, leading 1.05, tracking -0.01em, Playfair Display
- `display-italic-xl`: same size, italic, color pink, Playfair Display Italic
- `nav`: 15 px / 500 / Inter
- `cta`: 15 px / 600 / Inter / white
- `brand-mark`: 28 px / 700 Playfair (the "SA")
- `brand-wordmark`: 14 px / 500 / Inter / uppercase / tracking 0.35em (the "SOLUTIONS")

**Layout (top → bottom):**
1. `<header>` fixed, h-[64px], flex, items-center, justify-between, px-8, bg-white, z-50
   - Left: SVG "SA" monogram + `<span>SOLUTIONS</span>`
   - Right: 7 nav items (About, Our work, Custom websites, Templates+, Ongoing support, Contact) + `<a class="bg-pink text-white rounded-full px-5 py-3">Get started</a>` button
2. `<main>` with `min-h-screen`, flex column, items-center, justify-start, pt-32, pb-24
3. Headline block: 2 lines of `display-xl` "You should be excited" / "about your website." then 1 line of `display-italic-xl` "No, really."
4. Circular portal: `<div class="relative mx-auto mt-24 rounded-full overflow-hidden" style={{width: 'clamp(420px,55vw,700px)', aspectRatio:'1/1'}}>` containing an absolutely-positioned image stack that auto-crossfades every 1.5 s. Use 7 placeholder project images (food, nature, stage, security, restaurant, conservation, medical). Below them, a `<button>` 48 px circle with two white bars (pause/play), centered, 24 px from bottom of circle.
5. Bottom-right fixed `<div>` 44 × 44 bg-a11y rounded-full with the standard accessibility pictogram (inline SVG, white).

**Animations (GSAP, register plugins ScrollTrigger + Observer):**
- Page load: tween the 3 headline lines in sequence (700 ms, ease power4.out, Y +16 → 0, opacity 0 → 1, stagger 0.12 s). The italic line uses additional scale 0.96 → 1.
- At t = 0.7 s, tween the circle from scale 0 opacity 0 → scale 1 opacity 1 over 1200 ms ease `expo.out`.
- Auto-rotate the inner image stack using a custom hook: an interval of 1500 ms; each transition crossfades 600 ms and applies a 1.04 → 1 scale; pause button toggles `paused` state.
- Add a subtle mouse-driven parallax on the inner stack: track pointer over the circle, apply ±6 px translate, 400 ms ease.
- Use Lenis (`lenis` package) initialized in a `useEffect` to enable smooth scrolling; tie it to ScrollTrigger via `ScrollTrigger.update`.
- Honor `prefers-reduced-motion`: skip tweens, use 200 ms crossfade only.

**Interactions:**
- Nav links: hover `opacity: 0.6`, transition 180 ms
- CTA hover: bg-pink-dark + `scale(1.02)`, 200 ms
- Pause button hover: bg `rgba(255,255,255,0.20)`
- Focus visible: 2 px solid pink, offset 4 px, applied via `:focus-visible`
- Smooth in-page anchor scroll for nav items (`href="#about"` etc.) via Lenis `lenis.scrollTo`

**Structure / files:**
- `app/layout.tsx` (fonts, metadata, Lenis provider)
- `app/page.tsx` (composition)
- `app/components/Nav.tsx`
- `app/components/Hero.tsx`
- `app/components/PortfolioPortal.tsx` (with `usePortfolioRotation` hook)
- `app/components/PauseButton.tsx`
- `app/components/AccessibilityFab.tsx`
- `app/hooks/useLenis.ts`
- `tailwind.config.ts` (tokens above)
- `app/globals.css` (reset, `scroll-behavior: smooth`, focus styles)

**Content (verbatim, in source):**
- Nav: `["About", "Our work", "Custom websites", "Templates+", "Ongoing support", "Contact"]`
- CTA: `"Get started"`
- Headline: `"You should be excited"`, `"about your website."`
- Accent: `"No, really."`
- Alt for placeholder circle images: descriptive of the projects (`"Central Lake Ontario Conservation Authority website on a laptop"`, `"Chase Medical Communications website on a laptop"`, etc.)

**Accessibility / performance:**
- Skip-to-content link as first focusable element
- `aria-label` on the pause button (`"Pause portfolio rotation"` / `"Resume portfolio rotation"`)
- The accessibility FAB is a real third-party include (UserWay/EqualWeb script tag with `defer`); for clone demo, ship a stub button that opens an empty modal — keep the visual identical
- All images inside the portal use `next/image` with explicit width/height and `priority` on the first one
- Lighthouse target: 95+ perf, 100 a11y, 100 SEO
- Use semantic landmarks: `<header>`, `<main>`, `<nav>`, `<button>`

**Final QA checklist:**
- Hero headline visually centered horizontally and ~38% from top
- "No, really." italic is `#E63A8E`, not pure red
- Pink CTA pill is `border-radius: 999px`, no shadow
- Circle has no border; background shows only through `clip-path: circle()`
- Auto-rotation pauses when user clicks the pause button and resumes on next click
- At 1280 px, the circle is ≈ 600 px wide
- Smooth scroll works page-wide
- Reduce-motion users get static content with instant crossfade

---

# Second-Opinion Analysis (xiaomi/mimo-v2.5)

## 1. Overview
- **Site Name**: **SA SOLUTIONS**
- **Type**: Professional Services / Web Design Agency Portfolio.
- **Brand Purpose**: Providing custom web design, templates, and ongoing support for businesses.
- **Target Audience**: Small to medium business owners, startups, and creative professionals seeking a high-end, personalized web presence.
- **Vibe & Tone**: Clean, sophisticated, and modern with a playful, confident edge. The design relies on high-contrast typography and a "reveal" animation to showcase work, suggesting a premium, detail-oriented agency.

## 2. Page Structure & Section-by-Section Walkthrough
The recording captures a single-page or long-scrolling layout with a dramatic scroll-triggered transition.

- **Fixed Header (t=0s - t=5s)**:
  - **Layout**: Horizontal Flexbox, space-between.
  - **Left**: Brand logo "SA SOLUTIONS".
  - **Center**: Navigation links ("About", "Our work", "Custom Websites", "Templates", "Ongoing support", "Contact").
  - **Right**: Primary CTA button "Get started ->".
  - **Width**: Full-width container with ~120px horizontal padding.
- **Hero Section (t=0s - t=10s)**:
  - **Layout**: Centered, full-height vertical flex.
  - **Content**: Large display headline followed by a pink italic sub-headline.
  - **Spacing**: Generous vertical margins (approx 150px top/bottom).
- **Portfolio Reveal Section (t=10s - t=60s)**:
  - **Mechanism**: A circular "mask" originates from the bottom center of the screen.
  - **Interaction**: As the user scrolls, the circle expands in diameter while the content inside transitions (likely a video or carousel of site mockups).
  - **Masking**: The circle uses `border-radius: 50%` with `overflow: hidden`.
- **Lifestyle Showcase (t=60s - t=73.6s)**:
  - **Layout**: A high-quality "lifestyle" photograph of a MacBook Pro on a wooden desk.
  - **Placement**: The laptop screen displays the "BOWLS BY KO" project, suggesting the transition from the "mask" to a realistic environment.

## 3. Color Palette
- **Primary Background**: `#FFFFFF` (Pure White)
- **Headline Text**: `#111111` (Near Black)
- **Accent Pink**: `#F43F8E` (Vibrant Magenta-Pink, used for sub-headlines and CTA).
- **Nav Text**: `#333333` (Dark Grey)
- **Footer/UI Text**: `#666666` (Medium Grey)
- **Gradients**: None observed; the design relies on flat color blocks and photographic imagery.

## 4. Typography
- **Logo Typography**: 
  - "SA": Bold Serif (likely **Playfair Display** or **Times New Roman Bold**), ~24px.
  - "SOLUTIONS": Light Sans-serif (likely **Inter Light** or **Helvetica Neue Light**), ~14px, letter-spacing: 0.2em, uppercase.
- **Navigation**: Sans-serif (Inter/Geist), Regular 500, ~14px, Title Case.
- **Hero Display Headline**: 
  - **Font**: Serif (Playfair Display), Regular 400.
  - **Size**: ~80px (5rem) / line-height: 1.1.
  - **Color**: `#111111`.
- **Hero Accent Sub-headline**:
  - **Font**: Serif (Playfair Display), Italic 400.
  - **Size**: ~60px (3.75rem).
  - **Color**: `#F43F8E`.

## 5. Components
- **CTA Button ("Get started")**:
  - **Shape**: Pill-shaped (`border-radius: 9999px`).
  - **Colors**: Pink background `#F43F8E`, White text.
  - **Padding**: 14px 32px.
  - **Hover State**: Likely a slight darkening of the pink or a subtle scale-up (1.02).
- **Navigation Links**:
  - **State**: No underlines, hover changes color to pink.
- **Scroll Reveal Circle**:
  - **Initial State**: 0px diameter at bottom center.
  - **Final State**: Full-screen or large enough to frame a laptop (approx 1200px diameter).
  - **Playback Control**: A white "Pause" icon (||) is centered inside the circle during transitions.
- **Laptop Frame**:
  - **Subject**: MacBook Pro mockup with thin black bezels and "MacBook Pro" branding.

## 6. Animations & Motion
- **Scroll-Triggered Expansion (GSAP ScrollTrigger)**:
  - **Trigger**: `scrub: 1` (tied to scroll position).
  - **Property**: `width` and `height` of the circular container.
  - **Timing**: Smooth, 1.5s duration per "scene" transition inside the circle.
- **Text Entrance (Load)**:
  - **Type**: Staggered `y: 40` to `y: 0` with `opacity: 0` to `1`.
  - **Easing**: `power3.out`.
- **Content Fading**: Inside the circle, images cross-fade with a 0.5s transition.

## 7. Interactions & Micro-interactions
- **Scroll Behavior**: Likely "Smooth Scroll" or a custom library like Lenis for a buttery feel.
- **Cursor**: Standard pointer, but likely changes to a custom "drag" or "play" icon when hovering over the central reveal circle.
- **Focus Rings**: Not visible, but standard accessibility outlines are expected on the CTA.

## 8. Imagery, Video & Media
- **Hero Background**: Minimalist (white).
- **Portfolio Assets (inside circle/laptop)**:
  1. "BOWLS BY KO": Top-down shot of ramen/salad bowls.
  2. "Central Lake Ontario Conservation Authority": Girl smiling near a stream.
  3. "CHASE Medical": Abstract blue/purple medical graphic.
  4. "Security Community": Interior office/kitchen shot with text overlay.
- **Lifestyle Shot**: High-resolution photo of a wooden desk, white ceramic vase, dried grass, and a laptop.

## 9. Content Inventory (Verbatim)
- **Logo**: "SA SOLUTIONS"
- **Nav**: "About", "Our work", "Custom Websites", "Templates", "Ongoing support", "Contact"
- **Button**: "Get started ->"
- **Headline**: "You should be excited about your website."
- **Accent**: "No, really."
- **Screen 1**: "BOWLS BY KO", "MENU", "CATERING", "GIFT CARDS", "CONTACT"
- **Screen 2**: "Central Lake Ontario Conservation Authority", "Healthy watersheds for today and tomorrow."
- **Screen 3**: "CHASE Medical Communications, Inc.", "Your Medical Communication Experts"
- **Screen 4**: "Tap into the collective knowledge of the security community..."

## 10. Iconography & Graphic Elements
- **Style**: Minimalist line icons.
- **Elements**: 
  - Arrow icon (`->`) in CTA.
  - Dropdown caret next to "Templates".
  - Centralized "Pause" icon (`||`) for the portfolio video.
  - Accessibility icon (a small human figure in a circle) in the bottom-right corner.

## 11. Responsive & Breakpoint Hints
- **Desktop**: Multi-column nav, large typography (~80px).
- **Tablet/Mobile**: Nav likely collapses into a "Hamburger" menu. Hero text scales down to ~48px. The laptop showcase likely becomes a standard vertical scroll of images rather than a circular mask.

## 12. Likely Tech Stack
- **Framework**: **Next.js** (React) for fast performance and SEO.
- **Styling**: **Tailwind CSS** for utility-first layout and custom tokens.
- **Animation**: **GSAP (ScrollTrigger)** for the complex circular reveal and scroll-jacking.
- **Scroll**: **Lenis** for smooth, high-performance scrolling.
- **3D/Media**: Standard HTML5 `<video>` elements inside the circular masks.

## 13. Asset List
- `logo.svg` (SA SOLUTIONS).
- `hero-bg.jpg` (White placeholder or clean texture).
- `portfolio-video-1.mp4` (Bowls site).
- `portfolio-video-2.mp4` (Conservation site).
- `portfolio-video-3.mp4` (Medical site).
- `lifestyle-macbook.jpg` (High-res desk photo).
- `accessibility-icon.svg`.

## 14. Complete Clone-Build Prompt
**Prompt for AI Coding Agent:**

"Build a pixel-perfect clone of the 'SA SOLUTIONS' portfolio site using Next.js and Tailwind CSS. Implement a sophisticated scroll-reveal animation using GSAP ScrollTrigger.

**1. Setup & Tokens:**
Initialize a Next.js project. Define Tailwind colors: `brand-pink: '#F43F8E'`, `text-dark: '#111111'`, `bg-white: '#FFFFFF'`. Use 'Playfair Display' (Serif) for headlines and 'Inter' (Sans) for UI/Nav.

**2. Component Structure:**
- **Header**: Sticky top, Flexbox, Logo (left), Nav (center), CTA (right). Nav links: "About", "Our work", "Custom Websites", "Templates" (with caret), "Ongoing support", "Contact". CTA: Pill-shaped button, pink bg, white text "Get started ->".
- **Hero**: Full-height flex centered. Main text: "You should be excited about your website." (80px Playfair). Accent text: "No, really." (60px Pink Italic Playfair).

**3. The Scroll-Reveal Animation:**
Create a container for the portfolio. The 'mask' should be a `div` with `border-radius: 50%` and `overflow: hidden`. 
- Initially, this div is at the bottom of the hero, width/height: 0.
- Use GSAP ScrollTrigger with `scrub: 1.5`. As scroll progresses from 0 to 500px, animate the circle's width/height to a max of 1200px and its position to the center of the viewport.
- Inside the circle, place a video player or a series of images (Project 1: Bowls, Project 2: Conservation, etc.). Transition these images every 100px of scroll progress.

**4. Final Section:**
Transition the circular mask into a realistic MacBook Pro mockup. Use a high-quality lifestyle photo of a laptop on a wooden desk. Ensure the "MacBook Pro" text is visible.

**5. Interactions:**
Implement a smooth scroll library (Lenis). Ensure the nav links hover to pink. Add a small 'Pause' icon in the center of the circle while the scroll animation is active.

**6. Accessibility:**
Ensure all images have `alt` tags. Maintain semantic HTML (`<nav>`, `<main>`, `<header>`). Add the small blue accessibility icon in the bottom right corner as a fixed element."
