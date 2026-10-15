// Shared page header in the v4 language: dark band, blue glow, big Playfair title.
export function PageHeader({ eyebrow, title, accent, intro }: { eyebrow: string; title: string; accent?: string; intro?: string }) {
  return (
    <header className="relative overflow-hidden bg-ink-section text-white">
      <div aria-hidden="true" className="pointer-events-none absolute -left-32 top-10 h-[420px] w-[420px] rounded-full bg-accent/35 blur-[130px]" />
      <div className="relative mx-auto max-w-editorial px-5 pb-16 pt-32 sm:px-8 sm:pb-24 sm:pt-44">
        <p data-reveal className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1 text-[12px] uppercase tracking-wordmark text-white/70">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" /> {eyebrow}
        </p>
        <h1 data-reveal className="mt-6 max-w-5xl font-display text-[clamp(48px,7vw,112px)] leading-[1.0]">
          {title} {accent && <span className="italic text-[#7DA2FF]">{accent}</span>}
        </h1>
        {intro && <p data-reveal className="mt-7 max-w-xl text-[17px] leading-relaxed text-white/70">{intro}</p>}
      </div>
    </header>
  );
}
