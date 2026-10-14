import { LegalDoc, legalMeta } from '@/components/shop/LegalDoc';
export const metadata = legalMeta('delivery');
export default function Page() { return <LegalDoc kind="delivery" />; }
