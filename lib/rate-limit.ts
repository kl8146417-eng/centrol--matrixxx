// Lightweight in-memory fixed-window rate limiter.
// Good enough for a small serverless site: each warm function instance keeps its own window, so a
// determined attacker spread across instances gets a little more through. Swap for Upstash/Redis or
// Netlify Blobs if abuse ever shows up in the contacts table.

type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

/**
 * Count one hit for `key`. Defaults (60 per minute) are the blog API's per-token limit.
 * Use a namespaced key per caller, e.g. `contact:<ip>`.
 */
export function rateLimit(key: string, max = 60, windowMs = 60_000): { allowed: boolean; retryAfter: number } {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || now > bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    if (buckets.size > 5000) for (const [k, b] of buckets) if (now > b.resetAt) buckets.delete(k);
    return { allowed: true, retryAfter: 0 };
  }

  if (bucket.count >= max) {
    return { allowed: false, retryAfter: Math.ceil((bucket.resetAt - now) / 1000) };
  }

  bucket.count += 1;
  return { allowed: true, retryAfter: 0 };
}

/** Best-effort client IP behind Netlify's proxy. */
export function clientIp(req: Request): string {
  const h = req.headers;
  return (
    h.get('x-nf-client-connection-ip') ||
    h.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    h.get('x-real-ip') ||
    'unknown'
  );
}
