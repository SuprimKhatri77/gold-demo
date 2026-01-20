// Types
export interface NewsItem {
  id: string;
  title: string;
  description: string;
  tags: string[];
  images: string[];
  createdAt: string;
  updatedAt: string;
  authorId: string;
  content: string;
}

export interface Author {
  id: string;
  name: string;
  role: string;
  avatar: string;
}

// Mock Authors Data
export const mockAuthors: Record<string, Author> = {
  "analyst-1": {
    id: "analyst-1",
    name: "Sarah Mitchell",
    role: "Senior Market Analyst",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
  },
  "analyst-2": {
    id: "analyst-2",
    name: "Michael Chen",
    role: "Investment Strategist",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
  },
  "analyst-3": {
    id: "analyst-3",
    name: "Emily Rodriguez",
    role: "ESG Specialist",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
  },
};

// Mock News Data with Plain Text Content
export const mockNews: NewsItem[] = [
  {
    id: "1",
    title: "Gold Prices Reach New Heights Amid Global Economic Uncertainty",
    description:
      "Recent market analysis shows gold prices climbing to unprecedented levels as investors seek safe-haven assets.",
    tags: ["Market Analysis", "Price Updates", "Investment"],
    images: [
      "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=1200&q=80",
      "https://images.unsplash.com/photo-1611095790444-1dfa35e37b52?w=1200&q=80",
      "https://images.unsplash.com/photo-1621981386829-9b458a2cddde?w=1200&q=80",
    ],
    createdAt: "2026-01-15T10:00:00Z",
    updatedAt: "2026-01-20T14:30:00Z",
    authorId: "analyst-1",
    content: `The global gold market has experienced remarkable momentum in recent weeks, with prices surging to record levels amid widespread economic uncertainty and geopolitical tensions. This unprecedented rally has captured the attention of investors worldwide, reinforcing gold's traditional role as a safe-haven asset during turbulent times.

As we navigate through this complex economic landscape, understanding the underlying factors driving this surge becomes crucial for both institutional and retail investors seeking to optimize their portfolio strategies.

Market Dynamics Driving the Rally

Several key factors have contributed to the current gold price surge. Central bank policies, inflation concerns, and currency fluctuations have created a perfect storm for precious metals appreciation. The weakening of major currencies against gold has been particularly pronounced, with investors seeking protection against potential devaluation.

Institutional investors have significantly increased their gold allocations, with many hedge funds and asset managers viewing the current environment as ideal for precious metals exposure. This institutional demand has provided substantial support to prices, creating a robust foundation for continued appreciation.

Geopolitical Factors and Safe-Haven Demand

Ongoing geopolitical tensions have amplified gold's appeal as a store of value. Investors are increasingly concerned about potential conflicts, trade disputes, and diplomatic uncertainties that could impact global financial markets. In such environments, gold has historically demonstrated its resilience and ability to preserve wealth.

The current geopolitical landscape has also prompted several central banks to accelerate their gold reserve accumulation programs. This strategic shift by monetary authorities signals growing confidence in gold as a foundational monetary asset, further validating investment decisions by private investors.

Technical Analysis and Price Projections

From a technical perspective, gold has broken through several key resistance levels, establishing new support zones that suggest potential for further appreciation. Chart patterns indicate strong momentum, with moving averages providing bullish signals across multiple timeframes.

Leading analysts project that gold could maintain its upward trajectory throughout the quarter, with some forecasting new all-time highs. However, investors should remain mindful of potential short-term volatility and consolidation periods that typically follow rapid price advances.

Investment Implications for Your Portfolio

For investors considering gold exposure, the current environment presents both opportunities and considerations. Diversification benefits remain compelling, particularly for portfolios seeking protection against currency depreciation and inflation. However, proper position sizing and risk management are essential given the recent price appreciation.

Physical gold, gold ETFs, and mining stocks each offer distinct advantages and risk profiles. Investors should carefully evaluate their investment objectives, time horizons, and risk tolerance when determining the most appropriate vehicles for gold exposure in their portfolios.

Looking Ahead

As we move forward, monitoring central bank policies, inflation data, and geopolitical developments will be crucial for understanding gold's trajectory. The precious metal's performance will likely remain closely tied to these fundamental drivers, making ongoing analysis essential for informed investment decisions.

The current rally underscores gold's enduring relevance in modern investment portfolios and its capacity to provide stability during uncertain times. As global economic conditions continue to evolve, gold's role as a strategic asset appears more significant than ever.`,
  },
  {
    id: "2",
    title:
      "Understanding the Gold-to-Silver Ratio: Investment Insights for 2026",
    description:
      "The gold-to-silver ratio has reached historically significant levels, presenting unique opportunities for strategic investors.",
    tags: ["Investment Strategy", "Market Analysis", "Silver"],
    images: [
      "https://images.unsplash.com/photo-1611095790444-1dfa35e37b52?w=1200&q=80",
    ],
    createdAt: "2026-01-12T09:15:00Z",
    updatedAt: "2026-01-18T16:45:00Z",
    authorId: "analyst-2",
    content:
      "The gold-to-silver ratio continues to provide valuable insights for precious metals investors...",
  },
  {
    id: "3",
    title: "Central Banks Increase Gold Reserves: What It Means for Investors",
    description:
      "Major central banks worldwide have accelerated their gold acquisition programs.",
    tags: ["Central Banks", "Global Markets", "Investment"],
    images: [
      "https://images.unsplash.com/photo-1621981386829-9b458a2cddde?w=1200&q=80",
    ],
    createdAt: "2026-01-10T11:30:00Z",
    updatedAt: "2026-01-17T10:20:00Z",
    authorId: "analyst-1",
    content:
      "Central banks worldwide are making strategic moves in the gold market...",
  },
];
