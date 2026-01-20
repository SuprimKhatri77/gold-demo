"use client";

import { ArrowRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "News", href: "/news" },
  { label: "Services", href: "/services" },
  { label: "Our Products", href: "/our-products" },
  { label: "Contact", href: "/contact" },
];
export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = (): void => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-xl shadow-2xl shadow-amber-500/10"
          : "bg-white/90 backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3 group cursor-pointer">
            <Link href="/" className="relative">
              <div className="w-12 h-12 bg-linear-to-br from-amber-400 via-amber-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/50 group-hover:shadow-amber-500/70 transition-all duration-300 group-hover:rotate-6 transform">
                <span className="text-white font-black text-2xl">G</span>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
            </Link>
            <div>
              <span className="text-2xl font-black bg-linear-to-r from-amber-600 via-amber-500 to-amber-700 bg-clip-text text-transparent">
                GoldPremium
              </span>
              <div className="text-xs text-gray-500 font-medium">Est. 1985</div>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-gray-700 hover:text-amber-600 transition-all duration-300 font-semibold text-[15px] relative group py-2"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-linear-to-r from-amber-400 to-amber-600 group-hover:w-full transition-all duration-300"></span>
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-amber-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            {/* <button className="text-gray-700 hover:text-amber-600 transition-all duration-300 font-semibold flex items-center gap-2 group">
              <MessageCircle
                size={20}
                className="group-hover:scale-110 transition-transform"
              />
              <span>Live Chat</span>
            </button> */}
            <button className="relative bg-linear-to-r from-amber-500 via-amber-600 to-amber-500 text-white px-8 py-3 rounded-full hover:from-amber-600 hover:via-amber-700 hover:to-amber-600 transition-all duration-300 shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 font-bold transform hover:scale-105 overflow-hidden group">
              <span className="relative z-10 flex items-center gap-2">
                View Collection
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </span>
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </button>
          </div>

          <button
            className="lg:hidden text-gray-700 hover:text-amber-600 transition-colors p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden mt-6 pb-6 flex flex-col gap-4 border-t border-gray-200 pt-6 animate-fadeIn">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-gray-700 hover:text-amber-600 transition-all duration-300 font-semibold text-lg hover:translate-x-2 transform"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <button className="bg-linear-to-r from-amber-500 to-amber-600 text-white px-6 py-3 rounded-full hover:from-amber-600 hover:to-amber-700 transition-all duration-300 font-bold shadow-lg mt-2">
              View Collection
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};
