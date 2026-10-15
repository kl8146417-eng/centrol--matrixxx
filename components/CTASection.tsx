import Link from 'next/link';
import { AnimIcon } from '@/components/icons/AnimIcon';
import { agency, waLink } from '@/content/agency';

// Shared closing CTA used across pages: dark glass panel, WhatsApp + email.
export function CTASection() {
  return (
    <section className="mx-auto max-w-editorial px-5 py-20 sm:px-8 sm:py-28">
      <div data-reveal className="relative overflow-hidden rounded-[2.5rem] bg-ink-section px-7 py-16 text-white sm:px-14 sm:py-24">
        <div aria-hidden="true" className="absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full bg-accent/50 blur-[120px]" />
        <div aria-hidden="true" className="absolute -bottom-32 left-10 h-[300px] w-[300px] rounded-full bg-[#7DA2FF]/25 blur-[120px]" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/3d/rocket.webp" alt="" aria-hidden="true" loading="lazy" className="absolute bottom-6 right-6 hidden w-40 lg:block" data-parallax="-20" />
        <div className="relative">
          <p className="text-[12px] uppercase tracking-wordmark text-[#7DA2FF]">Start a project</p>
          <h2 className="mt-4 max-w-4xl font-display text-[clamp(44px,6vw,96px)] leading-[1.02]">Tell us what you&apos;re building. <span className="italic text-[#7DA2FF]">We&apos;ll take it from there.</span></h2>
          <div className="mt-10 flex flex-wrap gap-3">
            {agency.calUrl && (
              <a href={agency.calUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 rounded-full bg-white px-7 py-4 text-[16px] font-semibold text-ink transition hover:bg-[#7DA2FF]">
                Book a 15-minute call
              </a>
            )}
            <a href={waLink('Hi Centrol Matrix, I would like to talk about a project.')} target="_blank" rel="noopener noreferrer" data-icon-host className="inline-flex items-center gap-2.5 rounded-full bg-accent px-7 py-4 text-[16px] font-semibold text-white transition hover:bg-accent-dark hover:scale-[1.02]">
              <AnimIcon name="whatsapp" size={20} inView /> WhatsApp {agency.whatsappDisplay}
            </a>
            <a href="mailto:contact@centrolmatrix.com" data-icon-host className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/5 px-7 py-4 text-[16px] font-semibold text-white backdrop-blur-md transition hover:bg-white hover:text-ink">
              <AnimIcon name="mail" size={20} /> contact@centrolmatrix.com
            </a>
            <Link href="/pricing" data-icon-host className="inline-flex items-center gap-2 px-4 py-4 text-[16px] text-white/70 hover:text-white">
              Or order a package <AnimIcon name="arrow" size={18} />
            </Link>
          </div>
          <p className="mt-6 text-[14px] text-white/50">No call needed to order: fixed-price packages, pay now or later. We reply on WhatsApp and email within one working day.</p>
        </div>
      </div>
    </section>
  );
}
