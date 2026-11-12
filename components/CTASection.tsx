import Link from 'next/link';
import { AnimIcon } from '@/components/icons/AnimIcon';
import { agency } from '@/content/agency';
import { PhoneLine } from '@/components/PhoneLine';
import { AUDIT_TURNAROUND } from '@/content/audit';

// Shared closing CTA: the free audit first, then a person to talk to.
export function CTASection({ title, accent }: { title?: string; accent?: string }) {
  return (
    <section className="mx-auto max-w-editorial px-5 py-20 sm:px-8 sm:py-28">
      <div data-reveal className="relative overflow-hidden rounded-[2rem] bg-ink-section px-6 py-14 text-white sm:rounded-[2.5rem] sm:px-14 sm:py-20">
        <div aria-hidden="true" className="absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full bg-accent/50 blur-[120px]" />
        <div className="relative grid gap-12 lg:grid-cols-[1.6fr_1fr] lg:items-end">
          <div>
            <p className="text-[12px] uppercase tracking-wordmark text-[#7DA2FF]">Start here</p>
            <h2 className="mt-4 max-w-3xl font-display text-[clamp(38px,5.4vw,84px)] leading-[1.03]">
              {title ?? 'See what’s wrong with your store.'} <span className="italic text-[#7DA2FF]">{accent ?? 'The audit is free.'}</span>
            </h2>
            <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-white/70">Send your store link. Asutosh emails a plain-English report within {AUDIT_TURNAROUND}: what to fix first, and what we’d charge to fix it if you want us to.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/audit" data-icon-host data-track="audit_cta" data-track-label="cta-band" className="inline-flex min-h-[52px] items-center gap-2 rounded-full bg-white px-7 text-[16px] font-semibold text-ink transition hover:bg-[#7DA2FF]">
                Get a free site audit <AnimIcon name="arrow" size={18} />
              </Link>
              <Link href="/pricing" className="inline-flex min-h-[52px] items-center rounded-full border border-white/20 px-7 text-[16px] font-semibold text-white transition hover:bg-white hover:text-ink">See prices</Link>
            </div>
          </div>
          <div className="space-y-4 border-t border-white/15 pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            <p className="text-[12px] uppercase tracking-wordmark text-white/50">Or talk to Asutosh</p>
            <PhoneLine dark />
            <a href={`mailto:${agency.email}`} className="inline-flex min-h-[44px] items-center text-[16px] text-[#7DA2FF] underline-offset-4 hover:underline">{agency.email}</a>
          </div>
        </div>
      </div>
    </section>
  );
}
