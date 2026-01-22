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
import Image from "next/image";

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
    accent: "from-amber-500 to-yellow-500",
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
    accent: "from-yellow-500 to-amber-500",
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
    accent: "from-amber-400 to-orange-500",
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
    accent: "from-orange-500 to-amber-500",
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
        delayChildren: 0.3,
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
    hidden: { opacity: 0, scale: 0.95, y: 30 },
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
      scale: 1.02,
      y: -8,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  } as Variants,
  badge: {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  } as Variants,
});

const getIconComponent = (iconType: Service["icon"]): React.ReactNode => {
  const iconProps = { className: "text-amber-600", size: 28 };
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

const ShieldComponent = ({ ...props }) => <Shield {...props} />; // Declare Shield component

export const ServiceSection: FC<ServiceSectionProps> = ({
  className = "",
}: ServiceSectionProps): JSX.Element => {
  const [hoveredId, setHoveredId] = useState<HoveredServiceId>(null);
  const variants = getAnimationVariants();

  const handleMouseEnter = (id: number): void => {
    setHoveredId(id);
  };

  const handleMouseLeave = (): void => {
    setHoveredId(null);
  };

  return (
    <section
      id="services"
      className={`py-32 bg-linear-to-b from-white via-amber-50/5 to-white relative overflow-hidden ${className}`}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 right-10 w-72 h-72 bg-amber-100/10 rounded-full blur-3xl"
          animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-40 left-20 w-96 h-96 bg-yellow-100/5 rounded-full blur-3xl"
          animate={{ y: [0, -30, 0], x: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4">
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
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <Settings className="text-amber-600" size={24} />
            </motion.div>
            <span className="text-amber-600 font-bold tracking-widest uppercase text-sm">
              Our Services
            </span>
          </motion.div>

          <motion.h2
            variants={variants.item}
            className="text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight text-balance"
          >
            Institutional-Grade Bullion Solutions
          </motion.h2>

          <motion.p
            variants={variants.item}
            className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto"
          >
            Our Services At SR Bullion FZCO, we deliver institutional-grade
            precious metal solutions backed by experience, regulatory
            compliance, and a deep understanding of the bullion market. Our
            services are designed to support financial institutions, bullion
            dealers, industrial buyers, and family offices seeking secured,
            transparent, and scalable bullion trade solutions.
          </motion.p>
        </motion.div>

        {/* Service image */}
        {/* <Image
          src={"/gold.jpg"}
          height={720}
          width={1200}
          alt="services image"
          className="mx-auto mb-15 object-cover h-150"
        /> */}
        {/* Services Grid */}
        <motion.div
          variants={variants.container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-8 mb-28 items-start"
        >
          {services.map((service: Service) => (
            <motion.div
              key={service.id}
              layout
              variants={cardVariants}
              onMouseEnter={() => handleMouseEnter(service.id)}
              onMouseLeave={handleMouseLeave}
              initial="rest"
              animate={hoveredId === service.id ? "hover" : "rest"}
              className=""
            >
              <div
                className={`
        bg-white rounded-2xl p-8 shadow-lg transition-shadow duration-200 
        border border-amber-100/50 ${hoveredId === service.id ? "h-auto" : "min-h-87.5 h-full"}
      `}
              >
                {/* Icon and Title */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <motion.div
                      className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-linear-to-br from-amber-50 to-yellow-50 mb-4"
                      animate={
                        hoveredId === service.id
                          ? { rotate: 10 }
                          : { rotate: 0 }
                      }
                      transition={{ duration: 0.3 }}
                    >
                      {getIconComponent(service.icon)}
                    </motion.div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 leading-tight">
                      {service.title}
                    </h3>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 mb-6 leading-relaxed">
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
                  style={{
                    pointerEvents: hoveredId === service.id ? "auto" : "none",
                  }}
                >
                  <div className="space-y-3 pt-4 border-t border-amber-100">
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
                          <div className="w-2 h-2 rounded-full bg-amber-500 mt-2" />
                        </motion.div>
                        <p className="text-sm text-gray-600">{detail}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* CTA Arrow */}
                <motion.div
                  className="flex items-center justify-between pt-6"
                  animate={
                    hoveredId === service.id
                      ? { opacity: 1, x: 0 }
                      : { opacity: 0.5, x: -10 }
                  }
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-sm font-semibold text-amber-600">
                    Learn More
                  </span>
                  <motion.div
                    animate={
                      hoveredId === service.id
                        ? { x: [0, 4, 0] }
                        : { x: 0 }
                    }
                    transition={
                      hoveredId === service.id
                        ? { duration: 1.5, repeat: Infinity }
                        : { duration: 0.2, repeat: 0 }
                    }
                  >
                    <ArrowRight size={18} className="text-amber-600" />
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
          viewport={{ once: true, margin: "-100px" }}
          variants={variants.container}
          className="mb-28"
        >
          <motion.div variants={variants.item} className="text-center mb-16">
            <h3 className="text-4xl lg:text-5xl font-black text-gray-900 mb-4 text-balance">
              Why SR Bullion
            </h3>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              A legacy of trust, delivering excellence in precious metals.
            </p>
          </motion.div>

          <motion.div
            variants={variants.container}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {benefits.map((benefit: Benefit) => (
              <motion.div
                key={benefit.id}
                variants={variants.card}
                className="group"
              >
                <div className="bg-linear-to-br from-white to-amber-50/30 rounded-xl p-6 border border-amber-100/50 h-full hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: benefit.id * 0.2,
                      }}
                      className="w-3 h-3 rounded-full bg-linear-to-r from-amber-500 to-yellow-500 mt-2 shrink-0"
                    />
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">
                        {benefit.title}
                      </h4>
                      <p className="text-sm text-gray-600 leading-relaxed">
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
            className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 text-balance"
          >
            Ready to Secure Your Next Bullion Trade?
          </motion.h3>

          <motion.p
            variants={variants.item}
            className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto"
          >
            Get in touch with SR Bullion FZCO for wholesale precious metals in
            kilo and large bar formats delivered with integrity, compliance, and
            confidentiality.
          </motion.p>

          <motion.button
            type="button"
            variants={variants.item}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group bg-linear-to-r from-amber-500 to-amber-600 text-white px-10 py-4 rounded-full hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-xl shadow-amber-500/30 hover:shadow-amber-500/50 font-bold flex items-center gap-3 mx-auto"
          >
            Contact Our Team
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
