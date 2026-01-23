"use client";
import {
  ArrowRight,
  Phone,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Shield,
  Award,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Stat {
  number: string;
  label: string;
  suffix?: string;
  icon: React.ComponentType<{ className?: string }>;
}

const stats: Stat[] = [
  { number: "38", label: "Years of Excellence", suffix: "+", icon: Award },
  { number: "50K", label: "Satisfied Clients", suffix: "+", icon: Shield },
  {
    number: "500M",
    label: "Gold Value Delivered",
    suffix: "+",
    icon: TrendingUp,
  },
];

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=1920&q=80",
    title: "Premium Gold Bullion",
    subtitle: "Invest in Your Future",
    description:
      "Discover certified investment-grade gold bars and coins. Secure your wealth with precious metals backed by authenticity and trust.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1920&q=80",
    title: "Certified Excellence",
    subtitle: "99.99% Pure Gold",
    description:
      "Every piece comes with complete certification and provenance documentation. Investment-grade quality guaranteed.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=1920&q=80",
    title: "Secure Investment",
    subtitle: "Build Lasting Wealth",
    description:
      "Join thousands of investors who trust us for authentic, premium gold bullion that stands the test of time.",
  },
];

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const resetTimer = setTimeout(() => setIsAnimating(false), 0);
    const animateTimer = setTimeout(() => setIsAnimating(true), 50);
    return () => {
      clearTimeout(resetTimer);
      clearTimeout(animateTimer);
    };
  }, [currentSlide]);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentSlide(index);
  };

  return (
    <section className="relative min-h-screen bg-black overflow-hidden">
      {/* Background Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            fill
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          {/* Darker gradient overlays - less gold tones */}
          <div className="absolute inset-0 bg-linear-to-br from-black/85 via-zinc-900/75 to-black/70" />
          <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent" />
        </div>
      ))}

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="max-w-7xl mx-auto">
            {/* Content Grid */}
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Left Column - Main Content */}
              <div className="lg:col-span-7 space-y-8">
                {/* Badge */}
                <div
                  className={`inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full transition-all duration-500 ${
                    isAnimating
                      ? "translate-x-0 opacity-100"
                      : "-translate-x-25 opacity-0"
                  }`}
                >
                  <Sparkles className="w-4 h-4 text-white" />
                  <span className="text-white text-sm font-semibold tracking-wide">
                    TRUSTED SINCE 1985
                  </span>
                </div>

                {/* Main Heading */}
                <div className="space-y-4">
                  <h1
                    className={`text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight transition-all duration-700 delay-100 ${
                      isAnimating
                        ? "translate-y-0 opacity-100"
                        : "translate-y-10 opacity-0"
                    }`}
                  >
                    <span className="block text-white">
                      {slides[currentSlide].title}
                    </span>
                  </h1>

                  {/* Subtitle with minimal gold accent */}
                  <div
                    className={`inline-block transition-all duration-700 delay-200 ${
                      isAnimating
                        ? "translate-y-0 opacity-100"
                        : "translate-y-10 opacity-0"
                    }`}
                  >
                    <p className="text-xl sm:text-2xl lg:text-3xl text-zinc-300 font-medium">
                      {slides[currentSlide].subtitle}
                    </p>
                    <div className="h-1 w-24 bg-linear-to-r from-amber-400 to-transparent mt-3" />
                  </div>
                </div>

                {/* Description */}
                <p
                  className={`text-zinc-400 text-lg sm:text-xl leading-relaxed max-w-2xl transition-all duration-700 delay-300 ${
                    isAnimating
                      ? "translate-y-0 opacity-100"
                      : "translate-y-10 opacity-0"
                  }`}
                >
                  {slides[currentSlide].description}
                </p>

                {/* CTA Buttons */}
                <div
                  className={`flex flex-col sm:flex-row gap-4 transition-all duration-700 delay-400 ${
                    isAnimating
                      ? "translate-y-0 opacity-100"
                      : "translate-y-10 opacity-0"
                  }`}
                >
                  <button className="group bg-white hover:bg-zinc-100 text-black px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2">
                    View Gold Collection
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </button>

                  <button className="group bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2">
                    <Phone className="w-5 h-5" />
                    Speak with Expert
                  </button>
                </div>
              </div>

              {/* Right Column - Stats */}
              <div className="lg:col-span-5">
                <div
                  className={`grid grid-cols-1 gap-6 transition-all duration-700 delay-500 ${
                    isAnimating
                      ? "translate-x-0 opacity-100"
                      : "-translate-x-25 opacity-0"
                  }`}
                >
                  {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                      <div
                        key={index}
                        className="group relative bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/20 rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:bg-white/10"
                      >
                        {/* Icon */}
                        <div className="absolute top-6 right-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-3 transition-all duration-300 group-hover:bg-amber-400/20 group-hover:border-amber-400/30">
                          <Icon className="w-6 h-6 text-white group-hover:text-amber-400 transition-colors" />
                        </div>

                        {/* Number */}
                        <div className="text-5xl sm:text-6xl font-bold text-white mb-2">
                          {stat.number}
                          {stat.suffix && (
                            <span className="text-zinc-400">{stat.suffix}</span>
                          )}
                        </div>

                        {/* Label */}
                        <div className="text-zinc-400 text-sm sm:text-base font-medium">
                          {stat.label}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="mt-16 lg:mt-24 flex items-center justify-between">
              {/* Navigation Arrows */}
              <div className="flex gap-3">
                <button
                  onClick={prevSlide}
                  className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 p-3 rounded-lg text-white transition-all duration-300"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextSlide}
                  className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 p-3 rounded-lg text-white transition-all duration-300"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Slide Indicators */}
              <div className="flex gap-3">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? "w-16 bg-white"
                        : "w-10 bg-white/30 hover:bg-white/50"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              {/* Scroll Indicator */}
              <div className="hidden lg:flex flex-col items-center gap-2">
                <span className="text-white/60 text-xs font-medium uppercase tracking-wider">
                  Scroll
                </span>
                <div className="w-px h-12 bg-linear-to-b from-white/40 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
