"use client";

import {
  Clock,
  ExternalLink,
  Maximize2,
  TrendingDown,
  TrendingUp,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { initialGoldData } from "./live-rates";

export const LiveRatePopup = () => {
  const [isOpen, setIsOpen] = useState(() => {
    if (typeof window === "undefined") return false;

    const hasSeenPopup = sessionStorage.getItem("hasSeenGoldPopup");
    return !hasSeenPopup;
  });
  const [isMinimized, setIsMinimized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [goldData, setGoldData] = useState(initialGoldData);
  const [previousPrice, setPreviousPrice] = useState(0);

  const fetchGoldPrice = async () => {
    try {
      const response = await fetch(
        "https://api.metalpriceapi.com/v1/latest?api_key=37a9a157c396ad741cd77fa85be0d584&base=AED&currencies=XAU",
      );
      const data = await response.json();

      if (data.success && data.rates) {
        const pricePerOunce = data.rates.AEDXAU;
        const pricePerGram = pricePerOunce / 31.1035;

        const change = previousPrice > 0 ? pricePerGram - previousPrice : 0;
        const changePercent =
          previousPrice > 0 ? (change / previousPrice) * 100 : 0;

        const spread = pricePerGram * 0.005;

        const newGoldData = {
          price: pricePerGram,
          change: change,
          changePercent: changePercent,
          lastUpdated: new Date(data.timestamp * 1000),
          bid: pricePerGram - spread,
          ask: pricePerGram + spread,
          high24h: pricePerGram * 1.01,
          low24h: pricePerGram * 0.99,
        };

        setGoldData(newGoldData);
        setPreviousPrice(pricePerGram);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching gold price:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      sessionStorage.setItem("hasSeenGoldPopup", "true");
    }

    // Initial fetch
    fetchGoldPrice();

    // Poll for updates every 60 seconds
    const interval = setInterval(fetchGoldPrice, 1800000);

    return () => clearInterval(interval);
  }, []);

  if (isMinimized) {
    return (
      <button
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-6 right-6 bg-linear-to-r from-amber-500 to-yellow-500 text-white p-4 rounded-full shadow-2xl shadow-amber-500/40 hover:shadow-amber-500/60 transition-all z-50 group"
      >
        <Maximize2 className="w-6 h-6 group-hover:scale-110 transition-transform" />
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
      </button>
    );
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-linear-to-r from-amber-500 to-yellow-500 text-white px-4 py-2.5 rounded-full shadow-2xl shadow-amber-500/40 hover:shadow-amber-500/60 transition-all z-50 flex items-center gap-2 group"
      >
        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
        <span className="font-semibold">Live Rates</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-full max-w-sm">
      <div className="bg-white rounded-2xl border-2 border-amber-300 shadow-2xl shadow-amber-500/30 overflow-hidden">
        {/* Header */}
        <div className="bg-linear-to-r from-amber-500 to-yellow-500 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <h3 className="text-white font-bold">Live Gold Rate</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMinimized(true)}
              className="text-white/90 hover:text-white transition-colors p-1"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/90 hover:text-white transition-colors p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {loading ? (
            <div className="animate-pulse space-y-3">
              <div className="h-12 bg-amber-100 rounded-lg"></div>
              <div className="h-8 bg-amber-100 rounded-lg w-2/3"></div>
              <div className="grid grid-cols-2 gap-3">
                <div className="h-16 bg-amber-100 rounded-lg"></div>
                <div className="h-16 bg-amber-100 rounded-lg"></div>
              </div>
            </div>
          ) : (
            <>
              {/* Main Price */}
              <div className="text-center mb-4">
                <div className="text-4xl font-bold bg-linear-to-r from-amber-600 via-yellow-600 to-amber-600 bg-clip-text text-transparent">
                  {goldData.price.toFixed(2)}
                  <span className="text-xl ml-1">AED</span>
                </div>
                <div className="text-amber-700 text-sm">per gram • 24K</div>
              </div>

              {/* Change */}
              <div className="flex items-center justify-center gap-2 mb-4 pb-4 border-b border-amber-200">
                {goldData.change >= 0 ? (
                  <>
                    <TrendingUp className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-600 font-semibold">
                      +{goldData.change.toFixed(2)} (+
                      {goldData.changePercent.toFixed(2)}%)
                    </span>
                  </>
                ) : (
                  <>
                    <TrendingDown className="w-4 h-4 text-red-600" />
                    <span className="text-red-600 font-semibold">
                      {goldData.change.toFixed(2)} (
                      {goldData.changePercent.toFixed(2)}%)
                    </span>
                  </>
                )}
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-linear-to-br from-amber-50 to-yellow-50 rounded-lg p-3 border border-amber-200">
                  <div className="text-amber-700 text-xs mb-1 font-medium">
                    Bid
                  </div>
                  <div className="text-emerald-600 font-bold text-lg">
                    {goldData.bid.toFixed(2)}
                  </div>
                </div>
                <div className="bg-linear-to-br from-amber-50 to-yellow-50 rounded-lg p-3 border border-amber-200">
                  <div className="text-amber-700 text-xs mb-1 font-medium">
                    Ask
                  </div>
                  <div className="text-amber-600 font-bold text-lg">
                    {goldData.ask.toFixed(2)}
                  </div>
                </div>
              </div>

              {/* View Full Rates Link */}
              <Link
                href="/live-rates"
                className="w-full bg-linear-to-r from-amber-500 to-yellow-500 text-white py-2.5 rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all mb-3"
              >
                View Full Rates
                <ExternalLink className="w-4 h-4" />
              </Link>

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
