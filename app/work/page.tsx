import { redirect } from 'next/navigation';

// The work portfolio now lives at /websites (with live previews).
export default function WorkPage() {
  redirect('/websites');
}
