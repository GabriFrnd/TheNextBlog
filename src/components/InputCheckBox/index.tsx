import clsx from 'clsx';
import { useId } from 'react';

type InputCheckBoxProps = {
  label?: string;
  type?: 'checkbox';
} & React.ComponentProps<'input'>;

export function InputCheckBox({ label = '', type = 'checkbox', ...props }: InputCheckBoxProps) {
  const id = useId(); /* Gerador de ID único */

  return (
    <div className={clsx('flex', 'gap-3', 'items-center')}>
      <input
        {...props}
        className={clsx(
          'cursor-pointer',
          'focus:ring-blue-600 focus:ring-2',
          'h-4 w-4',
          'outline-none',
          props.className
        )}
        id={id}
        type={type}
      />

      {label && <label className={clsx('cursor-pointer')} htmlFor={id}>{label}</label>}
    </div>
  );
}
