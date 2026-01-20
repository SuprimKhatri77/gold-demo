import { ArrowRight, Clock, TrendingUp } from "lucide-react";
import { useScrollAnimation } from "./landing";
import Image from "next/image";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  category: string;
  readTime: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Art of Gold Investment: A Complete Guide for 2026",
    excerpt:
      "Discover the strategic approaches to gold investment and learn how to build a resilient portfolio in today&apos;s dynamic market environment.",
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

export const Insights: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      id="insights"
      className="py-28 bg-linear-to-b from-gray-50 to-white relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div
          ref={ref}
          className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-1 w-12 bg-linear-to-r from-transparent to-amber-400"></div>
            <span className="text-amber-600 font-bold tracking-wider uppercase text-sm flex items-center gap-2">
              <TrendingUp size={16} className="animate-pulse" />
              Insights & News
            </span>
            <div className="h-1 w-12 bg-linear-to-l from-transparent to-amber-400"></div>
          </div>

          <h2 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
            Latest Gold Market
            <span className="block bg-linear-to-r from-amber-600 via-amber-500 to-amber-700 bg-clip-text text-transparent">
              Insights
            </span>
          </h2>

          <p className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed">
            Stay informed with expert analysis, market trends, and educational
            content about gold collecting and investment.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <article
              key={post.id}
              className={`group bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative h-64 overflow-hidden">
                <div className="absolute top-6 left-6 z-10 bg-amber-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                  {post.category}
                </div>
                <Image
                  fill
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent"></div>
              </div>

              <div className="p-8">
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    <span>{post.readTime}</span>
                  </div>
                  <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                  <span>{post.date}</span>
                </div>

                <h3 className="text-2xl font-black mb-4 text-gray-900 group-hover:text-amber-600 transition-colors leading-tight">
                  {post.title}
                </h3>

                <p className="text-gray-600 mb-6 leading-relaxed">
                  {post.excerpt}
                </p>

                <button className="group/btn text-amber-600 font-bold flex items-center gap-2 hover:gap-4 transition-all duration-300">
                  Read Full Article
                  <ArrowRight
                    size={18}
                    className="group-hover/btn:translate-x-1 transition-transform"
                  />
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-16">
          <button className="group bg-linear-to-r from-amber-500 to-amber-600 text-white px-10 py-5 rounded-full hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-xl shadow-amber-500/30 hover:shadow-amber-500/50 font-bold text-lg transform hover:scale-105 flex items-center gap-3 mx-auto">
            View All Insights
            <ArrowRight
              size={20}
              className="group-hover:translate-x-2 transition-transform"
            />
          </button>
        </div>
      </div>
    </section>
  );
};
