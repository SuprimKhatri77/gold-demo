import { useState, useEffect, useRef } from "react";
import { Star, MapPin, Quote } from "lucide-react";

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
      "The authenticity and quality of GoldPremium's collection is unmatched. Their expertise helped me build a diversified gold portfolio that has exceeded all expectations.",
    rating: 5,
    location: "New York, USA",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Private Collector",
    content:
      "I've been collecting gold for over 15 years, and GoldPremium stands out for their exceptional service and rare pieces. Every item comes with detailed provenance.",
    rating: 5,
    location: "Singapore",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Wealth Advisor",
    content:
      "GoldPremium has been instrumental in helping my clients secure their financial futures. Their transparent pricing and expert guidance make them my top recommendation.",
    rating: 5,
    location: "London, UK",
  },
  {
    id: 4,
    name: "David Kumar",
    role: "Investment Consultant",
    content:
      "The level of professionalism and attention to detail is remarkable. From consultation to delivery, everything is handled with utmost care.",
    rating: 5,
    location: "Dubai, UAE",
  },
  {
    id: 5,
    name: "Lisa Anderson",
    role: "Family Office Manager",
    content:
      "Working with GoldPremium has transformed how we approach precious metals investment. Their market insights are invaluable.",
    rating: 5,
    location: "Zurich, Switzerland",
  },
  {
    id: 6,
    name: "James Park",
    role: "Entrepreneur",
    content:
      "The security and authentication process gives me complete confidence. This is the gold standard in precious metals trading.",
    rating: 5,
    location: "Seoul, South Korea",
  },
];

type Testimonials = (typeof testimonials)[0];
type Props = {
  testimonial: Testimonials;
};

const TestimonialCard = ({ testimonial }: Props) => (
  <div className="shrink-0 w-[90vw] sm:w-112.5 md:w-125 mx-4">
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 h-full hover:border-white/20 transition-all duration-300">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-linear-to-br from-amber-400/20 to-amber-600/20 flex items-center justify-center shrink-0 border border-amber-400/30">
          <Quote className="w-5 h-5 md:w-6 md:h-6 text-amber-400" />
        </div>
        <div className="flex-1">
          <div className="flex gap-1 mb-2">
            {[...Array(testimonial.rating)].map((_, i) => (
              <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
            ))}
          </div>
        </div>
      </div>

      <p className="text-zinc-300 text-sm md:text-base leading-relaxed mb-6">
        &quot;{testimonial.content}&quot;
      </p>

      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <div>
          <h4 className="text-white font-semibold text-sm md:text-base">
            {testimonial.name}
          </h4>
          <p className="text-amber-400 text-xs md:text-sm">
            {testimonial.role}
          </p>
        </div>
        <div className="flex items-center gap-1 text-zinc-400 text-xs">
          <MapPin className="w-3 h-3" />
          <span>{testimonial.location}</span>
        </div>
      </div>
    </div>
  </div>
);

export function Testimonials() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-b from-zinc-950 via-black to-zinc-950"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-12 md:mb-16">
        <div
          ref={ref}
          className={`text-center transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-6">
            <Star size={16} className="text-amber-400" />
            <span className="text-sm font-medium text-zinc-400">
              Client Stories
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight">
            Trusted by Collectors
            <span className="block text-white mt-1">Worldwide</span>
          </h2>

          <p className="text-zinc-400 text-base md:text-lg max-w-2xl mx-auto">
            Join thousands of satisfied clients who trust us with their precious
            metals investments
          </p>
        </div>
      </div>

      {/* Infinite Scroll Testimonials - Top Row */}
      <div className="relative mb-6">
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-linear-to-r from-black to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-linear-to-l from-black to-transparent z-10"></div>

        <div className="flex overflow-hidden">
          <div className="flex animate-scroll-left">
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <TestimonialCard key={`top-${index}`} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </div>

      {/* Infinite Scroll Testimonials - Bottom Row */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-linear-to-r from-black to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-linear-to-l from-black to-transparent z-10"></div>

        <div className="flex overflow-hidden">
          <div className="flex animate-scroll-right">
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <TestimonialCard
                key={`bottom-${index}`}
                testimonial={testimonial}
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes scroll-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .animate-scroll-left {
          animation: scroll-left 40s linear infinite;
        }

        .animate-scroll-right {
          animation: scroll-right 40s linear infinite;
        }

        .animate-scroll-left:hover,
        .animate-scroll-right:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
