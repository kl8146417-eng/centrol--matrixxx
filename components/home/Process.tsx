import { AnimIcon, type IconName } from '@/components/icons/AnimIcon';
const STEPS: { icon: IconName; t: string; d: string }[] = [
  { icon: 'search', t: 'Brief', d: 'Order a fixed package or book a call. A five-minute brief and your assets are all we need to start.' },
  { icon: 'pen', t: 'Plan & design', d: 'We confirm scope, angles and look within one business day, then design against it.' },
  { icon: 'rocket', t: 'Build & produce', d: 'Sites, apps and creative are built in parallel by the same team, with progress you can see.' },
  { icon: 'trend', t: 'Launch & iterate', d: 'We ship, measure what works and keep the winners running: new ads, new pages, new automations.' },
];
export function Process() {
  return (
    <section className="relative overflow-hidden bg-ink-section py-24 text-white sm:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute right-[-10%] top-0 h-[500px] w-[500px] rounded-full bg-accent/25 blur-[140px]" />
      <div className="relative mx-auto max-w-editorial px-5 sm:px-8">
        <p data-reveal className="text-[12px] uppercase tracking-wordmark text-[#7DA2FF]">How we work</p>
        <h2 data-reveal className="mt-3 max-w-3xl font-display text-display-md">From brief to live, <span className="italic text-[#7DA2FF]">without hand-offs.</span></h2>
        <ol className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4" data-stagger>
          {STEPS.map((s, i) => (
            <li key={s.t} data-icon-host className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md transition hover:border-white/25 hover:bg-white/[0.07]">
              <div className="flex items-center justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-white"><AnimIcon name={s.icon} size={24} inView /></span>
                <span className="font-display text-4xl text-white/20">0{i + 1}</span>
              </div>
              <h3 className="mt-8 font-display text-2xl">{s.t}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-white/65">{s.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
