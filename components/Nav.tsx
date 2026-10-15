'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { nav, site } from '@/content/site';
import { Logo } from '@/components/Logo';
import { CartButton } from '@/components/CartDrawer';
import { AnimIcon } from '@/components/icons/AnimIcon';

// Pages whose first screen is light (no dark page header).
const LIGHT_TOP = ['/checkout', '/order', '/terms', '/privacy', '/refunds', '/delivery', '/admin', '/blog/', '/work/orva'];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const path = usePathname() || '/';
  const darkTop = !LIGHT_TOP.some((p) => path.startsWith(p));
  const onDark = darkTop && !scrolled && !open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => setOpen(false), [path]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
      <div
        className={`mx-auto flex h-14 max-w-editorial items-center justify-between rounded-full border pl-5 pr-2 transition-all duration-300 ${
          onDark ? 'border-white/10 bg-white/[0.06] text-white backdrop-blur-md' : 'border-ink/10 bg-white/80 text-ink shadow-[0_10px_30px_-12px_rgba(14,14,14,0.18)] backdrop-blur-xl'
        }`}
      >
        <Link href="/" className="group flex items-center gap-3" aria-label={`${site.name} home`}>
          <Logo className="h-6 w-auto transition-opacity duration-200 group-hover:opacity-60" />
          <span className="hidden text-[12px] font-medium uppercase tracking-wordmark xl:inline">{site.wordmark}</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {nav.map((item) => {
            const active = path.startsWith(item.href);
            return (
              <Link key={item.href} href={item.href} aria-current={active ? 'page' : undefined}
                className={`rounded-full px-3.5 py-2 text-[14px] font-medium transition-colors ${active ? (onDark ? 'bg-white/15' : 'bg-ink/[0.06]') : onDark ? 'hover:bg-white/10' : 'hover:bg-ink/[0.05]'}`}>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <CartButton />
          <Link href="/contact" data-icon-host className="hidden items-center gap-1.5 rounded-full bg-accent px-5 py-2.5 text-[14px] font-semibold text-white transition hover:bg-accent-dark sm:inline-flex">
            Start a project <AnimIcon name="arrowUR" size={16} inView />
          </Link>
          <button type="button" className="flex h-10 w-10 items-center justify-center lg:hidden" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen((v) => !v)}>
            <span className="relative block h-[14px] w-6">
              <span className={`absolute left-0 block h-[2px] w-6 bg-current transition-transform duration-200 ${open ? 'top-1.5 rotate-45' : 'top-0'}`} />
              <span className={`absolute left-0 top-1.5 block h-[2px] w-6 bg-current transition-opacity duration-200 ${open ? 'opacity-0' : 'opacity-100'}`} />
              <span className={`absolute left-0 block h-[2px] w-6 bg-current transition-transform duration-200 ${open ? 'top-1.5 -rotate-45' : 'top-3'}`} />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <nav className="mx-auto mt-2 max-w-editorial rounded-3xl border border-ink/10 bg-white/95 p-4 text-ink shadow-xl backdrop-blur-xl lg:hidden" aria-label="Mobile">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="block rounded-2xl px-4 py-3 font-display text-2xl hover:bg-ink/5">{item.label}</Link>
          ))}
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <Link href="/contact" className="rounded-full bg-accent px-5 py-3 text-center text-[15px] font-semibold text-white">Start a project</Link>
            <a href="https://wa.me/639515680964" target="_blank" rel="noopener noreferrer" className="rounded-full border border-ink/15 px-5 py-3 text-center text-[15px] font-semibold">WhatsApp us</a>
          </div>
        </nav>
      )}
    </header>
  );
}
