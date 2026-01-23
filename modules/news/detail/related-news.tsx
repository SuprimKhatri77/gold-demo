import { Calendar } from "lucide-react";
import { createSlug, formatDate, NextImage } from "./news-detail";
import { NewsItem } from "./mock-news";
import Link from "next/link";

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
    <div className="bg-white/5 backdrop-blur-md rounded-lg md:rounded-xl border border-white/10 p-5 md:p-6">
      <h3 className="text-base md:text-lg font-bold text-white mb-5 md:mb-6">
        Related Articles
      </h3>
      <div className="space-y-4 md:space-y-5">
        {relatedNews.map((item) => {
          const slug = createSlug(item.title);
          return (
            <Link
              key={item.id}
              href={`/news/${slug}`}
              className="flex gap-3 md:gap-4 group hover:bg-white/5 p-2.5 md:p-3 rounded-lg md:rounded-xl transition-all duration-300 border border-transparent hover:border-white/10"
            >
              <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-lg md:rounded-xl overflow-hidden shrink-0 bg-white/5 border border-white/10">
                <NextImage
                  src={item.images[0]}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-white group-hover:text-amber-500 transition-colors duration-300 mb-2 line-clamp-2 text-sm leading-snug">
                  {item.title}
                </h4>
                <p className="text-xs text-zinc-400 flex items-center gap-1.5">
                  <Calendar className="w-3 h-3 text-amber-500/70" />
                  {formatDate(item.updatedAt)}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
