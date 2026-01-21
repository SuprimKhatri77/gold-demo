import { ChevronRight } from "lucide-react";
import Link from "next/link";

export const NewsHero: React.FC = () => (
  <div className="relative bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20 px-6 overflow-hidden">
    <div className="absolute inset-0 opacity-10">
      <div className="absolute top-0 left-0 w-96 h-96 bg-amber-500 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-600 rounded-full blur-3xl"></div>
    </div>

    <div className="relative max-w-7xl mx-auto">
      <nav className="flex items-center space-x-2 text-sm mb-8 text-slate-300">
        <Link href="/" className="hover:text-amber-400 transition-colors">
          Home
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-amber-400">News</span>
      </nav>

      <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
        Latest Gold Market{" "}
        <span className="text-amber-400">News & Insights</span>
      </h1>
      <p className="text-xl text-slate-300 max-w-3xl leading-relaxed">
        Stay informed with expert analysis, market updates, and exclusive
        insights from the world of precious metals investment and gold trading.
      </p>
    </div>
  </div>
);
