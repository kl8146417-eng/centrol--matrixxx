# Project instructions — agwnyc website

This is a boutique web-design agency site (brand: **SA Solutions**). The whole point of this
project is that the site must **NOT look AI-generated**. No generic AI feel, AI colors, AI
fonts, or canned AI animations.

## Installed skills

Skills live in `.agents/skills/`. Read the matching `SKILL.md` and follow it before doing the
related work.

### Design & build (pick the closest fit)

| When the task is... | Use this skill |
|---|---|
| Building/styling any page, component, hero, or UI | `.agents/skills/frontend-design/SKILL.md` |
| Advanced UI/UX patterns for complex interfaces & interaction design | `.agents/skills/ui-ux-pro-max/SKILL.md` |
| Landing pages, portfolios, or full redesigns (taste-first) | `.agents/skills/design-taste-frontend/SKILL.md` |
| Earlier/alternate taste-first ruleset | `.agents/skills/design-taste-frontend-v1/SKILL.md` |
| Design/redesign/polish of an interface (full workflow) | `.agents/skills/impeccable/SKILL.md` |
| Award-level, premium/immersive UI craft | `.agents/skills/premium-frontend-ui/SKILL.md` |
| Production UI engineering (a11y, perf, design-system) | `.agents/skills/frontend-ui-engineering/SKILL.md` |
| Cloning a screenshot/video into a polished UI | `.agents/skills/ck-frontend-design/SKILL.md` |
| Generating imagery/assets for web UI | `.agents/skills/imagegen-frontend-web/SKILL.md` |
| Generating imagery/assets for mobile UI | `.agents/skills/imagegen-frontend-mobile/SKILL.md` |

### Anti-slop & quality (run these over diffs and copy)

| When the task is... | Use this skill |
|---|---|
| Reviewing content/code/design for generic "AI slop" | `.agents/skills/anti-slop/SKILL.md` |
| Scoring slop density in text/docs | `.agents/skills/slop-detector/SKILL.md` |
| Cleaning AI slop out of existing code (safe refactor) | `.agents/skills/ai-slop-cleaner/SKILL.md` |
| Removing AI slop introduced on the current branch | `.agents/skills/deslop/SKILL.md` (variants: `deslop-cursor`, `deslop-rawkode`, `slop`) |
| Honest human+AI content workflow / voice ownership | `.agents/skills/ai-content-collaboration/SKILL.md` |

### Code review & structure

| When the task is... | Use this skill |
|---|---|
| Reviewing frontend code (.tsx/.ts/.js) | `.agents/skills/frontend-code-review/SKILL.md` |
| Writing/auditing frontend tests | `.agents/skills/frontend-testing/SKILL.md` |
| Senior-clean (Angular-flavored) code patterns | `.agents/skills/workflow-clean-code-angular/SKILL.md` |
| Splitting the app into microfrontends (Vercel) | `.agents/skills/vercel-microfrontends/SKILL.md` |

## Hard rules — avoid the "AI look"

Every change to markup, CSS, or copy must respect these. They override defaults.

- **Fonts:** No generic LLM-default fonts (Inter-everywhere, plain system serif as a "display"
  font, Poppins, generic Google-font pairings). Pick an intentional, distinctive pairing.
  The current design uses a real editorial serif display + a clean sans for UI — keep it
  intentional, never default.
- **Color:** No clichéd AI palettes — no purple/indigo→blue gradients, no beige+brass
  "premium" cliché, no generic teal SaaS gradient. Use a committed palette with one confident
  accent (this site uses near-black ink on white with a single hot-pink accent).
- **Animation:** No gratuitous fade-up-on-scroll on everything, no generic "float" loops, no
  default ease everywhere. Motion must be justified, purposeful, and tied to the editorial tone.
- **Layout:** No three-equal-feature-cards, no cookie-cutter centered hero + 3 columns + CTA
  template. Favor bold, opinionated, editorial composition with real whitespace.
- **Copy:** No em-dashes as a stylistic tic, no "delve into", "elevate", "seamless",
  "unlock", "in today's fast-paced world", or buzzword filler. Write like a confident human.
  Audit every visible string for AI tells and for hallucinated/placeholder facts.

## Before shipping any UI

1. Read the relevant `SKILL.md` first.
2. Run an anti-slop pass (see `anti-slop` / `deslop`) over the diff.
3. Confirm fonts, colors, animation, layout, and copy all pass the rules above.
