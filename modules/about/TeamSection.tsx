"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import type { FC, JSX } from "react";
import type { MotionProps, Variants } from "framer-motion";
import {
  ArrowRight,
  Briefcase,
  Award,
  TrendingUp,
  Target,
  Zap,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Type definitions
interface TeamMember {
  readonly id: number;
  readonly name: string;
  readonly title: string;
  readonly description: string;
  readonly expertise: readonly string[];
  readonly image: string;
  readonly color: string;
}

interface AnimationVariants {
  container: Variants;
  item: Variants;
  card: Variants;
  floating: Variants;
  hover: Variants;
}

type HoveredId = number | null;

const teamMembers: readonly TeamMember[] = [
  {
    id: 1,
    name: "Mr. Shitiz Garg",
    title: "Managing Director & Founder",
    description:
      "Mr. Shitiz Garg is the Managing Director of SR Jewellers with over nine years of experience in gold bullion trading, financial investments, and strategic business leadership. His expertise spans multiple sectors, including precious metals, petroleum, real estate, and general trading through the Synergy Finvest group. With strong knowledge of international markets, supply chain optimization, and risk-managed capital deployment, he plays a key role in driving the company's operational excellence and global competitiveness.",
    expertise: [
      "Bullion Trading",
      "Market Strategy",
      "Global Expansion",
      "Risk Management",
    ],
    image: "/shitiz-garg.jpg",
    color: "from-amber-500 to-amber-600",
  },
  {
    id: 2,
    name: "Mr. Kush Goel",
    title: "Director – SR Jewellers",
    description:
      "Mr. Kush Goel is a seasoned entrepreneur and chartered accountant with extensive experience in the oil & gas sector, precious metals trading, and diversified family businesses. With a professional background at global firms such as Deloitte, KPMG, and Grant Thornton, he brings financial expertise, strategic insight, and results-driven leadership to SR Jewellers. Since 2012, he has led ventures across gold and silver trading, investment advisory, luxury car rentals, and commodities.",
    expertise: [
      "Financial Strategy",
      "Trading Dynamics",
      "Governance",
      "Business Growth",
    ],
    image: "/kush-geol.jpg",
    color: "from-amber-500 to-amber-600",
  },
];

interface TeamPremiumProps {
  readonly className?: string;
}

type Stat = {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  animate: MotionProps["animate"];
  transition: MotionProps["transition"];
};

export const stats: Stat[] = [
  {
    id: "experience",
    title: "20+ Years",
    description: "Combined Industry Experience",
    icon: Award,
    animate: { scale: [1, 1.05, 1] },
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
  },
  {
    id: "reach",
    title: "Global Reach",
    description: "International Trading Networks",
    icon: Target,
    animate: { rotate: 360 },
    transition: { duration: 4, repeat: Infinity, ease: "linear" },
  },
  {
    id: "excellence",
    title: "Excellence",
    description: "Commitment to Quality & Trust",
    icon: Zap,
    animate: { y: [0, -8, 0] },
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
  },
];

export const animationVariants: {
  container: Variants;
  item: Variants;
} = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        ease: "easeOut",
      },
    },
  },
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
  },
};

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
      y: -8,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  } as Variants,
});

const TeamPremium: FC<TeamPremiumProps> = ({
  className = "",
}: TeamPremiumProps): JSX.Element => {
  const [hoveredId, setHoveredId] = useState<HoveredId>(null);
  const animationVariants = getAnimationVariants();
  const router = useRouter();

  const handleMouseEnter = (id: number): void => {
    setHoveredId(id);
  };

  const handleMouseLeave = (): void => {
    setHoveredId(null);
  };

  return (
    <section
      id="team"
      className={`py-24 bg-black relative overflow-hidden ${className}`}
    >
      {/* Subtle background linears */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={animationVariants.container}
          className="text-center mb-16"
        >
          <motion.div
            variants={animationVariants.item}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 mb-6"
          >
            <Award className="text-amber-500" size={16} />
            <span className="text-zinc-400 text-sm font-medium">
              Leadership Team
            </span>
          </motion.div>

          <motion.h2
            variants={animationVariants.item}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            Visionary Leaders
            <span className="block mt-2 bg-linear-to-r from-amber-500 via-amber-400 to-amber-500 bg-clip-text text-transparent">
              Shaping Global Trade
            </span>
          </motion.h2>

          <motion.p
            variants={animationVariants.item}
            className="text-zinc-400 text-lg leading-relaxed max-w-2xl mx-auto"
          >
            Meet the strategic minds driving SR Jewellers forward with decades
            of combined expertise in precious metals trading, finance, and
            international business.
          </motion.p>
        </motion.div>

        {/* Team Cards Grid */}
        <motion.div
          variants={animationVariants.container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-8 mb-20"
        >
          {teamMembers.map((member: TeamMember) => (
            <motion.div
              key={member.id}
              variants={animationVariants.card}
              onMouseEnter={() => handleMouseEnter(member.id)}
              onMouseLeave={handleMouseLeave}
              whileHover={{ y: -6 }}
              className="group"
            >
              {/* Card Container */}
              <div className="bg-white/5 backdrop-blur-md border border-white/10 hover:border-amber-500/30 rounded-2xl overflow-hidden transition-all duration-300 h-full flex flex-col">
                {/* Image Section */}
                <div className="relative h-80 overflow-hidden bg-linear-to-br from-zinc-900 to-black">
                  <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent opacity-60" />

                  <div className="relative w-full h-full flex items-center justify-center p-8">
                    <div className="relative w-64 h-64">
                      <Image
                        height={700}
                        width={700}
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        className="w-full h-full object-cover rounded-xl pointer-events-none"
                      />
                    </div>
                  </div>

                  {/* Role Badge */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="absolute bottom-4 left-4 right-4"
                  >
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full">
                      <p className="text-white font-semibold text-sm">
                        {member.title}
                      </p>
                    </div>
                  </motion.div>
                </div>

                {/* Content Section */}
                <div className="p-8 flex flex-col grow">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {member.name}
                    </h3>
                    <div className="h-1 w-12 bg-linear-to-r from-amber-500 to-amber-600 rounded-full group-hover:w-20 transition-all duration-300" />
                  </div>

                  <p className="text-zinc-400 leading-relaxed mb-6 grow text-sm">
                    {member.description}
                  </p>

                  {/* Expertise Tags */}
                  <div className="space-y-4">
                    <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                      Key Expertise
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {member.expertise.map((skill: string, index: number) => (
                        <motion.span
                          key={`${member.id}-${index}`}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="inline-block px-3 py-1.5 bg-white/5 backdrop-blur-md border border-white/10 text-zinc-300 rounded-lg text-xs font-medium hover:bg-amber-500/20 hover:border-amber-500/30 hover:text-amber-500 transition-all duration-300"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Icon indicators */}
                  <motion.div
                    className="mt-6 flex gap-3"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <motion.div
                      animate={
                        hoveredId === member.id
                          ? { rotate: 5, scale: 1.05 }
                          : { rotate: 0, scale: 1 }
                      }
                      transition={{ duration: 0.3 }}
                      className={`w-10 h-10 bg-linear-to-br ${member.color} rounded-lg flex items-center justify-center shadow-lg shadow-amber-500/20`}
                    >
                      <Briefcase className="text-white" size={18} />
                    </motion.div>
                    <motion.div
                      animate={
                        hoveredId === member.id ? { scale: 1.1 } : { scale: 1 }
                      }
                      transition={{ duration: 0.3 }}
                      className="w-10 h-10 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg flex items-center justify-center hover:border-amber-500/30 transition-colors"
                    >
                      <TrendingUp className="text-amber-500" size={18} />
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          variants={animationVariants.container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-3 gap-6 mb-20"
        >
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <motion.div
                key={stat.id}
                variants={animationVariants.item}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group text-center p-8 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-amber-500/30 transition-colors duration-300"
              >
                <motion.div
                  animate={stat.animate}
                  className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-xl bg-white/10 backdrop-blur-md border border-white/20 p-3 transition-colors duration-300 group-hover:bg-amber-400/20 group-hover:border-amber-400/30"
                >
                  <Icon size={28} className="text-white" />
                </motion.div>

                <h3 className="text-3xl font-bold text-white mb-2">
                  {stat.title}
                </h3>

                <p className="text-sm text-zinc-400">{stat.description}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={animationVariants.container}
          className="text-center"
        >
          <motion.p
            variants={animationVariants.item}
            className="text-zinc-400 text-lg mb-6"
          >
            Join our expert-led platform for premium precious metals trading
          </motion.p>
          <motion.button
            onClick={() => router.push("/contact")}
            type="button"
            variants={animationVariants.item}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group bg-white text-black px-8 py-4 rounded-xl transition-shadow duration-300 shadow-lg shadow-amber-500/20 font-semibold inline-flex items-center gap-3"
          >
            Connect With Our Team
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

export default TeamPremium;
