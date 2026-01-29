import { companyDetails } from "@/utils/info/details";
import { Mail, MapPin, Phone } from "lucide-react";

export const Header: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-slate-950 via-blue-950/50 to-slate-950 text-zinc-300 border-b border-white/10 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-3.5">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-2 md:gap-3 text-xs md:text-sm">
          {/* Contact Info */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 md:gap-4 lg:gap-6">
            <a
              href="tel:+97142255442"
              className="flex items-center gap-2 hover:text-blue-400 transition-all duration-300 group"
            >
              <div className="w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-all duration-300">
                <Phone
                  size={12}
                  className="text-blue-400 group-hover:scale-110 transition-transform"
                />
              </div>
              <span className="font-medium">{companyDetails.phoneNumber}</span>
            </a>

            <a
              href="mailto:info@srgold.com"
              className="flex items-center gap-2 hover:text-cyan-400 transition-all duration-300 group"
            >
              <div className="w-6 h-6 rounded-full bg-cyan-500/10 flex items-center justify-center group-hover:bg-cyan-500/20 transition-all duration-300">
                <Mail
                  size={12}
                  className="text-cyan-400 group-hover:scale-110 transition-transform"
                />
              </div>
              <span className="font-medium">{companyDetails.email}</span>
            </a>

            <div className="flex items-center gap-2 text-zinc-400">
              <div className="w-6 h-6 rounded-full bg-indigo-500/10 flex items-center justify-center">
                <MapPin size={12} className="text-indigo-400" />
              </div>
              <span className="font-medium hidden sm:inline">
                {companyDetails.shortAddress}
              </span>
              <span className="font-medium sm:hidden">Dubai, UAE</span>
            </div>
          </div>

          {/* Tagline */}
          <div className="hidden lg:flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></div>
            <span className="text-zinc-400 font-semibold text-xs tracking-wider uppercase">
              Trusted Metals Experts Since 1985
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
