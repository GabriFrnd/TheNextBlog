import { findPostBySlug } from '@/lib/post/queries';

type SinglePostProps = {
  slug: string;
};

export async function SinglePost({ slug }: SinglePostProps) {
  const post = await findPostBySlug(slug);

  return (
    <div>
      <p>{post.title}</p>
    </div>
  );
}
