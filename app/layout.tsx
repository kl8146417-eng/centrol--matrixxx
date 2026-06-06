import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import { LenisProvider } from '@/components/LenisProvider';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { Analytics } from '@/components/Analytics';
import { site } from '@/content/site';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — websites, content engines, AI automation`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: 'website',
    siteName: site.name,
    title: `${site.name} — websites, content engines, AI automation`,
    description: site.description,
    url: site.url,
  },
  twitter: {
    card: 'summary_large_image',
    title: site.name,
    description: site.description,
  },
  alternates: { canonical: '/' },
  verification: process.env.NEXT_PUBLIC_SEARCH_CONSOLE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_SEARCH_CONSOLE_VERIFICATION }
    : undefined,
};

const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: site.name,
  url: site.url,
  email: site.email,
  sameAs: [site.linkedin],
  description: site.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="bg-bg text-ink font-sans antialiased">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <LenisProvider>
          <Nav />
          <main id="main">{children}</main>
          <Footer />
        </LenisProvider>
        <Analytics />
      </body>
    </html>
  );
}
