'use client';
import { useRouter } from 'next/navigation';
import { useCart } from '@/lib/cart';

/** Puts a package in the cart and goes straight to checkout. */
export function OrderButton({ id, label, className = '' }: { id: string; label: string; className?: string }) {
  const { add, has } = useCart();
  const router = useRouter();
  return (
    <button type="button" className={className} onClick={() => { if (!has(id)) add(id); router.push('/checkout'); }}>
      {label}
    </button>
  );
}
