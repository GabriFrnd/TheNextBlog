import { postRepository } from '@/repositories/post';
import { notFound } from 'next/navigation';
import { cache } from 'react';

export const findAllPublicPosts = cache(
  async () => await postRepository.findAllPublic(),
);

export const findPostById = cache(
  async (id: string) => await postRepository.findById(id),
);

export const findPostBySlug = cache(async (slug: string) => {
  const post = postRepository.findBySlug(slug).catch(() => undefined);
  if (!post) notFound();

  return post;
});
