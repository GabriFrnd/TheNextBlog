import { PostModel } from '@/models/post/post-model';
import { PostRepository } from './post-repository';

import { drizzleDataBase } from '@/db/drizzle';
import { postsTable } from '@/db/drizzle/schemas';

import { eq } from 'drizzle-orm';

export class DrizzlePostRepository implements PostRepository {
  async findAllPublic(): Promise<PostModel[]> {
    const posts = await drizzleDataBase.query.posts.findMany({
      orderBy: (posts, { desc }) => desc(posts.createdAt),
      where: (posts, { eq }) => eq(posts.published, true),
    });

    return posts;
  }

  async findBySlugPublic(slug: string): Promise<PostModel> {
    const post = await drizzleDataBase.query.posts.findFirst({
      where: (posts, { eq, and }) =>
        and(eq(posts.published, true), eq(posts.slug, slug)),
    });

    if (!post) throw new Error('Post não encontrado.');
    return post;
  }

  async findAll(): Promise<PostModel[]> {
    const posts = await drizzleDataBase.query.posts.findMany({
      orderBy: (posts, { desc }) => desc(posts.createdAt),
    });

    return posts;
  }

  async findById(id: string): Promise<PostModel> {
    const post = await drizzleDataBase.query.posts.findFirst({
      where: (posts, { eq }) => eq(posts.id, id),
    });

    if (!post) throw new Error('Post não encontrado.');
    return post;
  }

  async create(post: PostModel): Promise<PostModel> {
    const postExists = await drizzleDataBase.query.posts.findFirst({
      where: (posts, { or, eq }) =>
        or(eq(posts.id, post.id), eq(posts.slug, post.slug)),
      columns: { id: true },
    });

    if (!!postExists) {
      throw new Error('Post com ID ou slug já existente na base de dados.');
    }

    await drizzleDataBase.insert(postsTable).values(post);
    return post;
  }

  async delete(id: string): Promise<PostModel> {
    const post = await drizzleDataBase.query.posts.findFirst({
      where: (posts, { eq }) => eq(posts.id, id),
    });

    if (!post) {
      throw new Error('O post não existe.');
    }

    await drizzleDataBase.delete(postsTable).where(eq(postsTable.id, id));
    return post;
  }

  async update(
    id: string,
    newPostData: Omit<PostModel, 'id' | 'slug' | 'createdAt' | 'updatedAt'>,
  ): Promise<PostModel> {
    const oldPost = await drizzleDataBase.query.posts.findFirst({
      where: (posts, { eq }) => eq(posts.id, id),
    });

    if (!oldPost) {
      throw new Error('O post não existe.');
    }

    const updatedAt = new Date().toISOString();

    const postData = {
      author: newPostData.author,
      content: newPostData.content,
      coverImageUrl: newPostData.coverImageUrl,
      excerpt: newPostData.excerpt,
      published: newPostData.published,
      title: newPostData.title,
      updatedAt,
    };

    await drizzleDataBase
      .update(postsTable)
      .set(postData)
      .where(eq(postsTable.id, id));

    return {
      ...oldPost,
      ...postData,
    };
  }
}
