import Link from 'next/link';
export default function NotFound() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-ink-section text-white">
      <div aria-hidden="true" className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/30 blur-[150px]" />
      <div className="relative mx-auto max-w-editorial px-5 sm:px-8">
        <p className="font-display text-[clamp(120px,26vw,380px)] leading-none text-white/10">404</p>
        <h1 className="-mt-[0.4em] font-display text-[clamp(40px,6vw,88px)] leading-none">This page wandered off <span className="italic text-[#7DA2FF]">the rail.</span></h1>
        <p className="mt-6 max-w-md text-[17px] text-white/70">The link may be old or mistyped. Here are the places people usually look for.</p>
        <div className="mt-9 flex flex-wrap gap-3">
          {[['Home', '/'], ['Work', '/work'], ['Pricing', '/pricing'], ['Contact', '/contact']].map(([l, h], i) => (
            <Link key={h} href={h} className={`rounded-full px-6 py-3 text-[15px] font-semibold ${i === 0 ? 'bg-accent text-white' : 'border border-white/20 hover:bg-white hover:text-ink'}`}>{l}</Link>
          ))}
        </div>
      </div>
    </section>
  );
}
