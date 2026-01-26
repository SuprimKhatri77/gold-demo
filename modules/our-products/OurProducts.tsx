"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import type { Variants } from "framer-motion";
import { useState } from "react";

import {
  Zap,
  Shield,
  Award,
  TrendingUp,
  ArrowRight,
  CheckCircle,
  ShieldCheck,
  HeartHandshake,
  Eye,
  Database,
  Sparkles,
} from "lucide-react";
import Image from "next/image";

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
  readonly gradient: string;
  readonly imageUrl: string;
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
    color: "from-amber-500 to-amber-600",
    gradient: "from-amber-500/20 via-yellow-500/20 to-amber-600/20",
    imageUrl:
      "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=1200&h=800&fit=crop&q=80",
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
    color: "from-slate-400 to-slate-600",
    gradient: "from-slate-400/20 via-slate-300/20 to-slate-500/20",
    imageUrl:
      "https://images.unsplash.com/photo-1589787168408-651ad9e83d63?w=1200&h=800&fit=crop&q=80",
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
    color: "from-gray-400 to-gray-600",
    gradient: "from-gray-500/20 via-gray-400/20 to-gray-600/20",
    imageUrl:
      "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=1200&h=800&fit=crop&q=80",
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
    color: "from-zinc-500 to-zinc-700",
    gradient: "from-zinc-600/20 via-gray-500/20 to-zinc-700/20",
    imageUrl:
      "https://images.unsplash.com/photo-1609440488192-74d30b661c3a?w=1200&h=800&fit=crop&q=80",
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

export default function OurProducts() {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const renderProductIcon = (icon: Product["icon"]) => {
    const iconProps = { size: 24, strokeWidth: 2 };
    const icons = {
      gold: <Award {...iconProps} />,
      silver: <Zap {...iconProps} />,
      platinum: <Shield {...iconProps} />,
      palladium: <TrendingUp {...iconProps} />,
    };
    return icons[icon];
  };

  const renderFeatureIcon = (icon: Feature["icon"]) => {
    const iconProps = { size: 22, strokeWidth: 2 };
    const icons = {
      certified: <ShieldCheck {...iconProps} />,
      expertise: <HeartHandshake {...iconProps} />,
      pricing: <Eye {...iconProps} />,
      reach: <CheckCircle {...iconProps} />,
      storage: <Database {...iconProps} />,
      solutions: <Award {...iconProps} />,
    };
    return icons[icon];
  };

  const handleContactClick = () => {
    // Smooth scroll to contact section or handle navigation
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="products" className="relative bg-black overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 opacity-20"
      >
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
      </motion.div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[64px_64px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-white/10 to-white/5 backdrop-blur-sm border border-white/20 mb-6"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="text-white" size={16} />
            </motion.div>
            <span className="text-white text-sm font-semibold tracking-wide">
              Premium Collection
            </span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight"
          >
            Premium Precious{" "}
            <span className="bg-linear-to-r from-white via-zinc-200 to-white bg-clip-text text-transparent">
              Metals
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-zinc-400 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto"
          >
            Investment-grade bullion bars refined to international purity
            standards. Available in multiple formats for institutional and
            strategic buyers.
          </motion.p>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid lg:grid-cols-2 gap-6 lg:gap-8 mb-16 sm:mb-20 lg:mb-24"
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              variants={cardVariants}
              onHoverStart={() => setHoveredProduct(product.id)}
              onHoverEnd={() => setHoveredProduct(null)}
              className="group relative"
            >
              <motion.div
                initial={false}
                animate={{
                  y: hoveredProduct === product.id ? -4 : 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 25,
                }}
                className="relative bg-linear-to-br from-zinc-900/90 to-black/90 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden h-full flex flex-col md:flex-row"
              >
                {/* Animated border glow */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: hoveredProduct === product.id ? 1 : 0,
                  }}
                  className="absolute inset-0 rounded-2xl border-2 border-white/30 pointer-events-none"
                />

                {/* Left side - Image */}
                <div className="relative md:w-5/12 lg:w-2/5 h-64 md:h-auto overflow-hidden">
                  <motion.div
                    className="absolute inset-0"
                    animate={{
                      scale: hoveredProduct === product.id ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                  >
                    <Image
                      fill
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>

                  {/* Gradient overlay */}
                  <div
                    className={`absolute inset-0 bg-linear-to-br ${product.color} opacity-40 mix-blend-multiply`}
                  />

                  {/* Metal type badge */}
                  <div className="absolute top-4 left-4 right-4 flex items-start justify-between z-10">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className={`w-14 h-14 rounded-xl bg-linear-to-br ${product.color} shadow-2xl flex items-center justify-center text-white border-2 border-white/30`}
                    >
                      {renderProductIcon(product.icon)}
                    </motion.div>
                  </div>

                  {/* Purity indicator - bottom left */}
                  <div className="absolute bottom-4 left-4">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20"
                    >
                      <p className="text-xs text-zinc-400 font-medium mb-0.5">
                        Purity
                      </p>
                      <p className="text-white font-bold text-lg">
                        {product.purity}
                      </p>
                    </motion.div>
                  </div>

                  {/* Shine effect on hover */}
                  <motion.div
                    initial={{ x: "-100%", opacity: 0 }}
                    animate={{
                      x: hoveredProduct === product.id ? "100%" : "-100%",
                      opacity: hoveredProduct === product.id ? 0.3 : 0,
                    }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 bg-linear-to-r from-transparent via-white to-transparent"
                  />
                </div>

                {/* Right side - Content */}
                <div className="flex-1 p-6 md:p-8 flex flex-col">
                  {/* Header */}
                  <div className="mb-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-2xl md:text-3xl font-bold text-white">
                        {product.name}
                      </h3>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="bg-white/10 backdrop-blur-sm border border-white/30 px-3 py-1 rounded-lg"
                      >
                        <p className="text-white text-xs font-bold uppercase tracking-wider">
                          {product.formats[0]}
                        </p>
                      </motion.div>
                    </div>
                    <p className="text-zinc-400 text-sm leading-relaxed line-clamp-2">
                      {product.description}
                    </p>
                  </div>

                  {/* Specifications Grid */}
                  <div className="grid grid-cols-1 gap-3 mb-6">
                    {product.specs.map((spec, specIndex) => (
                      <motion.div
                        key={specIndex}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: specIndex * 0.1,
                          duration: 0.4,
                        }}
                        whileHover={{ x: 4 }}
                        className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all group/spec"
                      >
                        <div className="shrink-0">
                          <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                            <CheckCircle className="text-white" size={16} />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-white text-sm group-hover/spec:text-zinc-200 transition-colors">
                            {spec.label}
                          </p>
                          <p className="text-zinc-500 text-xs truncate">
                            {spec.value}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Format Pills - Bottom */}
                  <div className="mt-auto pt-4 border-t border-white/10">
                    <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">
                      All Formats
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {product.formats.map((format, formatIndex) => (
                        <motion.span
                          key={formatIndex}
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-linear-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 text-zinc-300 px-3 py-1.5 rounded-lg text-xs font-medium hover:border-white/40 hover:text-white hover:shadow-lg transition-all duration-300 cursor-pointer"
                        >
                          {format}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Hover indicator - bottom right corner */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: hoveredProduct === product.id ? 1 : 0,
                    scale: hoveredProduct === product.id ? 1 : 0.8,
                  }}
                  className="absolute bottom-4 right-4"
                >
                  <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-xl">
                    <ArrowRight className="text-black" size={20} />
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Why SR Jewellers Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="mb-16 sm:mb-20 lg:mb-24"
        >
          <motion.div
            variants={itemVariants}
            className="text-center mb-10 sm:mb-12 lg:mb-16"
          >
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="inline-block mb-4"
            >
              <Award className="text-white mx-auto" size={40} />
            </motion.div>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Why{" "}
              <span className="bg-linear-to-r from-white via-zinc-200 to-white bg-clip-text text-transparent">
                SR Jewellers
              </span>
            </h3>
            <p className="text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto">
              Trust built on transparency, expertise, and unwavering commitment
              to quality
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          >
            {features.map((feature) => (
              <motion.div
                key={feature.id}
                variants={cardVariants}
                whileHover={{ y: -6, scale: 1.02 }}
                className="group/feature"
              >
                <div className="relative bg-linear-to-br from-white/[0.07] to-white/2 backdrop-blur-xl border border-white/10 hover:border-amber-500/30 rounded-xl sm:rounded-2xl p-5 sm:p-6 lg:p-7 h-full transition-all duration-300 overflow-hidden">
                  {/* Gradient overlay on hover */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-linear-to-br from-amber-500/5 to-transparent pointer-events-none"
                  />

                  <div className="relative">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      className="bg-linear-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-xl sm:rounded-2xl p-3 sm:p-4 inline-flex items-center justify-center mb-4 sm:mb-5 text-white group-hover/feature:border-white/40 transition-all duration-300 shadow-lg"
                    >
                      {renderFeatureIcon(feature.icon)}
                    </motion.div>

                    <h4 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3 group-hover/feature:text-zinc-200 transition-colors">
                      {feature.title}
                    </h4>
                    <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  {/* Decorative corner element */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute top-0 right-0 w-20 h-20 bg-linear-to-br from-white/10 to-transparent rounded-bl-full"
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="relative"
        >
          <div className="relative bg-linear-to-br from-white/[0.07] to-white/2 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl p-8 sm:p-10 lg:p-12 overflow-hidden">
            {/* Animated background */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-white/10 rounded-full blur-3xl"
            />

            <div className="relative text-center">
              <motion.h3
                variants={itemVariants}
                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6"
              >
                Ready to Secure Your Next{" "}
                <span className="bg-linear-to-r from-white via-zinc-200 to-white bg-clip-text text-transparent">
                  Bullion Trade?
                </span>
              </motion.h3>

              <motion.p
                variants={itemVariants}
                className="text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto mb-6 sm:mb-8"
              >
                Connect with SR Jewellers for wholesale precious metals
                delivered with integrity, compliance, and confidentiality.
              </motion.p>

              <motion.button
                onClick={handleContactClick}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative bg-white text-black px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold inline-flex items-center gap-3 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <span className="relative z-10 text-sm sm:text-base">
                  Contact Us Today
                </span>
                <motion.div
                  className="relative z-10"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight size={20} />
                </motion.div>

                {/* Animated linear overlay */}
                <motion.div
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 bg-linear-to-r from-transparent via-zinc-200/30 to-transparent"
                />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
