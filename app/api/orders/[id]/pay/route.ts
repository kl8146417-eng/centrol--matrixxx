import { json, error } from '@/lib/http';
import { loadOrder, saveOrder } from '@/lib/commerce/store';
import { payments, startPayment, tokenOk } from '@/lib/commerce/pay';
export const dynamic = 'force-dynamic';
export async function POST(req: Request, { params }: { params: { id: string } }) {
  const o = await loadOrder(params.id);
  if (!tokenOk(o, new URL(req.url).searchParams.get('t'))) return error(404, 'Order not found');
  if (o.payment.status === 'paid') return error(409, 'Already paid');
  const body = await req.json().catch(() => ({}));
  const pay = payments();
  const mode = body.method === 'stripe' && pay.stripe ? 'stripe' : body.method === 'razorpay' && pay.razorpay ? 'razorpay' : null;
  if (!mode) return error(400, 'Online payment is not configured yet. We will email you a payment link.');
  o.payment.mode = mode;
  try { const redirect = await startPayment(o, req); await saveOrder(o); return json({ redirect }); }
  catch (e) { return error(502, (e as Error).message); }
}
