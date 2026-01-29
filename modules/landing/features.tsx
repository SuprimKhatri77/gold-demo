import { useState, useEffect, useRef } from "react";
import {
  ArrowRight,
  Award,
  Globe,
  Lock,
  Shield,
  Sparkles,
  Users,
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

const features = [
  {
    icon: Shield,
    title: "Certified Authenticity",
    description:
      "Every piece comes with international certification and detailed authentication documentation.",
    color: "blue",
  },
  {
    icon: Award,
    title: "Premium Quality",
    description:
      "We source only the finest gold from trusted refineries meeting the highest purity standards.",
    color: "amber",
  },
  {
    icon: Lock,
    title: "Secure Transactions",
    description:
      "Bank-level security and fully insured shipping for complete peace of mind.",
    color: "cyan",
  },
  {
    icon: Users,
    title: "Expert Consultation",
    description:
      "Our specialists provide personalized guidance to help you make informed decisions.",
    color: "blue",
  },
  {
    icon: Globe,
    title: "Global Network",
    description:
      "Connected to international markets ensuring competitive pricing and rare acquisitions.",
    color: "cyan",
  },
  {
    icon: Sparkles,
    title: "Exclusive Collection",
    description:
      "Access to limited edition pieces and commemorative gold unavailable elsewhere.",
    color: "amber",
  },
];

// Pre-generate particle positions for consistency
const PARTICLES_3D = Array.from({ length: 50 }, (_, i) => ({
  id: i,
  x: (i * 7.234) % 100,
  y: (i * 13.567) % 100,
  z: (i * 5.789) % 100,
  size: 2 + (i % 4),
  speed: 0.5 + (i % 10) * 0.1,
}));

export function Quality() {
  const { ref, isVisible } = useScrollAnimation();
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
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

  return (
    <section
      ref={sectionRef}
      id="quality"
      className="py-24 lg:py-32 bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950 relative overflow-hidden"
    >
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0 transition-transform duration-700 ease-out"
          style={{
            backgroundImage: `linear-gradient(rgba(59,130,246,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.05) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
            transform: `perspective(1000px) rotateX(${mousePosition.y / 50}deg) rotateY(${mousePosition.x / 50}deg)`,
          }}
        />
      </div>

      {/* 3D Interactive Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {PARTICLES_3D.map((particle) => {
          const offsetX = (mousePosition.x - 50) * 0.5;
          const offsetY = (mousePosition.y - 50) * 0.5;
          const depth = particle.z / 100;

          return (
            <div
              key={particle.id}
              className="absolute rounded-full transition-all duration-700 ease-out"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                background:
                  particle.id % 3 === 0
                    ? "rgba(59, 130, 246, 0.4)"
                    : particle.id % 3 === 1
                      ? "rgba(34, 211, 238, 0.4)"
                      : "rgba(251, 191, 36, 0.3)",
                boxShadow:
                  particle.id % 3 === 2
                    ? "0 0 20px rgba(251, 191, 36, 0.6)"
                    : "0 0 15px rgba(59, 130, 246, 0.4)",
                transform: `translate(${offsetX * depth}px, ${offsetY * depth}px) scale(${1 + depth * 0.5})`,
                filter: `blur(${1 + depth}px)`,
                opacity: 0.3 + depth * 0.4,
              }}
            />
          );
        })}
      </div>

      {/* Morphing Gradient Orbs */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full blur-3xl transition-all duration-1000 ease-out"
        style={{
          left: `${mousePosition.x}%`,
          top: `${mousePosition.y}%`,
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(34,211,238,0.1) 50%, transparent 70%)",
        }}
      />
      <div
        className="absolute w-[500px] h-[500px] rounded-full blur-3xl animate-pulse"
        style={{
          left: `${100 - mousePosition.x}%`,
          top: `${100 - mousePosition.y}%`,
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, rgba(251,191,36,0.1) 0%, transparent 70%)",
          animationDelay: "1s",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          ref={ref}
          className={`text-center mb-16 lg:mb-20 transition-all duration-1000 ${
            isVisible
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-12 scale-95"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 mb-6 hover:border-blue-400/40 transition-all duration-300 group">
            <Award
              size={16}
              className="text-amber-500 group-hover:rotate-12 transition-transform duration-300"
            />
            <span className="text-sm font-semibold text-zinc-400 group-hover:text-white transition-colors">
              Why Choose Us
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="block text-white">Unmatched Quality &</span>
            <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent animate-gradient">
              Trust Since 1985
            </span>
          </h2>

          <p className="text-zinc-400 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
            We set the industry standard for excellence, combining decades of
            expertise with cutting-edge certification processes.
          </p>
        </div>

        {/* Feature Cards with 3D Hover Effect */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16 lg:mb-20">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isHovered = hoveredCard === index;

            return (
              <div
                key={index}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`group relative transition-all duration-700 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
                }`}
                style={{
                  transitionDelay: `${index * 100}ms`,
                  transform: isHovered
                    ? "translateY(-12px) scale(1.02)"
                    : "translateY(0) scale(1)",
                }}
              >
                {/* Glow effect on hover */}
                <div
                  className={`absolute inset-0 rounded-2xl blur-xl transition-opacity duration-500 ${
                    isHovered ? "opacity-100" : "opacity-0"
                  }`}
                  style={{
                    background:
                      feature.color === "amber"
                        ? "rgba(251, 191, 36, 0.2)"
                        : feature.color === "cyan"
                          ? "rgba(34, 211, 238, 0.2)"
                          : "rgba(59, 130, 246, 0.2)",
                  }}
                />

                <div className="relative bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10 hover:border-blue-400/40 transition-all duration-500 h-full">
                  {/* Animated gradient overlay */}
                  <div
                    className={`absolute inset-0 rounded-2xl transition-opacity duration-500 pointer-events-none ${
                      isHovered ? "opacity-100" : "opacity-0"
                    }`}
                    style={{
                      background:
                        feature.color === "amber"
                          ? "linear-gradient(135deg, rgba(251,191,36,0.05) 0%, transparent 60%)"
                          : feature.color === "cyan"
                            ? "linear-gradient(135deg, rgba(34,211,238,0.05) 0%, transparent 60%)"
                            : "linear-gradient(135deg, rgba(59,130,246,0.05) 0%, transparent 60%)",
                    }}
                  />

                  <div className="relative">
                    {/* Icon with animated background */}
                    <div className="relative w-16 h-16 mb-6">
                      <div
                        className={`absolute inset-0 rounded-xl transition-all duration-500 ${
                          isHovered
                            ? "rotate-12 scale-110"
                            : "rotate-0 scale-100"
                        }`}
                        style={{
                          background:
                            feature.color === "amber"
                              ? "linear-gradient(135deg, rgba(251,191,36,0.2) 0%, rgba(251,191,36,0.05) 100%)"
                              : feature.color === "cyan"
                                ? "linear-gradient(135deg, rgba(34,211,238,0.2) 0%, rgba(34,211,238,0.05) 100%)"
                                : "linear-gradient(135deg, rgba(59,130,246,0.2) 0%, rgba(59,130,246,0.05) 100%)",
                          boxShadow: isHovered
                            ? feature.color === "amber"
                              ? "0 0 30px rgba(251,191,36,0.3)"
                              : feature.color === "cyan"
                                ? "0 0 30px rgba(34,211,238,0.3)"
                                : "0 0 30px rgba(59,130,246,0.3)"
                            : "none",
                        }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Icon
                          className={`w-7 h-7 transition-all duration-500 ${
                            isHovered
                              ? "scale-110 rotate-12"
                              : "scale-100 rotate-0"
                          }`}
                          style={{
                            color:
                              feature.color === "amber"
                                ? "#fbbf24"
                                : feature.color === "cyan"
                                  ? "#22d3ee"
                                  : "#3b82f6",
                          }}
                        />
                      </div>
                    </div>

                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-blue-400 transition-all duration-300">
                      {feature.title}
                    </h3>

                    <p className="text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors duration-300">
                      {feature.description}
                    </p>
                  </div>

                  {/* Animated corner accent */}
                  <div
                    className={`absolute top-0 right-0 w-24 h-24 transition-all duration-500 ${
                      isHovered ? "opacity-100 scale-100" : "opacity-0 scale-50"
                    }`}
                    style={{
                      background:
                        feature.color === "amber"
                          ? "radial-gradient(circle at top right, rgba(251,191,36,0.15), transparent 70%)"
                          : feature.color === "cyan"
                            ? "radial-gradient(circle at top right, rgba(34,211,238,0.15), transparent 70%)"
                            : "radial-gradient(circle at top right, rgba(59,130,246,0.15), transparent 70%)",
                      borderRadius: "0 1rem 0 0",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Section with Animated Border */}
        <div className="relative group">
          {/* Animated gradient border */}
          <div
            className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradient-x"
            style={{ padding: "2px" }}
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950" />
          </div>

          <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl lg:rounded-3xl p-8 lg:p-12 border border-white/10 group-hover:border-blue-400/40 transition-all duration-500">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="flex-1 text-center lg:text-left">
                <h3 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                  Ready to Explore Our Collection?
                </h3>
                <p className="text-zinc-400 text-lg leading-relaxed">
                  Schedule a consultation with our gold specialists and discover
                  the perfect pieces for your collection.
                </p>
              </div>
              <Link
                href="/contact"
                className="group/btn relative bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white px-10 py-4 rounded-xl transition-all duration-300 font-semibold text-lg flex items-center gap-3 whitespace-nowrap shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-1 overflow-hidden"
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <span className="relative">Book Consultation</span>
                <ArrowRight
                  size={20}
                  className="relative group-hover/btn:translate-x-2 transition-transform duration-300"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
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

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
      `}</style>
    </section>
  );
}
