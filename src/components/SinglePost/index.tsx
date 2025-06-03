import { findPublicPostBySlug } from '@/lib/post/queries/public';
import { PostHeading } from '../PostHeading';

import { PostDate } from '../PostDate';
import { SafeMarkdown } from '../SafeMarkdown';

import Image from 'next/image';
import clsx from 'clsx';

type SinglePostProps = {
  slug: string;
};

export async function SinglePost({ slug }: SinglePostProps) {
  const post = await findPublicPostBySlug(slug);

  return (
    <article className={clsx('mb-16')}>
      <header className={clsx('flex flex-col', 'gap-4', 'mb-4')}>
        <Image
          className={clsx('rounded-xl')}
          src={post.coverImageUrl}
          height={720}
          width={1200}
          alt={post.title}
        />

        <PostHeading href={`/post/${post.slug}`}>{post.title}</PostHeading>
        <p>
          {post.author} | <PostDate dateTime={post.createdAt} />
        </p>
      </header>

      <p className={clsx('mb-4', 'text-slate-600 text-xl')}>{post.excerpt}</p>
      <SafeMarkdown markdown={post.content} />
    </article>
  );
}
