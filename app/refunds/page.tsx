import { LegalDoc, legalMeta } from '@/components/shop/LegalDoc';
export const metadata = legalMeta('refunds');
export default function Page() { return <LegalDoc kind="refunds" />; }
