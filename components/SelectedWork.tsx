'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { homeEmbeds, homeFeatured } from '@/content/site';
import { LiveSiteEmbed, type LiveSiteEmbedHandle } from '@/components/LiveSiteEmbed';

gsap.registerPlugin(ScrollTrigger);

/**
 * Selected work. The two lead items (Hotel prototype, Dental website) embed a
 * live site and run a scroll-choreographed sequence:
 *
 *   land on the section ->
 *     panel A swells up / panel B shrinks ->
 *     A pans its embed to the bottom, then back to the top ->
 *     A settles back to its resting size ->
 *     then panel B does the exact same thing.
 *
 * Driven by a single pinned, scrubbed ScrollTrigger timeline so it's tied to
 * the scroll position (no autoplay jank), and it fully reverses on scroll-up.
 * Cross-origin sites can't be scripted to scroll, so each embed *pans* its tall
 * iframe with a transform — visually identical, and it works cross-origin.
 */
export function SelectedWork() {
  const embedItems = homeEmbeds;
  const rest = homeFeatured;

  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const panelARef = useRef<HTMLDivElement>(null);
  const panelBRef = useRef<HTMLDivElement>(null);
  const embedARef = useRef<LiveSiteEmbedHandle>(null);
  const embedBRef = useRef<LiveSiteEmbedHandle>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const section = sectionRef.current;
    const a = panelARef.current;
    const b = panelBRef.current;
    if (!stage || !section || !a || !b || embedItems.length < 2) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      // No scroll-jacking, no pinning: panels rest at equal size and the embeds
      // keep their gentle ambient loop.
      embedARef.current?.setAmbient(true);
      embedBRef.current?.setAmbient(true);
      return;
    }

    const ctx = gsap.context(() => {
      // Resting state: equal flex weight.
      gsap.set([a, b], { flexGrow: 1, flexBasis: 0 });

      const grow = 1.9; // how dominant the focused panel becomes
      const shrink = 0.45; // how much the other panel yields

      const focus = (lead: HTMLElement, other: HTMLElement) =>
        gsap
          .timeline()
          .to(lead, { flexGrow: grow, duration: 1, ease: 'power3.inOut' }, 0)
          .to(other, { flexGrow: shrink, duration: 1, ease: 'power3.inOut' }, 0);

      const reset = (lead: HTMLElement, other: HTMLElement) =>
        gsap.timeline().to([lead, other], { flexGrow: 1, duration: 1, ease: 'power3.inOut' }, 0);

      const panTo = (embed: React.RefObject<LiveSiteEmbedHandle>, p: number) =>
        embed.current?.panTo(p, 1.4) ?? gsap.to({}, { duration: 1.4 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          // Long scroll distance: room for both panels to run a full cycle.
          end: '+=2600',
          pin: stage,
          pinSpacing: true,
          scrub: 1,
          anticipatePin: 1,
        },
        defaults: { ease: 'power2.inOut' },
      });

      // --- Panel A cycle: grow, scroll embed to bottom, back to top, reset ---
      tl.add(focus(a, b))
        .add(() => embedARef.current?.setAmbient(false))
        .add(panTo(embedARef, 1), '>-0.1')
        .add(panTo(embedARef, 0))
        .add(reset(a, b))
        .to({}, { duration: 0.3 }) // breath between cycles
        // --- Panel B cycle: now B does the exact same thing ---
        .add(focus(b, a))
        .add(() => embedBRef.current?.setAmbient(false))
        .add(panTo(embedBRef, 1), '>-0.1')
        .add(panTo(embedBRef, 0))
        .add(reset(b, a))
        .add(() => {
          embedARef.current?.setAmbient(true);
          embedBRef.current?.setAmbient(true);
        });
    }, section);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section ref={sectionRef} className="bg-bg" aria-label="Selected work">
      {/* Pinned stage: the two live embeds run their choreography here. */}
      <div ref={stageRef} className="relative flex min-h-screen flex-col justify-center">
        <div className="mx-auto w-full max-w-editorial px-5 sm:px-8">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="font-display text-display-md text-ink">Selected work</h2>
            <Link
              href="/websites"
              className="text-[15px] text-ink underline-offset-4 transition-opacity hover:opacity-60 hover:underline"
            >
              See all &rarr;
            </Link>
          </div>

          <div className="flex flex-col gap-6 lg:h-[64vh] lg:flex-row">
            {embedItems.slice(0, 2).map((w, i) => (
              <div
                key={w.name}
                ref={i === 0 ? panelARef : panelBRef}
                className="group relative flex min-h-[280px] flex-col overflow-hidden rounded-2xl border border-[rgba(14,14,14,0.1)] bg-ink-section"
                style={{ willChange: 'flex-grow' }}
              >
                <LiveSiteEmbed
                  ref={i === 0 ? embedARef : embedBRef}
                  src={w.embedUrl!}
                  title={`${w.name} — live preview`}
                  scale={2.8}
                  className="flex-1"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* The remaining work, ordinary editorial cards. */}
      {rest.length > 0 && (
        <div className="mx-auto max-w-editorial px-5 pb-24 pt-16 sm:px-8 sm:pb-32">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((w) => (
              <a
                key={w.name}
                href={w.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-ink/10 bg-white">
                  <Image
                    src={w.image}
                    alt={`${w.name} — ${w.domain}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-left-top transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="mt-4 flex items-baseline justify-between gap-3">
                  <h3 className="font-display text-2xl text-ink">{w.name}</h3>
                  <span className="text-[12px] text-muted">{w.domain}</span>
                </div>
                <p className="mt-1 text-[14px] leading-relaxed text-muted">{w.blurb}</p>
              </a>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
