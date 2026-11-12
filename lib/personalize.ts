// Cold-email and call links carry ?brand=&first=&p= (product) and, for /audit, &site= (store URL).
// Keep only short, plain text so a crafted link can't put arbitrary copy on our page; anything odd
// falls back to the generic version.
const clean = (v: unknown, max = 40) => {
  if (typeof v !== 'string') return '';
  const s = v.replace(/[^\p{L}\p{N} &'.\-]/gu, '').replace(/\s+/g, ' ').trim();
  return s.length > 1 && s.length <= max ? s : '';
};

/** Reduce a store URL to a bare hostname ("https://www.KateMaller.com/shop" → "katemaller.com"). */
export function cleanSite(v: unknown): string {
  if (typeof v !== 'string') return '';
  let s = v.trim().toLowerCase();
  if (!s || s.length > 120) return '';
  s = s.replace(/^[a-z]+:\/\//, '').replace(/^www\./, '').split(/[/?#\s]/)[0].replace(/:\d+$/, '');
  return /^(?=.{4,63}$)[a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z]{2,24}$/.test(s) ? s : '';
}

export type Personal = { brand: string; first: string; product: string; site: string };

export function personalize(q: Record<string, string | string[] | undefined>): Personal {
  const one = (k: string) => (Array.isArray(q[k]) ? q[k]?.[0] : q[k]);
  const first = clean(one('first'), 24);
  return {
    brand: clean(one('brand')),
    first: first ? first[0].toUpperCase() + first.slice(1) : '',
    product: clean(one('p'), 32),
    site: cleanSite(one('site')),
  };
}

export const possessive = (name: string) => (/s$/i.test(name) ? `${name}'` : `${name}'s`);
