'use client'; /* Automaticamente, virou 'client component' por conta do 'error.tsx' */
import clsx from 'clsx';

type ErrorMessageProps = {
  pageTitle?: string;
  contentTitle: string;
  content: React.ReactNode;
};

export default function ErrorMessage({
  pageTitle = '',
  contentTitle,
  content,
}: ErrorMessageProps) {
  return (
    <>
      {pageTitle && <title>{pageTitle}</title>}
      <div
        className={clsx(
          'bg-slate-900',
          'flex',
          'itens-center justify-center',
          'mb-16',
          'min-h-[100px]',
          'p-8',
          'rounded-2xl',
          'text-center text-slate-100',
        )}
      >
        <div>
          <h1 className={clsx('font-bold', 'mb-2', 'text-3xl')}>
            {contentTitle}
          </h1>
          <div className={clsx('font-bold', 'text-1xl')}>{content}</div>
        </div>
      </div>
    </>
  );
}
