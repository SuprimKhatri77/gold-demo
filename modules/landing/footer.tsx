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
    <footer className="bg-zinc-950 text-white relative overflow-hidden border-t border-white/5">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 relative z-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12 md:mb-16">
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-linear-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/20">
                <span className="text-black font-black text-lg md:text-2xl">
                  SR
                </span>
              </div>
              <div>
                <span className="text-xl md:text-2xl font-bold bg-linear-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent">
                  SR Gold
                </span>
              </div>
            </div>
            <p className="text-zinc-400 mb-6 leading-relaxed text-sm md:text-base">
              Trusted gold experts since 1985, showcasing premium certified gold
              collections worldwide.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 bg-white/5 hover:bg-amber-500/20 border border-white/10 hover:border-amber-500/30 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 transform backdrop-blur-sm"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/5 hover:bg-amber-500/20 border border-white/10 hover:border-amber-500/30 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 transform backdrop-blur-sm"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/5 hover:bg-amber-500/20 border border-white/10 hover:border-amber-500/30 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 transform backdrop-blur-sm"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>
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
                    className="text-zinc-400 hover:text-amber-500 transition-colors flex items-center gap-2 group text-sm md:text-base"
                  >
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform text-amber-500"
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
                  className="text-zinc-400 hover:text-amber-500 transition-colors flex items-start gap-3 group text-sm md:text-base"
                >
                  <Phone size={18} className="mt-0.5 shrink-0 text-amber-500" />
                  <span>+971 4 225 5442</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@srgold.com"
                  className="text-zinc-400 hover:text-amber-500 transition-colors flex items-start gap-3 group text-sm md:text-base break-all"
                >
                  <Mail size={18} className="mt-0.5 shrink-0 text-amber-500" />
                  <span>info@srgold.com</span>
                </a>
              </li>
              <li>
                <a
                  href="https://maps.google.com/?q=Near+Bait+Al+Banat+Women's+Museum+Al+Sabkha+Gold+Souq+Deira+Dubai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-amber-500 transition-colors flex items-start gap-3 group text-sm md:text-base"
                >
                  <MapPin
                    size={18}
                    className="mt-0.5 shrink-0 text-amber-500"
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
                className="flex-1 px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-amber-500/50 focus:outline-none text-white placeholder-zinc-500 text-sm md:text-base backdrop-blur-sm transition-colors"
              />
              <button className="w-12 h-12 bg-linear-to-r from-amber-500 to-amber-600 rounded-lg flex items-center justify-center hover:from-amber-400 hover:to-amber-500 transition-all duration-300 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 hover:scale-110 transform shrink-0">
                <Send size={18} className="text-black" />
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
                className="text-zinc-400 hover:text-amber-500 transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-zinc-400 hover:text-amber-500 transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-zinc-400 hover:text-amber-500 transition-colors"
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
