"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Loader() {
  return (
    <div
      id="loader"
      className="
        fixed inset-0 z-[9999]
        flex items-center justify-center
        overflow-hidden
        bg-linear-to-br
        from-[#050b1e]
        via-[#0a1a3a]
        to-[#020617]
      "
    >
      {/* === FAR AMBIENT BLUE GLOW === */}
      <div className="absolute w-[650px] h-[650px] rounded-full bg-blue-600/10 blur-[200px]" />

      {/* === HALO RING === */}
      <motion.div
        className="absolute w-[260px] h-[260px] rounded-full border border-blue-400/20"
        animate={{
          scale: [1, 1.04, 1],
          opacity: [0.35, 0.6, 0.35],
        }}
        transition={{
          duration: 3.6,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />

      {/* === INNER SOFT GLOW === */}
      <motion.div
        className="absolute w-[200px] h-[200px] rounded-full bg-blue-500/10 blur-[50px]"
        animate={{ scale: [1, 1.08, 1] }}
        transition={{
          duration: 3,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />

      {/* === CENTER LOGO WITH SINE FLOAT === */}
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{
          opacity: 1,
          y: [0, -14, 0, 14, 0], // 👈 sine-like motion
          rotate: [0, 1.2, 0, -1.2, 0],
        }}
        transition={{
          duration: 5.5,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      >
        <Image
          src="/logo.png" // your logo
          alt="Loading"
          width={120}
          height={120}
          priority
          className="select-none drop-shadow-[0_0_20px_rgba(59,130,246,0.35)]"
        />
      </motion.div>
    </div>
  );
}
