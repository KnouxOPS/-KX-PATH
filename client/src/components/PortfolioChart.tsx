import { useState } from "react";
import { Banknote, Wallet, TrendingUp, BarChart3 } from "lucide-react";

interface PortfolioChartProps {
  language: "en" | "ar";
}

const timeframes = ["1H", "1D", "3D", "1M", "1Y"];

const translations = {
  en: {
    totalAssets: "Total assets",
    totalDeposits: "Total deposits",
    apy: "APY",
    portfolioPerformance: "Portfolios performance",
    ethereum: "Ethereum",
  },
  ar: {
    totalAssets: "إجمالي الأصول",
    totalDeposits: "إجمالي الودائع",
    apy: "العائد السنوي",
    portfolioPerformance: "أداء المحافظ",
    ethereum: "إيثريوم",
  },
};

export default function PortfolioChart({ language }: PortfolioChartProps) {
  const [selectedTimeframe, setSelectedTimeframe] = useState("1D");
  const t = translations[language];
  const isRTL = language === "ar";

  return (
    <div className="bg-[#1C1C1C]/60 backdrop-blur-xl rounded-2xl p-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-8 mb-8">
        {/* Total Assets */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center">
            <Banknote className="w-8 h-8 text-white" />
          </div>
          <div>
            <p className="text-white text-sm mb-1">{t.totalAssets}</p>
            <p className="text-white text-2xl font-bold">$ 87,743</p>
          </div>
        </div>

        {/* Total Deposits */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center">
            <Wallet className="w-8 h-8 text-white" />
          </div>
          <div>
            <p className="text-white text-sm mb-1">{t.totalDeposits}</p>
            <p className="text-white text-2xl font-bold">$ 78,342</p>
          </div>
        </div>

        {/* APY */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <div>
            <p className="text-white text-sm mb-1">{t.apy}</p>
            <p className="text-white text-2xl font-bold">+ 12.3%</p>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="space-y-6">
        <div
          className={`flex items-center justify-between ${isRTL ? "flex-row-reverse" : ""}`}
        >
          <h3 className="text-white text-xl font-semibold">
            {t.portfolioPerformance}
          </h3>

          <div
            className={`flex items-center gap-4 ${isRTL ? "flex-row-reverse" : ""}`}
          >
            {/* Crypto Selector */}
            <div className="flex items-center gap-2 bg-black/40 rounded-full px-3 py-2">
              <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full" />
              <span className="text-white text-sm">{t.ethereum}</span>
              <svg
                className="w-3 h-3 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>

            {/* Timeframe Selector */}
            <div className="flex bg-black/20 rounded-lg p-1">
              {timeframes.map((timeframe) => (
                <button
                  key={timeframe}
                  onClick={() => setSelectedTimeframe(timeframe)}
                  className={`px-3 py-1 text-xs rounded transition-colors ${
                    selectedTimeframe === timeframe
                      ? "bg-white text-black"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {timeframe}
                </button>
              ))}
              <button className="px-3 py-1 text-xs text-gray-400 hover:text-white">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </button>
            </div>

            <BarChart3 className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Chart Area */}
        <div className="relative h-[300px] bg-black/20 rounded-xl p-6">
          {/* Grid Lines */}
          <div className="absolute inset-6 grid grid-cols-10 grid-rows-6 gap-0">
            {Array.from({ length: 60 }).map((_, i) => (
              <div key={i} className="border-r border-b border-white/5" />
            ))}
          </div>

          {/* Chart Bars */}
          <div className="absolute inset-6 flex items-end gap-1">
            {Array.from({ length: 50 }).map((_, i) => {
              const height = Math.random() * 80 + 20;
              const isPositive = Math.random() > 0.5;
              return (
                <div
                  key={i}
                  className={`w-2 rounded-t ${isPositive ? "bg-green-400" : "bg-red-400"}`}
                  style={{ height: `${height}%` }}
                />
              );
            })}
          </div>

          {/* Price Indicator */}
          <div className="absolute top-16 right-6 bg-red-500 px-3 py-1 rounded text-white text-sm">
            $ 450
          </div>

          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-400 py-6">
            <span>$ 600</span>
            <span>$ 500</span>
            <span>$ 400</span>
            <span>$ 300</span>
            <span>$ 200</span>
            <span>$ 100</span>
          </div>

          {/* X-axis labels */}
          <div className="absolute bottom-0 left-6 right-6 flex justify-between text-xs text-gray-400">
            <span>17 Mar</span>
            <span>18 Mar</span>
            <span>19 Mar</span>
            <span>20 Mar</span>
            <span>21 Mar</span>
            <span>22 Mar</span>
            <span>23 Mar</span>
            <span>24 Mar</span>
            <span>25 Mar</span>
            <span>26 Mar</span>
          </div>
        </div>
      </div>
    </div>
  );
}
