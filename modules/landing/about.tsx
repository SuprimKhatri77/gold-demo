import React from "react";
import {
  ArrowRight,
  Award,
  Shield,
  Sparkles,
  TrendingUp,
  Zap,
} from "lucide-react";
import { useScrollAnimation } from "./landing";
import Image from "next/image";

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
      className="py-28 bg-linear-to-b from-white via-amber-50/30 to-white relative overflow-hidden min-h-screen"
    >
      <div className="absolute top-0 left-0 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-300/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div
            ref={ref}
            className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}
          >
            <div className="flex items-center gap-3 mb-6">
              <Zap className="text-amber-600" size={24} />
              <span className="text-amber-600 font-bold tracking-wider uppercase text-sm">
                About Us
              </span>
            </div>

            <h2 className="text-5xl   font-black mb-8 leading-tight">
              Crafting Excellence in
              <span className="block bg-linear-to-r from-amber-600 via-amber-500 to-amber-700 bg-clip-text text-transparent">
                Gold Since 1985
              </span>
            </h2>

            <p className="text-gray-700 text-lg mb-8 leading-relaxed">
              For nearly four decades, GoldPremium has been the trusted name in
              premium gold collection and showcase. Our journey began with a
              simple mission: to make authentic, certified gold accessible to
              collectors and enthusiasts worldwide.
            </p>

            <p className="text-gray-600 text-lg mb-10 leading-relaxed">
              Today, we proudly showcase one of the most diverse and
              authenticated gold collections, from investment-grade bars to rare
              commemorative pieces. Every item in our collection undergoes
              rigorous certification and comes with complete documentation.
            </p>

            <div className="space-y-5 mb-10">
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
                  className="flex items-start gap-4 group cursor-pointer"
                >
                  <div className="w-14 h-14 bg-linear-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-amber-500/30 group-hover:shadow-amber-500/50 transition-all duration-300 group-hover:scale-110 transform">
                    <item.icon className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-1 text-gray-900 group-hover:text-amber-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <button className="group bg-linear-to-r from-amber-500 to-amber-600 text-white px-8 py-4 rounded-full hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-xl shadow-amber-500/30 hover:shadow-amber-500/50 font-bold flex items-center gap-3 transform hover:scale-105">
              Discover Our Story
              <ArrowRight
                size={20}
                className="group-hover:translate-x-2 transition-transform"
              />
            </button>
          </div>

          <div
            className={`relative transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}
          >
            <div className="relative">
              <div className="absolute -top-8 -left-8 w-72 h-72 bg-linear-to-br from-amber-400/30 to-amber-600/30 rounded-3xl blur-2xl"></div>

              <div className="hidden md:flex relative rounded-3xl overflow-hidden shadow-2xl shadow-amber-900/20 h-150">
                <Image
                  fill
                  src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80"
                  alt="Gold Excellence"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent"></div>
              </div>

              <div className="absolute -bottom-30 sm:-bottom-35 right-10 w-fit bg-white p-4 sm:p-8 rounded-2xl shadow-2xl shadow-amber-900/20 border border-amber-100">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-linear-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <TrendingUp className="text-white" size={32} />
                  </div>
                  <div>
                    <div className="text-3xl font-black text-gray-900">
                      99.9%
                    </div>
                    <div className="text-gray-600 font-medium">
                      Purity Standard
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className={`text-center transition-all duration-700 delay-${index * 100} ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                  >
                    <div className="text-5xl font-black bg-linear-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent mb-2">
                      {stat.number}
                      {stat.suffix}
                    </div>
                    <div className="text-gray-600 font-semibold">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
