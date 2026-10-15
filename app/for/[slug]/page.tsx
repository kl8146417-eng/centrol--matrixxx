import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { prospectBySlug } from '@/content/prospects';
import { serviceById, agency, waLink } from '@/content/agency';
import { BeforeAfter } from '@/components/BeforeAfter';
import { AutoVideo } from '@/components/home/AutoVideo';
import { OrderButton } from '@/components/fashion/OrderButton';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = prospectBySlug(params.slug);
  return { title: p ? `Samples for ${p.brand}` : 'Samples', robots: { index: false, follow: false } };
}

export default function ProspectPage({ params }: { params: { slug: string } }) {
  const p = prospectBySlug(params.slug);
  if (!p) notFound();
  const expired = p.expires ? new Date(p.expires).getTime() < Date.now() : false;
  const pkg = p.suggest ? serviceById(p.suggest) : undefined;
  const wa = waLink(`Hi, this is ${p.first && p.first !== 'there' ? `${p.first} from ` : ''}${p.brand}. I saw the samples.`);

  return (
    <section className="bg-[#F4F4F2] pb-24 pt-28 text-ink sm:pt-32">
      <div className="mx-auto max-w-editorial px-5 sm:px-8">
        <p className="text-[15px] font-medium text-ink-soft">Made for {p.brand} by Centrol Matrix</p>
        <h1 className="mt-4 max-w-4xl font-display text-[clamp(40px,5.6vw,84px)] leading-[1] tracking-[-0.02em]">
          {p.first ? `${p.first[0].toUpperCase()}${p.first.slice(1)}, h` : 'H'}ere are your looks. <span className="italic text-accent">Drag to compare.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-ink-soft">
          Left of the line is the photo from your store. Right is what we made from it. These are AI-generated samples: check the colour, print and fit against the real garment, and tell us what you would change.
        </p>
        {p.note && <p className="mt-3 max-w-2xl text-[15px] text-muted">{p.note}</p>}

        {expired ? (
          <p className="mt-12 rounded-3xl bg-white p-8 text-[17px]">These samples have expired. Reply to our email or WhatsApp us and we&apos;ll send them again.</p>
        ) : (
          <>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {p.looks.map((l, i) => <BeforeAfter key={l.id} pair={l} priority={i === 0} labels={['Your photo', 'Our sample']} className="aspect-[4/5] w-full rounded-3xl" />)}
              {p.video && (
                <figure className="overflow-hidden rounded-3xl bg-ink"><div className="relative aspect-[4/5]"><AutoVideo src={p.video.src} poster={p.video.poster} label={`UGC-style sample for ${p.brand}`} className="absolute inset-0 h-full w-full object-cover" /></div></figure>
              )}
            </div>
            {p.loom && <a href={p.loom} target="_blank" rel="noopener noreferrer" className="mt-6 inline-block text-[15px] font-semibold text-accent underline underline-offset-4">Watch the 2-minute walkthrough ↗</a>}
          </>
        )}

        <div className="mt-16 grid gap-8 rounded-[2rem] bg-ink-section p-8 text-white sm:p-12 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-[clamp(32px,3.6vw,52px)] leading-tight">Want the whole catalogue <span className="italic text-[#7DA2FF]">done like this?</span></h2>
            {pkg && <p className="mt-4 text-[16px] text-white/80">{pkg.name}: ${pkg.price_usd.toLocaleString('en-US')}{pkg.turnaround_days ? `, delivered in ${pkg.turnaround_days} days` : ''}. Revisions included, and you own every image.</p>}
          </div>
          <div className="flex flex-wrap items-center gap-3 lg:justify-end">
            {pkg && <OrderButton id={pkg.id} label={`Order ${pkg.name}`} className="rounded-full bg-white px-6 py-3.5 text-[15px] font-semibold text-ink transition hover:bg-[#7DA2FF]" />}
            <a href={wa} target="_blank" rel="noopener noreferrer" className="rounded-full bg-white/10 px-6 py-3.5 text-[15px] font-semibold text-white transition hover:bg-white/20">WhatsApp {agency.whatsappDisplay}</a>
            {agency.calUrl && <a href={agency.calUrl} target="_blank" rel="noopener noreferrer" className="rounded-full bg-white/10 px-6 py-3.5 text-[15px] font-semibold text-white transition hover:bg-white/20">Book a call</a>}
          </div>
        </div>
        <p className="mt-8 text-[14px] text-muted">Not ready? <Link href="/fashion" className="font-semibold text-accent">See more of our fashion work</Link> or <Link href="/pricing" className="font-semibold text-accent">every package</Link>.</p>
      </div>
    </section>
  );
}
