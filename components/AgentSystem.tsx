import { agents } from '@/content/site';

/**
 * The automation agents as one connected system — a central orchestrator (Hermes)
 * with the rest arranged around it. Deliberately NOT 11 equal cards.
 */
export function AgentSystem() {
  const orchestrator = agents.find((a) => a.name.includes('Hermes')) ?? agents[0];
  const rest = agents.filter((a) => a.id !== orchestrator.id);

  return (
    <section className="mx-auto max-w-editorial px-5 py-20 sm:px-8 sm:py-28">
      <div className="max-w-2xl">
        <p className="text-[12px] uppercase tracking-wordmark text-accent">The engine</p>
        <h2 className="mt-4 font-display text-display-md text-ink">
          Eleven agents. <span className="italic text-accent">One system.</span>
        </h2>
        <p className="mt-5 text-[16px] leading-relaxed text-ink-soft">
          The automations don&apos;t run as separate tools. They route through one orchestration
          layer, so a lead found in the morning can be called, listed, written about, and posted
          everywhere by the afternoon.
        </p>
      </div>

      <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_2px_2fr] lg:gap-10">
        {/* orchestrator */}
        <div className="self-center rounded-2xl bg-ink p-7 text-white">
          <span className="text-[12px] uppercase tracking-wordmark text-accent">Orchestrator</span>
          <p className="mt-3 font-display text-3xl">{orchestrator.name}</p>
          <p className="mt-3 text-[15px] leading-relaxed text-white/70">{orchestrator.detail}</p>
        </div>

        <div className="hidden bg-ink/10 lg:block" aria-hidden />

        {/* connected agents */}
        <ul className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
          {rest.map((a) => (
            <li key={a.id} className="flex gap-4 border-t border-ink/10 pt-4">
              <span className="font-display text-sm text-muted">
                {String(a.id).padStart(2, '0')}
              </span>
              <div>
                <p className="font-medium text-ink">{a.name}</p>
                <p className="mt-1 text-[14px] leading-relaxed text-muted">{a.detail}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
