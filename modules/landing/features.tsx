import {
  ArrowRight,
  Award,
  Globe,
  Lock,
  Shield,
  Sparkles,
  Users,
} from "lucide-react";
import { useScrollAnimation } from "./landing";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Certified Authenticity",
    description:
      "Every piece comes with international certification and detailed authentication documentation.",
  },
  {
    icon: <Award className="w-8 h-8" />,
    title: "Premium Quality",
    description:
      "We source only the finest gold from trusted refineries meeting the highest purity standards.",
  },
  {
    icon: <Lock className="w-8 h-8" />,
    title: "Secure Transactions",
    description:
      "Bank-level security and fully insured shipping for complete peace of mind.",
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Expert Consultation",
    description:
      "Our specialists provide personalized guidance to help you make informed decisions.",
  },
  {
    icon: <Globe className="w-8 h-8" />,
    title: "Global Network",
    description:
      "Connected to international markets ensuring competitive pricing and rare acquisitions.",
  },
  {
    icon: <Sparkles className="w-8 h-8" />,
    title: "Exclusive Collection",
    description:
      "Access to limited edition pieces and commemorative gold unavailable elsewhere.",
  },
];
export const Quality: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      id="quality"
      className="py-28 bg-linear-to-b from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-600 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div
          ref={ref}
          className={`text-center mb-20 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-1 w-12 bg-linear-to-r from-transparent to-amber-400"></div>
            <span className="text-amber-400 font-bold tracking-wider uppercase text-sm flex items-center gap-2">
              <Award size={16} className="animate-pulse" />
              Why Choose Us
            </span>
            <div className="h-1 w-12 bg-linear-to-l from-transparent to-amber-400"></div>
          </div>

          <h2 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
            Unmatched Quality &
            <span className="block bg-linear-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">
              Trust Since 1985
            </span>
          </h2>

          <p className="text-gray-300 text-xl max-w-3xl mx-auto leading-relaxed">
            We set the industry standard for excellence, combining decades of
            expertise with cutting-edge certification processes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group relative bg-linear-to-br from-gray-800 to-gray-900 p-8 rounded-3xl border border-gray-700 hover:border-amber-500/50 transition-all duration-500 transform hover:-translate-y-2 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="absolute inset-0 bg-linear-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>

              <div className="relative">
                <div className="w-16 h-16 bg-linear-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-amber-500/30 group-hover:shadow-amber-500/50 transition-all duration-300 group-hover:scale-110 transform text-white">
                  {feature.icon}
                </div>

                <h3 className="text-2xl font-black mb-4 group-hover:text-amber-400 transition-colors">
                  {feature.title}
                </h3>

                <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 bg-linear-to-r from-amber-500/10 via-amber-600/10 to-amber-500/10 rounded-3xl p-12 border border-amber-500/20">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex-1">
              <h3 className="text-3xl font-black mb-4">
                Ready to Explore Our Collection?
              </h3>
              <p className="text-gray-300 text-lg">
                Schedule a consultation with our gold specialists and discover
                the perfect pieces for your collection.
              </p>
            </div>
            <button className="group bg-linear-to-r from-amber-500 to-amber-600 text-white px-10 py-5 rounded-full hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-2xl shadow-amber-500/30 hover:shadow-amber-500/50 font-bold text-lg transform hover:scale-105 flex items-center gap-3 whitespace-nowrap">
              Book Consultation
              <ArrowRight
                size={20}
                className="group-hover:translate-x-2 transition-transform"
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
