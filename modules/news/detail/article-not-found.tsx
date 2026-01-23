import { AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

export const NotFoundState: React.FC = () => (
  <div className="min-h-screen bg-black">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 md:py-20">
      <div className="bg-white/5 backdrop-blur-md rounded-2xl md:rounded-3xl border border-white/10 p-8 sm:p-12 md:p-16 text-center">
        <div className="w-20 h-20 md:w-24 md:h-24 bg-amber-500/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8 border border-amber-500/20">
          <AlertCircle className="w-10 h-10 md:w-12 md:h-12 text-amber-500" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Article Not Found
        </h1>
        <p className="text-base md:text-lg text-zinc-400 mb-8 max-w-md mx-auto leading-relaxed">
          We couldn&apos;t find the article you&apos;re looking for. It may have
          been moved or deleted.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/news"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-amber-500/30 text-white font-semibold rounded-lg transition-all duration-300 backdrop-blur-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to News
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold rounded-lg transition-all duration-300 shadow-lg shadow-amber-500/20"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  </div>
);
