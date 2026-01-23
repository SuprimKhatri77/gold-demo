"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface Product {
  id: number;
  name: string;
  description: string;
  weight: string;
  purity: string;
  image: string;
  badge?: string;
  category: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "24K Gold Bars",
    description:
      "Pure investment-grade gold bars with certified authenticity. Perfect for serious investors and collectors.",
    weight: "1oz - 1kg",
    purity: "99.99%",
    image:
      "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=800&q=80",
    badge: "Most Popular",
    category: "Bars",
  },
  {
    id: 2,
    name: "Sovereign Gold Coins",
    description:
      "Collectible gold coins from world-renowned mints. Each piece tells a story of heritage and value.",
    weight: "1/10oz - 1oz",
    purity: "22K - 24K",
    image:
      "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=800&q=80",
    badge: "Collector's Choice",
    category: "Coins",
  },
  {
    id: 3,
    name: "Premium Gold Jewelry",
    description:
      "Exquisite handcrafted jewelry pieces that blend traditional artistry with modern elegance.",
    weight: "Custom",
    purity: "18K - 22K",
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80",
    category: "Jewelry",
  },
  {
    id: 4,
    name: "Gold Bullion",
    description:
      "High-value gold bullion for institutional and private investors seeking secure wealth storage.",
    weight: "10oz - 400oz",
    purity: "99.99%",
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
    badge: "Premium",
    category: "Bullion",
  },
  {
    id: 5,
    name: "Gold Wafers",
    description:
      "Precision-crafted gold wafers sealed in protective packaging with certificate of authenticity.",
    weight: "1g - 100g",
    purity: "99.99%",
    image:
      "https://images.unsplash.com/photo-1624365168056-daf44387e2ae?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGdvbGR8ZW58MHx8MHx8fDA%3D",
    category: "Bars",
  },
  {
    id: 6,
    name: "Commemorative Gold",
    description:
      "Limited edition commemorative gold pieces celebrating historic moments and achievements.",
    weight: "1oz",
    purity: "22K - 24K",
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80",
    badge: "Limited Edition",
    category: "Coins",
  },
];

export function Collection() {
  const [activeFilter, setActiveFilter] = useState("All");
  const filters = ["All", "Bars", "Coins", "Jewelry", "Bullion"];

  const filteredProducts =
    activeFilter === "All"
      ? products
      : products.filter((product) => product.category === activeFilter);

  return (
    <section
      id="collection"
      className="py-24 lg:py-32 bg-linear-to-b from-zinc-950 via-zinc-900 to-zinc-950 relative overflow-hidden"
    >
      {/* Subtle background elements */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-20">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-12 bg-linear-to-r from-transparent to-white/40" />
            <span className="text-white/80 font-semibold tracking-wider uppercase text-sm flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Our Collection
            </span>
            <div className="h-px w-12 bg-linear-to-l from-transparent to-white/40" />
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="block text-white">Exquisite Gold</span>
            <span className="block text-zinc-400">Showcase Collection</span>
          </h2>

          <p className="text-zinc-400 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
            Explore our meticulously curated collection of premium gold pieces,
            each certified and authenticated to the highest international
            standards.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeFilter === filter
                  ? "bg-white text-black"
                  : "bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-500 hover:bg-white/10"
            >
              {/* Badge */}
              {product.badge && (
                <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-sm text-black px-4 py-1.5 rounded-lg text-xs font-semibold">
                  {product.badge}
                </div>
              )}

              {/* Image */}
              <div className="relative h-64 sm:h-72 lg:h-80 overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent z-10" />
                <Image
                  fill
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>

              {/* Content */}
              <div className="p-6 lg:p-8">
                <h3 className="text-xl lg:text-2xl font-bold mb-3 text-white">
                  {product.name}
                </h3>
                <p className="text-zinc-400 mb-6 leading-relaxed text-sm lg:text-base">
                  {product.description}
                </p>

                {/* Specs */}
                <div className="flex items-center justify-between mb-6 pb-6 border-b border-white/10">
                  <div>
                    <div className="text-xs text-zinc-500 font-medium mb-1">
                      Weight Range
                    </div>
                    <div className="text-base lg:text-lg font-semibold text-white">
                      {product.weight}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-zinc-500 font-medium mb-1">
                      Purity
                    </div>
                    <div className="text-base lg:text-lg font-semibold text-white">
                      {product.purity}
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <button className="w-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white hover:text-black text-white py-3 rounded-lg transition-all duration-300 font-semibold flex items-center justify-center gap-2 group/btn">
                  View Details
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View Full Collection Button */}
        <div className="text-center mt-16">
          <button className="group bg-white hover:bg-zinc-100 text-black px-10 py-4 rounded-lg transition-all duration-300 font-semibold text-lg flex items-center gap-3 mx-auto">
            View Full Collection
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
