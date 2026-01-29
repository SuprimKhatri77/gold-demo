"use client";

import { Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
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
      setIsScrolled(window.scrollY > 50);
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
    <div className="sticky top-0 z-50">
      <div
        className={`transition-all duration-500 ${
          isScrolled ? "px-4 sm:px-6 lg:px-8 pt-4" : ""
        }`}
      >
        <nav
          className={`transition-all duration-500 ${
            isScrolled
              ? "max-w-7xl mx-auto bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl shadow-blue-500/20 rounded-2xl"
              : "bg-white/5 backdrop-blur-xl border-b border-white/10"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              {/* Logo */}
              <Link href="/" className="relative group z-10">
                <div className="flex items-center gap-3">
                  {/* Logo Image */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-amber-400/20 blur-lg group-hover:bg-amber-400/40 group-hover:blur-xl transition-all duration-300" />
                    <div className="relative w-20 h-20 transform group-hover:scale-105 transition-all duration-300">
                      <Image
                        src="/logo.png"
                        alt="SR Jewellers Logo"
                        width={200}
                        height={200}
                        className="object-cover"
                        priority
                      />
                    </div>
                  </div>
                  {/* Text */}
                  {/* <div className="block">
                      <div className="text-xl font-bold tracking-tight text-white">
                        SR JEWELLERS
                      </div>
                      <div className="text-[9px] font-semibold tracking-[0.15em] text-amber-400/70 -mt-0.5">
                        PRECIOUS METALS EXPERTS
                      </div>
                    </div> */}
                </div>
              </Link>

              {/* Desktop Navigation */}
              <div
                ref={navRef}
                className="hidden lg:flex items-center gap-1 relative px-2 py-1.5 rounded-xl"
                onMouseLeave={handleMouseLeave}
              >
                {/* Animated hover background */}
                <div
                  className={`absolute h-9 bg-linear-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-sm border border-blue-400/40 rounded-lg transition-all duration-300 ease-out shadow-lg shadow-blue-500/20 ${
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
                        className="relative px-4 py-7 text-zinc-300 hover:text-white transition-colors duration-300 font-medium text-sm z-10 cursor-pointer flex items-center gap-1.5"
                        onMouseEnter={(e) => handleMouseEnter(index, e)}
                        onMouseLeave={handleDropdownLeave}
                      >
                        {item.label}
                        <ChevronDown
                          className={`w-3.5 h-3.5 transition-transform duration-300 ${openDropdown === index ? "rotate-180" : ""}`}
                        />

                        {/* Dropdown Menu */}
                        <div
                          className={`absolute top-full right-0 mt-3 w-72 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl shadow-blue-500/20 overflow-hidden transition-all duration-300 ${
                            openDropdown === index
                              ? "opacity-100 translate-y-0 pointer-events-auto"
                              : "opacity-0 -translate-y-2 pointer-events-none"
                          }`}
                          onMouseEnter={handleDropdownEnter}
                          onMouseLeave={handleDropdownLeave}
                        >
                          <div className="p-2">
                            {item.children.map((child) => (
                              <a
                                key={child.label}
                                href={child.href}
                                className="block px-4 py-3 text-zinc-300 hover:text-white hover:bg-white/10 transition-all duration-300 rounded-lg border border-transparent hover:border-blue-400/40 group"
                              >
                                <div className="flex items-start gap-3">
                                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400/50 group-hover:bg-blue-400 mt-1.5 transition-all duration-300" />
                                  <div>
                                    <div className="font-medium text-sm">
                                      {child.label}
                                    </div>
                                    {child.description && (
                                      <div className="text-xs text-zinc-400 mt-0.5">
                                        {child.description}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <a
                        href={item.href}
                        className="relative px-4 py-2 text-zinc-300 hover:text-white transition-colors duration-300 font-medium text-sm z-10"
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
                className="lg:hidden p-2.5 text-white bg-white/10 backdrop-blur-md hover:bg-white/15 transition-all duration-300 border border-white/20 rounded-xl hover:border-blue-400/40"
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
            <div className="px-4 sm:px-6 pb-6 pt-4 bg-linear-to-b from-white/5 via-white/10 to-white/5 backdrop-blur-xl border-t border-white/10">
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
                      <div className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl overflow-hidden hover:border-blue-400/40 transition-all duration-300">
                        <button
                          className="w-full text-left px-5 py-4 text-zinc-200 hover:text-white hover:bg-white/10 transition-all duration-300 font-semibold text-base flex items-center justify-between group"
                          onClick={() =>
                            setMobileOpenDropdown(
                              mobileOpenDropdown === index ? null : index,
                            )
                          }
                        >
                          <span className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-400/70 group-hover:bg-blue-400 transition-colors" />
                            {item.label}
                          </span>
                          <ChevronDown
                            className={`w-4 h-4 transition-all duration-300 text-blue-400/70 group-hover:text-blue-400 ${
                              mobileOpenDropdown === index ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        <div
                          className={`transition-all duration-300 ease-out ${
                            mobileOpenDropdown === index
                              ? "max-h-96 opacity-100"
                              : "max-h-0 opacity-0"
                          }`}
                        >
                          <div className="px-3 pb-3 pt-1 space-y-1 bg-white/5">
                            {item.children.map((child, childIndex) => (
                              <a
                                key={child.label}
                                href={child.href}
                                className="block px-4 py-3 text-zinc-400 hover:text-white hover:bg-white/10 transition-all duration-300 font-medium text-sm rounded-lg border border-transparent hover:border-blue-400/40 group"
                                onClick={() => setIsMobileMenuOpen(false)}
                                style={{
                                  transitionDelay: `${childIndex * 30}ms`,
                                }}
                              >
                                <div className="flex items-start gap-2">
                                  <span className="w-1 h-1 rounded-full bg-blue-400/50 group-hover:bg-blue-400 mt-1.5 transition-colors" />
                                  <div>
                                    <div>{child.label}</div>
                                    {child.description && (
                                      <div className="text-xs text-zinc-400 mt-0.5">
                                        {child.description}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <Link
                        href={`${item.href}`}
                        className="px-5 py-4 text-zinc-200 hover:text-white bg-white/5 hover:bg-white/10 backdrop-blur-sm transition-all duration-300 font-semibold text-base border border-white/20 hover:border-blue-400/40 rounded-xl flex items-center gap-2 group shadow-lg hover:shadow-blue-500/20"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400/70 group-hover:bg-blue-400 group-hover:scale-125 transition-all" />
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
