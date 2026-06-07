'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import PostEditor from '../PostEditor';
import { AdminPost, ApiError, getPost, getToken } from '../lib';

export default function EditPostPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = params?.id;

  const [post, setPost] = useState<AdminPost | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!getToken()) {
      router.replace('/admin');
      return;
    }
    if (!id) return;
    getPost(id)
      .then(setPost)
      .catch((e) => {
        if (e instanceof ApiError && e.status === 401) {
          router.replace('/admin');
          return;
        }
        setErr(e instanceof Error ? e.message : 'Could not load this post.');
      });
  }, [id, router]);

  if (err) {
    return (
      <main className="admin-shell">
        <p className="admin-error">{err}</p>
      </main>
    );
  }
  if (!post) {
    return (
      <main className="admin-shell">
        <p className="admin-empty">Loading…</p>
      </main>
    );
  }
  return <PostEditor existing={post} />;
}
