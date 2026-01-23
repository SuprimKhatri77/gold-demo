"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import type { FC, JSX } from "react";
import type { Variants } from "framer-motion";
import {
  Zap,
  Shield,
  Award,
  TrendingUp,
  ArrowRight,
  CheckCircle,
  Box,
  ShieldCheck,
  HeartHandshake,
  View,
  DatabaseZap,
} from "lucide-react";
import { useRouter } from "next/navigation";

// Type definitions
interface ProductSpec {
  readonly label: string;
  readonly value: string;
}

interface Product {
  readonly id: number;
  readonly name: string;
  readonly purity: string;
  readonly formats: readonly string[];
  readonly description: string;
  readonly specs: readonly ProductSpec[];
  readonly icon: "gold" | "silver" | "platinum" | "palladium";
  readonly color: string;
}

interface Feature {
  readonly id: number;
  readonly title: string;
  readonly description: string;
  readonly icon:
    | "certified"
    | "storage"
    | "pricing"
    | "expertise"
    | "reach"
    | "solutions";
}

interface AnimationVariants {
  container: Variants;
  item: Variants;
  card: Variants;
  floating: Variants;
  hover: Variants;
  spec: Variants;
}

const cardVariants = {
  rest: {
    scale: 1,
    opacity: 1,
  },
  hover: {
    scale: 1.05,
    opacity: 1,
    transition: { duration: 0.3 },
  },
};

type HoveredProductId = number | null;

const products: readonly Product[] = [
  {
    id: 1,
    name: "Gold Bar",
    purity: "999.9 & 99.50",
    formats: ["Kilo Bars", "Large Bars"],
    description:
      "Investment-grade gold bars sourced from internationally recognized refiners, meeting the highest purity standards for institutional use. Suitable for vault storage, asset hedging, and long-term value preservation.",
    specs: [
      { label: "LBMA / DGD Grade", value: "Certified" },
      { label: "Packaging", value: "Sealed and certified" },
      { label: "Use Case", value: "Vault storage, hedging, reserves" },
    ],
    icon: "gold",
    color: "from-yellow-500 to-amber-500",
  },
  {
    id: 2,
    name: "Silver Bar",
    purity: "999.0 with 999.9",
    formats: ["Kilo Bars", "Large Bars", "Grains"],
    description:
      "Silver bullion bars combining volume efficiency with industrial-grade purity, suitable for both investment portfolios and strategic commercial applications.",
    specs: [
      { label: "Grade", value: "Investment & Industrial" },
      { label: "Packaging", value: "Secured with documentation" },
      { label: "Availability", value: "Volume pricing available" },
    ],
    icon: "silver",
    color: "from-slate-300 to-slate-400",
  },
  {
    id: 3,
    name: "Platinum Bar",
    purity: "999.5",
    formats: ["Kilo Bars", "Large Bars"],
    description:
      "Refined to the highest global standards, platinum bars ideal for diversified investment strategies and specialized industrial requirements.",
    specs: [
      { label: "Grade", value: "Institutional grade" },
      { label: "Scarcity", value: "Backed value" },
      { label: "Channels", value: "Verified sourcing" },
    ],
    icon: "platinum",
    color: "from-gray-300 to-gray-400",
  },
  {
    id: 4,
    name: "Palladium Bar",
    purity: "999.5",
    formats: ["Kilo Bars"],
    description:
      "Certified kilo format palladium bars representing a niche but growing segment of metal-based wealth storage and industrial sourcing.",
    specs: [
      { label: "Certification", value: "Refinery sealed" },
      { label: "Use Case", value: "Investment & Industrial" },
      { label: "Sourcing", value: "Secured on-demand" },
    ],
    icon: "palladium",
    color: "from-zinc-400 to-gray-500",
  },
];

const features: readonly Feature[] = [
  {
    id: 1,
    title: "Certified Quality",
    description:
      "All bars meet internationally recognized purity standards with full traceability and investment-grade certification.",
    icon: "certified",
  },
  {
    id: 2,
    title: "Trusted Expertise",
    description:
      "Several years of institutional experience and deep market insight across all precious metals.",
    icon: "expertise",
  },
  {
    id: 3,
    title: "Transparent Pricing",
    description:
      "Real-time, market-aligned pricing structures ensuring fairness and confidence in every trade.",
    icon: "pricing",
  },
  {
    id: 4,
    title: "Reliable Reach",
    description:
      "Efficient delivery and logistics support through trusted partners serving regional and international clients.",
    icon: "reach",
  },
  {
    id: 5,
    title: "Storage Solutions",
    description:
      "Secured delivery and vaulting coordinated through trusted logistics partners with full insurance coverage.",
    icon: "storage",
  },
  {
    id: 6,
    title: "Institutional Grade",
    description:
      "Structured offerings tailored for banks, family offices, industrial buyers, and regulated financial entities.",
    icon: "solutions",
  },
];

const getAnimationVariants = (): AnimationVariants => ({
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  } as Variants,
  item: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  } as Variants,
  card: {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  } as Variants,
  floating: {
    initial: { y: 0 },
    animate: {
      y: [0, -12, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  } as Variants,
  hover: {
    rest: { scale: 1, y: 0 },
    hover: {
      scale: 1.04,
      y: -8,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  } as Variants,
  spec: {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
      },
    },
  } as Variants,
});

interface OurProductsProps {
  readonly className?: string;
}

export const OurProducts: FC<OurProductsProps> = ({
  className = "",
}: OurProductsProps): JSX.Element => {
  const router = useRouter();
  const [hoveredProductId, setHoveredProductId] =
    useState<HoveredProductId>(null);
  const variants = getAnimationVariants();

  const handleMouseEnter = (id: number): void => {
    setHoveredProductId(id);
  };

  const handleMouseLeave = (): void => {
    setHoveredProductId(null);
  };

  const renderProductIcon = (icon: Product["icon"]): JSX.Element => {
    const iconSize = 32;
    const iconProps = { size: iconSize, className: "text-amber-600" };

    const icons: Record<Product["icon"], JSX.Element> = {
      gold: <Award {...iconProps} />,
      silver: <Zap {...iconProps} />,
      platinum: <Shield {...iconProps} />,
      palladium: <TrendingUp {...iconProps} />,
    };

    return icons[icon];
  };

  return (
    <section
      id="products"
      className={`py-28 bg-linear-to-b from-white via-amber-50/10 to-white relative overflow-hidden ${className}`}
    >
      {/* Floating background elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-amber-100/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-yellow-100/20 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={variants.container}
          className="text-center mb-24"
        >
          <motion.div
            variants={variants.item}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Box className="text-amber-600" size={24} />
            </motion.div>
            <span className="text-amber-600 font-bold tracking-widest uppercase text-sm">
              Our Products
            </span>
          </motion.div>

          <motion.h2
            variants={variants.item}
            className="text-5xl font-black leading-tight mb-6"
          >
            Premium Precious Metals
          </motion.h2>

          <motion.p
            variants={variants.item}
            className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto"
          >
            Investment-grade bullion bars in gold, silver, platinum, and
            palladium, refined to international purity standards and available
            in kilo and large bar formats.
          </motion.p>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          variants={variants.container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-8 mb-24"
        >
          {products.map((product: Product) => (
            <motion.div
              key={product.id}
              variants={cardVariants}
              onMouseEnter={() => handleMouseEnter(product.id)}
              onMouseLeave={handleMouseLeave}
              initial="rest"
              animate={hoveredProductId === product.id ? "hover" : "rest"}
              className="group"
            >
              <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-amber-100 h-full flex flex-col">
                {/* Product Header */}
                <div
                  className={`bg-linear-to-br ${product.color} p-8 text-white relative overflow-hidden`}
                >
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"
                  />

                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div>{renderProductIcon(product.icon)}</div>
                      <span className="bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-semibold">
                        {product.formats[0]}
                      </span>
                    </div>

                    <h3 className="text-3xl font-black mb-2">{product.name}</h3>
                    <p className="text-white/90 text-sm">
                      Purity: {product.purity}
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-8">
                  <p className="text-gray-600 text-base leading-relaxed mb-6">
                    {product.description}
                  </p>

                  {/* Specifications */}
                  <div className="space-y-4">
                    {product.specs.map((spec: ProductSpec, index: number) => (
                      <motion.div
                        key={`${product.id}-spec-${index}`}
                        variants={variants.spec}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="flex items-start gap-3"
                      >
                        <div className="shrink-0 mt-1">
                          <CheckCircle className="text-amber-600" size={18} />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">
                            {spec.label}
                          </p>
                          <p className="text-gray-600 text-sm">{spec.value}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Format List */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <p className="text-sm font-semibold text-gray-900 mb-3">
                      Available Formats
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {product.formats.map((format: string, index: number) => (
                        <motion.span
                          key={`${product.id}-format-${index}`}
                          whileHover={{ scale: 1.05 }}
                          className="bg-amber-50 text-amber-700 px-4 py-2 rounded-full text-sm font-medium border border-amber-200"
                        >
                          {format}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Why SR Bullion Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={variants.container}
          className="mb-24"
        >
          <motion.h3
            variants={variants.item}
            className="text-4xl font-black text-center mb-16"
          >
            Why SR Bullion
          </motion.h3>

          <motion.div
            variants={variants.container}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature: Feature) => (
              <motion.div
                key={feature.id}
                variants={variants.card}
                className="bg-white rounded-2xl p-8 border border-amber-100 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <motion.div
                  className="mb-4 inline-block"
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="w-12 h-12 rounded-full bg-linear-to-br from-amber-100 to-yellow-100 flex items-center justify-center">
                    {feature.icon === "certified" && (
                      <ShieldCheck className="text-amber-600" size={24} />
                    )}
                    {feature.icon === "expertise" && (
                      <HeartHandshake className="text-amber-600" size={24} />
                    )}
                    {feature.icon === "pricing" && (
                      <View className="text-amber-600" size={24} />
                    )}
                    {feature.icon === "reach" && (
                      <CheckCircle className="text-amber-600" size={24} />
                    )}
                    {feature.icon === "storage" && (
                      <DatabaseZap className="text-amber-600" size={24} />
                    )}
                    {feature.icon === "solutions" && (
                      <Award className="text-amber-600" size={24} />
                    )}
                  </div>
                </motion.div>

                <h4 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={variants.container}
          className="text-center py-16"
        >
          <motion.h3
            variants={variants.item}
            className="text-3xl font-black mb-6"
          >
            Ready to Secure Your Next Bullion Trade?
          </motion.h3>

          <motion.p
            variants={variants.item}
            className="text-gray-600 text-lg max-w-2xl mx-auto mb-8"
          >
            Get in touch with SR Bullion FZCO for wholesale precious metals
            delivered with integrity, compliance, and confidentiality.
          </motion.p>

          <motion.button
            type="button"
            onClick={() => router.push("/contact")}
            variants={variants.item}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group bg-linear-to-r from-amber-500 to-amber-600 text-white px-8 py-4 rounded-full hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-xl shadow-amber-500/30 hover:shadow-amber-500/50 font-bold flex items-center gap-3 mx-auto"
          >
            Contact Us Today
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ArrowRight size={20} />
            </motion.div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};
