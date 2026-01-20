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
    <header className="mb-16">
      <div className="flex flex-wrap gap-3 mb-8">
        {article.tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-amber-50 to-amber-100 text-amber-800 text-sm font-semibold rounded-full border border-amber-200 hover:shadow-md transition-shadow"
          >
            <Tag className="w-3.5 h-3.5" />
            {tag}
          </span>
        ))}
      </div>

      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-8 leading-[1.1] tracking-tight">
        {article.title}
      </h1>

      <p className="text-xl md:text-2xl text-slate-600 mb-10 leading-relaxed font-light">
        {article.description}
      </p>

      <div className="flex flex-wrap items-center gap-8 pb-10 border-b border-slate-200">
        <div className="flex items-center gap-4">
          <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-amber-400 ring-offset-2">
            <NextImage
              src={author.avatar}
              alt={author.name}
              className="w-full h-full object-cover"
              priority
            />
          </div>
          <div>
            <p className="font-semibold text-slate-900 text-lg">
              {author.name}
            </p>
            <p className="text-sm text-slate-500">{author.role}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-slate-600">
          <Calendar className="w-5 h-5 text-amber-600" />
          <span className="text-sm font-medium">
            {formatDate(article.updatedAt)}
          </span>
        </div>

        <div className="flex items-center gap-2 text-slate-600">
          <Clock className="w-5 h-5 text-amber-600" />
          <span className="text-sm font-medium">{readTime} min read</span>
        </div>
      </div>
    </header>
  );
};
