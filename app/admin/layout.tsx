import type { Metadata } from 'next';
import './admin.css';

// Private dashboard. Keep it out of search engines and the sitemap.
export const metadata: Metadata = {
  title: 'Studio · Centrol Matrix',
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="admin-root">{children}</div>;
}
