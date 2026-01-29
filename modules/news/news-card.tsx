import Image from "next/image";
import { NewsCardProps } from "./news-list";
import { ArrowRight, Calendar } from "lucide-react";
import { createSlug, formatDate } from "./news";
import Link from "next/link";

// Helper function to determine metal-based accent color
const getMetalAccent = (tags: string[]) => {
  const tagString = tags.join(" ").toLowerCase();

  if (tagString.includes("gold")) {
    return {
      tagBg: "bg-amber-500/10",
      tagBorder: "border-amber-500/20",
      tagText: "text-amber-400",
      hoverBorder: "hover:border-amber-400/40",
      hoverText: "group-hover:text-amber-400",
      buttonHover: "hover:bg-amber-500/10 hover:border-amber-500/30",
      iconColor: "text-amber-500",
    };
  }

  if (tagString.includes("silver")) {
    return {
      tagBg: "bg-slate-400/10",
      tagBorder: "border-slate-400/20",
      tagText: "text-slate-300",
      hoverBorder: "hover:border-slate-400/40",
      hoverText: "group-hover:text-slate-300",
      buttonHover: "hover:bg-slate-400/10 hover:border-slate-400/30",
      iconColor: "text-slate-400",
    };
  }

  if (tagString.includes("platinum")) {
    return {
      tagBg: "bg-cyan-400/10",
      tagBorder: "border-cyan-400/20",
      tagText: "text-cyan-300",
      hoverBorder: "hover:border-cyan-400/40",
      hoverText: "group-hover:text-cyan-400",
      buttonHover: "hover:bg-cyan-500/10 hover:border-cyan-500/30",
      iconColor: "text-cyan-400",
    };
  }

  if (tagString.includes("palladium")) {
    return {
      tagBg: "bg-purple-400/10",
      tagBorder: "border-purple-400/20",
      tagText: "text-purple-300",
      hoverBorder: "hover:border-purple-400/40",
      hoverText: "group-hover:text-purple-400",
      buttonHover: "hover:bg-purple-500/10 hover:border-purple-500/30",
      iconColor: "text-purple-400",
    };
  }

  // Default: blue/cyan theme
  return {
    tagBg: "bg-blue-500/10",
    tagBorder: "border-blue-400/20",
    tagText: "text-blue-300",
    hoverBorder: "hover:border-blue-400/40",
    hoverText: "group-hover:text-cyan-400",
    buttonHover: "hover:bg-blue-500/10 hover:border-blue-500/30",
    iconColor: "text-blue-400",
  };
};

export const NewsCard: React.FC<NewsCardProps> = ({ news }) => {
  const slug = createSlug(news.title);
  const metalAccent = getMetalAccent(news.tags);

  return (
    <article
      className={`bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 ${metalAccent.hoverBorder} transition-all duration-300 overflow-hidden group hover:bg-white/10 hover:-translate-y-1`}
    >
      <div className="flex flex-col lg:flex-row">
        {/* Image Section */}
        <div className="w-full lg:w-80 h-48 sm:h-56 lg:h-auto lg:min-h-70 relative overflow-hidden bg-slate-950/50 shrink-0">
          <Image
            fill
            src={news.images[0]}
            alt={news.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-blue-950/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
        </div>

        {/* Content Section */}
        <div className="p-4 sm:p-6 lg:p-8 flex-1 flex flex-col min-w-0">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
            {news.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className={`px-3 py-1 ${metalAccent.tagBg} ${metalAccent.tagText} text-xs font-medium rounded-full border ${metalAccent.tagBorder} backdrop-blur-sm transition-colors duration-300`}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h2
            className={`text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 ${metalAccent.hoverText} transition-colors leading-tight`}
          >
            <Link href={`/news/${slug}`} className="hover:underline">
              {news.title}
            </Link>
          </h2>

          {/* Description */}
          <p className="text-sm sm:text-base text-zinc-400 mb-4 sm:mb-6 leading-relaxed flex-1 line-clamp-2 sm:line-clamp-3">
            {news.description}
          </p>

          {/* Footer - Date and Button */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mt-auto">
            {/* Date */}
            <div className="flex items-center text-xs sm:text-sm text-zinc-400 order-2 sm:order-1 min-w-0">
              <Calendar
                className={`w-3 h-3 sm:w-4 sm:h-4 mr-2 shrink-0 ${metalAccent.iconColor}`}
              />
              <span className="truncate">
                Updated {formatDate(news.updatedAt)}
              </span>
            </div>

            {/* Button */}
            <Link
              href={`/news/${slug}`}
              className={`inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 bg-white/5 ${metalAccent.buttonHover} border border-white/10 text-white text-sm sm:text-base font-semibold rounded-xl transition-all duration-300 group/btn order-1 sm:order-2 whitespace-nowrap backdrop-blur-xl shrink-0`}
            >
              Read Full Report
              <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};
