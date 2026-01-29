import {
  CheckCircle,
  Clock,
  Globe,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

export const TrustSection: React.FC = () => {
  const trustPoints = [
    {
      icon: <Clock className="w-7 h-7 md:w-8 md:h-8" />,
      title: "24-Hour Response Time",
      description:
        "We respond to all B2B inquiries within one business day with competitive quotes",
      color: "from-blue-600 to-cyan-600",
    },
    {
      icon: <ShieldCheck className="w-7 h-7 md:w-8 md:h-8" />,
      title: "Trusted by 500+ Partners",
      description:
        "Join hundreds of businesses worldwide who trust us for their precious metals supply",
      color: "from-cyan-600 to-blue-600",
    },
    {
      icon: <TrendingUp className="w-7 h-7 md:w-8 md:h-8" />,
      title: "Industry Expertise",
      description:
        "Over 100 years of combined experience in wholesale precious metals trading",
      color: "from-purple-600 to-indigo-600",
    },
  ];

  return (
    <section className="py-16 md:py-24 px-4 bg-linear-to-b from-slate-950 via-blue-950 to-slate-950 border-t border-white/10 relative overflow-hidden">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(59,130,246,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.03) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Floating orbs */}
      <div className="absolute top-1/2 -left-48 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 -right-48 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-12 bg-linear-to-r from-transparent to-blue-400/40" />
            <span className="text-zinc-400 font-semibold tracking-wider uppercase text-sm flex items-center gap-2">
              <Globe className="w-4 h-4 text-cyan-400" />
              Why Partner With Us
            </span>
            <div className="h-px w-12 bg-linear-to-l from-transparent to-blue-400/40" />
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            <span className="block">Your Trusted Partner in</span>
            <span className="block bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mt-2">
              Precious Metals Trading
            </span>
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Experience the difference of working with industry-leading wholesale
            metals specialists
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {trustPoints.map((point, index) => (
            <div
              key={index}
              className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-blue-400/40 hover:bg-white/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10 text-center"
            >
              <div
                className={`w-16 h-16 md:w-20 md:h-20 bg-linear-to-br ${point.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-500/20`}
              >
                <div className="text-white">{point.icon}</div>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                {point.title}
              </h3>
              <p className="text-zinc-400 leading-relaxed text-sm md:text-base">
                {point.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 text-sm text-zinc-400">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span>LBMA Certified • Secure Logistics • Global Reach</span>
          </div>
        </div>
      </div>
    </section>
  );
};
