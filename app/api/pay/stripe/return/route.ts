import { NextResponse } from 'next/server';
import { loadOrder } from '@/lib/commerce/store';
import { markPaid, stripeVerify, tokenOk } from '@/lib/commerce/pay';
export const dynamic = 'force-dynamic';
export async function GET(req: Request) {
  const q = new URL(req.url).searchParams;
  const o = await loadOrder(q.get('order') || '');
  if (!tokenOk(o, q.get('t'))) return new NextResponse('Not found', { status: 404 });
  try {
    const s = await stripeVerify(q.get('session_id') || '');
    if (s.payment_status === 'paid' && (s.metadata?.orderId === o.id || s.client_reference_id === o.id)) await markPaid(o, 'Stripe', s.payment_intent || s.id);
  } catch (e) { console.warn('stripe verify', (e as Error).message); }
  return NextResponse.redirect(new URL(`/order/${o.id}?t=${o.token}`, req.url), 302);
}
