import { findAllPublicPosts } from '@/lib/post/queries/public';
import { PostImageCover } from '../PostImageCover';

import { PostSummary } from '../PostSummary';
import clsx from 'clsx';

export async function PostsList() {
  const posts = await findAllPublicPosts();
  if (posts.length <= 1) return null;

  return (
    <div
      className={clsx(
        'gap-8',
        'grid grid-cols-1',
        'mb-16',
        'sm:grid-cols-2',
        'lg:grid-cols-3',
      )}
    >
      {posts.slice(1).map(post => {
        const postLink = `/post/${post.slug}`;

        return (
          <div
            className={clsx('flex flex-col', 'gap-8', 'group')}
            key={post.id}
          >
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

            <PostSummary
              createdAt={post.createdAt}
              postLink={postLink}
              postHeading='h2'
              title={post.title}
              excerpt={post.excerpt}
            />
          </div>
        );
      })}
    </div>
  );
}
