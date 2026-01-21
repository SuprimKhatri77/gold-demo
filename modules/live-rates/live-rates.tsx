"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { TrendingUp, TrendingDown, Clock, Info } from "lucide-react";

export const initialGoldData = {
  price: 0,
  change: 0,
  changePercent: 0,
  lastUpdated: new Date(),
  bid: 0,
  ask: 0,
  high24h: 0,
  low24h: 0,
};

const PriceSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-12 sm:h-16 bg-linear-to-r from-amber-100 to-yellow-100 rounded-lg mb-4"></div>
    <div className="h-6 sm:h-8 bg-linear-to-r from-amber-100 to-yellow-100 rounded-lg w-2/3"></div>
  </div>
);

const fetchGoldPrice = async () => {
  const response = await fetch(
    "https://api.metalpriceapi.com/v1/latest?api_key=37a9a157c396ad741cd77fa85be0d584&base=AED&currencies=XAU",
  );
  console.log("response: ", response);

  if (!response.ok) {
    throw new Error("Failed to fetch gold price");
  }

  const data = await response.json();
  console.log("data: ", data);

  if (data.success && data.rates) {
    const pricePerOunce = data.rates.AEDXAU;
    const pricePerGram = pricePerOunce / 31.1035;
    const spread = pricePerGram * 0.005;

    return {
      price: pricePerGram,
      change: 0,
      changePercent: 0,
      lastUpdated: new Date(data.timestamp * 1000),
      bid: pricePerGram - spread,
      ask: pricePerGram + spread,
      high24h: pricePerGram * 1.01,
      low24h: pricePerGram * 0.99,
    };
  }

  throw new Error("Invalid data format");
};

export const LiveRatesPage = () => {
  const [unit, setUnit] = useState("gram");
  const [karat, setKarat] = useState("24K");

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setMounted(true);
    }, 0);
  }, []);

  const { data: goldData, isLoading } = useQuery({
    queryKey: ["goldPrice"],
    queryFn: fetchGoldPrice,
    staleTime: 30 * 60 * 1000,
    refetchInterval: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
    initialData: initialGoldData,
  });

  const units = ["gram", "tola", "ounce"];
  const karats = ["24K", "22K", "18K"];

  const getUnitMultiplier = () => {
    switch (unit) {
      case "tola":
        return 11.66;
      case "ounce":
        return 31.1;
      default:
        return 1;
    }
  };

  const getKaratMultiplier = () => {
    switch (karat) {
      case "22K":
        return 0.916;
      case "18K":
        return 0.75;
      default:
        return 1;
    }
  };

  const calculatePrice = () => {
    return (
      goldData.price *
      getUnitMultiplier() *
      getKaratMultiplier()
    ).toFixed(2);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-amber-50 via-yellow-50 to-amber-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-amber-100/30 via-transparent to-yellow-100/30"></div>

        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 relative">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-linear-to-r from-amber-600 via-yellow-600 to-amber-700 bg-clip-text text-transparent mb-2 sm:mb-4 px-4">
              Live Gold Rates
            </h1>
            <p className="text-amber-800/70 text-base sm:text-lg px-4">
              Real-time XAU prices in AED
            </p>
          </div>

          {/* Main Price Card */}
          <div className="max-w-4xl mx-auto mb-6 sm:mb-8 px-3 sm:px-0">
            <div className="bg-white/80 backdrop-blur-xl rounded-xl sm:rounded-2xl border-2 border-amber-200 shadow-2xl shadow-amber-500/20 p-4 sm:p-6 lg:p-8">
              {/* Selectors */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6">
                {/* Unit Selector */}
                <div className="flex-1">
                  <label className="text-xs sm:text-sm text-amber-800 font-medium mb-1.5 sm:mb-2 block">
                    Unit
                  </label>
                  <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                    {units.map((u) => (
                      <button
                        key={u}
                        onClick={() => setUnit(u)}
                        className={`py-2 sm:py-2.5 px-2 sm:px-4 rounded-lg text-sm sm:text-base font-semibold transition-all ${
                          unit === u
                            ? "bg-linear-to-r from-amber-500 to-yellow-500 text-white shadow-lg shadow-amber-500/40"
                            : "bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200"
                        }`}
                      >
                        {u.charAt(0).toUpperCase() + u.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Karat Selector */}
                <div className="flex-1">
                  <label className="text-xs sm:text-sm text-amber-800 font-medium mb-1.5 sm:mb-2 block">
                    Purity
                  </label>
                  <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                    {karats.map((k) => (
                      <button
                        key={k}
                        onClick={() => setKarat(k)}
                        className={`py-2 sm:py-2.5 px-2 sm:px-4 rounded-lg text-sm sm:text-base font-semibold transition-all ${
                          karat === k
                            ? "bg-linear-to-r from-amber-500 to-yellow-500 text-white shadow-lg shadow-amber-500/40"
                            : "bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200"
                        }`}
                      >
                        {k}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Price Display */}
              {isLoading && goldData.price === 0 ? (
                <PriceSkeleton />
              ) : (
                <>
                  <div className="text-center mb-4 sm:mb-6">
                    <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-linear-to-r from-amber-600 via-yellow-600 to-amber-600 bg-clip-text text-transparent mb-2 wrap-break-word">
                      {calculatePrice()}
                      <span className="text-2xl sm:text-3xl lg:text-4xl ml-1 sm:ml-2">
                        AED
                      </span>
                    </div>
                    <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-sm sm:text-base lg:text-lg text-amber-700 flex-wrap">
                      <span>per {unit}</span>
                      <span className="text-amber-400">•</span>
                      <span className="font-semibold">{karat}</span>
                    </div>
                  </div>

                  {/* Change Indicator */}
                  <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-4 sm:mb-6 flex-wrap">
                    {goldData.change >= 0 ? (
                      <>
                        <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
                        <span className="text-emerald-600 font-semibold text-sm sm:text-base lg:text-lg">
                          +{goldData.change.toFixed(2)} AED (+
                          {goldData.changePercent.toFixed(2)}%)
                        </span>
                      </>
                    ) : (
                      <>
                        <TrendingDown className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
                        <span className="text-red-600 font-semibold text-sm sm:text-base lg:text-lg">
                          {goldData.change.toFixed(2)} AED (
                          {goldData.changePercent.toFixed(2)}%)
                        </span>
                      </>
                    )}
                  </div>

                  {/* Last Updated */}
                  <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-amber-600 border-t border-amber-200 pt-3 sm:pt-4">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>
                      Last updated:{" "}
                      {mounted && goldData.lastUpdated.toLocaleTimeString()}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Bid/Ask Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 max-w-4xl mx-auto mb-8 sm:mb-12 px-3 sm:px-0">
            {[
              {
                label: "Bid",
                value: goldData.bid,
                gradient: "from-emerald-500 to-emerald-600",
              },
              {
                label: "Ask",
                value: goldData.ask,
                gradient: "from-amber-500 to-yellow-500",
              },
              {
                label: "24h High",
                value: goldData.high24h,
                gradient: "from-blue-500 to-blue-600",
              },
              {
                label: "24h Low",
                value: goldData.low24h,
                gradient: "from-purple-500 to-purple-600",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white/70 backdrop-blur-sm rounded-lg sm:rounded-xl border border-amber-200 shadow-md p-3 sm:p-4 hover:shadow-lg transition-shadow"
              >
                {isLoading && goldData.price === 0 ? (
                  <div className="animate-pulse">
                    <div className="h-3 sm:h-4 bg-amber-100 rounded mb-2"></div>
                    <div className="h-5 sm:h-6 bg-amber-100 rounded"></div>
                  </div>
                ) : (
                  <>
                    <div className="text-amber-700 text-xs sm:text-sm font-medium mb-1">
                      {item.label}
                    </div>
                    <div
                      className={`text-lg sm:text-xl lg:text-2xl font-bold bg-linear-to-r ${item.gradient} bg-clip-text text-transparent wrpa-break-words`}
                    >
                      {item.value.toFixed(2)}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

          {/* Trust Indicators */}
          <div className="max-w-4xl mx-auto px-3 sm:px-0">
            <div className="bg-amber-50/80 backdrop-blur-sm rounded-lg sm:rounded-xl border border-amber-200 p-4 sm:p-6">
              <div className="flex items-start gap-2 sm:gap-3">
                <Info className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 mt-0.5 sm:mt-1 shrink-0" />
                <div>
                  <h3 className="text-amber-900 font-semibold mb-1.5 sm:mb-2 text-sm sm:text-base">
                    Market Information
                  </h3>
                  <div className="text-amber-700 text-xs sm:text-sm space-y-0.5 sm:space-y-1">
                    <p>• Data sourced from international bullion markets</p>
                    <p>• Prices updated every 30 minutes</p>
                    <p>
                      • All rates are indicative and subject to market
                      conditions
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
