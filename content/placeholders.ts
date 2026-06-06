// Placeholder "project mockup" frames for the circular portal and work gallery.
// These are inline SVG data URIs so the site renders with zero missing-asset errors
// before the client supplies real photos/videos. Replace `src` with /public media later.

type Frame = { id: string; label: string; tint: string; src: string };

function frame(label: string, bg: string, fg: string): string {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000" viewBox="0 0 1000 1000">
      <rect width="1000" height="1000" fill="${bg}"/>
      <rect x="120" y="200" width="760" height="520" rx="20" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.18)"/>
      <rect x="120" y="200" width="760" height="64" rx="20" fill="rgba(255,255,255,0.10)"/>
      <circle cx="160" cy="232" r="7" fill="${fg}" opacity="0.5"/>
      <circle cx="186" cy="232" r="7" fill="${fg}" opacity="0.3"/>
      <circle cx="212" cy="232" r="7" fill="${fg}" opacity="0.3"/>
      <text x="500" y="520" font-family="Georgia, serif" font-size="56" fill="${fg}" text-anchor="middle" font-style="italic">${label}</text>
      <text x="500" y="860" font-family="system-ui, sans-serif" font-size="22" letter-spacing="6" fill="${fg}" opacity="0.6" text-anchor="middle">PLACEHOLDER · REAL MEDIA SOON</text>
    </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export const portalFrames: Frame[] = [
  { id: 'dupgs', label: 'DUPGS', tint: '#0E0E0E', src: frame('DUPGS', '#0E0E0E', '#FFFFFF') },
  { id: 'angleforge', label: 'AngleForge', tint: '#101418', src: frame('AngleForge', '#101418', '#E63A8E') },
  { id: 'giftfeels', label: 'GiftFeels', tint: '#1A1014', src: frame('GiftFeels', '#1A1014', '#FFFFFF') },
  { id: 'recl', label: 'recl.app', tint: '#0B0B0C', src: frame('recl.app', '#0B0B0C', '#E63A8E') },
  { id: 'delhipgs', label: 'DelhiPGS', tint: '#0E0E0E', src: frame('DelhiPGS', '#0E0E0E', '#FFFFFF') },
];
