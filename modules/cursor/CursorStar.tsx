"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

const CursorStar: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cursorRef.current) return;

    // Use quickTo for high-performance tracking
    const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.3, ease: "power3" });
    const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.3, ease: "power3" });

    const handleMouseMove = (e: MouseEvent) => {
      // OFFSET LOGIC:
      // Adding 15-20px moves the star away from the cursor tip 
      // so the actual mouse pointer doesn't hide it.
      xTo(e.clientX - 20);
      yTo(e.clientY - 20);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed left-0 top-0 z-[9999] will-change-transform"
      style={{ position: "fixed" }}
    >
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: [1, 0, 1], rotate: 360 }}
        transition={{
          rotate: { repeat: Infinity, duration: 3, ease: "linear" },
          opacity: { repeat: Infinity, duration: 0.8, ease: "easeInOut" },
          scale: { type: "spring", stiffness: 200, damping: 10 }
        }}
        className="text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.8)]"
      >
        <StarIcon size={20} />
      </motion.div>
    </div>
  );
};

const StarIcon = ({ size }: { size: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
  </svg>
);

export default CursorStar;