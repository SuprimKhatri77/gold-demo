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
  const insertImageAt = Math.floor(paragraphs.length / 3);
  const insertSecondImageAt = Math.floor((paragraphs.length * 2) / 3);

  return (
    <div className="space-y-6 md:space-y-8">
      {paragraphs.map((paragraph, index) => {
        const trimmed = paragraph.trim();
        const isHeading = trimmed.length < 60 && !trimmed.endsWith(".");

        return (
          <React.Fragment key={index}>
            {isHeading ? (
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mt-10 md:mt-12 mb-4 md:mb-6 pb-3 md:pb-4 border-b border-white/10">
                {trimmed}
              </h2>
            ) : (
              <p className="text-base md:text-lg text-zinc-300 leading-relaxed p-6 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 hover:border-blue-400/20 transition-all duration-300">
                {trimmed}
              </p>
            )}

            {/* First Image */}
            {index === insertImageAt && images.length > 1 && (
              <div className="my-8 md:my-12">
                <div className="relative w-full h-64 md:h-96 lg:h-125 rounded-xl md:rounded-2xl overflow-hidden border border-white/10 hover:border-blue-400/40 backdrop-blur-xl transition-all duration-300 group">
                  <NextImage
                    src={images[1]}
                    alt="Market analysis illustration"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-950/60 via-blue-950/30 to-transparent"></div>
                </div>
              </div>
            )}

            {/* Second Image */}
            {index === insertSecondImageAt && images.length > 2 && (
              <div className="my-8 md:my-12">
                <div className="relative w-full h-64 md:h-96 lg:h-125 rounded-xl md:rounded-2xl overflow-hidden border border-white/10 hover:border-blue-400/40 backdrop-blur-xl transition-all duration-300 group">
                  <NextImage
                    src={images[2]}
                    alt="Industry insights illustration"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-950/60 via-blue-950/30 to-transparent"></div>
                </div>
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
