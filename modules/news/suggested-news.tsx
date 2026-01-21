import Image from "next/image";
import { createSlug, formatDate, NewsItem } from "./news";

interface SuggestedNewsProps {
  news: NewsItem[];
}

export const SuggestedNews: React.FC<SuggestedNewsProps> = ({ news }) => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <h3 className="text-lg font-bold text-slate-900 mb-6">Recent Updates</h3>
    <div className="space-y-4">
      {news.slice(0, 5).map((item) => {
        const slug = createSlug(item.title);
        return (
          <a
            key={item.id}
            href={`/news/${slug}`}
            className="flex gap-4 group hover:bg-slate-50 p-3 rounded-lg transition-colors"
          >
            <div className="w-20 h-20 relative rounded-lg overflow-hidden shrink-0 bg-slate-200">
              <Image
                fill
                src={item.images[0]}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-slate-900 group-hover:text-amber-600 transition-colors mb-1 line-clamp-2 text-sm leading-tight">
                {item.title}
              </h4>
              <p className="text-xs text-slate-500">
                {formatDate(item.updatedAt)}
              </p>
            </div>
          </a>
        );
      })}
    </div>
  </div>
);
