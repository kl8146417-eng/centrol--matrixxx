import { NextResponse } from 'next/server';
import { loadOrder } from '@/lib/commerce/store';
import { markPaid, payments, razorpaySigOk, tokenOk } from '@/lib/commerce/pay';
export const dynamic = 'force-dynamic';
export async function GET(req: Request) {
  const q = new URL(req.url).searchParams;
  const o = await loadOrder(q.get('order') || '');
  if (!tokenOk(o, q.get('t'))) return new NextResponse('Not found', { status: 404 });
  if (payments().razorpay && q.get('razorpay_payment_link_status') === 'paid' && q.get('razorpay_payment_link_reference_id') === o.id && razorpaySigOk(q))
    await markPaid(o, 'Razorpay', q.get('razorpay_payment_id') || '');
  return NextResponse.redirect(new URL(`/order/${o.id}?t=${o.token}`, req.url), 302);
}
