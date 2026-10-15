import { pageMeta } from '@/lib/seo';
import { BreadcrumbLd } from '@/components/Breadcrumbs';
import Link from 'next/link';
import { DOCS, UPDATED, type Kind } from '@/content/legal';

export const legalMeta = (k: Kind) => pageMeta({ path: `/${k}`, title: DOCS[k].title, description: DOCS[k].desc });

export function LegalDoc({ kind }: { kind: Kind }) {
  const doc = DOCS[kind];
  return (
    <article className="mx-auto max-w-3xl px-5 pb-24 pt-32 sm:px-8 sm:pt-40">
      <BreadcrumbLd items={[{ name: doc.title, path: `/${kind}` }]} />
      <p className="text-[12px] uppercase tracking-wordmark text-accent">Legal</p>
      <h1 className="mt-4 font-display text-display-md text-ink">{doc.title}</h1>
      <p className="mt-3 text-[14px] text-muted">Last updated {UPDATED}</p>
      {doc.sections.map(([h, ps]) => (
        <section key={h} className="mt-10">
          <h2 className="font-display text-2xl text-ink">{h}</h2>
          {ps.map((p) => <p key={p} className="mt-3 text-[16px] leading-relaxed text-ink-soft">{p}</p>)}
        </section>
      ))}
      <nav className="mt-16 flex flex-wrap gap-5 border-t border-ink/10 pt-6 text-[14px]" aria-label="Other policies">
        {(['terms', 'privacy', 'refunds', 'delivery'] as Kind[]).map((k) => <Link key={k} href={`/${k}`} className="underline">{DOCS[k].title}</Link>)}
      </nav>
    </article>
  );
}
