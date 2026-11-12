// Posts taken off the site on 2026-11-13 (v6): off-topic for an e-commerce studio (course-seller /
// side-hustle content) or near-duplicates. Rows stay in the database untouched; they're filtered out of
// every public read (blog index, post pages, API, RSS, sitemap), and next.config.mjs 301s each URL to /blog.
// To also mark them `draft` in the database, run `CM_BLOG_TOKEN=... node scripts/blog-unpublish.mjs`.
// To bring one back: remove it here and from the redirects, then redeploy.
export const UNPUBLISHED_SLUGS: string[] = [
  'how-to-sell-ai-websites-for-5000', // "How to Sell AI Websites for $5000 in 2025"
  'sell-ai-websites-for-5000-realistic-path-by-2028', // near-duplicate of the above
  'six-figures-selling-information-products', // "Six Figures Selling Information Products"
  'build-saas-with-claude', // "Build SaaS with Claude on $20 a Month"
  'build-saas-with-claude-for-20-a-month-one-laptop-workflow', // near-duplicate of the above
  'ai-generated-cartoon-20000', // "How One Creator Made $20k From an AI-Generated Cartoon"
];
