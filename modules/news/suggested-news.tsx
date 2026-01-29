import Image from "next/image";
import { createSlug, formatDate, NewsItem } from "./news";
import { Clock, TrendingUp } from "lucide-react";
import Link from "next/link";

interface SuggestedNewsProps {
  news: NewsItem[];
}

// Helper function to determine metal-based accent color for suggested news
const getMetalIconColor = (tags: string[]) => {
  const tagString = tags.join(" ").toLowerCase();

  if (tagString.includes("gold")) return "text-amber-400";
  if (tagString.includes("silver")) return "text-slate-400";
  if (tagString.includes("platinum")) return "text-cyan-400";
  if (tagString.includes("palladium")) return "text-purple-400";

  return "text-blue-400"; // Default
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

  return "group-hover:text-cyan-400 group-hover:border-blue-400/40"; // Default
};

export const SuggestedNews: React.FC<SuggestedNewsProps> = ({ news }) => (
  <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 sticky top-6 hover:border-blue-400/40 transition-all duration-300">
    <div className="flex items-center gap-2 mb-6">
      <TrendingUp size={18} className="text-cyan-400 animate-pulse" />
      <h3 className="text-lg font-bold text-white">Recent Market Reports</h3>
    </div>
    <div className="space-y-4">
      {news.slice(0, 5).map((item) => {
        const slug = createSlug(item.title);
        const iconColor = getMetalIconColor(item.tags);
        const hoverColor = getMetalHoverColor(item.tags);

        return (
          <Link
            key={item.id}
            href={`/news/${slug}`}
            className={`flex gap-4 group hover:bg-white/5 p-3 rounded-xl transition-all duration-300 border border-transparent ${hoverColor}`}
          >
            <div className="w-20 h-20 relative rounded-xl overflow-hidden shrink-0 bg-slate-950/50 border border-white/10 group-hover:border-white/20 transition-all duration-300">
              <Image
                fill
                src={item.images[0]}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-950/60 via-blue-950/30 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
            </div>
            <div className="flex-1 min-w-0">
              <h4
                className={`font-semibold text-white ${hoverColor.split(" ")[0]} transition-colors mb-2 line-clamp-2 text-sm leading-tight`}
              >
                {item.title}
              </h4>
              <p className="text-xs text-zinc-400 flex items-center gap-1">
                <Clock size={12} className={iconColor} />
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
