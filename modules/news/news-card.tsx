import Image from "next/image";
import { createSlug, formatDate, NewsItem } from "./news";
import { ArrowRight, Calendar } from "lucide-react";
import Link from "next/link";

interface NewsCardProps {
  news: NewsItem;
}

export const NewsCard: React.FC<NewsCardProps> = ({ news }) => {
  const slug = createSlug(news.title);

  return (
    <article className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="flex flex-col md:flex-row">
        {/* Image Section */}
        <div className="w-full md:w-80 h-48 sm:h-56 md:h-64 relative overflow-hidden bg-slate-200 shrink-0">
          <Image
            fill
            src={news.images[0]}
            alt={news.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-linear-to-t from-slate-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        {/* Content Section */}
        <div className="p-4 sm:p-6 md:p-8 flex-1 flex flex-col">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
            {news.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-amber-50 text-amber-700 text-xs font-semibold rounded-full border border-amber-200"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h2 className="text-xl sm:text-2xl md:text-2xl font-bold text-slate-900 mb-3 sm:mb-4 group-hover:text-amber-600 transition-colors leading-tight">
            <a href={`/news/${slug}`} className="hover:underline">
              {news.title}
            </a>
          </h2>

          {/* Description */}
          <p className="text-sm sm:text-base text-slate-600 mb-4 sm:mb-6 leading-relaxed flex-1 line-clamp-2 sm:line-clamp-3">
            {news.description}
          </p>

          {/* Footer - Date and Button */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            {/* Date */}
            <div className="flex items-center text-xs sm:text-sm text-slate-500 order-2 sm:order-1">
              <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-2 shrink-0" />
              <span className="truncate">
                Last updated on {formatDate(news.updatedAt)}
              </span>
            </div>

            {/* Button */}
            <Link
              href={`/news/${slug}`}
              className="inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 bg-amber-500 hover:bg-amber-600 text-white text-sm sm:text-base font-semibold rounded-lg transition-colors group/btn order-1 sm:order-2 whitespace-nowrap"
            >
              Read More
              <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};
