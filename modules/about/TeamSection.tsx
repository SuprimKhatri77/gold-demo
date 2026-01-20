'use client';

import React, { useState } from 'react';
import { easeIn, motion } from 'framer-motion';
import Image from 'next/image';
import type { FC, JSX } from 'react';
import type { Variants } from 'framer-motion';
import {
  ArrowRight,
  Briefcase,
  Award,
  TrendingUp,
  Target,
  Zap,
} from 'lucide-react';
import PartnerSection from './Partner';

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
    name: 'Mr. Shitiz Garg',
    title: 'Managing Director & Founder',
    description:
      'Mr. Shitiz Garg is the Managing Director of SR Bullion FZCO with over nine years of experience in gold bullion trading, financial investments, and strategic business leadership. His expertise spans multiple sectors, including precious metals, petroleum, real estate, and general trading through the Synergy Finvest group. With strong knowledge of international markets, supply chain optimization, and risk-managed capital deployment, he plays a key role in driving the company’s operational excellence and global competitiveness. Coming from a prominent Indian business family, Mr. Garg leads with vision, integrity, and a focus on innovation, market expansion, and sustainable growth.',
    expertise: ['Bullion Trading', 'Market Strategy', 'Global Expansion', 'Risk Management'],
    image: '/shitiz-garg.jpg',
    color: 'from-amber-400 to-amber-600',
  },
  {
    id: 2,
    name: 'Mr. Kush Goel',
    title: 'Director – SR Bullion FZCO',
    description:
      'Mr. Kush Goel is a seasoned entrepreneur and chartered accountant with extensive experience in the oil & gas sector, precious metals trading, and diversified family businesses. With a professional background at global firms such as Deloitte, KPMG, and Grant Thornton, he brings financial expertise, strategic insight, and results-driven leadership to SR Bullion FZCO. Since 2012, he has led ventures across gold and silver trading, investment advisory, luxury car rentals, and commodities, driving sustainable growth, operational excellence, and strong corporate governance.',
    expertise: ['Financial Strategy', 'Trading Dynamics', 'Governance', 'Business Growth'],
    image: '/kush-geol.jpg',
    color: 'from-yellow-400 to-amber-600',
  },
];

const partnersData = [
  { id: 1, name: "Accrediation", photo: "/dmcc.png" },
  { id: 2, name: "Logistic Partners", photo: "/brink.png" },
];


interface TeamPremiumProps {
  readonly className?: string;
}

const getAnimationVariants = (): AnimationVariants => ({
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
        ease: 'easeOut',
      },
    },
  } as Variants,
  card: {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  } as Variants,
  floating: {
    initial: { y: 0 },
    animate: {
      y: [0, -15, 0],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  } as Variants,
  hover: {
    rest: { scale: 1, y: 0 },
    hover: {
      scale: 1.03,
      y: -10,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  } as Variants,
});

const TeamPremium: FC<TeamPremiumProps> = ({
  className = '',
}: TeamPremiumProps): JSX.Element => {
  const [hoveredId, setHoveredId] = useState<HoveredId>(null);
  const animationVariants = getAnimationVariants();

  const handleMouseEnter = (id: number): void => {
    setHoveredId(id);
  };

  const handleMouseLeave = (): void => {
    setHoveredId(null);
  };

  return (
    <section
      id="team"
      className={`py-28 bg-linear-to-b from-white via-amber-50/10 to-white relative overflow-hidden ${className}`}
    >
      {/* Animated background elements */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.2, scale: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute top-20 right-0 w-80 h-80 bg-amber-300/30 rounded-full blur-3xl translate-x-1/3"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.2, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.2 }}
        className="absolute bottom-20 left-0 w-80 h-80 bg-amber-200/20 rounded-full blur-3xl -translate-x-1/3"
      />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={animationVariants.container}
          className="text-center mb-20"
        >
          <motion.div
            variants={animationVariants.item}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            >
              <Award className="text-amber-600" size={24} />
            </motion.div>
            <span className="text-amber-600 font-bold tracking-widest uppercase text-sm">
              Leadership Team
            </span>
          </motion.div>

          <motion.h2
            variants={animationVariants.item}
            className="text-5xl font-black leading-tight mb-6"
          >
            <span>Visionary Leaders</span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="block bg-linear-to-r from-amber-600 via-amber-500 to-amber-700 bg-clip-text text-transparent"
            >
              Shaping Global Trade
            </motion.span>
          </motion.h2>

          <motion.p
            variants={animationVariants.item}
            className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto"
          >
            Meet the strategic minds driving SR Bullion FZCO forward with decades of combined expertise
            in precious metals trading, finance, and international business.
          </motion.p>
        </motion.div>

        {/* Team Cards Grid */}
        <motion.div
          variants={animationVariants.container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-12 mb-20"
        >
          {teamMembers.map((member: TeamMember) => (
            <motion.div
              key={member.id}
              variants={animationVariants.card}
              onMouseEnter={() => handleMouseEnter(member.id)}
              onMouseLeave={handleMouseLeave}
              initial="rest"
              animate={hoveredId === member.id ? 'hover' : 'rest'}
              className="group"
            >
              {/* Card Container */}
              <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-amber-100 h-full flex flex-col">
                {/* Image Section */}
                <div className="relative h-80 overflow-hidden bg-linear-to-br from-amber-100 to-amber-50">
                  <motion.div
                    animate={{
                      y: [0, -15, 0],
                      transition: {
                        duration: 5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      },
                    }}
                    className="absolute -top-10 -right-10 w-64 h-64 bg-linear-to-br from-amber-400/40 to-amber-600/40 rounded-full blur-2xl"
                  />

                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                      src={member.image || '/placeholder.svg'}
                      alt={member.name}
                      width={300}
                      height={300}
                      className="w-64 h-64 object-cover rounded-2xl shadow-xl"
                    />
                  </div>

                  {/* Role Badge */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="absolute bottom-4 left-4 right-4"
                  >
                    <div className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                      <p className="text-amber-600 font-bold text-sm">{member.title}</p>
                    </div>
                  </motion.div>
                </div>

                {/* Content Section */}
                <div className="p-8 flex flex-col grow">
                  <div className="mb-6">
                    <h3 className="text-3xl font-black text-gray-900 mb-2 group-hover:text-amber-600 transition-colors">
                      {member.name}
                    </h3>
                    <div className="h-1 w-12 bg-linear-to-r from-amber-500 to-amber-600 rounded-full group-hover:w-20 transition-all duration-300" />
                  </div>

                  <p className="text-gray-700 leading-relaxed mb-6 grow">
                    {member.description}
                  </p>

                  {/* Expertise Tags */}
                  <div className="space-y-4">
                    <p className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                      Key Expertise
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {member.expertise.map((skill: string, index: number) => (
                        <motion.div
                          key={`${member.id}-${index}`}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <span className="inline-block px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-semibold group-hover:bg-amber-600 group-hover:text-white transition-colors duration-300">
                            {skill}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Icon indicators */}
                  <motion.div
                    className="mt-6 flex gap-3"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <motion.div
                      animate={hoveredId === member.id ? { rotate: 10 } : { rotate: 0 }}
                      transition={{ rotate: { duration: 0.25, ease: "easeOut" } }}
                      className={`w-10 h-10 bg-linear-to-br ${member.color} rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-amber-500/50 transition-shadow duration-100`}
                    >
                      <Briefcase className="text-white" size={20} />
                    </motion.div>
                    <motion.div
                      animate={hoveredId === member.id ? { scale: 1.1 } : { scale: 1 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className="w-10 h-10 bg-linear-to-br from-amber-500/20 to-amber-600/20 rounded-lg flex items-center justify-center shadow-lg border border-amber-200 group-hover:border-amber-500 transition-colors duration-100"
                    >
                      <TrendingUp className="text-amber-600" size={20} />
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
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8 mt-20 pt-20 border-t border-amber-100"
        >
          <motion.div
            variants={animationVariants.item}
            whileHover={{ y: -5 }}
            className="text-center p-8 rounded-2xl bg-linear-to-br from-amber-50 to-transparent border border-amber-100 hover:border-amber-300 transition-color duration-150"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="w-16 h-16 bg-linear-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
            >
              <Award className="text-white" size={32} />
            </motion.div>
            <h3 className="text-2xl font-black text-gray-900 mb-2">20+ Years</h3>
            <p className="text-gray-600">Combined Industry Experience</p>
          </motion.div>

          <motion.div
            variants={animationVariants.item}
            whileHover={{ y: -5 }}
            className="text-center p-8 rounded-2xl bg-linear-to-br from-amber-50 to-transparent border border-amber-100 hover:border-amber-300 transition-color duration-150"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              className="w-16 h-16 bg-linear-to-br from-yellow-400 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
            >
              <Target className="text-white" size={32} />
            </motion.div>
            <h3 className="text-2xl font-black text-gray-900 mb-2">Global Reach</h3>
            <p className="text-gray-600">International Trading Networks</p>
          </motion.div>

          <motion.div
            variants={animationVariants.item}
            whileHover={{ y: -5 }}
            className="text-center p-8 rounded-2xl bg-linear-to-br from-amber-50 to-transparent border border-amber-100 hover:border-amber-300 transition-color duration-150"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="w-16 h-16 bg-linear-to-br from-amber-500 to-yellow-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
            >
              <Zap className="text-white" size={32} />
            </motion.div>
            <h3 className="text-2xl font-black text-gray-900 mb-2">Excellence</h3>
            <p className="text-gray-600">Commitment to Quality & Trust</p>
          </motion.div>
        </motion.div>

        {/* partners */}
        <PartnerSection partners={partnersData} />
        {/* CTA Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={animationVariants.container}
          className="mt-20 text-center"
        >
          <motion.p
            variants={animationVariants.item}
            className="text-gray-600 text-lg mb-6"
          >
            Join our expert-led platform for premium precious metals trading
          </motion.p>
          <motion.button
            type="button"
            variants={animationVariants.item}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group bg-linear-to-r from-amber-500 to-amber-600 text-white px-8 py-4 rounded-full hover:from-amber-600 hover:to-amber-700 transition-color duration-300 shadow-xl shadow-amber-500/30 hover:shadow-amber-500/50 font-bold flex items-center gap-3 mx-auto"
          >
            Connect With Our Team
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

export default TeamPremium;
