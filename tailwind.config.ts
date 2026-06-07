import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{ts,tsx,md,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#0E0E0E',
        'ink-soft': '#1A1A1A',
        muted: '#6B6B6B',
        accent: '#1D4ED8',
        'accent-dark': '#1740A6',
        bg: '#FFFFFF',
        'ink-section': '#0B0B0C',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        wordmark: '0.32em',
        tight: '-0.01em',
      },
      fontSize: {
        // editorial display scale
        'display-xl': ['clamp(56px, 7vw, 112px)', { lineHeight: '1.05', letterSpacing: '-0.01em' }],
        'display-md': ['clamp(36px, 4.5vw, 64px)', { lineHeight: '1.08', letterSpacing: '-0.01em' }],
      },
      maxWidth: {
        editorial: '1320px',
      },
    },
  },
  plugins: [],
};

export default config;
