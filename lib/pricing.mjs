// Shared pricing logic — imported by BOTH the browser bundle and server.mjs,
// so the server always recomputes totals from services.json (never trusts the client).

/**
 * @typedef {{id:string,name:string,category:string,description:string,deliverables:string[],price_usd:number,price_note?:string,turnaround_days?:number,popular?:boolean,billing?:string,pricing?:{type:string,percent:number,min_usd:number},turnaround_factor?:number,includes?:string[]}} Service
 * @typedef {{id:string,qty:number}} CartItem
 * @typedef {{id:string,name:string,category:string,qty:number,unit_usd:number,total_usd:number,billing?:string,note?:string}} QuoteLine
 */

export const MAX_QTY = 20;

/** @param {Service} s */
export const isAddon = (s) => s.category === 'addon';
/** @param {Service} s */
export const isPercent = (s) => !!(s.pricing && s.pricing.type === 'percent_min');

/**
 * @param {CartItem[]} items
 * @param {Service[]} services
 */
export function computeQuote(items, services) {
  const byId = new Map(services.map((s) => [s.id, s]));
  /** @type {Map<string, number>} */
  const merged = new Map();
  for (const it of Array.isArray(items) ? items : []) {
    if (!it || typeof it.id !== 'string' || !byId.has(it.id)) continue;
    const s = /** @type {Service} */ (byId.get(it.id));
    const q = Math.max(1, Math.min(MAX_QTY, Math.floor(Number(it.qty) || 1)));
    merged.set(it.id, isAddon(s) ? 1 : Math.min(MAX_QTY, (merged.get(it.id) || 0) + q));
  }
  /** @type {QuoteLine[]} */
  const lines = [];
  /** @type {Service[]} */
  const percent = [];
  let packageBase = 0;
  let days = 0;
  let factor = 1;
  let hasMonthly = false;
  for (const [id, qty] of merged) {
    const s = /** @type {Service} */ (byId.get(id));
    if (isPercent(s)) { percent.push(s); continue; }
    const total = Math.round(s.price_usd * qty * 100) / 100;
    lines.push({ id, name: s.name, category: s.category, qty, unit_usd: s.price_usd, total_usd: total, billing: s.billing });
    if (!isAddon(s)) packageBase += total;
    if (s.billing === 'monthly') hasMonthly = true;
    days = Math.max(days, s.turnaround_days || 0);
  }
  const warnings = [];
  for (const s of percent) {
    if (packageBase <= 0) { warnings.push(`${s.name} needs a package in the cart.`); continue; }
    const p = /** @type {{percent:number,min_usd:number}} */ (s.pricing);
    const amt = Math.max(p.min_usd, Math.round((packageBase * p.percent) / 100));
    lines.push({ id: s.id, name: s.name, category: s.category, qty: 1, unit_usd: amt, total_usd: amt, note: `${p.percent}% of packages (min $${p.min_usd})` });
    if (s.turnaround_factor) factor = Math.min(factor, s.turnaround_factor);
  }
  const subtotal = Math.round(lines.reduce((a, l) => a + l.total_usd, 0) * 100) / 100;
  const etaDays = days ? Math.max(1, Math.ceil(days * factor)) : 0;
  return { lines, subtotal_usd: subtotal, total_usd: subtotal, etaDays, rush: factor < 1, hasMonthly, warnings };
}

/** Price a service for display (percent add-ons show their minimum). @param {Service} s */
export const displayPrice = (s) => (isPercent(s) && s.pricing ? s.pricing.min_usd : s.price_usd);
