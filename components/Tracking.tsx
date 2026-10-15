'use client';
import { useEffect } from 'react';
import { captureAttribution, track } from '@/lib/track';

/**
 * Sitewide click tracking without wiring every button: WhatsApp links, booking links,
 * mailto, and any element with data-track="event_name" (optional data-track-label).
 */
export function Tracking() {
  useEffect(() => {
    captureAttribution();
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>('a, button, [data-track]');
      if (!el) return;
      const label = el.dataset.trackLabel || el.textContent?.trim().slice(0, 60) || '';
      const page = window.location.pathname;
      if (el.dataset.track) return track(el.dataset.track, { label, page });
      const href = el.getAttribute('href') || '';
      if (href.includes('wa.me/')) track('whatsapp_click', { label, page });
      else if (/cal\.com|calendly\.com/.test(href)) track('book_call', { label, page });
      else if (href.startsWith('mailto:')) track('email_click', { label, page });
    };
    document.addEventListener('click', onClick, { capture: true });
    return () => document.removeEventListener('click', onClick, { capture: true });
  }, []);
  return null;
}
