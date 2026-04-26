export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="w-full max-w-7xl mx-auto p-4 space-y-4">
        <h1>Restaurant ID: {id}</h1>
    </div>
  )
}