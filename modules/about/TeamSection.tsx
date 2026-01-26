"use client";

import { useState } from "react";
import {
  Award,
  Briefcase,
  TrendingUp,
  Target,
  Zap,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const teamMembers = [
  {
    id: 1,
    name: "Mr. Shitiz Garg",
    title: "Managing Director & Founder",
    description:
      "Managing Director with over nine years of experience in gold bullion trading and strategic business leadership. His expertise spans precious metals, petroleum, real estate, and general trading through the Synergy Finvest group.",
    highlights: [
      "9+ years in gold bullion trading",
      "Led global expansion across precious metals",
      "Expert in supply chain optimization",
      "Strategic risk-managed capital deployment",
    ],
    expertise: [
      "Bullion Trading",
      "Market Strategy",
      "Global Expansion",
      "Risk Management",
    ],
    image: "/shitiz-garg.jpg",
  },
  {
    id: 2,
    name: "Mr. Kush Goel",
    title: "Director – SR Jewellers",
    description:
      "Seasoned entrepreneur and chartered accountant with extensive experience in oil & gas, precious metals trading, and diversified family businesses. Professional background at Deloitte, KPMG, and Grant Thornton.",
    highlights: [
      "Chartered Accountant with global firm experience",
      "10+ years leading ventures in commodities",
      "Expert in financial strategy & governance",
      "Pioneer in luxury car rental & investment advisory",
    ],
    expertise: [
      "Financial Strategy",
      "Trading Dynamics",
      "Governance",
      "Business Growth",
    ],
    image: "/kush-geol.jpg",
  },
];

const stats = [
  {
    id: "experience",
    title: "20+ Years",
    description: "Combined Industry Experience",
    icon: Award,
  },
  {
    id: "reach",
    title: "Global Reach",
    description: "International Trading Networks",
    icon: Target,
  },
  {
    id: "excellence",
    title: "Excellence",
    description: "Commitment to Quality & Trust",
    icon: Zap,
  },
];

export default function TeamPremium() {
  const [activeIndex, setActiveIndex] = useState(0);

  const inactiveIndex = activeIndex === 0 ? 1 : 0;
  const activeMember = teamMembers[activeIndex];
  const inactiveMember = teamMembers[inactiveIndex];

  return (
    <section
      id="team"
      className="py-20 md:py-28 bg-black relative overflow-hidden"
    >
      {/* Background gradients */}
      <div className="absolute inset-0 bg-linear-to-b from-zinc-950 via-black to-zinc-950" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/3 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/3 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 mb-6">
            <Award className="w-4 h-4 text-amber-500" />
            <span className="text-zinc-400 text-sm font-medium">
              Leadership Team
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
            Visionary Leaders
            <span className="block mt-2 text-transparent bg-clip-text bg-linear-to-r from-white to-zinc-500">
              Shaping Global Trade
            </span>
          </h2>

          <p className="text-zinc-400 text-lg max-w-3xl mx-auto leading-relaxed">
            Meet the strategic minds driving SR Jewellers forward with decades
            of combined expertise
          </p>
        </div>

        {/* Main Content - Horizontal Layout */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="grid lg:grid-cols-12 gap-6 relative">
            {/* Active Card - Takes 8/12 columns */}
            <div className="lg:col-span-8">
              <div
                key={activeIndex}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:border-amber-500/20 transition-all duration-500 h-full"
              >
                {/* Horizontal Layout for Image + Content */}
                <div className="grid md:grid-cols-5 h-full">
                  {/* Image Section - 2/5 */}
                  <div className="md:col-span-2 relative h-64 md:h-auto min-h-100 bg-linear-to-br from-zinc-900 via-black to-zinc-900">
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />

                    <div className="relative w-full h-full flex items-center justify-center p-6">
                      <div className="relative w-full h-full max-w-70">
                        <Image
                          fill
                          src={activeMember.image}
                          alt={activeMember.name}
                          className="w-full h-full object-cover rounded-xl"
                        />
                        <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent rounded-xl" />
                      </div>
                    </div>

                    {/* Role Badge - Positioned at bottom */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full">
                        <p className="text-white font-semibold text-xs text-center truncate">
                          {activeMember.title}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Content Section - 3/5 */}
                  <div className="md:col-span-3 p-6 lg:p-8 flex flex-col">
                    <div className="mb-6">
                      <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2 tracking-tight">
                        {activeMember.name}
                      </h3>
                      <div className="h-1 w-16 bg-linear-to-r from-amber-500 to-zinc-600 rounded-full" />
                    </div>

                    <p className="text-zinc-400 leading-relaxed mb-6 text-sm lg:text-base">
                      {activeMember.description}
                    </p>

                    {/* Highlights */}
                    <div className="mb-6">
                      <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">
                        Key Highlights
                      </p>
                      <ul className="space-y-2">
                        {activeMember.highlights.map((highlight, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 text-sm text-zinc-400"
                          >
                            <span className="text-amber-500 mt-1">•</span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Expertise Tags */}
                    <div className="mt-auto">
                      <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">
                        Expertise
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {activeMember.expertise.map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1.5 bg-white/5 backdrop-blur-sm border border-white/10 text-zinc-300 rounded-lg text-xs font-medium hover:bg-white/10 hover:border-amber-500/30 hover:text-white transition-all duration-300"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Icons */}
                    <div className="flex gap-3 mt-6">
                      <div className="w-10 h-10 bg-linear-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center shadow-lg shadow-amber-500/20">
                        <Briefcase className="text-white" size={18} />
                      </div>
                      <div className="w-10 h-10 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg flex items-center justify-center hover:border-amber-500/30 transition-all duration-300">
                        <TrendingUp className="text-white/70" size={18} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Inactive Card - Takes 4/12 columns, positioned at bottom right */}
            <div className="lg:col-span-4 flex items-end">
              <button
                onClick={() => setActiveIndex(inactiveIndex)}
                className="w-full group"
              >
                <div className="bg-white/5 backdrop-blur-md border border-white/10 hover:border-amber-500/20 rounded-xl overflow-hidden transition-all duration-300 p-4 lg:p-5">
                  {/* Vertical layout for inactive card */}
                  <div className="flex flex-col items-center text-center">
                    {/* Avatar */}
                    <div className="relative w-20 h-20 lg:w-24 lg:h-24 mb-4">
                      <Image
                        fill
                        src={inactiveMember.image}
                        alt={inactiveMember.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent rounded-lg" />
                    </div>

                    {/* Info */}
                    <h4 className="text-lg font-bold text-white mb-1">
                      {inactiveMember.name}
                    </h4>
                    <p className="text-xs text-zinc-400 mb-4">
                      {inactiveMember.title}
                    </p>

                    {/* Expertise tags */}
                    <div className="flex flex-wrap gap-1.5 justify-center mb-4">
                      {inactiveMember.expertise
                        .slice(0, 2)
                        .map((skill, index) => (
                          <span
                            key={index}
                            className="text-xs px-2 py-1 bg-white/5 text-zinc-400 rounded border border-white/10"
                          >
                            {skill}
                          </span>
                        ))}
                    </div>

                    {/* View button */}
                    <div className="flex items-center gap-2 text-sm text-zinc-400 group-hover:text-white transition-colors">
                      <span>View Profile</span>
                      <ChevronRight
                        size={16}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid sm:grid-cols-3 gap-6 mb-16">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.id}
                className="group text-center p-8 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-amber-500/20 transition-all duration-300"
              >
                <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 group-hover:bg-amber-500/10 group-hover:border-amber-500/30 transition-all duration-300">
                  <Icon
                    size={24}
                    className="text-white/70 group-hover:text-amber-500 transition-colors"
                  />
                </div>

                <h3 className="text-3xl font-bold text-white mb-2">
                  {stat.title}
                </h3>

                <p className="text-sm text-zinc-400">{stat.description}</p>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <p className="text-zinc-400 text-lg mb-8">
            Join our expert-led platform for premium precious metals trading
          </p>
          <Link
            href="/contact"
            type="button"
            className="group bg-white text-black px-8 py-4 rounded-xl font-semibold inline-flex items-center gap-3 hover:bg-white/90 transition-all duration-300"
          >
            <span>Connect With Our Team</span>
            <ChevronRight
              size={20}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
