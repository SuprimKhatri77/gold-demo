import { NewsDetailPage } from "@/modules/news/detail/news-detail";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!slug) {
    return (
      <div>
        <h1>Slug: {slug}</h1>
      </div>
    );
  }

  return <NewsDetailPage />;
}
