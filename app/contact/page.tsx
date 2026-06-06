import type { Metadata } from 'next';
import { PageHeader } from '@/components/PageHeader';
import { ContactForm } from '@/components/ContactForm';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Start a project with Centrol Matrix.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Start a"
        accent="project."
        intro="Tell us what you're building. We'll come back with a straight answer about whether and how we can help."
      />

      <section className="mx-auto max-w-editorial px-5 pb-28 sm:px-8 sm:pb-36">
        <div className="grid gap-14 border-t border-ink/10 pt-12 lg:grid-cols-[1.5fr_1fr]">
          <ContactForm />

          <aside className="space-y-8">
            <div>
              <p className="text-[13px] uppercase tracking-wordmark text-muted">Email</p>
              <a
                href={`mailto:${site.email}`}
                className="mt-2 block text-[17px] text-accent underline-offset-4 hover:underline"
              >
                {site.email}
              </a>
            </div>
            <div>
              <p className="text-[13px] uppercase tracking-wordmark text-muted">LinkedIn</p>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 block text-[17px] text-ink underline-offset-4 hover:underline"
              >
                /company/centrol-matrix
              </a>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
