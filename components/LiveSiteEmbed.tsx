'use client';

import { forwardRef, useImperativeHandle, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

/**
 * Embeds a live, third-party website inside a clipping frame.
 *
 * Cross-origin iframes can't be scrolled from the parent (the browser blocks
 * `contentWindow.scrollTo` across origins). So instead of scripting the iframe's
 * own scrollbar, we render the iframe much taller than its frame and *pan* it
 * vertically with a transform. Visually that's identical to scrolling through
 * the embedded page, and it works cross-origin.
 *
 * The component exposes an imperative `panTo(progress)` so a parent timeline can
 * drive the pan (0 = top of the embedded page, 1 = bottom). Left alone, it runs
 * a slow ambient up/down loop.
 */

export interface LiveSiteEmbedHandle {
  /** Pan the embedded page to a 0..1 position. Returns the GSAP tween. */
  panTo: (progress: number, duration?: number, ease?: string) => gsap.core.Tween;
  /** Pause/resume the ambient loop. */
  setAmbient: (on: boolean) => void;
}

interface LiveSiteEmbedProps {
  src: string;
  title: string;
  /** How much taller the iframe is than the frame, e.g. 2.6 => 260% height. */
  scale?: number;
  className?: string;
}

export const LiveSiteEmbed = forwardRef<LiveSiteEmbedHandle, LiveSiteEmbedProps>(
  function LiveSiteEmbed({ src, title, scale = 2.6, className }, ref) {
    const frameRef = useRef<HTMLDivElement>(null);
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const loopRef = useRef<gsap.core.Tween | null>(null);
    const reducedRef = useRef(false);

    // Travel distance in px = how far we can shift the iframe up before its
    // bottom edge reaches the frame's bottom edge.
    const maxShift = () => {
      const frame = frameRef.current;
      if (!frame) return 0;
      return Math.max(0, frame.clientHeight * (scale - 1));
    };

    useImperativeHandle(ref, () => ({
      panTo: (progress, duration = 1.2, ease = 'power2.inOut') => {
        const iframe = iframeRef.current;
        const y = -maxShift() * Math.min(1, Math.max(0, progress));
        loopRef.current?.pause();
        return gsap.to(iframe, { y, duration, ease });
      },
      setAmbient: (on) => {
        if (on) loopRef.current?.play();
        else loopRef.current?.pause();
      },
    }));

    // Ambient slow pan loop (gentle, only when not reduced-motion).
    useEffect(() => {
      reducedRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const iframe = iframeRef.current;
      if (!iframe || reducedRef.current) return;

      const build = () => {
        loopRef.current?.kill();
        gsap.set(iframe, { y: 0 });
        loopRef.current = gsap.to(iframe, {
          y: () => -maxShift(),
          duration: 9,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          paused: true,
        });
      };
      build();

      const onResize = () => build();
      window.addEventListener('resize', onResize);
      return () => {
        window.removeEventListener('resize', onResize);
        loopRef.current?.kill();
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [scale]);

    return (
      <div
        ref={frameRef}
        className={className}
        style={{ position: 'relative', overflow: 'hidden' }}
      >
        <iframe
          ref={iframeRef}
          src={src}
          title={title}
          loading="lazy"
          // sandbox lets the site render and run its own scripts, but keeps it
          // from navigating the top window.
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
          referrerPolicy="no-referrer"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: `${scale * 100}%`,
            border: 0,
            // Block direct interaction so the page-level scroll never gets
            // trapped inside the embed; the pan is purely presentational.
            pointerEvents: 'none',
            willChange: 'transform',
          }}
        />
      </div>
    );
  }
);
