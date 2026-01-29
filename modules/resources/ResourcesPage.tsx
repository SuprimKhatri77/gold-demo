"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import type { FC, JSX } from "react";
import type { Variants } from "framer-motion";
import {
  FileText,
  Download,
  Eye,
  Search,
  BookOpen,
  Award,
  Zap,
  Globe,
  Shield,
  BarChart3,
} from "lucide-react";

// Type definitions
interface ResourceDocument {
  readonly id: number;
  readonly title: string;
  readonly categoryLabel: string;
  readonly categoryId: "compliance" | "standards" | "regulatory" | "analysis";
  readonly description: string;
  readonly fileSize: string;
  readonly dateAdded: string;
  readonly download: string;
  readonly icon: "dmcc" | "lbma" | "oecd" | "document";
}

interface ResourceCategory {
  readonly id: string;
  readonly name: string;
  readonly count: number;
}

interface AnimationVariants {
  container: Variants;
  item: Variants;
  card: Variants;
  floating: Variants;
  badge: Variants;
  documentSlide: Variants;
}

type SelectedCategory = string | null;

const resources: readonly ResourceDocument[] = [
  {
    id: 1,
    title: "DMCC Trading Guidelines",
    categoryLabel: "Compliance",
    categoryId: "compliance",
    description:
      "Comprehensive Dubai Multi Commodities Centre compliance framework and operational standards for institutional precious metals trading and market participation.",
    fileSize: "2.4 MB",
    dateAdded: "2024-12-15",
    icon: "dmcc",
    download: "DMCC_AML-CFT_GUIDELINES.pdf",
  },
  {
    id: 2,
    title: "LBMA Responsible Sourcing Standards",
    categoryLabel: "Standards",
    categoryId: "standards",
    description:
      "London Bullion Market Association responsible sourcing framework ensuring ethical supply chain practices and sustainable precious metals procurement for institutional traders.",
    fileSize: "1.8 MB",
    dateAdded: "2024-12-10",
    icon: "lbma",
    download: "Responsible-Gold-Guidance-Version.pdf",
  },
  {
    id: 3,
    title: "OECD Due Diligence Framework 2025",
    categoryLabel: "Regulatory",
    categoryId: "regulatory",
    description:
      "Organization for Economic Co-operation and Development due diligence guidelines for responsible supply chains in minerals from conflict-affected areas.",
    fileSize: "3.2 MB",
    dateAdded: "2024-12-08",
    icon: "oecd",
    download: "DMCC_AML-CFT_GUIDELINES.pdf",
  },
  {
    id: 4,
    title: "ISO 9001 Quality Management Standards",
    categoryLabel: "Standards",
    categoryId: "standards",
    description:
      "International standards for precious metals purity verification, quality assurance protocols, and operational excellence in bullion trading operations.",
    fileSize: "1.5 MB",
    dateAdded: "2024-12-01",
    icon: "document",
    download: "DMCC_AML-CFT_GUIDELINES.pdf",
  },
  {
    id: 5,
    title: "Enterprise AML/KYC Implementation Guide",
    categoryLabel: "Compliance",
    categoryId: "compliance",
    description:
      "Comprehensive Anti-Money Laundering and Know Your Customer procedures manual for institutional precious metals trading with best practice frameworks.",
    fileSize: "2.1 MB",
    dateAdded: "2024-11-25",
    icon: "document",
    download: "DMCC_AML-CFT_GUIDELINES.pdf",
  },
  {
    id: 6,
    title: "Global Precious Metals Market Analysis Q4 2024",
    categoryLabel: "Analysis",
    categoryId: "analysis",
    description:
      "Institutional market intelligence report covering price trends, supply dynamics, demand forecasts, and strategic insights for precious metals trading.",
    fileSize: "4.5 MB",
    dateAdded: "2024-11-20",
    icon: "document",
    download: "DMCC_AML-CFT_GUIDELINES.pdf",
  },
];

const categories = [
  { id: "all", name: "All Resources" },
  { id: "compliance", name: "Compliance" },
  { id: "standards", name: "Standards" },
  { id: "regulatory", name: "Regulatory" },
  { id: "analysis", name: "Market Analysis" },
] as const;

const normalize = (value: string): string =>
  value.trim().toLowerCase().replace(/\s+/g, "-");

const categoriesWithCount = categories.map((category) => ({
  ...category,
  count:
    category.id === "all"
      ? resources.length
      : resources.filter(
        (r) => normalize(r.categoryLabel) === normalize(category.id),
      ).length,
}));

const getAnimationVariants = (): AnimationVariants => ({
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  } as Variants,
  item: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  } as Variants,
  card: {
    hidden: { opacity: 0, x: -30, y: 0 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
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
        ease: "easeInOut",
      },
    },
  } as Variants,
  badge: {
    rest: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
      },
    },
  } as Variants,
  documentSlide: {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  } as Variants,
});

interface ResourcesPageProps {
  readonly className?: string;
}

export const ResourcesPage: FC<ResourcesPageProps> = ({ className = "" }): JSX.Element => {
  const [selectedCategory, setSelectedCategory] =
    useState<SelectedCategory>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const variants = getAnimationVariants();

  type DownloadResource = {
    download: string;
  };

  const handleDownload = (resource: DownloadResource): void => {
    const filePath = `/${resource.download}`;
    const link = document.createElement("a");
    link.href = filePath;
    link.download = resource.download;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCategoryClick = (categoryId: string): void => {
    setSelectedCategory(categoryId);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(e.currentTarget.value);
  };

  const filteredResources = resources.filter((resource: ResourceDocument) => {
    const matchesCategory =
      selectedCategory === "all" || resource.categoryId === selectedCategory;

    const matchesSearch =
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getIconComponent = (icon: string): JSX.Element => {
    switch (icon) {
      case "dmcc":
        return <Award className="transition-colors duration-300" size={24} />;
      case "lbma":
        return <Globe className="transition-colors duration-300" size={24} />;
      case "oecd":
        return <Shield className="transition-colors duration-300" size={24} />;
      default:
        return <FileText className="transition-colors duration-300" size={24} />;
    }
  };

  return (
    <section
      id="resources"
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
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 right-1/3 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={variants.container}
          className="text-center mb-16"
        >
          <motion.div
            variants={variants.item}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 mb-6"
          >
            <BookOpen className="text-cyan-400" size={16} />
            <span className="text-zinc-400 text-sm font-medium">
              Professional Knowledge Hub
            </span>
          </motion.div>

          <motion.h2
            variants={variants.item}
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-white"
          >
            Industry Resources &{" "}
            <span className="bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Documentation
            </span>
          </motion.h2>

          <motion.p
            variants={variants.item}
            className="text-zinc-400 text-lg leading-relaxed max-w-2xl mx-auto"
          >
            Access comprehensive compliance frameworks, international standards, regulatory guidelines, and market intelligence for institutional precious metals trading.
          </motion.p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="relative max-w-2xl mx-auto">
            <Search
              className="absolute left-4 top-4 text-cyan-400/60"
              size={20}
            />
            <input
              type="text"
              placeholder="Search compliance documents, standards, market reports..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full pl-12 pr-6 py-4 bg-white/5 backdrop-blur-xl border border-white/10 hover:border-cyan-400/40 focus:border-cyan-400/60 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-color duration-150 text-white placeholder-zinc-500"
            />
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={variants.container}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {categoriesWithCount.map((category: ResourceCategory) => (
            <motion.button
              key={category.id}
              variants={variants.item}
              onClick={() => handleCategoryClick(category.id)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-sm font-semibold transition-all duration-300 ${selectedCategory === category.id
                  ? "bg-linear-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/30"
                  : "bg-white/5 backdrop-blur-xl border border-white/10 text-zinc-300 hover:border-cyan-400/40 hover:bg-white/10"
                }`}
              type="button"
            >
              {category.name}
              <span className="ml-2 text-sm opacity-75">
                ({category.count})
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* Resources Grid */}
        <motion.div
          variants={variants.container}
          initial="hidden"
          animate="visible"
          key={selectedCategory}
          className="grid lg:grid-cols-2 gap-6 mb-20"
        >
          {filteredResources.map((resource: ResourceDocument) => (
            <motion.div
              initial="hidden"
              animate="visible"
              key={resource.id}
              variants={variants.card}
              whileHover={{ y: -4, scale: 1.01 }}
              className="group"
            >
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 hover:border-cyan-400/40 overflow-hidden transition-all duration-300 h-full flex flex-col p-8">
                {/* Icon and Category */}
                <div className="flex items-start justify-between mb-6">
                  <div className="bg-linear-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-xl border border-white/20 rounded-sm p-4 transition-all duration-300 group-hover:border-cyan-400/40 group-hover:scale-110">
                    <span className="text-cyan-400">
                      {getIconComponent(resource.icon)}
                    </span>
                  </div>
                  <motion.span
                    className="text-xs font-semibold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 backdrop-blur-xl border border-cyan-500/20 px-4 py-2 rounded-xl"
                    variants={variants.badge}
                    initial="rest"
                    whileHover="hover"
                  >
                    {resource.categoryLabel}
                  </motion.span>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-3 leading-tight group-hover:text-cyan-400 transition-colors duration-300">
                  {resource.title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-6 grow">
                  {resource.description}
                </p>

                {/* Meta Information */}
                <div className="flex items-center justify-between text-xs text-zinc-500 mb-6 pb-6 border-b border-white/10">
                  <span className="font-semibold flex items-center gap-1">
                    <FileText size={14} className="text-cyan-400" />
                    {resource.fileSize}
                  </span>
                  <span>
                    {new Date(resource.dateAdded).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <motion.button
                    type="button"
                    onClick={() => handleDownload(resource)}
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 bg-linear-to-r from-blue-600 to-cyan-600 text-white py-3 font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
                  >
                    <Download size={18} />
                    Download
                  </motion.button>
                  <motion.a
                    href={`/${resource.download}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 bg-white/5 backdrop-blur-xl border border-white/10 text-white py-3 font-semibold hover:bg-white/10 hover:border-cyan-400/40 transition-color duration-150 flex items-center justify-center gap-2"
                  >
                    <Eye size={18} />
                    Preview
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* No Results */}
        {filteredResources.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center py-16"
          >
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-12 max-w-md mx-auto">
              <FileText className="mx-auto mb-4 text-zinc-600" size={64} />
              <h3 className="text-2xl font-bold text-white mb-2">
                No Resources Found
              </h3>
              <p className="text-zinc-400">
                Try adjusting your search terms or category filters.
              </p>
            </div>
          </motion.div>
        )}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-24 rounded-2xl p-12 text-white text-center relative overflow-hidden bg-linear-to-br from-blue-600/10 via-cyan-600/10 to-blue-600/5 backdrop-blur-xl border border-blue-400/20"
        >
          {/* Background decoration */}
          <motion.div
            className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl"
            animate={{ y: [0, -20, 0], x: [0, 20, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl"
            animate={{ y: [0, 20, 0], x: [0, -20, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.div
            variants={variants.container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative z-10"
          >
            <motion.div variants={variants.item} className="flex justify-center mb-4">
              <div className="bg-linear-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-xl border border-white/20 rounded-xl p-4">
                <BarChart3 className="text-cyan-400" size={32} />
              </div>
            </motion.div>
            <motion.h3
              variants={variants.item}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Need Custom Documentation?
            </motion.h3>
            <motion.p
              variants={variants.item}
              className="text-lg text-zinc-400 max-w-2xl mx-auto mb-8"
            >
              Our compliance and research teams provide tailored industry reports, custom regulatory frameworks, and specialized documentation for institutional clients.
            </motion.p>
            <motion.button
              type="button"
              variants={variants.item}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="bg-linear-to-r from-blue-600 to-cyan-600 text-white px-10 py-4 font-semibold transition-color duration-150 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 inline-flex items-center gap-2"
            >
              Request Documentation
              <Zap size={18} />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}