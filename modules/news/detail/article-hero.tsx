import { ArrowLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

export const ArticleHero: React.FC = () => (
  <div className="relative bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-12 px-6">
    <div className="absolute inset-0 opacity-10">
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500 rounded-full blur-3xl"></div>
    </div>

    <div className="relative max-w-7xl mx-auto">
      <nav className="flex items-center space-x-2 text-sm mb-6 text-slate-300">
        <Link href="/" className="hover:text-amber-400 transition-colors">
          Home
        </Link>
        <ChevronRight className="w-4 h-4" />
        <Link href="/news" className="hover:text-amber-400 transition-colors">
          News
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-amber-400">Article</span>
      </nav>

      <Link
        href="/news"
        className="inline-flex items-center text-amber-400 hover:text-amber-300 transition-colors mb-4 group"
      >
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
        Back to News
      </Link>
    </div>
  </div>
);
