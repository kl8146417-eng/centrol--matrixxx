'use client';
// One consistent animated icon set: lucide-animated.com (MIT) on `motion`.
// Animates when the nearest [data-icon-host] (card/button) is hovered, and once when scrolled into view.
// MotionConfig reducedMotion="user" (in layout) disables motion for prefers-reduced-motion users.
import { useEffect, useRef, type ComponentType, type RefAttributes } from 'react';
import { MonitorCheckIcon } from './animated/monitor-check';
import { SmartphoneChargingIcon } from './animated/smartphone-charging';
import { MicIcon } from './animated/mic';
import { BoxIcon } from './animated/box';
import { MessageCircleMoreIcon } from './animated/message-circle-more';
import { PaletteIcon } from './animated/palette';
import { HomeIcon } from './animated/home';
import { WorkflowIcon } from './animated/workflow';
import { SearchIcon } from './animated/search';
import { PenToolIcon } from './animated/pen-tool';
import { RocketIcon } from './animated/rocket';
import { TrendingUpIcon } from './animated/trending-up';
import { ArrowUpRightIcon } from './animated/arrow-up-right';
import { ArrowRightIcon } from './animated/arrow-right';
import { MessageCircleIcon } from './animated/message-circle';
import { MailCheckIcon } from './animated/mail-check';
import { CartIcon } from './animated/cart';
import { SparklesIcon } from './animated/sparkles';

type Handle = { startAnimation: () => void; stopAnimation: () => void };
type IconC = ComponentType<{ size?: number; className?: string } & RefAttributes<Handle>>;
const ICONS = {
  monitor: MonitorCheckIcon, phone: SmartphoneChargingIcon, mic: MicIcon, box: BoxIcon, chat: MessageCircleMoreIcon,
  palette: PaletteIcon, home: HomeIcon, workflow: WorkflowIcon, search: SearchIcon, pen: PenToolIcon, rocket: RocketIcon,
  trend: TrendingUpIcon, arrowUR: ArrowUpRightIcon, arrow: ArrowRightIcon, whatsapp: MessageCircleIcon, mail: MailCheckIcon,
  cart: CartIcon, sparkles: SparklesIcon,
} as unknown as Record<string, IconC>;
export type IconName = 'monitor' | 'phone' | 'mic' | 'box' | 'chat' | 'palette' | 'home' | 'workflow' | 'search' | 'pen' | 'rocket' | 'trend' | 'arrowUR' | 'arrow' | 'whatsapp' | 'mail' | 'cart' | 'sparkles';

export function AnimIcon({ name, size = 22, className = '', inView = false }: { name: IconName; size?: number; className?: string; inView?: boolean }) {
  const ref = useRef<Handle>(null);
  const box = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = box.current; if (!el) return;
    const host = (el.closest('[data-icon-host]') as HTMLElement | null) ?? el;
    const on = () => ref.current?.startAnimation(); const off = () => ref.current?.stopAnimation();
    host.addEventListener('mouseenter', on); host.addEventListener('mouseleave', off); host.addEventListener('focusin', on);
    let io: IntersectionObserver | undefined;
    if (inView) { io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { on(); io?.disconnect(); } }, { threshold: 0.6 }); io.observe(el); }
    return () => { host.removeEventListener('mouseenter', on); host.removeEventListener('mouseleave', off); host.removeEventListener('focusin', on); io?.disconnect(); };
  }, [inView]);
  const C = ICONS[name];
  return <span ref={box} aria-hidden="true" className={`inline-flex ${className}`}><C ref={ref} size={size} className="pointer-events-none" /></span>;
}
