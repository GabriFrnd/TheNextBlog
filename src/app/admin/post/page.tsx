import { PostsListAdmin } from '@/components/Admin/PostsListAdmin';
import { SpinLoader } from '@/components/SpinLoader';

import { Metadata } from 'next';
import { Suspense } from 'react';

import clsx from 'clsx';
export const dynamic = 'force-dynamic'; /* Rota dinâmica */

export const metadata: Metadata = {
  title: 'Post Admin',
};

export default async function AdminPostPage() {
  return (
    <Suspense fallback={<SpinLoader className={clsx('pb-16')} />}>
      <PostsListAdmin />
    </Suspense>
  );
}
