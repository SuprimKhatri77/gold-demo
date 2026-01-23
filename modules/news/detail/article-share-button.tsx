"use client";

import { Linkedin, LinkIcon, Share2, Twitter } from "lucide-react";
import { ShareButtonsProps } from "./news-detail";
import { useState } from "react";

export const ShareButtons: React.FC<ShareButtonsProps> = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = (): void => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 py-8 md:py-10 border-t border-b border-white/10 my-12 md:my-16">
      <span className="font-semibold text-white flex items-center gap-2 text-base md:text-lg">
        <Share2 className="w-5 h-5 text-amber-500/70" />
        Share Article:
      </span>

      <div className="flex flex-wrap gap-2 md:gap-3">
        <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/5 backdrop-blur-md hover:bg-white/10 text-white rounded-lg transition-all duration-300 font-medium border border-white/10 hover:border-white/20">
          <Twitter className="w-4 h-4" />
          <span className="hidden sm:inline">Twitter</span>
        </button>

        <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/5 backdrop-blur-md hover:bg-white/10 text-white rounded-lg transition-all duration-300 font-medium border border-white/10 hover:border-white/20">
          <Linkedin className="w-4 h-4" />
          <span className="hidden sm:inline">LinkedIn</span>
        </button>

        <button
          onClick={handleCopyLink}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/5 backdrop-blur-md hover:bg-amber-500/20 text-white rounded-lg transition-all duration-300 font-medium border border-white/10 hover:border-amber-500/30"
        >
          <LinkIcon className="w-4 h-4 text-amber-500/70" />
          <span>{copied ? "Copied!" : "Copy Link"}</span>
        </button>
      </div>
    </div>
  );
};
