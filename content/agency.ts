// Agency/commerce config merged from the Vite agency site (site.config.json).
import servicesJson from './services.json';
import { displayPrice, isAddon, isPercent } from '@/lib/pricing.mjs';

// WhatsApp is a secondary contact only (contact page + footer). Owner kept the +63 number for now.
const WA = (process.env.NEXT_PUBLIC_WHATSAPP || '639515680964').replace(/\D/g, '');
// Main phone: the US line, answered 24/7 by an AI receptionist that books a callback with Asutosh.
// Set NEXT_PUBLIC_PHONE (digits, with country code) to change it sitewide.
const PHONE = (process.env.NEXT_PUBLIC_PHONE || '12184384731').replace(/\D/g, '');
function formatPhone(d: string) {
  if (d.startsWith('1') && d.length === 11) return `+1 (${d.slice(1, 4)}) ${d.slice(4, 7)}-${d.slice(7)}`;
  if (d.startsWith('91') && d.length === 12) return `+91 ${d.slice(2, 7)} ${d.slice(7)}`;
  if (d.startsWith('63') && d.length === 12) return `+63 ${d.slice(2, 5)} ${d.slice(5, 8)} ${d.slice(8)}`;
  return `+${d}`;
}

export const agency = {
  agencyName: 'Centrol Matrix',
  // The public face and contact for every enquiry. Never list anyone else as the contact.
  contactName: 'Asutosh',
  email: 'contact@centrolmatrix.com',
  phone: formatPhone(PHONE),
  phoneE164: `+${PHONE}`,
  phoneHref: `tel:+${PHONE}`,
  // Must sit next to the number wherever it appears (honesty about the AI receptionist).
  phoneNote: 'Answered 24/7 by our AI assistant. Asutosh calls you back.',
  whatsapp: WA,
  whatsappDisplay: formatPhone(WA),
  // Booking link (Cal.com / Calendly). Booking CTAs render only when this is set.
  calUrl: process.env.NEXT_PUBLIC_CAL_URL || '',
  orderPrefix: 'CMX',
  // Live demos. ORVA/Hanger Club currently run on temporary tunnels; replace with permanent URLs.
  demo: { name: 'ORVA', url: process.env.NEXT_PUBLIC_ORVA_URL || 'https://orva-centrol-matrix.netlify.app' },
  wardrobe: { name: 'Hanger Club', url: process.env.NEXT_PUBLIC_WARDROBE_URL || 'https://hanger-club-centrol-matrix.netlify.app' },
  currencies: {
    USD: { symbol: '$', rate: 1, label: 'US Dollar' },
    GBP: { symbol: '£', rate: 0.75, label: 'British Pound' },
    EUR: { symbol: '€', rate: 0.86, label: 'Euro' },
    AUD: { symbol: 'A$', rate: 1.53, label: 'Australian Dollar' },
    CAD: { symbol: 'C$', rate: 1.39, label: 'Canadian Dollar' },
    INR: { symbol: '₹', rate: 88, label: 'Indian Rupee' },
  },
} as const;
export const site = agency; // alias used by ported FAQ copy
export type Currency = keyof typeof agency.currencies;

export interface Service {
  id: string; name: string; category: string; description: string; deliverables: string[];
  price_usd: number; price_note?: string; turnaround_days?: number; popular?: boolean;
  billing?: string; pricing?: { type: string; percent: number; min_usd: number }; turnaround_factor?: number; includes?: string[]; enquiry?: boolean;
  /** Retired from the catalogue but kept so older orders still resolve by id. */
  hidden?: boolean;
}
export interface Category { id: string; name: string; tagline?: string; group?: string }
/** Every package, including retired ones (orders, cart and checkout look up by id). */
export const allServices: Service[] = (servicesJson as { services: Service[] }).services;
/** What the site shows and sells. */
export const services: Service[] = allServices.filter((s) => !s.hidden);
export const categories: Category[] = ((servicesJson as { categories: Category[] }).categories).filter((c) => services.some((s) => s.category === c.id));
export const serviceById = (id: string) => allServices.find((s) => s.id === id);
export const addons = services.filter((s) => isAddon(s));
export { displayPrice, isAddon, isPercent };
export const waLink = (text = '') => `https://wa.me/${agency.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
