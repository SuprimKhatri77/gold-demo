"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import type { FC, JSX } from "react";
import type { Variants } from "framer-motion";
import {
  TrendingUp,
  Briefcase,
  Zap,
  Shield,
  Package,
  ArrowRight,
  Settings,
} from "lucide-react";
import { useRouter } from "next/navigation";

// Type definitions
interface Service {
  readonly id: number;
  readonly title: string;
  readonly description: string;
  readonly details: readonly string[];
  readonly icon: "trading" | "supply" | "procurement" | "logistics";
  readonly accent: string;
}

interface Benefit {
  readonly id: number;
  readonly title: string;
  readonly description: string;
}

interface AnimationVariants {
  container: Variants;
  item: Variants;
  card: Variants;
  floating: Variants;
  hover: Variants;
  badge: Variants;
  grid: Variants;
}

const cardVariants: Variants = {
  rest: {
    scale: 1,
    y: 0,
  },
  hover: {
    scale: 1.02,
    y: -5,
  },
};

type HoveredServiceId = number | null;

const services: readonly Service[] = [
  {
    id: 1,
    title: "Wholesale Precious Metals Trading",
    description:
      "We specialize in the wholesale trading of gold, silver, platinum, and palladium in standardized kilo and large bar formats.",
    details: [
      "DMCC regulated operations",
      "Transparent, market aligned pricing",
      "High-volume trading capacity",
    ],
    icon: "trading",
    accent: "from-blue-500 to-cyan-600",
  },
  {
    id: 2,
    title: "Bulk Supply of Kilo & Large Bars",
    description:
      "Investment-grade bullion bars across all four metals, refined to international purity standards.",
    details: [
      "Certified bullion: 999.9 (gold), 999.0 (silver), 999.5 (platinum/palladium)",
      "Secured procurement and scalable volume handling",
      "Suited for vaulting, hedging, and reserve strategies",
    ],
    icon: "supply",
    accent: "from-blue-500 to-cyan-600",
  },
  {
    id: 3,
    title: "Strategic Procurement & Sourcing",
    description:
      "Tailored sourcing strategies for institutions seeking long-term or diversified access to precious metals.",
    details: [
      "Institutional sourcing and allocation strategies",
      "Strong supplier network and demand planning",
      "Real-time market responsiveness",
    ],
    icon: "procurement",
    accent: "from-blue-500 to-cyan-600",
  },
  {
    id: 4,
    title: "Secured Storage & Delivery Facilitation",
    description:
      "Secured storage, handling, and delivery of bullion through trusted logistics and vaulting partners.",
    details: [
      "Discreet and insured transport",
      "Vaulting and storage coordination",
      "Documentation and transfer support",
    ],
    icon: "logistics",
    accent: "from-blue-500 to-cyan-600",
  },
];

const benefits: readonly Benefit[] = [
  {
    id: 1,
    title: "Trusted Expertise",
    description:
      "Several years of institutional experience and deep market insight across gold, silver, platinum, and palladium.",
  },
  {
    id: 2,
    title: "Reliable Reach",
    description:
      "Efficient delivery and logistics support through trusted partners, serving regional and international institutional clients.",
  },
  {
    id: 3,
    title: "Certified Quality",
    description:
      "All bars meet internationally recognized purity standards investment-grade bullion with full traceability.",
  },
  {
    id: 4,
    title: "Transparent Pricing",
    description:
      "Real time, market aligned pricing structures that ensure fairness and confidence in every trade.",
  },
  {
    id: 5,
    title: "Institutional Grade Solutions",
    description:
      "Structured offerings tailored for banks, family offices, industrial buyers, and regulated financial entities.",
  },
  {
    id: 6,
    title: "Logistics Coordination",
    description:
      "Secured delivery managed through trusted logistics partners, ensuring safe and timely movement of bullion.",
  },
];

interface ServiceSectionProps {
  readonly className?: string;
}

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
        duration: 0.6,
        ease: "easeOut",
      },
    },
  } as Variants,
  grid: {
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  } as Variants,
  card: {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  } as Variants,
  floating: {
    initial: { y: 0 },
    animate: {
      y: [0, -10, 0],
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
      scale: 1.02,
      y: -6,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  } as Variants,
  badge: {
    hidden: { opacity: 0, x: -15 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  } as Variants,
});

const getIconComponent = (iconType: Service["icon"]): React.ReactNode => {
  const iconProps = {
    className:
      "text-white transition-colors duration-300 group-hover:text-cyan-400",
    size: 24,
  };
  switch (iconType) {
    case "trading":
      return <TrendingUp {...iconProps} />;
    case "supply":
      return <Package {...iconProps} />;
    case "procurement":
      return <Briefcase {...iconProps} />;
    case "logistics":
      return <Shield {...iconProps} />;
    default:
      return <Zap {...iconProps} />;
  }
};

export const ServiceSection: FC<ServiceSectionProps> = ({
  className = "",
}: ServiceSectionProps): JSX.Element => {
  const [hoveredId, setHoveredId] = useState<HoveredServiceId>(null);
  const variants = getAnimationVariants();
  const router = useRouter();

  const handleMouseEnter = (id: number): void => {
    setHoveredId(id);
  };

  const handleMouseLeave = (): void => {
    setHoveredId(null);
  };

  return (
    <section
      id="services"
      className={`py-24 bg-slate-950 relative overflow-hidden ${className}`}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-linear-to-b from-slate-950 via-blue-950 to-slate-950" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(rgba(59,130,246,0.03) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(59,130,246,0.03) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />

      {/* Floating gradient orbs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={variants.container}
          className="text-center mb-16"
        >
          <motion.div
            variants={variants.item}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 mb-6"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                repeat: Infinity,
                duration: 3,
                ease: "linear",
              }}
            >
              <Settings className="text-cyan-400" size={16} />
            </motion.div>
            <span className="text-zinc-400 text-sm font-medium">
              Our Services
            </span>
          </motion.div>

          <motion.h2
            variants={variants.item}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
          >
            Institutional-Grade
            <span className="block mt-2 bg-linear-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Bullion Solutions
            </span>
          </motion.h2>

          <motion.p
            variants={variants.item}
            className="text-zinc-400 text-lg leading-relaxed max-w-3xl mx-auto"
          >
            At SR Jewellers, we deliver institutional-grade precious metal
            solutions backed by experience, regulatory compliance, and a deep
            understanding of the bullion market. Our services are designed to
            support financial institutions, bullion dealers, industrial buyers,
            and family offices.
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={variants.container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 items-start gap-6 mb-20"
        >
          {services.map((service: Service) => (
            <motion.div
              key={service.id}
              variants={cardVariants}
              onMouseEnter={() => handleMouseEnter(service.id)}
              onMouseLeave={handleMouseLeave}
              initial="rest"
              animate={hoveredId === service.id ? "hover" : "rest"}
              className="group"
            >
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 hover:border-cyan-400/40 rounded-2xl p-8 transition-all duration-300 h-full flex flex-col">
                {/* Icon and Title */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <motion.div
                      className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 p-3 transition-all duration-300 group-hover:bg-blue-500/20 group-hover:border-cyan-400/40 mb-4"
                      animate={
                        hoveredId === service.id
                          ? { rotate: 5, scale: 1.05 }
                          : { rotate: 0, scale: 1 }
                      }
                      transition={{ duration: 0.3 }}
                    >
                      {getIconComponent(service.icon)}
                    </motion.div>
                    <h3 className="text-xl font-bold text-white mb-2 leading-tight group-hover:text-cyan-400 transition-colors duration-300">
                      {service.title}
                    </h3>
                  </div>
                </div>

                {/* Description */}
                <p className="text-zinc-400 mb-6 leading-relaxed text-sm">
                  {service.description}
                </p>

                {/* Details */}
                <motion.div
                  initial={false}
                  animate={
                    hoveredId === service.id
                      ? { opacity: 1, height: "auto" }
                      : { opacity: 0, height: 0 }
                  }
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="space-y-3 pt-4 border-t border-white/10">
                    {service.details.map((detail: string, index: number) => (
                      <motion.div
                        key={`${service.id}-detail-${index}`}
                        variants={variants.badge}
                        initial="hidden"
                        animate={
                          hoveredId === service.id ? "visible" : "hidden"
                        }
                        className="flex items-start gap-3"
                      >
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: index * 0.1,
                          }}
                        >
                          <div className="w-2 h-2 rounded-full bg-cyan-400 mt-1.5" />
                        </motion.div>
                        <p className="text-sm text-zinc-400">{detail}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* CTA Arrow */}
                <motion.div
                  className="flex items-center justify-between pt-6 mt-auto"
                  animate={
                    hoveredId === service.id
                      ? { opacity: 1, x: 0 }
                      : { opacity: 0.6, x: -8 }
                  }
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-sm font-semibold text-cyan-400">
                    Learn More
                  </span>
                  <motion.div
                    animate={
                      hoveredId === service.id ? { x: [0, 4, 0] } : { x: 0 }
                    }
                    transition={
                      hoveredId === service.id
                        ? { duration: 1.5, repeat: Infinity }
                        : { duration: 0.2 }
                    }
                  >
                    <ArrowRight size={18} className="text-cyan-400" />
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Why SR Bullion Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={variants.container}
          className="mb-20"
        >
          <motion.div variants={variants.item} className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Why{" "}
              <span className="bg-linear-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                SR Jewellers
              </span>
            </h3>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              A legacy of trust, delivering excellence in precious metals.
            </p>
          </motion.div>

          <motion.div
            variants={variants.grid}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {benefits.map((benefit) => (
              <motion.div
                key={benefit.id}
                variants={variants.card}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="group"
              >
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 hover:border-cyan-400/40 rounded-xl p-6 h-full transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <motion.div
                      whileHover={{ scale: 1.15 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 18,
                      }}
                      className="w-3 h-3 rounded-full bg-linear-to-r from-blue-500 to-cyan-600 mt-1.5 shrink-0"
                    />

                    <div>
                      <h4 className="font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                        {benefit.title}
                      </h4>
                      <p className="text-sm text-zinc-400 leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
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
          variants={variants.container}
          className="text-center"
        >
          <motion.h3
            variants={variants.item}
            className="text-3xl md:text-4xl font-bold text-white mb-6"
          >
            Ready to Secure Your Next{" "}
            <span className="bg-linear-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Bullion Trade?
            </span>
          </motion.h3>

          <motion.p
            variants={variants.item}
            className="text-zinc-400 text-lg mb-8 max-w-2xl mx-auto"
          >
            Get in touch with SR Jewellers for wholesale precious metals in kilo
            and large bar formats delivered with integrity, compliance, and
            confidentiality.
          </motion.p>

          <motion.button
            onClick={() => router.push("/contact")}
            type="button"
            variants={variants.item}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="group bg-linear-to-r from-blue-600 to-cyan-600 text-white px-10 py-4 rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-blue-500/20 font-semibold inline-flex items-center gap-3"
          >
            Contact Our Team
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
};