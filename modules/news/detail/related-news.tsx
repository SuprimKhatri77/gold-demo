import { Calendar, TrendingUp } from "lucide-react";
import { createSlug, formatDate, NextImage } from "./news-detail";
import { NewsItem } from "./mock-news";
import Link from "next/link";

interface RelatedNewsProps {
  news: NewsItem[];
  currentId: string;
}

// Helper function to determine metal-based accent color
const getMetalIconColor = (tags: string[]) => {
  const tagString = tags.join(" ").toLowerCase();

  if (tagString.includes("gold")) return "text-amber-400";
  if (tagString.includes("silver")) return "text-slate-400";
  if (tagString.includes("platinum")) return "text-cyan-400";
  if (tagString.includes("palladium")) return "text-purple-400";

  return "text-blue-400";
};

const getMetalHoverColor = (tags: string[]) => {
  const tagString = tags.join(" ").toLowerCase();

  if (tagString.includes("gold"))
    return "group-hover:text-amber-400 group-hover:border-amber-400/40";
  if (tagString.includes("silver"))
    return "group-hover:text-slate-300 group-hover:border-slate-400/40";
  if (tagString.includes("platinum"))
    return "group-hover:text-cyan-400 group-hover:border-cyan-400/40";
  if (tagString.includes("palladium"))
    return "group-hover:text-purple-400 group-hover:border-purple-400/40";

  return "group-hover:text-cyan-400 group-hover:border-blue-400/40";
};

export const RelatedNews: React.FC<RelatedNewsProps> = ({
  news,
  currentId,
}) => {
  const relatedNews = news.filter((item) => item.id !== currentId).slice(0, 5);

  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-lg md:rounded-xl border border-white/10 p-5 md:p-6 hover:border-blue-400/40 transition-all duration-300">
      <h3 className="text-base md:text-lg font-bold text-white mb-5 md:mb-6 flex items-center gap-2">
        <TrendingUp size={18} className="text-cyan-400 animate-pulse" />
        Related Reports
      </h3>
      <div className="space-y-4 md:space-y-5">
        {relatedNews.map((item) => {
          const slug = createSlug(item.title);
          const iconColor = getMetalIconColor(item.tags);
          const hoverColor = getMetalHoverColor(item.tags);

          return (
            <Link
              key={item.id}
              href={`/news/${slug}`}
              className={`flex gap-3 md:gap-4 group hover:bg-white/5 p-2.5 md:p-3 rounded-lg md:rounded-xl transition-all duration-300 border border-transparent ${hoverColor}`}
            >
              <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-lg md:rounded-xl overflow-hidden shrink-0 bg-slate-950/50 border border-white/10 group-hover:border-white/20">
                <NextImage
                  src={item.images[0]}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950/60 via-blue-950/30 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
              </div>
              <div className="flex-1 min-w-0">
                <h4
                  className={`font-semibold text-white ${hoverColor.split(" ")[0]} transition-colors duration-300 mb-2 line-clamp-2 text-sm leading-snug`}
                >
                  {item.title}
                </h4>
                <p className="text-xs text-zinc-400 flex items-center gap-1.5">
                  <Calendar className={`w-3 h-3 ${iconColor}`} />
                  {formatDate(item.updatedAt)}
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* View All Button */}
      <div className="mt-6 pt-4 border-t border-white/10">
        <Link
          href="/news"
          className="w-full inline-flex items-center justify-center px-4 py-2.5 bg-linear-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-sm font-semibold rounded-xl transition-all duration-300 group/btn shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:scale-105"
        >
          View All Reports
          <TrendingUp className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
        </Link>
      </div>
    </div>
  );
};
