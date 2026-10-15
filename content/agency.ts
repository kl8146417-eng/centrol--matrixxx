// Agency/commerce config merged from the Vite agency site (site.config.json).
import servicesJson from './services.json';
import { displayPrice, isAddon, isPercent } from '@/lib/pricing.mjs';

export const agency = {
  agencyName: 'Centrol Matrix',
  founder: 'Spartan Rich',
  location: 'India',
  email: 'contact@centrolmatrix.com',
  whatsapp: '639515680964',
  whatsappDisplay: '+63 951 568 0964',
  phone: '+63 951 568 0964',
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
}
export interface Category { id: string; name: string; tagline?: string; group?: string }
export const services: Service[] = (servicesJson as { services: Service[] }).services;
export const categories: Category[] = ((servicesJson as { categories: Category[] }).categories).filter((c) => services.some((s) => s.category === c.id));
export const serviceById = (id: string) => services.find((s) => s.id === id);
export const addons = services.filter((s) => isAddon(s));
export { displayPrice, isAddon, isPercent };
export const waLink = (text = '') => `https://wa.me/${agency.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
