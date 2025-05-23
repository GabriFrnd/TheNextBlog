'use client'; /* Obrigatório em 'error.tsx' */
import ErrorMessage from '@/components/ErrorMessage';

export default function RootErrorPage() {
  return (
    <ErrorMessage
      pageTitle='Internal Server Error'
      contentTitle='501'
      content='Ocorreu um erro. Tente novamente mais tarde.'
    />
  );
}
