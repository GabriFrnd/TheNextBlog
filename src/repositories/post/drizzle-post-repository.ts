import { PostModel } from '@/models/post/post-model';
import { PostRepository } from './post-repository';

import { drizzleDataBase } from '@/db/drizzle';
import { asyncDelay } from '@/utils/async-delay';

import { SIMULATE } from '@/lib/constants';

export class DrizzlePostRepository implements PostRepository {
  async findAllPublic(): Promise<PostModel[]> {
    await asyncDelay(SIMULATE); /* Função para delay */

    const posts = await drizzleDataBase.query.posts.findMany({
      orderBy: (posts, { desc }) => desc(posts.createdAt),
      where: (posts, { eq }) => eq(posts.published, true),
    });

    return posts;
  }

  async findBySlugPublic(slug: string): Promise<PostModel> {
    await asyncDelay(SIMULATE); /* Função para delay */

    const post = await drizzleDataBase.query.posts.findFirst({
      where: (posts, { eq, and }) =>
        and(eq(posts.published, true), eq(posts.slug, slug)),
    });

    if (!post) throw new Error('Post não encontrado.');
    return post;
  }

  async findAll(): Promise<PostModel[]> {
    await asyncDelay(SIMULATE); /* Função para delay */

    const posts = await drizzleDataBase.query.posts.findMany({
      orderBy: (posts, { desc }) => desc(posts.createdAt),
    });

    return posts;
  }

  async findById(id: string): Promise<PostModel> {
    await asyncDelay(SIMULATE); /* Função para delay */
    
    const post = await drizzleDataBase.query.posts.findFirst({
      where: (posts, { eq }) => eq(posts.id, id),
    });

    if (!post) throw new Error('Post não encontrado.');
    return post;
  }
}
