"use client";

import type { Variants } from "framer-motion";
import {
  Award,
  Shield,
  Sparkles,
  TrendingUp,
  Zap,
  Globe,
  Users,
  Lock,
  Briefcase,
} from "lucide-react";
import { motion } from "framer-motion";

interface Stat {
  number: string;
  label: string;
  suffix?: string;
  icon: React.ReactNode;
}

interface Feature {
  icon: React.ReactNode;
  title: string;
  desc: string;
  color: string;
}

const stats: Stat[] = [
  {
    number: "25",
    label: "Years of Trust",
    suffix: "+",
    icon: (
      <TrendingUp
        className="text-white group-hover:text-amber-400 transition-colors"
        size={24}
      />
    ),
  },
  {
    number: "50K",
    label: "Satisfied Clients",
    suffix: "+",
    icon: (
      <Users
        className="text-white group-hover:text-amber-400 transition-colors"
        size={24}
      />
    ),
  },
  {
    number: "500M",
    label: "Oz Delivered",
    suffix: "+",
    icon: (
      <Globe
        className="text-white group-hover:text-amber-400 transition-colors"
        size={24}
      />
    ),
  },
  {
    number: "99.9",
    label: "Purity Guarantee",
    suffix: "%",
    icon: (
      <Lock
        className="text-white group-hover:text-amber-400 transition-colors"
        size={24}
      />
    ),
  },
];

const features: Feature[] = [
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Certified Authenticity",
    desc: "International certification for every precious metal piece",
    color: "white",
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: "Premium Quality",
    desc: "Sourced directly from world-renowned refineries",
    color: "from-amber-500 to-amber-700",
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: "Expert Curation",
    desc: "Handpicked collection by certified precious metal specialists",
    color: "from-yellow-400 to-amber-600",
  },
  {
    icon: <Briefcase className="w-6 h-6" />,
    title: "Secure Trading",
    desc: "Advanced security protocols and insurance on all transactions",
    color: "from-amber-500 to-yellow-500",
  },
];

export const AboutUsSection: React.FC = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  // const slideInVariants: Variants = {
  //   hidden: { opacity: 0, x: -60 },
  //   visible: {
  //     opacity: 1,
  //     x: 0,
  //     transition: {
  //       duration: 0.8,
  //       ease: "easeOut",
  //     },
  //   },
  // };

  // const slideInRightVariants: Variants = {
  //   hidden: { opacity: 0, x: 60 },
  //   visible: {
  //     opacity: 1,
  //     x: 0,
  //     transition: {
  //       duration: 0.8,
  //       ease: "easeOut",
  //       delay: 0.2,
  //     },
  //   },
  // };

  // const floatingVariants = {
  //   initial: { y: 0 },
  //   animate: {
  //     y: [0, -20, 0],
  //     transition: {
  //       duration: 6,
  //       repeat: Infinity,
  //       ease: "easeInOut",
  //     },
  //   },
  // };

  // const scaleOnHoverVariants = {
  //   rest: { scale: 1 },
  //   hover: {
  //     scale: 1.05,
  //     transition: {
  //       duration: 0.3,
  //       ease: "easeOut",
  //     },
  //   },
  // };

  return (
    <section id="about" className="relative py-24 bg-black overflow-hidden">
      {/* Subtle background linears */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 mb-6">
            <Zap className="text-amber-500" size={16} />
            <span className="text-zinc-400 text-sm font-medium">
              About Our Company
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Excellence in Precious Metals
            <span className="block mt-2 bg-linear-to-r from-amber-500 via-amber-400 to-amber-500 bg-clip-text text-transparent">
              Trading & Investment
            </span>
          </h2>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mb-20">
          {/* Left - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
              <p className="text-zinc-300 text-lg leading-relaxed mb-4">
                For over two decades,{" "}
                <b>
                  <i>SR Jewellers</i>
                </b>{" "}
                has been the premier destination for precious metals collectors,
                investors, and institutions worldwide. Our journey began with a
                steadfast commitment to providing authentic, certified, and
                competitively priced precious metals.
              </p>
              <p className="text-zinc-400 leading-relaxed">
                Today, we proudly maintain one of the most comprehensive and
                authenticated collections of bullion, from investment-grade bars
                to rare collector coins. Every product undergoes rigorous
                certification and comes with complete documentation and
                insurance coverage.
              </p>
            </div>

            {/* Quick Features */}
            <div className="space-y-3">
              {features.slice(0, 3).map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ x: 4 }}
                  className="flex items-start gap-4 p-4 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-amber-500/30 transition-all duration-300 cursor-pointer group"
                >
                  <div
                    className="w-12 h-12  rounded-lg bg-white/10 backdrop-blur-md
               border border-white/20 p-3 transition-colors duration-150 group-hover:bg-amber-400/20 group-hover:border-amber-400/30"
                  >
                    <span className="text-white group-hover:text-amber-400 transition-colors">
                      {feature.icon}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white mb-1 group-hover:text-amber-500 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-zinc-400 text-sm">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - Stats Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Featured Stat */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-8 rounded-2xl bg-linear-to-br from-amber-500/10 to-amber-600/5 backdrop-blur-md border border-amber-500/20"
            >
              <div className="flex items-center justify-center gap-6">
                <div className="w-20 h-20 rounded-2xl bg-linear-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
                  <TrendingUp className="text-white" size={32} />
                </div>
                <div>
                  <div className="text-5xl font-bold text-white mb-1">
                    99.9%
                  </div>
                  <div className="text-zinc-400 font-medium">
                    Purity Certified
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    type: "tween",
                    duration: 0.35,
                    ease: "easeOut",
                    delay: index * 0.08,
                  }}
                  whileHover={{ scale: 1.04 }}
                  className="p-6 rounded-xl bg-white/5 backdrop-blur-md
             border border-white/10 hover:border-amber-500/30
             text-center group flex flex-col items-center justify-center gap-2"
                >
                  <div
                    className="w-12 h-12 rounded-lg bg-white/10 backdrop-blur-md
               border border-white/20 p-3
               transition-colors duration-150
               group-hover:bg-amber-400/20
               group-hover:border-amber-400/30"
                  >
                    {stat.icon}
                  </div>

                  <div className="text-3xl font-bold text-white mb-1">
                    {stat.number}
                    {stat.suffix}
                  </div>

                  <div className="text-zinc-400 text-sm font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 px-6 rounded-xl bg-white text-black font-semibold transition-shadow duration-300 shadow-lg shadow-amber-500/20"
            >
              Explore Our Collection
            </motion.button>
          </motion.div>
        </div>

        {/* Bottom Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              transition={{ type: "tween", duration: 0.2, ease: "easeOut" }}
              className="p-6 rounded-xl bg-white/5 backdrop-blur-md border border-white/10
             hover:border-amber-500/30 transition-shadow duration-300
             group cursor-pointer"
            >
              <motion.div
                whileHover={{ rotate: 5, scale: 1.05 }}
                transition={{ type: "tween", duration: 0.2, ease: "easeOut" }}
                className="w-14 h-14 flex items-center justify-center mb-4  rounded-lg bg-white/10 backdrop-blur-md
               border border-white/20 p-3
               transition-colors duration-150
               group-hover:bg-amber-400/20
               group-hover:border-amber-400/30"
              >
                <span className="text-white">{feature.icon}</span>
              </motion.div>

              <h3
                className="font-semibold text-lg text-white mb-2
                 group-hover:text-amber-500 transition-colors"
              >
                {feature.title}
              </h3>

              <p className="text-zinc-400 text-sm leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
