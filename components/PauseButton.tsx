'use client';

export function PauseButton({ paused, onToggle }: { paused: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={paused ? 'Resume portfolio rotation' : 'Pause portfolio rotation'}
      className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-sm transition-colors duration-200 hover:bg-white/20"
    >
      {paused ? (
        // play triangle
        <svg width="16" height="18" viewBox="0 0 16 18" aria-hidden="true">
          <path d="M0 0L16 9L0 18V0Z" fill="#fff" />
        </svg>
      ) : (
        // pause bars
        <span className="flex gap-[6px]">
          <span className="block h-[18px] w-[3px] bg-white" />
          <span className="block h-[18px] w-[3px] bg-white" />
        </span>
      )}
    </button>
  );
}
