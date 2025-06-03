import { PostImageCover } from '../PostImageCover';
import { PostSummary } from '../PostSummary';

import { findAllPublicPosts } from '@/lib/post/queries/public';
import clsx from 'clsx';

export async function FeaturedPost() {
  const posts = await findAllPublicPosts();
  const post = posts[0];
  const postLink = `/post/${post.slug}`;

  return (
    <section
      className={clsx(
        'gap-8 mb-16',
        'grid grid-cols-1',
        'group',
        'sm:grid-cols-2',
      )}
    >
      <PostImageCover
        linkProps={{
          href: postLink,
        }}
        imageProps={{
          src: post.coverImageUrl,
          height: 720,
          width: 1200,
          priority: true,
          alt: post.title,
        }}
      />

      <PostSummary
        createdAt={post.createdAt}
        postLink={postLink}
        postHeading='h1'
        title={post.title}
        excerpt={post.excerpt}
      />
    </section>
  );
}
