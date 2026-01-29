import { Calendar, Clock, Tag } from "lucide-react";
import {
  ArticleHeaderProps,
  calculateReadTime,
  formatDate,
  NextImage,
} from "./news-detail";

// Helper function to determine metal-based accent color
const getMetalAccent = (tags: string[]) => {
  const tagString = tags.join(" ").toLowerCase();

  if (tagString.includes("gold")) {
    return {
      tagBg: "bg-amber-500/10",
      tagBorder: "border-amber-500/20",
      tagHover: "hover:border-amber-500/40",
      iconColor: "text-amber-400",
      ringColor: "ring-amber-400/30",
    };
  }

  if (tagString.includes("silver")) {
    return {
      tagBg: "bg-slate-400/10",
      tagBorder: "border-slate-400/20",
      tagHover: "hover:border-slate-400/40",
      iconColor: "text-slate-400",
      ringColor: "ring-slate-400/30",
    };
  }

  if (tagString.includes("platinum")) {
    return {
      tagBg: "bg-cyan-400/10",
      tagBorder: "border-cyan-400/20",
      tagHover: "hover:border-cyan-400/40",
      iconColor: "text-cyan-400",
      ringColor: "ring-cyan-400/30",
    };
  }

  if (tagString.includes("palladium")) {
    return {
      tagBg: "bg-purple-400/10",
      tagBorder: "border-purple-400/20",
      tagHover: "hover:border-purple-400/40",
      iconColor: "text-purple-400",
      ringColor: "ring-purple-400/30",
    };
  }

  // Default: blue/cyan theme
  return {
    tagBg: "bg-blue-500/10",
    tagBorder: "border-blue-400/20",
    tagHover: "hover:border-blue-400/40",
    iconColor: "text-cyan-400",
    ringColor: "ring-blue-400/30",
  };
};

export const ArticleHeader: React.FC<ArticleHeaderProps> = ({
  article,
  author,
}) => {
  const readTime = calculateReadTime(article.content);
  const metalAccent = getMetalAccent(article.tags);

  return (
    <header className="mb-12 md:mb-16">
      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-6 md:mb-8">
        {article.tags.map((tag) => (
          <span
            key={tag}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 ${metalAccent.tagBg} backdrop-blur-xl text-zinc-300 text-sm font-medium rounded-lg border ${metalAccent.tagBorder} hover:bg-white/10 ${metalAccent.tagHover} transition-all duration-300`}
          >
            <Tag className={`w-3.5 h-3.5 ${metalAccent.iconColor}`} />
            {tag}
          </span>
        ))}
      </div>

      {/* Title */}
      <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 md:mb-8 leading-tight tracking-tight">
        {article.title}
      </h1>

      {/* Description */}
      <p className="text-lg md:text-xl text-zinc-400 mb-8 md:mb-10 leading-relaxed">
        {article.description}
      </p>

      {/* Author & Meta Info */}
      <div className="flex flex-wrap items-center gap-4 md:gap-6 lg:gap-8 p-4 md:p-6 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 hover:border-blue-400/40 transition-all duration-300">
        {/* Author */}
        <div className="flex items-center gap-3">
          <div
            className={`relative w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden ring-2 ${metalAccent.ringColor} ring-offset-2 ring-offset-slate-950`}
          >
            <NextImage
              src={author.avatar}
              alt={author.name}
              className="w-full h-full object-cover"
              priority
            />
          </div>
          <div>
            <p className="font-semibold text-white text-base md:text-lg">
              {author.name}
            </p>
            <p className="text-sm text-zinc-400">{author.role}</p>
          </div>
        </div>

        {/* Date */}
        <div className="flex items-center gap-2 text-zinc-400">
          <Calendar
            className={`w-4 h-4 md:w-5 md:h-5 ${metalAccent.iconColor}`}
          />
          <span className="text-sm font-medium">
            {formatDate(article.updatedAt)}
          </span>
        </div>

        {/* Read Time */}
        <div className="flex items-center gap-2 text-zinc-400">
          <Clock className={`w-4 h-4 md:w-5 md:h-5 ${metalAccent.iconColor}`} />
          <span className="text-sm font-medium">{readTime} min read</span>
        </div>
      </div>
    </header>
  );
};
