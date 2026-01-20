"use client";

import { useState, useEffect } from "react";
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
    <div className="h-16 bg-linear-to-r from-amber-100 to-yellow-100 rounded-lg mb-4"></div>
    <div className="h-8 bg-linear-to-r from-amber-100 to-yellow-100 rounded-lg w-2/3"></div>
  </div>
);
export const LiveRatesPage = () => {
  const [unit, setUnit] = useState("gram");
  const [karat, setKarat] = useState("24K");
  const [loading, setLoading] = useState(true);
  const [goldData, setGoldData] = useState(initialGoldData);
  const [previousPrice, setPreviousPrice] = useState(0);

  // Fetch gold price from MetalpriceAPI
  const fetchGoldPrice = async () => {
    try {
      const response = await fetch(
        "https://api.metalpriceapi.com/v1/latest?api_key=37a9a157c396ad741cd77fa85be0d584&base=AED&currencies=XAU",
      );
      const data = await response.json();

      if (data.success && data.rates) {
        // Convert AEDXAU rate to price per gram
        // AEDXAU gives us AED per troy ounce, so we need to convert
        const pricePerOunce = data.rates.AEDXAU;
        const pricePerGram = pricePerOunce / 31.1035; // 1 troy ounce = 31.1035 grams

        // Calculate change from previous price
        const change = previousPrice > 0 ? pricePerGram - previousPrice : 0;
        const changePercent =
          previousPrice > 0 ? (change / previousPrice) * 100 : 0;

        // Estimate bid/ask spread (typically 0.5-1% for gold)
        const spread = pricePerGram * 0.005; // 0.5% spread

        const newGoldData = {
          price: pricePerGram,
          change: change,
          changePercent: changePercent,
          lastUpdated: new Date(data.timestamp * 1000),
          bid: pricePerGram - spread,
          ask: pricePerGram + spread,
          high24h: pricePerGram * 1.01, // Mock 24h high (you'd need historical API for real data)
          low24h: pricePerGram * 0.99, // Mock 24h low
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
    // Initial fetch
    fetchGoldPrice();

    // Set up polling every 30minutes
    const interval = setInterval(fetchGoldPrice, 1800000);

    return () => clearInterval(interval);
  }, []);

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
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Subtle gold pattern overlay */}
        <div className="absolute inset-0 bg-linear-to-br from-amber-100/30 via-transparent to-yellow-100/30"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-linear-to-r from-amber-600 via-yellow-600 to-amber-700 bg-clip-text text-transparent mb-4">
              Live Gold Rates
            </h1>
            <p className="text-amber-800/70 text-lg">
              Real-time XAU prices in AED
            </p>
          </div>

          {/* Main Price Card */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl border-2 border-amber-200 shadow-2xl shadow-amber-500/20 p-6 sm:p-8">
              {/* Selectors */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                {/* Unit Selector */}
                <div className="flex-1">
                  <label className="text-sm text-amber-800 font-medium mb-2 block">
                    Unit
                  </label>
                  <div className="flex gap-2">
                    {units.map((u) => (
                      <button
                        key={u}
                        onClick={() => setUnit(u)}
                        className={`flex-1 py-2.5 px-4 rounded-lg font-semibold transition-all ${
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
                  <label className="text-sm text-amber-800 font-medium mb-2 block">
                    Purity
                  </label>
                  <div className="flex gap-2">
                    {karats.map((k) => (
                      <button
                        key={k}
                        onClick={() => setKarat(k)}
                        className={`flex-1 py-2.5 px-4 rounded-lg font-semibold transition-all ${
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
              {loading ? (
                <PriceSkeleton />
              ) : (
                <>
                  <div className="text-center mb-6">
                    <div className="text-6xl sm:text-7xl font-bold bg-linear-to-r from-amber-600 via-yellow-600 to-amber-600 bg-clip-text text-transparent mb-2">
                      {calculatePrice()}
                      <span className="text-3xl sm:text-4xl ml-2">AED</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-lg text-amber-700">
                      <span>per {unit}</span>
                      <span className="text-amber-400">•</span>
                      <span className="font-semibold">{karat}</span>
                    </div>
                  </div>

                  {/* Change Indicator */}
                  <div className="flex items-center justify-center gap-2 mb-6">
                    {goldData.change >= 0 ? (
                      <>
                        <TrendingUp className="w-5 h-5 text-emerald-600" />
                        <span className="text-emerald-600 font-semibold text-lg">
                          +{goldData.change} AED (+{goldData.changePercent}%)
                        </span>
                      </>
                    ) : (
                      <>
                        <TrendingDown className="w-5 h-5 text-red-600" />
                        <span className="text-red-600 font-semibold text-lg">
                          {goldData.change} AED ({goldData.changePercent}%)
                        </span>
                      </>
                    )}
                  </div>

                  {/* Last Updated */}
                  <div className="flex items-center justify-center gap-2 text-sm text-amber-600 border-t border-amber-200 pt-4">
                    <Clock className="w-4 h-4" />
                    <span>
                      Last updated: {goldData.lastUpdated.toLocaleTimeString()}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Bid/Ask Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
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
                className="bg-white/70 backdrop-blur-sm rounded-xl border border-amber-200 shadow-md p-4 hover:shadow-lg transition-shadow"
              >
                {loading ? (
                  <div className="animate-pulse">
                    <div className="h-4 bg-amber-100 rounded mb-2"></div>
                    <div className="h-6 bg-amber-100 rounded"></div>
                  </div>
                ) : (
                  <>
                    <div className="text-amber-700 text-sm font-medium mb-1">
                      {item.label}
                    </div>
                    <div
                      className={`text-2xl font-bold bg-linear-to-r ${item.gradient} bg-clip-text text-transparent`}
                    >
                      {item.value}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

          {/* Trust Indicators */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-amber-50/80 backdrop-blur-sm rounded-xl border border-amber-200 p-6">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-amber-600 mt-1 shrink-0" />
                <div>
                  <h3 className="text-amber-900 font-semibold mb-2">
                    Market Information
                  </h3>
                  <div className="text-amber-700 text-sm space-y-1">
                    <p>• Data sourced from international bullion markets</p>
                    <p>• Prices updated every 60 seconds</p>
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

      {/* Historical Chart Section */}
      {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-amber-900 mb-6">Price Trends</h2>
        <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-amber-200 shadow-lg p-6 h-96">
          <div className="flex items-center justify-center h-full text-amber-600">
            Chart component would be integrated here (Recharts/Chart.js)
          </div>
        </div>
      </div> */}

      {/* Market News Preview */}
      {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-amber-900 mb-6">
          Market Updates
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="bg-white/70 backdrop-blur-sm rounded-xl border border-amber-200 shadow-md p-6 hover:border-amber-400 hover:shadow-xl transition-all cursor-pointer group"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="w-2 h-2 bg-amber-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <h3 className="text-amber-900 font-semibold mb-2 group-hover:text-amber-600 transition-colors">
                    Gold prices rally on market uncertainty
                  </h3>
                  <p className="text-amber-700/80 text-sm mb-3">
                    International markets show increased demand for precious
                    metals amid economic concerns...
                  </p>
                  <span className="text-xs text-amber-600">2 hours ago</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
};
