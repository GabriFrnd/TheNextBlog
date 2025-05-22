import { PostHeading } from '../PostHeading';
import { PostDate } from '../PostDate';
import clsx from 'clsx';

type PostSummaryProps = {
  createdAt: string;
  postLink: string;
  postHeading: 'h1' | 'h2';
  title: string;
  excerpt: string;
};

export async function PostSummary({
  createdAt,
  postLink,
  postHeading,
  title,
  excerpt,
}: PostSummaryProps) {
  return (
    <div className={clsx('flex flex-col', 'gap-4', 'sm:justify-center')}>
      <PostDate dateTime={createdAt} />

      <PostHeading href={postLink} as={postHeading}>
        {title}
      </PostHeading>

      <p>{excerpt}</p>
    </div>
  );
}
