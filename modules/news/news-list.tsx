import { NewsItem } from "./news";
import { NewsCard } from "./news-card";
import { EmptyState } from "./news-empty-state";
import { LoadingSkeleton } from "./news-skeleton";

interface NewsListProps {
  news: NewsItem[];
  isLoading: boolean;
}

export const NewsList: React.FC<NewsListProps> = ({ news, isLoading }) => {
  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (news.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-8">
      {news.map((item) => (
        <NewsCard key={item.id} news={item} />
      ))}
    </div>
  );
};
