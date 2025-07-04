interface TokensListProps {
  language: "en" | "ar";
}

const tokens = [
  {
    name: { en: "Bitcoin", ar: "بيتكوين" },
    symbol: "BTC",
    icon: "₿",
    iconBg: "#F7931A",
    balance: "0.04321",
    value: "$2,340.32",
  },
  {
    name: { en: "Ethereum", ar: "إيثريوم" },
    symbol: "ETH",
    icon: "Ξ",
    iconBg:
      "linear-gradient(145deg, #FFF 6.13%, rgba(217, 217, 217, 0.71) 99.08%)",
    balance: "32.234",
    value: "$5,340.32",
  },
];

const translations = {
  en: {
    tokens: "Tokens",
    name: "Name",
    balance: "Balance",
    totalValue: "Total Value",
    trade: "Trade",
  },
  ar: {
    tokens: "الرم��ز المميزة",
    name: "الاسم",
    balance: "الرصيد",
    totalValue: "القيمة الإجمالية",
    trade: "تداول",
  },
};

export default function TokensList({ language }: TokensListProps) {
  const t = translations[language];
  const isRTL = language === "ar";

  return (
    <div className="bg-[#1C1C1C]/60 backdrop-blur-xl rounded-2xl p-8">
      <h3 className="text-white text-xl font-semibold mb-8">{t.tokens}</h3>

      {/* Header */}
      <div
        className={`grid grid-cols-12 gap-4 mb-8 text-sm text-[#878787] ${isRTL ? "text-right" : ""}`}
      >
        <div className="col-span-4">{t.name}</div>
        <div className="col-span-3 text-center">{t.balance}</div>
        <div className="col-span-3 text-center">{t.totalValue}</div>
        <div className="col-span-2 text-center">{t.trade}</div>
      </div>

      {/* Token Rows */}
      <div className="space-y-6">
        {tokens.map((token, index) => (
          <div
            key={index}
            className={`grid grid-cols-12 gap-4 items-center ${isRTL ? "text-right" : ""}`}
          >
            {/* Token Info */}
            <div className="col-span-4 flex items-center gap-4">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-black font-bold text-sm"
                style={{ background: token.iconBg }}
              >
                {token.icon}
              </div>
              <span className="text-white font-semibold">
                {token.name[language]}
              </span>
            </div>

            {/* Balance */}
            <div className="col-span-3 text-center">
              <span className="text-white font-semibold">{token.balance}</span>
            </div>

            {/* Total Value */}
            <div className="col-span-3 text-center">
              <span className="text-white font-semibold">{token.value}</span>
            </div>

            {/* Trade Button */}
            <div className="col-span-2 flex justify-center">
              <button className="bg-white/10 hover:bg-white/20 transition-colors rounded-lg px-6 py-2">
                <span className="text-white font-medium">{t.trade}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
