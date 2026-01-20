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
    <div className="flex flex-wrap items-center gap-4 py-10 border-t-2 border-b-2 border-slate-200 my-16">
      <span className="font-semibold text-slate-900 flex items-center gap-2 text-lg">
        <Share2 className="w-5 h-5 text-amber-600" />
        Share Article:
      </span>
      <div className="flex flex-wrap gap-3">
        <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg transition-colors font-medium shadow-md hover:shadow-lg">
          <Twitter className="w-4 h-4" />
          Twitter
        </button>
        <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium shadow-md hover:shadow-lg">
          <Linkedin className="w-4 h-4" />
          LinkedIn
        </button>
        <button
          onClick={handleCopyLink}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-colors font-medium shadow-md hover:shadow-lg"
        >
          <LinkIcon className="w-4 h-4" />
          {copied ? "Copied!" : "Copy Link"}
        </button>
      </div>
    </div>
  );
};
