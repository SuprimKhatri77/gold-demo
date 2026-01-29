"use client";

import {
  ArrowRight,
  Sparkles,
  GripVertical,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, DragEvent, useRef, useEffect, useMemo } from "react";

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

const initialProducts: Product[] = [
  {
    id: 1,
    name: "24K Gold Bars",
    description: "Pure investment-grade gold bars with certified authenticity.",
    weight: "1oz - 1kg",
    purity: "99.99%",
    image:
      "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=800&q=80",
    badge: "Most Popular",
    category: "uncategorized",
  },
  {
    id: 2,
    name: "Gold Wafers",
    description:
      "Precision-crafted gold wafers sealed in protective packaging.",
    weight: "1g - 100g",
    purity: "99.99%",
    image:
      "https://images.unsplash.com/photo-1624365168056-daf44387e2ae?w=800&q=80",
    category: "uncategorized",
  },
  {
    id: 3,
    name: "Sovereign Gold Coins",
    description: "Collectible gold coins from world-renowned mints.",
    weight: "1/10oz - 1oz",
    purity: "22K - 24K",
    image:
      "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=800&q=80",
    badge: "Collector's Choice",
    category: "uncategorized",
  },
  {
    id: 4,
    name: "American Eagle Gold",
    description: "Official US Mint gold coins with iconic eagle design.",
    weight: "1oz",
    purity: "22K",
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80",
    category: "uncategorized",
  },
  {
    id: 5,
    name: "Commemorative Gold",
    description:
      "Limited edition commemorative gold pieces celebrating historic moments.",
    weight: "1oz",
    purity: "24K",
    image:
      "https://images.unsplash.com/photo-1611944212129-29977ae1398c?w=800&q=80",
    badge: "Limited Edition",
    category: "uncategorized",
  },
  {
    id: 6,
    name: "Premium Gold Jewelry",
    description:
      "Exquisite handcrafted jewelry pieces blending traditional artistry.",
    weight: "Custom",
    purity: "18K - 22K",
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80",
    category: "uncategorized",
  },
  {
    id: 7,
    name: "Artisan Gold Necklaces",
    description: "Statement necklaces crafted by master goldsmiths.",
    weight: "Custom",
    purity: "22K",
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80",
    badge: "Premium",
    category: "uncategorized",
  },
  {
    id: 8,
    name: "Gold Bullion",
    description:
      "High-value gold bullion for institutional and private investors.",
    weight: "10oz - 400oz",
    purity: "99.99%",
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
    badge: "Premium",
    category: "uncategorized",
  },
  {
    id: 9,
    name: "Investment Bullion",
    description: "LBMA certified gold bullion bars for serious investors.",
    weight: "1kg - 12.5kg",
    purity: "99.99%",
    image:
      "https://images.unsplash.com/photo-1610375461369-d8a4632dfe1d?w=800&q=80",
    category: "uncategorized",
  },
  {
    id: 10,
    name: "Swiss Gold Bars",
    description: "Precision Swiss-made gold bars with certified purity.",
    weight: "50g - 500g",
    purity: "99.99%",
    image:
      "https://images.unsplash.com/photo-1610375461318-5eae42d5c6c8?w=800&q=80",
    category: "uncategorized",
  },
];

const categories = [
  { name: "Bars", color: "amber", icon: "▬" },
  { name: "Coins", color: "cyan", icon: "◉" },
  { name: "Jewelry", color: "blue", icon: "◈" },
  { name: "Bullion", color: "purple", icon: "■" },
];

// Pre-generate particle positions
const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  left: (i * 5.263) % 100, // Distribute evenly
  top: (i * 7.894) % 100,
  delay: (i * 0.25) % 5,
  duration: 10 + ((i * 0.5) % 10),
}));

export function Collection() {
  const router = useRouter();
  const [products, setProducts] = useState(initialProducts);
  const [draggedItem, setDraggedItem] = useState<Product | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const uncategorizedProducts = useMemo(
    () => products.filter((p) => p.category === "uncategorized"),
    [products],
  );

  // Auto-scroll animation
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    let lastTime = Date.now();
    const scrollSpeed = 0.3; // pixels per frame

    const animate = () => {
      const currentTime = Date.now();
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;

      if (!isDragging) {
        scrollContainer.scrollLeft += scrollSpeed * (deltaTime / 16);

        // Reset scroll when reaching end
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
          scrollContainer.scrollLeft = 0;
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, [isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0));
    setScrollLeft(scrollRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (scrollRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleDragStart = (e: DragEvent<HTMLDivElement>, product: Product) => {
    setDraggedItem(product);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>, targetCategory: string) => {
    e.preventDefault();
    if (!draggedItem) return;

    setProducts((prev) =>
      prev.map((product) =>
        product.id === draggedItem.id
          ? { ...product, category: targetCategory }
          : product,
      ),
    );
    setDraggedItem(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  return (
    <section
      id="collection"
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

      {/* Animated floating orbs */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
      <div
        className="absolute bottom-1/3 -right-48 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "2s" }}
      />

      {/* Floating particles with pre-generated positions */}
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
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-blue-400/40" />
            <span className="text-zinc-400 font-semibold tracking-wider uppercase text-sm flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
              Our Collection
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-blue-400/40" />
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="block text-white">Exquisite Gold</span>
            <span className="block bg-gradient-to-r from-amber-500 to-yellow-500 bg-clip-text text-transparent">
              Showcase Collection
            </span>
          </h2>

          <p className="text-zinc-400 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
            Drag items from the carousel below into categories to organize your
            collection
          </p>
        </div>

        {/* Infinite Scroll Carousel */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4 px-2">
            <h3 className="text-xl font-semibold text-white flex items-center gap-2">
              <GripVertical className="w-5 h-5 text-blue-400" />
              Available Items
              <span className="text-sm text-zinc-500 font-normal">
                ({uncategorizedProducts.length} items)
              </span>
            </h3>
            <p className="text-sm text-zinc-500">
              Drag to scroll or auto-scrolls
            </p>
          </div>

          <div
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            className="relative overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <div className="flex gap-4 pb-4" style={{ width: "fit-content" }}>
              {/* Duplicate items for infinite scroll effect */}
              {[...uncategorizedProducts, ...uncategorizedProducts].map(
                (product, idx) => (
                  <div
                    key={`${product.id}-${idx}`}
                    draggable
                    onDragStart={(e) => handleDragStart(e, product)}
                    onDragEnd={handleDragEnd}
                    className={`flex-shrink-0 w-80 group bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden hover:border-blue-400/40 hover:-translate-y-1 transition-all duration-300 cursor-move ${
                      draggedItem?.id === product.id
                        ? "opacity-50 scale-95"
                        : ""
                    }`}
                  >
                    {/* Drag Handle */}
                    <div className="absolute top-3 left-3 z-20 text-zinc-400 group-hover:text-white transition-colors">
                      <GripVertical className="w-5 h-5" />
                    </div>

                    {/* Badge */}
                    {product.badge && (
                      <div className="absolute top-3 right-3 z-20 bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-3 py-1 rounded-lg text-xs font-semibold shadow-lg">
                        {product.badge}
                      </div>
                    )}

                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent z-10" />
                      <Image
                        fill
                        src={product.image}
                        alt={product.name}
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h4 className="text-lg font-bold mb-2 text-white">
                        {product.name}
                      </h4>
                      <p className="text-zinc-400 mb-4 leading-relaxed text-sm line-clamp-2">
                        {product.description}
                      </p>

                      {/* Specs */}
                      <div className="grid grid-cols-2 gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
                        <div>
                          <div className="text-xs text-zinc-500 font-medium mb-1">
                            Weight
                          </div>
                          <div className="text-sm font-semibold text-white">
                            {product.weight}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-zinc-500 font-medium mb-1">
                            Purity
                          </div>
                          <div className="text-sm font-semibold text-amber-500">
                            {product.purity}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>

        {/* Category Drop Zones */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-12">
          {categories.map((category) => {
            const categoryProducts = products.filter(
              (p) => p.category === category.name,
            );

            return (
              <div
                key={category.name}
                className="flex flex-col"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, category.name)}
              >
                {/* Column Header */}
                <div className="mb-4">
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 hover:border-blue-400/40 transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{category.icon}</span>
                        <div>
                          <h3 className="text-lg font-semibold text-white">
                            {category.name}
                          </h3>
                          <p className="text-xs text-zinc-500">
                            Drop items here
                          </p>
                        </div>
                      </div>
                      <span className="text-sm text-zinc-400 bg-white/5 px-2.5 py-1 rounded-lg border border-white/10">
                        {categoryProducts.length}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Drop Zone */}
                <div className="flex-1 space-y-3 bg-white/[0.02] backdrop-blur-sm border-2 border-dashed border-white/10 rounded-xl p-4 min-h-[300px] transition-all duration-300 hover:border-blue-400/40">
                  {categoryProducts.length === 0 ? (
                    <div className="flex items-center justify-center h-full text-zinc-500 text-sm">
                      Drag items here
                    </div>
                  ) : (
                    categoryProducts.map((product) => (
                      <div
                        key={product.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, product)}
                        onDragEnd={handleDragEnd}
                        className={`group bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-4 hover:border-blue-400/40 transition-all duration-300 cursor-move ${
                          draggedItem?.id === product.id
                            ? "opacity-50 scale-95"
                            : ""
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <GripVertical className="w-4 h-4 text-zinc-500 group-hover:text-white flex-shrink-0 mt-1" />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-semibold text-white mb-1 truncate">
                              {product.name}
                            </h4>
                            <div className="flex items-center gap-2 text-xs text-zinc-500">
                              <span>{product.weight}</span>
                              <span>•</span>
                              <span className="text-amber-500">
                                {product.purity}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* View Full Collection Button */}
        <div className="text-center">
          <button
            onClick={() => router.push("/our-products")}
            className="group bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white px-10 py-4 rounded-xl transition-all duration-300 font-semibold text-lg flex items-center gap-3 mx-auto shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-1"
          >
            View Full Collection
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </button>
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
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
