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
};

export default nextConfig;
