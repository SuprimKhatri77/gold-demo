import { ArrowRight, Send, Mail, Phone, MapPin } from "lucide-react";

interface FooterItem {
  label: string;
  href: string;
}

const footerLinks: FooterItem[] = [
  { label: "About us", href: "/about-us" },
  { label: "News", href: "/news" },
  { label: "Our products", href: "/our-products" },
  { label: "Contact", href: "/contact" },
  { label: "Live rates", href: "/live-rates" },
];

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white relative overflow-hidden border-t border-white/10">
      {/* Subtle Background Gradient */}
      <div className="absolute inset-0 bg-linear-to-b from-zinc-950 to-black"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 relative z-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12 md:mb-16">
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="relative w-11 h-11 bg-linear-to-br from-amber-400 via-amber-500 to-amber-600 flex items-center justify-center transform group-hover:scale-105 transition-all duration-300 shadow-lg shadow-amber-500/30">
                <span className="text-black font-black text-lg">SR</span>
              </div>
              <div>
                <span className="text-xl md:text-2xl font-bold text-white">
                  SR Gold
                </span>
              </div>
            </div>
            <p className="text-zinc-400 leading-relaxed text-sm md:text-base">
              Trusted gold experts since 1985, showcasing premium certified gold
              collections worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg md:text-xl font-bold mb-4 md:mb-6 text-white">
              Quick Links
            </h4>
            <ul className="space-y-2 md:space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-zinc-400 hover:text-white transition-colors flex items-center gap-2 group text-sm md:text-base"
                  >
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform opacity-0 group-hover:opacity-100"
                    />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h4 className="text-lg md:text-xl font-bold mb-4 md:mb-6 text-white">
              Contact
            </h4>
            <ul className="space-y-3 md:space-y-4">
              <li>
                <a
                  href="tel:+97142255442"
                  className="text-zinc-400 hover:text-white transition-colors flex items-start gap-3 group text-sm md:text-base"
                >
                  <Phone
                    size={18}
                    className="mt-0.5 shrink-0 text-zinc-500 group-hover:text-white transition-colors"
                  />
                  <span>+971 4 225 5442</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@srgold.com"
                  className="text-zinc-400 hover:text-white transition-colors flex items-start gap-3 group text-sm md:text-base break-all"
                >
                  <Mail
                    size={18}
                    className="mt-0.5 shrink-0 text-zinc-500 group-hover:text-white transition-colors"
                  />
                  <span>info@srgold.com</span>
                </a>
              </li>
              <li>
                <a
                  href="https://maps.google.com/?q=Near+Bait+Al+Banat+Women's+Museum+Al+Sabkha+Gold+Souq+Deira+Dubai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-white transition-colors flex items-start gap-3 group text-sm md:text-base"
                >
                  <MapPin
                    size={18}
                    className="mt-0.5 shrink-0 text-zinc-500 group-hover:text-white transition-colors"
                  />
                  <span className="leading-relaxed">
                    Near Bait Al Banat Women&apos;s Museum, Al Sabkha, Gold
                    Souq, Near - Al Khor Street - Deira - Dubai 14925
                  </span>
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg md:text-xl font-bold mb-4 md:mb-6 text-white">
              Newsletter
            </h4>
            <p className="text-zinc-400 mb-4 text-sm md:text-base leading-relaxed">
              Subscribe to receive the latest gold market insights and
              collection updates.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-3 rounded-lg bg-white/5 backdrop-blur-md border border-white/10 focus:border-white/30 focus:outline-none text-white placeholder-zinc-500 text-sm md:text-base transition-colors"
              />
              <button className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg flex items-center justify-center hover:bg-white/20 hover:border-white/30 transition-all duration-300 shrink-0 group">
                <Send
                  size={18}
                  className="text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 md:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-zinc-400 text-xs md:text-sm text-center md:text-left">
              © {new Date().getFullYear()} SR Gold. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-xs md:text-sm">
              <a
                href="#"
                className="text-zinc-400 hover:text-white transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-zinc-400 hover:text-white transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-zinc-400 hover:text-white transition-colors"
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
