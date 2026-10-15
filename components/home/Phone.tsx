/* eslint-disable @next/next/no-img-element */
export function Phone({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-[2rem] border-[6px] border-[#111] bg-[#111] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.45)] ${className}`}>
      <img src={src} alt={alt} loading="lazy" className="block aspect-[9/19] w-full object-cover object-top" />
    </div>
  );
}
export function StoreBadge({ label, href }: { label: string; href: string; dark?: boolean }) {
  const apple = label === 'App Store';
  // Official Apple / Google badge artwork.
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={apple ? 'Download on the App Store' : 'Get it on Google Play'} className="inline-block transition hover:opacity-85">
      <img src={apple ? '/badges/app-store.svg' : '/badges/google-play.png'} alt={apple ? 'Download on the App Store' : 'Get it on Google Play'} className={apple ? 'h-[44px] w-auto' : 'h-[64px] w-auto -my-[10px] -mx-[8px]'} />
    </a>
  );
}
