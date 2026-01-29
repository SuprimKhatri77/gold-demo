import { ChevronRight, TrendingUp, BarChart3 } from "lucide-react";
import Link from "next/link";

export const NewsHero: React.FC = () => (
  <div className="relative text-white py-16 md:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
    {/* Background Elements */}
    <div className="absolute inset-0 bg-linear-to-b from-slate-950 via-blue-950/50 to-transparent"></div>

    {/* Floating Gradient Orbs */}
    <div className="absolute top-0 right-0 w-125 h-125 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
    <div
      className="absolute bottom-0 left-0 w-100 h-100 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"
      style={{ animationDelay: "1s" }}
    ></div>

    {/* Animated Grid Pattern */}
    <div className="absolute inset-0 opacity-20">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(rgba(59,130,246,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.03) 1px, transparent 1px)`,
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
          <div className="h-px w-8 md:w-12 bg-linear-to-r from-transparent via-blue-400/40 to-cyan-400/40"></div>
          <span className="text-zinc-400 font-medium tracking-wider uppercase text-xs md:text-sm flex items-center gap-2">
            <BarChart3 size={16} className="text-cyan-400" />
            Industry Updates
          </span>
          <div className="h-px w-8 md:w-12 bg-linear-to-l from-transparent via-cyan-400/40 to-blue-400/40"></div>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-8 tracking-tight leading-tight">
          Precious Metals{" "}
          <span className="block bg-linear-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Market Intelligence
          </span>
        </h1>

        {/* Description */}
        <p className="text-base sm:text-lg md:text-xl text-zinc-400 leading-relaxed max-w-3xl">
          Strategic insights for B2B metals trading, institutional procurement,
          and wholesale market dynamics across gold, silver, platinum, and
          palladium markets.
        </p>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6 mt-10 md:mt-12">
          {[
            { label: "Market Coverage", value: "24/7", icon: TrendingUp },
            { label: "Industry Reports", value: "150+", icon: BarChart3 },
            { label: "Global Reach", value: "50+", icon: ChevronRight },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 md:p-6 hover:bg-white/10 hover:border-blue-400/40 hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="flex items-center gap-3 mb-2">
                <stat.icon className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
                <div className="text-2xl md:text-3xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                  {stat.value}
                </div>
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
