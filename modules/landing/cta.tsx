import { useState, useEffect, useRef } from "react";
import {
  ArrowRight,
  Award,
  Lock,
  Phone,
  Shield,
  Sparkles,
  Zap,
} from "lucide-react";
import Link from "next/link";

const useScrollAnimation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return { ref, isVisible };
};

export function CTASection() {
  const { ref, isVisible } = useScrollAnimation();
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMousePosition({ x, y });
      }
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener("mousemove", handleMouseMove);
      return () => section.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  const features = [
    { icon: Shield, text: "Certified Authentic", color: "blue" },
    { icon: Lock, text: "Secure Process", color: "cyan" },
    { icon: Award, text: "38+ Years Trusted", color: "amber" },
    { icon: Zap, text: "Instant Verification", color: "purple" },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-24 lg:py-32 bg-linear-to-b from-slate-950 via-blue-950 to-slate-950 relative overflow-hidden"
    >
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(59,130,246,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.03) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Dynamic gradient orbs that follow mouse */}
      <div
        className="absolute w-150 h-150 rounded-full blur-3xl transition-all duration-700"
        style={{
          background:
            "radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(34,211,238,0.1) 50%, transparent 70%)",
          left: `${mousePosition.x}%`,
          top: `${mousePosition.y}%`,
          transform: "translate(-50%, -50%)",
        }}
      />
      <div
        className="absolute w-125 h-125 rounded-full blur-3xl transition-all duration-1000"
        style={{
          background:
            "radial-gradient(circle, rgba(251,191,36,0.1) 0%, transparent 70%)",
          right: `${100 - mousePosition.x}%`,
          bottom: `${100 - mousePosition.y}%`,
          transform: "translate(50%, 50%)",
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div
          ref={ref}
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          {/* Animated Icon */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="relative group">
              {/* Pulsing rings */}
              <div className="absolute inset-0 w-20 h-20 bg-amber-500/20 rounded-full animate-ping" />
              <div
                className="absolute inset-0 w-20 h-20 bg-blue-500/20 rounded-full animate-ping"
                style={{ animationDelay: "0.5s" }}
              />

              {/* Main icon container */}
              <div className="relative w-20 h-20 bg-white/5 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/10 group-hover:border-blue-400/40 transition-all duration-300 group-hover:scale-110">
                <div className="absolute inset-0 bg-linear-to-br from-blue-500/20 to-amber-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Sparkles className="relative text-amber-400 w-9 h-9 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
          </div>

          {/* Heading with Gradient Animation */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight tracking-tight">
            <span className="block text-white">Start Your Gold</span>
            <span className="block mt-2 relative">
              <span className="absolute inset-0 bg-linear-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent blur-lg opacity-50">
                Collection Journey
              </span>
              <span className="relative bg-linear-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent animate-gradient-x">
                Collection Journey
              </span>
            </span>
          </h2>

          {/* Description */}
          <p className="text-zinc-400 text-lg sm:text-xl lg:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed">
            Join <span className="text-white font-semibold">150,000+</span>{" "}
            collectors who trust SR Jewellers for authentic, certified gold
            pieces. Our experts are ready to guide you.
          </p>

          {/* CTA Buttons with Magnetic Effect */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            {/* Primary Button */}
            <Link href="/our-products" className="group relative">
              <div className="absolute -inset-1 bg-linear-to-r from-blue-600 via-cyan-600 to-blue-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-500 animate-gradient-x" />
              <div className="relative bg-linear-to-r from-blue-600 to-cyan-600 text-white px-10 py-5  font-bold text-lg overflow-hidden hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105">
                {/* Shimmer effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-linear-to-r from-transparent via-white/30 to-transparent" />
                <span className="relative flex items-center justify-center gap-3">
                  Browse Collection
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                </span>
              </div>
            </Link>

            {/* Secondary Button */}
            <Link
              href="/contact"
              className="group relative bg-white/5 backdrop-blur-xl text-white px-10 py-5  font-bold text-lg border border-white/10 hover:border-blue-400/50 hover:bg-white/10 transition-all duration-300 hover:scale-105 overflow-hidden"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-linear-to-r from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative flex items-center justify-center gap-3">
                <Phone className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                Schedule Consultation
              </span>
            </Link>
          </div>

          {/* Floating Trust Badges */}
          <div className="relative">
            {/* Connection lines (subtle) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-full max-w-4xl h-px bg-linear-to-r from-transparent via-blue-400/20 to-transparent" />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 lg:gap-6">
              {features.map((item, index) => {
                const Icon = item.icon;
                const colors = {
                  blue: {
                    bg: "from-blue-500/10 to-cyan-500/5",
                    border: "border-blue-400/30",
                    icon: "text-blue-400",
                    glow: "group-hover:shadow-blue-500/20",
                  },
                  cyan: {
                    bg: "from-cyan-500/10 to-blue-500/5",
                    border: "border-cyan-400/30",
                    icon: "text-cyan-400",
                    glow: "group-hover:shadow-cyan-500/20",
                  },
                  amber: {
                    bg: "from-amber-500/10 to-yellow-500/5",
                    border: "border-amber-400/30",
                    icon: "text-amber-400",
                    glow: "group-hover:shadow-amber-500/20",
                  },
                  purple: {
                    bg: "from-purple-500/10 to-indigo-500/5",
                    border: "border-purple-400/30",
                    icon: "text-purple-400",
                    glow: "group-hover:shadow-purple-500/20",
                  },
                };
                const colorScheme = colors[item.color as keyof typeof colors];

                return (
                  <div
                    key={index}
                    className={`group relative transition-all duration-500 hover:scale-110 ${
                      isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-8"
                    }`}
                    style={{
                      transitionDelay: `${index * 100 + 500}ms`,
                    }}
                  >
                    {/* Glow effect */}
                    <div
                      className={`absolute inset-0 bg-linear-to-br ${colorScheme.bg} rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    />

                    {/* Badge */}
                    <div
                      className={`relative flex items-center gap-3 bg-white/5 backdrop-blur-xl px-6 py-3 rounded-full border ${colorScheme.border} ${colorScheme.glow} shadow-lg transition-all duration-300`}
                    >
                      <div className="relative">
                        {/* Icon glow ring */}
                        <div
                          className={`absolute inset-0 bg-linear-to-br ${colorScheme.bg} rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                        />
                        <Icon
                          className={`relative ${colorScheme.icon} w-5 h-5 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}
                        />
                      </div>
                      <span className="text-white font-semibold text-sm whitespace-nowrap">
                        {item.text}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Stats */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-8 pt-8 border-t border-white/5">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">$2.4B+</div>
              <div className="text-sm text-zinc-500">Trading Volume</div>
            </div>
            <div className="w-px h-12 bg-white/10" />
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">150K+</div>
              <div className="text-sm text-zinc-500">Active Traders</div>
            </div>
            <div className="w-px h-12 bg-white/10" />
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">24/7</div>
              <div className="text-sm text-zinc-500">Support</div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient-x {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
      `}</style>
    </section>
  );
}
