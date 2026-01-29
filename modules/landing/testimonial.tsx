import { useState, useEffect, useRef } from "react";
import {
  Star,
  MapPin,
  Quote,
  TrendingUp,
  Award,
  Sparkles,
  ChevronDown,
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

const testimonials = [
  {
    id: 1,
    name: "Sarah Mitchell",
    role: "Portfolio Manager",
    content:
      "The authenticity and quality of SR Jewellers's collection is unmatched. Their expertise helped me build a diversified gold portfolio that has exceeded all expectations.",
    rating: 5,
    location: "New York, USA",
    verified: true,
    badge: "Top Investor",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Private Collector",
    content:
      "I've been collecting gold for over 15 years, and SR Jewellers stands out for their exceptional service and rare pieces. Every item comes with detailed provenance.",
    rating: 5,
    location: "Singapore",
    verified: true,
    badge: "Verified Collector",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Wealth Advisor",
    content:
      "SR Jewellers has been instrumental in helping my clients secure their financial futures. Their transparent pricing and expert guidance make them my top recommendation.",
    rating: 5,
    location: "London, UK",
    verified: true,
    badge: "Financial Expert",
  },
  {
    id: 4,
    name: "David Kumar",
    role: "Investment Consultant",
    content:
      "The level of professionalism and attention to detail is remarkable. From consultation to delivery, everything is handled with utmost care.",
    rating: 5,
    location: "Dubai, UAE",
    verified: true,
    badge: "Premium Member",
  },
  {
    id: 5,
    name: "Lisa Anderson",
    role: "Family Office Manager",
    content:
      "Working with SR Jewellers has transformed how we approach precious metals investment. Their market insights are invaluable.",
    rating: 5,
    location: "Zurich, Switzerland",
    verified: true,
    badge: "Elite Trader",
  },
  {
    id: 6,
    name: "James Park",
    role: "Entrepreneur",
    content:
      "The security and authentication process gives me complete confidence. This is the gold standard in precious metals trading.",
    rating: 5,
    location: "Seoul, South Korea",
    verified: true,
    badge: "Business Leader",
  },
];

type Testimonials = (typeof testimonials)[0];
type Props = {
  testimonial: Testimonials;
  index?: number;
};

const TestimonialCard = ({ testimonial, index = 0 }: Props) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <div className="shrink-0 w-[85vw] sm:w-112.5 md:w-125 mx-4 snap-center">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group relative h-full perspective-1000"
        style={{
          transform: `rotateY(${mousePosition.x}deg) rotateX(${-mousePosition.y}deg)`,
          transition: "transform 0.1s ease-out",
        }}
      >
        {/* Glow effect on hover */}
        <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-blue-500/20 via-cyan-500/10 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />

        <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 p-8 h-full hover:border-blue-400/40 transition-all duration-500 overflow-hidden">
          {/* Animated gradient overlay */}
          <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Quote Icon with rotating glow */}
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-amber-500/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative w-14 h-14 rounded-sm bg-linear-to-br from-amber-500/20 to-yellow-500/10 border border-amber-500/30 flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
              <Quote className="w-7 h-7 text-amber-400" />
            </div>
          </div>

          {/* Stars */}
          <div className="flex gap-1 mb-4">
            {[...Array(testimonial.rating)].map((_, i) => (
              <Star
                key={i}
                className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 fill-amber-400 group-hover:scale-110 transition-transform duration-300"
                style={{ transitionDelay: `${i * 50}ms` }}
              />
            ))}
          </div>

          {/* Content */}
          <p className="relative text-zinc-300 text-sm sm:text-base leading-relaxed mb-6 group-hover:text-white transition-colors duration-300">
            {testimonial.content}
          </p>

          {/* Divider */}
          <div className="relative h-px bg-linear-to-r from-transparent via-white/20 to-transparent mb-6" />

          {/* User Info */}
          <div className="relative flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="text-white font-bold text-base sm:text-lg">
                  {testimonial.name}
                </h4>
                {testimonial.verified && (
                  <div className="group/badge relative">
                    <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-md opacity-0 group-hover/badge:opacity-100 transition-opacity" />
                    <div className="relative w-5 h-5 rounded-full bg-blue-500/20 border border-blue-400/40 flex items-center justify-center">
                      <Award className="w-3 h-3 text-blue-400" />
                    </div>
                  </div>
                )}
              </div>
              <p className="text-amber-400 text-xs sm:text-sm font-semibold mb-2">
                {testimonial.role}
              </p>
              <div className="flex items-center gap-1.5 text-zinc-400 text-xs sm:text-sm">
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>{testimonial.location}</span>
              </div>
            </div>

            {/* Badge */}
            <div className="shrink-0">
              <div className="px-3 py-1.5 bg-linear-to-r from-blue-500/10 to-cyan-500/10 border border-blue-400/30">
                <span className="text-xs font-semibold text-blue-400">
                  {testimonial.badge}
                </span>
              </div>
            </div>
          </div>

          {/* Decorative corner accent */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-bl from-amber-500/10 via-transparent to-transparent rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      </div>
    </div>
  );
};

export function Testimonials() {
  const { ref, isVisible } = useScrollAnimation();
  const [isPaused, setIsPaused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Mobile scroll snap detection
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollPosition = container.scrollTop;
      const cardHeight = container.scrollHeight / testimonials.length;
      const index = Math.round(scrollPosition / cardHeight);
      setActiveIndex(index);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-linear-to-b from-slate-950 via-blue-950 to-slate-950 relative overflow-hidden">
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

      {/* Floating gradient orbs */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
      <div
        className="absolute bottom-1/4 -right-48 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-12 sm:mb-16 lg:mb-20">
        <div
          ref={ref}
          className={`text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 hover:border-blue-400/40 transition-all duration-300 mb-6 group">
            <Star className="w-4 h-4 text-amber-500 group-hover:rotate-12 transition-transform duration-300" />
            <span className="text-xs sm:text-sm font-semibold text-zinc-400 group-hover:text-white transition-colors">
              Client Success Stories
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight px-4">
            <span className="block text-white">Trusted by Collectors</span>
            <span className="block bg-linear-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Worldwide
            </span>
          </h2>

          <p className="text-zinc-400 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed mb-4 px-4">
            Join thousands of satisfied clients who trust us with their precious
            metals investments
          </p>

          {/* Stats */}
          <div className="flex items-center justify-center gap-6 sm:gap-8 mt-6 sm:mt-8">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
              <div className="text-left">
                <div className="text-xl sm:text-2xl font-bold text-white">
                  98%
                </div>
                <div className="text-xs text-zinc-500">Satisfaction Rate</div>
              </div>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
              <div className="text-left">
                <div className="text-xl sm:text-2xl font-bold text-white">
                  15K+
                </div>
                <div className="text-xs text-zinc-500">Happy Clients</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: Vertical Scrolling Stack */}
      <div className="lg:hidden relative">
        <div className="relative max-w-lg mx-auto px-4">
          {/* Top gradient fade */}
          <div className="absolute left-0 right-0 top-0 h-24 bg-linear-to-b from-slate-950 via-blue-950/80 to-transparent z-10 pointer-events-none" />

          {/* Bottom gradient fade */}
          <div className="absolute left-0 right-0 bottom-0 h-24 bg-linear-to-t from-slate-950 via-blue-950/80 to-transparent z-10 pointer-events-none" />

          {/* Scroll indicator */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-4 z-20 animate-bounce">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-2">
              <ChevronDown className="w-4 h-4 text-white/60" />
            </div>
          </div>

          <div
            ref={scrollContainerRef}
            className="flex flex-col gap-6 h-150 overflow-y-auto snap-y snap-mandatory scrollbar-hide py-8"
          >
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={`mobile-${index}`}
                testimonial={testimonial}
                index={index}
              />
            ))}
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  const container = scrollContainerRef.current;
                  if (container) {
                    const cardHeight =
                      container.scrollHeight / testimonials.length;
                    container.scrollTo({
                      top: cardHeight * index,
                      behavior: "smooth",
                    });
                  }
                }}
                className={`transition-all duration-300 rounded-full ${
                  activeIndex === index
                    ? "w-8 h-2 bg-blue-400"
                    : "w-2 h-2 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Swipe instruction */}
        <div className="text-center mt-6">
          <p className="text-xs sm:text-sm text-zinc-500">
            Swipe to explore more stories
          </p>
        </div>
      </div>

      {/* Desktop: Infinite Scroll (Hidden on mobile) */}
      <div className="hidden lg:block">
        {/* Top Row (Left to Right) */}
        <div className="relative mb-6">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-linear-to-r from-slate-950 via-blue-950/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-linear-to-l from-slate-950 via-blue-950/80 to-transparent z-10 pointer-events-none" />

          <div
            className="flex overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div
              className={`flex ${isPaused ? "animation-paused" : "animate-scroll-left"}`}
            >
              {[...testimonials, ...testimonials, ...testimonials].map(
                (testimonial, index) => (
                  <TestimonialCard
                    key={`top-${index}`}
                    testimonial={testimonial}
                  />
                ),
              )}
            </div>
          </div>
        </div>

        {/* Bottom Row (Right to Left) */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-linear-to-r from-slate-950 via-blue-950/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-linear-to-l from-slate-950 via-blue-950/80 to-transparent z-10 pointer-events-none" />

          <div
            className="flex overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div
              className={`flex ${isPaused ? "animation-paused" : "animate-scroll-right"}`}
            >
              {[...testimonials, ...testimonials, ...testimonials].map(
                (testimonial, index) => (
                  <TestimonialCard
                    key={`bottom-${index}`}
                    testimonial={testimonial}
                  />
                ),
              )}
            </div>
          </div>
        </div>

        {/* Hover instruction */}
        <div className="text-center mt-12">
          <p className="text-sm text-zinc-500">
            Hover over cards to pause and interact
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        @keyframes scroll-right {
          0% {
            transform: translateX(-33.333%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .animate-scroll-left {
          animation: scroll-left 60s linear infinite;
        }

        .animate-scroll-right {
          animation: scroll-right 60s linear infinite;
        }

        .animation-paused {
          animation-play-state: paused;
        }

        .perspective-1000 {
          perspective: 1000px;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
