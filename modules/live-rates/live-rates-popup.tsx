"use client";

import {
  Clock,
  ExternalLink,
  Maximize2,
  TrendingDown,
  TrendingUp,
  X,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { initialGoldData } from "./live-rates";
import { usePathname } from "next/navigation";

interface GoldData {
  price: number;
  change: number;
  changePercent: number;
  lastUpdated: Date;
  bid: number;
  ask: number;
  high24h: number;
  low24h: number;
}

const fetchGoldPrice = async (previousPrice: number): Promise<GoldData> => {
  const response = await fetch(
    "https://api.metalpriceapi.com/v1/latest?api_key=37a9a157c396ad741cd77fa85be0d584&base=AED&currencies=XAU",
  );

  if (!response.ok) {
    throw new Error("Failed to fetch gold price");
  }

  const data = await response.json();

  if (data.success && data.rates) {
    const pricePerOunce = data.rates.AEDXAU;
    const pricePerGram = pricePerOunce / 31.1035;

    const change = previousPrice > 0 ? pricePerGram - previousPrice : 0;
    const changePercent =
      previousPrice > 0 ? (change / previousPrice) * 100 : 0;
    const spread = pricePerGram * 0.005;

    return {
      price: pricePerGram,
      change: change,
      changePercent: changePercent,
      lastUpdated: new Date(data.timestamp * 1000),
      bid: pricePerGram - spread,
      ask: pricePerGram + spread,
      high24h: pricePerGram * 1.01,
      low24h: pricePerGram * 0.99,
    };
  }

  throw new Error("Invalid data structure");
};

export const LiveRatePopup = () => {
  const [isOpen, setIsOpen] = useState(() => {
    if (typeof window === "undefined") return false;
    const hasSeenPopup = sessionStorage.getItem("hasSeenGoldPopup");
    if (!hasSeenPopup) {
      sessionStorage.setItem("hasSeenGoldPopup", "true");
    }
    return !hasSeenPopup;
  });

  const pathname = usePathname();

  const [isMinimized, setIsMinimized] = useState(false);
  const previousPriceRef = useRef(0);

  const { data, isLoading } = useQuery<GoldData>({
    queryKey: ["goldPrice"],
    queryFn: () => fetchGoldPrice(previousPriceRef.current),
    refetchInterval: 30 * 60 * 1000,
    staleTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const goldData = data || initialGoldData;

  useEffect(() => {
    if (data && previousPriceRef.current !== data.price) {
      previousPriceRef.current = data.price;
    }
  }, [data?.price, data]);

  if (isMinimized) {
    return (
      <button
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 bg-linear-to-r from-amber-500 to-yellow-500 text-white p-3 sm:p-4 rounded-full shadow-2xl shadow-amber-500/40 hover:shadow-amber-500/60 transition-all z-50 group"
        aria-label="Expand live rates"
      >
        <Maximize2 className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" />
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
      </button>
    );
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 bg-linear-to-r from-amber-500 to-yellow-500 text-white px-3 py-2 sm:px-4 sm:py-2.5 rounded-full shadow-2xl shadow-amber-500/40 hover:shadow-amber-500/60 transition-all z-50 flex items-center gap-2 group"
        aria-label="Show live rates"
      >
        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
        <span className="font-semibold text-sm sm:text-base">Live Rates</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-full max-w-sm">
      <div className="bg-white rounded-2xl border-2 border-amber-300 shadow-2xl shadow-amber-500/30 overflow-hidden">
        {/* Header */}
        <div className="bg-linear-to-r from-amber-500 to-yellow-500 px-3 py-2.5 sm:px-4 sm:py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <h3 className="text-white font-bold text-sm sm:text-base">
              Live Gold Rate
            </h3>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setIsMinimized(true)}
              className="text-white/90 hover:text-white transition-colors p-1"
              aria-label="Minimize"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/90 hover:text-white transition-colors p-1"
              aria-label="Close"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-3 sm:p-4">
          {isLoading ? (
            <div className="animate-pulse space-y-3">
              <div className="h-12 bg-amber-100 rounded-lg"></div>
              <div className="h-8 bg-amber-100 rounded-lg w-2/3"></div>
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                <div className="h-16 bg-amber-100 rounded-lg"></div>
                <div className="h-16 bg-amber-100 rounded-lg"></div>
              </div>
            </div>
          ) : (
            <>
              {/* Main Price */}
              <div className="text-center mb-3 sm:mb-4">
                <div className="text-3xl sm:text-4xl font-bold bg-linear-to-r from-amber-600 via-yellow-600 to-amber-600 bg-clip-text text-transparent">
                  {goldData.price.toFixed(2)}
                  <span className="text-lg sm:text-xl ml-1">AED</span>
                </div>
                <div className="text-amber-700 text-xs sm:text-sm">
                  per gram • 24K
                </div>
              </div>

              {/* Change */}
              <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4 pb-3 sm:pb-4 border-b border-amber-200">
                {goldData.change >= 0 ? (
                  <>
                    <TrendingUp className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-600 font-semibold text-sm sm:text-base">
                      +{goldData.change.toFixed(2)} (+
                      {goldData.changePercent.toFixed(2)}%)
                    </span>
                  </>
                ) : (
                  <>
                    <TrendingDown className="w-4 h-4 text-red-600" />
                    <span className="text-red-600 font-semibold text-sm sm:text-base">
                      {goldData.change.toFixed(2)} (
                      {goldData.changePercent.toFixed(2)}%)
                    </span>
                  </>
                )}
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-4">
                <div className="bg-linear-to-br from-amber-50 to-yellow-50 rounded-lg p-2 sm:p-3 border border-amber-200">
                  <div className="text-amber-700 text-xs mb-1 font-medium">
                    Bid
                  </div>
                  <div className="text-emerald-600 font-bold text-base sm:text-lg">
                    {goldData.bid.toFixed(2)}
                  </div>
                </div>
                <div className="bg-linear-to-br from-amber-50 to-yellow-50 rounded-lg p-2 sm:p-3 border border-amber-200">
                  <div className="text-amber-700 text-xs mb-1 font-medium">
                    Ask
                  </div>
                  <div className="text-amber-600 font-bold text-base sm:text-lg">
                    {goldData.ask.toFixed(2)}
                  </div>
                </div>
              </div>

              {/* View Full Rates Link */}
              {!pathname.startsWith("/live-rates") && (
                <Link
                  href="/live-rates"
                  className="w-full bg-linear-to-r from-amber-500 to-yellow-500 text-white py-2 sm:py-2.5 rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all mb-2 sm:mb-3 text-sm sm:text-base"
                >
                  View Full Rates
                  <ExternalLink className="w-4 h-4" />
                </Link>
              )}

              {/* Last Updated */}
              <div className="flex items-center justify-center gap-2 text-xs text-amber-600">
                <Clock className="w-3 h-3" />
                <span>Updated {goldData.lastUpdated.toLocaleTimeString()}</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
