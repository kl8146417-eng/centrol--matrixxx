import { createHash, randomBytes } from 'crypto';
import { eq } from 'drizzle-orm';
import { getDb } from '@/lib/db';
import { apiTokens, type ApiToken } from '@/lib/db/schema';

const PEPPER = process.env.CM_TOKEN_PEPPER ?? '';

/** SHA-256 hash of (token + pepper). Stored, never the plaintext. */
export function hashToken(plaintext: string): string {
  return createHash('sha256').update(`${plaintext}${PEPPER}`).digest('hex');
}

/** Generate a new opaque token. Prefix makes it recognizable in logs. */
export function generateToken(): string {
  return `cm_${randomBytes(24).toString('hex')}`;
}

export function getBearerToken(req: Request): string | null {
  const header = req.headers.get('authorization') ?? '';
  const match = header.match(/^Bearer\s+(.+)$/i);
  return match ? match[1].trim() : null;
}

export type AuthResult =
  | { ok: true; token: ApiToken }
  | { ok: false; status: 401 | 403; error: string };

/**
 * Verify a bearer token and (optionally) a required scope.
 * Updates last_used_at on success.
 */
export async function authenticate(req: Request, requiredScope?: string): Promise<AuthResult> {
  const presented = getBearerToken(req);
  if (!presented) return { ok: false, status: 401, error: 'Missing bearer token.' };

  const db = getDb();
  const hash = hashToken(presented);
  const [token] = await db.select().from(apiTokens).where(eq(apiTokens.tokenHash, hash)).limit(1);

  if (!token) return { ok: false, status: 401, error: 'Invalid token.' };
  if (token.revoked) return { ok: false, status: 401, error: 'Token revoked.' };
  if (token.expiresAt && token.expiresAt.getTime() < Date.now())
    return { ok: false, status: 401, error: 'Token expired.' };
  if (requiredScope && !token.scopes.includes(requiredScope))
    return { ok: false, status: 403, error: `Token missing scope: ${requiredScope}.` };

  await db
    .update(apiTokens)
    .set({ lastUsedAt: new Date() })
    .where(eq(apiTokens.id, token.id));

  return { ok: true, token };
}
