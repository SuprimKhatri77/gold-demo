"use client";

import { companyDetails } from "@/utils/info/details";
import { Mail, Phone, Building2 } from "lucide-react";

export const ContactHero: React.FC = () => {
  return (
    <section className="relative bg-linear-to-b from-slate-950 via-blue-950 to-slate-950 py-20 md:py-28 px-4 border-b border-white/10 overflow-hidden">
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

      {/* Animated floating orbs */}
      <div className="absolute top-0 -left-48 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
      <div
        className="absolute bottom-0 -right-48 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      />

      <div className="max-w-6xl mx-auto text-center relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 hover:border-blue-400/40 transition-all duration-300 group mb-8">
          <Building2 className="w-4 h-4 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
          <span className="text-sm text-zinc-300 font-semibold">
            B2B Precious Metals Support
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 md:mb-8 leading-tight">
          <span className="block">Connect With Our</span>
          <span className="block bg-linear-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent mt-2">
            Metals Trading Team
          </span>
        </h1>

        <p className="text-lg md:text-xl lg:text-2xl text-zinc-400 max-w-3xl mx-auto leading-relaxed mb-12">
          Whether you need bulk quotes, custom solutions, or partnership
          opportunities, our dedicated team is ready to support your{" "}
          <span className="text-white font-medium">precious metals</span>{" "}
          business needs.
        </p>

        {/* Quick Contact Cards */}
        <div className="grid sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
          <div className="group bg-white/5 backdrop-blur-xl border border-white/10  p-6 hover:border-blue-400/40 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 bg-linear-to-br from-blue-600 to-cyan-600 rounded-sm flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-sm font-semibold text-zinc-400 mb-2">
              Email Us
            </h3>
            <p className="text-white font-bold">{companyDetails.email}</p>
          </div>

          <div className="group bg-white/5 backdrop-blur-xl border border-white/10 p-6 hover:border-cyan-400/40 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 bg-linear-to-br from-cyan-600 to-blue-600 rounded-sm flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
              <Phone className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-sm font-semibold text-zinc-400 mb-2">
              Call Us
            </h3>
            <p className="text-white font-bold">{companyDetails.phoneNumber}</p>
          </div>

          <div className="group bg-white/5 backdrop-blur-xl border border-white/10 p-6 hover:border-purple-400/40 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 bg-linear-to-br from-purple-600 to-indigo-600 rounded-sm flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-sm font-semibold text-zinc-400 mb-2">
              Business Hours
            </h3>
            <p className="text-white font-bold">
              {companyDetails.businessHours}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
