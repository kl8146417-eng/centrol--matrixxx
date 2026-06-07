import Link from 'next/link';
import { nav, site, work } from '@/content/site';
import { Logo } from '@/components/Logo';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-ink-section text-white">
      <div className="mx-auto max-w-editorial px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo className="mb-7 h-8 w-auto text-white" title={`${site.name} logo`} />
            <p className="font-display text-3xl leading-tight">
              Tell us what you&apos;re building.
            </p>
            <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-white/70">
              {site.description}
            </p>
            <a
              href={`mailto:${site.email}`}
              className="mt-6 inline-block text-[15px] text-accent underline-offset-4 hover:underline"
            >
              {site.email}
            </a>
          </div>

          <nav aria-label="Footer">
            <p className="text-[12px] uppercase tracking-wordmark text-white/40">Studio</p>
            <ul className="mt-4 space-y-2.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[15px] text-white/80 transition-opacity hover:opacity-60"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-[12px] uppercase tracking-wordmark text-white/40">Work</p>
            <ul className="mt-4 space-y-2.5">
              {work.map((w) => (
                <li key={w.name} className="text-[15px] text-white/80">
                  {w.name}
                </li>
              ))}
            </ul>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block text-[15px] text-white/80 transition-opacity hover:opacity-60"
            >
              LinkedIn
            </a>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-white/10 pt-6 text-[13px] text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {year} {site.name}. All rights reserved.
          </span>
          <span className="font-display italic text-accent">Made by hand.</span>
        </div>
      </div>
    </footer>
  );
}
