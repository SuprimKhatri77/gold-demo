"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Send,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
import { companyDetails } from "@/utils/info/details";

// ─── Types ────────────────────────────────────────────────────────────────────

interface FooterLink {
  label: string;
  href: string;
}

interface SocialLink {
  icon: React.ElementType;
  href: string;
  label: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const FOOTER_LINKS: FooterLink[] = [
  { label: "About Us", href: "/about-us" },
  { label: "Our Products", href: "/our-products" },
  { label: "Services", href: "/services" },
  { label: "News", href: "/news" },
  { label: "Career", href: "/career" },
  { label: "Account Opening", href: "/account-opening" },
];

const SOCIAL_LINKS: SocialLink[] = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
];

// ─── Component ────────────────────────────────────────────────────────────────

export const Footer = (): React.JSX.Element => {
  const [email, setEmail] = useState<string>("");
  const [subscribed, setSubscribed] = useState<boolean>(false);

  const handleSubscribe = useCallback(
    (e: React.FormEvent<HTMLFormElement>): void => {
      e.preventDefault();
      if (!email) return;
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail("");
      }, 3000);
    },
    [email],
  );

  return (
    <footer className="relative bg-[#080809] overflow-hidden">
      {/* ── Wave divider (kept — it's good) ────────────────────────────── */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none pointer-events-none">
        <svg
          className="relative block w-full h-16 md:h-24"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            fill="rgba(184,151,58,0.06)"
            style={{ animation: "wave 12s ease-in-out infinite" }}
          />
          <path
            d="M0,32L48,37.3C96,43,192,53,288,58.7C384,64,480,64,576,58.7C672,53,768,43,864,48C960,53,1056,75,1152,80C1248,85,1344,75,1392,69.3L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            fill="rgba(255,255,255,0.02)"
            style={{ animation: "wave 9s ease-in-out infinite reverse" }}
          />
        </svg>
      </div>

      {/* ── Main content ─────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-20 pb-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="inline-block mb-6"
              aria-label="SR Jewellers — Home"
            >
              <Image
                src="/logo.png"
                alt="SR Jewellers"
                width={56}
                height={56}
                className="object-contain"
              />
            </Link>
            <p className="text-[13px] text-neutral-600 leading-relaxed mb-6 max-w-[220px]">
              Trusted precious metals experts since{" "}
              {companyDetails.companyEstablishmentDate}. Serving institutional
              buyers worldwide.
            </p>
            <div className="flex items-center gap-2">
              {SOCIAL_LINKS.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-8 h-8 flex items-center justify-center border border-white/[0.07] text-neutral-700 hover:text-[#B8973A] hover:border-[#B8973A]/30 transition-all duration-200"
                  >
                    <Icon size={14} strokeWidth={1.5} aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-[11px] font-mono tracking-[0.2em] uppercase text-neutral-600 mb-6">
              Navigation
            </h4>
            <ul className="flex flex-col gap-3">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-[13px] text-neutral-600 hover:text-neutral-200 transition-colors duration-150"
                  >
                    <ArrowRight
                      size={11}
                      strokeWidth={2}
                      aria-hidden="true"
                      className="opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-150 text-[#B8973A]"
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[11px] font-mono tracking-[0.2em] uppercase text-neutral-600 mb-6">
              Contact
            </h4>
            <ul className="flex flex-col gap-5">
              <li>
                <a
                  href={`tel:${companyDetails.phoneNumber}`}
                  className="group flex items-start gap-3 text-neutral-600 hover:text-neutral-200 transition-colors duration-150"
                >
                  <Phone
                    size={13}
                    strokeWidth={1.5}
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-[#B8973A]/60"
                  />
                  <div>
                    <p className="text-[10px] font-mono tracking-widest uppercase text-neutral-700 mb-0.5">
                      Phone
                    </p>
                    <p className="text-[13px]">{companyDetails.phoneNumber}</p>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${companyDetails.email}`}
                  className="group flex items-start gap-3 text-neutral-600 hover:text-neutral-200 transition-colors duration-150"
                >
                  <Mail
                    size={13}
                    strokeWidth={1.5}
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-[#B8973A]/60"
                  />
                  <div>
                    <p className="text-[10px] font-mono tracking-widest uppercase text-neutral-700 mb-0.5">
                      Email
                    </p>
                    <p className="text-[13px] break-all">
                      {companyDetails.email}
                    </p>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="https://maps.google.com/?q=Near+Bait+Al+Banat+Women's+Museum+Al+Sabkha+Gold+Souq+Deira+Dubai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3 text-neutral-600 hover:text-neutral-200 transition-colors duration-150"
                >
                  <MapPin
                    size={13}
                    strokeWidth={1.5}
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-[#B8973A]/60"
                  />
                  <div>
                    <p className="text-[10px] font-mono tracking-widest uppercase text-neutral-700 mb-0.5">
                      Location
                    </p>
                    <p className="text-[13px] leading-relaxed">
                      {companyDetails.longAddress}
                    </p>
                  </div>
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-[11px] font-mono tracking-[0.2em] uppercase text-neutral-600 mb-6">
              Market Updates
            </h4>
            <p className="text-[13px] text-neutral-600 leading-relaxed mb-5">
              Receive metals market insights and pricing updates.
            </p>
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col gap-3"
              noValidate
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                required
                aria-label="Email address for newsletter"
                className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.07] text-[13px] text-neutral-300 placeholder-neutral-700 focus:outline-none focus:border-[#B8973A]/30 transition-colors duration-200"
              />
              <button
                type="submit"
                className="flex items-center justify-center gap-2 px-5 py-3 bg-[#B8973A] text-[#080809] text-[12px] font-bold tracking-[0.08em] uppercase hover:bg-[#CBA94A] transition-colors duration-200 disabled:opacity-50"
              >
                {subscribed ? "Subscribed!" : "Subscribe"}
                <Send
                  size={12}
                  strokeWidth={2}
                  aria-hidden="true"
                  className={
                    subscribed ? "translate-x-0.5 -translate-y-0.5" : ""
                  }
                />
              </button>
            </form>
          </div>
        </div>

        {/* ── Bottom bar ───────────────────────────────────────────────── */}
        <div className="pt-8 border-t border-white/[0.05] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[12px] text-neutral-700">
            © {new Date().getFullYear()} SR Jewellers. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
              (item) => (
                <Link
                  key={item}
                  href="#"
                  className="text-[12px] text-neutral-700 hover:text-neutral-400 transition-colors duration-150"
                >
                  {item}
                </Link>
              ),
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes wave {
          0%, 100% { transform: translateX(0); }
          50%       { transform: translateX(-20%); }
        }
      `}</style>
    </footer>
  );
};
