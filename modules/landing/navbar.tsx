"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about-us" },
  { label: "Services", href: "/services" },
  { label: "Products", href: "/our-products" },
  { label: "Contact", href: "/contact" },
  { label: "News", href: "/news" },
  { label: "Career", href: "/career" },
  { label: "Account", href: "/account-opening" },
  { label: "Resources", href: "/resources" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hoverPosition, setHoverPosition] = useState({ left: 0, width: 0 });
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnter = (
    index: number,
    e: React.MouseEvent<HTMLAnchorElement>,
  ) => {
    const target = e.currentTarget;
    const navContainer = navRef.current;
    if (navContainer) {
      const navRect = navContainer.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      setHoverPosition({
        left: targetRect.left - navRect.left,
        width: targetRect.width,
      });
    }
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black/80 backdrop-blur-xl border-b border-white/10 shadow-2xl"
          : "bg-black/60 backdrop-blur-md border-b border-white/5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="relative group z-10">
            <div className="flex items-center gap-3">
              {/* Icon */}
              <div className="relative">
                <div className="absolute inset-0 bg-amber-400/30 blur-lg group-hover:bg-amber-400/50 group-hover:blur-xl transition-all duration-300" />
                <div className="relative w-11 h-11 bg-linear-to-br from-amber-400 via-amber-500 to-amber-600 flex items-center justify-center transform group-hover:scale-105 transition-all duration-300 shadow-lg shadow-amber-500/30">
                  <span className="text-black font-black text-lg">SR</span>
                </div>
              </div>
              {/* Text */}
              <div className="hidden sm:block">
                <div className="text-xl font-bold tracking-tight text-white">
                  SR JEWELLERS
                </div>
                <div className="text-[9px] font-semibold tracking-[0.15em] text-amber-400/70 -mt-0.5">
                  GOLD & BULLION EXPERTS
                </div>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div
            ref={navRef}
            className="hidden lg:flex items-center gap-1 relative bg-white/5 backdrop-blur-md border border-white/10 px-2 py-1.5 rounded-lg"
            onMouseLeave={handleMouseLeave}
          >
            {/* Animated hover background */}
            <div
              className={`absolute h-9 bg-white/10 backdrop-blur-sm border border-white/20 rounded-md transition-all duration-300 ease-out ${
                hoveredIndex !== null
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-95"
              }`}
              style={{
                left: `${hoverPosition.left}px`,
                width: `${hoverPosition.width}px`,
              }}
            />

            {navItems.map((item, index) => (
              <a
                key={item.label}
                href={item.href}
                className="relative px-4 py-2 text-zinc-300 hover:text-white transition-colors duration-200 font-medium text-sm z-10"
                onMouseEnter={(e) => handleMouseEnter(index, e)}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2.5 text-white bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all duration-300 border border-white/10 rounded-lg"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-500 ease-out ${
          isMobileMenuOpen
            ? "max-h-screen opacity-100"
            : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="px-4 sm:px-6 pb-6 pt-2 bg-black/95 backdrop-blur-xl border-t border-white/10">
          <div className="flex flex-col space-y-1">
            {navItems.map((item, index) => (
              <a
                key={item.label}
                href={item.href}
                className="px-4 py-3.5 text-zinc-300 hover:text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300 font-medium text-base border border-transparent hover:border-white/20 rounded-lg"
                onClick={() => setIsMobileMenuOpen(false)}
                style={{
                  transitionDelay: `${index * 30}ms`,
                }}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
