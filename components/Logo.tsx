/**
 * Centrol Matrix mark — a single continuous line: an open "C" cradling an "o",
 * flowing into an "M", then trailing off as a decaying soundwave. Inlined as
 * SVG so it inherits `currentColor` (dark ink in the nav, white in the footer)
 * and stays crisp at any size. Decorative by default; pass a `title` when it
 * needs to be announced.
 */
export function Logo({
  className,
  title,
}: {
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 360 120"
      fill="none"
      className={className}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <g
        stroke="currentColor"
        strokeWidth={9}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M96 38 C 72 30, 44 38, 38 60 C 32 82, 54 96, 78 92 C 92 90, 100 80, 100 70" />
        <circle cx="66" cy="62" r="16" />
        <path d="M82 62 H 118" />
        <path d="M118 86 V 44 L 138 70 L 158 44 V 86" />
        <path d="M158 70 C 170 70, 172 48, 184 48 C 196 48, 198 80, 210 80 C 222 80, 224 56, 236 56 C 248 56, 250 74, 262 74 C 274 74, 276 62, 288 62 C 300 62, 302 70, 314 68 C 322 67, 328 66, 334 65" />
      </g>
    </svg>
  );
}
