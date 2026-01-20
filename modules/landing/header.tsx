import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  Twitter,
} from "lucide-react";

export const Header: React.FC = () => {
  return (
    <div className="bg-linear-to-r from-gray-900 via-amber-950 to-gray-900 text-amber-50 py-3 px-4 border-b border-amber-800/30">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center text-sm gap-3">
        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 lg:gap-6">
          <a
            href="tel:+12345678900"
            className="flex items-center gap-2 hover:text-amber-300 transition-all duration-300 group"
          >
            <Phone
              size={16}
              className="group-hover:rotate-12 transition-transform"
            />
            <span className="font-medium">+1 (234) 567-8900</span>
          </a>
          <a
            href="mailto:contact@goldpremium.com"
            className="flex items-center gap-2 hover:text-amber-300 transition-all duration-300 group"
          >
            <Mail
              size={16}
              className="group-hover:scale-110 transition-transform"
            />
            <span className="font-medium">contact@goldpremium.com</span>
          </a>
          <div className="flex items-center gap-2 text-amber-400">
            <MapPin size={16} className="animate-pulse" />
            <span className="font-medium">Serving Globally Since 1985</span>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <span className="text-amber-200 font-semibold flex items-center gap-2">
            <Sparkles size={16} className="text-amber-400 animate-pulse" />
            Trusted Gold Experts Since 1985
          </span>
          <div className="flex gap-3">
            <a
              href="#"
              className="hover:text-amber-300 transition-all duration-300 hover:scale-125 transform"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="#"
              className="hover:text-amber-300 transition-all duration-300 hover:scale-125 transform"
            >
              <Instagram size={18} />
            </a>
            <a
              href="#"
              className="hover:text-amber-300 transition-all duration-300 hover:scale-125 transform"
            >
              <Twitter size={18} />
            </a>
            <a
              href="#"
              className="hover:text-amber-300 transition-all duration-300 hover:scale-125 transform"
            >
              <Facebook size={18} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
