// Lightweight in-memory token-bucket rate limiter, keyed by token id.
// Good enough for a single-region serverless deployment; swap for Upstash/Redis
// if the blog API ever runs across many concurrent instances.

const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 60;

type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

export function rateLimit(key: string): { allowed: boolean; retryAfter: number } {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || now > bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, retryAfter: 0 };
  }

  if (bucket.count >= MAX_PER_WINDOW) {
    return { allowed: false, retryAfter: Math.ceil((bucket.resetAt - now) / 1000) };
  }

  bucket.count += 1;
  return { allowed: true, retryAfter: 0 };
}
