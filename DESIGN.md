# Centrol Matrix design system (v4)

- **Colour:** ink `#0E0E0E`, dark sections `#0B0B0C`, accent blue `#1D4ED8` (hover `#1740A6`), accent-on-dark `#7DA2FF`, warm surface `#F4F4F2`, white.
- **Type:** Playfair Display (display, italics in accent colour for the emphasised phrase), Inter (UI/body). Eyebrows: 12px uppercase, wide tracking.
- **Shape:** rounded-full buttons and nav pill; cards `rounded-3xl`, feature panels `rounded-[2rem]`+.
- **Surfaces:** dark bands with a single blurred blue glow; glass chips = `bg-white/10 border-white/20 backdrop-blur-md` + inner top highlight. No glass on light backgrounds except the scrolled nav.
- **Motion:** GSAP + Lenis. `[data-reveal]` fade-up, `[data-stagger]` children, `[data-parallax]` subtle drift. Icons: lucide-animated on hover and once in view. Everything off under `prefers-reduced-motion`.
- **Media:** real work only (published videos, store screenshots). Videos load/play only in view. No invented stats, logos or testimonials.
- **Layout:** `max-w-editorial` (1320px), 20px/32px gutters, section padding 96–128px.
