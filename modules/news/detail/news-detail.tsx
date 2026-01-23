"use client";

import React, { useState } from "react";
import Image from "next/image";
import { NotFoundState } from "./article-not-found";
import { ArticleHeaderSkeleton } from "./article-header-skeleton";
import { ArticleContentSkeleton } from "./article-content-skeleton";
import { ArticleHeader } from "./article-header";
import { ArticleContent } from "./article-content";
import { ShareButtons } from "./article-share-button";
import { Sidebar } from "./sidebar";
import { Author, mockAuthors, mockNews, NewsItem } from "./mock-news";

// Utility Functions
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const calculateReadTime = (content: string): number => {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
};

export const createSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
};

export interface NextImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

export const NextImage: React.FC<NextImageProps> = ({
  src,
  alt,
  className = "",
  priority = false,
}) => (
  <Image
    fill
    src={src}
    alt={alt}
    className={className}
    loading={priority ? "eager" : "lazy"}
  />
);

// Components

export interface ArticleHeaderProps {
  article: NewsItem;
  author: Author;
}

export interface ShareButtonsProps {
  title: string;
}

// Main Page Component
export const NewsDetailPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading
  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  // Simulate getting article from slug
  const currentSlug =
    "gold-prices-reach-new-heights-amid-global-economic-uncertainty";
  const article = mockNews.find(
    (item) => createSlug(item.title) === currentSlug,
  );

  // Handle article not found
  if (!isLoading && !article) {
    return <NotFoundState />;
  }

  const author = article ? mockAuthors[article.authorId] : null;

  return (
    <div className="min-h-screen bg-black">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          <article className="lg:col-span-2">
            {isLoading ? (
              <>
                <ArticleHeaderSkeleton />
                <ArticleContentSkeleton />
              </>
            ) : article && author ? (
              <>
                <ArticleHeader article={article} author={author} />
                <div className="relative w-full h-64 md:h-96 lg:h-112.5 rounded-2xl overflow-hidden mb-8 md:mb-12 border border-white/10">
                  <Image
                    fill
                    src={article.images[0]}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
                </div>
                <ArticleContent
                  content={article.content}
                  images={article.images}
                />
                <ShareButtons title={article.title} />
              </>
            ) : null}
          </article>
          <div className="lg:col-span-1">
            {!isLoading && article && (
              <Sidebar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                currentArticleId={article.id}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
