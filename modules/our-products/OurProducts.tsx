"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import type { LucideProps } from "lucide-react";

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
  Eye,
  Database,
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
    color: "from-zinc-400 to-zinc-500",
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
    color: "from-zinc-500 to-zinc-600",
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
    color: "from-zinc-600 to-zinc-700",
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
  const router = useRouter();
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
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
        ease: "easeOut",
      },
    },
  };

  type ProductIconType = "gold" | "silver" | "platinum" | "palladium";

  type FeatureIconType =
    | "certified"
    | "expertise"
    | "pricing"
    | "reach"
    | "storage"
    | "solutions";

  const renderProductIcon = (icon: ProductIconType): React.ReactNode => {
    const iconProps = { size: 28, className: "text-white" };
    const icons = {
      gold: <Award {...iconProps} />,
      silver: <Zap {...iconProps} />,
      platinum: <Shield {...iconProps} />,
      palladium: <TrendingUp {...iconProps} />,
    };
    return icons[icon];
  };

  const renderFeatureIcon = (icon: FeatureIconType): React.ReactNode => {
    const iconProps: LucideProps = {
      size: 20,
      className: "text-white group-hover:text-amber-500 transition-colors",
    };
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

  return (
    <section id="products" className="py-24 bg-black relative overflow-hidden">
      {/* Subtle background gradients */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 mb-6"
          >
            <Box className="text-amber-500" size={16} />
            <span className="text-zinc-400 text-sm font-medium">
              Our Products
            </span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
          >
            Premium Precious Metals
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-zinc-400 text-lg leading-relaxed max-w-2xl mx-auto"
          >
            Investment-grade bullion bars in gold, silver, platinum, and
            palladium, refined to international purity standards and available
            in kilo and large bar formats.
          </motion.p>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-6 mb-20"
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              variants={cardVariants}
              layout
              className="group"
              whileHover={{ y: -6 }} // small upward movement for smooth hover
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 14,
                duration: 0.3,
              }} // smooth spring
            >
              <div className="bg-white/5 backdrop-blur-md border border-white/10 hover:border-amber-500/30 rounded-2xl overflow-hidden transition-all duration-300 h-full flex flex-col">
                {/* Product Header */}
                <div
                  className={`bg-linear-to-br ${product.color} p-8 relative overflow-hidden`}
                >
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"
                  />

                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                        {renderProductIcon(product.icon)}
                      </div>
                      <span className="bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-lg text-sm font-semibold text-white">
                        {product.formats[0]}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold mb-2 text-white">
                      {product.name}
                    </h3>
                    <p className="text-white/80 text-sm">
                      Purity: {product.purity}
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-8">
                  <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                    {product.description}
                  </p>

                  {/* Specifications */}
                  <div className="space-y-3 mb-6">
                    {product.specs.map((spec, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: index * 0.1,
                          duration: 0.5,
                          ease: "easeOut",
                        }}
                        className="flex items-start gap-3"
                      >
                        <div className="shrink-0 mt-1">
                          <CheckCircle className="text-amber-500" size={16} />
                        </div>
                        <div>
                          <p className="font-semibold text-white text-sm">
                            {spec.label}
                          </p>
                          <p className="text-zinc-400 text-xs">{spec.value}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Format List */}
                  <div className="pt-6 border-t border-white/10">
                    <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">
                      Available Formats
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {product.formats.map((format, index) => (
                        <motion.span
                          key={index}
                          whileHover={{ scale: 1.06 }}
                          transition={{
                            type: "spring",
                            stiffness: 150,
                            damping: 12,
                          }}
                          className="bg-white/5 backdrop-blur-md border border-white/10 text-zinc-300 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-amber-500/20 hover:border-amber-500/30 hover:text-amber-500 transition-all duration-300"
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
          variants={containerVariants}
          className="mb-20"
        >
          <motion.h3
            variants={itemVariants}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-12"
          >
            Why SR Jewellers
          </motion.h3>

          <motion.div
            variants={containerVariants}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((feature) => (
              <motion.div
                key={feature.id}
                variants={cardVariants}
                whileHover={{ y: -4 }}
                className="group"
              >
                <div className="bg-white/5 backdrop-blur-md border border-white/10 hover:border-amber-500/30 rounded-xl p-6 h-full transition-all duration-300">
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-3 transition-all duration-300 group-hover:bg-amber-400/20 group-hover:border-amber-400/30 inline-flex items-center justify-center mb-4">
                    {renderFeatureIcon(feature.icon)}
                  </div>

                  <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-amber-500 transition-colors">
                    {feature.title}
                  </h4>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    {feature.description}
                  </p>
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
          className="text-center"
        >
          <motion.h3
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold text-white mb-6"
          >
            Ready to Secure Your Next Bullion Trade?
          </motion.h3>

          <motion.p
            variants={itemVariants}
            className="text-zinc-400 text-lg max-w-2xl mx-auto mb-8"
          >
            Get in touch with SR Jewellers for wholesale precious metals
            delivered with integrity, compliance, and confidentiality.
          </motion.p>

          <motion.button
            onClick={() => router.push("/contact")}
            type="button"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group bg-white text-black px-8 py-4 rounded-xl hover:from-amber-600 hover:to-amber-700 transition-shadow duration-300 shadow-lg shadow-amber-500/20 font-semibold inline-flex items-center gap-3"
          >
            Contact Us Today
            <motion.div
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ArrowRight size={20} />
            </motion.div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
