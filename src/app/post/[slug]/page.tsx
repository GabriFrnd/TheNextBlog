import { SinglePost } from '@/components/SinglePost';
import { SpinLoader } from '@/components/SpinLoader';

import { findPublicPostBySlug } from '@/lib/post/queries/public';
import { Metadata } from 'next';

import { Suspense } from 'react';
import clsx from 'clsx';

export const dynamic = 'force-static'; /* Rota estática */

type PostSlugPageProps = {
  /* 'params', por padrão, é uma Promise */
  params: Promise<{ slug: string }> /* slug: nome da pasta */;
};

export async function generateMetadata({
  params,
}: PostSlugPageProps): Promise<Metadata> {
  const { slug } = await params; /* 'slug' vem dentro de 'params' */
  const post = await findPublicPostBySlug(slug);

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function PostSlugPage({ params }: PostSlugPageProps) {
  const { slug } = await params; /* 'slug' vem dentro de 'params' */

  return (
    <Suspense fallback={<SpinLoader className={clsx('min-h-20', 'mb-5')} />}>
      <SinglePost slug={slug} />
    </Suspense>
  );
}
