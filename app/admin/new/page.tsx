'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PostEditor from '../PostEditor';
import { getToken } from '../lib';

export default function NewPostPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!getToken()) {
      router.replace('/admin');
      return;
    }
    setReady(true);
  }, [router]);

  if (!ready) return null;
  return <PostEditor />;
}
