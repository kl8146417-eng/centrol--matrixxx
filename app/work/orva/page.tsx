import type { Metadata } from 'next';
import Link from 'next/link';
import shots from '@/public/work/orva/shots.json';
import { agency } from '@/content/agency';
import { CTASection } from '@/components/CTASection';
import { OrvaCta } from '@/components/shop/OrvaCta';

export const metadata: Metadata = {
  title: 'ORVA case study',
  description: 'How we built ORVA, an interactive hanging-rail clothing storefront with AI product photography: quick view, product pages, cart, mobile-first.',
  alternates: { canonical: '/work/orva' },
};
type Shot = { src: string; sm: string; w: number; h: number; title: string; mobile: boolean };
const BUILT = [
  ['The hanging rail', 'Garments hang on a real rail and turn on hover, drag or swipe. A 3D-feeling product carousel built from photo turntables, not a WebGL heavyweight.'],
  ['Quick view', 'Click a garment to pull it off the rail into a quick view with front/back, sizes and add-to-bag, without leaving the page.'],
  ['Product pages', 'Editorial product pages with front/back views and detail crops, size selection, sticky add-to-cart on mobile and related products.'],
  ['Cart & checkout UX', 'Slide-out cart drawer, free-shipping threshold messaging and a clean demo checkout flow, ready to wire to Shopify or Stripe.'],
  ['AI product photo pipeline', '24 on-hanger product photos generated, then cut out and relit by our pipeline into turntable frames, cards and quick-view assets.'],
  ['Mobile first', 'Swipeable rail with auto-glide, thumb-reachable actions and fast WebP assets. Most fashion traffic is on a phone.'],
];

export default function OrvaPage() {
  const all = shots as Shot[];
  const desk = all.filter((s) => !s.mobile); const mob = all.filter((s) => s.mobile);
  return (
    <>
      <header className="mx-auto max-w-editorial px-5 pb-12 pt-32 sm:px-8 sm:pt-40">
        <p className="text-[12px] uppercase tracking-wordmark text-accent"><Link href="/work" className="underline">Work</Link> / Case study</p>
        <h1 className="mt-5 max-w-4xl font-display text-display-xl text-ink">ORVA: a storefront you can <span className="italic text-accent">browse like a rail.</span></h1>
        <dl className="mt-10 grid gap-6 text-[15px] sm:grid-cols-4">
          {[['Client', 'ORVA, our in-house concept label'], ['Scope', 'Storefront design & build, product photography, art direction'], ['Timeline', '14 days'], ['Stack', 'React + TypeScript, custom photo pipeline']].map(([k, v]) => (
            <div key={k}><dt className="text-[12px] uppercase tracking-wordmark text-muted">{k}</dt><dd className="mt-1 text-ink">{v}</dd></div>
          ))}
        </dl>
        <div className="mt-10 flex flex-wrap gap-3">
          {agency.demo.url && <a href={agency.demo.url} target="_blank" rel="noopener noreferrer" className="rounded-full bg-ink px-6 py-3 font-semibold text-white">Open the live demo ↗</a>}
          <OrvaCta />
        </div>
      </header>
      <section className="mx-auto max-w-editorial px-5 sm:px-8">
        <video src="/work/orva/orva-desktop.mp4" poster="/work/orva/orva-desktop-poster.webp" autoPlay muted loop playsInline className="w-full rounded-2xl border border-ink/10" />
      </section>
      <section className="mx-auto grid max-w-editorial gap-10 px-5 py-20 sm:px-8 md:grid-cols-2">
        <h2 className="font-display text-display-md text-ink">Most clothing sites look the same: a hero banner and a grid.</h2>
        <div className="space-y-4 text-[17px] leading-relaxed text-ink-soft">
          <p>We wanted the first screen to feel like walking into a store. Clothes hang on a rail, you brush past them, and the one you touch turns towards you.</p>
          <p className="text-muted">ORVA is a concept brand we built end to end to prove the format: storefront, product photography and creative.</p>
        </div>
      </section>
      <section className="mx-auto max-w-editorial px-5 pb-20 sm:px-8">
        <div className="grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {BUILT.map(([t, c]) => <div key={t} className="border-t border-ink/10 pt-5"><h3 className="font-display text-2xl text-ink">{t}</h3><p className="mt-3 text-[15px] leading-relaxed text-muted">{c}</p></div>)}
        </div>
      </section>
      <section className="mx-auto max-w-editorial space-y-6 px-5 pb-20 sm:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {desk.map((s, i) => <figure key={s.src} className={i === 0 ? 'md:col-span-2' : ''}><img src={i === 0 ? s.src : s.sm} alt={`ORVA: ${s.title}`} width={s.w} height={s.h} loading="lazy" className="w-full rounded-2xl border border-ink/10" /><figcaption className="mt-2 text-[13px] text-muted">{s.title}</figcaption></figure>)}
        </div>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {mob.map((s) => <figure key={s.src}><img src={s.sm} alt={`ORVA mobile: ${s.title}`} width={s.w} height={s.h} loading="lazy" className="w-full rounded-2xl border border-ink/10" /><figcaption className="mt-2 text-[13px] text-muted">{s.title}</figcaption></figure>)}
        </div>
      </section>
      <CTASection />
    </>
  );
}
