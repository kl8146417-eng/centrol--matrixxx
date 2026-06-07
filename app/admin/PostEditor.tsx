'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  AdminPost,
  ApiError,
  PostPayload,
  createPost,
  renderPreview,
  updatePost,
} from './lib';

type Props = { existing?: AdminPost };

export default function PostEditor({ existing }: Props) {
  const router = useRouter();
  const isEdit = Boolean(existing);

  const [title, setTitle] = useState(existing?.title ?? '');
  const [slug, setSlug] = useState(existing?.slug ?? '');
  const [excerpt, setExcerpt] = useState(existing?.excerpt ?? '');
  const [cover, setCover] = useState(existing?.coverImageUrl ?? '');
  const [tags, setTags] = useState((existing?.tags ?? []).join(', '));
  const [author, setAuthor] = useState(existing?.author ?? 'Centrol Matrix');
  const [body, setBody] = useState(existing?.contentMarkdown ?? '');
  const [status, setStatus] = useState<'draft' | 'published'>(existing?.status ?? 'draft');

  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [fieldErrs, setFieldErrs] = useState<Record<string, string>>({});

  const [previewHtml, setPreviewHtml] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const bodyRef = useRef<HTMLTextAreaElement>(null);

  // Faithful preview, debounced, using the same renderer the API stores.
  useEffect(() => {
    if (!showPreview) return;
    const t = setTimeout(() => {
      renderPreview(body).then(setPreviewHtml).catch(() => setPreviewHtml(''));
    }, 350);
    return () => clearTimeout(t);
  }, [body, showPreview]);

  function insertImage() {
    const url = window.prompt('Image URL (paste a hosted image link):');
    if (!url) return;
    const alt = window.prompt('Short description of the image (alt text):') ?? '';
    const snippet = `\n\n![${alt}](${url.trim()})\n\n`;
    const el = bodyRef.current;
    if (!el) {
      setBody((b) => b + snippet);
      return;
    }
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const next = body.slice(0, start) + snippet + body.slice(end);
    setBody(next);
    requestAnimationFrame(() => {
      el.focus();
      const pos = start + snippet.length;
      el.setSelectionRange(pos, pos);
    });
  }

  function wrap(before: string, after = before) {
    const el = bodyRef.current;
    if (!el) return;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const selected = body.slice(start, end) || 'text';
    const next = body.slice(0, start) + before + selected + after + body.slice(end);
    setBody(next);
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(start + before.length, start + before.length + selected.length);
    });
  }

  function buildPayload(): PostPayload {
    const tagList = tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);
    return {
      title: title.trim(),
      slug: slug.trim() || undefined,
      excerpt: excerpt.trim() || undefined,
      contentMarkdown: body,
      coverImageUrl: cover.trim() || undefined,
      tags: tagList.length ? tagList : undefined,
      author: author.trim() || undefined,
      status,
    };
  }

  async function save(publishNow?: boolean) {
    setErr(null);
    setFieldErrs({});
    if (!title.trim()) {
      setFieldErrs({ title: 'A title is required.' });
      return;
    }
    if (!body.trim()) {
      setErr('Write something in the body before saving.');
      return;
    }
    setSaving(true);
    const payload = buildPayload();
    if (publishNow) payload.status = 'published';
    try {
      if (isEdit && existing) {
        await updatePost(existing.id, payload);
      } else {
        await createPost(payload);
      }
      router.push('/admin');
      router.refresh();
    } catch (e) {
      if (e instanceof ApiError && e.fields) setFieldErrs(e.fields);
      setErr(e instanceof Error ? e.message : 'Could not save.');
      setSaving(false);
    }
  }

  return (
    <main className="admin-shell">
      <header className="admin-topbar">
        <div>
          <Link href="/admin" className="admin-back">
            ← Back to posts
          </Link>
          <h1 className="admin-h1">{isEdit ? 'Edit post' : 'New post'}</h1>
        </div>
        <div className="admin-topbar__actions">
          <button
            className="admin-btn admin-btn--ghost"
            onClick={() => setShowPreview((s) => !s)}
            type="button"
          >
            {showPreview ? 'Hide preview' : 'Preview'}
          </button>
          <button
            className="admin-btn admin-btn--ghost"
            disabled={saving}
            onClick={() => {
              setStatus('draft');
              save(false);
            }}
            type="button"
          >
            Save draft
          </button>
          <button
            className="admin-btn admin-btn--primary"
            disabled={saving}
            onClick={() => save(true)}
            type="button"
          >
            {saving ? 'Saving…' : isEdit ? 'Save & publish' : 'Publish'}
          </button>
        </div>
      </header>

      {err && <p className="admin-error" role="alert">{err}</p>}

      <div className={`admin-editor ${showPreview ? 'admin-editor--split' : ''}`}>
        <div className="admin-editor__form">
          <label className="admin-field">
            <span className="admin-label">Title</span>
            <input
              className="admin-input admin-input--title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What's the post called?"
              aria-invalid={Boolean(fieldErrs.title)}
            />
            {fieldErrs.title && <span className="admin-fielderr">{fieldErrs.title}</span>}
          </label>

          <div className="admin-grid2">
            <label className="admin-field">
              <span className="admin-label">Slug (URL)</span>
              <input
                className="admin-input"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="auto from title if blank"
              />
            </label>
            <label className="admin-field">
              <span className="admin-label">Author</span>
              <input
                className="admin-input"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </label>
          </div>

          <label className="admin-field">
            <span className="admin-label">Excerpt</span>
            <textarea
              className="admin-textarea admin-textarea--sm"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="One or two lines that show on the blog index."
            />
          </label>

          <label className="admin-field">
            <span className="admin-label">Cover image URL</span>
            <input
              className="admin-input"
              value={cover}
              onChange={(e) => setCover(e.target.value)}
              placeholder="https://…/cover.jpg"
            />
            {cover.trim() && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={cover.trim()} alt="" className="admin-coverthumb" />
            )}
          </label>

          <label className="admin-field">
            <span className="admin-label">Tags (comma separated)</span>
            <input
              className="admin-input"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="automation, seo, websites"
            />
          </label>

          <div className="admin-field">
            <div className="admin-label admin-bodylabel">
              <span>Body</span>
              <span className="admin-toolbtns">
                <button type="button" className="admin-tool" onClick={() => wrap('**')}>
                  Bold
                </button>
                <button type="button" className="admin-tool" onClick={() => wrap('_')}>
                  Italic
                </button>
                <button type="button" className="admin-tool" onClick={() => wrap('## ', '')}>
                  H2
                </button>
                <button type="button" className="admin-tool" onClick={() => wrap('[', '](url)')}>
                  Link
                </button>
                <button type="button" className="admin-tool admin-tool--accent" onClick={insertImage}>
                  + Image
                </button>
              </span>
            </div>
            <textarea
              ref={bodyRef}
              className="admin-textarea admin-textarea--body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder={'Write in Markdown.\n\n## A heading\n\nA paragraph, then an image with the + Image button.'}
            />
            <p className="admin-hint">
              Markdown. Use <b>+ Image</b> to drop in a hosted image. Status:{' '}
              <b>{status === 'published' ? 'Published' : 'Draft'}</b>.
            </p>
          </div>
        </div>

        {showPreview && (
          <aside className="admin-editor__preview">
            <p className="admin-label">Preview</p>
            {cover.trim() && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={cover.trim()} alt="" className="admin-preview-cover" />
            )}
            <h2 className="admin-preview-title">{title || 'Untitled'}</h2>
            <div
              className="admin-prose"
              dangerouslySetInnerHTML={{ __html: previewHtml }}
            />
          </aside>
        )}
      </div>
    </main>
  );
}
