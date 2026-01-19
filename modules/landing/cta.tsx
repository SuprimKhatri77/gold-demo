import { ArrowRight, Award, Lock, Phone, Shield, Sparkles } from "lucide-react";
import { useScrollAnimation } from "./landing";

export const CTASection: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-28 bg-linear-to-br from-gray-900 via-amber-950 to-gray-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-600 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
        <div
          ref={ref}
          className={`transition-all duration-1000 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
        >
          <div className="flex items-center justify-center gap-3 mb-8">
            <Sparkles className="text-amber-400 animate-pulse" size={32} />
          </div>

          <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
            Start Your Gold
            <span className="block bg-linear-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">
              Collection Journey Today
            </span>
          </h2>

          <p className="text-gray-300 text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed">
            Join thousands of collectors who trust GoldPremium for authentic,
            certified gold pieces. Our experts are ready to guide you.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="group relative bg-linear-to-r from-amber-500 via-amber-600 to-amber-500 text-white px-12 py-6 rounded-full transition-all duration-300 shadow-2xl shadow-amber-500/50 hover:shadow-amber-500/70 font-bold text-xl transform hover:scale-105 overflow-hidden">
              <span className="relative z-10 flex items-center justify-center gap-3">
                Browse Collection
                <ArrowRight
                  size={24}
                  className="group-hover:translate-x-2 transition-transform"
                />
              </span>
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </button>

            <button className="group bg-white/10 backdrop-blur-md text-white px-12 py-6 rounded-full hover:bg-white/20 transition-all duration-300 border-2 border-white/30 hover:border-white/50 font-bold text-xl transform hover:scale-105 flex items-center justify-center gap-3">
              <Phone
                size={24}
                className="group-hover:rotate-12 transition-transform"
              />
              Schedule Consultation
            </button>
          </div>

          <div className="mt-16 flex flex-wrap items-center justify-center gap-12">
            {[
              { icon: Shield, text: "Certified Authentic" },
              { icon: Lock, text: "Secure Process" },
              { icon: Award, text: "38+ Years Trusted" },
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <item.icon className="text-amber-400" size={24} />
                <span className="text-gray-300 font-semibold">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
