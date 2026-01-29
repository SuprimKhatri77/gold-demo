import {
  Award,
  Shield,
  TrendingUp,
  Zap,
  Globe,
  Lock,
  ChevronRight,
  Building2,
  LineChart,
  CheckCircle2,
} from "lucide-react";

export function AboutUsSection() {
  const stats = [
    {
      number: "25",
      label: "Years in Business",
      suffix: "+",
      icon: TrendingUp,
    },
    { number: "2K", label: "Corporate Partners", suffix: "+", icon: Building2 },
    { number: "500M", label: "USD Traded Annually", suffix: "+", icon: LineChart },
    { number: "99.9", label: "Purity Standard", suffix: "%", icon: Shield },
  ];

  const features = [
    {
      icon: Shield,
      title: "Certified Authenticity",
      desc: "International certification with full traceability and documentation for all transactions",
    },
    {
      icon: Award,
      title: "Premium Sourcing",
      desc: "Direct partnerships with LBMA-accredited refineries and authorized mints worldwide",
    },
    {
      icon: Building2,
      title: "B2B Solutions",
      desc: "Tailored bulk trading, hedging, and supply chain solutions for enterprises",
    },
    {
      icon: Lock,
      title: "Secure Infrastructure",
      desc: "Bank-grade security with comprehensive insurance and custody services",
    },
    {
      icon: LineChart,
      title: "Market Intelligence",
      desc: "Real-time data feeds, analytics dashboards, and dedicated market specialists",
    },
    {
      icon: Globe,
      title: "Global Network",
      desc: "Multi-jurisdiction operations with compliant delivery to 150+ countries",
    },
  ];

  const certifications = [
    "LBMA Accredited",
    "ISO 9001 Certified",
    "DMCC Registered",
    "Conflict-Free Sourcing",
  ];

  return (
    <section
      id="about"
      className="relative py-24 md:py-32 bg-slate-950 overflow-hidden"
    >
      {/* Background gradients */}
      <div className="absolute inset-0 bg-linear-to-b from-slate-950 via-blue-950 to-slate-950" />
      
      {/* Grid pattern */}
      <div className="absolute inset-0" style={{
        backgroundImage: `linear-gradient(rgba(59,130,246,0.03) 1px, transparent 1px),
                         linear-gradient(90deg, rgba(59,130,246,0.03) 1px, transparent 1px)`,
        backgroundSize: '64px 64px'
      }} />

      {/* Floating gradient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 mb-6">
            <Zap className="w-4 h-4 text-blue-400" />
            <span className="text-zinc-400 text-sm font-medium">
              About SR Jewellers
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
            Global Leader in
            <span className="block text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-cyan-400 to-blue-500">
              Precious Metals Trading
            </span>
          </h2>

          <p className="text-zinc-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Trusted B2B partner for institutional investors, manufacturers, and enterprises since 1999
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mb-20">
          {/* Left - Story */}
          <div className="space-y-8">
            <div className="group p-8 bg-white/5 backdrop-blur-xl border border-white/10 hover:border-blue-400/40 transition-all duration-300 hover:-translate-y-1">
              <h3 className="text-2xl font-bold text-white mb-4">Our Legacy</h3>
              <p className="text-white/80 text-base leading-relaxed mb-4">
                <span className="font-semibold text-white">SR Jewellers</span>{" "}
                has served as the premier B2B precious metals partner for institutional clients, 
                manufacturers, and investment firms worldwide since 1999.
              </p>
              <p className="text-zinc-400 leading-relaxed mb-6">
                We specialize in bulk trading, supply chain solutions, and strategic metal procurement 
                with competitive pricing, flexible delivery terms, and comprehensive market insights. 
                Every transaction is backed by international certification, secure custody options, 
                and dedicated account management.
              </p>
              
              {/* Certifications */}
              <div className="flex flex-wrap gap-2">
                {certifications.map((cert, idx) => (
                  <div
                    key={idx}
                    className="px-3 py-1.5 rounded-sm bg-white/5 border border-white/10 flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                    <span className="text-xs text-zinc-400 font-medium">{cert}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {features.slice(0, 4).map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={idx}
                    className="group p-5 bg-white/5 backdrop-blur-xl border border-white/10 hover:border-cyan-400/40 transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="w-10 h-10 rounded-sm bg-white/5 flex items-center justify-center mb-3 group-hover:bg-blue-500/10 transition-colors">
                      <Icon className="w-5 h-5 text-white/70 group-hover:text-cyan-400 transition-all duration-300 group-hover:scale-110" />
                    </div>
                    <h4 className="font-semibold text-white text-sm mb-1">
                      {feature.title}
                    </h4>
                    <p className="text-zinc-500 text-xs leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right - Stats */}
          <div className="space-y-6">
            {/* Featured Stat */}
            <div className="group p-8 bg-linear-to-br from-blue-500/10 via-cyan-500/5 to-transparent backdrop-blur-xl border border-blue-400/20 hover:border-cyan-400/40 transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-sm bg-linear-to-br from-blue-600 to-cyan-600 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform duration-300">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <div>
                  <div className="text-5xl font-bold text-white mb-1">
                    99.9%
                  </div>
                  <div className="text-zinc-400 text-sm">
                    Certified Purity Guarantee
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={idx}
                    className="group p-6 bg-white/5 backdrop-blur-xl border border-white/10 hover:border-blue-400/40 transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="w-10 h-10 rounded-sm bg-white/5 flex items-center justify-center mb-3 group-hover:bg-cyan-500/10 transition-colors">
                      <Icon className="w-5 h-5 text-white/70 group-hover:text-cyan-400 transition-all duration-300 group-hover:rotate-12" />
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">
                      {stat.number}
                      {stat.suffix}
                    </div>
                    <div className="text-zinc-500 text-xs font-medium">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA */}
            <button className="group w-full py-4 px-6 bg-linear-to-r from-blue-600 to-cyan-600 text-white font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 hover:scale-[1.02] flex items-center justify-center gap-2">
              Request Partnership Info
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Bottom Features */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="group p-6 bg-white/5 backdrop-blur-xl border border-white/10 hover:border-cyan-400/40 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-sm bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-blue-500/10 transition-colors">
                    <Icon className="w-5 h-5 text-white/70 group-hover:text-cyan-400 transition-all duration-300 group-hover:scale-110" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-white text-sm mb-2">
                      {feature.title}
                    </h4>
                    <p className="text-zinc-500 text-xs leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}