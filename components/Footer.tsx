import Link from 'next/link';
import { nav, footerMore, site } from '@/content/site';
import { Logo } from '@/components/Logo';
import { agency, waLink } from '@/content/agency';
import { PhoneLine } from '@/components/PhoneLine';

const linkCls = 'inline-flex min-h-[44px] items-center text-[15px] text-white/80 transition-opacity hover:opacity-60';

function FooterLink({ href, label }: { href: string; label: string }) {
  const ext = href.startsWith('http');
  return ext
    ? <a href={href} className={linkCls}>{label} <span aria-hidden="true" className="ml-1 text-white/40">↗</span></a>
    : <Link href={href} className={linkCls}>{label}</Link>;
}

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="overflow-hidden bg-ink-section text-white">
      <div className="mx-auto max-w-editorial px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
          <div>
            <Logo className="mb-7 h-8 w-auto text-white" title={`${site.name} logo`} />
            <p className="font-display text-3xl leading-tight">Product photos, UGC ads and Shopify fixes for e-commerce brands.</p>
            <Link href="/audit" className="mt-6 inline-flex min-h-[48px] items-center rounded-full bg-white px-6 text-[15px] font-semibold text-ink transition hover:bg-[#7DA2FF]">Get a free site audit</Link>
          </div>

          <nav aria-label="Footer">
            <p className="text-[12px] uppercase tracking-wordmark text-white/40">Studio</p>
            <ul className="mt-3">
              {nav.map((item) => <li key={item.href}><FooterLink {...item} /></li>)}
            </ul>
          </nav>

          <nav aria-label="More from Centrol Matrix">
            <p className="text-[12px] uppercase tracking-wordmark text-white/40">More</p>
            <ul className="mt-3">
              {footerMore.map((item) => <li key={item.href}><FooterLink {...item} /></li>)}
            </ul>
          </nav>

          <div>
            <p className="text-[12px] uppercase tracking-wordmark text-white/40">Talk to Asutosh</p>
            <div className="mt-3 space-y-3">
              <PhoneLine dark size="sm" />
              <a href={`mailto:${site.email}`} className="inline-flex min-h-[44px] items-center text-[15px] text-[#7DA2FF] underline-offset-4 hover:underline">{site.email}</a>
              <p className="flex flex-wrap gap-x-5">
                <a href={waLink()} target="_blank" rel="noopener noreferrer" className={linkCls}>WhatsApp {agency.whatsappDisplay}</a>
                <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className={linkCls}>LinkedIn</a>
              </p>
            </div>
          </div>
        </div>

        <p aria-hidden="true" className="mt-16 select-none whitespace-nowrap font-display text-[clamp(40px,12.5vw,220px)] leading-[0.85] tracking-tight text-white/[0.07]">Centrol Matrix</p>
        <div className="mt-6 flex flex-col gap-2 border-t border-white/10 pt-4 text-[13px] text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <span>© {year} {site.name}. All rights reserved.</span>
          <span className="flex flex-wrap gap-x-5">
            {[['Terms', '/terms'], ['Privacy', '/privacy'], ['Refunds', '/refunds'], ['Delivery', '/delivery']].map(([l, h]) => (
              <Link key={h} href={h} className="inline-flex min-h-[44px] items-center hover:text-white/80">{l}</Link>
            ))}
          </span>
        </div>
      </div>
    </footer>
  );
}
