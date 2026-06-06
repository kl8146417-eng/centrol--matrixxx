import Link from 'next/link';
import { site } from '@/content/site';

export function CTASection() {
  return (
    <section className="mx-auto max-w-editorial px-5 py-24 sm:px-8 sm:py-32">
      <div className="border-t border-ink/10 pt-12">
        <h2 className="max-w-3xl font-display text-display-md text-ink">
          Got something you want built right?{' '}
          <span className="italic text-accent">Let&apos;s start.</span>
        </h2>
        <div className="mt-9 flex flex-wrap items-center gap-5">
          <Link
            href="/contact"
            className="rounded-full bg-accent px-6 py-3.5 text-[15px] font-semibold text-white transition-[transform,background-color] duration-200 hover:bg-accent-dark hover:scale-[1.02] active:scale-[0.98]"
          >
            Start a project
          </Link>
          <a
            href={`mailto:${site.email}`}
            className="text-[15px] text-ink underline-offset-4 transition-opacity hover:opacity-60 hover:underline"
          >
            or email {site.email}
          </a>
        </div>
      </div>
    </section>
  );
}
