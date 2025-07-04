import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface MarketData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
}

interface LiveMarketDataProps {
  language: "en" | "ar";
}

export default function LiveMarketData({ language }: LiveMarketDataProps) {
  const [marketData, setMarketData] = useState<MarketData[]>([
    {
      symbol: "BTC/USD",
      price: 67543.21,
      change: 1234.56,
      changePercent: 1.87,
    },
    { symbol: "ETH/USD", price: 3456.78, change: -67.89, changePercent: -1.93 },
    { symbol: "SOL/USD", price: 234.56, change: 12.34, changePercent: 5.56 },
    { symbol: "ADA/USD", price: 0.8765, change: 0.0234, changePercent: 2.74 },
    { symbol: "DOT/USD", price: 12.34, change: -0.45, changePercent: -3.52 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMarketData((prev) =>
        prev.map((item) => ({
          ...item,
          price: item.price + (Math.random() - 0.5) * 10,
          change: (Math.random() - 0.5) * 100,
          changePercent: (Math.random() - 0.5) * 10,
        })),
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const title =
    language === "en" ? "Live Market Data" : "بيانات السوق المباشرة";

  return (
    <div className="bg-black/20 backdrop-blur-xl border-y border-white/10 py-4 px-8 overflow-hidden">
      <div className="flex items-center gap-4 mb-3">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
        <h3 className="text-white font-semibold">{title}</h3>
      </div>

      <div className="flex animate-scroll">
        {[...marketData, ...marketData].map((item, index) => (
          <div key={index} className="flex items-center gap-6 min-w-fit pr-12">
            <span className="text-white font-medium">{item.symbol}</span>
            <span className="text-white text-lg font-bold">
              ${item.price.toFixed(2)}
            </span>
            <div
              className={`flex items-center gap-1 ${item.change >= 0 ? "text-green-400" : "text-red-400"}`}
            >
              {item.change >= 0 ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span className="font-medium">
                {item.change >= 0 ? "+" : ""}
                {item.changePercent.toFixed(2)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
