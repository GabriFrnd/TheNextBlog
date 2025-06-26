import clsx from 'clsx';
import { useId } from 'react';

type InputTextProps = {
  label?: string;
} & React.ComponentProps<'input'>;

export function InputText({ label = '', ...props }: InputTextProps) {
  const id = useId(); /* Gerador de ID único */

  return (
    <div className={clsx('flex flex-col', 'gap-2')}>
      {label && (
        <label htmlFor={id}>
          <b>{label}</b>
        </label>
      )}

      <input
        {...props}
        className={clsx(
          'bg-white',
          'focus:ring-blue-600',
          'disabled:bg-slate-200 disabled:cursor-not-allowed disabled:placeholder-slate-500 disabled:text-slate-400',
          'outline-0',
          'placeholder-slate-400',
          'px-2 py-1',
          'read-only:bg-slate-200',
          'ring-slate-400 ring-2',
          'rounded transition',
          'text-base/normal',
          props.className,
        )}
        id={id}
      />
    </div>
  );
}
