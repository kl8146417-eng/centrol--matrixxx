export function PageHeader({
  eyebrow,
  title,
  accent,
  intro,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  intro?: string;
}) {
  return (
    <header className="mx-auto max-w-editorial px-5 pb-12 pt-32 sm:px-8 sm:pb-16 sm:pt-40">
      <p className="text-[12px] uppercase tracking-wordmark text-accent">{eyebrow}</p>
      <h1 className="mt-5 max-w-4xl font-display text-display-xl text-ink">
        {title} {accent && <span className="italic text-accent">{accent}</span>}
      </h1>
      {intro && <p className="mt-7 max-w-xl text-[17px] leading-relaxed text-ink-soft">{intro}</p>}
    </header>
  );
}
