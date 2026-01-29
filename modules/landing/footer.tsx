"use client";

import { companyDetails } from "@/utils/info/details";
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
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

interface FooterItem {
  label: string;
  href: string;
}

const footerLinks: FooterItem[] = [
  { label: "About us", href: "/about-us" },
  { label: "Our products", href: "/our-products" },
  { label: "Contact", href: "/contact" },
  { label: "News", href: "/news" },
  { label: "Career", href: "/career" },
  { label: "Account Opening", href: "/account-opening" },
];

const socialLinks = [
  {
    icon: Facebook,
    href: "#",
    label: "Facebook",
    color: "hover:text-blue-400",
  },
  { icon: Twitter, href: "#", label: "Twitter", color: "hover:text-cyan-400" },
  {
    icon: Instagram,
    href: "#",
    label: "Instagram",
    color: "hover:text-pink-400",
  },
  {
    icon: Linkedin,
    href: "#",
    label: "LinkedIn",
    color: "hover:text-blue-500",
  },
];

export const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail("");
      }, 3000);
    }
  };

  return (
    <footer className="relative overflow-hidden bg-linear-to-b from-slate-950 via-blue-950 to-slate-950">
      {/* Animated Wave Divider */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
        <svg
          className="relative block w-full h-20 md:h-32"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(59, 130, 246, 0.3)" />
              <stop offset="50%" stopColor="rgba(34, 211, 238, 0.3)" />
              <stop offset="100%" stopColor="rgba(59, 130, 246, 0.3)" />
            </linearGradient>
          </defs>
          <path
            d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            fill="url(#waveGradient)"
            className="animate-wave"
          />
          <path
            d="M0,32L48,37.3C96,43,192,53,288,58.7C384,64,480,64,576,58.7C672,53,768,43,864,48C960,53,1056,75,1152,80C1248,85,1344,75,1392,69.3L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            fill="rgba(59, 130, 246, 0.1)"
            className="animate-wave-delayed"
          />
        </svg>
      </div>

      {/* Grid Pattern Background */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(59,130,246,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.05) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Floating gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
      <div
        className="absolute bottom-1/4 -right-32 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24 relative z-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="group inline-block mb-6">
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-amber-500/20 blur-xl group-hover:bg-amber-500/30 transition-all duration-300 rounded-full" />
                {/* Logo */}
                <div className="relative w-24 h-24 transform group-hover:scale-105 transition-transform duration-300">
                  <Image
                    src="/logo.png"
                    alt="SR Jewellers Logo"
                    width={96}
                    height={96}
                    className="object-contain"
                  />
                </div>
              </div>
            </Link>
            <p className="text-zinc-400 leading-relaxed mb-6">
              Trusted gold experts since 1985, showcasing premium certified gold
              collections worldwide.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group/social w-10 h-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg flex items-center justify-center hover:border-blue-400/40 transition-all duration-300 hover:scale-110 ${social.color}`}
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5 text-zinc-400 group-hover/social:text-current transition-colors" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
              <div className="w-1 h-6 bg-linear-to-b from-blue-400 to-cyan-400 rounded-full" />
              Quick Links
            </h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-zinc-400 hover:text-white transition-all duration-300 flex items-center gap-2 group"
                  >
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform opacity-0 group-hover:opacity-100 text-blue-400"
                    />
                    <span className="group-hover:translate-x-1 transition-transform">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
              <div className="w-1 h-6 bg-linear-to-b from-blue-400 to-cyan-400 rounded-full" />
              Contact
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href={`tel:${companyDetails.phoneNumber}`}
                  className="group flex items-start gap-3 text-zinc-400 hover:text-white transition-colors"
                >
                  <div className="w-10 h-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg flex items-center justify-center shrink-0 group-hover:border-blue-400/40 transition-all">
                    <Phone size={18} className="text-blue-400" />
                  </div>
                  <div className="pt-2">
                    <div className="text-xs text-zinc-500 mb-1">Call Us</div>
                    <span className="text-sm">
                      {companyDetails.phoneNumber}
                    </span>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${companyDetails.email}`}
                  className="group flex items-start gap-3 text-zinc-400 hover:text-white transition-colors"
                >
                  <div className="w-10 h-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg flex items-center justify-center shrink-0 group-hover:border-cyan-400/40 transition-all">
                    <Mail size={18} className="text-cyan-400" />
                  </div>
                  <div className="pt-2">
                    <div className="text-xs text-zinc-500 mb-1">Email</div>
                    <span className="text-sm break-all">
                      {companyDetails.email}
                    </span>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="https://maps.google.com/?q=Near+Bait+Al+Banat+Women's+Museum+Al+Sabkha+Gold+Souq+Deira+Dubai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3 text-zinc-400 hover:text-white transition-colors"
                >
                  <div className="w-10 h-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg flex items-center justify-center shrink-0 group-hover:border-purple-400/40 transition-all">
                    <MapPin size={18} className="text-purple-400" />
                  </div>
                  <div className="pt-2">
                    <div className="text-xs text-zinc-500 mb-1">Location</div>
                    <span className="text-sm leading-relaxed">
                      {companyDetails.longAddress}
                    </span>
                  </div>
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
              <div className="w-1 h-6 bg-linear-to-b from-blue-400 to-cyan-400 rounded-full" />
              Newsletter
            </h4>
            <p className="text-zinc-400 mb-6 leading-relaxed">
              Subscribe to receive the latest gold market insights and
              collection updates.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 focus:border-blue-400/40 focus:outline-none text-white placeholder-zinc-500 transition-all"
                  required
                />
              </div>
              <button
                type="submit"
                className="group w-full py-3 px-6 bg-linear-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 relative overflow-hidden"
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-linear-to-r from-transparent via-white/20 to-transparent" />
                <span className="relative">
                  {isSubscribed ? "Subscribed!" : "Subscribe"}
                </span>
                <Send
                  size={18}
                  className={`relative transition-transform ${isSubscribed ? "translate-x-1 -translate-y-1" : "group-hover:translate-x-0.5 group-hover:-translate-y-0.5"}`}
                />
              </button>
            </form>
            {isSubscribed && (
              <div className="mt-3 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                <p className="text-green-400 text-sm">
                  Thank you for subscribing!
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Decorative Divider */}
        <div className="relative h-px mb-8">
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-blue-400/50 to-transparent" />
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-zinc-400 text-sm text-center md:text-left">
            © {new Date().getFullYear()}{" "}
            <span className="text-white font-semibold">SR Jewellers</span>. All
            rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Link
              href="#"
              className="text-zinc-400 hover:text-white transition-colors relative group"
            >
              <span>Privacy Policy</span>
              <span className="absolute bottom-0 left-0 w-0 h-px bg-blue-400 group-hover:w-full transition-all duration-300" />
            </Link>
            <Link
              href="#"
              className="text-zinc-400 hover:text-white transition-colors relative group"
            >
              <span>Terms of Service</span>
              <span className="absolute bottom-0 left-0 w-0 h-px bg-blue-400 group-hover:w-full transition-all duration-300" />
            </Link>
            <Link
              href="#"
              className="text-zinc-400 hover:text-white transition-colors relative group"
            >
              <span>Cookie Policy</span>
              <span className="absolute bottom-0 left-0 w-0 h-px bg-blue-400 group-hover:w-full transition-all duration-300" />
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes wave {
          0%,
          100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(-25%);
          }
        }

        @keyframes wave-delayed {
          0%,
          100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(25%);
          }
        }

        .animate-wave {
          animation: wave 10s ease-in-out infinite;
        }

        .animate-wave-delayed {
          animation: wave-delayed 8s ease-in-out infinite;
        }
      `}</style>
    </footer>
  );
};
