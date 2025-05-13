import { postRepository } from '@/repositories/post';
import { PostImageCover } from '../PostImageCover';

import { PostHeading } from '../PostHeading';
import { formatDatetime, formatRelativeDate } from '@/utils/format-datetime';

import clsx from 'clsx';

export async function PostsList() {
  const posts = await postRepository.findAll();

  return (
    <div className={clsx('gap-8', 'grid grid-cols-1', 'sm:grid-cols-2', 'lg:grid-cols-3')}>
      {posts.map(post => {
        const postLink = `/post/${post.slug}`;

        return (
          <div className={clsx('flex flex-col', 'gap-8', 'group')} key={post.id}>
            <PostImageCover
              linkProps={{
                href: postLink,
              }}
              imageProps={{
                src: post.coverImageUrl,
                height: 720,
                width: 1200,
                alt: post.title,
              }}
            />
            <div
              className={clsx('flex flex-col', 'gap-4', 'sm:justify-center')}
            >
              <time
                className={clsx('block', 'text-slate-600 text-sm/tight')}
                dateTime={post.createdAt}
                title={formatRelativeDate(post.createdAt)}
              >
                {formatDatetime(post.createdAt)}
              </time>

              <PostHeading href={postLink} as='h2'>
                {post.title}
              </PostHeading>

              <p>{post.excerpt}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
