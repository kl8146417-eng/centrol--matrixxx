/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { services } from '@/content/agency';
import { lookbook } from '@/content/lookbook';
import { AutoVideo } from './AutoVideo';
import { AnimIcon, type IconName } from '@/components/icons/AnimIcon';

// "from $X · N days" from the live catalogue, so the home page never disagrees with /pricing.
const from = (cats: string[]) => {
  const p = services.filter((s) => cats.includes(s.category) && !s.enquiry);
  if (!p.length) return 'Scoped on a call';
  const min = p.reduce((a, b) => (b.price_usd < a.price_usd ? b : a));
  return `from $${min.price_usd.toLocaleString('en-US')}${min.turnaround_days ? ` · ${min.turnaround_days} days` : ''}`;
};
const v = (id: string) => ({ src: `/media/real/${id}-480.mp4`, poster: `/media/real/${id}-480.webp` });
const look = lookbook.find((l) => l.style !== 'ugc') ?? lookbook[0];

type Tile = { title: string; body: string; href: string; price: string; cls: string; media: React.ReactNode; tone?: 'accent'; icon: IconName };
const tiles: Tile[] = [
  { icon: 'palette', title: 'Shoots & lookbooks', body: 'On-model, ghost-mannequin and lifestyle images from the flat lays you already have. Colour, print and fit checked against the real garment.', href: '/fashion', price: from(['product_mockups']), cls: 'lg:col-span-2 lg:row-span-2',
    media: look
      ? <img src={look.after} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]" />
      : <AutoVideo {...v('graphic-tee-ad')} className="absolute inset-0 h-full w-full object-cover object-[50%_30%]" /> },
  { icon: 'mic', title: 'UGC & ad creative', body: 'Creator-style talking heads, try-ons, statics and ad remakes, cut for Meta, Reels and TikTok.', href: '/pricing#ai_ugc', price: from(['ai_ugc', 'ad_creatives']), cls: 'lg:row-span-2',
    media: <AutoVideo {...v('park-mic-ugc')} className="absolute inset-0 h-full w-full object-cover object-[50%_30%]" /> },
  { icon: 'chat', title: 'Social, clipping & carousels', body: 'Clips from your long videos, weekly posting, and carousels generated from your catalogue.', href: '/pricing#content', price: 'Monthly, scoped on a call', cls: '',
    media: <AutoVideo {...v('street-interview')} className="absolute inset-0 h-full w-full object-cover object-[50%_30%]" /> },
  { icon: 'home', title: 'Real estate video', body: 'Floor plans to furnished walkthroughs, and edits of property footage.', href: '/pricing#beyond', price: from(['beyond']), cls: '',
    media: <AutoVideo {...v('re-aerial-dusk')} className="absolute inset-0 h-full w-full object-cover" /> },
  { icon: 'monitor', title: 'Websites & storefronts', body: 'Shopify or custom storefronts built to sell, like ORVA, our clothing store you browse like a rail.', href: '/work/orva', price: from(['website']), cls: 'lg:col-span-2',
    media: <img src="/work/orva/photos-desktop-home-sm.webp" alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]" /> },
  { icon: 'phone', title: 'Mobile & web apps', body: 'Designed, built, shipped to the stores and kept running. Recl and GiftFeels are ours.', href: '/apps', price: 'Scoped on a call', cls: '',
    media: <img src="/products/recl/feature.webp" alt="" loading="lazy" className="absolute inset-x-0 top-0 h-[58%] w-full object-cover object-right transition-transform duration-700 group-hover:scale-[1.04]" /> },
  { icon: 'workflow', title: 'Automation, SEO & leads', body: 'Lead lists, SEO blogs that publish themselves, calling agents and the glue between your tools.', href: '/pricing#automation', price: 'Scoped on a call', cls: '', tone: 'accent',
    media: <img src="/3d/setting.webp" alt="" loading="lazy" className="absolute -right-6 -top-8 w-40 rotate-12 transition-transform duration-700 group-hover:rotate-45" /> },
];

export function ServicesBento() {
  return (
    <section id="services" className="mx-auto max-w-editorial px-5 py-24 sm:px-8 sm:py-32">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end" data-reveal>
        <h2 className="max-w-3xl font-display text-display-md text-ink">Everything a brand needs to sell online. <span className="italic text-accent">At a fixed price.</span></h2>
        <Link href="/pricing" className="self-start rounded-full bg-ink px-5 py-2.5 text-[14px] font-semibold text-white transition hover:bg-accent md:self-auto">All packages & prices →</Link>
      </div>
      <div className="mt-12 grid auto-rows-[340px] grid-cols-1 gap-4 sm:grid-cols-2 lg:auto-rows-[270px] lg:grid-cols-4" data-stagger>
        {tiles.map((t) => (
          <Link key={t.title} href={t.href} data-icon-host className={`group relative overflow-hidden rounded-3xl ${t.tone === 'accent' ? 'bg-accent' : 'bg-ink'} ${t.cls}`}>
            {t.media}
            {t.tone !== 'accent' && <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />}
            <div className="absolute inset-x-0 bottom-0 p-6 text-white">
              <span className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/15 text-white"><AnimIcon name={t.icon} size={20} /></span>
              <p className="text-[13px] font-medium text-white/80">{t.price}</p>
              <h3 className="mt-1 font-display text-[26px] leading-tight">{t.title}</h3>
              <p className="mt-2 max-w-md text-[14px] leading-relaxed text-white/80">{t.body}</p>
            </div>
            <span className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white transition group-hover:bg-white group-hover:text-ink"><AnimIcon name="arrowUR" size={18} /></span>
          </Link>
        ))}
      </div>
    </section>
  );
}
