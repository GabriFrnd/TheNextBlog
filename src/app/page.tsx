import { Container } from '@/components/Container';
import { Header } from '@/components/Header';

import { PostsList } from '@/components/PostsList';
import { SpinLoader } from '@/components/SpinLoader';

import { Suspense } from 'react';
import Link from 'next/link';

import Image from 'next/image';
import clsx from 'clsx';

export default async function HomePage() {
  return (
    <Container>
      <Header />

      <section
        className={clsx(
          'gap-8 mb-16',
          'grid grid-cols-1',
          'group',
          'sm:grid-cols-2',
        )}
      >
        <Link
          className={clsx('h-full w-full', 'rounded-xl', 'overflow-hidden')}
          href='#'
        >
          <Image
            className={clsx('object-center object-cover', 'group-hover:scale-105 transition', 'h-full w-full')}
            src='/images/bryen_0.png'
            height={720}
            width={1200}
            priority
            alt='Imagem do post'
          />
        </Link>

        <div className={clsx('flex flex-col', 'gap-4', 'sm:justify-center')}>
          <time
            className={clsx('block', 'text-slate-600 text-sm/tight')}
            dateTime='2025-05-11'
          >
            11/05/2025 - 16:00
          </time>

          <h1 className={clsx('font-extrabold text-2xl/tight', 'sm:text-4xl')}>
            <Link href='#'>Lorem ipsum, dolor sit amet consectetur</Link>
          </h1>

          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Pariatur
            non dolor minus possimus recusandae neque perferendis tempore dolore
            a illo velit excepturi, id nostrum dolorum repudiandae quia laborum
            atque mollitia!
          </p>
        </div>
      </section>

      <Suspense fallback={<SpinLoader />}>
        <PostsList />
      </Suspense>

      <footer>
        <p className='font-bold py-8 text-6xl text-center'>Rodapé</p>
      </footer>
    </Container>
  );
}
