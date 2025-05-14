import { formatDatetime, formatRelativeDate } from '@/utils/format-datetime';
import { PostHeading } from '../PostHeading';
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
      <time
        className={clsx('block', 'text-slate-600 text-sm/tight')}
        dateTime={createdAt}
        title={formatRelativeDate(createdAt)}
      >
        {formatDatetime(createdAt)}
      </time>

      <PostHeading href={postLink} as={postHeading}>
        {title}
      </PostHeading>

      <p>{excerpt}</p>
    </div>
  );
}
