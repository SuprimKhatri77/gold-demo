"use client";

import {
  ArrowRight,
  Sparkles,
  TrendingUp,
  Package,
  Zap,
  ShieldCheck,
  Globe,
  Scale,
  Award,
  // FileText,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useMemo } from "react";

interface Metal {
  id: number;
  name: string;
  symbol: string;
  description: string;
  minOrder: string;
  purity: string;
  image: string;
  badge?: string;
  category: "gold" | "silver" | "platinum" | "palladium";
  forms: string[];
  pricing: string;
  color: string;
  glowColor: string;
}

const metals: Metal[] = [
  {
    id: 1,
    name: "Gold Bullion Bars",
    symbol: "AU",
    description:
      "LBMA certified gold bars available in various weights for institutional investors.",
    minOrder: "1kg+",
    purity: "99.99%",
    image:
      "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=800&q=80",
    badge: "Most Traded",
    category: "gold",
    forms: ["Bars", "Cast Bars", "Minted Bars"],
    pricing: "Spot + 2.5%",
    color: "from-amber-500 to-yellow-500",
    glowColor: "rgba(251, 191, 36, 0.3)",
  },
  {
    id: 2,
    name: "Gold Grain & Shot",
    symbol: "AU",
    description:
      "High-purity gold grain and shot for industrial applications and manufacturing.",
    minOrder: "100g+",
    purity: "99.99%",
    image:
      "https://images.unsplash.com/photo-1624365168056-daf44387e2ae?w=800&q=80",
    category: "gold",
    forms: ["Grain", "Shot", "Powder"],
    pricing: "Spot + 3.0%",
    color: "from-amber-500 to-yellow-500",
    glowColor: "rgba(251, 191, 36, 0.3)",
  },
  {
    id: 3,
    name: "Investment Gold Bars",
    symbol: "AU",
    description:
      "Swiss and international mints gold bars with complete certification.",
    minOrder: "100g+",
    purity: "99.99%",
    image:
      "https://images.unsplash.com/photo-1762463176350-baed663b310c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    badge: "Premium Quality",
    category: "gold",
    forms: ["PAMP", "Heraeus", "Valcambi"],
    pricing: "Spot + 2.8%",
    color: "from-amber-500 to-yellow-500",
    glowColor: "rgba(251, 191, 36, 0.3)",
  },
  {
    id: 4,
    name: "Silver Bullion Bars",
    symbol: "AG",
    description:
      "Pure silver bars from 1kg to 1000oz for industrial and investment purposes.",
    minOrder: "5kg+",
    purity: "99.9%",
    image:
      "https://images.unsplash.com/photo-1641324114778-3234111fe705?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    badge: "High Volume",
    category: "silver",
    forms: ["Bars", "Cast", "Minted"],
    pricing: "Spot + 4.0%",
    color: "from-slate-300 to-zinc-400",
    glowColor: "rgba(148, 163, 184, 0.3)",
  },
  // {
  //   id: 5,
  //   name: "Silver Grain",
  //   symbol: "AG",
  //   description:
  //     "Fine silver grain for manufacturing, electronics, and photovoltaic applications.",
  //   minOrder: "1kg+",
  //   purity: "99.9%",
  //   image:
  //     "https://images.unsplash.com/photo-1621859678777-dbff066f723e?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   category: "silver",
  //   forms: ["Grain", "Shot", "Wire"],
  //   pricing: "Spot + 5.0%",
  //   color: "from-slate-300 to-zinc-400",
  //   glowColor: "rgba(148, 163, 184, 0.3)",
  // },
  // {
  //   id: 6,
  //   name: "Platinum Sponge",
  //   symbol: "PT",
  //   description:
  //     "High-purity platinum sponge for catalytic and industrial applications.",
  //   minOrder: "100g+",
  //   purity: "99.95%",
  //   image:
  //     "https://images.unsplash.com/photo-1616536368667-99f53a750fb8?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   badge: "Industrial Grade",
  //   category: "platinum",
  //   forms: ["Sponge", "Powder", "Mesh"],
  //   pricing: "Spot + 6.0%",
  //   color: "from-cyan-400 to-blue-500",
  //   glowColor: "rgba(34, 211, 238, 0.3)",
  // },
  {
    id: 7,
    name: "Platinum Bars",
    symbol: "PT",
    description:
      "Investment-grade platinum bars with full traceability and certification.",
    minOrder: "50g+",
    purity: "99.95%",
    image:
      "https://images.unsplash.com/photo-1616536368667-99f53a750fb8?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "platinum",
    forms: ["Bars", "Ingots"],
    pricing: "Spot + 5.5%",
    color: "from-cyan-400 to-blue-500",
    glowColor: "rgba(34, 211, 238, 0.3)",
  },
  // {
  //   id: 8,
  //   name: "Palladium Sponge",
  //   symbol: "PD",
  //   description:
  //     "Premium palladium sponge for automotive catalysts and electronics.",
  //   minOrder: "50g+",
  //   purity: "99.95%",
  //   image:
  //     "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
  //   badge: "High Demand",
  //   category: "palladium",
  //   forms: ["Sponge", "Powder"],
  //   pricing: "Spot + 7.0%",
  //   color: "from-purple-400 to-indigo-500",
  //   glowColor: "rgba(168, 85, 247, 0.3)",
  // },
  {
    id: 9,
    name: "Palladium Bars",
    symbol: "PD",
    description:
      "Certified palladium bars for strategic reserves and industrial use.",
    minOrder: "50g+",
    purity: "99.95%",
    image: "/palladium-bars.jpg",
    category: "palladium",
    forms: ["Bars", "Ingots"],
    pricing: "Spot + 6.5%",
    color: "from-purple-400 to-indigo-500",
    glowColor: "rgba(168, 85, 247, 0.3)",
  },
];

const categories = [
  { id: "all", name: "All Metals", icon: Globe, color: "blue" },
  { id: "gold", name: "Gold", icon: Sparkles, color: "amber" },
  { id: "silver", name: "Silver", icon: Award, color: "slate" },
  { id: "platinum", name: "Platinum", icon: Zap, color: "cyan" },
  { id: "palladium", name: "Palladium", icon: Package, color: "purple" },
];

// Pre-generate particle positions
const PARTICLES = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  left: (i * 5.263) % 100,
  top: (i * 7.894) % 100,
  delay: (i * 0.25) % 5,
  duration: 10 + ((i * 0.5) % 10),
}));

export function Collection() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredMetals = useMemo(() => {
    if (activeCategory === "all") return metals;
    return metals.filter((metal) => metal.category === activeCategory);
  }, [activeCategory]);

  return (
    <section
      id="collection"
      className="py-24 lg:py-32 bg-linear-to-b from-slate-950 via-blue-950 to-slate-950 relative overflow-hidden"
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

      {/* Animated floating orbs */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
      <div
        className="absolute bottom-1/3 -right-48 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-amber-500/5 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "2s" }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {PARTICLES.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-blue-400/20 rounded-full animate-float"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-12 bg-linear-to-r from-transparent to-blue-400/40" />
            <span className="text-zinc-400 font-semibold tracking-wider uppercase text-sm flex items-center gap-2">
              <Package className="w-4 h-4 text-cyan-400" />
              Product Catalog
            </span>
            <div className="h-px w-12 bg-linear-to-l from-transparent to-blue-400/40" />
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="block text-white">Premium Precious</span>
            <span className="block bg-linear-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Metals Portfolio
            </span>
          </h2>

          <p className="text-zinc-400 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
            Wholesale precious metals in various forms and purities for
            industrial, investment, and manufacturing applications
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = activeCategory === category.id;

            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`group relative px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                  isActive
                    ? `bg-linear-to-r from-${category.color}-600 to-${category.color === "amber" ? "yellow" : category.color}-600 text-white shadow-lg shadow-${category.color}-500/30`
                    : "bg-white/5 backdrop-blur-xl border border-white/10 text-zinc-300 hover:border-blue-400/40 hover:bg-white/10"
                }`}
              >
                {isActive && (
                  <div
                    className={`absolute inset-0 rounded-xl bg-linear-to-r from-${category.color}-600 to-${category.color === "amber" ? "yellow" : category.color}-600 blur-lg opacity-50`}
                  />
                )}
                <Icon
                  className={`w-5 h-5 relative z-10 ${isActive ? "" : "group-hover:rotate-12"} transition-transform duration-300`}
                />
                <span className="relative z-10">{category.name}</span>
                {isActive && (
                  <span className="relative z-10 text-xs bg-white/20 px-2 py-0.5 rounded-full">
                    {filteredMetals.length}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Metals Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredMetals.map((metal, index) => (
            <div
              key={metal.id}
              className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:border-blue-400/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20"
              style={{
                animationDelay: `${index * 50}ms`,
              }}
            >
              {/* Badge */}
              {metal.badge && (
                <div className="absolute top-4 right-4 z-20 bg-linear-to-r from-blue-600 to-cyan-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg">
                  {metal.badge}
                </div>
              )}

              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/50 to-transparent z-10" />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"
                  style={{
                    background: metal.glowColor,
                  }}
                />
                <Image
                  fill
                  src={metal.image}
                  alt={metal.name}
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {/* Metal Symbol Badge */}
                <div className="absolute top-4 left-4 z-20 w-14 h-14 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl flex items-center justify-center">
                  <span className="text-lg font-bold text-white">
                    {metal.symbol}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-white group-hover:text-cyan-400 transition-colors duration-300">
                  {metal.name}
                </h3>
                <p className="text-zinc-400 mb-4 leading-relaxed text-sm">
                  {metal.description}
                </p>

                {/* Specs Grid */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                    <div className="text-xs text-zinc-500 font-medium mb-1 flex items-center gap-1">
                      <Scale className="w-3 h-3" />
                      Min Order
                    </div>
                    <div className="text-sm font-bold text-white">
                      {metal.minOrder}
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                    <div className="text-xs text-zinc-500 font-medium mb-1 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      Purity
                    </div>
                    <div
                      className={`text-sm font-bold bg-linear-to-r ${metal.color} bg-clip-text text-transparent`}
                    >
                      {metal.purity}
                    </div>
                  </div>
                </div>

                {/* Forms Available */}
                <div className="mb-4">
                  <div className="text-xs text-zinc-500 font-medium mb-2">
                    Available Forms
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {metal.forms.map((form) => (
                      <span
                        key={form}
                        className="text-xs bg-white/5 text-zinc-300 px-2.5 py-1 rounded-lg border border-white/10"
                      >
                        {form}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Pricing */}
                {/* <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div>
                    <div className="text-xs text-zinc-500 mb-1">Pricing</div>
                    <div className="text-sm font-bold text-cyan-400">
                      {metal.pricing}
                    </div>
                  </div>
                  <button className="group/btn bg-linear-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 flex items-center gap-2 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40">
                    <FileText className="w-4 h-4" />
                    Quote
                  </button>
                </div> */}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold text-white mb-4">
                Need Custom Quantities or Forms?
              </h3>
              <p className="text-zinc-400 text-lg leading-relaxed mb-6">
                We offer customized solutions for bulk orders, special alloys,
                and specific purity requirements. Our team works with refineries
                worldwide to meet your exact specifications.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm text-zinc-400">
                  <ShieldCheck className="w-5 h-5 text-green-400" />
                  <span>LBMA Certified</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-zinc-400">
                  <Globe className="w-5 h-5 text-blue-400" />
                  <span>Global Delivery</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-zinc-400">
                  <TrendingUp className="w-5 h-5 text-cyan-400" />
                  <span>Competitive Pricing</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 lg:justify-end">
              <button
                onClick={() => router.push("/contact")}
                className="group bg-linear-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white px-8 py-4  transition-all duration-300 font-semibold text-lg flex items-center justify-center gap-3 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-1"
              >
                Request Custom Quote
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </button>
              <button
                onClick={() => router.push("/our-products")}
                className="group bg-white/5 backdrop-blur-xl border border-white/10 hover:border-blue-400/40 hover:bg-white/10 text-white px-8 py-4  transition-all duration-300 font-semibold text-lg flex items-center justify-center gap-3"
              >
                View All Products
                <Package className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          50% {
            opacity: 0.3;
          }
          100% {
            transform: translateY(-100vh) translateX(50px);
            opacity: 0;
          }
        }
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </section>
  );
}
