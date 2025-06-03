import { FeaturedPost } from '@/components/FeaturedPost';
import { PostsList } from '@/components/PostsList';

import { SpinLoader } from '@/components/SpinLoader';
import { Suspense } from 'react';

import clsx from 'clsx';
export const dynamic = 'force-static'; /* Rota estática */

export default async function HomePage() {
  return (
    <>
      <Suspense fallback={<SpinLoader className={clsx('min-h-20', 'mb-5')} />}>
        <FeaturedPost />
        <PostsList />
      </Suspense>
    </>
  );
}
