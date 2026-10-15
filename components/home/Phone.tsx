/* eslint-disable @next/next/no-img-element */
export function Phone({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-[2rem] border-[6px] border-[#111] bg-[#111] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.45)] ${className}`}>
      <img src={src} alt={alt} loading="lazy" className="block aspect-[9/19] w-full object-cover object-top" />
    </div>
  );
}
export function StoreBadge({ label, href, dark = true }: { label: string; href: string; dark?: boolean }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-[13px] font-semibold transition hover:opacity-85 ${dark ? 'bg-ink text-white' : 'bg-white text-ink'}`}>
      <span aria-hidden="true">{label === 'App Store' ? '' : '▶'}</span>
      <span className="leading-tight"><span className="block text-[10px] font-normal opacity-70">{label === 'App Store' ? 'Download on the' : 'Get it on'}</span>{label}</span>
    </a>
  );
}
