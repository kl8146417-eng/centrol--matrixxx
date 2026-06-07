'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import {
  ApiError,
  AdminPost,
  clearToken,
  deletePost,
  getToken,
  listAll,
  setToken,
  updatePost,
} from './lib';

type StatusFilter = 'all' | 'published' | 'draft';

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setAuthed(Boolean(getToken()));
    setReady(true);
  }, []);

  if (!ready) return null;
  if (!authed) return <LoginGate onAuthed={() => setAuthed(true)} />;
  return <Dashboard onSignOut={() => { clearToken(); setAuthed(false); }} />;
}

/* ---------------------------------------------------------------- Login --- */

function LoginGate({ onAuthed }: { onAuthed: () => void }) {
  const [value, setValue] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const token = value.trim();
    if (!token) return;
    setBusy(true);
    setErr(null);
    setToken(token);
    try {
      await listAll({ page: 1 }); // validates the token against the API
      onAuthed();
    } catch (e) {
      clearToken();
      const msg =
        e instanceof ApiError
          ? e.status === 401
            ? 'That key was not accepted. Check it and try again.'
            : e.status === 403
              ? 'This key cannot publish. It needs the blog:write scope.'
              : e.message
          : 'Could not reach the server. Try again.';
      setErr(msg);
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="admin-login">
      <div className="admin-login__card">
        <p className="admin-eyebrow">Centrol Matrix</p>
        <h1 className="admin-login__title">Studio access</h1>
        <p className="admin-login__lede">
          Paste your publishing key to manage the blog. The key stays on this
          device for this session only.
        </p>
        <form onSubmit={submit} className="admin-form">
          <label className="admin-field">
            <span className="admin-label">Publishing key</span>
            <input
              type="password"
              autoComplete="off"
              autoFocus
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="cm_…"
              className="admin-input"
              aria-invalid={Boolean(err)}
            />
          </label>
          {err && <p className="admin-error" role="alert">{err}</p>}
          <button type="submit" className="admin-btn admin-btn--primary" disabled={busy}>
            {busy ? 'Checking…' : 'Enter studio'}
          </button>
        </form>
      </div>
    </main>
  );
}

/* ------------------------------------------------------------ Dashboard --- */

function Dashboard({ onSignOut }: { onSignOut: () => void }) {
  const [posts, setPosts] = useState<AdminPost[]>([]);
  const [filter, setFilter] = useState<StatusFilter>('all');
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [label, setLabel] = useState<string | undefined>();

  const load = useCallback(async () => {
    setLoading(true);
    setErr(null);
    try {
      const res = await listAll({
        status: filter === 'all' ? undefined : filter,
        q: q.trim() || undefined,
      });
      setPosts(res.posts);
      setLabel(res.tokenLabel);
    } catch (e) {
      if (e instanceof ApiError && e.status === 401) {
        onSignOut();
        return;
      }
      setErr(e instanceof Error ? e.message : 'Failed to load posts.');
    } finally {
      setLoading(false);
    }
  }, [filter, q, onSignOut]);

  useEffect(() => {
    load();
  }, [load]);

  async function togglePublish(post: AdminPost) {
    const next = post.status === 'published' ? 'draft' : 'published';
    setPosts((p) => p.map((x) => (x.id === post.id ? { ...x, status: next } : x)));
    try {
      await updatePost(post.id, { status: next });
    } catch (e) {
      setPosts((p) => p.map((x) => (x.id === post.id ? { ...x, status: post.status } : x)));
      setErr(e instanceof Error ? e.message : 'Could not change status.');
    }
  }

  async function remove(post: AdminPost) {
    if (!window.confirm(`Delete “${post.title}”? This hides it from the site.`)) return;
    const prev = posts;
    setPosts((p) => p.filter((x) => x.id !== post.id));
    try {
      await deletePost(post.id);
    } catch (e) {
      setPosts(prev);
      setErr(e instanceof Error ? e.message : 'Could not delete.');
    }
  }

  return (
    <main className="admin-shell">
      <header className="admin-topbar">
        <div>
          <p className="admin-eyebrow">Centrol Matrix · Studio</p>
          <h1 className="admin-h1">Blog</h1>
        </div>
        <div className="admin-topbar__actions">
          {label && <span className="admin-keytag">{label}</span>}
          <Link href="/admin/new" className="admin-btn admin-btn--primary">
            New post
          </Link>
          <button className="admin-btn admin-btn--ghost" onClick={onSignOut}>
            Sign out
          </button>
        </div>
      </header>

      <div className="admin-toolbar">
        <div className="admin-tabs" role="tablist">
          {(['all', 'published', 'draft'] as StatusFilter[]).map((f) => (
            <button
              key={f}
              role="tab"
              aria-selected={filter === f}
              className={`admin-tab ${filter === f ? 'is-active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f === 'all' ? 'All' : f === 'published' ? 'Published' : 'Drafts'}
            </button>
          ))}
        </div>
        <form
          className="admin-search"
          onSubmit={(e) => {
            e.preventDefault();
            load();
          }}
        >
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search titles…"
            className="admin-input admin-input--sm"
            aria-label="Search posts"
          />
        </form>
      </div>

      {err && <p className="admin-error" role="alert">{err}</p>}

      {loading ? (
        <p className="admin-empty">Loading…</p>
      ) : posts.length === 0 ? (
        <div className="admin-empty">
          <p>No posts here yet.</p>
          <Link href="/admin/new" className="admin-btn admin-btn--primary">
            Write the first one
          </Link>
        </div>
      ) : (
        <ul className="admin-list">
          {posts.map((post) => (
            <li key={post.id} className="admin-row">
              <div className="admin-row__main">
                <span className={`admin-pill admin-pill--${post.status}`}>
                  {post.status === 'published' ? 'Live' : 'Draft'}
                </span>
                <div>
                  <Link href={`/admin/${post.id}`} className="admin-row__title">
                    {post.title}
                  </Link>
                  <p className="admin-row__meta">
                    /{post.slug} · {post.readingTime} min ·{' '}
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="admin-row__actions">
                {post.status === 'published' && (
                  <a
                    href={`/blog/${post.slug}`}
                    target="_blank"
                    rel="noreferrer"
                    className="admin-btn admin-btn--ghost admin-btn--sm"
                  >
                    View
                  </a>
                )}
                <Link
                  href={`/admin/${post.id}`}
                  className="admin-btn admin-btn--ghost admin-btn--sm"
                >
                  Edit
                </Link>
                <button
                  className="admin-btn admin-btn--ghost admin-btn--sm"
                  onClick={() => togglePublish(post)}
                >
                  {post.status === 'published' ? 'Unpublish' : 'Publish'}
                </button>
                <button
                  className="admin-btn admin-btn--danger admin-btn--sm"
                  onClick={() => remove(post)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
