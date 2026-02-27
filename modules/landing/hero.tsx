"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Stat {
  value: string;
  label: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const METALS: string[] = ["Gold", "Silver", "Platinum", "Palladium"];

const STATS: Stat[] = [
  { value: "$5.8B+", label: "Annual Volume" },
  { value: "500+", label: "Business Partners" },
  { value: "40+", label: "Countries Served" },
  { value: "24 / 7", label: "Trading Desk" },
];

// ─── Component ────────────────────────────────────────────────────────────────

export const Hero = (): React.JSX.Element => {
  const [mounted, setMounted] = useState<boolean>(false);
  const [tick, setTick] = useState<number>(0);

  useEffect(() => {
    setMounted(true);
    const id = setInterval(() => setTick((t) => t + 1), 2600);
    return () => clearInterval(id);
  }, []);

  const activeMetal: string = METALS[tick % METALS.length];

  return (
    <section className="relative bg-[#0A0A0B]  flex flex-col overflow-hidden">
      {/* ── Subtle noise grain ─────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.1]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "160px",
        }}
      />

      {/* ── Ambient glow ───────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-[#B8973A]/[0.04] blur-[120px]"
      />

      {/* ── Hero body ──────────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center px-6 pt-24 pb-20 lg:pt-32 lg:pb-28">
        {/* Eyebrow tag */}
        <div
          className={`
            inline-flex items-center gap-2.5 mb-10 lg:mb-14
            px-4 py-1.5
            border border-white/[0.07] bg-white/[0.02]
            transition-all duration-700
            ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}
          `}
        >
          <span
            aria-hidden="true"
            className="w-1.5 h-1.5 rounded-full bg-[#B8973A] animate-pulse"
          />
          <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-neutral-500">
            B2B Precious Metals — Dubai
          </span>
        </div>

        {/* ── Main headline ────────────────────────────────────────── */}
        {/* h1 sits in a fixed-width centered box so the indented line 2 is visually balanced */}
        <div
          className={`w-full max-w-3xl transition-all duration-700 delay-150 mx-auto ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <h1
            className="text-center"
            style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
          >
            {/* Line 1 — longer anchor line, left edge */}
            <span className="block text-[clamp(38px,5.8vw,86px)] font-semibold leading-[1.06] tracking-[-0.03em] text-neutral-100">
              The global standard in
            </span>

            {/* Line 2 — indented so it starts roughly under "standard" */}
            <span className="block text-[clamp(38px,5.8vw,86px)] font-semibold leading-[1.06] tracking-[-0.03em] text-center">
              <span
                key={activeMetal}
                className="italic text-[#B8973A]"
                style={{ animation: "fadeUp 0.4s ease forwards" }}
              >
                {activeMetal}
              </span>
              <span className="text-neutral-100"> trading.</span>
            </span>
          </h1>
        </div>

        {/* Subtext */}
        <p
          className={`
            mt-8 max-w-xl
            text-[15px] lg:text-[17px] leading-[1.8]
            text-neutral-500 font-light
            transition-all duration-700 delay-300
            text-center
            ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
          `}
        >
          Bulk supply for refiners, manufacturers, and institutional buyers.
          Competitive wholesale pricing and secure global logistics.
        </p>

        {/* CTAs */}
        <div
          className={`
            mt-10 flex items-center justify-center gap-4 flex-wrap
            transition-all duration-700 delay-[450ms]
            ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
          `}
        >
          <Link
            href="/contact"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-[#B8973A] text-[#0A0A0B] text-[13px] font-bold tracking-[0.07em] uppercase hover:bg-[#CBA94A] transition-colors duration-200"
          >
            Request a Quote
            <ArrowRight size={14} strokeWidth={2.5} aria-hidden="true" />
          </Link>

          <Link
            href="/our-products"
            className="inline-flex items-center gap-2 px-8 py-3.5 border border-white/[0.1] text-[13px] font-medium text-neutral-400 tracking-wide hover:border-white/[0.2] hover:text-neutral-200 transition-all duration-200"
          >
            View Products
          </Link>
        </div>

        {/* Metals label strip */}
        <div
          className={`
            mt-12 flex items-center gap-3 flex-wrap justify-center
            transition-all duration-700 delay-[550ms]
            ${mounted ? "opacity-100" : "opacity-0"}
          `}
        >
          {METALS.map((metal, i) => (
            <span
              key={metal}
              className={`text-[11px] font-mono tracking-[0.16em] uppercase transition-colors duration-300 ${
                activeMetal === metal ? "text-[#B8973A]" : "text-neutral-700"
              }`}
            >
              {metal}
              {i < METALS.length - 1 && (
                <span className="ml-3 text-neutral-800" aria-hidden="true">
                  ·
                </span>
              )}
            </span>
          ))}
        </div>
      </div>

      {/* ── Divider ────────────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className={`relative z-10 h-px bg-white/[0.05] transition-all duration-700 delay-[650ms] ${mounted ? "opacity-100" : "opacity-0"}`}
      />

      {/* ── Stats strip ────────────────────────────────────────────── */}
      <div
        className={`
          relative z-10
          transition-all duration-700 delay-[700ms]
          ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}
        `}
      >
        <dl className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-white/[0.05]">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center py-8 px-6 gap-1.5"
            >
              <dt className="text-[11px] font-mono tracking-[0.16em] uppercase text-neutral-700 order-2">
                {stat.label}
              </dt>
              <dd
                className="font-semibold text-neutral-100 leading-none tracking-tight order-1"
                style={{
                  fontFamily: "'Instrument Serif', Georgia, serif",
                  fontSize: "clamp(24px, 2.5vw, 36px)",
                }}
              >
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* ── Keyframe ───────────────────────────────────────────────── */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};
