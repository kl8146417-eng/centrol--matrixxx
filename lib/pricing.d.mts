export interface QuoteLine { id: string; name: string; category: string; qty: number; unit_usd: number; total_usd: number; billing?: string; note?: string }
export interface Quote { lines: QuoteLine[]; subtotal_usd: number; total_usd: number; etaDays: number; rush: boolean; hasMonthly: boolean; warnings: string[] }
export const MAX_QTY: number;
export function computeQuote(items: { id: string; qty: number }[], services: unknown[]): Quote;
export function displayPrice(s: unknown): number;
export function isAddon(s: unknown): boolean;
export function isPercent(s: unknown): boolean;
