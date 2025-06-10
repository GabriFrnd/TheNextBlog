import { findAllPostsAdmin } from '@/lib/post/queries/admin';
import { DeletePostButton } from '../DeletePostButton';

import clsx from 'clsx';
import Link from 'next/link';

import ErrorMessage from '../../ErrorMessage';

export async function PostsListAdmin() {
  const posts = await findAllPostsAdmin();

  if (posts.length <= 0)
    return (
      <ErrorMessage
        contentTitle='Houve um imprevisto!'
        content='Ainda não há posts.'
      />
    );

  return (
    <div className={clsx('mb-16')}>
      {posts.map(post => {
        return (
          <div
            className={clsx(
              'flex',
              'gap-2 px-2 py-2',
              'items-center justify-between',
              !post.published && 'bg-slate-300',
            )}
            key={post.id}
          >
            <Link href={`/admin/post/${post.id}`}>{post.title}</Link>

            {!post.published && (
              <span className={clsx('italic', 'text-slate-600 text-xs')}>
                (Não publicado)
              </span>
            )}

            <DeletePostButton id={post.id} title={post.title} />
          </div>
        );
      })}
    </div>
  );
}
