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
  },
  {
    icon: Award,
    title: "Premium Quality",
    description:
      "We source only the finest gold from trusted refineries meeting the highest purity standards.",
  },
  {
    icon: Lock,
    title: "Secure Transactions",
    description:
      "Bank-level security and fully insured shipping for complete peace of mind.",
  },
  {
    icon: Users,
    title: "Expert Consultation",
    description:
      "Our specialists provide personalized guidance to help you make informed decisions.",
  },
  {
    icon: Globe,
    title: "Global Network",
    description:
      "Connected to international markets ensuring competitive pricing and rare acquisitions.",
  },
  {
    icon: Sparkles,
    title: "Exclusive Collection",
    description:
      "Access to limited edition pieces and commemorative gold unavailable elsewhere.",
  },
];

export function Quality() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      id="quality"
      className="py-16 md:py-24 lg:py-32 bg-black text-white relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-linear-to-b from-zinc-950 via-black to-zinc-950"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          ref={ref}
          className={`text-center mb-12 md:mb-16 lg:mb-20 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-6">
            <Award size={16} className="text-amber-400" />
            <span className="text-sm font-medium text-zinc-400">
              Why Choose Us
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight">
            Unmatched Quality &
            <span className="block text-white mt-1">Trust Since 1985</span>
          </h2>

          <p className="text-zinc-400 text-base md:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed">
            We set the industry standard for excellence, combining decades of
            expertise with cutting-edge certification processes.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 mb-12 md:mb-16 lg:mb-20">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className={`group relative bg-white/5 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-500 hover:-translate-y-1 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="absolute inset-0 bg-linear-to-br from-amber-500/0 via-amber-500/0 to-amber-500/0 group-hover:from-amber-500/5 group-hover:via-transparent group-hover:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"></div>

                <div className="relative">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4 md:mb-6 border border-white/10 group-hover:border-amber-400/30 group-hover:bg-amber-400/10 transition-all duration-300 text-white group-hover:text-amber-400">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 text-white">
                    {feature.title}
                  </h3>

                  <p className="text-sm md:text-base text-zinc-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-white/5 backdrop-blur-md rounded-2xl lg:rounded-3xl p-6 md:p-8 lg:p-12 border border-white/10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
            <div className="flex-1 text-center lg:text-left">
              <h3 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">
                Ready to Explore Our Collection?
              </h3>
              <p className="text-zinc-400 text-base md:text-lg">
                Schedule a consultation with our gold specialists and discover
                the perfect pieces for your collection.
              </p>
            </div>
            <button className="group bg-white text-black px-6 md:px-8 lg:px-10 py-3 md:py-4 rounded-full hover:bg-amber-400 transition-all duration-300 font-semibold text-sm md:text-base transform hover:scale-105 flex items-center gap-2 md:gap-3 whitespace-nowrap shadow-lg hover:shadow-xl">
              Book Consultation
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
