"use client";

import { useState, useRef, useEffect } from "react";
import { MapPin } from "lucide-react";
import { instrumentSerif } from "@/utils/font";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  location: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Mitchell",
    role: "Portfolio Manager",
    company: "Apex Capital",
    content:
      "SR Jewellers' authenticity standards are unmatched. Their expertise helped us build a diversified metals position that has consistently outperformed benchmarks.",
    location: "New York, USA",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Private Collector",
    company: "Independent",
    content:
      "Fifteen years of collecting and this is the most reliable operation I've worked with. Every item ships with detailed provenance and arrives exactly as described.",
    location: "Singapore",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Wealth Advisor",
    company: "Meridian Advisory",
    content:
      "Transparent pricing, deep market knowledge, and flawless logistics. I refer all my institutional clients here without hesitation.",
    location: "London, UK",
  },
  {
    id: 4,
    name: "David Kumar",
    role: "Investment Consultant",
    company: "Gulf Ventures",
    content:
      "From first call to final delivery — the professionalism is consistent throughout. This is what a proper B2B operation looks like.",
    location: "Dubai, UAE",
  },
  {
    id: 5,
    name: "Lisa Anderson",
    role: "Family Office Manager",
    company: "Anderson & Partners",
    content:
      "Their market insights and allocation support have been invaluable. We've made SR Jewellers our primary precious metals counterparty.",
    location: "Zurich, Switzerland",
  },
  {
    id: 6,
    name: "James Park",
    role: "Procurement Director",
    company: "Hanwha Materials",
    content:
      "The security, authentication process, and documentation give us complete confidence at every transaction size.",
    location: "Seoul, South Korea",
  },
];

// ─── Card ─────────────────────────────────────────────────────────────────────

const TestimonialCard = ({ t }: { t: Testimonial }): React.JSX.Element => (
  <div className="shrink-0 w-[320px] mx-3 bg-[#0D0D0F] border border-white/[0.06] p-6 flex flex-col gap-4 hover:border-white/[0.12] transition-colors duration-300">
    {/* Quote mark */}
    <span className="text-[#B8973A]/40 font-serif text-4xl leading-none select-none">
      &ldquo;
    </span>

    {/* Content */}
    <p className="text-[13px] text-neutral-500 leading-[1.75] flex-1">
      {t.content}
    </p>

    {/* Divider */}
    <div className="h-px bg-white/[0.05]" />

    {/* Author */}
    <div className="flex items-start justify-between gap-3">
      <div>
        <p className="text-[13px] font-semibold text-neutral-200">{t.name}</p>
        <p className="text-[11px] text-neutral-600 mt-0.5">
          {t.role}, {t.company}
        </p>
      </div>
      <div className="flex items-center gap-1 shrink-0 mt-0.5">
        <MapPin
          size={10}
          strokeWidth={1.5}
          className="text-neutral-700"
          aria-hidden="true"
        />
        <span className="text-[10px] font-mono tracking-wide text-neutral-700">
          {t.location}
        </span>
      </div>
    </div>
  </div>
);

// ─── Marquee row ──────────────────────────────────────────────────────────────

const MarqueeRow = ({
  items,
  direction,
  paused,
}: {
  items: Testimonial[];
  direction: "left" | "right";
  paused: boolean;
}): React.JSX.Element => {
  const tripled = [...items, ...items, ...items];
  return (
    <div className="flex overflow-hidden">
      <div
        className="flex"
        style={{
          animation: `${direction === "left" ? "scrollLeft" : "scrollRight"} 60s linear infinite`,
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        {tripled.map((t, i) => (
          <TestimonialCard key={`${t.id}-${i}`} t={t} />
        ))}
      </div>
    </div>
  );
};

// ─── Component ────────────────────────────────────────────────────────────────

export const Testimonials = (): React.JSX.Element => {
  const [paused, setPaused] = useState<boolean>(false);
  const [inView, setInView] = useState<boolean>(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="bg-[#0A0A0B] border-t border-white/[0.04] overflow-hidden"
      ref={sectionRef}
    >
      {/* ── Header ─────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-24 pb-16 lg:pt-32 lg:pb-20">
        <div
          className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <div className="flex items-center gap-4 mb-8">
            <span
              className="block h-px w-8 bg-[#B8973A]/40"
              aria-hidden="true"
            />
            <span className="text-[11px] font-mono tracking-[0.22em] uppercase text-neutral-600">
              Client Stories
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2
              className={`${instrumentSerif.className} text-[clamp(36px,5vw,64px)] font-semibold leading-[1.05] tracking-[-0.02em] text-neutral-100`}
            >
              Trusted by the
              <br />
              <span className="italic text-[#B8973A]">
                world&rsquo;s best buyers.
              </span>
            </h2>
            <p className="max-w-xs text-[14px] leading-relaxed text-neutral-500 lg:text-right">
              500+ verified business partners across 40 countries.
            </p>
          </div>
        </div>
      </div>

      {/* ── Marquee ─────────────────────────────────────────────── */}
      <div
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        className={`flex flex-col gap-4 transition-opacity duration-700 ${inView ? "opacity-100" : "opacity-0"}`}
      >
        <MarqueeRow items={TESTIMONIALS} direction="left" paused={paused} />
        <MarqueeRow
          items={[...TESTIMONIALS].reverse()}
          direction="right"
          paused={paused}
        />
      </div>

      {/* Bottom padding */}
      <div className="h-20 lg:h-28" />

      <style>{`
        @keyframes scrollLeft {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }
        @keyframes scrollRight {
          from { transform: translateX(-33.333%); }
          to   { transform: translateX(0); }
        }
      `}</style>
    </section>
  );
};
