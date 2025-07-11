import type { Metadata } from 'next';
import { Container } from '@/components/Container';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

import { ToastifyContainer } from '@/components/ToastifyContainer';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'The Blog - Feito com Next.JS',
    template: '%s | The Blog' /* Sufixo para todas as páginas */,
  },
  description: 'Descrição da página',
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang='pt-BR'>
      <body>
        <Container>
          <Header />

          {children}

          <Footer />
        </Container>

        <ToastifyContainer />
      </body>
    </html>
  );
}
