"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface NavItem {
  label: string;
  href?: string;
  children?: { label: string; href: string; description?: string }[];
}

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about-us" },
  { label: "Products", href: "/our-products" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
  {
    label: "Explore",
    children: [
      {
        label: "Estimation",
        href: "/estimation",
        description: "Get instant gold & silver value estimates",
      },

      {
        label: "News",
        href: "/news",
        description: "Latest metals news",
      },
      { label: "Career", href: "/career", description: "Join our team" },
      {
        label: "Account",
        href: "/account-opening",
        description: "Open an account",
      },
      { label: "Resources", href: "/resources", description: "Learn more" },
    ],
  },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hoverPosition, setHoverPosition] = useState({ left: 0, width: 0 });
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [mobileOpenDropdown, setMobileOpenDropdown] = useState<number | null>(
    null,
  );
  const navRef = useRef<HTMLDivElement>(null);
  const dropdownTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnter = (
    index: number,
    e: React.MouseEvent<HTMLAnchorElement | HTMLDivElement>,
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

    // Handle dropdown
    if (navItems[index].children) {
      if (dropdownTimeout.current) {
        clearTimeout(dropdownTimeout.current);
      }
      setOpenDropdown(index);
    }
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  };

  const handleDropdownEnter = () => {
    if (dropdownTimeout.current) {
      clearTimeout(dropdownTimeout.current);
    }
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
              <div className="block">
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
              <div key={item.label} className="relative">
                {item.children ? (
                  <div
                    className="relative px-4 py-2 text-zinc-300 hover:text-white transition-colors duration-200 font-medium text-sm z-10 cursor-pointer"
                    onMouseEnter={(e) => handleMouseEnter(index, e)}
                    onMouseLeave={handleDropdownLeave}
                  >
                    {item.label}

                    {/* Dropdown Menu */}
                    <div
                      className={`absolute top-full right-0 mt-2 w-64 bg-black/95 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl overflow-hidden transition-all duration-300 ${
                        openDropdown === index
                          ? "opacity-100 translate-y-0 pointer-events-auto"
                          : "opacity-0 -translate-y-2 pointer-events-none"
                      }`}
                      onMouseEnter={handleDropdownEnter}
                      onMouseLeave={handleDropdownLeave}
                    >
                      {item.children.map((child) => (
                        <a
                          key={child.label}
                          href={child.href}
                          className="block px-4 py-3 text-zinc-300 hover:text-white hover:bg-white/10 transition-all duration-200 border-b border-white/5 last:border-b-0"
                        >
                          <div className="font-medium text-sm">
                            {child.label}
                          </div>
                          {child.description && (
                            <div className="text-xs text-zinc-500 mt-0.5">
                              {child.description}
                            </div>
                          )}
                        </a>
                      ))}
                    </div>
                  </div>
                ) : (
                  <a
                    href={item.href}
                    className="relative px-4 py-2 text-zinc-300 hover:text-white transition-colors duration-200 font-medium text-sm z-10"
                    onMouseEnter={(e) => handleMouseEnter(index, e)}
                  >
                    {item.label}
                  </a>
                )}
              </div>
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
        className={`lg:hidden transition-all duration-500 ease-out ${
          isMobileMenuOpen
            ? "max-h-screen opacity-100"
            : "max-h-0 opacity-0 pointer-events-none"
        }`}
        style={{ overflow: isMobileMenuOpen ? "visible" : "hidden" }}
      >
        <div className="px-4 sm:px-6 pb-6 pt-4 bg-linear-to-b from-black/95 via-black/98 to-black backdrop-blur-xl border-t border-white/10">
          <div className="flex flex-col space-y-2">
            {navItems.map((item, index) => (
              <div
                key={item.label}
                className={`transform transition-all duration-300 ${
                  isMobileMenuOpen
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-4 opacity-0"
                }`}
                style={{
                  transitionDelay: `${index * 50}ms`,
                }}
              >
                {item.children ? (
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
                    <button
                      className="w-full text-left px-5 py-4 text-zinc-200 hover:text-white hover:bg-white/5 transition-all duration-300 font-semibold text-base flex items-center justify-between group"
                      onClick={() =>
                        setMobileOpenDropdown(
                          mobileOpenDropdown === index ? null : index,
                        )
                      }
                    >
                      <span className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400/70 group-hover:bg-amber-400 transition-colors" />
                        {item.label}
                      </span>
                      <span
                        className={`transition-all duration-300 text-amber-400/70 group-hover:text-amber-400 ${
                          mobileOpenDropdown === index
                            ? "rotate-180 scale-110"
                            : ""
                        }`}
                      >
                        ▼
                      </span>
                    </button>
                    <div
                      className={`transition-all duration-300 ease-out ${
                        mobileOpenDropdown === index
                          ? "max-h-96 opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="px-3 pb-3 pt-1 space-y-1 bg-black/30">
                        {item.children.map((child, childIndex) => (
                          <a
                            key={child.label}
                            href={child.href}
                            className="block px-4 py-3 text-zinc-400 hover:text-white hover:bg-white/10 transition-all duration-200 font-medium text-sm rounded-lg border border-transparent hover:border-white/20 group"
                            onClick={() => setIsMobileMenuOpen(false)}
                            style={{
                              transitionDelay: `${childIndex * 30}ms`,
                            }}
                          >
                            <div className="flex items-center gap-2">
                              <span className="w-1 h-1 rounded-full bg-amber-400/50 group-hover:bg-amber-400 transition-colors" />
                              {child.label}
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    href={`${item.href}`}
                    className="px-5 py-4 text-zinc-200 hover:text-white bg-white/5 hover:bg-white/10 backdrop-blur-sm transition-all duration-300 font-semibold text-base border border-white/10 hover:border-white/20 rounded-xl flex items-center gap-2 group shadow-lg hover:shadow-amber-500/10"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400/70 group-hover:bg-amber-400 group-hover:scale-125 transition-all" />
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
