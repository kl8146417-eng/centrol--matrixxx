import { LegalDoc, legalMeta } from '@/components/shop/LegalDoc';
export const metadata = legalMeta('privacy');
export default function Page() { return <LegalDoc kind="privacy" />; }
