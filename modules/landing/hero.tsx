import React, { useState, useEffect, useRef } from "react";
import {
  ArrowRight,
  Sparkles,
  TrendingUp,
  ChevronDown,
  Shield,
  Zap,
  Building2,
  Globe,
} from "lucide-react";
import Link from "next/link";

// Pre-generated particle positions
const PARTICLES = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  x: (i * 12.345) % 100,
  y: (i * 8.765) % 100,
  size: 1 + (i % 3),
  duration: 15 + (i % 10),
  delay: (i * 0.3) % 5,
}));

export const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMousePosition({ x, y });
      }
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    // Animated time for wave effects
    const interval = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 50);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      clearInterval(interval);
    };
  }, []);

  const metals = [
    {
      name: "Gold",
      symbol: "AU",
      price: "$2,047",
      change: "+1.2%",
      positive: true,
      color: "from-amber-500 to-yellow-500",
      glow: "rgba(251, 191, 36, 0.3)",
    },
    {
      name: "Silver",
      symbol: "AG",
      price: "$23.84",
      change: "+0.8%",
      positive: true,
      color: "from-slate-300 to-zinc-400",
      glow: "rgba(148, 163, 184, 0.3)",
    },
    {
      name: "Platinum",
      symbol: "PT",
      price: "$912",
      change: "-0.3%",
      positive: false,
      color: "from-cyan-400 to-blue-500",
      glow: "rgba(34, 211, 238, 0.3)",
    },
    {
      name: "Palladium",
      symbol: "PD",
      price: "$1,023",
      change: "+2.1%",
      positive: true,
      color: "from-purple-400 to-indigo-500",
      glow: "rgba(168, 85, 247, 0.3)",
    },
  ];

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-linear-to-b from-slate-950 via-blue-950 to-slate-950"
    >
      {/* Liquid Morphing Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated Grid with Perspective */}
        <div
          className="absolute inset-0 opacity-20 transition-all duration-700"
          style={{
            backgroundImage: `linear-gradient(rgba(59,130,246,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
            transform: `perspective(1000px) rotateX(${scrollY * 0.02}deg) translateY(${scrollY * 0.1}px)`,
          }}
        />

        {/* Morphing Gradient Blobs */}
        <div
          className="absolute w-200 h-200 rounded-full blur-3xl transition-all duration-1000 ease-out"
          style={{
            background: `radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(34,211,238,0.1) 50%, transparent 70%)`,
            left: `${mousePosition.x * 0.5}%`,
            top: `${mousePosition.y * 0.3}%`,
            transform: `translate(-50%, -50%) scale(${1 + Math.sin(time * 0.05) * 0.1})`,
          }}
        />
        <div
          className="absolute w-150 h-150 rounded-full blur-3xl transition-all duration-1000 ease-out"
          style={{
            background: `radial-gradient(circle, rgba(251,191,36,0.1) 0%, rgba(245,158,11,0.05) 50%, transparent 70%)`,
            right: `${mousePosition.x * 0.3}%`,
            bottom: `${mousePosition.y * 0.2}%`,
            transform: `translate(50%, 50%) scale(${1 + Math.cos(time * 0.05) * 0.1})`,
          }}
        />
        <div
          className="absolute w-175 h-175 rounded-full blur-3xl"
          style={{
            background: `radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 70%)`,
            left: "50%",
            top: "50%",
            transform: `translate(-50%, -50%) scale(${1 + Math.sin(time * 0.03) * 0.15})`,
          }}
        />

        {/* Floating Particles */}
        {PARTICLES.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full animate-float-particle"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              background:
                particle.id % 4 === 0
                  ? "rgba(251, 191, 36, 0.4)"
                  : particle.id % 4 === 1
                    ? "rgba(59, 130, 246, 0.4)"
                    : particle.id % 4 === 2
                      ? "rgba(34, 211, 238, 0.4)"
                      : "rgba(168, 85, 247, 0.4)",
              boxShadow: "0 0 20px currentColor",
              animationDuration: `${particle.duration}s`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-center">
          {/* Left Column - Text Content */}
          <div
            className="space-y-6 sm:space-y-8 text-center lg:text-left"
            style={{
              transform: `translateY(${scrollY * 0.1}px)`,
            }}
          >
            {/* Badge with Shimmer */}
            {/* <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 hover:border-blue-400/40 transition-all duration-300 group relative overflow-hidden">
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-linear-to-r from-transparent via-white/10 to-transparent" />
              <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400 group-hover:rotate-12 transition-transform duration-300 relative z-10" />
              <span className="text-xs sm:text-sm text-zinc-300 font-semibold relative z-10">
                B2B Precious Metals Trading
              </span>
            </div> */}

            {/* Main Heading with 3D Effect */}
            <div className="space-y-6 sm:space-y-8">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-[1.15] tracking-tight">
                <span
                  className="block transition-all duration-300"
                  style={{
                    transform: `translateX(${(mousePosition.x - 50) * 0.02}px) translateY(${(mousePosition.y - 50) * 0.02}px)`,
                  }}
                >
                  Professional
                </span>
                <span
                  className="block mt-1 transition-all duration-300"
                  style={{
                    transform: `translateX(${(mousePosition.x - 50) * -0.02}px) translateY(${(mousePosition.y - 50) * -0.02}px)`,
                  }}
                >
                  <span className="relative">
                    <span className="absolute inset-0 bg-linear-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent blur-lg opacity-50">
                      Precious Metals
                    </span>
                    <span className="relative bg-linear-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                      Precious Metals
                    </span>
                  </span>
                </span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-zinc-400 max-w-2xl leading-relaxed font-light">
                Your trusted partner for{" "}
                <span className="text-white font-medium">bulk trading</span> of
                gold, silver, platinum, and palladium. Competitive pricing,
                secure logistics, and global reach.
              </p>
            </div>

            {/* CTA Buttons with Advanced Effects */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start px-4 sm:px-0">
              <Link
                href="/contact"
                className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-linear-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-bold overflow-hidden hover:shadow-2xl hover:shadow-blue-500/40 transition-all duration-300 hover:scale-105 text-base sm:text-lg"
              >
                {/* Animated gradient overlay */}
                <div className="absolute inset-0 bg-linear-to-r from-cyan-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                {/* Shimmer effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-linear-to-r from-transparent via-white/30 to-transparent" />
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Request Quote
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-2 transition-transform duration-300" />
                </span>
              </Link>

              <Link
                href="/contact"
                className="group px-6 sm:px-8 py-3 sm:py-4 bg-white/5 backdrop-blur-xl text-white rounded-xl font-bold border border-white/10 hover:border-blue-400/50 hover:bg-white/10 transition-all duration-300 hover:scale-105 text-base sm:text-lg"
              >
                <span className="flex items-center justify-center gap-2">
                  Become a Partner
                  <Globe className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-12 transition-transform duration-300" />
                </span>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 pt-4">
              <div className="flex items-center gap-2 text-zinc-400">
                <div className="flex -space-x-2">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-linear-to-br from-blue-400 to-cyan-400 border-2 border-slate-950 flex items-center justify-center">
                    <Building2 className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </div>
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-linear-to-br from-amber-400 to-yellow-400 border-2 border-slate-950 flex items-center justify-center">
                    <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </div>
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-linear-to-br from-purple-400 to-indigo-400 border-2 border-slate-950 flex items-center justify-center">
                    <Globe className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </div>
                </div>
                <span className="text-xs sm:text-sm font-medium">
                  <span className="text-white">500+</span> Business Partners
                </span>
              </div>
              <div className="text-zinc-400 text-xs sm:text-sm font-medium">
                <span className="text-white">$5.8B+</span> Annual Volume
              </div>
            </div>
          </div>

          {/* Right Column - Floating Metal Cards */}
          <div
            className="relative mt-8 lg:mt-0"
            style={{
              transform: `translateY(${scrollY * -0.05}px)`,
            }}
          >
            {/* Main Card - 3D Perspective */}
            <div
              className="relative perspective-1000"
              style={{
                transform: `rotateY(${(mousePosition.x - 50) * 0.1}deg) rotateX(${(mousePosition.y - 50) * -0.1}deg)`,
                transition: "transform 0.3s ease-out",
              }}
            >
              <div className="group relative p-6 sm:p-8 rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/10 hover:border-blue-400/40 transition-all duration-500 shadow-2xl hover:shadow-blue-500/20">
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-blue-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative space-y-5 sm:space-y-6">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
                        Today&apos;s Rates
                      </h3>
                      <p className="text-xs sm:text-sm text-zinc-400">
                        Live wholesale pricing
                      </p>
                    </div>
                    <div className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-green-500/10 border border-green-500/20">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-xs font-bold text-green-400">
                        LIVE
                      </span>
                    </div>
                  </div>

                  {/* Metals Grid - IMPROVED HOVER STATE */}
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    {metals.map((metal, index) => (
                      <div
                        key={metal.name}
                        className="group/card relative p-4 sm:p-5 rounded-2xl bg-slate-900/50 backdrop-blur-sm border border-white/10 hover:border-blue-400/40 transition-all duration-300 cursor-pointer overflow-hidden hover:-translate-y-1 hover:bg-slate-800/60"
                        style={{
                          animationDelay: `${index * 100}ms`,
                        }}
                      >
                        {/* Subtle glow on hover - REDUCED OPACITY */}
                        <div
                          className="absolute inset-0 opacity-0 group-hover/card:opacity-20 transition-opacity duration-500 blur-2xl pointer-events-none"
                          style={{
                            background: metal.glow,
                          }}
                        />

                        {/* Very subtle gradient overlay - MUCH LIGHTER */}
                        <div
                          className={`absolute inset-0 opacity-0 group-hover/card:opacity-5 transition-opacity duration-500 bg-linear-to-br ${metal.color} pointer-events-none`}
                        />

                        <div className="relative z-10">
                          {/* Symbol Badge */}
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-bold text-zinc-500 tracking-wider">
                              {metal.symbol}
                            </span>
                            <div
                              className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-linear-to-br ${metal.color} opacity-15 group-hover/card:opacity-25 transition-opacity duration-300 flex items-center justify-center`}
                            >
                              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                            </div>
                          </div>

                          {/* Metal Name */}
                          <h4 className="text-xs sm:text-sm font-semibold text-zinc-400 group-hover/card:text-zinc-300 mb-2 transition-colors">
                            {metal.name}
                          </h4>

                          {/* Price - ALWAYS READABLE */}
                          <div className="text-xl sm:text-2xl font-bold text-white mb-2 drop-shadow-lg">
                            {metal.price}
                          </div>

                          {/* Change - ALWAYS READABLE */}
                          <div
                            className={`flex items-center gap-1 text-xs sm:text-sm font-semibold ${
                              metal.positive ? "text-green-400" : "text-red-400"
                            } drop-shadow-lg`}
                          >
                            <TrendingUp
                              className={`w-3 h-3 sm:w-4 sm:h-4 ${metal.positive ? "" : "rotate-180"}`}
                            />
                            <span>{metal.change}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pricing Note */}
                  <div className="pt-4 border-t border-white/10">
                    <p className="text-xs text-zinc-500 text-center">
                      Wholesale pricing available for bulk orders •{" "}
                      <span className="text-cyan-400">
                        Volume discounts apply
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Floating Elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 sm:w-32 sm:h-32 border-2 border-blue-500/20 rounded-full blur-sm animate-spin-slow" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 sm:w-40 sm:h-40 border-2 border-cyan-500/10 rounded-full blur-sm animate-spin-slow-reverse" />

            {/* Floating badges */}
            <div className="absolute -top-4 -left-12 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 text-xs font-bold text-white shadow-xl animate-float-badge hidden lg:flex items-center gap-2">
              <Shield className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-400" />
              Secure Logistics
            </div>
            <div className="absolute -bottom-4 -right-8 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 text-xs font-bold text-white shadow-xl animate-float-badge-delayed hidden lg:flex items-center gap-2">
              <Zap className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400" />
              Fast Settlement
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:block animate-bounce">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-zinc-500 uppercase tracking-widest font-semibold">
            Scroll to Explore
          </span>
          <ChevronDown className="w-6 h-6 text-blue-400" />
        </div>
      </div>

      <style jsx>{`
        @keyframes float-particle {
          0%,
          100% {
            transform: translateY(0) translateX(0);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-30px) translateX(15px);
            opacity: 0.8;
          }
        }

        @keyframes gradient-x {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes spin-slow-reverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }

        @keyframes float-badge {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-float-particle {
          animation: float-particle linear infinite;
        }

        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }

        .animate-spin-slow-reverse {
          animation: spin-slow-reverse 25s linear infinite;
        }

        .animate-float-badge {
          animation: float-badge 3s ease-in-out infinite;
        }

        .animate-float-badge-delayed {
          animation: float-badge 3s ease-in-out infinite;
          animation-delay: 1.5s;
        }

        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </section>
  );
};
