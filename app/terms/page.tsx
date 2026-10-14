import { LegalDoc, legalMeta } from '@/components/shop/LegalDoc';
export const metadata = legalMeta('terms');
export default function Page() { return <LegalDoc kind="terms" />; }
