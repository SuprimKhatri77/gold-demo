import { Mail, MapPin, Phone } from "lucide-react";

export const Header: React.FC = () => {
  return (
    <div className="bg-zinc-950 text-zinc-300 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 md:py-3">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-2 md:gap-3 text-xs md:text-sm">
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 md:gap-4 lg:gap-6">
            <a
              href="tel:+97142255442"
              className="flex items-center gap-2 hover:text-amber-500 transition-colors duration-300 group"
            >
              <Phone
                size={14}
                className="text-amber-500 group-hover:scale-110 transition-transform"
              />
              <span className="font-medium">+971 4 225 5442</span>
            </a>
            <a
              href="mailto:info@srgold.com"
              className="flex items-center gap-2 hover:text-amber-500 transition-colors duration-300 group"
            >
              <Mail
                size={14}
                className="text-amber-500 group-hover:scale-110 transition-transform"
              />
              <span className="font-medium">info@srgold.com</span>
            </a>
            <div className="flex items-center gap-2 text-zinc-400">
              <MapPin size={14} className="text-amber-500" />
              <span className="font-medium hidden sm:inline">
                Gold Souq, Deira - Dubai
              </span>
              <span className="font-medium sm:hidden">Dubai, UAE</span>
            </div>
          </div>
          <div className="hidden lg:block">
            <span className="text-zinc-400 font-medium text-xs tracking-wider uppercase">
              Trusted Gold Experts Since 1985
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
