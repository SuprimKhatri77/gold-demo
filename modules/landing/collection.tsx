"use client";

import { useState, useMemo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { instrumentSerif } from "@/utils/font";

// ─── Types ────────────────────────────────────────────────────────────────────

type MetalCategory = "gold" | "silver" | "platinum" | "palladium";

interface Metal {
  id: number;
  name: string;
  symbol: string;
  description: string;
  minOrder: string;
  purity: string;
  image: string;
  badge?: string;
  category: MetalCategory;
  forms: string[];
}

interface Category {
  id: "all" | MetalCategory;
  label: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const METALS: Metal[] = [
  {
    id: 1,
    name: "Gold Bullion Bars",
    symbol: "AU",
    description:
      "LBMA certified gold bars in various weights for institutional investors and refineries.",
    minOrder: "1 kg",
    purity: "99.99%",
    image:
      "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=800&q=80",
    badge: "Most Traded",
    category: "gold",
    forms: ["Bars", "Cast Bars", "Minted Bars"],
  },
  {
    id: 2,
    name: "Gold Grain & Shot",
    symbol: "AU",
    description:
      "High-purity gold grain and shot for industrial applications and manufacturing.",
    minOrder: "100 g",
    purity: "99.99%",
    image:
      "https://images.unsplash.com/photo-1624365168056-daf44387e2ae?w=800&q=80",
    category: "gold",
    forms: ["Grain", "Shot", "Powder"],
  },
  {
    id: 3,
    name: "Investment Gold Bars",
    symbol: "AU",
    description:
      "Swiss and international mint gold bars with full certification and traceability.",
    minOrder: "100 g",
    purity: "99.99%",
    image:
      "https://images.unsplash.com/photo-1762463176350-baed663b310c?q=80&w=1470&auto=format&fit=crop",
    badge: "Premium",
    category: "gold",
    forms: ["PAMP", "Heraeus", "Valcambi"],
  },
  {
    id: 4,
    name: "Silver Bullion Bars",
    symbol: "AG",
    description:
      "Pure silver bars from 1 kg to 1000 oz for industrial and investment purposes.",
    minOrder: "5 kg",
    purity: "99.9%",
    image:
      "https://images.unsplash.com/photo-1641324114778-3234111fe705?q=80&w=1470&auto=format&fit=crop",
    badge: "High Volume",
    category: "silver",
    forms: ["Bars", "Cast", "Minted"],
  },
  {
    id: 7,
    name: "Platinum Bars",
    symbol: "PT",
    description:
      "Investment-grade platinum bars with full traceability and certification.",
    minOrder: "50 g",
    purity: "99.95%",
    image:
      "https://images.unsplash.com/photo-1616536368667-99f53a750fb8?q=80&w=1470&auto=format&fit=crop",
    category: "platinum",
    forms: ["Bars", "Ingots"],
  },
  {
    id: 9,
    name: "Palladium Bars",
    symbol: "PD",
    description:
      "Certified palladium bars for strategic reserves and industrial use.",
    minOrder: "50 g",
    purity: "99.95%",
    image: "/palladium-bars.jpg",
    category: "palladium",
    forms: ["Bars", "Ingots"],
  },
];

const CATEGORIES: Category[] = [
  { id: "all", label: "All" },
  { id: "gold", label: "Gold" },
  { id: "silver", label: "Silver" },
  { id: "platinum", label: "Platinum" },
  { id: "palladium", label: "Palladium" },
];

// ─── Component ────────────────────────────────────────────────────────────────

export const Collection = (): React.JSX.Element => {
  const [activeCategory, setActiveCategory] = useState<"all" | MetalCategory>(
    "all",
  );

  const filtered = useMemo<Metal[]>(() => {
    if (activeCategory === "all") return METALS;
    return METALS.filter((m) => m.category === activeCategory);
  }, [activeCategory]);

  const handleCategory = useCallback((id: "all" | MetalCategory): void => {
    setActiveCategory(id);
  }, []);

  return (
    <section className="bg-[#0A0A0B] border-t border-white/[0.04]">
      {/* ── Section header ───────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-24 pb-14 lg:pt-32 lg:pb-16">
        <div className="flex items-center gap-4 mb-8">
          <span className="block h-px w-8 bg-[#B8973A]/40" aria-hidden="true" />
          <span className="text-[11px] font-mono tracking-[0.22em] uppercase text-neutral-600">
            Product Catalog
          </span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <h2
            className={`${instrumentSerif.className} text-[clamp(36px,5vw,64px)] font-semibold leading-[1.05] tracking-[-0.02em] text-neutral-100`}
          >
            Precious metals,
            <br />
            <span className="italic text-[#B8973A]">every form.</span>
          </h2>
          <p className="max-w-sm text-[14px] leading-relaxed text-neutral-500 lg:text-right">
            Wholesale supply for refiners, manufacturers, and institutional
            buyers. All products are LBMA aligned with full traceability.
          </p>
        </div>
      </div>

      {/* ── Filter tabs ──────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 mb-12">
        <div className="flex items-center gap-2 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => handleCategory(cat.id)}
              aria-pressed={activeCategory === cat.id}
              className={`
                px-5 py-2 text-[12px] font-mono tracking-[0.1em] uppercase
                transition-colors duration-150
                ${
                  activeCategory === cat.id
                    ? "bg-[#B8973A] text-[#0A0A0B]"
                    : "border border-white/[0.07] text-neutral-600 hover:text-neutral-300 hover:border-white/[0.14]"
                }
              `}
            >
              {cat.label}
            </button>
          ))}
          <span className="ml-auto text-[11px] font-mono tracking-widest text-neutral-700 uppercase">
            {filtered.length} product{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* ── Grid ─────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.04]">
          {filtered.map((metal) => (
            <article
              key={metal.id}
              className="group relative bg-[#0A0A0B] flex flex-col"
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden bg-neutral-900">
                <Image
                  src={metal.image}
                  alt={metal.name}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-[#0A0A0B]/40 group-hover:bg-[#0A0A0B]/10 transition-colors duration-500" />

                {/* Symbol */}
                <div className="absolute bottom-4 left-4 font-mono text-[11px] tracking-[0.2em] text-white/50 uppercase">
                  {metal.symbol}
                </div>

                {/* Badge */}
                {metal.badge && (
                  <div className="absolute top-4 right-4 px-2.5 py-1 bg-[#B8973A] text-[#0A0A0B] text-[10px] font-mono tracking-[0.12em] uppercase">
                    {metal.badge}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-6 gap-4">
                <div>
                  <h3 className="text-[15px] font-semibold text-neutral-100 mb-2 leading-snug">
                    {metal.name}
                  </h3>
                  <p className="text-[13px] text-neutral-600 leading-relaxed">
                    {metal.description}
                  </p>
                </div>

                {/* Specs */}
                <div className="grid grid-cols-3 gap-4 pt-2 border-t border-white/[0.05]">
                  <div className="flex flex-col gap-1">
                    <p className="text-[10px] font-mono tracking-[0.14em] uppercase text-neutral-700">
                      Min. Order
                    </p>
                    <p className="text-[13px] font-medium text-neutral-300">
                      {metal.minOrder}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-[10px] font-mono tracking-[0.14em] uppercase text-neutral-700">
                      Purity
                    </p>
                    <p className="text-[13px] font-medium text-[#B8973A]">
                      {metal.purity}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-[10px] font-mono tracking-[0.14em] uppercase text-neutral-700">
                      Forms
                    </p>
                    <div className="flex gap-1 flex-wrap">
                      {metal.forms.map((form) => (
                        <span
                          key={form}
                          className="text-[10px] font-mono text-neutral-700 border border-white/[0.06] px-1.5 py-0.5"
                        >
                          {form}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* ── Bottom CTA ───────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
        <div className="border-t border-white/[0.05] pt-16 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div className="max-w-lg">
            <h3
              className={`${instrumentSerif.className} text-[clamp(28px,3.5vw,48px)] font-semibold leading-[1.1] tracking-[-0.02em] text-neutral-100 mb-4`}
            >
              Need custom quantities
              <br />
              <span className="italic text-[#B8973A]">or specifications?</span>
            </h3>
            <p className="text-[14px] text-neutral-500 leading-relaxed">
              We work with refineries worldwide to meet exact purity, form, and
              volume requirements. Global delivery. Verified buyers only.
            </p>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-[#B8973A] text-[#0A0A0B] text-[12px] font-bold tracking-[0.08em] uppercase hover:bg-[#CBA94A] transition-colors duration-200"
            >
              Request a Quote
              <ArrowRight size={13} strokeWidth={2.5} aria-hidden="true" />
            </Link>
            <Link
              href="/our-products"
              className="inline-flex items-center gap-2 px-8 py-3.5 border border-white/[0.1] text-[12px] font-medium tracking-[0.06em] uppercase text-neutral-500 hover:border-white/[0.2] hover:text-neutral-200 transition-all duration-200"
            >
              Full Catalog
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
