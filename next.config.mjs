// Blog posts taken off the site in v6 (see content/blog-unpublished.ts). Listed here as plain strings
// because next.config can't import TypeScript; keep the two lists in sync.
const UNPUBLISHED_BLOG_SLUGS = [
  'how-to-sell-ai-websites-for-5000',
  'sell-ai-websites-for-5000-realistic-path-by-2028',
  'six-figures-selling-information-products',
  'build-saas-with-claude',
  'build-saas-with-claude-for-20-a-month-one-laptop-workflow',
  'ai-generated-cartoon-20000',
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      // Placeholder logo source (Centrol Matrix mark on LinkedIn CDN).
      // Replace with self-hosted /public/logo.svg once the final mark is approved.
      { protocol: 'https', hostname: 'media.licdn.com' },
    ],
  },
  // Every old URL keeps working. These are 301s (Next's `permanent: true` would send 308).
  async redirects() {
    return [
      ...UNPUBLISHED_BLOG_SLUGS.map((slug) => ({ source: `/blog/${slug}`, destination: '/blog', statusCode: 301 })),
      // Likely-typed aliases for the outreach landing page.
      { source: '/free-audit', destination: '/audit', statusCode: 301 },
      { source: '/site-audit', destination: '/audit', statusCode: 301 },
      { source: '/store-audit', destination: '/audit', statusCode: 301 },
    ];
  },
};

export default nextConfig;
