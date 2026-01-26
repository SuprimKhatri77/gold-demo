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
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

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
    title: "Premium Gold",
    animatedWord: "Bullion",
    subtitle: "Invest in Your Future",
    description:
      "Discover certified investment-grade gold bars and coins. Secure your wealth with precious metals backed by authenticity and trust.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1920&q=80",
    title: "Certified",
    animatedWord: "Excellence",
    subtitle: "99.99% Pure Gold",
    description:
      "Every piece comes with complete certification and provenance documentation. Investment-grade quality guaranteed.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=1920&q=80",
    title: "Secure",
    animatedWord: "Investment",
    subtitle: "Build Lasting Wealth",
    description:
      "Join thousands of investors who trust us for authentic, premium gold bullion that stands the test of time.",
  },
];

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [hasAnimated, setHasAnimated] = useState(false);
  const router = useRouter();

  // Typewriter effect with smoother timing - on every slide change
  useEffect(() => {
    setDisplayedText("");
    setIsTyping(true);
    const text = slides[currentSlide].animatedWord;
    let currentIndex = 0;

    // Start typing after a brief delay for smoothness
    const startDelay = setTimeout(() => {
      const typeInterval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayedText(text.substring(0, currentIndex));
          currentIndex++;
        } else {
          setIsTyping(false);
          if (currentSlide === 0) setHasAnimated(true);
          clearInterval(typeInterval);
        }
      }, 80); // Slower, more natural typing speed

      return () => clearInterval(typeInterval);
    }, 200); // Delay before typing starts

    return () => clearTimeout(startDelay);
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
          className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? "opacity-100" : "opacity-0"
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
                <motion.div
                  initial={
                    !hasAnimated ? { opacity: 0, x: -20 } : { opacity: 1, x: 0 }
                  }
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full"
                >
                  <Sparkles className="w-4 h-4 text-white" />
                  <span className="text-white text-sm font-semibold tracking-wide">
                    TRUSTED SINCE 1985
                  </span>
                </motion.div>

                {/* Main Heading with Typewriter */}
                <div className="space-y-4">
                  <motion.h1
                    key={currentSlide}
                    initial={
                      !hasAnimated
                        ? { opacity: 0, y: 20 }
                        : { opacity: 1, y: 0 }
                    }
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.8,
                      delay: !hasAnimated ? 0.2 : 0,
                      ease: "easeOut",
                    }}
                    className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight"
                  >
                    <span className="block text-white">
                      {slides[currentSlide].title}{" "}
                      <span style={{ width: "18ch" }} className="inline-block whitespace-nowrap overflow-hidden align-baseline">
                        {displayedText}
                        {isTyping && (
                          <motion.span
                            animate={{ opacity: [1, 0, 1] }}
                            transition={{
                              duration: 0.8,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                            className="inline-block w-[0.08em] bg-white ml-[0.12em] align-bottom"
                            style={{
                              height: "1em",
                              verticalAlign: "",
                            }}
                          />

                        )}
                      </span>
                    </span>
                  </motion.h1>

                  {/* Subtitle with minimal gold accent */}
                  <motion.div
                    key={`subtitle-${currentSlide}`}
                    initial={
                      !hasAnimated
                        ? { opacity: 0, y: 20 }
                        : { opacity: 1, y: 0 }
                    }
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.8,
                      delay: !hasAnimated ? 0.6 : 0,
                      ease: "easeOut",
                    }}
                    className="inline-block"
                  >
                    <p className="text-xl sm:text-2xl lg:text-3xl text-zinc-300 font-medium">
                      {slides[currentSlide].subtitle}
                    </p>
                    <motion.div
                      initial={!hasAnimated ? { width: 0 } : { width: "6rem" }}
                      animate={{ width: "6rem" }}
                      transition={{
                        duration: 1,
                        delay: !hasAnimated ? 1 : 0,
                        ease: "easeOut",
                      }}
                      className="h-1 bg-linear-to-r from-amber-400 to-transparent mt-3"
                    />
                  </motion.div>
                </div>

                {/* Description */}
                <motion.p
                  key={`desc-${currentSlide}`}
                  initial={
                    !hasAnimated ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: !hasAnimated ? 1.2 : 0,
                    ease: "easeOut",
                  }}
                  className="text-zinc-400 text-lg sm:text-xl leading-relaxed max-w-2xl"
                >
                  {slides[currentSlide].description}
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  initial={
                    !hasAnimated ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: !hasAnimated ? 1 : 0 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="group bg-white hover:bg-zinc-100 text-black px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2"
                    onClick={() => router.push("/our-products")}
                  >
                    View Gold Collection
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </motion.button>

                  <motion.button
                    onClick={() => router.push("/contact")}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="group bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Phone className="w-5 h-5" />
                    Speak with Expert
                  </motion.button>
                </motion.div>
              </div>

              {/* Right Column - Stats */}
              <div className="lg:col-span-5">
                <div className="grid grid-cols-1 gap-6">
                  {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                      <motion.div
                        key={index}
                        initial={
                          !hasAnimated
                            ? { opacity: 0, x: 20 }
                            : { opacity: 1, x: 0 }
                        }
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.6,
                          delay: !hasAnimated ? 0.4 + index * 0.15 : 0,
                        }}
                        whileHover={{ scale: 1.02, y: -5 }}
                        className="group relative bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/20 rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:bg-white/10"
                      >
                        {/* Icon */}
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                          className="absolute top-6 right-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-3 transition-all duration-300 group-hover:bg-amber-400/20 group-hover:border-amber-400/30"
                        >
                          <Icon className="w-6 h-6 text-white group-hover:text-amber-400 transition-colors" />
                        </motion.div>

                        {/* Number */}
                        <motion.div
                          initial={!hasAnimated ? { scale: 0.5 } : { scale: 1 }}
                          animate={{ scale: 1 }}
                          transition={{
                            duration: 0.5,
                            delay: !hasAnimated ? 0.6 + index * 0.15 : 0,
                          }}
                          className="text-5xl sm:text-6xl font-bold text-white mb-2"
                        >
                          {stat.number}
                          {stat.suffix && (
                            <span className="text-zinc-400">{stat.suffix}</span>
                          )}
                        </motion.div>

                        {/* Label */}
                        <div className="text-zinc-400 text-sm sm:text-base font-medium">
                          {stat.label}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Navigation Controls */}
            <motion.div
              initial={
                !hasAnimated ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }
              }
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: !hasAnimated ? 1.2 : 0 }}
              className="mt-16 lg:mt-24 flex items-center justify-between"
            >
              {/* Navigation Arrows */}
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={prevSlide}
                  className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 p-3 rounded-lg text-white transition-all duration-300"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-6 h-6" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={nextSlide}
                  className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 p-3 rounded-lg text-white transition-all duration-300"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-6 h-6" />
                </motion.button>
              </div>

              {/* Slide Indicators */}
              <div className="flex gap-3">
                {slides.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => goToSlide(index)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className={`h-2 rounded-full transition-all duration-300 ${index === currentSlide
                      ? "w-16 bg-white"
                      : "w-10 bg-white/30 hover:bg-white/50"
                      }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              {/* Scroll Indicator */}
              <motion.div
                initial={!hasAnimated ? { opacity: 0 } : { opacity: 1 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: !hasAnimated ? 1.5 : 0 }}
                className="hidden lg:flex flex-col items-center gap-2"
              >
                <span className="text-white/60 text-xs font-medium uppercase tracking-wider">
                  Scroll
                </span>
                <div className="w-px h-12 bg-linear-to-b from-white/40 to-transparent" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
