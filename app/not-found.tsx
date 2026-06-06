import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-editorial flex-col justify-center px-5 sm:px-8">
      <p className="text-[13px] uppercase tracking-wordmark text-accent">404</p>
      <h1 className="mt-5 font-display text-display-md text-ink">
        That page isn&apos;t here. <span className="italic text-accent">Yet.</span>
      </h1>
      <p className="mt-5 max-w-md text-[16px] leading-relaxed text-ink-soft">
        The link may be old or the page may have moved. Head back home and start again.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block w-fit rounded-full bg-accent px-6 py-3.5 text-[15px] font-semibold text-white transition-[transform,background-color] duration-200 hover:bg-accent-dark hover:scale-[1.02]"
      >
        Back home
      </Link>
    </section>
  );
}
