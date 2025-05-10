import clsx from 'clsx';

export function Header() {
  return (
    <header>
      <h1
        className={clsx(
          'font-extrabold py-5 text-4xl/snug',
          'sm:py-7 sm:text-5xl/snug',
          'md:py-9 md:text-6xl/snug',
          'lg:py-11 lg:text-7xl/snug',
          'xl:py-13 xl:text-8xl/snug',
        )}
      >
        <a href='#'>The Blog</a>
      </h1>
    </header>
  );
}
