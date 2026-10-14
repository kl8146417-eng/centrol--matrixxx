import { json } from '@/lib/http';
import { payments } from '@/lib/commerce/pay';
import { ALLOWED_EXT, MAX_FILES, MAX_TOTAL_MB } from '@/lib/commerce/limits';
export const dynamic = 'force-dynamic';
export function GET() {
  return json({ payments: payments(), maxUploadMb: MAX_TOTAL_MB, maxFiles: MAX_FILES, allowed: [...ALLOWED_EXT] });
}
