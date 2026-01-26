import {
  Award,
  Shield,
  Sparkles,
  TrendingUp,
  Zap,
  Globe,
  Users,
  Lock,
  ChevronRight,
} from "lucide-react";

export function AboutUsSection() {
  const stats = [
    {
      number: "25",
      label: "Years of Excellence",
      suffix: "+",
      icon: TrendingUp,
    },
    { number: "50K", label: "Global Clients", suffix: "+", icon: Users },
    { number: "500M", label: "Ounces Delivered", suffix: "+", icon: Globe },
    { number: "99.9", label: "Purity Standard", suffix: "%", icon: Shield },
  ];

  const features = [
    {
      icon: Shield,
      title: "Certified Authenticity",
      desc: "Every piece comes with international certification and full documentation",
    },
    {
      icon: Award,
      title: "Premium Quality",
      desc: "Direct sourcing from world-renowned refineries and mints",
    },
    {
      icon: Sparkles,
      title: "Expert Curation",
      desc: "Handpicked collections by certified precious metal specialists",
    },
    {
      icon: Lock,
      title: "Secure Trading",
      desc: "Advanced security protocols with full insurance coverage",
    },
    {
      icon: TrendingUp,
      title: "Market Insights",
      desc: "Real-time analytics and expert guidance on precious metals",
    },
    {
      icon: Globe,
      title: "Global Delivery",
      desc: "Secure, insured shipping to over 150 countries worldwide",
    },
  ];

  return (
    <section
      id="about"
      className="relative py-24 md:py-32 bg-black overflow-hidden"
    >
      {/* Background gradients */}
      <div className="absolute inset-0 bg-linear-to-b from-zinc-950 via-black to-zinc-950" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/3 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/3 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 mb-6">
            <Zap className="w-4 h-4 text-amber-500" />
            <span className="text-zinc-400 text-sm font-medium">
              About SR Jewellers
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
            Excellence in
            <span className="block text-transparent bg-clip-text bg-linear-to-r from-white to-zinc-500">
              Precious Metals
            </span>
          </h2>

          <p className="text-zinc-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Over 25 years of trusted expertise in precious metal trading and
            investment solutions
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mb-20">
          {/* Left - Story */}
          <div className="space-y-8">
            <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-4">Our Legacy</h3>
              <p className="text-white/80 text-base leading-relaxed mb-4">
                <span className="font-semibold text-white">SR Jewellers</span>{" "}
                has been the premier destination for precious metals collectors,
                investors, and institutions worldwide since 1999.
              </p>
              <p className="text-zinc-400 leading-relaxed">
                We maintain one of the most comprehensive authenticated
                collections of bullion—from investment-grade bars to rare
                collector coins. Every product undergoes rigorous certification
                with complete documentation and insurance coverage.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {features.slice(0, 4).map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={idx}
                    className="group p-5 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-amber-500/30 transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center mb-3 group-hover:bg-amber-500/10 transition-colors">
                      <Icon className="w-5 h-5 text-white/70 group-hover:text-amber-500 transition-colors" />
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
            <div className="p-8 rounded-2xl bg-linear-to-br from-amber-500/10 to-transparent backdrop-blur-md border border-amber-500/20">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-xl bg-linear-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
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
                    className="group p-6 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-amber-500/20 transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center mb-3 group-hover:bg-amber-500/10 transition-colors">
                      <Icon className="w-5 h-5 text-white/70 group-hover:text-amber-500 transition-colors" />
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
            <button className="group w-full py-4 px-6 rounded-xl bg-white text-black font-semibold transition-all duration-300 hover:bg-white/90 flex items-center justify-center gap-2">
              Explore Our Collection
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
                className="group p-6 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-amber-500/20 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-amber-500/10 transition-colors">
                    <Icon className="w-5 h-5 text-white/70 group-hover:text-amber-500 transition-colors" />
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
