import { NewsCard } from "./news-card";
import { FileSearch } from "lucide-react";

interface NewsItem {
  id: string;
  title: string;
  description: string;
  images: string[];
  tags: string[];
  updatedAt: string;
}

interface NewsListProps {
  news: NewsItem[];
  isLoading: boolean;
}

export interface NewsCardProps {
  news: NewsItem;
}

// Loading Skeleton Component
const LoadingSkeleton: React.FC = () => {
  return (
    <div className="space-y-6 md:space-y-8">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden animate-pulse"
        >
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-80 h-48 sm:h-56 md:h-64 bg-white/10"></div>
            <div className="p-6 md:p-8 flex-1 space-y-4">
              <div className="flex gap-2">
                <div className="h-6 w-20 bg-white/10 rounded-full"></div>
                <div className="h-6 w-24 bg-white/10 rounded-full"></div>
              </div>
              <div className="h-8 bg-white/10 rounded w-3/4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-white/10 rounded"></div>
                <div className="h-4 bg-white/10 rounded w-5/6"></div>
              </div>
              <div className="flex justify-between items-center pt-4">
                <div className="h-4 w-32 bg-white/10 rounded"></div>
                <div className="h-10 w-32 bg-white/10 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Empty State Component
const EmptyState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 md:py-24 px-4">
      <div className="w-20 h-20 md:w-24 md:h-24 bg-white/5 backdrop-blur-xl rounded-full flex items-center justify-center mb-6 border border-white/10 group hover:border-blue-400/40 transition-all duration-300">
        <FileSearch className="w-10 h-10 md:w-12 md:h-12 text-zinc-400 group-hover:text-cyan-400 transition-colors duration-300" />
      </div>
      <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
        No Market Reports Found
      </h3>
      <p className="text-zinc-400 text-sm md:text-base text-center max-w-md">
        No articles match your current search criteria. Try adjusting your
        filters or check back later for new market intelligence updates.
      </p>
    </div>
  );
};

export const NewsList: React.FC<NewsListProps> = ({ news, isLoading }) => {
  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (news.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-6 md:space-y-8">
      {news.map((item) => (
        <NewsCard key={item.id} news={item} />
      ))}
    </div>
  );
};
