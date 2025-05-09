import { PostsList } from '@/components/PostsList';
import { SpinLoader } from '@/components/SpinLoader';
import { Suspense } from 'react';

export default async function HomePage() {
  return (
    <div>
      <header>
        <h1 className='font-bold py-8 text-6xl text-center'>
          Título da página
        </h1>
      </header>

      <Suspense fallback={<SpinLoader />}>
        <PostsList />
      </Suspense>

      <footer>
        <p className='font-bold py-8 text-6xl text-center'>Rodapé</p>
      </footer>
    </div>
  );
}
