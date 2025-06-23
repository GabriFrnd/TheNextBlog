'use client';

import { useId } from 'react';
import dynamic from 'next/dynamic';

import rehypeSanitize from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';

import clsx from 'clsx';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), {
  ssr: false,
});

type MarkdownEditorProps = {
  labelText?: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  textAreaName: string;
  disabled?: boolean;
};

export function MarkdownEditor({
  labelText = '',
  value,
  setValue,
  textAreaName,
  disabled = false,
}: MarkdownEditorProps) {
  const id = useId();

  return (
    <div className={clsx('flex flex-col', 'gap-2')}>
      {labelText && (
        <label className={clsx('text-sm')} htmlFor={id}>
          {labelText}
        </label>
      )}

      <MDEditor
        className={clsx('whitespace-pre-wrap')}
        value={value}
        onChange={value => {
          if (value === undefined) return;
          setValue(value);
        }}
        height={400}
        extraCommands={[]}
        preview='edit'
        hideToolbar={disabled}
        textareaProps={{
          id,
          name: textAreaName,
          disabled: disabled,
        }}
        previewOptions={{
          rehypePlugins: [[rehypeSanitize]],
          remarkPlugins: [[remarkGfm]],
        }}
      />
    </div>
  );
}
