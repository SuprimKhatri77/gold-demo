import { useState, useEffect, useRef } from "react";
import { ArrowRight, Award, Lock, Phone, Shield, Sparkles } from "lucide-react";

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

  const features = [
    { icon: Shield, text: "Certified Authentic" },
    { icon: Lock, text: "Secure Process" },
    { icon: Award, text: "38+ Years Trusted" },
  ];

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-b from-zinc-950 via-black to-zinc-950"></div>

      {/* Subtle accent glow */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-amber-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 md:w-96 md:h-96 bg-amber-600/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div
          ref={ref}
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          {/* Sparkle icon */}
          <div className="flex items-center justify-center gap-3 mb-6 md:mb-8">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-white/5 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/10">
              <Sparkles className="text-amber-400 w-6 h-6 md:w-8 md:h-8" />
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 md:mb-8 leading-tight">
            Start Your Gold
            <span className="block text-white mt-1 md:mt-2">
              Collection Journey Today
            </span>
          </h2>

          {/* Description */}
          <p className="text-zinc-400 text-base md:text-lg lg:text-xl xl:text-2xl mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed">
            Join thousands of collectors who trust GoldPremium for authentic,
            certified gold pieces. Our experts are ready to guide you.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center mb-12 md:mb-16">
            <button className="group relative bg-white text-black px-8 md:px-10 lg:px-12 py-4 md:py-5 lg:py-6 rounded-full hover:bg-amber-400 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold text-base md:text-lg lg:text-xl transform hover:scale-105 overflow-hidden">
              <span className="relative z-10 flex items-center justify-center gap-2 md:gap-3">
                Browse Collection
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </span>
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </button>

            <button className="group bg-white/5 backdrop-blur-md text-white px-8 md:px-10 lg:px-12 py-4 md:py-5 lg:py-6 rounded-full hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20 font-semibold text-base md:text-lg lg:text-xl transform hover:scale-105 flex items-center justify-center gap-2 md:gap-3">
              <Phone
                size={20}
                className="group-hover:rotate-12 transition-transform"
              />
              Schedule Consultation
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 lg:gap-12">
            {features.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="flex items-center gap-2 md:gap-3 bg-white/5 backdrop-blur-sm px-4 md:px-6 py-2 md:py-3 rounded-full border border-white/10"
                >
                  <Icon className="text-amber-400 w-5 h-5 md:w-6 md:h-6" />
                  <span className="text-zinc-300 font-medium text-sm md:text-base">
                    {item.text}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
