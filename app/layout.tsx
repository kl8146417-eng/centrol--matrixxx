import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import { LenisProvider } from '@/components/LenisProvider';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { Analytics } from '@/components/Analytics';
import { CartProvider } from '@/lib/cart';
import { CartDrawer } from '@/components/CartDrawer';
import { MotionRoot } from '@/components/icons/MotionRoot';
import { Reveal } from '@/components/motion/Reveal';
import { site } from '@/content/site';
import { agency } from '@/content/agency';

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
  metadataBase: new URL('https://centrolmatrix.com'),
  title: {
    default: `${site.name}: websites, apps, UGC ads & product shoots`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    siteName: site.name,
    title: `${site.name}: websites, apps, UGC ads & product shoots`,
    description: site.description,
    url: 'https://centrolmatrix.com',
    images: [{ url: 'https://centrolmatrix.com/og/default.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: site.name,
    description: site.description,
  },
  verification: process.env.NEXT_PUBLIC_SEARCH_CONSOLE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_SEARCH_CONSOLE_VERIFICATION }
    : undefined,
};

const orgJsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://centrolmatrix.com/#org',
    name: site.name,
    url: 'https://centrolmatrix.com',
    logo: 'https://centrolmatrix.com/android-chrome-512x512.png',
    email: site.email,
    sameAs: [site.linkedin],
    description: site.description,
    contactPoint: [{ '@type': 'ContactPoint', contactType: 'sales', email: site.email, telephone: agency.phone, availableLanguage: ['English'] }],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://centrolmatrix.com/#website',
    name: site.name,
    url: 'https://centrolmatrix.com',
    publisher: { '@id': 'https://centrolmatrix.com/#org' },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Main navigation',
    itemListElement: [['Work', '/work'], ['Services', '/services'], ['Pricing', '/pricing'], ['Apps', '/apps'], ['Websites', '/websites'], ['About', '/about'], ['Contact', '/contact']].map(([name, path], i) => ({
      '@type': 'SiteNavigationElement', position: i + 1, name, url: `https://centrolmatrix.com${path}`,
    })),
  },
];

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
        <MotionRoot>
        <CartProvider>
        <LenisProvider>
          <Nav />
          <main id="main">{children}</main>
          <Footer />
        </LenisProvider>
        <CartDrawer />
        </CartProvider>
        <Reveal />
        </MotionRoot>
        <Analytics />
      </body>
    </html>
  );
}
