import { useState, useEffect } from "react";

interface MarketData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
}

const INITIAL_DATA: MarketData[] = [
  {
    symbol: "BTC/USD",
    price: 67543.21,
    change: 1234.56,
    changePercent: 1.87,
    volume: 28473829384,
  },
  {
    symbol: "ETH/USD",
    price: 3456.78,
    change: -67.89,
    changePercent: -1.93,
    volume: 15847392847,
  },
  {
    symbol: "SOL/USD",
    price: 234.56,
    change: 12.34,
    changePercent: 5.56,
    volume: 5847392847,
  },
  {
    symbol: "ADA/USD",
    price: 0.8765,
    change: 0.0234,
    changePercent: 2.74,
    volume: 3847392847,
  },
  {
    symbol: "DOT/USD",
    price: 12.34,
    change: -0.45,
    changePercent: -3.52,
    volume: 2847392847,
  },
  {
    symbol: "AVAX/USD",
    price: 45.67,
    change: 2.34,
    changePercent: 5.41,
    volume: 1847392847,
  },
  {
    symbol: "MATIC/USD",
    price: 1.23,
    change: -0.05,
    changePercent: -3.9,
    volume: 4847392847,
  },
  {
    symbol: "LINK/USD",
    price: 18.45,
    change: 0.67,
    changePercent: 3.77,
    volume: 3247392847,
  },
];

export function useMarketData() {
  const [data, setData] = useState<MarketData[]>(INITIAL_DATA);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prevData) =>
        prevData.map((item) => {
          // Simulate realistic price movements
          const volatility = Math.random() * 0.02 - 0.01; // -1% to +1%
          const newPrice = item.price * (1 + volatility);
          const newChange = newPrice - item.price;
          const newChangePercent = (newChange / item.price) * 100;

          return {
            ...item,
            price: Number(
              newPrice.toFixed(item.symbol.includes("ADA") ? 4 : 2),
            ),
            change: Number(
              newChange.toFixed(item.symbol.includes("ADA") ? 4 : 2),
            ),
            changePercent: Number(newChangePercent.toFixed(2)),
            volume: item.volume + Math.floor(Math.random() * 1000000),
          };
        }),
      );
    }, 2000); // Update every 2 seconds

    return () => clearInterval(interval);
  }, []);

  const getTopGainers = () => {
    return [...data]
      .sort((a, b) => b.changePercent - a.changePercent)
      .slice(0, 3);
  };

  const getTopLosers = () => {
    return [...data]
      .sort((a, b) => a.changePercent - b.changePercent)
      .slice(0, 3);
  };

  const getTotalMarketCap = () => {
    return data.reduce(
      (total, item) => total + (item.price * item.volume) / 1000000,
      0,
    );
  };

  return {
    data,
    isLoading,
    error,
    getTopGainers,
    getTopLosers,
    getTotalMarketCap,
  };
}
