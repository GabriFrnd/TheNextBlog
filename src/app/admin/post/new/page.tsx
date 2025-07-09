import { ManagePostForm } from '@/components/Admin/ManagePostForm';
import { Metadata } from 'next';
import clsx from 'clsx';

export const dynamic = 'force-dynamic'; /* Rota dinâmica */

export const metadata: Metadata = {
  title: 'Criar Novo Post',
}

export default async function AdminNewPostPage() {
  return (
    <div className={clsx('flex flex-col', 'gap-6')}>
      <h1><b>Criar Novo Post</b></h1>
      <ManagePostForm mode='create' />
    </div>
  );
}
