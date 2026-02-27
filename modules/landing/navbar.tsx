"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface DropdownChild {
  label: string;
  href: string;
  description?: string;
}

interface NavItem {
  label: string;
  href?: string;
  children?: DropdownChild[];
}

// ─── Data ────────────────────────────────────────────────────────────────────

const NAV_ITEMS: NavItem[] = [
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
        description: "Instant value estimates",
      },
      { label: "News", href: "/news", description: "Market & metals news" },
      { label: "Career", href: "/career", description: "Join our team" },
      {
        label: "Account Opening",
        href: "/account-opening",
        description: "Open a trading account",
      },
      {
        label: "Resources",
        href: "/resources",
        description: "Guides & documentation",
      },
    ],
  },
];

// ─── Subcomponents ───────────────────────────────────────────────────────────

interface DropdownMenuProps {
  children: DropdownChild[];
  isOpen: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const DropdownMenu = ({
  children,
  isOpen,
  onMouseEnter,
  onMouseLeave,
}: DropdownMenuProps): React.JSX.Element => (
  <div
    role="menu"
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    className={`
      absolute top-full right-0 mt-2 w-60
      bg-[#111113] border border-white/[0.07]
      shadow-[0_16px_48px_rgba(0,0,0,0.7)]
      transition-all duration-200 z-50
      ${isOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-1 pointer-events-none"}
    `}
  >
    <div className="p-1.5">
      {children.map((child) => (
        <Link
          key={child.label}
          href={child.href}
          role="menuitem"
          className="group flex items-start gap-3 px-3 py-2.5 hover:bg-white/[0.03] transition-colors duration-100 rounded-sm"
        >
          <span className="mt-[7px] w-[3px] h-[3px] rounded-full bg-neutral-700 group-hover:bg-[#B8973A] transition-colors duration-150 shrink-0" />
          <div>
            <p className="text-[13px] font-medium text-neutral-400 group-hover:text-neutral-100 transition-colors duration-150 leading-none">
              {child.label}
            </p>
            {child.description && (
              <p className="text-[11px] text-neutral-700 mt-1 leading-tight">
                {child.description}
              </p>
            )}
          </div>
        </Link>
      ))}
    </div>
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────

export const Navbar = (): React.JSX.Element => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<number | null>(null);

  const dropdownTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Scroll listener
  useEffect(() => {
    const onScroll = (): void => setIsScrolled(window.scrollY > 32);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  const openDropdownNow = useCallback((index: number): void => {
    if (dropdownTimer.current) clearTimeout(dropdownTimer.current);
    setOpenDropdown(index);
  }, []);

  const scheduleClose = useCallback((): void => {
    dropdownTimer.current = setTimeout(() => setOpenDropdown(null), 120);
  }, []);

  const cancelClose = useCallback((): void => {
    if (dropdownTimer.current) clearTimeout(dropdownTimer.current);
  }, []);

  const closeMobile = useCallback((): void => {
    setIsMobileOpen(false);
    setMobileExpanded(null);
  }, []);

  return (
    <>
      {/* ── Desktop / Sticky Nav ─────────────────────────────────────── */}
      <header
        className={`
          sticky top-0 z-50 transition-all duration-300
          ${
            isScrolled
              ? "bg-[#0A0A0B]/96 backdrop-blur-md border-b border-[#B8973A]/10 shadow-[0_1px_0_rgba(255,255,255,0.02)]"
              : "bg-[#0A0A0B] border-b border-white/[0.04]"
          }
        `}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-[68px] flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center shrink-0"
            aria-label="SR Jewellers — Home"
          >
            <Image
              src="/logo.png"
              alt="SR Jewellers"
              width={48}
              height={48}
              className="object-contain"
              priority
            />
          </Link>

          {/* Desktop nav links */}
          <nav
            aria-label="Main navigation"
            className="hidden lg:flex items-center gap-0.5"
          >
            {NAV_ITEMS.map((item, index) =>
              item.children ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => openDropdownNow(index)}
                  onMouseLeave={scheduleClose}
                >
                  <button
                    type="button"
                    aria-haspopup="menu"
                    aria-expanded={openDropdown === index}
                    className="flex items-center gap-1.5 px-4 py-2 text-[13px] font-medium tracking-wide text-neutral-500 hover:text-neutral-100 transition-colors duration-150"
                  >
                    {item.label}
                    <ChevronDown
                      size={12}
                      strokeWidth={2}
                      aria-hidden="true"
                      className={`text-neutral-600 transition-transform duration-200 ${openDropdown === index ? "rotate-180" : ""}`}
                    />
                  </button>

                  <DropdownMenu
                    children={item.children}
                    isOpen={openDropdown === index}
                    onMouseEnter={cancelClose}
                    onMouseLeave={scheduleClose}
                  />
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href!}
                  className="px-4 py-2 text-[13px] font-medium tracking-wide text-neutral-500 hover:text-neutral-100 transition-colors duration-150"
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <div className="flex items-center gap-3">
            {/* Quote CTA */}
            <Link
              href="/contact"
              className="hidden lg:inline-flex items-center px-5 py-2.5 text-[12px] font-bold tracking-[0.08em] uppercase text-[#0A0A0B] bg-[#B8973A] hover:bg-[#CBA94A] transition-colors duration-200"
            >
              Get a Quote
            </Link>

            {/* Mobile hamburger */}
            <button
              type="button"
              aria-label={isMobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileOpen}
              aria-controls="mobile-nav"
              className="lg:hidden flex items-center justify-center w-9 h-9 border border-white/[0.08] text-neutral-500 hover:text-neutral-200 hover:border-white/[0.15] transition-all duration-150"
              onClick={() => setIsMobileOpen((prev) => !prev)}
            >
              {isMobileOpen ? (
                <X size={18} strokeWidth={1.5} aria-hidden="true" />
              ) : (
                <Menu size={18} strokeWidth={1.5} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Menu ──────────────────────────────────────────────── */}
      <div
        id="mobile-nav"
        aria-hidden={!isMobileOpen}
        className={`lg:hidden fixed inset-0 z-[200] transition-all duration-300 ${isMobileOpen ? "pointer-events-auto" : "pointer-events-none"}`}
      >
        {/* Backdrop */}
        <div
          aria-hidden="true"
          onClick={closeMobile}
          className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${isMobileOpen ? "opacity-100" : "opacity-0"}`}
        />

        {/* Slide panel */}
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className={`
            absolute top-0 right-0 h-full w-full max-w-sm
            bg-[#0D0D0F] border-l border-white/[0.05]
            flex flex-col
            transition-transform duration-300 ease-out
            ${isMobileOpen ? "translate-x-0" : "translate-x-full"}
          `}
        >
          {/* Panel header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.05]">
            <Link
              href="/"
              onClick={closeMobile}
              aria-label="SR Jewellers — Home"
            >
              <Image
                src="/logo.png"
                alt="SR Jewellers"
                width={38}
                height={38}
                className="object-contain"
              />
            </Link>
            <button
              type="button"
              aria-label="Close menu"
              onClick={closeMobile}
              className="flex items-center justify-center w-8 h-8 border border-white/[0.07] text-neutral-600 hover:text-neutral-300 transition-colors"
            >
              <X size={16} strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>

          {/* Nav items */}
          <nav
            aria-label="Mobile navigation"
            className="flex-1 overflow-y-auto px-4 py-4 flex flex-col"
          >
            {NAV_ITEMS.map((item, index) => {
              const isExpanded = mobileExpanded === index;
              return (
                <div key={item.label}>
                  {item.children ? (
                    <>
                      <button
                        type="button"
                        aria-expanded={isExpanded}
                        onClick={() =>
                          setMobileExpanded(isExpanded ? null : index)
                        }
                        className="w-full flex items-center justify-between px-4 py-3.5 text-[14px] font-medium text-neutral-500 hover:text-neutral-200 transition-colors duration-150 border-b border-white/[0.03]"
                      >
                        {item.label}
                        <ChevronDown
                          size={14}
                          strokeWidth={1.5}
                          aria-hidden="true"
                          className={`text-neutral-700 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                        />
                      </button>
                      <div
                        className={`overflow-hidden transition-all duration-250 ${isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
                      >
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            onClick={closeMobile}
                            className="group flex items-start gap-3 pl-8 pr-4 py-3 border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors duration-100"
                          >
                            <span className="mt-[7px] w-[3px] h-[3px] rounded-full bg-neutral-800 group-hover:bg-[#B8973A] shrink-0 transition-colors" />
                            <div>
                              <p className="text-[13px] text-neutral-500 group-hover:text-neutral-200 transition-colors">
                                {child.label}
                              </p>
                              {child.description && (
                                <p className="text-[11px] text-neutral-700 mt-0.5">
                                  {child.description}
                                </p>
                              )}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    <Link
                      href={item.href!}
                      onClick={closeMobile}
                      className="flex px-4 py-3.5 text-[14px] font-medium text-neutral-500 hover:text-neutral-200 transition-colors duration-150 border-b border-white/[0.03]"
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Mobile CTA */}
          <div className="px-4 pb-8 pt-4 border-t border-white/[0.05]">
            <Link
              href="/contact"
              onClick={closeMobile}
              className="flex items-center justify-center w-full py-3.5 text-[12px] font-bold tracking-[0.1em] uppercase text-[#0A0A0B] bg-[#B8973A] hover:bg-[#CBA94A] transition-colors duration-200"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
