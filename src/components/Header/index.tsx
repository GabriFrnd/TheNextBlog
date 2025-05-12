import clsx from 'clsx';
import Link from 'next/link';

export function Header() {
  return (
    <header>
      <h1
        className={clsx(
          'font-extrabold py-5 text-3xl/snug',
          'sm:py-7 sm:text-4xl/snug',
          'md:py-9 md:text-5xl/snug',
          'lg:py-11 lg:text-6xl/snug',
          'xl:py-13 xl:text-7xl/snug',
        )}
      >
        <Link href='#'>The Blog</Link>
      </h1>
    </header>
  );
}
