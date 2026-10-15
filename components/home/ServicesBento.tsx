import Link from 'next/link';
import { services } from '@/content/agency';
import { AutoVideo } from './AutoVideo';
import { AnimIcon, type IconName } from '@/components/icons/AnimIcon';

const from = (cats: string[]) => {
  const p = services.filter((s) => cats.includes(s.category) && !s.enquiry && s.category !== 'addon').map((s) => s.price_usd);
  return p.length ? `from $${Math.min(...p).toLocaleString('en-US')}` : 'Scoped on a call';
};
const v = (id: string) => ({ src: `/media/real/${id}.mp4`, poster: `/media/real/${id}-480.webp` });

type Tile = { title: string; body: string; href: string; price: string; cls: string; media: React.ReactNode; dark?: boolean; icon: IconName };
const tiles: Tile[] = [
  { icon: 'monitor', title: 'Websites & storefronts', body: 'CRO-minded sites and Shopify or custom storefronts, designed, built and kept fast.', href: '/pricing#website', price: from(['website']), cls: 'lg:col-span-2 lg:row-span-2',
    media: <img src="/work/hotel-demo.png" alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]" /> },
  { icon: 'phone', title: 'Mobile apps', body: 'iOS and Android apps we design, ship to the stores and run.', href: '/apps', price: 'Scoped on a call', cls: 'lg:row-span-2',
    media: <img src="/products/dupgs/screen-2.webp" alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]" /> },
  { icon: 'mic', title: 'AI UGC ads', body: 'Creator-style talking heads and walk-and-talks for Reels, TikTok and Shorts.', href: '/pricing#ai_ugc', price: from(['ai_ugc']), cls: 'lg:row-span-2',
    media: <AutoVideo {...v('park-mic-ugc')} className="absolute inset-0 h-full w-full object-cover" /> },
  { icon: 'box', title: 'Product ads & mockups', body: 'Product films, unboxings, ghost-mannequin and lifestyle imagery from photos you already have.', href: '/pricing#product_mockups', price: from(['product_mockups', 'ad_creatives']), cls: 'lg:col-span-2',
    media: <AutoVideo {...v('watch-patek')} className="absolute inset-0 h-full w-full object-cover" /> },
  { icon: 'chat', title: 'Social posts & content', body: 'Street interviews, talking heads and carousels that keep a posting calendar full.', href: '/pricing#content', price: from(['content']), cls: '',
    media: <AutoVideo {...v('street-interview')} className="absolute inset-0 h-full w-full object-cover" /> },
  { icon: 'palette', title: 'Fashion & T-shirt shoots', body: 'Try-ons, street style and tee drops that show fit and movement, no studio day needed.', href: '/work#fashion', price: from(['product_mockups']), cls: 'lg:row-span-2',
    media: <AutoVideo {...v('graphic-tee-ad')} className="absolute inset-0 h-full w-full object-cover" /> },
  { icon: 'workflow', title: 'AI automation, SEO & lead gen', body: 'Process audits, workflow builds, AI ops, lead lists, SEO and strategy, scoped to your stack.', href: '/pricing#automation', price: 'Scoped on a call', cls: 'lg:col-span-2', dark: true,
    media: <><div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(125,162,255,0.45),transparent_55%)]" /><img src="/3d/setting.webp" alt="" loading="lazy" className="absolute -right-4 -top-6 w-44 rotate-12 opacity-95 transition-transform duration-700 group-hover:rotate-45" /></> },
  { icon: 'home', title: 'Real estate video', body: 'AI visualisation from floor plans and pacing-and-grade edits of property footage.', href: '/pricing#beyond', price: from(['beyond']), cls: '',
    media: <AutoVideo {...v('re-aerial-dusk')} className="absolute inset-0 h-full w-full object-cover" /> },
];

export function ServicesBento() {
  return (
    <section id="services" className="mx-auto max-w-editorial px-5 py-24 sm:px-8 sm:py-32">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end" data-reveal>
        <div>
          <p className="text-[12px] uppercase tracking-wordmark text-accent">What we do</p>
          <h2 className="mt-3 max-w-3xl font-display text-display-md text-ink">Eight disciplines. <span className="italic text-accent">One brief.</span></h2>
        </div>
        <Link href="/pricing" className="self-start rounded-full border border-ink/15 px-5 py-2.5 text-[14px] font-semibold hover:border-ink md:self-auto">All packages & prices →</Link>
      </div>
      <div className="mt-12 grid auto-rows-[300px] grid-cols-1 gap-4 sm:grid-cols-2 lg:auto-rows-[260px] lg:grid-cols-4" data-stagger>
        {tiles.map((t) => (
          <Link key={t.title} href={t.href} data-icon-host className={`group relative overflow-hidden rounded-3xl ${t.dark ? 'bg-accent' : 'bg-ink'} ${t.cls}`}>
            {t.media}
            {!t.dark && <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />}
            <div className="absolute inset-x-0 bottom-0 p-6 text-white">
              <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] backdrop-blur-md"><AnimIcon name={t.icon} size={22} inView /></span>
              <p className="text-[11px] uppercase tracking-wordmark text-white/70">{t.price}</p>
              <h3 className="mt-1.5 font-display text-[28px] leading-tight">{t.title}</h3>
              <p className="mt-2 max-w-md text-[14px] leading-relaxed text-white/75">{t.body}</p>
            </div>
            <span className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition group-hover:bg-white group-hover:text-ink"><AnimIcon name="arrowUR" size={18} /></span>
          </Link>
        ))}
      </div>
    </section>
  );
}
