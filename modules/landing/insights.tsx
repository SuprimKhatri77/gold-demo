import { useState, useEffect, useRef } from "react";
import {
  ArrowRight,
  Clock,
  TrendingUp,
  Sparkles,
  BarChart3,
  Newspaper,
} from "lucide-react";
import Image from "next/image";

const useScrollAnimation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return { ref, isVisible };
};

const blogPosts = [
  {
    id: 1,
    title: "The Art of Gold Investment: A Complete Guide for 2026",
    excerpt:
      "Discover the strategic approaches to gold investment and learn how to build a resilient portfolio in today's dynamic market environment.",
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
    date: "January 15, 2026",
    category: "Investment",
    readTime: "8 min read",
    featured: true,
    color: "amber",
  },
  {
    id: 2,
    title: "Understanding Gold Purity: What Makes 24K Special",
    excerpt:
      "Explore the science behind gold purity standards and why certification matters when building your collection.",
    image:
      "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=800&q=80",
    date: "January 12, 2026",
    category: "Education",
    readTime: "6 min read",
    featured: false,
    color: "blue",
  },
  {
    id: 3,
    title: "Global Gold Markets: Trends Shaping the Future",
    excerpt:
      "An in-depth analysis of emerging trends in international gold markets and their implications for collectors and investors.",
    image:
      "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=800&q=80",
    date: "January 8, 2026",
    category: "Market Analysis",
    readTime: "10 min read",
    featured: false,
    color: "cyan",
  },
  {
    id: 4,
    title: "Secure Storage Solutions for Precious Metals",
    excerpt:
      "Essential guide to protecting your gold investments with professional vault services and insurance strategies.",
    image:
      "https://images.unsplash.com/photo-1610375461369-d8a4632dfe1d?w=800&q=80",
    date: "January 5, 2026",
    category: "Security",
    readTime: "7 min read",
    featured: false,
    color: "purple",
  },
];

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "Investment":
      return TrendingUp;
    case "Education":
      return Sparkles;
    case "Market Analysis":
      return BarChart3;
    case "Security":
      return Newspaper;
    default:
      return Newspaper;
  }
};

const getColorClasses = (color: string) => {
  switch (color) {
    case "amber":
      return {
        badge: "bg-amber-500/10 border-amber-500/30 text-amber-400",
        glow: "from-amber-500/20 to-yellow-500/10",
        glowShadow: "rgba(251, 191, 36, 0.3)",
        button: "text-amber-400 hover:text-amber-300",
      };
    case "blue":
      return {
        badge: "bg-blue-500/10 border-blue-500/30 text-blue-400",
        glow: "from-blue-500/20 to-cyan-500/10",
        glowShadow: "rgba(59, 130, 246, 0.3)",
        button: "text-blue-400 hover:text-blue-300",
      };
    case "cyan":
      return {
        badge: "bg-cyan-500/10 border-cyan-500/30 text-cyan-400",
        glow: "from-cyan-500/20 to-blue-500/10",
        glowShadow: "rgba(34, 211, 238, 0.3)",
        button: "text-cyan-400 hover:text-cyan-300",
      };
    case "purple":
      return {
        badge: "bg-purple-500/10 border-purple-500/30 text-purple-400",
        glow: "from-purple-500/20 to-indigo-500/10",
        glowShadow: "rgba(168, 85, 247, 0.3)",
        button: "text-purple-400 hover:text-purple-300",
      };
    default:
      return {
        badge: "bg-blue-500/10 border-blue-500/30 text-blue-400",
        glow: "from-blue-500/20 to-cyan-500/10",
        glowShadow: "rgba(59, 130, 246, 0.3)",
        button: "text-blue-400 hover:text-blue-300",
      };
  }
};

export function Insights() {
  const { ref, isVisible } = useScrollAnimation();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section
      id="insights"
      className="py-24 lg:py-32 bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950 relative overflow-hidden"
    >
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(59,130,246,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.03) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Floating gradient orbs */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
      <div
        className="absolute bottom-1/4 -right-48 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "2s" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          ref={ref}
          className={`text-center mb-16 lg:mb-20 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 hover:border-blue-400/40 transition-all duration-300 mb-6 group">
            <TrendingUp className="w-4 h-4 text-amber-500 group-hover:scale-110 transition-transform duration-300" />
            <span className="text-sm font-semibold text-zinc-400 group-hover:text-white transition-colors">
              Insights & News
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="block text-white">Latest Gold Market</span>
            <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Insights
            </span>
          </h2>

          <p className="text-zinc-400 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
            Stay informed with expert analysis, market trends, and educational
            content about gold collecting and investment.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16">
          {/* Featured Large Card */}
          {blogPosts
            .filter((post) => post.featured)
            .map((post, index) => {
              const colors = getColorClasses(post.color);
              const Icon = getCategoryIcon(post.category);
              const isHovered = hoveredCard === post.id;

              return (
                <article
                  key={post.id}
                  onMouseEnter={() => setHoveredCard(post.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className={`lg:col-span-7 group relative bg-white/5 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10 hover:border-blue-400/40 transition-all duration-500 hover:-translate-y-1 ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-12"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {/* Glow effect */}
                  <div
                    className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl`}
                    style={{
                      background: colors.glowShadow,
                    }}
                  />

                  {/* Image with Parallax */}
                  <div className="relative h-64 lg:h-80 overflow-hidden">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${colors.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10`}
                    />
                    <Image
                      fill
                      src={post.image}
                      alt={post.title}
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent z-10" />

                    {/* Category Badge */}
                    <div
                      className={`absolute top-6 left-6 z-20 ${colors.badge} backdrop-blur-xl border px-4 py-2 rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg`}
                    >
                      <Icon className="w-4 h-4" />
                      {post.category}
                    </div>

                    {/* Animated corner accent */}
                    <div
                      className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl ${colors.glow} rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    />
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <div className="flex items-center gap-3 mb-4 text-sm text-zinc-400">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{post.readTime}</span>
                      </div>
                      <div className="w-1.5 h-1.5 bg-zinc-600 rounded-full" />
                      <span>{post.date}</span>
                    </div>

                    <h3 className="text-2xl lg:text-3xl font-bold mb-4 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-blue-400 transition-all duration-300 leading-tight">
                      {post.title}
                    </h3>

                    <p className="text-zinc-400 mb-6 leading-relaxed text-lg group-hover:text-zinc-300 transition-colors duration-300">
                      {post.excerpt}
                    </p>

                    <button
                      className={`${colors.button} font-bold text-base flex items-center gap-2 group/btn transition-all duration-300`}
                    >
                      Read Full Article
                      <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform duration-300" />
                    </button>
                  </div>
                </article>
              );
            })}

          {/* Side Column - Stats Card */}
          <div
            className={`lg:col-span-5 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-blue-400/40 p-8 transition-all duration-500 hover:-translate-y-1 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            }`}
            style={{ transitionDelay: "100ms" }}
          >
            <h3 className="text-2xl font-bold text-white mb-6">
              Market Highlights
            </h3>

            <div className="space-y-6">
              {/* Stat Item */}
              <div className="group/stat relative p-5 bg-white/5 rounded-xl border border-white/10 hover:border-amber-400/40 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover/stat:opacity-100 transition-opacity duration-300 rounded-xl" />
                <div className="relative flex items-start justify-between">
                  <div className="flex-1">
                    <div className="text-sm text-zinc-500 mb-1">
                      Gold Price (24K)
                    </div>
                    <div className="text-3xl font-bold text-white mb-2">
                      $2,047
                    </div>
                    <div className="flex items-center gap-2 text-green-400 text-sm font-semibold">
                      <TrendingUp className="w-4 h-4" />
                      <span>+1.2% Today</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-yellow-500/10 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-amber-400" />
                  </div>
                </div>
              </div>

              {/* Stat Item */}
              <div className="group/stat relative p-5 bg-white/5 rounded-xl border border-white/10 hover:border-cyan-400/40 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover/stat:opacity-100 transition-opacity duration-300 rounded-xl" />
                <div className="relative flex items-start justify-between">
                  <div className="flex-1">
                    <div className="text-sm text-zinc-500 mb-1">
                      Trading Volume
                    </div>
                    <div className="text-3xl font-bold text-white mb-2">
                      $2.4B
                    </div>
                    <div className="flex items-center gap-2 text-cyan-400 text-sm font-semibold">
                      <BarChart3 className="w-4 h-4" />
                      <span>Last 24 Hours</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/10 flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-cyan-400" />
                  </div>
                </div>
              </div>

              {/* Stat Item */}
              <div className="group/stat relative p-5 bg-white/5 rounded-xl border border-white/10 hover:border-blue-400/40 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover/stat:opacity-100 transition-opacity duration-300 rounded-xl" />
                <div className="relative flex items-start justify-between">
                  <div className="flex-1">
                    <div className="text-sm text-zinc-500 mb-1">
                      Active Traders
                    </div>
                    <div className="text-3xl font-bold text-white mb-2">
                      150K+
                    </div>
                    <div className="flex items-center gap-2 text-blue-400 text-sm font-semibold">
                      <TrendingUp className="w-4 h-4" />
                      <span>Growing Daily</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/10 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-blue-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row - Smaller Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {blogPosts
            .filter((post) => !post.featured)
            .map((post, index) => {
              const colors = getColorClasses(post.color);
              const Icon = getCategoryIcon(post.category);
              const isHovered = hoveredCard === post.id;

              return (
                <article
                  key={post.id}
                  onMouseEnter={() => setHoveredCard(post.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className={`group relative bg-white/5 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10 hover:border-blue-400/40 transition-all duration-500 hover:-translate-y-1 ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-12"
                  }`}
                  style={{ transitionDelay: `${(index + 2) * 100}ms` }}
                >
                  {/* Glow effect */}
                  <div
                    className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`}
                    style={{
                      background: colors.glowShadow,
                    }}
                  />

                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${colors.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10`}
                    />
                    <Image
                      fill
                      src={post.image}
                      alt={post.title}
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent z-10" />

                    {/* Category Badge */}
                    <div
                      className={`absolute top-4 left-4 z-20 ${colors.badge} backdrop-blur-xl border px-3 py-1.5 rounded-lg font-bold text-xs flex items-center gap-1.5 shadow-lg`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {post.category}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3 text-xs text-zinc-400">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{post.readTime}</span>
                      </div>
                      <div className="w-1 h-1 bg-zinc-600 rounded-full" />
                      <span>{post.date}</span>
                    </div>

                    <h3 className="text-lg font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-blue-400 transition-all duration-300 leading-tight line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-sm text-zinc-400 mb-4 leading-relaxed line-clamp-2 group-hover:text-zinc-300 transition-colors duration-300">
                      {post.excerpt}
                    </p>

                    <button
                      className={`${colors.button} font-bold text-sm flex items-center gap-2 group/btn transition-all duration-300`}
                    >
                      Read More
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </button>
                  </div>
                </article>
              );
            })}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <button className="group relative bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white px-10 py-4 rounded-xl transition-all duration-300 font-bold text-lg flex items-center gap-3 mx-auto shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-1 overflow-hidden">
            {/* Shimmer effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <span className="relative">View All Insights</span>
            <ArrowRight className="relative w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
}
