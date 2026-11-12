/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { team, contactPerson, type Member } from '@/content/team';
import { agency } from '@/content/agency';
import { PhoneLine } from '@/components/PhoneLine';

/** Photo when we have one (public/team/...), initials otherwise. Same footprint either way. */
export function Avatar({ m, i = 0, size = 'md' }: { m: Member; i?: number; size?: 'sm' | 'md' | 'lg' }) {
  const bg = ['bg-accent', 'bg-ink', 'bg-[#7DA2FF]'][i % 3];
  const dims = size === 'lg' ? 'h-40 w-40 text-6xl sm:h-48 sm:w-48' : size === 'sm' ? 'h-12 w-12 text-xl' : 'h-20 w-20 text-3xl';
  if (m.photo) return <img src={m.photo} alt={`${m.name}, ${m.role ?? 'Centrol Matrix'}`} className={`shrink-0 rounded-full object-cover ring-4 ring-white ${dims}`} />;
  return <span aria-hidden="true" className={`flex shrink-0 items-center justify-center rounded-full font-display text-white ring-4 ring-white ${dims} ${bg}`}>{m.initials}</span>;
}

/** /about: the three of us, Asutosh first as the contact. */
export function TeamSection() {
  const others = team.filter((m) => m !== contactPerson);
  return (
    <section id="team" className="mx-auto max-w-editorial px-5 py-20 sm:px-8 sm:py-24">
      <div data-reveal>
        <p className="text-[12px] uppercase tracking-wordmark text-accent">The team</p>
        <h2 className="mt-3 max-w-3xl font-display text-display-md text-ink">Three people. <span className="italic text-accent">One of them is your contact.</span></h2>
      </div>
      <div className="mt-12 grid gap-4 lg:grid-cols-3">
        <article className="rounded-3xl bg-ink-section p-8 text-white sm:p-10 lg:col-span-2">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <Avatar m={contactPerson} size="md" />
            <div>
              <h3 className="font-display text-4xl">{contactPerson.name}</h3>
              {contactPerson.role && <p className="mt-1 text-[15px] text-[#7DA2FF]">{contactPerson.role}</p>}
            </div>
          </div>
          {contactPerson.bio && <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-white/75">{contactPerson.bio}</p>}
          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:gap-10">
            <PhoneLine dark size="sm" />
            <a href={`mailto:${agency.email}`} className="inline-flex min-h-[44px] items-center text-[15px] text-[#7DA2FF] underline-offset-4 hover:underline">{agency.email}</a>
          </div>
        </article>
        <ul className="grid gap-4">
          {others.map((m, i) => (
            <li key={m.name} className="flex items-center gap-5 rounded-3xl border border-ink/10 bg-[#F4F4F2] p-6">
              <Avatar m={m} i={i + 1} />
              <div>
                <h3 className="font-display text-3xl text-ink">{m.name}</h3>
                {m.role && <p className="mt-1 text-[14px] text-muted">{m.role}</p>}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Home: who you'll actually talk to. */
export function MeetAsutosh() {
  const others = team.filter((m) => m !== contactPerson).map((m) => m.name);
  return (
    <section className="bg-[#F4F4F2]">
      <div className="mx-auto grid max-w-editorial gap-10 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-4" data-reveal>
          <Avatar m={contactPerson} size="lg" />
        </div>
        <div className="lg:col-span-8" data-reveal>
          <p className="text-[12px] uppercase tracking-wordmark text-accent">Who you’ll talk to</p>
          <h2 className="mt-3 font-display text-display-md text-ink">Meet {contactPerson.name}. <span className="italic text-accent">{contactPerson.role?.split(' · ')[0]}.</span></h2>
          <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-ink-soft">
            {contactPerson.bio} Centrol Matrix is three people: {contactPerson.name}, {others.join(' and ')}. The same team built Siteory, AngleForge, Recl and GiftFeels, and makes every package on this site.
          </p>
          <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-10">
            <PhoneLine size="sm" />
            <a href={`mailto:${agency.email}`} className="inline-flex min-h-[44px] items-center text-[15px] text-accent underline-offset-4 hover:underline">{agency.email}</a>
            <Link href="/about" className="inline-flex min-h-[44px] items-center text-[15px] font-semibold text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-ink">About the studio →</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
