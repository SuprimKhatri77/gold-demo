import { Calendar, Clock, Tag } from "lucide-react";
import {
  ArticleHeaderProps,
  calculateReadTime,
  formatDate,
  NextImage,
} from "./news-detail";

export const ArticleHeader: React.FC<ArticleHeaderProps> = ({
  article,
  author,
}) => {
  const readTime = calculateReadTime(article.content);

  return (
    <header className="mb-12 md:mb-16">
      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-6 md:mb-8">
        {article.tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 backdrop-blur-md text-zinc-300 text-sm font-medium rounded-lg border border-white/10 hover:bg-white/10 hover:border-amber-500/30 transition-all duration-300"
          >
            <Tag className="w-3.5 h-3.5 text-amber-500/70" />
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
      <div className="flex flex-wrap items-center gap-4 md:gap-6 lg:gap-8 pb-8 md:pb-10 border-b border-white/10">
        {/* Author */}
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden ring-2 ring-amber-500/30 ring-offset-2 ring-offset-black">
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
          <Calendar className="w-4 h-4 md:w-5 md:h-5 text-amber-500/70" />
          <span className="text-sm font-medium">
            {formatDate(article.updatedAt)}
          </span>
        </div>

        {/* Read Time */}
        <div className="flex items-center gap-2 text-zinc-400">
          <Clock className="w-4 h-4 md:w-5 md:h-5 text-amber-500/70" />
          <span className="text-sm font-medium">{readTime} min read</span>
        </div>
      </div>
    </header>
  );
};
