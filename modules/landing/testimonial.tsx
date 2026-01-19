import { Check, ChevronLeft, ChevronRight, MapPin, Star } from "lucide-react";
import { useScrollAnimation } from "./landing";
import { useState } from "react";
import Image from "next/image";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
  image: string;
  location: string;
}
const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Mitchell",
    role: "Portfolio Manager",
    content:
      "The authenticity and quality of GoldPremium&apos;s collection is unmatched. Their expertise helped me build a diversified gold portfolio that has exceeded all expectations. The certification process is transparent and trustworthy.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    location: "New York, USA",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Private Collector",
    content:
      "I&apos;ve been collecting gold for over 15 years, and GoldPremium stands out for their exceptional service and rare pieces. Every item comes with detailed provenance and certification. A true partner in wealth preservation.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    location: "Singapore",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Wealth Advisor",
    content:
      "GoldPremium has been instrumental in helping my clients secure their financial futures. Their transparent pricing, expert guidance, and premium quality make them the only gold dealer I recommend.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
    location: "London, UK",
  },
  {
    id: 4,
    name: "David Kumar",
    role: "Investment Consultant",
    content:
      "The level of professionalism and attention to detail is remarkable. From consultation to delivery, everything is handled with utmost care. Their collection showcases the finest gold available in the market.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
    location: "Dubai, UAE",
  },
];
export const Testimonials: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  return (
    <section className="py-28 bg-linear-to-b from-white via-amber-50/30 to-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div
          ref={ref}
          className={`text-center mb-20 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-1 w-12 bg-linear-to-r from-transparent to-amber-400"></div>
            <span className="text-amber-600 font-bold tracking-wider uppercase text-sm flex items-center gap-2">
              <Star size={16} className="animate-pulse" />
              Client Stories
            </span>
            <div className="h-1 w-12 bg-linear-to-l from-transparent to-amber-400"></div>
          </div>

          <h2 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
            Trusted by Collectors
            <span className="block bg-linear-to-r from-amber-600 via-amber-500 to-amber-700 bg-clip-text text-transparent">
              Worldwide
            </span>
          </h2>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-12 lg:p-16 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-40 h-40 bg-amber-400/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-amber-400/10 rounded-full translate-x-1/2 translate-y-1/2"></div>

            <div className="relative">
              <div className="flex justify-center mb-8">
                <div className="relative">
                  <Image
                    width={96}
                    height={96}
                    src={testimonials[currentTestimonial].image}
                    alt={testimonials[currentTestimonial].name}
                    className="w-24 h-24 rounded-full object-cover border-4 border-amber-400 shadow-xl"
                  />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-linear-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center border-4 border-white">
                    <Check size={14} className="text-white" />
                  </div>
                </div>
              </div>

              <div className="flex justify-center gap-1 mb-6">
                {[...Array(testimonials[currentTestimonial].rating)].map(
                  (_, i) => (
                    <Star
                      key={i}
                      className="text-amber-400 fill-amber-400"
                      size={24}
                    />
                  ),
                )}
              </div>

              <p className="text-gray-700 text-xl lg:text-2xl mb-8 text-center leading-relaxed italic font-light">
                &quot;{testimonials[currentTestimonial].content}&quot;
              </p>

              <div className="text-center">
                <h4 className="text-2xl font-black text-gray-900 mb-1">
                  {testimonials[currentTestimonial].name}
                </h4>
                <p className="text-amber-600 font-semibold mb-2">
                  {testimonials[currentTestimonial].role}
                </p>
                <div className="flex items-center justify-center gap-2 text-gray-500">
                  <MapPin size={16} />
                  <span className="text-sm">
                    {testimonials[currentTestimonial].location}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center gap-6 mt-12">
            <button
              onClick={prevTestimonial}
              className="w-14 h-14 bg-white hover:bg-amber-50 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center border-2 border-gray-100 hover:border-amber-300 group"
            >
              <ChevronLeft
                className="text-gray-600 group-hover:text-amber-600"
                size={24}
              />
            </button>

            <div className="flex gap-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentTestimonial
                      ? "w-12 bg-amber-500"
                      : "w-8 bg-gray-300"
                  }`}
                ></button>
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="w-14 h-14 bg-white hover:bg-amber-50 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center border-2 border-gray-100 hover:border-amber-300 group"
            >
              <ChevronRight
                className="text-gray-600 group-hover:text-amber-600"
                size={24}
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
