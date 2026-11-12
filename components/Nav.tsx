'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { nav, site } from '@/content/site';
import { Logo } from '@/components/Logo';
import { CartButton } from '@/components/CartDrawer';
import { AnimIcon } from '@/components/icons/AnimIcon';
import { PhoneLine } from '@/components/PhoneLine';

// Pages whose first screen is light (no dark page header).
const LIGHT_TOP = ['/audit', '/fashion', '/for/', '/checkout', '/order', '/terms', '/privacy', '/refunds', '/delivery', '/admin', '/blog/', '/work/orva'];
// The audit is the nav's call to action, so the desktop link list leaves it out.
const desktopLinks = nav.filter((n) => n.href !== '/audit');

type LenisLike = { stop: () => void; start: () => void };

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const path = usePathname() || '/';
  const sheet = useRef<HTMLDivElement>(null);
  const darkTop = path !== '/' && !LIGHT_TOP.some((p) => path.startsWith(p));
  const onDark = darkTop && !scrolled && !open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => setOpen(false), [path]);

  // Menu sheet: lock page scroll, close on Escape, move focus into the sheet.
  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: LenisLike }).__lenis;
    if (!open) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    lenis?.stop();
    sheet.current?.querySelector<HTMLElement>('a')?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.documentElement.style.overflow = prev;
      lenis?.start();
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
      <div
        className={`relative z-10 mx-auto flex h-14 max-w-editorial items-center justify-between gap-2 rounded-full border pl-4 pr-1.5 transition-all duration-300 sm:pl-5 ${
          onDark ? 'border-white/10 bg-white/[0.06] text-white backdrop-blur-md' : 'border-ink/10 bg-white/90 text-ink shadow-[0_10px_30px_-12px_rgba(14,14,14,0.18)] backdrop-blur-xl'
        }`}
      >
        <Link href="/" className="group flex min-h-[44px] min-w-[44px] items-center gap-3" aria-label={`${site.name} home`}>
          <Logo className="h-6 w-auto transition-opacity duration-200 group-hover:opacity-60" />
          <span className="hidden text-[12px] font-medium uppercase tracking-wordmark xl:inline">{site.wordmark}</span>
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
          {desktopLinks.map((item) => {
            const active = path.startsWith(item.href);
            return (
              <Link key={item.href} href={item.href} aria-current={active ? 'page' : undefined}
                className={`flex min-h-[44px] items-center rounded-full px-3.5 text-[14px] font-medium transition-colors ${active ? (onDark ? 'bg-white/15' : 'bg-ink/[0.06]') : onDark ? 'hover:bg-white/10' : 'hover:bg-ink/[0.05]'}`}>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1.5">
          <CartButton />
          <Link href="/audit" data-icon-host data-track="audit_cta" data-track-label="nav"
            className="inline-flex min-h-[44px] items-center gap-1.5 whitespace-nowrap rounded-full bg-accent px-4 text-[14px] font-semibold text-white transition hover:bg-accent-dark sm:px-5">
            <span className="sm:hidden">Free audit</span><span className="hidden sm:inline">Free site audit</span>
            <AnimIcon name="arrowUR" size={16} className="hidden sm:inline-flex" />
          </Link>
          <button type="button" className="flex h-11 w-11 items-center justify-center rounded-full lg:hidden" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen((v) => !v)}>
            <span className="relative block h-[14px] w-6">
              <span className={`absolute left-0 block h-[2px] w-6 bg-current transition-transform duration-200 ${open ? 'top-1.5 rotate-45' : 'top-0'}`} />
              <span className={`absolute left-0 top-1.5 block h-[2px] w-6 bg-current transition-opacity duration-200 ${open ? 'opacity-0' : 'opacity-100'}`} />
              <span className={`absolute left-0 block h-[2px] w-6 bg-current transition-transform duration-200 ${open ? 'top-1.5 -rotate-45' : 'top-3'}`} />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-menu" ref={sheet} className="fixed inset-0 overflow-y-auto bg-[#F4F4F2] px-5 pb-10 pt-[5.5rem] text-ink lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <nav aria-label="Mobile" className="mx-auto max-w-lg">
            <ul className="divide-y divide-ink/10 border-y border-ink/10">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} aria-current={path.startsWith(item.href) ? 'page' : undefined}
                    className="flex min-h-[60px] items-center justify-between font-display text-[28px] leading-none">
                    {item.label}<span aria-hidden="true" className="text-[18px] text-accent">→</span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/audit" className="mt-8 flex min-h-[52px] items-center justify-center rounded-full bg-accent px-6 text-[16px] font-semibold text-white">Get a free site audit</Link>
            <div className="mt-8 grid gap-5">
              <PhoneLine />
              <a href={`mailto:${site.email}`} className="inline-flex min-h-[44px] items-center text-[16px] text-accent underline-offset-4 hover:underline">{site.email}</a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
