'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { nav, site } from '@/content/site';
import { Logo } from '@/components/Logo';

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 bg-bg/90 backdrop-blur-sm transition-shadow ${
        scrolled ? 'shadow-[0_1px_0_rgba(14,14,14,0.10)]' : ''
      }`}
    >
      <div className="mx-auto flex h-16 max-w-editorial items-center justify-between px-5 sm:px-8">
        <Link href="/" className="group flex items-center gap-3" aria-label={`${site.name} home`}>
          <Logo className="h-7 w-auto text-ink transition-opacity duration-200 group-hover:opacity-60" />
          <span className="hidden text-[13px] font-medium uppercase tracking-wordmark text-ink sm:inline">
            {site.wordmark}
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[15px] font-medium text-ink transition-opacity duration-200 hover:opacity-60"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="rounded-full bg-accent px-5 py-2.5 text-[15px] font-semibold text-white transition-[transform,background-color] duration-200 hover:bg-accent-dark hover:scale-[1.02] active:scale-[0.98]"
          >
            Start a project
          </Link>
        </nav>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="relative block h-[14px] w-6">
            <span
              className={`absolute left-0 block h-[2px] w-6 bg-ink transition-transform duration-200 ${
                open ? 'top-1.5 rotate-45' : 'top-0'
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 block h-[2px] w-6 bg-ink transition-opacity duration-200 ${
                open ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`absolute left-0 block h-[2px] w-6 bg-ink transition-transform duration-200 ${
                open ? 'top-1.5 -rotate-45' : 'top-3'
              }`}
            />
          </span>
        </button>
      </div>

      {open && (
        <nav
          className="border-t border-ink/10 bg-bg px-5 pb-6 pt-2 md:hidden"
          aria-label="Mobile"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block border-b border-ink/5 py-3 text-lg font-medium text-ink"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="mt-4 inline-block rounded-full bg-accent px-5 py-3 text-[15px] font-semibold text-white"
          >
            Start a project
          </Link>
        </nav>
      )}
    </header>
  );
}
