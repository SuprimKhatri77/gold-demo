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
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-6 md:p-8 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-blue-400/40 transition-all duration-300 my-12 md:my-16">
      <span className="font-semibold text-white flex items-center gap-2 text-base md:text-lg">
        <Share2 className="w-5 h-5 text-cyan-400" />
        Share This Report:
      </span>

      <div className="flex flex-wrap gap-2 md:gap-3">
        <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/5 backdrop-blur-xl hover:bg-white/10 text-white rounded-xl transition-all duration-300 font-medium border border-white/10 hover:border-blue-400/40 group">
          <Twitter className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
          <span className="hidden sm:inline">Twitter</span>
        </button>

        <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/5 backdrop-blur-xl hover:bg-white/10 text-white rounded-xl transition-all duration-300 font-medium border border-white/10 hover:border-blue-400/40 group">
          <Linkedin className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
          <span className="hidden sm:inline">LinkedIn</span>
        </button>

        <button
          onClick={handleCopyLink}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/5 backdrop-blur-xl hover:bg-cyan-500/10 text-white rounded-xl transition-all duration-300 font-medium border border-white/10 hover:border-cyan-400/40 group"
        >
          <LinkIcon
            className={`w-4 h-4 ${copied ? "text-green-400" : "text-cyan-400"} group-hover:scale-110 transition-all duration-300`}
          />
          <span>{copied ? "Copied!" : "Copy Link"}</span>
        </button>
      </div>
    </div>
  );
};
