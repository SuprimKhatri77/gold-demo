"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { FC, JSX } from "react";
import type { Variants } from "framer-motion";
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
  Briefcase,
  TrendingUp,
  Globe,
} from "lucide-react";
import { ApplicationForm } from "./ApplicationForm";
import { useRouter } from "next/navigation";

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
    title: "Corporate Legal Documentation",
    description: "Essential business registration and incorporation records",
    icon: "building",
    items: [
      "Valid Trade License or Business Registration Certificate",
      "Certificate of Incorporation with apostille (if applicable)",
      "Memorandum & Articles of Association",
      "Tax Registration Certificate (VAT/GST where applicable)",
      "Certified Shareholders Register and Ownership Structure",
    ],
  },
  {
    id: 2,
    title: "Business Address Verification",
    description: "Proof of registered and operational business locations",
    icon: "map",
    items: [
      "Proof of registered business address in country of incorporation",
      "Proof of physical trading address (if different from registered)",
      "UAE business address verification (for regional operations)",
    ],
  },
  {
    id: 3,
    title: "Corporate Contact Details",
    description: "Official business communication channels",
    icon: "users",
    items: [
      "Corporate email domain and official contact address",
      "Primary and secondary business phone numbers",
      "Company website and digital presence (if available)",
      "Preferred business hours and timezone",
    ],
  },
  {
    id: 4,
    title: "Authorized Representatives",
    description: "Key stakeholders and authorized personnel",
    icon: "shield",
    items: [
      "Ultimate Beneficial Owners (UBO) documentation and verification",
      "Authorized Signatories with specimen signatures",
      "Board of Directors list and resolutions",
      "Power of Attorney documents (if applicable)",
      "Valid identification and proof of address for all individuals",
    ],
  },
];

const processSteps: readonly ProcessStep[] = [
  {
    id: 1,
    number: 1,
    title: "Submit Corporate Application",
    description:
      "Complete the comprehensive business account opening form with all required corporate information and documentation",
    icon: "file",
  },
  {
    id: 2,
    number: 2,
    title: "Compliance Review",
    description:
      "Our dedicated compliance team conducts thorough verification of all submitted corporate documents and business credentials",
    icon: "shield",
  },
  {
    id: 3,
    number: 3,
    title: "KYC & AML Assessment",
    description:
      "Comprehensive Know Your Customer and Anti-Money Laundering compliance checks in accordance with international standards",
    icon: "lock",
  },
  {
    id: 4,
    number: 4,
    title: "Account Activation",
    description:
      "Your corporate trading account is approved, activated, and ready for precious metals transactions",
    icon: "zap",
  },
];

const documentResources: readonly DocumentResource[] = [
  {
    id: 1,
    title: "Corporate Account Application Form",
    description: "Comprehensive application form for business trading accounts",
    type: "PDF",
    icon: "file",
    downloadUrl: "/forms/Corporate_KYC_Form.pdf",
  },
  {
    id: 2,
    title: "AML/CTF Compliance Policy",
    description: "Anti-Money Laundering and Counter-Terrorism Financing policy framework",
    type: "PDF",
    icon: "shield",
    downloadUrl: "/policies/SR-Bullion-FZCO-AML-CFT-Policy-V.03-20.05.25.pdf",
  },
  {
    id: 3,
    title: "Supply Chain Due Diligence Policy",
    description: "Ethical sourcing standards and responsible supply chain practices",
    type: "PDF",
    icon: "zap",
    downloadUrl: "/policies/SR-BULLION-FZCO_SUPPLY-CHAIN-POLICY.pdf",
  },
];

const accountBenefits: readonly AccountBenefit[] = [
  {
    id: 1,
    title: "Institutional Pricing",
    description: "Access competitive wholesale rates and volume-based pricing tiers for precious metals",
    icon: "trending",
  },
  {
    id: 2,
    title: "Global Trading Network",
    description: "Seamless access to international markets with multi-currency settlement options",
    icon: "globe",
  },
  {
    id: 3,
    title: "Dedicated Account Manager",
    description: "Personalized support from experienced precious metals trading specialists",
    icon: "users",
  },
  {
    id: 4,
    title: "Enterprise Security",
    description: "Bank-grade security infrastructure with multi-layer authentication and encryption",
    icon: "lock",
  },
  {
    id: 5,
    title: "Rapid Settlement",
    description: "T+2 settlement with flexible delivery and storage options across secure vaults",
    icon: "zap",
  },
  {
    id: 6,
    title: "Full Transparency",
    description: "Real-time pricing, comprehensive reporting, and complete transaction visibility",
    icon: "shield",
  },
];

interface AccountOpeningProps {
  readonly className?: string;
}

export const AccountOpening: FC<AccountOpeningProps> = ({
  className = "",
}: AccountOpeningProps): JSX.Element => {
  const router = useRouter();
  // const [isApplicationFormOpen, setApplicationFormOpen] = useState(false);

  // const handleOpenApplicationForm = () => {
  //   setApplicationFormOpen(!isApplicationFormOpen);
  // };
  const [expandedCategory, setExpandedCategory] = useState<number | null>(1);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const toggleCategory = (id: number): void => {
    setExpandedCategory(expandedCategory === id ? null : id);
  };

  const renderIcon = (iconName: string): JSX.Element => {
    const iconProps = {
      className: "w-6 h-6 transition-all duration-300",
      strokeWidth: 1.5,
    };
    const iconMap: Record<string, JSX.Element> = {
      building: <Building2 {...iconProps} />,
      map: <MapPin {...iconProps} />,
      users: <Users {...iconProps} />,
      shield: <Shield {...iconProps} />,
      file: <FileText {...iconProps} />,
      lock: <Lock {...iconProps} />,
      zap: <Zap {...iconProps} />,
      trending: <TrendingUp {...iconProps} />,
      globe: <Globe {...iconProps} />,
    };
    return iconMap[iconName] || <FileText {...iconProps} />;
  };

  return (
    <section
      id="account-opening"
      className={`py-24 bg-linear-to-b from-slate-950 via-blue-950 to-slate-950 relative overflow-hidden ${className}`}
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
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="mb-20"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left: Image */}
            <div className="flex flex-col gap-15">
              {/* Process Steps */}
              <motion.div variants={itemVariants} className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10">
                  <CheckCheck className="text-cyan-400" size={16} />
                  <span className="text-zinc-400 text-sm font-medium">
                    Streamlined B2B Onboarding
                  </span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
                  Enterprise Account
                  <span className="block bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    Opening Process
                  </span>
                </h1>

                <p className="text-lg text-zinc-400 leading-relaxed">
                  Join the world&apos;s leading precious metals trading platform. Our institutional-grade onboarding ensures seamless account activation while maintaining the highest regulatory compliance standards.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-4 bg-linear-to-r from-blue-600 to-cyan-600 text-white font-semibold transition-colors duration-150 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 flex items-center justify-center gap-2 group"
                  >
                    <a href="#Application-form">Start Application</a>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </motion.button>

                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-4 bg-white/5 backdrop-blur-xl border border-white/10 text-white font-semibold hover:bg-white/10 hover:border-blue-400/40 transition-color duration-150"
                  >
                    <a href="#required_document">Required Documents</a>
                  </motion.button>
                </div>
              </motion.div>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={containerVariants}
                className="mb-20"
              >
                <motion.div variants={itemVariants} className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
                    Onboarding Process
                  </h2>
                  <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                    Four straightforward steps to activate your corporate trading account
                  </p>
                </motion.div>

                <div className="grid md:grid-cols-3 lg:grid-cols-2 gap-6">
                  {processSteps.map((step: ProcessStep) => (
                    <motion.div
                      key={step.id}
                      variants={cardVariants}
                      whileHover={{ y: -4, scale: 1.02 }}
                      className="relative group"
                    >
                      <div className="bg-white/5 backdrop-blur-xl border border-white/10 hover:border-cyan-400/40 rounded-2xl p-6 h-full flex flex-col transition-all duration-300">
                        {/* Step Number */}
                        <div className="absolute -top-3 -left-3 w-12 h-12 bg-linear-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/30">
                          {step.number}
                        </div>

                        {/* Icon */}
                        <div className="bg-linear-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-xl border border-white/20 rounded-xl p-4 transition-all duration-300 group-hover:border-cyan-400/40 group-hover:scale-110 inline-flex items-center justify-center mb-4 w-fit">
                          <span className="text-cyan-400">
                            {renderIcon(step.icon)}
                          </span>
                        </div>

                        {/* Content */}
                        <h3 className="text-lg font-semibold mb-2 text-white group-hover:text-cyan-400 transition-colors duration-300">
                          {step.title}
                        </h3>
                        <p className="text-zinc-400 text-sm leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
            {/* Right: Content */}
            <div id="Application-form">
              <ApplicationForm />
            </div>

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
              Required Documentation
            </h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              All documents must be in English or accompanied by certified translation. Notarization may be required for certain jurisdictions.
            </p>
          </motion.div>

          <div className="space-y-4">
            {requirementCategories.map((category: RequirementCategory) => (
              <motion.div
                key={category.id}
                variants={itemVariants}
                className="group bg-white/5 backdrop-blur-xl border border-white/10 hover:border-blue-400/40 rounded-2xl overflow-hidden transition-all duration-300"
              >
                <motion.button
                  type="button"
                  onClick={() => toggleCategory(category.id)}
                  className="w-full p-6 flex items-center justify-between hover:bg-white/5 transition-all duration-300 text-left"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="bg-linear-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-xl border border-white/20 rounded-xl p-3 transition-all duration-300 group-hover:border-cyan-400/40 group-hover:scale-110">
                      <span className="text-cyan-400">
                        {renderIcon(category.icon)}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-white group-hover:text-cyan-400 transition-colors duration-300">
                        {category.title}
                      </h3>
                      <p className="text-sm text-zinc-400">
                        {category.description}
                      </p>
                    </div>
                  </div>

                  <motion.div
                    animate={{
                      rotate: expandedCategory === category.id ? 180 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-6 h-6 text-cyan-400 shrink-0" />
                  </motion.div>
                </motion.button>

                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: expandedCategory === category.id ? "auto" : 0,
                    opacity: expandedCategory === category.id ? 1 : 0,
                  }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden border-t border-white/10"
                >
                  <div className="p-6 bg-linear-to-br from-blue-500/5 to-transparent">
                    <ul className="space-y-3">
                      {category.items.map((item: string, index: number) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={
                            expandedCategory === category.id
                              ? { opacity: 1, x: 0 }
                              : { opacity: 0, x: -10 }
                          }
                          transition={{ delay: index * 0.05, duration: 0.3 }}
                          className="flex items-start gap-3 text-zinc-300"
                        >
                          <CheckCircle className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                          <span className="text-sm leading-relaxed">
                            {item}
                          </span>
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
              Access all necessary forms and compliance documentation
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {documentResources.map((doc: DocumentResource) => (
              <motion.div
                key={doc.id}
                variants={cardVariants}
                whileHover={{ y: -4, scale: 1.02 }}
                className="group"
              >
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 hover:border-blue-400/40 rounded-2xl p-6 h-full flex flex-col transition-all duration-300">
                  <div className="bg-linear-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-xl border border-white/20 rounded-xl p-4 transition-all duration-300 group-hover:border-cyan-400/40 group-hover:rotate-12 inline-flex items-center justify-center mb-4 w-fit">
                    <span className="text-cyan-400">
                      {renderIcon(doc.icon)}
                    </span>
                  </div>

                  <h3 className="font-semibold text-lg mb-2 text-white group-hover:text-cyan-400 transition-colors duration-300">
                    {doc.title}
                  </h3>
                  <p className="text-sm text-zinc-400 mb-6 grow">
                    {doc.description}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wide">
                      {doc.type}
                    </span>
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.1, rotate: -5 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-cyan-400 hover:text-cyan-300 transition-colors duration-300"
                    >
                      <a href={doc.downloadUrl} download>
                        <Download className="w-5 h-5" />
                      </a>

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
              Enterprise Advantages
            </h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              Institutional-grade services designed for professional traders
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {accountBenefits.map((benefit: AccountBenefit) => (
              <motion.div
                key={benefit.id}
                variants={cardVariants}
                whileHover={{ y: -4, scale: 1.02 }}
                className="group"
              >
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 hover:border-cyan-400/40 rounded-2xl p-6 h-full flex flex-col transition-all duration-300">
                  <div className="bg-linear-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-xl border border-white/20 rounded-xl p-4 transition-all duration-300 group-hover:border-cyan-400/40 group-hover:scale-110 inline-flex items-center justify-center mb-4 w-fit">
                    <span className="text-cyan-400">
                      {renderIcon(benefit.icon)}
                    </span>
                  </div>

                  <h3 className="font-semibold text-lg mb-2 text-white group-hover:text-cyan-400 transition-colors duration-300">
                    {benefit.title}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    {benefit.description}
                  </p>
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
            className="bg-linear-to-br from-blue-600/10 via-cyan-600/10 to-blue-600/5 backdrop-blur-xl border border-blue-400/20 rounded-2xl p-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Ready to Begin Trading?
            </h2>
            <p className="text-zinc-400 text-lg mb-8 max-w-2xl mx-auto">
              Join industry-leading institutions trading precious metals on our secure, transparent platform
            </p>

            <motion.button
              type="button"
              onClick={() => router.push("/contact")}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="px-10 py-4 bg-linear-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 inline-flex items-center justify-center gap-2 group"
            >
              Contact Our Team
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};