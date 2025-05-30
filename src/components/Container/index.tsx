import clsx from 'clsx';

type ContainerProps = {
  children: React.ReactNode;
};

export function Container({ children }: ContainerProps) {
  return (
    <div className={clsx('bg-slate-50 min-h-screen text-slate-900')}>
      <div className={clsx('mx-auto', 'max-w-screen-lg', 'px-8')}>{children}</div>
    </div>
  );
}
