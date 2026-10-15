// Conversion events → GA4 (gtag) and Meta Pixel (fbq). Both are optional and env-gated in
// <Analytics />, so these calls are no-ops until the IDs are set.
type Params = Record<string, string | number | undefined>;
type W = Window & { gtag?: (...a: unknown[]) => void; fbq?: (...a: unknown[]) => void };

const META_STANDARD: Record<string, string> = {
  sample_request: 'Lead',
  contact_submit: 'Lead',
  book_call: 'Schedule',
  whatsapp_click: 'Contact',
  add_to_cart: 'AddToCart',
  checkout_start: 'InitiateCheckout',
  purchase: 'Purchase',
};

export function track(event: string, params: Params = {}) {
  if (typeof window === 'undefined') return;
  const w = window as W;
  const attr = getAttribution();
  w.gtag?.('event', event, { ...attr, ...params });
  const std = META_STANDARD[event];
  if (std) w.fbq?.('track', std, params);
  else w.fbq?.('trackCustom', event, params);
}

const KEY = 'cmx.attr';
const FIELDS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'ref', 'brand'] as const;

/** First-touch attribution from the landing URL, kept for the session. */
export function captureAttribution() {
  try {
    if (sessionStorage.getItem(KEY)) return;
    const q = new URLSearchParams(window.location.search);
    const a: Record<string, string> = { landing: window.location.pathname };
    for (const f of FIELDS) { const v = q.get(f); if (v) a[f] = v.slice(0, 80); }
    if (document.referrer) a.referrer = document.referrer.slice(0, 120);
    sessionStorage.setItem(KEY, JSON.stringify(a));
  } catch { /* storage blocked: attribution is best-effort */ }
}

export function getAttribution(): Record<string, string> {
  try { return JSON.parse(sessionStorage.getItem(KEY) || '{}'); } catch { return {}; }
}

/** One-line summary stored with contact/sample submissions. */
export const attributionLine = () => Object.entries(getAttribution()).map(([k, v]) => `${k}=${v}`).join(' ');
