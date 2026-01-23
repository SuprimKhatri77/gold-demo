"use client";

import {
  ArrowRight,
  Phone,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

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

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=1920&q=80",
    title: "Premium Gold Collection",
    subtitle: "Where Luxury Meets Legacy",
    description:
      "Discover our exquisite collection of certified gold pieces, crafted to perfection and authenticated to the highest international standards.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1920&q=80",
    title: "Certified Excellence",
    subtitle: "Every Piece Tells a Story",
    description:
      "From investment-grade bars to rare commemorative coins, each piece comes with complete certification and provenance documentation.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=1920&q=80",
    title: "Timeless Investment",
    subtitle: "Securing Your Future in Gold",
    description:
      "Join thousands of collectors who trust us for authentic, premium gold pieces that stand the test of time.",
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
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black py-10"
    >
      {/* Background Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/70 to-black/50 z-10"></div>
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent z-10"></div>
          <Image
            fill
            src={slide.image || "/placeholder.svg"}
            alt={slide.title}
            className="object-cover scale-105"
            style={{
              animation:
                index === currentSlide
                  ? "slowZoom 20s ease-in-out infinite alternate"
                  : "none",
            }}
            priority={index === 0}
          />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-20 text-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-4xl">
          {/* Badge */}
          <div
            className={`flex items-center gap-3 mb-6 transition-all duration-800 ${isAnimating ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}
          >
            <div className="h-px w-12 bg-linear-to-r from-amber-400 to-transparent"></div>
            <span className="text-amber-400 font-bold tracking-widest uppercase text-xs sm:text-sm flex items-center gap-2">
              <Sparkles size={14} className="animate-pulse" />
              Est. 1985
            </span>
          </div>

          {/* Main Heading */}
          <h1
            className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4 leading-[1.1] transition-all duration-800 delay-200 ${isAnimating ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}
          >
            {slides[currentSlide].title}
          </h1>

          {/* Subtitle */}
          <h2
            className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight transition-all duration-800 delay-300 ${isAnimating ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}
          >
            <span className="bg-linear-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">
              {slides[currentSlide].subtitle}
            </span>
          </h2>

          {/* Description */}
          <p
            className={`text-base sm:text-lg md:text-xl mb-8 text-gray-200 leading-relaxed max-w-2xl transition-all duration-800 delay-[400ms] ${isAnimating ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}
          >
            {slides[currentSlide].description}
          </p>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-4 mb-12 transition-all duration-800 delay-500 ${isAnimating ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}
          >
            <Link
              href="/our-products"
              className="group relative bg-linear-to-r from-amber-500 via-amber-600 to-amber-500 text-white px-8 py-4 rounded-full transition-all duration-300 shadow-2xl shadow-amber-500/40 hover:shadow-amber-500/60 font-bold text-base sm:text-lg transform hover:scale-105 overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Explore Collection
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </span>
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </Link>

            <Link
              href="/contact"
              className="group bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-full hover:bg-white/20 transition-all duration-300 border-2 border-white/30 hover:border-white/50 font-bold text-base sm:text-lg transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <Phone
                size={20}
                className="group-hover:rotate-12 transition-transform"
              />
              Contact Expert
            </Link>
          </div>

          {/* Stats */}
          <div
            className={`flex flex-wrap items-center gap-6 sm:gap-8 transition-all duration-800 delay-[600ms] ${isAnimating ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}
          >
            {stats.slice(0, 3).map((stat, index) => (
              <div key={index} className="border-l-2 border-amber-400/50 pl-4">
                <div className="text-2xl sm:text-3xl font-black text-amber-400">
                  {stat.number}
                  {stat.suffix}
                </div>
                <div className="text-xs sm:text-sm text-gray-300 font-medium whitespace-nowrap">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full border-2 border-white/30 hover:border-white/50 transition-all duration-300 flex items-center justify-center group"
        aria-label="Previous slide"
      >
        <ChevronLeft
          className="text-white group-hover:scale-110 transition-transform"
          size={24}
        />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full border-2 border-white/30 hover:border-white/50 transition-all duration-300 flex items-center justify-center group"
        aria-label="Next slide"
      >
        <ChevronRight
          className="text-white group-hover:scale-110 transition-transform"
          size={24}
        />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-1 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "w-12 bg-amber-400"
                : "w-8 bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 sm:bottom-12 right-6 sm:right-12 z-20 hidden lg:block animate-bounce">
        <div className="text-white text-center">
          <div className="text-xs mb-2 text-gray-300">Scroll to explore</div>
          <div className="mx-auto w-6 h-10 border-2 border-white/40 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-amber-400 rounded-full mt-2 animate-scrollDown"></div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes slowZoom {
          from {
            transform: scale(1.05);
          }
          to {
            transform: scale(1.15);
          }
        }

        @keyframes scrollDown {
          0%,
          100% {
            transform: translateY(0);
            opacity: 1;
          }
          50% {
            transform: translateY(8px);
            opacity: 0.5;
          }
        }

        .animate-scrollDown {
          animation: scrollDown 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
