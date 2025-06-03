export const dynamic = 'force-dynamic'; /* Rota dinâmica */

type AdminPostIdPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AdminPostIdPage({ params }: AdminPostIdPageProps) {
  const { id } = await params;
  return <div>Admin: post ID page ({id})</div>;
}
