import { AlertCircle, ArrowLeft, Home } from "lucide-react";
import Link from "next/link";

export const NotFoundState: React.FC = () => (
  <div className="min-h-screen bg-linear-to-b from-slate-950 via-blue-950 to-slate-950 relative">
    {/* Background Grid Pattern */}
    <div className="absolute inset-0 opacity-30">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(rgba(59,130,246,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.03) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      ></div>
    </div>

    {/* Floating Gradient Orbs */}
    <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
    <div
      className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"
      style={{ animationDelay: "1s" }}
    ></div>

    <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-16 md:py-20">
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl md:rounded-3xl border border-white/10 p-8 sm:p-12 md:p-16 text-center hover:border-blue-400/40 transition-all duration-300">
        <div className="w-20 h-20 md:w-24 md:h-24 bg-blue-500/10 backdrop-blur-xl rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8 border border-blue-400/20 animate-pulse">
          <AlertCircle className="w-10 h-10 md:w-12 md:h-12 text-cyan-400" />
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Report Not Found
        </h1>

        <p className="text-base md:text-lg text-zinc-400 mb-8 max-w-md mx-auto leading-relaxed">
          The market intelligence report you&apos;re looking for could not be
          found. It may have been archived or the URL is incorrect.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/news"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-400/40 text-white font-semibold rounded-xl transition-all duration-300 backdrop-blur-xl group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
            Back to Market Intelligence
          </Link>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-linear-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:scale-105 group"
          >
            <Home className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  </div>
);
