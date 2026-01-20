import { Calendar } from "lucide-react";
import { createSlug, formatDate, NextImage } from "./news-detail";
import { NewsItem } from "./mock-news";

interface RelatedNewsProps {
  news: NewsItem[];
  currentId: string;
}

export const RelatedNews: React.FC<RelatedNewsProps> = ({
  news,
  currentId,
}) => {
  const relatedNews = news.filter((item) => item.id !== currentId).slice(0, 5);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-100">
      <h3 className="text-lg font-bold text-slate-900 mb-6">
        Related Articles
      </h3>
      <div className="space-y-5">
        {relatedNews.map((item) => {
          const slug = createSlug(item.title);
          return (
            <a
              key={item.id}
              href={`/news/${slug}`}
              className="flex gap-4 group hover:bg-slate-50 p-3 rounded-xl transition-all border border-transparent hover:border-amber-100"
            >
              <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0 bg-slate-200 shadow-md">
                <NextImage
                  src={item.images[0]}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-slate-900 group-hover:text-amber-600 transition-colors mb-2 line-clamp-2 text-sm leading-snug">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-500 flex items-center gap-1.5">
                  <Calendar className="w-3 h-3" />
                  {formatDate(item.updatedAt)}
                </p>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
};
