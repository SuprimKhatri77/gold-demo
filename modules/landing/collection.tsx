"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";
import { useScrollAnimation } from "./landing";
import { useState } from "react";

interface Product {
  id: number;
  name: string;
  description: string;
  weight: string;
  purity: string;
  image: string;
  badge?: string;
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
  },
  {
    id: 5,
    name: "Gold Wafers",
    description:
      "Precision-crafted gold wafers sealed in protective packaging with certificate of authenticity.",
    weight: "1g - 100g",
    purity: "99.99%",
    image:
      "https://images.unsplash.com/photo-1610375461369-d613b564f6df?w=800&q=80",
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
  },
];
export const Collection: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [activeFilter, setActiveFilter] = useState("All");
  const filters = ["All", "Bars", "Coins", "Jewelry", "Bullion"];

  return (
    <section
      id="collection"
      className="py-28 bg-linear-to-b from-white via-gray-50 to-white relative overflow-hidden"
    >
      <div className="absolute top-1/4 left-0 w-72 h-72 bg-amber-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-amber-300/20 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div
          ref={ref}
          className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-1 w-12 bg-linear-to-r from-transparent to-amber-400"></div>
            <span className="text-amber-600 font-bold tracking-wider uppercase text-sm flex items-center gap-2">
              <Sparkles size={16} className="animate-pulse" />
              Our Collection
            </span>
            <div className="h-1 w-12 bg-linear-to-l from-transparent to-amber-400"></div>
          </div>

          <h2 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
            Exquisite Gold
            <span className="block bg-linear-to-r from-amber-600 via-amber-500 to-amber-700 bg-clip-text text-transparent">
              Showcase Collection
            </span>
          </h2>

          <p className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed">
            Explore our meticulously curated collection of premium gold pieces,
            each certified and authenticated to the highest international
            standards.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-8 py-3 rounded-full font-bold transition-all duration-300 ${
                activeFilter === filter
                  ? "bg-linear-to-r from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/30"
                  : "bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200 hover:border-amber-300"
              } transform hover:scale-105`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              className={`group relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {product.badge && (
                <div className="absolute top-6 left-6 z-20 bg-linear-to-r from-amber-500 to-amber-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  {product.badge}
                </div>
              )}

              <div className="relative h-80 overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent z-10"></div>
                <Image
                  fill
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>

              <div className="p-8">
                <h3 className="text-2xl font-black mb-3 text-gray-900 group-hover:text-amber-600 transition-colors">
                  {product.name}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {product.description}
                </p>

                <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-100">
                  <div>
                    <div className="text-xs text-gray-500 font-semibold mb-1">
                      Weight Range
                    </div>
                    <div className="text-lg font-bold text-gray-900">
                      {product.weight}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500 font-semibold mb-1">
                      Purity
                    </div>
                    <div className="text-lg font-bold bg-linear-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent">
                      {product.purity}
                    </div>
                  </div>
                </div>

                <button className="w-full bg-linear-to-r from-amber-500 to-amber-600 text-white py-4 rounded-full hover:from-amber-600 hover:to-amber-700 transition-all duration-300 font-bold shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 flex items-center justify-center gap-2 group/btn">
                  View Details
                  <ArrowRight
                    size={18}
                    className="group-hover/btn:translate-x-1 transition-transform"
                  />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <button className="group bg-white text-gray-900 px-10 py-5 rounded-full hover:bg-gray-50 transition-all duration-300 shadow-xl hover:shadow-2xl font-bold text-lg border-2 border-gray-200 hover:border-amber-400 transform hover:scale-105 flex items-center gap-3 mx-auto">
            View Full Collection
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
