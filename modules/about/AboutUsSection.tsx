'use client';

import React, { useState } from 'react';
import type { Variants } from 'framer-motion';
import {
  ArrowRight,
  Award,
  Shield,
  Sparkles,
  TrendingUp,
  Zap,
  Globe,
  Users,
  Lock,
  Briefcase,
} from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

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
    number: '25',
    label: 'Years of Trust',
    suffix: '+',
    icon: <TrendingUp className="text-white" size={24} />,
  },
  {
    number: '50K',
    label: 'Satisfied Clients',
    suffix: '+',
    icon: <Users className="text-white" size={24} />,
  },
  {
    number: '500M',
    label: 'Oz Delivered',
    suffix: '+',
    icon: <Globe className="text-white" size={24} />,
  },
  {
    number: '99.9',
    label: 'Purity Guarantee',
    suffix: '%',
    icon: <Lock className="text-white" size={24} />,
  },
];

const features: Feature[] = [
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Certified Authenticity',
    desc: 'International certification for every precious metal piece',
    color: 'from-amber-400 to-amber-600',
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: 'Premium Quality',
    desc: 'Sourced directly from world-renowned refineries',
    color: 'from-amber-500 to-amber-700',
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: 'Expert Curation',
    desc: 'Handpicked collection by certified precious metal specialists',
    color: 'from-yellow-400 to-amber-600',
  },
  {
    icon: <Briefcase className="w-6 h-6" />,
    title: 'Secure Trading',
    desc: 'Advanced security protocols and insurance on all transactions',
    color: 'from-amber-500 to-yellow-500',
  },
];

export const AboutUsSection: React.FC = () => {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

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
        ease: 'easeOut',
      },
    },
  };

  const slideInVariants: Variants = {
    hidden: { opacity: 0, x: -60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  const slideInRightVariants: Variants = {
    hidden: { opacity: 0, x: 60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
        delay: 0.2,
      },
    },
  };

  const floatingVariants = {
    initial: { y: 0 },
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  const scaleOnHoverVariants = {
    rest: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section
      id="about"
      className="py-28 bg-linear-to-b from-white via-amber-50/20 to-white relative overflow-hidden min-h-screen"
    >
      {/* Animated background elements */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.3, scale: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute top-0 left-0 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
      ></motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.3, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.2 }}
        className="absolute bottom-0 right-0 w-96 h-96 bg-amber-300/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"
      ></motion.div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={slideInVariants}
            className="space-y-8"
          >
            {/* Header */}
            <motion.div variants={itemVariants} className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              >
                <Zap className="text-amber-600" size={24} />
              </motion.div>
              <span className="text-amber-600 font-bold tracking-widest uppercase text-sm">
                About Our Company
              </span>
            </motion.div>

            {/* Title */}
            <motion.h2 variants={itemVariants} className="text-5xl font-black leading-tight">
              <span>Excellence in Precious Metals</span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="block bg-linear-to-r from-amber-600 via-amber-500 to-amber-700 bg-clip-text text-transparent mt-2"
              >
                Trading & Investment
              </motion.span>
            </motion.h2>

            {/* Description */}
            <motion.div variants={itemVariants} className="space-y-6">
              <p className="text-gray-700 text-lg leading-relaxed">
                For over two decades, Serbian Bullion DMCC has been the premier destination for
                precious metals collectors, investors, and institutions worldwide. Our journey began
                with a steadfast commitment to providing authentic, certified, and competitively
                priced precious metals.
              </p>

              <p className="text-gray-600 text-lg leading-relaxed">
                Today, we proudly maintain one of the most comprehensive and authenticated
                collections of bullion, from investment-grade bars to rare collector coins. Every
                product undergoes rigorous certification and comes with complete documentation and
                insurance coverage.
              </p>
            </motion.div>

            {/* Features List */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-4"
            >
              {features.slice(0, 3).map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ x: 10 }}
                  className="flex items-start gap-4 group cursor-pointer"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`w-14 h-14 bg-linear-to-br ${feature.color} rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-amber-500/30 group-hover:shadow-amber-500/50 transition-all duration-300`}
                  >
                    <span className="text-white">{feature.icon}</span>
                  </motion.div>
                  <div>
                    <h3 className="font-bold text-xl mb-1 text-gray-900 group-hover:text-amber-600 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group bg-linear-to-r from-amber-500 to-amber-600 text-white px-8 py-4 rounded-full hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-xl shadow-amber-500/30 hover:shadow-amber-500/50 font-bold flex items-center gap-3"
            >
              Explore Our Collection
              <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                <ArrowRight size={20} />
              </motion.div>
            </motion.button>
          </motion.div>

          {/* Right Content - Image & Stats */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={slideInRightVariants}
            className="relative"
          >
            {/* Background glow */}
            <motion.div
              animate={floatingVariants}
              className="absolute -top-8 -left-8 w-72 h-72 bg-linear-to-br from-amber-400/30 to-amber-600/30 rounded-3xl blur-2xl"
            ></motion.div>

            {/* Main Image */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="hidden md:block relative rounded-3xl overflow-hidden shadow-2xl shadow-amber-900/20 h-96"
            >
              <Image
                fill
                src="/gold-bar2.jpg"
                alt="Premium Gold Bullion"
                className="object-cover"
              />
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent"
              ></motion.div>
            </motion.div>

            {/* Floating Stat Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="absolute -bottom-35 right-4 sm:right-10 w-fit bg-white p-6 sm:p-8 rounded-2xl shadow-2xl shadow-amber-900/20 border border-amber-100"
            >
              <div className="flex items-center gap-4">
                <motion.div
                  animate={floatingVariants}
                  className="w-16 h-16 bg-linear-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg"
                >
                  <TrendingUp className="text-white" size={32} />
                </motion.div>
                <div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="text-3xl font-black text-gray-900"
                  >
                    99.9%
                  </motion.div>
                  <div className="text-gray-600 font-medium text-sm">Purity Certified</div>
                </div>
              </div>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mt-32"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={scaleOnHoverVariants}
                  className="text-center group"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.5, type: 'spring' }}
                    className="w-12 h-12 bg-linear-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg"
                  >
                    {stat.icon}
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.2, duration: 0.6 }}
                    className="text-4xl font-black bg-linear-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent mb-2"
                  >
                    {stat.number}
                    {stat.suffix}
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 0.6 }}
                    className="text-gray-600 font-semibold text-sm group-hover:text-amber-600 transition-colors"
                  >
                    {stat.label}
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Features Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-32 pt-16 border-t border-amber-100"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              onMouseEnter={() => setHoveredFeature(index)}
              onMouseLeave={() => setHoveredFeature(null)}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="p-6 rounded-2xl bg-white border border-amber-100 shadow-lg hover:shadow-amber-900/20 transition-shadow duration-150 group cursor-pointer"
            >
              <motion.div
                animate={
                  hoveredFeature === index
                    ? { rotate: 10, scale: 1.1 }
                    : { rotate: 0, scale: 1 }
                }
                transition={{
                  rotate: { duration: 0.45, ease: "easeInOut" },
                  scale: { duration: 0.15, ease: "easeOut" }
                }}
                className={`w-12 h-12 bg-linear-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4 shadow-lg`}
              >
                <span className="text-white">{feature.icon}</span>
              </motion.div>

              <h3 className="font-bold text-xl mb-2 text-gray-900 group-hover:text-amber-600 transition-colors duration-150">
                {feature.title}
              </h3>

              <p className="text-gray-600">{feature.desc}</p>
            </motion.div>

          ))}
        </motion.div>
      </div>
    </section>
  );
};
