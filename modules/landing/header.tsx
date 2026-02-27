"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { companyDetails } from "@/utils/info/details";

export const Header = (): React.JSX.Element => {
  return (
    <div className="bg-[#0A0A0B] border-b border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-2.5 flex items-center justify-between">
        {/* Contact info */}
        <div className="flex items-center gap-5 flex-wrap">
          <Link
            href={`tel:${companyDetails.phoneNumber}`}
            className="flex items-center gap-2 text-[11px] font-mono tracking-widest text-neutral-600 hover:text-[#B8973A] transition-colors duration-200 uppercase"
          >
            <Phone size={10} strokeWidth={1.5} aria-hidden="true" />
            {companyDetails.phoneNumber}
          </Link>

          <span className="w-px h-3 bg-white/[0.05]" aria-hidden="true" />

          <Link
            href={`mailto:${companyDetails.email}`}
            className="hidden sm:flex items-center gap-2 text-[11px] font-mono tracking-widest text-neutral-600 hover:text-[#B8973A] transition-colors duration-200 uppercase"
          >
            <Mail size={10} strokeWidth={1.5} aria-hidden="true" />
            {companyDetails.email}
          </Link>

          <span
            className="hidden sm:block w-px h-3 bg-white/[0.05]"
            aria-hidden="true"
          />

          <span className="hidden md:flex items-center gap-2 text-[11px] font-mono tracking-widest text-neutral-700 uppercase">
            <MapPin size={10} strokeWidth={1.5} aria-hidden="true" />
            {companyDetails.shortAddress}
          </span>
        </div>

        {/* Right — established year */}
        <div className="hidden lg:flex items-center gap-2 text-[10px] font-mono tracking-[0.2em] uppercase text-neutral-700">
          <span
            className="w-1 h-1 rounded-full bg-[#B8973A]/50"
            aria-hidden="true"
          />
          Est. {companyDetails.companyEstablishmentDate}
        </div>
      </div>
    </div>
  );
};
