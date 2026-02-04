"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import gsap from "gsap";
// import { motion } from "framer-motion";
// import Image from "next/image";
import Loader from "../Loader";

type LoaderContextType = {
  hideLoader: () => void;
};

const LoaderContext = createContext<LoaderContextType | null>(null);

export const useLoader = () => {
  const ctx = useContext(LoaderContext);
  if (!ctx) {
    throw new Error("useLoader must be used inside LoaderProvider");
  }
  return ctx;
};

export function LoaderProvider({ children }: { children: ReactNode }) {
  const [visible, setVisible] = useState(true);

  const hideLoader = () => {
    const tl = gsap.timeline({
      onComplete: () => setVisible(false),
    });

    tl.to("#loader", {
      autoAlpha: 0,
      scale: 1.05,
      duration: 0.9,
      ease: "power3.inOut",
    });
  };

  // Auto-hide after mount (or replace with real asset loading)
  useEffect(() => {
    const timer = setTimeout(hideLoader, 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <LoaderContext.Provider value={{ hideLoader }}>
      {visible && <Loader />}
      {children}
    </LoaderContext.Provider>
  );
}
