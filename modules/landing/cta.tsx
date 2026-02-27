"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { instrumentSerif } from "@/utils/font";

const useInView = (threshold = 0.1) => {
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

const TRUST = [
  "LBMA Aligned",
  "Certified Authenticity",
  "38+ Years Trusted",
  "Insured Logistics",
  "Global Delivery",
];

export const CTASection = (): React.JSX.Element => {
  const { ref, inView } = useInView();

  return (
    <section className="bg-[#0A0A0B] border-t border-white/[0.04]">
      <div
        ref={ref}
        className={`max-w-7xl mx-auto px-6 lg:px-10 py-24 lg:py-32 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      >
        {/* Eyebrow */}
        <div className="flex items-center gap-4 mb-12">
          <span className="block h-px w-8 bg-[#B8973A]/40" aria-hidden="true" />
          <span className="text-[11px] font-mono tracking-[0.22em] uppercase text-neutral-600">
            Get Started
          </span>
        </div>

        {/* Headline + CTAs side by side */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-12">
          <h2
            className={`${instrumentSerif.className} text-[clamp(40px,6vw,88px)] font-semibold leading-[1] tracking-[-0.03em] text-neutral-100`}
          >
            Ready to trade
            <br />
            <span className="italic text-[#B8973A]">at scale?</span>
          </h2>

          <div className="flex flex-col gap-4 lg:items-end">
            <div className="flex items-center gap-4 flex-wrap">
              <Link
                href="/our-products"
                className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-[#B8973A] text-[#0A0A0B] text-[12px] font-bold tracking-[0.08em] uppercase hover:bg-[#CBA94A] transition-colors duration-200"
              >
                Browse Products
                <ArrowRight size={13} strokeWidth={2.5} aria-hidden="true" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 px-8 py-3.5 border border-white/[0.1] text-[12px] font-medium tracking-[0.06em] uppercase text-neutral-500 hover:border-white/[0.2] hover:text-neutral-200 transition-all duration-200"
              >
                <Phone size={13} strokeWidth={1.5} aria-hidden="true" />
                Schedule a Call
              </Link>
            </div>
            <p className="text-[12px] text-neutral-700 lg:text-right">
              Verified B2B buyers only. Minimum order quantities apply.
            </p>
          </div>
        </div>

        {/* Trust strip */}
        <div className="mt-16 pt-10 border-t border-white/[0.05] flex flex-wrap items-center gap-x-8 gap-y-3">
          {TRUST.map((item, i) => (
            <div key={item} className="flex items-center gap-3">
              <span className="text-[11px] font-mono tracking-[0.14em] uppercase text-neutral-700">
                {item}
              </span>
              {i < TRUST.length - 1 && (
                <span className="w-px h-3 bg-white/[0.06]" aria-hidden="true" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
