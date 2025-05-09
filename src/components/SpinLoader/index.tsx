import clsx from 'clsx';

type SpinLoaderProps = {
  className?: string;
};

export function SpinLoader({ className = '' }: SpinLoaderProps) {
  const styles = clsx(
    className,
    'flex',
    'items-center',
    'justify-center',
  );

  return (
    <div className={styles}>
      <div
        className={clsx(
          'animate-spin',
          'border-5',
          'border-slate-900',
          'border-t-transparent',
          'h-10',
          'rounded-full',
          'w-10',
        )}
      ></div>
    </div>
  );
}
