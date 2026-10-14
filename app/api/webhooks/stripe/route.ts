import { json, error } from '@/lib/http';
import { loadOrder } from '@/lib/commerce/store';
import { markPaid, stripeWebhookValid } from '@/lib/commerce/pay';
export const dynamic = 'force-dynamic';
export async function POST(req: Request) {
  const raw = await req.text(); // raw body required for signature check
  if (!stripeWebhookValid(raw, req.headers.get('stripe-signature'))) return error(400, 'bad signature');
  const ev = JSON.parse(raw);
  const obj = ev.data?.object;
  if (ev.type === 'checkout.session.completed' && obj?.payment_status === 'paid') {
    const o = await loadOrder(obj.metadata?.orderId || obj.client_reference_id || '');
    if (o) await markPaid(o, 'Stripe', obj.payment_intent || obj.id);
  }
  return json({ received: true });
}
