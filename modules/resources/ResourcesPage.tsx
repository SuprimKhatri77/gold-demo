'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { FC, JSX } from 'react';
import type { Variants } from 'framer-motion';
import { useRouter } from "next/navigation"
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
} from 'lucide-react';

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
  readonly icon: 'dmcc' | 'lbma' | 'oecd' | 'document';
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
    title: 'DMCC Guidelines',
    categoryLabel: 'Compliance',
    categoryId: 'compliance',
    description:
      'Comprehensive guidelines for Dubai Metals and Commodities Centre compliance and operational standards for precious metals trading.',
    fileSize: '2.4 MB',
    dateAdded: '2024-12-15',
    icon: 'dmcc',
    download: "DMCC_AML-CFT_GUIDELINES.pdf"
  },
  {
    id: 2,
    title: 'LBMA Responsible Gold Guidance',
    categoryLabel: 'Standards',
    categoryId: 'standards',
    description:
      'London Bullion Market Association responsible sourcing guidance ensuring ethical and sustainable precious metals practices.',
    fileSize: '1.8 MB',
    dateAdded: '2024-12-10',
    icon: 'lbma',
    download: "Responsible-Gold-Guidance-Version.pdf"
  },
  {
    id: 3,
    title: 'OECD Regulatory Policy Outlook 2025',
    categoryLabel: 'Regulatory',
    categoryId: 'regulatory',
    description:
      'Latest OECD policies and regulatory frameworks for international precious metals trading and financial regulations.',
    fileSize: '3.2 MB',
    dateAdded: '2024-12-08',
    icon: 'oecd',
    download: "DMCC_AML-CFT_GUIDELINES.pdf"
  },
  {
    id: 4,
    title: 'ISO 4217 Currency Standards',
    categoryLabel: 'Standards',
    categoryId: 'standards',
    description:
      'International Organization for Standardization specifications for precious metals purity and quality assurance.',
    fileSize: '1.5 MB',
    dateAdded: '2024-12-01',
    icon: 'document',
    download: "DMCC_AML-CFT_GUIDELINES.pdf"
  },
  {
    id: 5,
    title: 'AML/KYC Procedures Manual',
    categoryLabel: 'Compliance',
    categoryId: 'compliance',
    description:
      'Anti-Money Laundering and Know Your Customer procedures and best practices for bullion industry compliance.',
    fileSize: '2.1 MB',
    dateAdded: '2024-11-25',
    icon: 'document',
    download: "DMCC_AML-CFT_GUIDELINES.pdf"
  },
  {
    id: 6,
    title: 'Market Insights Report 2024',
    categoryLabel: 'Analysis',
    categoryId: 'analysis',
    description:
      'Comprehensive analysis of precious metals market trends, price movements, and future projections.',
    fileSize: '4.5 MB',
    dateAdded: '2024-11-20',
    icon: 'document',
    download: "DMCC_AML-CFT_GUIDELINES.pdf"

  },
];

const categories = [
  { id: 'all', name: 'All Resources' },
  { id: 'compliance', name: 'Compliance' },
  { id: 'standards', name: 'Standards' },
  { id: 'regulatory', name: 'Regulatory' },
  { id: 'analysis', name: 'Analysis' },
] as const;

const normalize = (value: string): string =>
  value.trim().toLowerCase().replace(/\s+/g, "-");

const categoriesWithCount = categories.map(category => ({
  ...category,
  count:
    category.id === "all"
      ? resources.length
      : resources.filter(
        r => normalize(r.categoryLabel) === normalize(category.id)
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
        ease: 'easeOut',
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
        ease: 'easeOut',
      },
    },
  } as Variants,
});

interface ResourcesPageProps {
  readonly className?: string;
}

export const ResourcesPage: FC<ResourcesPageProps> = ({
  className = '',
}): JSX.Element => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<SelectedCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const variants = getAnimationVariants(); // Ensure this is called with parentheses

  type DownloadResource = {
    download: string
  }

  const handleDownload = (resource: DownloadResource): void => {
    const filePath = `/${resource.download}`;
    const link = document.createElement("a");
    link.href = filePath;
    link.download = resource.download;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }


  const handleCategoryClick = (categoryId: string): void => {
    setSelectedCategory(categoryId);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(e.currentTarget.value);
  };

  const filteredResources = resources.filter((resource: ResourceDocument) => {
    const matchesCategory =
      selectedCategory === "all" ||
      resource.categoryId === selectedCategory;

    const matchesSearch = resource.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase()) ||
      resource.description
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getIconComponent = (icon: string): JSX.Element => {
    switch (icon) {
      case 'dmcc':
        return <Award className="text-amber-600" size={24} />;
      case 'lbma':
        return <Globe className="text-amber-600" size={24} />;
      case 'oecd':
        return <TrendingUp className="text-amber-600" size={24} />;
      default:
        return <FileText className="text-amber-600" size={24} />;
    }
  };

  return (
    <section
      id="resources"
      className={`py-32 bg-linear-to-b from-white via-amber-50/5 to-white relative overflow-hidden ${className}`}
    >
      {/* Floating background elements */}
      <motion.div
        className="absolute top-20 right-10 w-72 h-72 rounded-full bg-linear-to-br from-amber-200/20 to-orange-200/10 blur-3xl -z-10"
        variants={variants.floating}
        initial="initial"
        animate="animate"
      />
      <motion.div
        className="absolute bottom-40 left-20 w-96 h-96 rounded-full bg-linear-to-tr from-amber-100/15 to-yellow-100/10 blur-3xl -z-10"
        variants={variants.floating}
        initial="initial"
        animate="animate"
        transition={{ delay: 0.5 }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={variants.container}
          className="text-center mb-16"
        >
          <motion.div variants={variants.item} className="flex items-center justify-center gap-2 mb-4">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            >
              <BookOpen className="text-amber-600" size={24} />
            </motion.div>
            <span className="text-amber-600 font-bold tracking-widest uppercase text-sm">
              Knowledge Center
            </span>
          </motion.div>

          <motion.h2
            variants={variants.item}
            className="text-5xl md:text-6xl font-black leading-tight mb-6 text-gray-900"
          >
            <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-600 to-orange-500">
              Resources & Guidelines
            </span>
          </motion.h2>

          <motion.p
            variants={variants.item}
            className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto"
          >
            Access comprehensive compliance documents, industry standards, and market insights to enhance your
            precious metals trading operations.
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
            <Search className="absolute left-4 top-4 text-amber-600/60" size={20} />
            <input
              type="text"
              placeholder="Search resources, guidelines, documents..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full pl-12 pr-6 py-4 rounded-2xl border-2 border-amber-200/30 bg-white hover:border-amber-300/50 focus:border-amber-500/70 focus:outline-none transition-all duration-300 text-gray-800 placeholder-gray-500"
            />
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial="hidden"
          animate="visible"
          // viewport={{ once: true }}
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
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 border-2 ${selectedCategory === category.id
                ? 'bg-linear-to-r from-amber-500 to-orange-500 text-white border-amber-600 shadow-lg shadow-amber-500/30'
                : 'bg-white text-gray-700 border-amber-200/40 hover:border-amber-300/60'
                }`}
              type="button"
            >
              {category.name}
              <span className="ml-2 text-sm opacity-75">({category.count})</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Resources Grid */}
        <motion.div
          variants={variants.container}
          initial="hidden"
          animate="visible"
          key={selectedCategory}
          // viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-8 mb-20"
        >
          {filteredResources.map((resource: ResourceDocument) => (
            <motion.div
              initial="hidden"
              animate="visible"
              key={resource.id}
              variants={variants.card}
              className="group"
            >
              <div className="bg-white rounded-3xl overflow-hidden shadow-lg transition-all duration-300 border border-amber-100/60 h-full flex flex-col p-8">
                {/* Icon and Category */}
                <div className="flex items-start justify-between mb-6">
                  <motion.div
                    className="p-4 rounded-2xl bg-linear-to-br from-amber-100/50 to-orange-100/30"
                    whileHover={{ rotate: 15, scale: 1.1 }}
                  >
                    {getIconComponent(resource.icon)}
                  </motion.div>
                  <motion.span
                    className="text-xs font-bold uppercase tracking-widest text-amber-600 bg-amber-100/70 px-4 py-2 rounded-full"
                    variants={variants.badge}
                    initial="rest"
                    whileHover="hover"
                  >
                    {resource.categoryLabel}
                  </motion.span>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-black text-gray-900 mb-3 leading-tight">
                  {resource.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6 grow">
                  {resource.description}
                </p>

                {/* Meta Information */}
                <div className="flex items-center justify-between text-xs text-gray-500 mb-6 pb-6 border-b border-gray-200/50">
                  <span className="font-semibold">{resource.fileSize}</span>
                  <span>{new Date(resource.dateAdded).toLocaleDateString()}</span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <motion.button
                    type="button"
                    onClick={() => handleDownload(resource)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 bg-linear-to-r from-amber-500 to-orange-500 text-white py-3 rounded-xl font-bold hover:from-amber-600 hover:to-orange-600 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40"
                  >
                    <Download size={18} />
                    Download
                  </motion.button>
                  <motion.button
                    type="button"
                    onClick={() => router.push(`/${resource.download}`)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 bg-amber-100/60 text-amber-700 py-3 rounded-xl font-bold hover:bg-amber-200/70 transition-all duration-300 flex items-center justify-center gap-2 border border-amber-300/40"
                  >
                    <Eye size={18} />
                    Preview
                  </motion.button>
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
            <FileText className="mx-auto mb-4 text-gray-300" size={64} />
            <h3 className="text-2xl font-bold text-gray-700 mb-2">No Resources Found</h3>
            <p className="text-gray-600">Try adjusting your search or category filters.</p>
          </motion.div>
        )}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mt-24 bg-linear-to-r from-amber-600 to-orange-500 rounded-3xl p-12 text-white text-center relative overflow-hidden"
        >
          {/* Background decoration */}
          <motion.div
            className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -z-10"
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
              className="text-4xl font-black mb-4"
            >
              Need Custom Documentation?
            </motion.h3>
            <motion.p
              variants={variants.item}
              className="text-lg text-white/90 max-w-2xl mx-auto mb-8"
            >
              Contact our compliance team for industry-specific reports and tailored guidelines for your
              organization.
            </motion.p>
            <motion.button
              type="button"
              variants={variants.item}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-amber-600 px-10 py-4 rounded-full font-bold hover:bg-gray-100 transition-all duration-300 shadow-2xl shadow-amber-600/40 inline-flex items-center gap-2"
            >
              Request Documentation
              <Zap size={18} />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
