import React, { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Award,
  Shield,
  Sparkles,
  TrendingUp,
  Zap,
} from "lucide-react";

const useScrollAnimation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return { ref, isVisible };
};

interface Stat {
  number: string;
  label: string;
  suffix?: string;
}

const stats: Stat[] = [
  { number: "38", label: "Years of Excellence", suffix: "+" },
  { number: "50K", label: "Satisfied Clients", suffix: "+" },
  { number: "500M", label: "Gold Value Delivered", suffix: "+" },
  { number: "99.9", label: "Customer Satisfaction", suffix: "%" },
];

export const About: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      id="about"
      className="py-16 sm:py-20 lg:py-28 bg-linear-to-b from-white via-amber-50/30 to-white relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-amber-200/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-amber-300/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div
            ref={ref}
            className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}
          >
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <Zap className="text-amber-600 w-5 h-5 sm:w-6 sm:h-6" />
              <span className="text-amber-600 font-bold tracking-wider uppercase text-xs sm:text-sm">
                About Us
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6 sm:mb-8 leading-tight">
              Crafting Excellence in
              <span className="block bg-linear-to-r from-amber-600 via-amber-500 to-amber-700 bg-clip-text text-transparent mt-1 sm:mt-2">
                Gold Since 1985
              </span>
            </h2>

            <p className="text-gray-700 text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed">
              For nearly four decades, GoldPremium has been the trusted name in
              premium gold collection and showcase. Our journey began with a
              simple mission: to make authentic, certified gold accessible to
              collectors and enthusiasts worldwide.
            </p>

            <p className="text-gray-600 text-base sm:text-lg mb-8 sm:mb-10 leading-relaxed">
              Today, we proudly showcase one of the most diverse and
              authenticated gold collections, from investment-grade bars to rare
              commemorative pieces. Every item in our collection undergoes
              rigorous certification and comes with complete documentation.
            </p>

            <div className="space-y-4 sm:space-y-5 mb-8 sm:mb-10">
              {[
                {
                  icon: Shield,
                  title: "Certified Authenticity",
                  desc: "International certification for every piece",
                },
                {
                  icon: Award,
                  title: "Premium Quality",
                  desc: "Sourced from world-renowned refineries",
                },
                {
                  icon: Sparkles,
                  title: "Expert Curation",
                  desc: "Handpicked collection by gold specialists",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 sm:gap-4 group cursor-pointer"
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-linear-to-br from-amber-400 to-amber-600 rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-amber-500/30 group-hover:shadow-amber-500/50 transition-all duration-300 group-hover:scale-110">
                    <item.icon className="text-white w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-lg sm:text-xl mb-1 text-gray-900 group-hover:text-amber-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button className="group bg-linear-to-r from-amber-500 to-amber-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-xl shadow-amber-500/30 hover:shadow-amber-500/50 font-bold flex items-center gap-2 sm:gap-3 transform hover:scale-105 text-sm sm:text-base w-full sm:w-auto justify-center">
              Discover Our Story
              <ArrowRight className="group-hover:translate-x-2 transition-transform w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          <div
            className={`relative transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}
          >
            <div className="relative bg-linear-to-br from-amber-50 to-amber-100/50 rounded-2xl sm:rounded-3xl p-8 sm:p-12 lg:p-16 shadow-2xl shadow-amber-900/10 border border-amber-200/50">
              <div className="absolute -top-4 -right-4 sm:-top-8 sm:-right-8 w-32 h-32 sm:w-48 sm:h-48 bg-linear-to-br from-amber-400/30 to-amber-600/30 rounded-full blur-2xl"></div>

              <div className="relative space-y-8 sm:space-y-12">
                <div className="text-center lg:text-left">
                  <div className="inline-flex items-center gap-3 sm:gap-4 bg-white/80 backdrop-blur-sm p-4 sm:p-6 lg:p-8 rounded-2xl shadow-xl shadow-amber-900/10 border border-amber-200/50">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-linear-to-br from-amber-400 to-amber-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg shrink-0">
                      <TrendingUp className="text-white w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10" />
                    </div>
                    <div>
                      <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900">
                        99.9%
                      </div>
                      <div className="text-gray-600 font-semibold text-sm sm:text-base lg:text-lg">
                        Purity Standard
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                  {stats.map((stat, index) => (
                    <div
                      key={index}
                      className={`text-center bg-white/60 backdrop-blur-sm p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg shadow-amber-900/5 border border-amber-100/50 transition-all duration-700 hover:scale-105 hover:shadow-xl ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                      style={{ transitionDelay: `${index * 100}ms` }}
                    >
                      <div className="text-2xl sm:text-4xl  font-black bg-linear-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent mb-1 sm:mb-2">
                        {stat.number}
                        {stat.suffix}
                      </div>
                      <div className="text-gray-600 font-semibold text-xs sm:text-sm lg:text-base">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
