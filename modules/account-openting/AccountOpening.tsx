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
  const [expandedCategory, setExpandedCategory] = useState<number | null>(1);

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
        ease: 'easeOut',
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
        ease: 'easeOut',
      },
    },
  };

  const toggleCategory = (id: number): void => {
    setExpandedCategory(expandedCategory === id ? null : id);
  };

  const renderIcon = (iconName: string): JSX.Element => {
    const iconProps = { className: 'w-6 h-6 group-hover:text-amber-500', strokeWidth: 1.5 };
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
      className={`py-24 bg-black relative overflow-hidden ${className}`}
    >
      {/* Subtle background linears */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="mb-20"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Image */}
            <motion.div
              variants={itemVariants}
              className="relative h-96 rounded-2xl overflow-hidden"
            >
              <div className="w-full h-full bg-linear-to-br from-amber-400 via-amber-500 to-amber-600 relative flex items-center justify-center">
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <UserCircle className="w-32 h-32 text-white/30" />
                </motion.div>
              </div>
            </motion.div>

            {/* Right: Content */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 mb-6">
                <CheckCheck className="text-amber-500" size={16} />
                <span className="text-zinc-400 text-sm font-medium">
                  Simple & Fast Process
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
                Open Your Account in 4 Steps
              </h1>

              <p className="text-lg text-zinc-400 leading-relaxed">
                Join SR Bullion and start trading precious metals with confidence. Our streamlined account opening
                process ensures you get started quickly while maintaining highest compliance standards.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <motion.button
                  type="button"
                  onClick={handleOpenApplicationForm}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-white text-black font-semibold rounded-xl transition-shadow duration-300 shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
                >
                  Start Application
                  <ArrowRight className="w-5 h-5" />
                </motion.button>

                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-white/5 backdrop-blur-md border border-white/10 text-white font-semibold rounded-xl hover:bg-white/10 hover:border-amber-500/30 transition-color duration-100"
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
          variants={containerVariants}
          className="mb-20"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
              Account Opening Process
            </h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              Follow our straightforward 4-step process to open your account
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step: ProcessStep) => (
              <motion.div
                key={step.id}
                variants={cardVariants}
                whileHover={{ y: -4 }}
                className="relative group"
              >
                <div className="bg-white/5 backdrop-blur-md border border-white/10 hover:border-amber-500/30 rounded-xl p-6 h-full flex flex-col transition-all duration-300">
                  {/* Step Number */}
                  <div className="absolute -top-3 -left-3 w-10 h-10 bg-linear-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-amber-500/20">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-3 transition-all duration-300 group-hover:bg-amber-400/20 group-hover:border-amber-400/30 inline-flex items-center justify-center mb-4 w-fit">
                    <span className="text-white group-hover:text-amber-500 transition-colors">
                      {renderIcon(step.icon)}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold mb-2 text-white group-hover:text-amber-500 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Requirements Section */}
        <motion.div
          id="required_document"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="mb-20"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
              Required Documents
            </h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              All documents must be in English or accompanied by certified translation
            </p>
          </motion.div>

          <div className="space-y-4">
            {requirementCategories.map((category: RequirementCategory) => (
              <motion.div
                key={category.id}
                variants={itemVariants}
                className="group bg-white/5 backdrop-blur-md border border-white/10 hover:border-amber-500/30 rounded-xl overflow-hidden transition-all duration-300"
              >
                <motion.button
                  type="button"
                  onClick={() => toggleCategory(category.id)}
                  className="w-full p-6 flex items-center justify-between hover:bg-white/5 transition-colors duration-200 text-left"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-3 transition-all duration-300 hover:bg-amber-400/20 hover:border-amber-400/30">
                      <span className="text-white">
                        {renderIcon(category.icon)}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-white">{category.title}</h3>
                      <p className="text-sm text-zinc-400">{category.description}</p>
                    </div>
                  </div>

                  <motion.div
                    animate={{ rotate: expandedCategory === category.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-6 h-6 text-amber-500 shrink-0" />
                  </motion.div>
                </motion.button>

                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: expandedCategory === category.id ? 'auto' : 0,
                    opacity: expandedCategory === category.id ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden border-t border-white/10"
                >
                  <div className="p-6 bg-white/5">
                    <ul className="space-y-3">
                      {category.items.map((item: string, index: number) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={expandedCategory === category.id ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                          transition={{ delay: index * 0.05 }}
                          className="flex items-start gap-3 text-zinc-300"
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
          variants={containerVariants}
          className="mb-20"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
              Download Resources
            </h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              Get all the forms and policies you need
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {documentResources.map((doc: DocumentResource) => (
              <motion.div
                key={doc.id}
                variants={cardVariants}
                whileHover={{ y: -4 }}
                className="group"
              >
                <div className="bg-white/5 backdrop-blur-md border border-white/10 hover:border-amber-500/30 rounded-xl p-6 h-full flex flex-col transition-all duration-300">
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-3 transition-all duration-300 group-hover:bg-amber-400/20 group-hover:border-amber-400/30 inline-flex items-center justify-center mb-4 w-fit">
                    <span className="text-white group-hover:text-amber-500 transition-colors">
                      {renderIcon(doc.icon)}
                    </span>
                  </div>

                  <h3 className="font-semibold text-lg mb-2 text-white group-hover:text-amber-500 transition-colors">
                    {doc.title}
                  </h3>
                  <p className="text-sm text-zinc-400 mb-6 grow">{doc.description}</p>

                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <span className="text-xs font-semibold text-amber-500 uppercase">{doc.type}</span>
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-amber-500 hover:text-amber-400 transition-colors"
                    >
                      <Download className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="mb-20"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
              Why Choose SR Bullion?
            </h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              Experience premium service and market-leading advantages
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {accountBenefits.map((benefit: AccountBenefit) => (
              <motion.div
                key={benefit.id}
                variants={cardVariants}
                whileHover={{ y: -4 }}
                className="group"
              >
                <div className="bg-white/5 backdrop-blur-md border border-white/10 hover:border-amber-500/30 rounded-xl p-6 h-full flex flex-col transition-all duration-300">
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-3 transition-all duration-300 group-hover:bg-amber-400/20 group-hover:border-amber-400/30 inline-flex items-center justify-center mb-4 w-fit">
                    <span className="text-white group-hover:text-amber-500 transition-colors">
                      {renderIcon(benefit.icon)}
                    </span>
                  </div>

                  <h3 className="font-semibold text-lg mb-2 text-white group-hover:text-amber-500 transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="text-center"
        >
          <motion.div
            variants={itemVariants}
            className="bg-linear-to-br from-amber-500/10 to-amber-600/5 backdrop-blur-md border border-amber-500/20 rounded-2xl p-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Ready to Get Started?
            </h2>
            <p className="text-zinc-400 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied clients trading precious metals with SR Bullion
            </p>

            <motion.button
              type="button"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-10 py-4 bg-white text-black font-semibold rounded-xl  transition-shadow duration-100 shadow-lg shadow-amber-500/20 inline-flex items-center justify-center gap-2"
            >
              Contact Our Team
              <motion.div animate={{ x: [0, 4, 0] }} transition={{ duration: 2, repeat: Infinity }}>
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