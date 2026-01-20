"use client";

import Image from "next/image";
import React from "react";

interface NextImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}
interface ArticleContentProps {
  content: string;
  images: string[];
}

const NextImage: React.FC<NextImageProps> = ({
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
export const ArticleContent: React.FC<ArticleContentProps> = ({
  content,
  images,
}) => {
  const paragraphs = content.split("\n\n").filter((p) => p.trim());

  // Insert images at strategic points in the content
  const insertImageAt = Math.floor(paragraphs.length / 3);
  const insertSecondImageAt = Math.floor((paragraphs.length * 2) / 3);

  return (
    <div className="space-y-8">
      {paragraphs.map((paragraph, index) => {
        const trimmed = paragraph.trim();
        const isHeading = trimmed.length < 60 && !trimmed.endsWith(".");

        return (
          <React.Fragment key={index}>
            {isHeading ? (
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-12 mb-6 pb-4 border-b-2 border-amber-200">
                {trimmed}
              </h2>
            ) : (
              <p className="text-lg text-slate-700 leading-[1.8] font-normal">
                {trimmed}
              </p>
            )}

            {/* Insert first additional image */}
            {index === insertImageAt && images.length > 1 && (
              <div className="my-12">
                <div className="relative w-full h-100 md:h-125 rounded-2xl overflow-hidden shadow-2xl">
                  <NextImage
                    src={images[1]}
                    alt="Article illustration"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-900/20 to-transparent"></div>
                </div>
              </div>
            )}

            {/* Insert second additional image */}
            {index === insertSecondImageAt && images.length > 2 && (
              <div className="my-12">
                <div className="relative w-full h-100 md:h-125 rounded-2xl overflow-hidden shadow-2xl">
                  <NextImage
                    src={images[2]}
                    alt="Article illustration"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-900/20 to-transparent"></div>
                </div>
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
