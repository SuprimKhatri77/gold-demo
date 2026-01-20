"use client";

import React, { useState, useMemo } from "react";
import { Search, Calendar, ArrowRight, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface NewsItem {
  id: string;
  title: string;
  description: string;
  tags: string[];
  images: string[];
  createdAt: string;
  updatedAt: string;
  authorId: string;
}

const mockNews: NewsItem[] = [
  {
    id: "1",
    title: "Gold Prices Reach New Heights Amid Global Economic Uncertainty",
    description:
      "Recent market analysis shows gold prices climbing to unprecedented levels as investors seek safe-haven assets. Economic turbulence and geopolitical tensions continue to drive demand for precious metals, with analysts predicting sustained growth throughout the quarter.",
    tags: ["Market Analysis", "Price Updates", "Investment"],
    images: [
      "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=800&q=80",
    ],
    createdAt: "2026-01-15T10:00:00Z",
    updatedAt: "2026-01-20T14:30:00Z",
    authorId: "analyst-1",
  },
  {
    id: "2",
    title:
      "Understanding the Gold-to-Silver Ratio: Investment Insights for 2026",
    description:
      "The gold-to-silver ratio has reached historically significant levels, presenting unique opportunities for strategic investors. Our experts break down what this means for your portfolio and how to capitalize on precious metal market dynamics in the current economic climate.",
    tags: ["Investment Strategy", "Market Analysis", "Silver"],
    images: [
      "https://images.unsplash.com/photo-1611095790444-1dfa35e37b52?w=800&q=80",
    ],
    createdAt: "2026-01-12T09:15:00Z",
    updatedAt: "2026-01-18T16:45:00Z",
    authorId: "analyst-2",
  },
  {
    id: "3",
    title: "Central Banks Increase Gold Reserves: What It Means for Investors",
    description:
      "Major central banks worldwide have accelerated their gold acquisition programs, adding substantial reserves in recent months. This strategic shift signals growing confidence in gold as a monetary anchor and has significant implications for private investors and institutional portfolios.",
    tags: ["Central Banks", "Global Markets", "Investment"],
    images: [
      "https://images.unsplash.com/photo-1621981386829-9b458a2cddde?w=800&q=80",
    ],
    createdAt: "2026-01-10T11:30:00Z",
    updatedAt: "2026-01-17T10:20:00Z",
    authorId: "analyst-1",
  },
  {
    id: "4",
    title: "Sustainable Gold Mining: The Future of Responsible Investment",
    description:
      "Environmental and social governance considerations are reshaping the gold mining industry. Discover how leading companies are implementing sustainable practices and what this means for ethical investors seeking to align their portfolios with ESG principles.",
    tags: ["Sustainability", "ESG", "Mining"],
    images: [
      "https://images.unsplash.com/photo-1541960071727-c531398e7494?w=800&q=80",
    ],
    createdAt: "2026-01-08T13:00:00Z",
    updatedAt: "2026-01-15T09:00:00Z",
    authorId: "analyst-3",
  },
  {
    id: "5",
    title: "Digital Gold vs Physical Gold: Comparing Investment Vehicles",
    description:
      "The rise of blockchain technology has introduced new ways to invest in gold, from tokenized assets to digital certificates. We examine the advantages and considerations of digital gold platforms compared to traditional physical gold ownership and storage solutions.",
    tags: ["Digital Assets", "Technology", "Investment Comparison"],
    images: [
      "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800&q=80",
    ],
    createdAt: "2026-01-05T15:45:00Z",
    updatedAt: "2026-01-12T11:30:00Z",
    authorId: "analyst-2",
  },
  {
    id: "6",
    title: "Quarterly Market Report: Gold Performance Analysis Q4 2025",
    description:
      "Our comprehensive quarterly review examines gold market performance, key trends, and factors influencing price movements. Detailed analysis includes macroeconomic indicators, currency correlations, and forward-looking projections for informed investment decision-making.",
    tags: ["Quarterly Report", "Market Analysis", "Performance"],
    images: [
      "https://images.unsplash.com/photo-1559526324-593bc073d938?w=800&q=80",
    ],
    createdAt: "2026-01-03T08:00:00Z",
    updatedAt: "2026-01-10T14:15:00Z",
    authorId: "analyst-1",
  },
];

// Utility Functions
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const createSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
};

// Components
const NewsHero: React.FC = () => (
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

const LoadingSkeleton: React.FC = () => (
  <div className="space-y-8">
    {[1, 2, 3].map((i) => (
      <div
        key={i}
        className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse"
      >
        <div className="md:flex">
          <div className="md:w-80 h-64 bg-slate-200"></div>
          <div className="p-8 flex-1">
            <div className="h-8 bg-slate-200 rounded w-3/4 mb-4"></div>
            <div className="space-y-3 mb-6">
              <div className="h-4 bg-slate-200 rounded"></div>
              <div className="h-4 bg-slate-200 rounded w-5/6"></div>
            </div>
            <div className="h-10 bg-slate-200 rounded w-32"></div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

const EmptyState: React.FC = () => (
  <div className="bg-white rounded-lg shadow-md p-16 text-center">
    <div className="max-w-md mx-auto">
      <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <Search className="w-10 h-10 text-amber-600" />
      </div>
      <h3 className="text-2xl font-bold text-slate-900 mb-3">
        No News Available
      </h3>
      <p className="text-slate-600 text-lg">
        No news articles match your search. Please try different keywords or
        check back later for new updates.
      </p>
    </div>
  </div>
);

interface NewsCardProps {
  news: NewsItem;
}

const NewsCard: React.FC<NewsCardProps> = ({ news }) => {
  const slug = createSlug(news.title);

  return (
    <article className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="md:flex">
        <div className="md:w-80 h-64 relative overflow-hidden bg-slate-200">
          <Image
            fill
            src={news.images[0]}
            alt={news.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-linear-to-t from-slate-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        <div className="p-8 flex-1 flex flex-col">
          <div className="flex flex-wrap gap-2 mb-4">
            {news.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-amber-50 text-amber-700 text-xs font-semibold rounded-full border border-amber-200"
              >
                {tag}
              </span>
            ))}
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-amber-600 transition-colors leading-tight">
            <a href={`/news/${slug}`}>{news.title}</a>
          </h2>

          <p className="text-slate-600 mb-6 leading-relaxed flex-1 line-clamp-3">
            {news.description}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-slate-500">
              <Calendar className="w-4 h-4 mr-2" />
              <span>Last updated on {formatDate(news.updatedAt)}</span>
            </div>

            <a
              href={`/news/${slug}`}
              className="inline-flex items-center px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg transition-colors group/btn"
            >
              Read More
              <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
};

interface NewsListProps {
  news: NewsItem[];
  isLoading: boolean;
}

const NewsList: React.FC<NewsListProps> = ({ news, isLoading }) => {
  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (news.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-8">
      {news.map((item) => (
        <NewsCard key={item.id} news={item} />
      ))}
    </div>
  );
};

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => (
  <div className="bg-white rounded-lg shadow-md p-6 mb-6">
    <h3 className="text-lg font-bold text-slate-900 mb-4">Search News</h3>
    <div className="relative">
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
      <input
        type="text"
        placeholder="Search by title or tags..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-lg focus:border-amber-500 focus:outline-none transition-colors text-slate-900"
      />
    </div>
  </div>
);

interface SuggestedNewsProps {
  news: NewsItem[];
}

const SuggestedNews: React.FC<SuggestedNewsProps> = ({ news }) => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <h3 className="text-lg font-bold text-slate-900 mb-6">Recent Updates</h3>
    <div className="space-y-4">
      {news.slice(0, 5).map((item) => {
        const slug = createSlug(item.title);
        return (
          <a
            key={item.id}
            href={`/news/${slug}`}
            className="flex gap-4 group hover:bg-slate-50 p-3 rounded-lg transition-colors"
          >
            <div className="w-20 h-20 relative rounded-lg overflow-hidden shrink-0 bg-slate-200">
              <Image
                fill
                src={item.images[0]}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-slate-900 group-hover:text-amber-600 transition-colors mb-1 line-clamp-2 text-sm leading-tight">
                {item.title}
              </h4>
              <p className="text-xs text-slate-500">
                {formatDate(item.updatedAt)}
              </p>
            </div>
          </a>
        );
      })}
    </div>
  </div>
);

interface NewsSidebarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  suggestedNews: NewsItem[];
}

const NewsSidebar: React.FC<NewsSidebarProps> = ({
  searchQuery,
  onSearchChange,
  suggestedNews,
}) => (
  <aside>
    <SearchBar value={searchQuery} onChange={onSearchChange} />
    <SuggestedNews news={suggestedNews} />
  </aside>
);

// Main Page Component
export const NewsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Simulate loading on mount
  React.useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredNews = useMemo(() => {
    if (!searchQuery.trim()) return mockNews;

    const query = searchQuery.toLowerCase();
    return mockNews.filter(
      (news) =>
        news.title.toLowerCase().includes(query) ||
        news.tags.some((tag) => tag.toLowerCase().includes(query)),
    );
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-slate-50">
      <NewsHero />

      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <NewsList news={filteredNews} isLoading={isLoading} />
          </div>

          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-6">
              <NewsSidebar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                suggestedNews={mockNews}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
