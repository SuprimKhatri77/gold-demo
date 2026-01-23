"use client";

import React, { useState, useMemo } from "react";
import { NewsHero } from "./news-hero";
import { NewsList } from "./news-list";
import { NewsSidebar } from "./news-sidebar";

export interface NewsItem {
  id: string;
  title: string;
  description: string;
  tags: string[];
  images: string[];
  createdAt: string;
  updatedAt: string;
  authorId: string;
}

export const mockNews: NewsItem[] = [
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

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const createSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
};

export const NewsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
    <div className="min-h-screen ">
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
