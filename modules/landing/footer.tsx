import {
  ArrowRight,
  Facebook,
  Instagram,
  Linkedin,
  Send,
  Twitter,
  Youtube,
} from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-linear-to-b from-gray-900 to-black text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-amber-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-600 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-linear-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-black text-2xl">G</span>
              </div>
              <div>
                <span className="text-2xl font-black bg-linear-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
                  GoldPremium
                </span>
              </div>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Trusted gold experts since 1985, showcasing premium certified gold
              collections worldwide.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-white/10 hover:bg-amber-500 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 transform"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 hover:bg-amber-500 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 transform"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 hover:bg-amber-500 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 transform"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 hover:bg-amber-500 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 transform"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 hover:bg-amber-500 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 transform"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xl font-black mb-6 text-amber-400">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                "About Us",
                "Our Collection",
                "Quality Standards",
                "Insights",
                "Contact",
              ].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-amber-400 transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-black mb-6 text-amber-400">Services</h4>
            <ul className="space-y-3">
              {[
                "Gold Bars",
                "Gold Coins",
                "Jewelry Showcase",
                "Certification",
                "Consultation",
              ].map((service) => (
                <li key={service}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-amber-400 transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-black mb-6 text-amber-400">
              Newsletter
            </h4>
            <p className="text-gray-400 mb-4">
              Subscribe to receive the latest gold market insights and
              collection updates.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:border-amber-400 focus:outline-none text-white placeholder-gray-500"
              />
              <button className="w-12 h-12 bg-linear-to-r from-amber-500 to-amber-600 rounded-lg flex items-center justify-center hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 hover:scale-110 transform">
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2026 GoldPremium. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a
                href="#"
                className="text-gray-400 hover:text-amber-400 transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-amber-400 transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-amber-400 transition-colors"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
