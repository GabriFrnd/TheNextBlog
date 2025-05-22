import ReactMarkdown from 'react-markdown';
import rehypeSanitize from 'rehype-sanitize';

import remarkGfm from 'remark-gfm';
import clsx from 'clsx';

type SafeMarkdownProps = {
  markdown: string;
};

export function SafeMarkdown({ markdown }: SafeMarkdownProps) {
  return (
    <div
      className={clsx(
        'max-w-none w-full',
        'md:prose-lg',
        'prose prose-slate',
        'prose-a:no-underline prose-a:hover:underline',
        'prose-a:text-blue-500 prose-a:hover:text-blue-800 prose-a:transition',
        'prose-img:mx-auto',
        'overflow-hidden',
      )}
    >
      <ReactMarkdown
        rehypePlugins={[rehypeSanitize]}
        remarkPlugins={[remarkGfm]}
        components={{
          table: ({ node, ...props }) => {
            if (!node?.children) return '';

            return (
              <div className={clsx('overflow-x-auto')}>
                <table className={clsx('min-w-[600px] w-full')} {...props} />
              </div>
            );
          },
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
