import { ChevronRight, TrendingUp } from "lucide-react";
import Link from "next/link";

export const NewsHero: React.FC = () => (
  <div className="relative bg-black text-white py-16 md:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
    {/* Background Elements */}
    <div className="absolute inset-0 bg-linear-to-b from-zinc-950 via-black to-zinc-950"></div>
    <div className="absolute inset-0">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl"></div>
    </div>

    {/* Animated Grid Pattern */}
    <div className="absolute inset-0 opacity-[0.02]">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      ></div>
    </div>

    <div className="relative max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm mb-8 md:mb-12">
        <Link
          href="/"
          className="text-zinc-400 hover:text-white transition-colors duration-300"
        >
          Home
        </Link>
        <ChevronRight className="w-4 h-4 text-zinc-600" />
        <span className="text-white font-medium">News</span>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl">
        {/* Label */}
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px w-8 md:w-12 bg-linear-to-r from-transparent to-white/20"></div>
          <span className="text-zinc-400 font-medium tracking-wider uppercase text-xs md:text-sm flex items-center gap-2">
            <TrendingUp size={16} className="text-amber-500" />
            Market Updates
          </span>
          <div className="h-px w-8 md:w-12 bg-linear-to-l from-transparent to-white/20"></div>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-8 tracking-tight leading-tight">
          Latest Gold Market{" "}
          <span className="block bg-linear-to-r from-amber-500 via-amber-400 to-amber-500 bg-clip-text text-transparent">
            News & Insights
          </span>
        </h1>

        {/* Description */}
        <p className="text-base sm:text-lg md:text-xl text-zinc-400 leading-relaxed max-w-3xl">
          Stay informed with expert analysis, market updates, and exclusive
          insights from the world of precious metals investment and gold
          trading.
        </p>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6 mt-10 md:mt-12">
          {[
            { label: "Daily Updates", value: "24/7" },
            { label: "Expert Analysis", value: "100+" },
            { label: "Market Coverage", value: "Global" },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 md:p-6 hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="text-2xl md:text-3xl font-bold text-white mb-1 group-hover:text-amber-500 transition-colors">
                {stat.value}
              </div>
              <div className="text-xs md:text-sm text-zinc-400 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);
