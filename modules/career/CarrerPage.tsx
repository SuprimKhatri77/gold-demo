"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import {
  Briefcase,
  MapPin,
  Clock,
  Users,
  Zap,
  Heart,
  Lightbulb,
  ChevronDown,
  ArrowRight,
  CircleDollarSign,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Type definitions
interface Benefit {
  readonly id: number;
  readonly title: string;
  readonly description: string;
  readonly icon: string;
}

interface JobPosition {
  readonly id: number;
  readonly title: string;
  readonly location: string;
  readonly experience: string;
  readonly type: string;
  readonly overview: string;
  readonly responsibilities: readonly string[];
  readonly requirements: readonly string[];
  readonly offers: readonly string[];
}

interface CultureValue {
  readonly id: number;
  readonly title: string;
  readonly description: string;
  readonly icon: string;
}

const benefits: readonly Benefit[] = [
  {
    id: 1,
    title: "Competitive Salary",
    description: "Industry-leading compensation with performance-based bonuses",
    icon: "circleStar",
  },
  {
    id: 2,
    title: "Innovation",
    description: "Work on cutting-edge solutions in precious metals trading",
    icon: "zap",
  },
  {
    id: 3,
    title: "Health Insurance",
    description: "Comprehensive coverage for you and your family",
    icon: "heart",
  },
  {
    id: 4,
    title: "Team Building",
    description: "Regular activities and events to build strong team bonds",
    icon: "users",
  },
  {
    id: 5,
    title: "Friendly Environment",
    description: "Collaborative culture with inclusive team dynamics",
    icon: "lightbulb",
  },
  {
    id: 6,
    title: "Remote Work",
    description: "Flexibility to work from anywhere with work-life balance",
    icon: "briefcase",
  },
];

const jobPositions: readonly JobPosition[] = [
  {
    id: 1,
    title: "General Manager",
    location: "Dubai",
    experience: "10 Years",
    type: "Full Time",
    overview:
      "Lead and oversee daily operations while managing cross-functional teams to execute strategic growth initiatives. This is a high-impact leadership role for motivated, experienced professionals.",
    responsibilities: [
      "Lead and manage company operations and cross-functional teams",
      "Develop and execute growth strategies and business plans",
      "Monitor performance metrics and drive operational efficiency",
      "Oversee budgeting, forecasting, and financial planning",
      "Ensure compliance with legal and company standards",
    ],
    requirements: [
      "10+ years in senior management or operational leadership",
      "Strong leadership and business development skills",
      "Excellent communication and decision-making abilities",
      "Proficiency in budgeting, strategic planning, and operations",
      "Bachelor's degree (MBA preferred)",
    ],
    offers: [
      "Competitive salary and performance-based bonuses",
      "Opportunity to shape the company's future",
      "Supportive and collaborative work environment",
      "Flexible working arrangements",
      "Health benefits and paid time off",
    ],
  },
  {
    id: 2,
    title: "HR Manager",
    location: "Dubai",
    experience: "8 Years",
    type: "Full Time",
    overview:
      "Build and nurture a high-performing culture by managing recruitment, employee development, and company culture initiatives.",
    responsibilities: [
      "Recruit and onboard top talent aligned with company values",
      "Develop and implement HR policies and procedures",
      "Manage employee relations and performance management",
      "Oversee training and professional development programs",
      "Ensure workplace compliance and legal requirements",
    ],
    requirements: [
      "8+ years of HR management experience",
      "Strong knowledge of HR best practices and regulations",
      "Excellent communication and interpersonal skills",
      "Experience with HRIS systems and HR analytics",
      "Bachelor's degree in HR, Business, or related field",
    ],
    offers: [
      "Competitive salary package",
      "Career growth and development opportunities",
      "Health and wellness benefits",
      "Flexible work arrangements",
      "Professional development budget",
    ],
  },
  {
    id: 3,
    title: "Account Manager",
    location: "Dubai",
    experience: "5 Years",
    type: "Full Time",
    overview:
      "Drive revenue growth by managing key client relationships and identifying new business opportunities in the precious metals trading sector.",
    responsibilities: [
      "Manage and nurture existing client relationships",
      "Identify and pursue new business opportunities",
      "Prepare quotes and negotiate contracts",
      "Ensure client satisfaction and retention",
      "Prepare sales reports and forecasts",
    ],
    requirements: [
      "5+ years of account management experience",
      "Strong sales and negotiation skills",
      "Experience in commodities or trading (preferred)",
      "Excellent communication and presentation abilities",
      "Bachelor's degree in Business, Finance, or related field",
    ],
    offers: [
      "Competitive base salary + performance bonus",
      "Commission structure based on sales targets",
      "Company car allowance",
      "Health insurance and retirement benefits",
      "Career advancement opportunities",
    ],
  },
];

const cultureValues: readonly CultureValue[] = [
  {
    id: 1,
    title: "Excellence",
    description: "We pursue excellence in every aspect of our operations",
    icon: "circleStar",
  },
  {
    id: 2,
    title: "Integrity",
    description: "Trust and transparency are the foundation of our business",
    icon: "zap",
  },
  {
    id: 3,
    title: "Innovation",
    description: "We embrace change and drive industry evolution",
    icon: "lightbulb",
  },
];

const getIconComponent = (iconName: string) => {
  const iconProps = { className: "w-6 h-6" };
  switch (iconName) {
    case "circleStar":
      return <CircleDollarSign {...iconProps} />;
    case "zap":
      return <Zap {...iconProps} />;
    case "heart":
      return <Heart {...iconProps} />;
    case "users":
      return <Users {...iconProps} />;
    case "lightbulb":
      return <Lightbulb {...iconProps} />;
    case "briefcase":
      return <Briefcase {...iconProps} />;
    default:
      return null;
  }
};

export default function CareerPage() {
  const [expandedJobId, setExpandedJobId] = useState<number | null>(null);
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

  const handleJobExpand = (id: number): void => {
    setExpandedJobId(expandedJobId === id ? null : id);
  };

  return (
    <section id="career" className="relative overflow-hidden bg-slate-950">
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
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-12 items-center py-20 mb-20"
        >
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative lg:h-full min-h-74 sm:min-h-100 rounded-sm hover:shadow-blue-800 md:w-140 md:mx-auto md:h-105 overflow-hidden shadow-2xl transition-shadow duration-200"
          >
            <div className="md:pb-2 pb-1 absolute inset-0 bg-linear-to-br from-blue-600 via-cyan-500 to-blue-700 flex items-center justify-center">
              <div className="text-center text-white px-4 md:px-0">
                <Image
                  className="mx-auto mt-6 mb-2 rounded-sm shadow-2xl border-2"
                  src={"/sr-team.jpg"}
                  height={700}
                  width={500}
                  alt="sr-team"
                />
                <p className="text-lg font-semibold">Join Our Elite Team</p>
              </div>
            </div>
          </motion.div>

          {/* Right: Hero Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 mb-6">
              <Zap className="text-cyan-400" size={16} />
              <span className="text-zinc-400 text-sm font-medium">
                Build Your Future
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-white">
              Join SR Jewellers Elite Team
            </h1>

            <p className="text-lg text-zinc-400 leading-relaxed mb-8">
              Embrace the flexibility and convenience of working from anywhere
              by joining our remote workforce. Enjoy the freedom to balance your
              professional goals with your personal life while contributing to
              the world&apos;s most trusted precious metals trading company.
            </p>

            <motion.button
              onClick={() => (window.location.href = "#current-openings")}
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="bg-linear-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-blue-500/20 font-semibold inline-flex items-center gap-3"
            >
              Explore Opportunities
              <ArrowRight size={20} />
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="mb-20"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4 text-white"
          >
            Competitive Benefits
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-center text-zinc-400 text-lg mb-12 max-w-2xl mx-auto"
          >
            We invest in our people because they are our greatest asset
          </motion.p>

          <motion.div
            variants={containerVariants}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {benefits.map((benefit) => (
              <motion.div
                key={benefit.id}
                variants={cardVariants}
                whileHover={{ y: -4 }}
                className="group"
              >
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 hover:border-cyan-400/40 p-6 h-full transition-all duration-300">
                  <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-sm p-3 transition-all duration-300 group-hover:bg-blue-500/20 group-hover:border-cyan-400/40 inline-flex items-center justify-center mb-4">
                    <span className="text-white group-hover:text-cyan-400 transition-colors">
                      {getIconComponent(benefit.icon)}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold mb-2 text-white group-hover:text-cyan-400 transition-colors">
                    {benefit.title}
                  </h3>

                  <p className="text-zinc-400 text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Job Openings Section */}
        <motion.div
          id="current-openings"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="mb-20"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4 text-white"
          >
            Current Openings
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-center text-zinc-400 text-lg mb-12 max-w-2xl mx-auto"
          >
            Explore career opportunities with competitive packages and growth
            potential
          </motion.p>

          <motion.div variants={containerVariants} className="space-y-6">
            {jobPositions.map((job) => (
              <motion.div
                key={job.id}
                variants={cardVariants}
                className="bg-white/5 backdrop-blur-xl border border-white/10 hover:border-cyan-400/40 overflow-hidden transition-all duration-300"
              >
                {/* Job Header */}
                <motion.button
                  type="button"
                  onClick={() => handleJobExpand(job.id)}
                  className="w-full p-6 md:p-8 flex items-start md:items-center justify-between gap-4 hover:bg-white/5 transition-colors text-left"
                >
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
                      {job.title}
                    </h3>

                    <div className="flex flex-wrap gap-4 md:gap-6">
                      <div className="flex items-center gap-2 text-zinc-400">
                        <MapPin size={16} className="text-cyan-400" />
                        <span className="text-sm">{job.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-zinc-400">
                        <Clock size={16} className="text-cyan-400" />
                        <span className="text-sm">{job.experience}</span>
                      </div>
                      <div className="flex items-center gap-2 text-zinc-400">
                        <Briefcase size={16} className="text-cyan-400" />
                        <span className="text-sm">{job.type}</span>
                      </div>
                    </div>
                  </div>

                  <motion.div
                    animate={{ rotate: expandedJobId === job.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-cyan-400 shrink-0"
                  >
                    <ChevronDown size={24} />
                  </motion.div>
                </motion.button>

                {/* Job Details - Expandable */}
                <motion.div
                  initial={false}
                  animate={
                    expandedJobId === job.id
                      ? { height: "auto" }
                      : { height: 0 }
                  }
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden border-t border-white/10"
                >
                  <div className="p-6 md:p-8 space-y-6">
                    <div>
                      <h4 className="text-base font-semibold text-white mb-3">
                        Position Overview
                      </h4>
                      <p className="text-zinc-400 text-sm leading-relaxed">
                        {job.overview}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-base font-semibold text-white mb-3">
                        Key Responsibilities
                      </h4>
                      <ul className="space-y-2">
                        {job.responsibilities.map((responsibility, index) => (
                          <li
                            key={index}
                            className="flex gap-3 text-zinc-400 text-sm"
                          >
                            <span className="text-cyan-400 font-bold mt-0.5">
                              •
                            </span>
                            <span>{responsibility}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-base font-semibold text-white mb-3">
                        Requirements
                      </h4>
                      <ul className="space-y-2">
                        {job.requirements.map((requirement, index) => (
                          <li
                            key={index}
                            className="flex gap-3 text-zinc-400 text-sm"
                          >
                            <span className="text-cyan-400 font-bold mt-0.5">
                              •
                            </span>
                            <span>{requirement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-base font-semibold text-white mb-3">
                        What We Offer
                      </h4>
                      <ul className="space-y-2">
                        {job.offers.map((offer, index) => (
                          <li
                            key={index}
                            className="flex gap-3 text-zinc-400 text-sm"
                          >
                            <span className="text-cyan-400 font-bold mt-0.5">
                              •
                            </span>
                            <span>{offer}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-linear-to-r from-blue-600 to-cyan-600 text-white py-3 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 font-semibold flex items-center justify-center gap-2"
                    >
                      Apply Now
                      <ArrowRight size={18} />
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Culture Values Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="mb-20"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4 text-white"
          >
            Our Culture & Values
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-center text-zinc-400 text-lg mb-12 max-w-2xl mx-auto"
          >
            We thrive on innovation, integrity, and impactful solutions
          </motion.p>

          <motion.div
            variants={containerVariants}
            className="grid md:grid-cols-3 gap-6"
          >
            {cultureValues.map((value) => (
              <motion.div
                key={value.id}
                variants={cardVariants}
                whileHover={{ y: -4 }}
                className="group"
              >
                <div className="bg-linear-to-br from-blue-500/10 to-cyan-600/5 backdrop-blur-xl border border-blue-500/20 p-8 h-full transition-all duration-300 hover:border-cyan-400/40">
                  <div className="mb-6 inline-flex">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="p-4 bg-linear-to-br from-blue-600 to-cyan-600 rounded-sm text-white shadow-lg shadow-blue-500/20"
                    >
                      {getIconComponent(value.icon)}
                    </motion.div>
                  </div>

                  <h3 className="text-xl font-bold mb-3 text-white">
                    {value.title}
                  </h3>

                  <p className="text-zinc-400 text-sm leading-relaxed">
                    {value.description}
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
          className="py-20 text-center"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold mb-6 text-white"
          >
            Ready to Join Us?
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-lg text-zinc-400 mb-8 max-w-2xl mx-auto"
          >
            Apply now to become part of a dynamic team that shapes the future of
            precious metals trading
          </motion.p>

          <motion.button
            onClick={() => router.push("/account-opening")}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            className="group bg-linear-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-blue-500/20 font-semibold inline-flex items-center gap-3"
          >
            Apply Now
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