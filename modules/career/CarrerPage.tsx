'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { FC, JSX } from 'react';
import type { Variants } from 'framer-motion';
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
  CircleStar,
} from 'lucide-react';
import Image from 'next/image';

const cardVariants = {
  rest: {
    scale: 1,
    opacity: 1,
  },
  hover: {
    scale: 1.05,
    transition: { duration: 0.3 },
  },
};


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

interface AnimationVariants {
  container: Variants;
  item: Variants;
  card: Variants;
  floating: Variants;
  hover: Variants;
}

type ExpandedJobId = number | null;

const benefits: readonly Benefit[] = [
  {
    id: 1,
    title: 'Competitive Salary',
    description: 'Industry-leading compensation with performance-based bonuses',
    icon: 'circleStar',
  },
  {
    id: 2,
    title: 'Innovation',
    description: 'Work on cutting-edge solutions in precious metals trading',
    icon: 'zap',
  },
  {
    id: 3,
    title: 'Health Insurance',
    description: 'Comprehensive coverage for you and your family',
    icon: 'heart',
  },
  {
    id: 4,
    title: 'Team Building',
    description: 'Regular activities and events to build strong team bonds',
    icon: 'users',
  },
  {
    id: 5,
    title: 'Friendly Environment',
    description: 'Collaborative culture with inclusive team dynamics',
    icon: 'lightbulb',
  },
  {
    id: 6,
    title: 'Remote Work',
    description: 'Flexibility to work from anywhere with work-life balance',
    icon: 'briefcase',
  },
];

const jobPositions: readonly JobPosition[] = [
  {
    id: 1,
    title: 'General Manager',
    location: 'Dubai',
    experience: '10 Years',
    type: 'Full Time',
    overview:
      'Lead and oversee daily operations while managing cross-functional teams to execute strategic growth initiatives. This is a high-impact leadership role for motivated, experienced professionals.',
    responsibilities: [
      'Lead and manage company operations and cross-functional teams',
      'Develop and execute growth strategies and business plans',
      'Monitor performance metrics and drive operational efficiency',
      'Oversee budgeting, forecasting, and financial planning',
      'Ensure compliance with legal and company standards',
    ],
    requirements: [
      '10+ years in senior management or operational leadership',
      'Strong leadership and business development skills',
      'Excellent communication and decision-making abilities',
      'Proficiency in budgeting, strategic planning, and operations',
      'Bachelor\'s degree (MBA preferred)',
    ],
    offers: [
      'Competitive salary and performance-based bonuses',
      'Opportunity to shape the company\'s future',
      'Supportive and collaborative work environment',
      'Flexible working arrangements',
      'Health benefits and paid time off',
    ],
  },
  {
    id: 2,
    title: 'HR Manager',
    location: 'Dubai',
    experience: '8 Years',
    type: 'Full Time',
    overview:
      'Build and nurture a high-performing culture by managing recruitment, employee development, and company culture initiatives.',
    responsibilities: [
      'Recruit and onboard top talent aligned with company values',
      'Develop and implement HR policies and procedures',
      'Manage employee relations and performance management',
      'Oversee training and professional development programs',
      'Ensure workplace compliance and legal requirements',
    ],
    requirements: [
      '8+ years of HR management experience',
      'Strong knowledge of HR best practices and regulations',
      'Excellent communication and interpersonal skills',
      'Experience with HRIS systems and HR analytics',
      'Bachelor\'s degree in HR, Business, or related field',
    ],
    offers: [
      'Competitive salary package',
      'Career growth and development opportunities',
      'Health and wellness benefits',
      'Flexible work arrangements',
      'Professional development budget',
    ],
  },
  {
    id: 3,
    title: 'Account Manager',
    location: 'Dubai',
    experience: '5 Years',
    type: 'Full Time',
    overview:
      'Drive revenue growth by managing key client relationships and identifying new business opportunities in the precious metals trading sector.',
    responsibilities: [
      'Manage and nurture existing client relationships',
      'Identify and pursue new business opportunities',
      'Prepare quotes and negotiate contracts',
      'Ensure client satisfaction and retention',
      'Prepare sales reports and forecasts',
    ],
    requirements: [
      '5+ years of account management experience',
      'Strong sales and negotiation skills',
      'Experience in commodities or trading (preferred)',
      'Excellent communication and presentation abilities',
      'Bachelor\'s degree in Business, Finance, or related field',
    ],
    offers: [
      'Competitive base salary + performance bonus',
      'Commission structure based on sales targets',
      'Company car allowance',
      'Health insurance and retirement benefits',
      'Career advancement opportunities',
    ],
  },
];

const cultureValues: readonly CultureValue[] = [
  {
    id: 1,
    title: 'Excellence',
    description: 'We pursue excellence in every aspect of our operations',
    icon: 'circleStar',
  },
  {
    id: 2,
    title: 'Integrity',
    description: 'Trust and transparency are the foundation of our business',
    icon: 'zap',
  },
  {
    id: 3,
    title: 'Innovation',
    description: 'We embrace change and drive industry evolution',
    icon: 'lightbulb',
  },
];

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

const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case 'circleStar':
      return <CircleStar className="w-6 h-6" />;
    case 'zap':
      return <Zap className="w-6 h-6" />;
    case 'heart':
      return <Heart className="w-6 h-6" />;
    case 'users':
      return <Users className="w-6 h-6" />;
    case 'lightbulb':
      return <Lightbulb className="w-6 h-6" />;
    case 'briefcase':
      return <Briefcase className="w-6 h-6" />;
    default:
      return null;
  }
};

const ArrowRightIcon = () => <ArrowRight size={20} />; // Declared ArrowRightIcon for use in JSX

interface CareerPageProps {
  readonly className?: string;
}

export const CareerPage: FC<CareerPageProps> = ({
  className = '',
}: CareerPageProps): JSX.Element => {
  const [expandedJobId, setExpandedJobId] = useState<ExpandedJobId>(null);
  const variants = getAnimationVariants();

  const handleJobExpand = (id: number): void => {
    setExpandedJobId(expandedJobId === id ? null : id);
  };

  return (
    <section
      id="career"
      className={`relative overflow-hidden bg-linear-to-b from-white via-amber-50/5 to-white ${className}`}
    >
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-20 right-0 w-96 h-96 bg-linear-to-br from-amber-100 to-amber-50 rounded-full opacity-30 blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-40 left-0 w-96 h-96 bg-linear-to-tr from-amber-100 to-transparent rounded-full opacity-20 blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Split Hero Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid xl:grid-cols-2 gap-12 items-center py-20 mb-20"
        >
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative lg:h-full min-h-74 sm:min-h-100 rounded-3xl hover:shadow-orange-300 md:w-140 md:mx-auto md:h-105 overflow-hidden shadow-2xl transition-shadow duration-200"
          >
            <div className="md:pb-2 pb-1 absolute inset-0 bg-linear-to-br from-amber-400 via-amber-500 to-amber-600 flex items-center justify-center">
              <div className="text-center text-white px-4 md:px-0">
                <Image className='mx-auto mt-6 mb-2 rounded-xl shadow-2xl border-2' src={'/sr-team.jpg'} height={700} width={500} alt='sr-team' />
                <p className="text-lg font-semibold">Join Our Elite Team</p>
              </div>
            </div>
          </motion.div>

          {/* Right: Hero Text */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="mb-6">
              <motion.span
                className="text-amber-600 font-bold tracking-widest uppercase text-sm"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              >
                ✨ Build Your Future
              </motion.span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-black leading-tight mb-6 text-gray-900">
              Join SR Bullion&apos;s Elite Team
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Embrace the flexibility and convenience of working from anywhere by joining our remote workforce. Enjoy the freedom to balance your professional goals with your personal life while contributing to the world&apos;s most trusted precious metals trading company.
            </p>

            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-linear-to-r from-amber-500 to-amber-600 text-white px-8 py-4 rounded-full hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-xl shadow-amber-500/30 font-bold flex items-center gap-3"
            >
              Explore Opportunities
              <ArrowRightIcon />
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={variants.container}
          className="mb-24"
        >
          <motion.h2
            variants={variants.item}
            className="text-4xl font-black text-center mb-4 text-gray-900"
          >
            Competitive Benefits
          </motion.h2>
          <motion.p
            variants={variants.item}
            className="text-center text-gray-600 text-lg mb-12 max-w-2xl mx-auto"
          >
            We invest in our people because they are our greatest asset
          </motion.p>

          <motion.div
            variants={variants.container}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {benefits.map((benefit: Benefit) => (
              <motion.div
                key={benefit.id}
                variants={cardVariants}
                whileHover="hover"
                initial="rest"
                animate="rest"
                className="group"
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-amber-100 h-full flex flex-col">
                  <div className="mb-4 inline-flex">
                    <div className="p-3 bg-linear-to-br from-amber-100 to-amber-50 rounded-xl text-amber-600">
                      {getIconComponent(benefit.icon)}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-3 text-gray-900">
                    {benefit.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed flex-1">
                    {benefit.description}
                  </p>

                  <motion.div
                    className="mt-4 flex items-center gap-2 text-amber-600 font-semibold"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    SR Jewellers <ArrowRightIcon />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Job Openings Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={variants.container}
          className="mb-24"
        >
          <motion.h2
            variants={variants.item}
            className="text-4xl font-black text-center mb-4 text-gray-900"
          >
            Current Openings
          </motion.h2>
          <motion.p
            variants={variants.item}
            className="text-center text-gray-600 text-lg mb-12 max-w-2xl mx-auto"
          >
            Explore career opportunities with competitive packages and growth potential
          </motion.p>

          <motion.div
            variants={variants.container}
            className="space-y-6"
          >
            {jobPositions.map((job: JobPosition) => (
              <motion.div
                key={job.id}
                variants={variants.card}
                className="bg-white rounded-2xl border border-amber-100 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {/* Job Header */}
                <motion.button
                  type="button"
                  onClick={() => handleJobExpand(job.id)}
                  className="w-full p-6 md:p-8 flex items-start md:items-center justify-between gap-4 hover:bg-amber-50 transition-colors"
                  whileHover={{ backgroundColor: 'rgba(251, 191, 36, 0.05)' }}
                >
                  <div className="flex-1 text-left">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {job.title}
                    </h3>

                    <div className="flex flex-wrap gap-4 md:gap-6">
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin size={18} className="text-amber-600" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock size={18} className="text-amber-600" />
                        <span>{job.experience}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Briefcase size={18} className="text-amber-600" />
                        <span>{job.type}</span>
                      </div>
                    </div>
                  </div>

                  <motion.div
                    animate={{ rotate: expandedJobId === job.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-amber-600 shrink-0"
                  >
                    <ChevronDown size={24} />
                  </motion.div>
                </motion.button>

                {/* Job Details - Expandable */}
                <motion.div
                  initial={false}
                  animate={expandedJobId === job.id ? { height: 'auto' } : { height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden border-t border-amber-100"
                >
                  <div className="p-6 md:p-8 space-y-6">
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 mb-3">
                        Position Overview
                      </h4>
                      <p className="text-gray-600 leading-relaxed">
                        {job.overview}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-lg font-bold text-gray-900 mb-3">
                        Key Responsibilities
                      </h4>
                      <ul className="space-y-2">
                        {job.responsibilities.map(
                          (responsibility: string, index: number) => (
                            <li
                              key={`${job.id}-resp-${index}`}
                              className="flex gap-3 text-gray-600"
                            >
                              <span className="text-amber-600 font-bold mt-1">
                                •
                              </span>
                              <span>{responsibility}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-lg font-bold text-gray-900 mb-3">
                        Requirements
                      </h4>
                      <ul className="space-y-2">
                        {job.requirements.map(
                          (requirement: string, index: number) => (
                            <li
                              key={`${job.id}-req-${index}`}
                              className="flex gap-3 text-gray-600"
                            >
                              <span className="text-amber-600 font-bold mt-1">
                                •
                              </span>
                              <span>{requirement}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-lg font-bold text-gray-900 mb-3">
                        What We Offer
                      </h4>
                      <ul className="space-y-2">
                        {job.offers.map((offer: string, index: number) => (
                          <li
                            key={`${job.id}-offer-${index}`}
                            className="flex gap-3 text-gray-600"
                          >
                            <span className="text-amber-600 font-bold mt-1">
                              •
                            </span>
                            <span>{offer}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full bg-linear-to-r from-amber-500 to-amber-600 text-white py-3 rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all duration-300 font-bold flex items-center justify-center gap-2"
                    >
                      Apply Now
                      <ArrowRightIcon />
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
          viewport={{ once: true, margin: '-100px' }}
          variants={variants.container}
          className="mb-24"
        >
          <motion.h2
            variants={variants.item}
            className="text-4xl font-black text-center mb-4 text-gray-900"
          >
            Our Culture & Values
          </motion.h2>
          <motion.p
            variants={variants.item}
            className="text-center text-gray-600 text-lg mb-12 max-w-2xl mx-auto"
          >
            We thrive on innovation, integrity, and impactful solutions
          </motion.p>

          <motion.div
            variants={variants.container}
            className="grid md:grid-cols-3 gap-8"
          >
            {cultureValues.map((value: CultureValue) => (
              <motion.div
                key={value.id}
                variants={cardVariants}
                whileHover="hover"
                initial="rest"
                animate="rest"
                className="group"
              >
                <div className="bg-linear-to-br from-amber-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-amber-100 h-full flex flex-col">
                  <div className="mb-6 inline-flex">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                      className="p-4 bg-linear-to-br from-amber-400 to-amber-600 rounded-2xl text-white"
                    >
                      {getIconComponent(value.icon)}
                    </motion.div>
                  </div>

                  <h3 className="text-2xl font-bold mb-3 text-gray-900">
                    {value.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed flex-1">
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
          viewport={{ once: true, margin: '-100px' }}
          variants={variants.container}
          className="py-20 text-center"
        >
          <motion.h2
            variants={variants.item}
            className="text-4xl font-black mb-6 text-gray-900"
          >
            Ready to Join Us?
          </motion.h2>

          <motion.p
            variants={variants.item}
            className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto"
          >
            Apply now to become part of a dynamic team that shapes the future of precious metals trading
          </motion.p>

          <motion.button
            variants={variants.item}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            className="group bg-linear-to-r from-amber-500 to-amber-600 text-white px-8 py-4 rounded-full hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-xl shadow-amber-500/30 hover:shadow-amber-500/50 font-bold flex items-center gap-3 mx-auto"
          >
            View All Opportunities
            <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              <ArrowRightIcon />
            </motion.div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};
