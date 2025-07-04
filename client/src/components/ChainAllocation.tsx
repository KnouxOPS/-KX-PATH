interface ChainAllocationProps {
  language: "en" | "ar";
}

const chains = [
  {
    name: { en: "Bitcoin", ar: "بيتكوين" },
    symbol: "BTC",
    value: "$ 23.3B",
    percentage: "71.68%",
    color: "#F7931A",
    icon: "₿",
  },
  {
    name: { en: "Ethereum", ar: "إيثريوم" },
    symbol: "ETH",
    value: "$ 23.3B",
    percentage: "71.68%",
    color: "#00FFA3",
    icon: "Ξ",
  },
  {
    name: { en: "Shiba", ar: "شيبا" },
    symbol: "SHIB",
    value: "$ 23.3B",
    percentage: "71.68%",
    color: "#F00500",
    icon: "🐕",
  },
  {
    name: { en: "Solana", ar: "سولانا" },
    symbol: "SOL",
    value: "$ 23.3B",
    percentage: "71.68%",
    color: "#CFFFF3",
    icon: "◎",
  },
  {
    name: { en: "Tether", ar: "تيثر" },
    symbol: "USDT",
    value: "$ 23.3B",
    percentage: "71.68%",
    color: "#50AF95",
    icon: "₮",
  },
];

export default function ChainAllocation({ language }: ChainAllocationProps) {
  const title = language === "en" ? "Chain Allocation" : "توزيع السلاسل";
  const viewAll = language === "en" ? "View All" : "عرض الكل";
  const isRTL = language === "ar";

  return (
    <div className="bg-[#1C1C1C]/60 backdrop-blur-xl rounded-2xl p-8">
      <h3 className="text-white text-lg font-medium mb-8 capitalize">
        {title}
      </h3>

      <div className="space-y-6">
        {chains.map((chain, index) => (
          <div key={index} className="flex items-center gap-4">
            {/* Chain Icon */}
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
              style={{ backgroundColor: chain.color }}
            >
              {chain.icon}
            </div>

            {/* Chain Info */}
            <div className="flex-1">
              <div
                className={`flex items-center justify-between mb-2 ${isRTL ? "flex-row-reverse" : ""}`}
              >
                <span className="text-white font-semibold text-base">
                  {chain.name[language]}
                </span>
                <span className="text-white font-semibold text-base">
                  {chain.value}
                </span>
              </div>

              <div
                className={`flex items-center justify-between mb-3 ${isRTL ? "flex-row-reverse" : ""}`}
              >
                <div></div>
                <span className="text-white text-sm">{chain.percentage}</span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 bg-[#353535] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: chain.percentage,
                    background: `linear-gradient(269deg, ${chain.color} -11.69%, ${chain.color}aa 112.48%)`,
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <button className="w-full mt-8 bg-[#2B2B2B] hover:bg-[#3B3B3B] transition-colors rounded-xl py-3 px-6">
        <span className="text-white font-medium">{viewAll}</span>
      </button>
    </div>
  );
}
