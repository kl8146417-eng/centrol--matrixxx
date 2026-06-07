'use client';

// Client-side helpers for the private admin dashboard.
// The admin pastes their blog:write token once; we keep it in sessionStorage
// (cleared when the tab closes) and send it as a bearer token to the blog API.
// Nothing here is a real "account" system — it's a thin gate over the existing
// token auth so one person can publish/edit from a browser instead of curl.

const TOKEN_KEY = 'cm_admin_token';

export type AdminPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  contentMarkdown: string | null;
  contentHtml: string;
  coverImageUrl: string | null;
  tags: string[];
  author: string;
  status: 'draft' | 'published';
  readingTime: number;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
  url: string;
};

export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return window.sessionStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string): void {
  window.sessionStorage.setItem(TOKEN_KEY, token.trim());
}

export function clearToken(): void {
  window.sessionStorage.removeItem(TOKEN_KEY);
}

function authHeaders(json = true): HeadersInit {
  const token = getToken();
  const h: Record<string, string> = {};
  if (token) h.Authorization = `Bearer ${token}`;
  if (json) h['Content-Type'] = 'application/json';
  return h;
}

export class ApiError extends Error {
  status: number;
  fields?: Record<string, string>;
  constructor(status: number, message: string, fields?: Record<string, string>) {
    super(message);
    this.status = status;
    this.fields = fields;
  }
}

async function parse<T>(res: Response): Promise<T> {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new ApiError(
      res.status,
      (data && (data.error as string)) || `Request failed (${res.status}).`,
      data?.fields as Record<string, string> | undefined
    );
  }
  return data as T;
}

export type AdminListResult = {
  posts: AdminPost[];
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  tokenLabel?: string;
};

/** Validate the current token and list all posts. Throws ApiError on failure. */
export async function listAll(params: {
  status?: 'draft' | 'published';
  q?: string;
  page?: number;
} = {}): Promise<AdminListResult> {
  const qs = new URLSearchParams();
  if (params.status) qs.set('status', params.status);
  if (params.q) qs.set('q', params.q);
  if (params.page) qs.set('page', String(params.page));
  const res = await fetch(`/api/blog/admin?${qs.toString()}`, {
    headers: authHeaders(false),
    cache: 'no-store',
  });
  return parse<AdminListResult>(res);
}

export type PostPayload = {
  title: string;
  slug?: string;
  excerpt?: string;
  contentMarkdown?: string;
  coverImageUrl?: string;
  tags?: string[];
  author?: string;
  status?: 'draft' | 'published';
};

export async function createPost(payload: PostPayload): Promise<AdminPost> {
  const res = await fetch('/api/blog', {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });
  return parse<AdminPost>(res);
}

export async function getPost(id: string): Promise<AdminPost> {
  const res = await fetch(`/api/blog/${id}`, {
    headers: authHeaders(false),
    cache: 'no-store',
  });
  return parse<AdminPost>(res);
}

export async function updatePost(id: string, payload: Partial<PostPayload>): Promise<AdminPost> {
  const res = await fetch(`/api/blog/${id}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });
  return parse<AdminPost>(res);
}

export async function deletePost(id: string): Promise<void> {
  const res = await fetch(`/api/blog/${id}`, {
    method: 'DELETE',
    headers: authHeaders(false),
  });
  await parse(res);
}

/** Render markdown to the exact sanitized HTML the site stores (for preview). */
export async function renderPreview(markdown: string): Promise<string> {
  const res = await fetch('/api/blog/preview', {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ markdown }),
  });
  const data = await parse<{ html: string }>(res);
  return data.html;
}
