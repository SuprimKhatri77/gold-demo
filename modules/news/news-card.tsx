import Image from "next/image";
import { NewsCardProps } from "./news-list";
import { ArrowRight, Calendar } from "lucide-react";
import { createSlug, formatDate } from "./news";

export const NewsCard: React.FC<NewsCardProps> = ({ news }) => {
  const slug = createSlug(news.title);

  return (
    <article className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden group hover:bg-white/10">
      <div className="flex flex-col md:flex-row">
        {/* Image Section */}
        <div className="w-full md:w-80 h-48 sm:h-56 md:h-64 relative overflow-hidden bg-zinc-900/50 shrink-0">
          <Image
            fill
            src={news.images[0]}
            alt={news.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        {/* Content Section */}
        <div className="p-4 sm:p-6 md:p-8 flex-1 flex flex-col">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
            {news.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-white/5 text-zinc-300 text-xs font-medium rounded-full border border-white/10 backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 group-hover:text-amber-500 transition-colors leading-tight">
            <a href={`/news/${slug}`} className="hover:underline">
              {news.title}
            </a>
          </h2>

          {/* Description */}
          <p className="text-sm sm:text-base text-zinc-400 mb-4 sm:mb-6 leading-relaxed flex-1 line-clamp-2 sm:line-clamp-3">
            {news.description}
          </p>

          {/* Footer - Date and Button */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            {/* Date */}
            <div className="flex items-center text-xs sm:text-sm text-zinc-400 order-2 sm:order-1">
              <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-2 shrink-0 text-amber-500" />
              <span className="truncate">
                Last updated on {formatDate(news.updatedAt)}
              </span>
            </div>

            {/* Button */}
            <a
              href={`/news/${slug}`}
              className="inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 bg-white/10 hover:bg-amber-500/20 border border-white/20 hover:border-amber-500/30 text-white text-sm sm:text-base font-semibold rounded-lg transition-all duration-300 group/btn order-1 sm:order-2 whitespace-nowrap backdrop-blur-sm"
            >
              Read More
              <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
};
