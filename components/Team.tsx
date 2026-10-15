import Link from 'next/link';
import { team } from '@/content/team';

function Avatar({ initials, i, small }: { initials: string; i: number; small?: boolean }) {
  const bg = ['bg-accent', 'bg-ink', 'bg-[#7DA2FF]'][i % 3];
  const size = small ? 'h-12 w-12 text-xl sm:h-16 sm:w-16 sm:text-2xl' : 'h-20 w-20 text-3xl';
  return <span aria-hidden="true" className={`flex shrink-0 items-center justify-center rounded-full font-display text-white ring-4 ring-white ${size} ${bg}`}>{initials}</span>;
}

export function TeamSection() {
  return (
    <section id="team" className="mx-auto max-w-editorial px-5 py-24 sm:px-8">
      <div data-reveal>
        <p className="text-[12px] uppercase tracking-wordmark text-accent">The team</p>
        <h2 className="mt-3 max-w-3xl font-display text-display-md text-ink">Three people. <span className="italic text-accent">Every product on this site.</span></h2>
        <p className="mt-4 max-w-xl text-[16px] text-muted">Recl, Siteory, GiftFeels, WishCuts, Delhi PGs, Hanger Club and ORVA were all built by Centrol Matrix, the same team that builds for clients.</p>
      </div>
      <ul className="mt-12 grid gap-4 sm:grid-cols-3" data-stagger>
        {team.map((m, i) => (
          <li key={m.name} className="rounded-3xl border border-ink/10 bg-[#F4F4F2] p-8">
            <Avatar initials={m.initials} i={i} />
            <h3 className="mt-6 font-display text-3xl text-ink">{m.name}</h3>
            {m.role && <p className="mt-1 text-[14px] text-muted">{m.role}</p>}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function TeamTeaser() {
  return (
    <section className="mx-auto max-w-editorial px-5 pb-8 sm:px-8">
      <Link href="/about#team" data-reveal className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-ink/10 p-8 transition hover:border-ink/30 sm:flex-row sm:items-center">
        <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
          <div className="flex -space-x-3">{team.map((m, i) => <Avatar key={m.name} initials={m.initials} i={i} small />)}</div>
          <div className="min-w-0">
            <p className="text-[12px] uppercase tracking-wordmark text-accent">The team</p>
            <p className="mt-1 font-display text-2xl text-ink">Built by {team.map((m) => m.name).join(', ').replace(/, ([^,]*)$/, ' and $1')}.</p>
          </div>
        </div>
        <span className="text-[15px] font-semibold text-accent">Meet the team →</span>
      </Link>
    </section>
  );
}
