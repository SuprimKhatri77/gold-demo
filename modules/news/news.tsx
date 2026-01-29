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
    title: "Precious Metals Market Analysis: Q1 2026 Industrial Demand Surge",
    description:
      "Industrial consumption of platinum and palladium reaches record highs as automotive and technology sectors accelerate production. B2B suppliers report increased institutional orders with platinum futures climbing 12% amid supply chain optimization and strategic inventory building.",
    tags: ["Market Analysis", "Industrial Metals", "B2B Trends"],
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
      "Strategic Procurement: Silver's Role in Green Technology Manufacturing",
    description:
      "Corporate buyers increase silver procurement for solar panel production and electrical components. Analysis reveals silver's critical position in renewable energy supply chains, with B2B contracts showing 18-month forward commitments from major manufacturers seeking price stability.",
    tags: ["Supply Chain", "Silver", "Manufacturing"],
    images: [
      "https://images.unsplash.com/photo-1611095790444-1dfa35e37b52?w=800&q=80",
    ],
    createdAt: "2026-01-12T09:15:00Z",
    updatedAt: "2026-01-18T16:45:00Z",
    authorId: "analyst-2",
  },
  {
    id: "3",
    title: "Institutional Gold Reserves: Central Bank Purchasing Patterns",
    description:
      "Global central banks accelerate gold acquisition programs with record Q4 2025 purchases. Strategic analysis for institutional buyers examines implications for corporate treasury management, reserve diversification strategies, and bulk procurement opportunities in the wholesale metals market.",
    tags: ["Institutional", "Gold Reserves", "Treasury Management"],
    images: [
      "https://images.unsplash.com/photo-1621981386829-9b458a2cddde?w=800&q=80",
    ],
    createdAt: "2026-01-10T11:30:00Z",
    updatedAt: "2026-01-17T10:20:00Z",
    authorId: "analyst-1",
  },
  {
    id: "4",
    title:
      "ESG Compliance in Metals Sourcing: Supply Chain Certification Standards",
    description:
      "New international standards reshape precious metals procurement for corporate buyers. Leading B2B suppliers implement blockchain-verified sourcing and sustainability certifications, addressing institutional ESG requirements and ethical supply chain mandates for responsible metals trading.",
    tags: ["ESG Standards", "Supply Chain", "Compliance"],
    images: [
      "https://images.unsplash.com/photo-1541960071727-c531398e7494?w=800&q=80",
    ],
    createdAt: "2026-01-08T13:00:00Z",
    updatedAt: "2026-01-15T09:00:00Z",
    authorId: "analyst-3",
  },
  {
    id: "5",
    title: "Palladium Procurement Strategies for Automotive Industry Partners",
    description:
      "Automotive manufacturers optimize palladium sourcing amid price volatility. B2B market analysis reveals strategic hedging instruments, long-term supply agreements, and alternative sourcing channels. Expert insights on managing industrial metals procurement in volatile market conditions.",
    tags: ["Automotive", "Palladium", "Procurement Strategy"],
    images: [
      "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800&q=80",
    ],
    createdAt: "2026-01-05T15:45:00Z",
    updatedAt: "2026-01-12T11:30:00Z",
    authorId: "analyst-2",
  },
  {
    id: "6",
    title: "Wholesale Metals Market Report: B2B Trading Volumes Q4 2025",
    description:
      "Comprehensive analysis of institutional trading activity across gold, silver, platinum, and palladium markets. B2B transaction volumes, price discovery mechanisms, and forward-looking projections for corporate procurement teams and wholesale trading partners navigating global metals markets.",
    tags: ["Market Report", "B2B Trading", "Wholesale"],
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
    <div className="min-h-screen bg-linear-to-b from-slate-950 via-blue-950 to-slate-950 relative">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(59,130,246,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.03) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      {/* Floating Gradient Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="relative">
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
    </div>
  );
};
