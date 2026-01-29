import React, { useState, useEffect, useRef } from "react";
import {
  ArrowRight,
  Sparkles,
  TrendingUp,
  ChevronDown,
  Shield,
  Zap,
} from "lucide-react";

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
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950"
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
          className="absolute w-[800px] h-[800px] rounded-full blur-3xl transition-all duration-1000 ease-out"
          style={{
            background: `radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(34,211,238,0.1) 50%, transparent 70%)`,
            left: `${mousePosition.x * 0.5}%`,
            top: `${mousePosition.y * 0.3}%`,
            transform: `translate(-50%, -50%) scale(${1 + Math.sin(time * 0.05) * 0.1})`,
          }}
        />
        <div
          className="absolute w-[600px] h-[600px] rounded-full blur-3xl transition-all duration-1000 ease-out"
          style={{
            background: `radial-gradient(circle, rgba(251,191,36,0.1) 0%, rgba(245,158,11,0.05) 50%, transparent 70%)`,
            right: `${mousePosition.x * 0.3}%`,
            bottom: `${mousePosition.y * 0.2}%`,
            transform: `translate(50%, 50%) scale(${1 + Math.cos(time * 0.05) * 0.1})`,
          }}
        />
        <div
          className="absolute w-[700px] h-[700px] rounded-full blur-3xl"
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
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Text Content */}
          <div
            className="space-y-8 text-center lg:text-left"
            style={{
              transform: `translateY(${scrollY * 0.1}px)`,
            }}
          >
            {/* Badge with Shimmer */}
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 hover:border-blue-400/40 transition-all duration-300 group relative overflow-hidden">
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              <Sparkles className="w-4 h-4 text-amber-500 group-hover:rotate-12 transition-transform duration-300 relative z-10" />
              <span className="text-sm text-zinc-300 font-semibold relative z-10">
                Premium Metals Marketplace
              </span>
            </div>

            {/* Main Heading with 3D Effect */}
            <div className="space-y-6">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] tracking-tight">
                <span
                  className="block transition-all duration-300"
                  style={{
                    transform: `translateX(${(mousePosition.x - 50) * 0.02}px) translateY(${(mousePosition.y - 50) * 0.02}px)`,
                  }}
                >
                  Invest in
                </span>
                <span
                  className="block mt-3 relative inline-block"
                  style={{
                    transform: `translateX(${(mousePosition.x - 50) * -0.02}px) translateY(${(mousePosition.y - 50) * -0.02}px)`,
                  }}
                >
                  <span className="relative">
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent blur-lg opacity-50">
                      Precious Metals
                    </span>
                    <span className="relative bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent animate-gradient-x">
                      Precious Metals
                    </span>
                  </span>
                </span>
              </h1>
              <p className="text-xl sm:text-2xl text-zinc-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
                Trade gold, silver, platinum, and palladium with{" "}
                <span className="text-white font-medium">confidence</span>.
                Real-time pricing, secure transactions, and expert insights.
              </p>
            </div>

            {/* CTA Buttons with Advanced Effects */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-bold overflow-hidden hover:shadow-2xl hover:shadow-blue-500/40 transition-all duration-300 hover:scale-105 text-lg">
                {/* Animated gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                {/* Shimmer effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Start Trading Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                </span>
              </button>

              <button className="group px-8 py-4 bg-white/5 backdrop-blur-xl text-white rounded-xl font-bold border border-white/10 hover:border-blue-400/50 hover:bg-white/10 transition-all duration-300 hover:scale-105 text-lg">
                <span className="flex items-center justify-center gap-2">
                  Speak with Expert
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                </span>
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-4">
              <div className="flex items-center gap-2 text-zinc-400">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 border-2 border-slate-950" />
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-yellow-400 border-2 border-slate-950" />
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-indigo-400 border-2 border-slate-950" />
                </div>
                <span className="text-sm font-medium">
                  <span className="text-white">150K+</span> Active Traders
                </span>
              </div>
              <div className="text-zinc-400 text-sm font-medium">
                <span className="text-white">$2.4B+</span> Trading Volume
              </div>
            </div>
          </div>

          {/* Right Column - Floating Metal Cards */}
          <div
            className="relative"
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
              <div className="group relative p-8 rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/10 hover:border-blue-400/40 transition-all duration-500 shadow-2xl hover:shadow-blue-500/20">
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative space-y-6">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1">
                        Live Markets
                      </h3>
                      <p className="text-sm text-zinc-400">
                        Real-time precious metal prices
                      </p>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-xs font-bold text-green-400">
                        LIVE
                      </span>
                    </div>
                  </div>

                  {/* Metals Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    {metals.map((metal, index) => (
                      <div
                        key={metal.name}
                        className="group/card relative p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer overflow-hidden hover:-translate-y-1"
                        style={{
                          animationDelay: `${index * 100}ms`,
                        }}
                      >
                        {/* Glow on hover */}
                        <div
                          className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 blur-xl"
                          style={{
                            background: metal.glow,
                          }}
                        />

                        {/* Gradient overlay */}
                        <div
                          className={`absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${metal.color} opacity-5`}
                        />

                        <div className="relative">
                          {/* Symbol Badge */}
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-bold text-zinc-500 tracking-wider">
                              {metal.symbol}
                            </span>
                            <div
                              className={`w-8 h-8 rounded-lg bg-gradient-to-br ${metal.color} opacity-20 group-hover/card:opacity-40 transition-opacity duration-300 flex items-center justify-center`}
                            >
                              <Sparkles className="w-4 h-4 text-white" />
                            </div>
                          </div>

                          {/* Metal Name */}
                          <h4 className="text-sm font-semibold text-zinc-400 mb-2">
                            {metal.name}
                          </h4>

                          {/* Price */}
                          <div className="text-2xl font-bold text-white mb-2">
                            {metal.price}
                          </div>

                          {/* Change */}
                          <div
                            className={`flex items-center gap-1 text-sm font-semibold ${
                              metal.positive ? "text-green-400" : "text-red-400"
                            }`}
                          >
                            <TrendingUp
                              className={`w-4 h-4 ${metal.positive ? "" : "rotate-180"}`}
                            />
                            <span>{metal.change}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Quick Action Button */}
                  <button className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 group/btn shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40">
                    <span>View All Markets</span>
                    <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            </div>

            {/* Decorative Floating Elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 border-2 border-blue-500/20 rounded-full blur-sm animate-spin-slow" />
            <div className="absolute -bottom-6 -left-6 w-40 h-40 border-2 border-cyan-500/10 rounded-full blur-sm animate-spin-slow-reverse" />

            {/* Floating badges */}
            <div className="absolute -top-4 -left-12 px-4 py-2 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 text-xs font-bold text-white shadow-xl animate-float-badge hidden lg:flex items-center gap-2">
              <Shield className="w-3.5 h-3.5 text-blue-400" />
              Secure Trading
            </div>
            <div className="absolute -bottom-4 -right-8 px-4 py-2 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 text-xs font-bold text-white shadow-xl animate-float-badge-delayed hidden lg:flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              Instant Settlement
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
