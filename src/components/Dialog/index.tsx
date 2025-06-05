'use client';

import clsx from 'clsx';

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
          <button
            className={clsx(
              'bg-slate-300',
              'cursor-pointer',
              'disabled:bg-slate-200 disabled:cursor-not-allowed disabled:text-slate-400',
              'flex',
              'hover:bg-slate-400',
              'items-center justify-center',
              'px-4 py-2',
              'rounded-lg',
              'text-slate-950',
              'transition',
            )}
            onClick={handleCancel}
            disabled={disabled}
          >
            Cancelar
          </button>

          <button
            className={clsx(
              'bg-blue-500',
              'cursor-pointer',
              'disabled:bg-slate-200 disabled:cursor-not-allowed disabled:text-slate-400',
              'flex',
              'hover:bg-blue-600',
              'items-center justify-center',
              'px-4 py-2',
              'rounded-lg',
              'text-blue-50',
              'transition',
            )}
            onClick={onConfirm}
            disabled={disabled}
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  );
}
