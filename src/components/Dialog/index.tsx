'use client';

import clsx from 'clsx';
import { Button } from '../Button';

type DialogProps = {
  isVisible?: boolean;
  title: string;
  content: React.ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
  disabled: boolean;
};

export function Dialog({
  isVisible = false,
  title,
  content,
  onConfirm,
  onCancel,
  disabled,
}: DialogProps) {
  if (!isVisible) return null;

  function handleCancel() {
    if (disabled) return;
    onCancel();
  }

  return (
    <div
      className={clsx(
        'backdrop-blur-xs',
        'bg-black/50',
        'flex fixed',
        'inset-0' /* bottom, left, right e top: 0 */,
        'items-center justify-center',
        'z-50',
      )}
      onClick={handleCancel}
    >
      <div
        className={clsx(
          'bg-slate-100',
          'flex flex-col',
          'gap-6 mx-6 p-6',
          'max-w-2xl',
          'rounded-lg',
          'shadow-lg shadow-black/30',
          'text-center',
        )}
        role='dialog'
        aria-modal={true}
        aria-labelledby='dialog-title'
        aria-describedby='dialog-description'
        onClick={event => event.stopPropagation()}
      >
        <h3 className={clsx('font-extrabold', 'text-xl')} id='dialog-title'>
          {title}
        </h3>
        <div id='dialog-description'>{content}</div>

        <div className={clsx('flex', 'items-center justify-around')}>
          <Button onClick={handleCancel} variant='ghost' disabled={disabled}>Cancelar</Button>
          <Button onClick={onConfirm} variant='default' disabled={disabled}>Ok</Button>
        </div>
      </div>
    </div>
  );
}
