'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { FC, JSX } from 'react';
import type { Variants } from 'framer-motion';
import {
  FileText,
  MapPin,
  Users,
  Shield,
  CheckCircle,
  Download,
  ArrowRight,
  ChevronDown,
  Building2,
  Lock,
  Zap,
  CheckCheck,
  User,
  UserCircle,
} from 'lucide-react';
import { ApplicationForm } from './ApplicationForm';

// Type definitions
interface RequirementCategory {
  readonly id: number;
  readonly title: string;
  readonly description: string;
  readonly items: readonly string[];
  readonly icon: string;
}

interface ProcessStep {
  readonly id: number;
  readonly number: number;
  readonly title: string;
  readonly description: string;
  readonly icon: string;
}

interface DocumentResource {
  readonly id: number;
  readonly title: string;
  readonly description: string;
  readonly type: string;
  readonly icon: string;
  readonly downloadUrl: string;
}

interface AccountBenefit {
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
  stagger: Variants;
}

type ExpandedCategoryId = number | null;

const requirementCategories: readonly RequirementCategory[] = [
  {
    id: 1,
    title: 'Proof of Legal Existence',
    description: 'Company registration and incorporation documents',
    icon: 'building',
    items: [
      'Valid Trade License (if applicable)',
      'Certificate of Incorporation',
      'Memorandum & Articles of Association',
      'Tax Registration Certificate (if applicable)',
      'Shareholders Register',
    ],
  },
  {
    id: 2,
    title: 'Address Details',
    description: 'Physical address verification documents',
    icon: 'map',
    items: [
      'Proof of physical address in country of incorporation',
      'Proof of physical address in UAE (if applicable)',
    ],
  },
  {
    id: 3,
    title: 'Contact Information',
    description: 'Official communication details',
    icon: 'users',
    items: [
      'Official email address',
      'Phone number',
      'Website (if available)',
    ],
  },
  {
    id: 4,
    title: 'Key Individuals',
    description: 'Details of authorized personnel',
    icon: 'shield',
    items: [
      'Shareholders / Beneficial Owners',
      'Authorized Signatories',
      'Persons authorized to act on behalf of company',
      'Identities and addresses of all individuals',
    ],
  },
];

const processSteps: readonly ProcessStep[] = [
  {
    id: 1,
    number: 1,
    title: 'Submit Application',
    description: 'Complete the account opening form with all required information',
    icon: 'file',
  },
  {
    id: 2,
    number: 2,
    title: 'Document Verification',
    description: 'Our compliance team reviews all submitted documents',
    icon: 'shield',
  },
  {
    id: 3,
    number: 3,
    title: 'Due Diligence Review',
    description: 'Comprehensive KYC and AML compliance checks',
    icon: 'lock',
  },
  {
    id: 4,
    number: 4,
    title: 'Account Activation',
    description: 'Your account is approved and ready for trading',
    icon: 'zap',
  },
];

const documentResources: readonly DocumentResource[] = [
  {
    id: 1,
    title: 'Account Opening Form (Corporate)',
    description: 'Complete application form for corporate accounts',
    type: 'PDF',
    icon: 'file',
    downloadUrl: '/forms/account-opening-corporate.pdf',
  },
  {
    id: 2,
    title: 'AML Policy',
    description: 'Anti-Money Laundering compliance policy',
    type: 'PDF',
    icon: 'shield',
    downloadUrl: '/policies/aml-policy.pdf',
  },
  {
    id: 3,
    title: 'Supply Chain Policy',
    description: 'Ethical sourcing and supply chain standards',
    type: 'PDF',
    icon: 'zap',
    downloadUrl: '/policies/supply-chain-policy.pdf',
  },
];

const accountBenefits: readonly AccountBenefit[] = [
  {
    id: 1,
    title: 'Competitive Pricing',
    description: 'Access to competitive market rates for all precious metals',
    icon: 'zap',
  },
  {
    id: 2,
    title: 'Global Reach',
    description: 'Trade across multiple markets with our global network',
    icon: 'map',
  },
  {
    id: 3,
    title: 'Expert Support',
    description: 'Dedicated account managers and 24/7 customer support',
    icon: 'users',
  },
  {
    id: 4,
    title: 'Secure Trading',
    description: 'Industry-leading security and compliance standards',
    icon: 'lock',
  },
  {
    id: 5,
    title: 'Fast Settlement',
    description: 'Quick and efficient settlement processes',
    icon: 'zap',
  },
  {
    id: 6,
    title: 'Transparency',
    description: 'Complete transparency in all pricing and operations',
    icon: 'shield',
  },
];

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
        duration: 0.8,
        ease: 'easeOut',
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
        duration: 0.7,
        ease: 'easeOut',
      },
    },
  } as Variants,
  floating: {
    initial: { y: 0 },
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  } as Variants,
  hover: {
    rest: { scale: 1 },
    hover: {
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  } as Variants,
  stagger: {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  } as Variants,
});

interface AccountOpeningProps {
  readonly className?: string;
}

export const AccountOpening: FC<AccountOpeningProps> = ({
  className = '',
}: AccountOpeningProps): JSX.Element => {
  const [isApplicationFormOpen, setApplicationFormOpen] = useState(false);

  const handleOpenApplicationForm = () => {
    setApplicationFormOpen(!isApplicationFormOpen);
  }

  const [expandedCategory, setExpandedCategory] = useState<ExpandedCategoryId>(1);
  const variants = getAnimationVariants();

  const handleMouseEnter = (id: number): void => {
    setExpandedCategory(id);
  };

  const handleMouseLeave = (): void => {
    setExpandedCategory(null);
  };

  const toggleCategory = (id: number): void => {
    setExpandedCategory(expandedCategory === id ? null : id);
  };

  const renderIcon = (iconName: string): JSX.Element => {
    const iconProps = { className: 'w-6 h-6', strokeWidth: 1.5 };
    const iconMap: Record<string, JSX.Element> = {
      building: <Building2 {...iconProps} />,
      map: <MapPin {...iconProps} />,
      users: <Users {...iconProps} />,
      shield: <Shield {...iconProps} />,
      file: <FileText {...iconProps} />,
      lock: <Lock {...iconProps} />,
      zap: <Zap {...iconProps} />,
    };
    return iconMap[iconName] || <FileText {...iconProps} />;
  };

  return (
    <section
      id="account-opening"
      className={`py-28 bg-linear-to-b from-white via-amber-50/5 to-white relative overflow-hidden ${className}`}
    >
      {/* Floating background elements */}
      <div className="absolute top-10 left-5 w-72 h-72 bg-amber-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-amber-50 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-pulse" />

      <div className="relative z-10 container mx-auto px-4 md:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={variants.container}
          className="mb-20"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Image */}
            <motion.div
              variants={variants.item}
              className="relative h-96 rounded-3xl overflow-hidden"
            >
              <div className="w-full h-full bg-linear-to-br from-amber-400 via-amber-300 to-orange-300 relative flex items-center justify-center">
                <motion.div
                  animate="animate"
                  initial="initial"
                  variants={variants.floating}
                >
                  <UserCircle className="w-32 h-32 text-amber-700 opacity-50" />
                </motion.div>
              </div>
            </motion.div>

            {/* Right: Content */}
            <motion.div variants={variants.item} className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                >
                  <CheckCheck className="text-amber-600 w-6 h-6" />
                </motion.div>
                <span className="text-amber-600 font-bold tracking-widest uppercase text-sm">
                  Simple & Fast Process
                </span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-black leading-tight text-balance">
                Open Your Account in 4 Steps
              </h1>

              <p className="text-lg text-gray-600 leading-relaxed">
                Join SR Bullion and start trading precious metals with confidence. Our streamlined account opening
                process ensures you get started quickly while maintaining highest compliance standards.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <motion.button
                  type="button"
                  onClick={handleOpenApplicationForm}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-linear-to-r from-amber-500 to-amber-600 text-white font-bold rounded-full hover:from-amber-600 hover:to-amber-700 transition-all shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2"
                >
                  Start Application
                  <ArrowRight className="w-5 h-5" />
                </motion.button>

                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 border-2 border-amber-200 text-amber-700 font-bold rounded-full hover:bg-amber-50 transition-all"
                >
                  <a href="#required_document">Required Documents</a>
                </motion.button>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Process Steps */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={variants.container}
          className="mb-24"
        >
          <motion.div variants={variants.item} className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4 text-balance">Account Opening Process</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Follow our straightforward 4-step process to open your account
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            {processSteps.map((step: ProcessStep) => (
              <motion.div
                key={step.id}
                variants={variants.card}
                className="relative group"
              >
                <div className="bg-white rounded-2xl p-8 border border-amber-100 h-full flex flex-col hover:shadow-xl hover:border-amber-300 transition-all duration-300">
                  {/* Step Number */}
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-linear-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: 2 }}
                    transition={{ duration: 0.2 }}
                    className="mb-4 text-amber-600"
                  >
                    {renderIcon(step.icon)}
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-xl font-bold mb-2 text-gray-900">{step.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                </div>

                {/* Connector line */}
                {step.id < 4 && (
                  <div className="hidden md:block absolute top-16 -right-6 w-6 h-0.5 bg-linear-to-r from-amber-300 to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Requirements Section */}
        <motion.div
          id='required_document'
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={variants.container}
          className="mb-24"
        >
          <motion.div variants={variants.item} className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4 text-balance">Required Documents</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              All documents must be in English or accompanied by certified translation
            </p>
          </motion.div>

          <div className="space-y-4">
            {requirementCategories.map((category: RequirementCategory) => (
              <motion.div
                key={category.id}
                variants={variants.item}
                className="bg-white rounded-2xl border border-amber-100 overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <motion.button
                  type="button"
                  onClick={() => toggleCategory(category.id)}
                  onMouseEnter={() => handleMouseEnter(category.id)}
                  onMouseLeave={handleMouseLeave}
                  className="w-full p-6 flex items-center justify-between hover:bg-amber-50/50 transition-colors duration-200"
                >
                  <div className="flex items-center gap-4 text-left flex-1">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 10 }}
                      className="text-amber-600 shrink-0"
                    >
                      {renderIcon(category.icon)}
                    </motion.div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">{category.title}</h3>
                      <p className="text-sm text-gray-600">{category.description}</p>
                    </div>
                  </div>

                  <motion.div
                    animate={{ rotate: expandedCategory === category.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-6 h-6 text-amber-600 shrink-0" />
                  </motion.div>
                </motion.button>

                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: expandedCategory === category.id ? 'auto' : 0,
                    opacity: expandedCategory === category.id ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden border-t border-amber-100"
                >
                  <div className="p-6 bg-linear-to-b from-amber-50/50 to-transparent">
                    <ul className="space-y-3">
                      {category.items.map((item: string, index: number) => (
                        <motion.li
                          key={`${category.id}-${index}`}
                          custom={index}
                          variants={variants.stagger}
                          initial="hidden"
                          animate={expandedCategory === category.id ? 'visible' : 'hidden'}
                          className="flex items-start gap-3 text-gray-700"
                        >
                          <CheckCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                          <span className="text-sm leading-relaxed">{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Document Resources */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={variants.container}
          className="mb-24"
        >
          <motion.div variants={variants.item} className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4 text-balance">Download Resources</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Get all the forms and policies you need
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {documentResources.map((doc: DocumentResource) => (
              <motion.div
                key={doc.id}
                variants={variants.card}
                whileHover="hover"
                initial="rest"
                animate="rest"
                className="group"
              >
                <motion.div
                  variants={variants.hover}
                  className="bg-white rounded-2xl p-8 border border-amber-100 h-full flex flex-col"
                >
                  <motion.div
                    whileHover={{ rotate: 2 }}
                    className="mb-4 text-amber-600 inline-block"
                  >
                    {renderIcon(doc.icon)}
                  </motion.div>

                  <h3 className="font-bold text-lg mb-2 text-gray-900">{doc.title}</h3>
                  <p className="text-sm text-gray-600 mb-6 grow">{doc.description}</p>

                  <div className="flex items-center justify-between pt-4 border-t border-amber-100">
                    <span className="text-xs font-semibold text-amber-600 uppercase">{doc.type}</span>
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-amber-600 hover:text-amber-700 transition-colors"
                    >
                      <Download className="w-5 h-5" />
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={variants.container}
          className="mb-24"
        >
          <motion.div variants={variants.item} className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4 text-balance">Why Choose SR Bullion?</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Experience premium service and market-leading advantages
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {accountBenefits.map((benefit: AccountBenefit) => (
              <motion.div
                key={benefit.id}
                variants={variants.card}
                whileHover="hover"
                initial="rest"
                animate="rest"
                className="group"
              >
                <motion.div
                  variants={variants.hover}
                  className="bg-linear-to-br from-white to-amber-50/30 rounded-2xl p-8 border border-amber-100 h-full flex flex-col"
                >
                  <motion.div
                    whileHover={{ rotate: 2 }}
                    transition={{ duration: 0.2 }}
                    className="mb-4 text-amber-600 inline-block"
                  >
                    {renderIcon(benefit.icon)}
                  </motion.div>

                  <h3 className="font-bold text-lg mb-3 text-gray-900">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={variants.container}
          className="text-center"
        >
          <motion.div
            variants={variants.item}
            className="bg-linear-to-r from-amber-500/10 to-orange-500/10 rounded-3xl p-12 border border-amber-200"
          >
            <h2 className="text-4xl font-black mb-4 text-balance">Ready to Get Started?</h2>
            <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied clients trading precious metals with SR Bullion
            </p>

            <motion.button
              type="button"
              variants={variants.item}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 bg-linear-to-r from-amber-500 to-amber-600 text-white font-bold rounded-full hover:from-amber-600 hover:to-amber-700 transition-all shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2 mx-auto"
            >
              Contact Our Team
              <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
      {
        isApplicationFormOpen && (
          // <div className=''>
          <ApplicationForm onClose={() => setApplicationFormOpen(!isApplicationFormOpen)} />
          // </div>
        )
      }
    </section>
  );
};
