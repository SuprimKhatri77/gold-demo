export async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!slug) {
    return (
      <div>
        <h1>Slug: {slug}</h1>
      </div>
    );
  }

  return (
    <div>
      <h1>The route slug received is: {slug}</h1>
    </div>
  );
}
