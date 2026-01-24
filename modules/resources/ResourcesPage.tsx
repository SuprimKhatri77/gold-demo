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
  TrendingUp,
  Zap,
  Globe,
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
    title: "DMCC Guidelines",
    categoryLabel: "Compliance",
    categoryId: "compliance",
    description:
      "Comprehensive guidelines for Dubai Metals and Commodities Centre compliance and operational standards for precious metals trading.",
    fileSize: "2.4 MB",
    dateAdded: "2024-12-15",
    icon: "dmcc",
    download: "DMCC_AML-CFT_GUIDELINES.pdf",
  },
  {
    id: 2,
    title: "LBMA Responsible Gold Guidance",
    categoryLabel: "Standards",
    categoryId: "standards",
    description:
      "London Bullion Market Association responsible sourcing guidance ensuring ethical and sustainable precious metals practices.",
    fileSize: "1.8 MB",
    dateAdded: "2024-12-10",
    icon: "lbma",
    download: "Responsible-Gold-Guidance-Version.pdf",
  },
  {
    id: 3,
    title: "OECD Regulatory Policy Outlook 2025",
    categoryLabel: "Regulatory",
    categoryId: "regulatory",
    description:
      "Latest OECD policies and regulatory frameworks for international precious metals trading and financial regulations.",
    fileSize: "3.2 MB",
    dateAdded: "2024-12-08",
    icon: "oecd",
    download: "DMCC_AML-CFT_GUIDELINES.pdf",
  },
  {
    id: 4,
    title: "ISO 4217 Currency Standards",
    categoryLabel: "Standards",
    categoryId: "standards",
    description:
      "International Organization for Standardization specifications for precious metals purity and quality assurance.",
    fileSize: "1.5 MB",
    dateAdded: "2024-12-01",
    icon: "document",
    download: "DMCC_AML-CFT_GUIDELINES.pdf",
  },
  {
    id: 5,
    title: "AML/KYC Procedures Manual",
    categoryLabel: "Compliance",
    categoryId: "compliance",
    description:
      "Anti-Money Laundering and Know Your Customer procedures and best practices for bullion industry compliance.",
    fileSize: "2.1 MB",
    dateAdded: "2024-11-25",
    icon: "document",
    download: "DMCC_AML-CFT_GUIDELINES.pdf",
  },
  {
    id: 6,
    title: "Market Insights Report 2024",
    categoryLabel: "Analysis",
    categoryId: "analysis",
    description:
      "Comprehensive analysis of precious metals market trends, price movements, and future projections.",
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
  { id: "analysis", name: "Analysis" },
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
        duration: 0.6,
        ease: "easeOut",
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
        duration: 0.7,
        ease: "easeOut",
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
      scale: 1.1,
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
        duration: 0.8,
        ease: "easeOut",
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
        return <Award className="text-white group-hover:text-amber-500" size={24} />;
      case "lbma":
        return <Globe className="text-white group-hover:text-amber-500" size={24} />;
      case "oecd":
        return <TrendingUp className="text-white group-hover:text-amber-500" size={24} />;
      default:
        return <FileText className="text-white group-hover:text-amber-500" size={24} />;
    }
  };

  return (
    <section
      id="resources"
      className="py-24 bg-black relative overflow-hidden"
    >
      {/* Subtle background linears */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />

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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 mb-6"
          >
            <BookOpen className="text-amber-500" size={16} />
            <span className="text-zinc-400 text-sm font-medium">
              Knowledge Center
            </span>
          </motion.div>

          <motion.h2
            variants={variants.item}
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-white"
          >
            <span className="bg-linear-to-r from-amber-500 via-amber-400 to-amber-500 bg-clip-text text-transparent">
              Resources & Guidelines
            </span>
          </motion.h2>

          <motion.p
            variants={variants.item}
            className="text-zinc-400 text-lg leading-relaxed max-w-2xl mx-auto"
          >
            Access comprehensive compliance documents, industry standards, and
            market insights to enhance your precious metals trading operations.
          </motion.p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="relative max-w-2xl mx-auto">
            <Search
              className="absolute left-4 top-4 text-amber-500/60"
              size={20}
            />
            <input
              type="text"
              placeholder="Search resources, guidelines, documents..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full pl-12 pr-6 py-4 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-amber-500/30 focus:border-amber-500/50 focus:outline-none transition-all duration-300 text-white placeholder-zinc-500"
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
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-full font-semibold ${selectedCategory === category.id
                ? "bg-linear-to-r from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/20"
                : "bg-white/5 backdrop-blur-md border border-white/10 text-zinc-300 hover:border-amber-500/30 hover:bg-white/10"
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
              whileHover={{ y: -4 }}
              className="group"
            >
              <div className="bg-white/5 backdrop-blur-md border border-white/10 hover:border-amber-500/30 rounded-2xl overflow-hidden transition-all duration-300 h-full flex flex-col p-8">
                {/* Icon and Category */}
                <div className="flex items-start justify-between mb-6">
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-3 transition-all duration-300 group-hover:bg-amber-400/20 group-hover:border-amber-400/30">
                    <span className="text-white group-hover:text-amber-500 transition-colors">
                      {getIconComponent(resource.icon)}
                    </span>
                  </div>
                  <motion.span
                    className="text-xs font-semibold uppercase tracking-widest text-amber-500 bg-amber-500/10 backdrop-blur-md border border-amber-500/20 px-4 py-2 rounded-full"
                    variants={variants.badge}
                    initial="rest"
                    whileHover="hover"
                  >
                    {resource.categoryLabel}
                  </motion.span>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-3 leading-tight group-hover:text-amber-500 transition-colors">
                  {resource.title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-6 grow">
                  {resource.description}
                </p>

                {/* Meta Information */}
                <div className="flex items-center justify-between text-xs text-zinc-500 mb-6 pb-6 border-b border-white/10">
                  <span className="font-semibold">{resource.fileSize}</span>
                  <span>
                    {new Date(resource.dateAdded).toLocaleDateString()}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <motion.button
                    type="button"
                    onClick={() => handleDownload(resource)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 bg-white text-black py-3 rounded-xl font-semibold hover:from-amber-600 hover:to-amber-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
                  >
                    <Download size={18} />
                    Download
                  </motion.button>
                  <motion.a
                    href={`/${resource.download}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 bg-white/5 backdrop-blur-md border border-white/10 text-white py-3 rounded-xl font-semibold hover:bg-white/10 hover:border-amber-500/30 transition-all duration-300 flex items-center justify-center gap-2"
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
            <FileText className="mx-auto mb-4 text-zinc-600" size={64} />
            <h3 className="text-2xl font-bold text-white mb-2">
              No Resources Found
            </h3>
            <p className="text-zinc-400">
              Try adjusting your search or category filters.
            </p>
          </motion.div>
        )}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mt-24 rounded-2xl p-12 text-white text-center relative overflow-hiddenbg-white/10 backdrop-blur-md border border-white/20 transition-all duration-300 hover:bg-amber-400/20 group-hover:border-amber-400/30"
        >
          {/* Background decoration */}
          <motion.div
            className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl"
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          />

          <motion.div
            variants={variants.container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h3
              variants={variants.item}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Need Custom Documentation?
            </motion.h3>
            <motion.p
              variants={variants.item}
              className="text-lg text-white/90 max-w-2xl mx-auto mb-8"
            >
              Contact our compliance team for industry-specific reports and
              tailored guidelines for your organization.
            </motion.p>
            <motion.button
              type="button"
              variants={variants.item}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white text-black px-10 py-4 rounded-xl font-semibold hover:bg-zinc-100 transition-all duration-300 shadow-lg inline-flex items-center gap-2"
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
