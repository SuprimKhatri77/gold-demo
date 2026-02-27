"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Shield,
  Award,
  Lock,
  Users,
  Globe,
  Sparkles,
} from "lucide-react";
import { instrumentSerif } from "@/utils/font";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const FEATURES: Feature[] = [
  {
    icon: Shield,
    title: "Certified Authenticity",
    description:
      "Every product ships with international certification and full authentication documentation.",
  },
  {
    icon: Award,
    title: "Premium Quality",
    description:
      "Sourced exclusively from trusted refineries meeting the highest global purity standards.",
  },
  {
    icon: Lock,
    title: "Secure Transactions",
    description:
      "Bank-level security and fully insured logistics on every order.",
  },
  {
    icon: Users,
    title: "Expert Consultation",
    description:
      "Dedicated specialists available to guide procurement and strategic decisions.",
  },
  {
    icon: Globe,
    title: "Global Network",
    description:
      "Connected to international markets for competitive pricing and rare acquisitions.",
  },
  {
    icon: Sparkles,
    title: "Exclusive Access",
    description:
      "Priority allocation on limited supply and off-market opportunities.",
  },
];

// ─── Intersection hook ────────────────────────────────────────────────────────

const useInView = (
  threshold = 0.1,
): { ref: React.RefObject<HTMLDivElement | null>; inView: boolean } => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
};

// ─── Component ────────────────────────────────────────────────────────────────

export const Quality = (): React.JSX.Element => {
  const { ref: headerRef, inView: headerIn } = useInView();
  const { ref: gridRef, inView: gridIn } = useInView(0.05);

  return (
    <section className="bg-[#0A0A0B] border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-24 lg:py-32">
        {/* ── Header ─────────────────────────────────────────────── */}
        <div
          ref={headerRef}
          className={`mb-20 lg:mb-24 transition-all duration-700 ${headerIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <div className="flex items-center gap-4 mb-8">
            <span
              className="block h-px w-8 bg-[#B8973A]/40"
              aria-hidden="true"
            />
            <span className="text-[11px] font-mono tracking-[0.22em] uppercase text-neutral-600">
              Why Choose Us
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2
              className={`${instrumentSerif.className} text-[clamp(36px,5vw,64px)] font-semibold leading-[1.05] tracking-[-0.02em] text-neutral-100`}
            >
              The standard others
              <br />
              <span className="italic text-[#B8973A]">
                are measured against.
              </span>
            </h2>
            <p className="max-w-xs text-[14px] leading-relaxed text-neutral-500 lg:text-right">
              Four decades of experience. Trusted by institutional buyers across
              40 countries.
            </p>
          </div>
        </div>

        {/* ── Feature grid ───────────────────────────────────────── */}
        <div
          ref={gridRef}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.04] mb-24 lg:mb-32"
        >
          {FEATURES.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className={`
                  group bg-[#0A0A0B] p-8 lg:p-10 flex flex-col gap-5
                  transition-all duration-700
                  ${gridIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
                `}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                {/* Icon */}
                <div className="w-9 h-9 flex items-center justify-center border border-white/[0.07] group-hover:border-[#B8973A]/30 transition-colors duration-300">
                  <Icon
                    size={16}
                    strokeWidth={1.5}
                    aria-hidden="true"
                    className="text-neutral-600 group-hover:text-[#B8973A] transition-colors duration-300"
                  />
                </div>

                {/* Text */}
                <div>
                  <h3 className="text-[14px] font-semibold text-neutral-200 mb-2 tracking-wide">
                    {feature.title}
                  </h3>
                  <p className="text-[13px] text-neutral-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── CTA ────────────────────────────────────────────────── */}
        <div className="border-t border-white/[0.05] pt-16 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div className="max-w-lg">
            <h3
              className={`${instrumentSerif.className} text-[clamp(28px,3.5vw,48px)] font-semibold leading-[1.1] tracking-[-0.02em] text-neutral-100 mb-4`}
            >
              Ready to get started?
            </h3>
            <p className="text-[14px] text-neutral-500 leading-relaxed">
              Speak with our trading desk. Verified B2B buyers only.
            </p>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-[#B8973A] text-[#0A0A0B] text-[12px] font-bold tracking-[0.08em] uppercase hover:bg-[#CBA94A] transition-colors duration-200"
            >
              Book Consultation
              <ArrowRight size={13} strokeWidth={2.5} aria-hidden="true" />
            </Link>
            <Link
              href="/about-us"
              className="inline-flex items-center gap-2 px-8 py-3.5 border border-white/[0.1] text-[12px] font-medium tracking-[0.06em] uppercase text-neutral-500 hover:border-white/[0.2] hover:text-neutral-200 transition-all duration-200"
            >
              Our Story
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
