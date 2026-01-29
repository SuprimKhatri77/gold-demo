"use client";

import { useState } from "react";
import {
  Award,
  Briefcase,
  TrendingUp,
  ChevronRight,
  Globe,
  Shield,
  BarChart3,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const teamMembers = [
  {
    id: 1,
    name: "Mr. Shitiz Garg",
    title: "Managing Director & Founder",
    description:
      "Strategic leader with over nine years specializing in institutional precious metals trading and global business development. Drives the Synergy Finvest group's expansion across commodities, energy, and strategic investments with a focus on sustainable value creation.",
    highlights: [
      "9+ years institutional bullion trading expertise",
      "Architect of global market expansion initiatives",
      "Supply chain optimization and logistics innovation",
      "Strategic capital allocation and risk management",
    ],
    expertise: [
      "Institutional Trading",
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
      "Chartered accountant and strategic advisor with comprehensive experience in commodities trading, financial governance, and enterprise development. Former senior roles at Deloitte, KPMG, and Grant Thornton, bringing institutional expertise to precious metals markets.",
    highlights: [
      "Chartered Accountant with Big Four experience",
      "10+ years leading commodity trading ventures",
      "Expert in financial structuring and governance",
      "Investment advisory and strategic growth architect",
    ],
    expertise: [
      "Financial Strategy",
      "Trading Operations",
      "Corporate Governance",
      "Business Development",
    ],
    image: "/kush-geol.jpg",
  },
];

const stats = [
  {
    id: "experience",
    title: "20+ Years",
    description: "Combined Industry Leadership",
    icon: Award,
  },
  {
    id: "reach",
    title: "Global Network",
    description: "International Trading Infrastructure",
    icon: Globe,
  },
  {
    id: "excellence",
    title: "Excellence",
    description: "Institutional-Grade Standards",
    icon: Shield,
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
      className="py-20 md:py-28 bg-linear-to-b from-slate-950 via-blue-950 to-slate-950 relative overflow-hidden"
    >
      {/* Grid Pattern Background */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Floating gradient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 mb-6">
            <Award className="w-4 h-4 text-cyan-400" />
            <span className="text-zinc-400 text-sm font-medium">
              Executive Leadership
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
            Strategic Leaders
            <span className="block mt-2 bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Driving Global Trade
            </span>
          </h2>

          <p className="text-zinc-400 text-lg max-w-3xl mx-auto leading-relaxed">
            Meet the institutional expertise powering SR Jewellers&apos; position as a leading precious metals trading platform
          </p>
        </div>

        {/* Main Content - Horizontal Layout */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="grid lg:grid-cols-12 gap-6 relative">
            {/* Active Card - Takes 8/12 columns */}
            <div className="lg:col-span-8">
              <div
                key={activeIndex}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-sm overflow-hidden hover:border-cyan-400/40 transition-all duration-500 h-full group"
              >
                {/* Horizontal Layout for Image + Content */}
                <div className="grid md:grid-cols-5 h-full">
                  {/* Image Section - 2/5 */}
                  <div className="md:col-span-2 relative h-64 md:h-auto min-h-100 bg-linear-to-br from-slate-900 via-blue-950 to-slate-900">
                    <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-transparent to-transparent" />

                    <div className="relative w-full h-full flex items-center justify-center p-6">
                      <div className="relative w-full h-full max-w-70">
                        <Image
                          fill
                          src={activeMember.image}
                          alt={activeMember.name}
                          className="w-full h-full object-cover rounded-sm"
                        />
                        <div className="absolute inset-0 bg-linear-to-br from-blue-500/10 to-transparent rounded-xl" />
                      </div>
                    </div>

                    {/* Role Badge - Positioned at bottom */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-white/10 backdrop-blur-xl border border-white/20 px-4 py-2 rounded-xl group-hover:border-cyan-400/40 transition-all duration-300">
                        <p className="text-white font-semibold text-xs text-center truncate">
                          {activeMember.title}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Content Section - 3/5 */}
                  <div className="md:col-span-3 p-6 lg:p-8 flex flex-col">
                    <div className="mb-6">
                      <h3 className="text-2xl lg:text-3xl font-bold text-white mb-3 tracking-tight group-hover:text-cyan-400 transition-colors duration-300">
                        {activeMember.name}
                      </h3>
                      <div className="h-1 w-16 bg-linear-to-r from-blue-500 to-cyan-500 rounded-full" />
                    </div>

                    <p className="text-zinc-400 leading-relaxed mb-6 text-sm lg:text-base">
                      {activeMember.description}
                    </p>

                    {/* Highlights */}
                    <div className="mb-6">
                      <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                        <BarChart3 size={14} className="text-cyan-400" />
                        Key Achievements
                      </p>
                      <ul className="space-y-2">
                        {activeMember.highlights.map((highlight, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 text-sm text-zinc-400"
                          >
                            <span className="text-cyan-400 mt-1">•</span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Expertise Tags */}
                    <div className="mt-auto">
                      <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">
                        Core Expertise
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {activeMember.expertise.map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1.5 bg-white/5 backdrop-blur-xl border border-white/10 text-zinc-300 rounded-lg text-xs font-medium hover:bg-linear-to-r hover:from-blue-600/10 hover:to-cyan-600/10 hover:border-cyan-400/40 hover:text-cyan-400 transition-all duration-300"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Icons */}
                    <div className="flex gap-3 mt-6">
                      <div className="w-10 h-10 bg-linear-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-all duration-300">
                        <Briefcase className="text-white" size={18} />
                      </div>
                      <div className="w-10 h-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg flex items-center justify-center hover:border-cyan-400/40 hover:bg-white/10 transition-all duration-300">
                        <TrendingUp className="text-white/70 hover:text-cyan-400" size={18} />
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
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 hover:border-cyan-400/40 rounded-sm overflow-hidden transition-all duration-300 p-4 lg:p-5 hover:scale-102 hover:-translate-y-1">
                  {/* Vertical layout for inactive card */}
                  <div className="flex flex-col items-center text-center">
                    {/* Avatar */}
                    <div className="relative w-20 h-20 lg:w-24 lg:h-24 mb-4">
                      <Image
                        fill
                        src={inactiveMember.image}
                        alt={inactiveMember.name}
                        className="w-full h-full object-cover rounded-sm"
                      />
                      <div className="absolute inset-0 bg-linear-to-br from-blue-500/10 to-transparent rounded-xl" />
                    </div>

                    {/* Info */}
                    <h4 className="text-lg font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors duration-300">
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
                            className="text-xs px-2 py-1 bg-white/5 text-zinc-400 rounded-lg border border-white/10 group-hover:border-cyan-400/40 transition-colors duration-300"
                          >
                            {skill}
                          </span>
                        ))}
                    </div>

                    {/* View button */}
                    <div className="flex items-center gap-2 text-sm text-zinc-400 group-hover:text-cyan-400 transition-colors duration-300">
                      <span>View Profile</span>
                      <ChevronRight
                        size={16}
                        className="group-hover:translate-x-1 transition-transform duration-300"
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
                className="group text-center p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-cyan-400/40 transition-all duration-300 hover:scale-105 hover:-translate-y-1"
              >
                <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-xl bg-linear-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-xl border border-white/10 group-hover:border-cyan-400/40 group-hover:scale-110 transition-all duration-300">
                  <Icon
                    size={24}
                    className="text-white/70 group-hover:text-cyan-400 transition-colors duration-300"
                  />
                </div>

                <h3 className="text-3xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                  {stat.title}
                </h3>

                <p className="text-sm text-zinc-400">{stat.description}</p>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-linear-to-br from-blue-600/10 via-cyan-600/10 to-blue-600/5 backdrop-blur-xl border border-blue-400/20 rounded-2xl p-12 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl" />

          <div className="relative z-10">
            <p className="text-zinc-400 text-lg mb-8 max-w-2xl mx-auto">
              Partner with our executive team for institutional-grade precious metals trading and strategic market access
            </p>
            <Link
              href="/contact"
              className="group bg-linear-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 rounded-xl font-semibold inline-flex items-center gap-3 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 hover:scale-105 hover:-translate-y-1"
            >
              <span>Connect With Our Team</span>
              <ChevronRight
                size={20}
                className="group-hover:translate-x-1 transition-transform duration-300"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}