import { Container } from '@/components/Container';
import { Header } from '@/components/Header';

import { FeaturedPost } from '@/components/FeaturedPost';
import { PostsList } from '@/components/PostsList';

import { SpinLoader } from '@/components/SpinLoader';
import { Suspense } from 'react';

export default async function HomePage() {
  return (
    <Container>
      <Header />

      <Suspense fallback={<SpinLoader />}>
        <FeaturedPost />
      </Suspense>

      <Suspense fallback={<SpinLoader />}>
        <PostsList />
      </Suspense>

      <footer>
        <p className='font-bold py-8 text-6xl text-center'>Rodapé</p>
      </footer>
    </Container>
  );
}
