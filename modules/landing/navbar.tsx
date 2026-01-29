"use client";

import {
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Home,
  Info,
  Package,
  Briefcase,
  Mail,
  Compass,
  LucideIcon,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface NavItem {
  label: string;
  href?: string;
  children?: { label: string; href: string; description?: string }[];
  icon?: LucideIcon;
}

const navItems: NavItem[] = [
  { label: "Home", href: "/", icon: Home },
  { label: "About", href: "/about-us", icon: Info },
  { label: "Products", href: "/our-products", icon: Package },
  { label: "Services", href: "/services", icon: Briefcase },
  { label: "Contact", href: "/contact", icon: Mail },
  {
    label: "Explore",
    icon: Compass,
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

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

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
    <>
      <div className="sticky top-0 z-50">
        <div
          className={`transition-all duration-500 ${isScrolled ? "px-4 sm:px-6 lg:px-8 pt-4" : ""
            }`}
        >
          <nav
            className={`transition-all duration-500 ${isScrolled
                ? "max-w-7xl mx-auto bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl shadow-blue-500/20 rounded-xs"
                : "bg-white/5 backdrop-blur-xl border-b border-white/10"
              }`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-20">
                {/* Logo */}
                <Link
                  href="/"
                  className="relative group z-10"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
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
                  </div>
                </Link>

                {/* Desktop Navigation */}
                <div
                  ref={navRef}
                  className="hidden lg:flex items-center gap-1 relative px-2 py-1.5 rounded-xs"
                  onMouseLeave={handleMouseLeave}
                >
                  {/* Animated hover background */}
                  <div
                    className={`absolute h-9 bg-linear-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-sm border border-blue-400/40 transition-all duration-300 ease-out shadow-lg shadow-blue-500/20 ${hoveredIndex !== null
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
                            className={`absolute top-full right-0 mt-3 w-72 overflow-hidden transition-all duration-300 ${openDropdown === index
                                ? "opacity-100 translate-y-0 pointer-events-auto"
                                : "opacity-0 -translate-y-2 pointer-events-none"
                              }`}
                            onMouseEnter={handleDropdownEnter}
                            onMouseLeave={handleDropdownLeave}
                          >
                            {/* Outer border glow */}
                            <div className="absolute inset-0 bg-linear-to-b from-blue-500/30 via-cyan-500/20 to-blue-500/30 blur-xl" />

                            {/* Main dropdown container with stronger background */}
                            <div className="relative bg-linear-to-b from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-2xl border-2 border-blue-400/50 shadow-2xl shadow-blue-500/40">
                              <div className="p-2">
                                {item.children.map((child) => (
                                  <Link
                                    key={child.label}
                                    href={child.href}
                                    className="block px-4 py-3 text-zinc-200 hover:text-white hover:bg-linear-to-r hover:from-blue-500/20 hover:to-cyan-500/20 transition-all duration-300 border border-transparent hover:border-blue-400/60 hover:shadow-lg hover:shadow-blue-500/30 group"
                                  >
                                    <div className="flex items-start gap-3">
                                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400/60 group-hover:bg-blue-400 group-hover:shadow-lg group-hover:shadow-blue-400/50 mt-1.5 transition-all duration-300" />
                                      <div>
                                        <div className="font-medium text-sm">
                                          {child.label}
                                        </div>
                                        {child.description && (
                                          <div className="text-xs text-zinc-400 group-hover:text-zinc-300 mt-0.5 transition-colors">
                                            {child.description}
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <Link
                          href={`${item.href}`}
                          className="relative px-4 py-2 text-zinc-300 hover:text-white transition-colors duration-300 font-medium text-sm z-10"
                          onMouseEnter={(e) => handleMouseEnter(index, e)}
                        >
                          {item.label}
                        </Link>
                      )}
                    </div>
                  ))}
                </div>

                {/* Mobile Menu Button */}
                <button
                  className="lg:hidden relative p-2.5 text-white bg-linear-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-md hover:from-blue-500/30 hover:to-cyan-500/30 transition-all duration-300 border border-blue-400/40 shadow-lg shadow-blue-500/20 overflow-hidden group"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  aria-label="Toggle menu"
                >
                  <div className="absolute inset-0 bg-linear-to-br from-blue-400/0 to-cyan-400/0 group-hover:from-blue-400/10 group-hover:to-cyan-400/10 transition-all duration-300" />
                  <div className="relative">
                    {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                  </div>
                </button>
              </div>
            </div>
          </nav>
        </div>
      </div>

      {/* COMPLETELY REDESIGNED MOBILE MENU */}
      <div
        className={`lg:hidden fixed inset-0 z-60 transition-all duration-500 ${isMobileMenuOpen ? "pointer-events-auto" : "pointer-events-none"
          }`}
      >
        {/* Animated Background Overlay */}
        <div
          className={`absolute inset-0 bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 transition-opacity duration-500 ${isMobileMenuOpen ? "opacity-100" : "opacity-0"
            }`}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          {/* Animated gradient orbs */}
          <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute bottom-20 right-10 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          />
        </div>

        {/* Menu Content - Slide from Right */}
        <div
          className={`absolute top-0 right-0 h-full w-full sm:w-96 bg-linear-to-b from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-2xl border-l-2 border-blue-400/30 shadow-2xl transition-transform duration-500 ease-out ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
          {/* Header */}
          <div className="relative border-b border-blue-400/20 bg-linear-to-r from-blue-500/10 to-cyan-500/10">
            <div className="absolute inset-0 bg-linear-to-r from-blue-500/5 via-transparent to-cyan-500/5" />
            <div className="relative px-6 py-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Compass className="w-5 h-5 text-blue-400" />
                  Navigation
                </h2>
                <p className="text-xs text-zinc-400 mt-1">
                  Explore our services
                </p>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-400/40 transition-all duration-300 group"
              >
                <X className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" />
              </button>
            </div>
          </div>

          {/* Scrollable Menu Items */}
          <div className="h-[calc(100%-100px)] overflow-y-auto px-4 py-6 space-y-2">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const isOpen = mobileOpenDropdown === index;

              return (
                <div
                  key={item.label}
                  className={`transition-all duration-300 ${isMobileMenuOpen
                      ? "translate-x-0 opacity-100"
                      : "translate-x-10 opacity-0"
                    }`}
                  style={{
                    transitionDelay: `${index * 80}ms`,
                  }}
                >
                  {item.children ? (
                    <div className="space-y-2">
                      {/* Parent Item */}
                      <button
                        onClick={() =>
                          setMobileOpenDropdown(isOpen ? null : index)
                        }
                        className="w-full group"
                      >
                        <div className="relative overflow-hidden">
                          {/* Glow effect */}
                          <div className="absolute inset-0 bg-linear-to-r from-blue-500/0 via-cyan-500/0 to-blue-500/0 group-hover:from-blue-500/20 group-hover:via-cyan-500/10 group-hover:to-blue-500/20 transition-all duration-500" />

                          {/* Main button */}
                          <div className="relative flex items-center justify-between px-5 py-4 bg-linear-to-r from-slate-800/50 to-slate-700/50 group-hover:from-slate-800/80 group-hover:to-slate-700/80 border border-blue-400/20 group-hover:border-blue-400/40 transition-all duration-300">
                            <div className="flex items-center gap-3">
                              {Icon && (
                                <div className="p-2 rounded-lg bg-linear-to-br from-blue-500/20 to-cyan-500/20 border border-blue-400/30">
                                  <Icon className="w-4 h-4 text-blue-400" />
                                </div>
                              )}
                              <span className="font-semibold text-white">
                                {item.label}
                              </span>
                            </div>
                            <ChevronRight
                              className={`w-5 h-5 text-blue-400 transition-transform duration-300 ${isOpen ? "rotate-90" : ""
                                }`}
                            />
                          </div>
                        </div>
                      </button>

                      {/* Children Items */}
                      <div
                        className={`space-y-1.5 pl-4 transition-all duration-300 origin-top ${isOpen
                            ? "max-h-125 opacity-100 scale-y-100"
                            : "max-h-0 opacity-0 scale-y-95 overflow-hidden"
                          }`}
                      >
                        {item.children.map((child, childIndex) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`block group transition-all duration-300 ${isOpen
                                ? "translate-x-0 opacity-100"
                                : "translate-x-4 opacity-0"
                              }`}
                            style={{
                              transitionDelay: `${childIndex * 50}ms`,
                            }}
                          >
                            <div className="relative overflow-hidden">
                              {/* Hover glow */}
                              <div className="absolute inset-0 bg-linear-to-r from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/10 group-hover:to-blue-500/10 transition-all duration-300" />

                              {/* Child link content */}
                              <div className="relative px-4 py-3 bg-slate-800/30 group-hover:bg-slate-700/50 border border-blue-400/10 group-hover:border-cyan-400/30 transition-all duration-300">
                                <div className="flex items-start gap-3">
                                  <div className="mt-1.5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400/50 group-hover:bg-cyan-400 group-hover:shadow-lg group-hover:shadow-cyan-400/50 transition-all duration-300" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="font-medium text-sm text-zinc-200 group-hover:text-white transition-colors">
                                      {child.label}
                                    </div>
                                    {child.description && (
                                      <div className="text-xs text-zinc-500 group-hover:text-zinc-400 mt-0.5 transition-colors line-clamp-2">
                                        {child.description}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.href || "/"}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block group"
                    >
                      <div className="relative overflow-hidden">
                        {/* Glow effect */}
                        <div className="absolute inset-0 bg-linear-to-r from-blue-500/0 via-cyan-500/0 to-blue-500/0 group-hover:from-blue-500/20 group-hover:via-cyan-500/10 group-hover:to-blue-500/20 transition-all duration-500" />

                        {/* Main link */}
                        <div className="relative flex items-center gap-3 px-5 py-4 bg-linear-to-r from-slate-800/50 to-slate-700/50 group-hover:from-slate-800/80 group-hover:to-slate-700/80 border border-blue-400/20 group-hover:border-blue-400/40 transition-all duration-300">
                          {Icon && (
                            <div className="p-2 rounded-sm bg-linear-to-br from-blue-500/20 to-cyan-500/20 border border-blue-400/30 group-hover:border-blue-400/50 transition-all duration-300">
                              <Icon className="w-4 h-4 text-blue-400 group-hover:text-cyan-400 transition-colors" />
                            </div>
                          )}
                          <span className="font-semibold text-white">
                            {item.label}
                          </span>
                        </div>
                      </div>
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
