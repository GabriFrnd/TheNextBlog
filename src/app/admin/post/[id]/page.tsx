import { ManagePostForm } from '@/components/Admin/ManagePostForm';
import { Metadata } from 'next';

import { findPostByIdAdmin } from '@/lib/post/queries/admin';
import { notFound } from 'next/navigation';

import { makePublicPostFromDb } from '@/dto/post/dto';
import clsx from 'clsx';

export const dynamic = 'force-dynamic'; /* Rota dinâmica */

export const metadata: Metadata = {
  title: 'Editar Post',
};

type AdminPostIdPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AdminPostIdPage({
  params,
}: AdminPostIdPageProps) {
  const { id } = await params;
  const post = await findPostByIdAdmin(id).catch(() => undefined);

  if (!post) notFound();

  const publicPost = makePublicPostFromDb(post);

  return (
    <div className={clsx('flex flex-col', 'gap-6')}>
      <h1>
        <b>Editar Post</b>
      </h1>
      <ManagePostForm mode='update' publicPost={publicPost} />
    </div>
  );
}
