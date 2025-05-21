import clsx from 'clsx';

export default function NotFoundPage() {
  return (
    <>
      <title>Página não encontrada</title>
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
          <h1 className={clsx('font-bold', 'mb-2', 'text-3xl')}>404</h1>
          <p className={clsx('font-bold', 'text-1xl')}>
            Essa página não pôde ser encontrada.
          </p>
        </div>
      </div>
    </>
  );
}
