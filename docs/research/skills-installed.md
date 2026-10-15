# Skills installed to ~/.claude/skills (68 new, 121 -> 189; no existing folder touched, no name collisions)

All 68 have a SKILL.md whose YAML frontmatter parses, with `name` and `description` (checked with js-yaml).

| Skills | Source | Purpose |
|---|---|---|
| hand-drawn-canvas-animation | alesha-pro/tools | Hand-drawn Canvas 2D short films (ink, pencil, sand, pop-up paper) |
| brag, brag-slim | latent-spaces/brag | Turn a project or URL into a 20s launch video (Hyperframes version / lean version) |
| web-design | xiaopu-ai/web-design | Chinese-language skill: writes a DESIGN.md spec, then builds landing and portfolio pages |
| taste-skill, taste-skill-v1, taste-skill-v2-experimental, gpt-tasteskill, soft-skill, minimalist-skill, brutalist-skill, redesign-skill, stitch-skill, output-skill, image-to-code-skill, imagegen-frontend-web, imagegen-frontend-mobile, brandkit | leonxlnx/taste-skill | Rules against generic AI-looking frontends, style presets, redesigns, image-first design comps, brand kits |
| frontend-design, canvas-design, algorithmic-art, theme-factory, brand-guidelines, web-artifacts-builder, webapp-testing | anthropics/skills | Official Anthropic design, art, theming and Playwright testing skills |
| impeccable | pbakaus/impeccable | Design, critique, polish and audit commands (one consolidated skill in the current version) |
| ui-ux-pro-max, design, design-system, brand, banner-design, ui-styling, slides | nextlevelbuilder/ui-ux-pro-max-skill | Searchable data of UI styles, palettes and fonts; design tokens; banners; shadcn styling; HTML slides |
| frontend-ui-engineering | addyosmani/agent-skills | Production-quality accessible UI engineering |
| premium-frontend-ui | github/awesome-copilot | Polished web UI with advanced motion and typography |
| anti-slop | rand/cc-polymath | Finds generic AI patterns in text, code and design |
| deslop | brianlovin/claude-config | Removes AI-generated clutter from code on a branch |
| emil-design-eng, animate, review-animations, improve-animations, find-animation-opportunities, animation-vocabulary, animation-performance, apple-design, pick-ui-library | emilkowalski/skills | Emil Kowalski's design-engineering and animation skills |
| product-marketing, copywriting, copy-editing, cro, cold-email, emails, ad-creative, seo-audit, ai-seo, programmatic-seo, marketing-psychology, launch | coreyhaines31/marketingskills | Marketing: CRO, copywriting, cold email, ads, SEO, launches |
| shadcn | shadcn-ui/ui | Official shadcn/ui component skill |
| vercel-react-view-transitions | vercel-labs/agent-skills | React View Transition animations |
| better-ui, better-typography, better-colors | jakubkrehel/skills | Exact values for polish, type and color systems |
| accessibility, core-web-vitals, web-quality-audit | addyosmani/web-quality-skills | WCAG audits, Core Web Vitals, Lighthouse-style audits |
| design-motion-principles | kylezantos/design-motion-principles | Builds and audits motion in the style of Emil Kowalski, Jakub Krehel and Jhey Tompkins |
| landing-page-conversion-audit | autonnel/autonnel-skills | Landing page conversion-leak audit |

## Notes and skips
- **latent-spaces/brag** is a launch-video generator (letsbrag.app), not a design-taste skill. Installed because it ships skills.
- **impeccable**: `scripts/impeccable` downloads its engine binary from the impeccable GitHub releases and checks it against a sha256 the first time it runs. Nothing was run during install. Delete the folder if that is not acceptable.
- No skill was rejected as malicious. Scripts in hand-drawn-canvas-animation, taste-skill, ui-ux-pro-max and webapp-testing only run local tools. Docs mention normal project commands (npx shadcn, pip install). None of these scripts were run.
- Not installed on purpose:
  - Non-design skills: anthropics docx/pdf/pptx/xlsx (already available as the anthropic-skills plugin), and the rest of addyosmani/agent-skills and brianlovin/claude-config.
  - Emil's ask-sonner, write-swift, mobile-native, animate-expo, break-ui and prototype.
  - Corey's other ~38 marketing skills.
  - copilot anti-ui-slop and addyosmani seo (they overlap skills already installed).
  - skills.sh "superpowers ai-video" clones (dozens of near-identical copies under different owners).
- The skills CLI (`npx skills add`) was not used. Folders were copied by hand so nothing existing could be overwritten.
