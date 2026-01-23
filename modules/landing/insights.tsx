import { useState, useEffect, useRef } from "react";
import { ArrowRight, Clock, TrendingUp } from "lucide-react";
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
  },
];

export function Insights() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      id="insights"
      className="py-16 md:py-24 lg:py-32 bg-zinc-950 text-white relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-linear-to-b from-black via-zinc-950 to-black"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          ref={ref}
          className={`text-center mb-12 md:mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-6">
            <TrendingUp size={16} className="text-amber-400" />
            <span className="text-sm font-medium text-zinc-400">
              Insights & News
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight">
            Latest Gold Market
            <span className="block text-white mt-1">Insights</span>
          </h2>

          <p className="text-zinc-400 text-base md:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed">
            Stay informed with expert analysis, market trends, and educational
            content about gold collecting and investment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
          {blogPosts.map((post, index) => (
            <article
              key={post.id}
              className={`group bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-500 hover:-translate-y-1 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative h-48 md:h-56 overflow-hidden">
                <div className="absolute top-4 left-4 z-10 bg-amber-400/10 backdrop-blur-sm border border-amber-400/30 text-amber-400 px-3 py-1 rounded-full text-xs md:text-sm font-semibold">
                  {post.category}
                </div>
                <Image
                  fill
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent"></div>
              </div>

              <div className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4 text-xs md:text-sm text-zinc-400">
                  <div className="flex items-center gap-1.5">
                    <Clock size={14} />
                    <span>{post.readTime}</span>
                  </div>
                  <div className="w-1 h-1 bg-zinc-600 rounded-full"></div>
                  <span>{post.date}</span>
                </div>

                <h3 className="text-lg md:text-xl font-semibold mb-3 text-white group-hover:text-amber-400 transition-colors leading-tight line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-sm md:text-base text-zinc-400 mb-6 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>

                <button className="group/btn text-amber-400 font-semibold text-sm md:text-base flex items-center gap-2 hover:gap-3 transition-all duration-300">
                  Read Article
                  <ArrowRight
                    size={16}
                    className="group-hover/btn:translate-x-1 transition-transform"
                  />
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center">
          <button className="group bg-white text-black px-6 md:px-8 lg:px-10 py-3 md:py-4 rounded-full hover:bg-amber-400 transition-all duration-300 font-semibold text-sm md:text-base transform hover:scale-105 flex items-center gap-2 md:gap-3 mx-auto shadow-lg hover:shadow-xl">
            View All Insights
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </div>
      </div>
    </section>
  );
}
