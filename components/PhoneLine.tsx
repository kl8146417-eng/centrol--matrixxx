import { agency } from '@/content/agency';

/**
 * The US phone number with its honesty note. Wherever the number is shown, the note goes with it:
 * the line is answered by an AI assistant, and Asutosh calls back personally.
 */
export function PhoneLine({ dark = false, size = 'md', className = '' }: { dark?: boolean; size?: 'sm' | 'md' | 'lg'; className?: string }) {
  const num = size === 'lg' ? 'text-[clamp(26px,3vw,36px)] font-display' : size === 'sm' ? 'text-[15px] font-medium' : 'text-[18px] font-semibold';
  return (
    <div className={className}>
      <a href={agency.phoneHref} className={`inline-flex min-h-[44px] items-center underline-offset-4 hover:underline ${num} ${dark ? 'text-white' : 'text-ink'}`}>
        {agency.phone}
      </a>
      <p className={`text-[13px] leading-snug ${dark ? 'text-white/60' : 'text-muted'}`}>{agency.phoneNote}</p>
    </div>
  );
}
