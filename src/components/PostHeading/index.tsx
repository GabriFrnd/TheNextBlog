import clsx from 'clsx';
import Link from 'next/link';

type PostHeadingProps = {
  children: React.ReactNode;
  href: string;
  as?: 'h1' | 'h2';
};

export function PostHeading({
  children,
  href,
  as: Tag = 'h2',
}: PostHeadingProps) {
  const headingClassesMap = {
    h1: clsx('font-extrabold text-2xl/tight', 'sm:text-4xl'),
    h2: clsx('font-bold text-2xl/tight')
  };

  return (
    <Tag className={clsx('hover:text-slate-600', 'transition', headingClassesMap[Tag])}>
      <Link href={href}>{children}</Link>
    </Tag>
  );
}
