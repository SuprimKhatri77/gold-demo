import Image from "next/image";
import { createSlug, formatDate, NewsItem } from "./news";
import { Clock } from "lucide-react";

interface SuggestedNewsProps {
  news: NewsItem[];
}

export const SuggestedNews: React.FC<SuggestedNewsProps> = ({ news }) => (
  <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6 sticky top-6">
    <div className="flex items-center gap-2 mb-6">
      <Clock size={18} className="text-amber-500" />
      <h3 className="text-lg font-bold text-white">Recent Updates</h3>
    </div>
    <div className="space-y-4">
      {news.slice(0, 5).map((item) => {
        const slug = createSlug(item.title);
        return (
          <a
            key={item.id}
            href={`/news/${slug}`}
            className="flex gap-4 group hover:bg-white/5 p-3 rounded-xl transition-all duration-300 border border-transparent hover:border-white/10"
          >
            <div className="w-20 h-20 relative rounded-lg overflow-hidden shrink-0 bg-zinc-900/50 border border-white/10">
              <Image
                fill
                src={item.images[0]}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-white group-hover:text-amber-500 transition-colors mb-2 line-clamp-2 text-sm leading-tight">
                {item.title}
              </h4>
              <p className="text-xs text-zinc-400 flex items-center gap-1">
                <Clock size={12} className="text-amber-500" />
                {formatDate(item.updatedAt)}
              </p>
            </div>
          </a>
        );
      })}
    </div>
  </div>
);
