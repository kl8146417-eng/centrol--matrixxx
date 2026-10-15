// Cold-email links carry ?brand=&first=&p= (product). Keep only short, plain text so a crafted
// link can't put arbitrary copy on our page; anything odd falls back to the generic version.
const clean = (v: unknown, max = 40) => {
  if (typeof v !== 'string') return '';
  const s = v.replace(/[^\p{L}\p{N} &'.\-]/gu, '').replace(/\s+/g, ' ').trim();
  return s.length > 1 && s.length <= max ? s : '';
};

export type Personal = { brand: string; first: string; product: string };

export function personalize(q: Record<string, string | string[] | undefined>): Personal {
  const one = (k: string) => (Array.isArray(q[k]) ? q[k]?.[0] : q[k]);
  return { brand: clean(one('brand')), first: clean(one('first'), 24), product: clean(one('p'), 32) };
}

export const possessive = (name: string) => (/s$/i.test(name) ? `${name}'` : `${name}'s`);
