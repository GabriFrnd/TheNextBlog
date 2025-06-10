'use server';

import { drizzleDataBase } from '@/db/drizzle';
import { postsTable } from '@/db/drizzle/schemas';

import { postRepository } from '@/repositories/post';
import { asyncDelay } from '@/utils/async-delay';

import { eq } from 'drizzle-orm';
import { revalidateTag } from 'next/cache';

export async function deletePostAction(id: string) {
  await asyncDelay(2000);

  if (!id || typeof id !== 'string') {
    return {
      error: 'Dados inválidos.',
    };
  }

  const post = await postRepository.findById(id).catch(() => undefined);

  if (!post) {
    return {
      error: 'O post não existe.',
    };
  }

  await drizzleDataBase.delete(postsTable).where(eq(postsTable.id, id));

  revalidateTag('posts');
  revalidateTag(`post-${post.slug}`);

  return {
    error: '',
  };
}
