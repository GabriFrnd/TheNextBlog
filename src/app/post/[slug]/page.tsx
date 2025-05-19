import { findPostBySlug } from '@/lib/post/queries';
import { Metadata } from 'next';

type PostSlugPageProps = {
  /* 'params', por padrão, é uma Promise */
  params: Promise<{ slug: string }> /* slug: nome da pasta */;
};

export async function generateMetadata({
  params,
}: PostSlugPageProps): Promise<Metadata> {
  const { slug } = await params; /* 'slug' vem dentro de 'params' */
  const post = await findPostBySlug(slug);

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function PostSlugPage({ params }: PostSlugPageProps) {
  const { slug } = await params; /* 'slug' vem dentro de 'params' */
  const post = await findPostBySlug(slug);

  return (
    <div>
      <p>{post?.title}</p>
    </div>
  );
}
