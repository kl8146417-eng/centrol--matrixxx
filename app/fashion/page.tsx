/* eslint-disable @next/next/no-img-element */
import type { Metadata } from 'next';
import Link from 'next/link';
import { pageMeta } from '@/lib/seo';
import { BreadcrumbLd } from '@/components/Breadcrumbs';
import { personalize, possessive } from '@/lib/personalize';
import { lookbook } from '@/content/lookbook';
import { services, agency, waLink } from '@/content/agency';
import { faq } from '@/content/faq';
import { products } from '@/content/products';
import { LookbookTabs } from '@/components/fashion/LookbookTabs';
import { SampleForm } from '@/components/fashion/SampleForm';
import { BeforeAfter } from '@/components/BeforeAfter';
import { WorkRail } from '@/components/home/WorkRail';
import { AutoVideo } from '@/components/home/AutoVideo';
import { ServiceCard } from '@/components/shop/Catalogue';

export const metadata: Metadata = pageMeta({
  path: '/fashion',
  title: 'On-model photos & UGC ads for clothing brands',
  description: 'Send the flat lays you already have. We make on-model shots, lookbooks and UGC-style ads from them, checked against the real garment. Your first 3 looks are free.',
});

const PACKAGES = ['mockups-10', 'mockups-25', 'ugc-single', 'ugc-5pack', 'ad-remake', 'rail-starter'];
const FAQ_QS = [
  'Will people be able to tell it is AI?',
  'Will the AI product images look like my actual product?',
  'Do AI images and videos need a label?',
  'What do you need from me?',
  'Who owns the work?',
  'How do I pay?',
];

const STEPS = [
  { h: 'Send us your links', p: 'Your store or Instagram, and up to three products. Flat lays, hanger shots or phone photos are fine. You don’t ship anything.' },
  { h: 'Get 3 looks free', p: 'Within two working days you get a private page with three on-model images made from your real garments, to judge on your own screen.' },
  { h: 'Order the set', p: 'Pick a fixed-price package online: 10 or 25 looks, UGC-style ads, or both. Pay online by card, or by invoice.' },
  { h: 'Launch the drop', p: 'Images for your store, marketplaces and ads, cut to every size you need. Revisions included, and you own all of it.' },
];

export default function FashionPage({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) {
  const { brand, first, product } = personalize(searchParams);
  const pkgs = PACKAGES.map((id) => services.find((s) => s.id === id)).filter((s): s is NonNullable<typeof s> => !!s);
  const qs = FAQ_QS.map((q) => faq.find((f) => f.q === q)).filter((f): f is NonNullable<typeof f> => !!f);
  const orva = products.find((p) => p.id === 'orva');
  const per10 = services.find((s) => s.id === 'mockups-10');
  const lead = brand ? `${possessive(brand)} ${product || 'next drop'}, ` : 'Your flat lays, ';
  const wa = waLink(brand ? `Hi, this is ${first ? `${first} from ` : ''}${brand}. I'd like the 3 free looks.` : 'Hi, I run a clothing brand and would like the 3 free looks.');

  return (
    <>
      <BreadcrumbLd items={[{ name: 'For fashion brands', path: '/fashion' }]} />

      {/* Hero: who it's for, what they get, the free offer, and the slider as proof. */}
      <section className="bg-[#F4F4F2] text-ink">
        {brand && (
          <div className="bg-ink px-5 pb-3 pt-[5.25rem] text-center text-[14px] text-white sm:pt-[5.75rem]">
            {first ? `Hi ${first}. ` : ''}This page was set up for {brand}. Your 3 free looks start with one reply.
          </div>
        )}
        <div className={`mx-auto grid max-w-editorial gap-10 px-5 pb-20 sm:px-8 lg:grid-cols-12 lg:gap-14 ${brand ? 'pt-12' : 'pt-28 sm:pt-32'}`}>
          <div className="flex flex-col justify-center lg:col-span-7">
            <p className="text-[15px] font-medium text-ink-soft">For clothing and D2C fashion brands</p>
            <h1 className="mt-4 font-display text-[clamp(44px,6.4vw,96px)] leading-[0.98] tracking-[-0.02em]">
              {lead}<span className="italic text-accent">on a model.</span>
            </h1>
            <p className="mt-7 max-w-xl text-[18px] leading-relaxed text-ink-soft">
              Send the product photos you already have. We make on-model shots, lookbooks and UGC-style ads from them, checked against the real garment for colour, print and fit. No studio day, no samples in the post.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#free" data-track="sample_cta" data-track-label="hero" className="rounded-full bg-accent px-7 py-3.5 text-[16px] font-semibold text-white transition hover:bg-accent-dark">Get 3 looks free</a>
              <a href={wa} target="_blank" rel="noopener noreferrer" className="rounded-full bg-white px-7 py-3.5 text-[16px] font-semibold text-ink transition hover:bg-ink hover:text-white">WhatsApp us</a>
            </div>
            <p className="mt-5 text-[14px] text-muted">
              {per10 ? `After the free looks, sets start at $${per10.price_usd} for ${per10.name.match(/\d+/)?.[0] ?? 10} images. ` : ''}Prices are fixed and listed below.
            </p>
          </div>
          <div className="lg:col-span-5">
            {lookbook.length ? (
              <LookbookTabs pairs={lookbook} />
            ) : (
              <figure className="overflow-hidden rounded-[1.75rem] bg-ink"><div className="relative aspect-[4/5]"><AutoVideo src="/media/real/lime-crop-street-480.mp4" poster="/media/real/lime-crop-street-480.webp" label="Street-style fashion ad" className="absolute inset-0 h-full w-full object-cover" /></div></figure>
            )}
          </div>
        </div>
      </section>

      {/* The problem, in the founders' own words, and how the options compare. */}
      <section className="mx-auto max-w-editorial px-5 py-24 sm:px-8 sm:py-32">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5" data-reveal>
            <h2 className="font-display text-display-md text-ink">New stock shouldn&apos;t wait weeks <span className="italic text-accent">for a shoot.</span></h2>
            <p className="mt-5 text-[17px] leading-relaxed text-ink-soft">
              Small fashion brands tell the same story: inventory arrives, then sits for two to six weeks until a shoot is booked, and every new look needs a fresh one. Meanwhile the listing goes up as a flat lay, and the ads reuse the same three photos.
            </p>
          </div>
          <div className="overflow-x-auto lg:col-span-7" data-reveal>
            <table className="w-full min-w-[560px] border-separate border-spacing-0 text-left text-[15px]">
              <caption className="sr-only">How a studio shoot, creator UGC and Centrol Matrix compare</caption>
              <thead>
                <tr className="text-[14px] text-muted">
                  <th scope="col" className="pb-4 pr-4 font-medium" />
                  <th scope="col" className="pb-4 pr-4 font-medium">Studio shoot</th>
                  <th scope="col" className="pb-4 pr-4 font-medium">Creator UGC</th>
                  <th scope="col" className="rounded-t-2xl bg-ink px-4 pb-4 pt-4 font-semibold text-white">Centrol Matrix</th>
                </tr>
              </thead>
              <tbody className="text-ink-soft">
                {[
                  ['What you send', 'Samples to the studio', 'Product to each creator', 'Links and photos'],
                  ['First images', 'After the shoot day is booked', 'When creators post back', 'Free, in 2 working days'],
                  ['New colourway or style', 'Another shoot', 'Another creator fee', 'Added to the next set'],
                  ['Ad variations', 'Whatever was shot', 'One take per creator', 'Many hooks per product'],
                  ['Price', 'Day rate plus models', 'Per creator, per video', per10 ? `From $${per10.price_usd} per set` : 'Fixed per set'],
                ].map(([k, a, b, c], i, all) => (
                  <tr key={k}>
                    <th scope="row" className="border-t border-ink/10 py-4 pr-4 font-medium text-ink">{k}</th>
                    <td className="border-t border-ink/10 py-4 pr-4">{a}</td>
                    <td className="border-t border-ink/10 py-4 pr-4">{b}</td>
                    <td className={`bg-ink px-4 py-4 font-medium text-white ${i === all.length - 1 ? 'rounded-b-2xl' : ''}`}>{c}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Every pair, side by side. */}
      {lookbook.length > 1 && (
        <section className="bg-[#F4F4F2] py-24 sm:py-32">
          <div className="mx-auto max-w-editorial px-5 sm:px-8">
            <h2 className="max-w-3xl font-display text-display-md text-ink" data-reveal>From the hanger <span className="italic text-accent">to the feed.</span></h2>
            <p className="mt-4 max-w-xl text-[17px] text-ink-soft">Lookbook images for the store and marketplaces, and phone-style shots for ads and stories. Drag any of them.</p>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" data-stagger>
              {lookbook.map((p) => (
                <div key={p.id}>
                  <BeforeAfter pair={p} className="aspect-[2/3] w-full rounded-3xl" />
                  <p className="mt-3 text-[14px] font-medium text-ink">{p.category} <span className="font-normal text-muted">· {p.style === 'ugc' ? 'UGC style' : 'Lookbook'}</span></p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <WorkRail heading="UGC ads and fashion films." only={['fashion', 'ugc', 'jewellery', 'product', 'replication']} />

      {/* How it works: the steps stay readable without any script. */}
      <section className="mx-auto max-w-editorial px-5 py-24 sm:px-8 sm:py-32">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <h2 className="font-display text-display-md text-ink" data-reveal>You don&apos;t ship <span className="italic text-accent">anything.</span></h2>
              <p className="mt-5 max-w-md text-[17px] text-ink-soft">The whole thing runs on links and photos you already have. You see real results on your own products before you pay us anything.</p>
              <a href="#free" className="mt-8 inline-block rounded-full bg-ink px-7 py-3.5 text-[15px] font-semibold text-white transition hover:bg-accent">Start with the free looks</a>
            </div>
          </div>
          <ol className="space-y-4 lg:col-span-7" data-stagger>
            {STEPS.map((s, i) => (
              <li key={s.h} className="flex gap-6 rounded-3xl bg-[#F4F4F2] p-7 sm:p-9">
                <span aria-hidden="true" className="font-display text-5xl leading-none text-accent">{i + 1}</span>
                <div>
                  <h3 className="font-display text-[28px] leading-tight text-ink">{s.h}</h3>
                  <p className="mt-2 text-[16px] leading-relaxed text-ink-soft">{s.p}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* What you can order today, at the same prices as /pricing. */}
      <section className="bg-[#F4F4F2] py-24 sm:py-32">
        <div className="mx-auto max-w-editorial px-5 sm:px-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end" data-reveal>
            <h2 className="max-w-2xl font-display text-display-md text-ink">Fixed prices. <span className="italic text-accent">Order when you&apos;re ready.</span></h2>
            <Link href="/pricing" className="self-start text-[15px] font-semibold text-accent md:self-auto">Every package →</Link>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {pkgs.map((s) => <div key={s.id} className="flex bg-white [&>article]:w-full [&>article]:border-0">{<ServiceCard s={s} />}</div>)}
          </div>
          <p className="mt-6 text-[14px] text-muted">Prices in USD. The currency switch on the pricing page shows an estimate in rupees, pounds or euros.</p>
        </div>
      </section>

      {/* The storefront we built for our own label. */}
      {orva && (
        <section className="mx-auto max-w-editorial px-5 py-24 sm:px-8 sm:py-32">
          <article className="grid overflow-hidden rounded-[2rem] bg-ink-section text-white lg:grid-cols-5" data-reveal>
            <div className="relative aspect-[16/10] lg:col-span-3 lg:aspect-auto lg:min-h-[420px]">
              <AutoVideo src={orva.video!} poster={orva.poster} label="ORVA storefront demo" className="absolute inset-0 h-full w-full object-cover" />
            </div>
            <div className="flex flex-col justify-center p-8 sm:p-12 lg:col-span-2">
              <h2 className="font-display text-[clamp(34px,3.6vw,52px)] leading-tight">Then send them somewhere <span className="italic text-[#7DA2FF]">worth landing on.</span></h2>
              <p className="mt-5 text-[16px] leading-relaxed text-white/80">ORVA is our own clothing label&apos;s storefront: garments hang on a rail you drag through, with quick view, cart and images from this same pipeline. We build Shopify and custom stores like it.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/work/orva" className="rounded-full bg-white px-6 py-3 text-[15px] font-semibold text-ink transition hover:bg-[#7DA2FF]">See how we built it</Link>
                {orva.visit && <a href={orva.visit} target="_blank" rel="noopener noreferrer" className="rounded-full bg-white/10 px-6 py-3 text-[15px] font-semibold text-white transition hover:bg-white/20">Try the rail ↗</a>}
              </div>
            </div>
          </article>
        </section>
      )}

      {/* The questions a careful founder asks first. */}
      <section className="mx-auto grid max-w-editorial gap-12 px-5 pb-24 sm:px-8 lg:grid-cols-3">
        <h2 className="font-display text-display-md text-ink" data-reveal>Fair questions.</h2>
        <div className="lg:col-span-2">
          {qs.map((f) => (
            <details key={f.q} className="group border-b border-ink/10 py-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-2xl text-ink">
                {f.q}<span className="text-2xl text-accent transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-ink-soft">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* The ask. */}
      <section id="free" className="scroll-mt-24 bg-[#E9E7E2] py-24 sm:py-32">
        <div className="mx-auto grid max-w-editorial gap-12 px-5 sm:px-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="font-display text-display-md text-ink">{brand ? <>Three looks for {brand}. <span className="italic text-accent">Free.</span></> : <>Three looks, on your products. <span className="italic text-accent">Free.</span></>}</h2>
            <p className="mt-5 max-w-md text-[17px] leading-relaxed text-ink-soft">Tell us where your products live. We&apos;ll email a private page with three on-model images within two working days. If you like them, order a set. If not, keep them.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={wa} target="_blank" rel="noopener noreferrer" className="rounded-full bg-ink px-6 py-3 text-[15px] font-semibold text-white transition hover:bg-accent">WhatsApp {agency.whatsappDisplay}</a>
              {agency.calUrl && <a href={agency.calUrl} target="_blank" rel="noopener noreferrer" className="rounded-full bg-white px-6 py-3 text-[15px] font-semibold text-ink transition hover:bg-ink hover:text-white">Book a 15-minute call</a>}
            </div>
          </div>
          <div className="lg:col-span-7">
            <SampleForm brand={brand} first={first} />
          </div>
        </div>
      </section>
    </>
  );
}
