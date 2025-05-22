import ErrorMessage from '@/components/ErrorMessage';

export default function NotFoundPage() {
  return (
    <ErrorMessage
      pageTitle='Página não encontrada'
      contentTitle='404'
      content='Essa página não pôde ser encontrada.'
    />
  );
}
