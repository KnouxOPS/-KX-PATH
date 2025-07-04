import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import PortfolioChart from "@/components/PortfolioChart";
import ChainAllocation from "@/components/ChainAllocation";
import TokensList from "@/components/TokensList";
import LiveMarketData from "@/components/LiveMarketData";
import JoinCommunity from "@/components/JoinCommunity";

export default function CryptoDashboard() {
  const [language, setLanguage] = useState<"en" | "ar">("en");

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "ar" : "en"));
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-[200px] top-[-128px] w-[400px] h-[500px] rounded-full bg-gradient-to-b from-[#FB03F5] to-[#AA9CFF] opacity-30 blur-[200px]" />
        <div className="absolute right-[100px] top-[-100px] w-[300px] h-[400px] rounded-full bg-gradient-to-b from-[#FB03F5] to-[#AA9CFF] opacity-20 blur-[100px]" />
      </div>

      <div className="relative z-10 flex">
        <Sidebar language={language} />

        <div className="flex-1 ml-[273px]">
          <Header language={language} onToggleLanguage={toggleLanguage} />

          {/* Live Market Data Bar */}
          <LiveMarketData language={language} />

          <div className="p-8 space-y-8">
            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
              {/* Portfolio Performance - Takes up 3 columns */}
              <div className="xl:col-span-3">
                <PortfolioChart language={language} />
              </div>

              {/* Chain Allocation - Takes up 1 column */}
              <div className="xl:col-span-1">
                <ChainAllocation language={language} />
              </div>
            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
              {/* Tokens List - Takes up 3 columns */}
              <div className="xl:col-span-3">
                <TokensList language={language} />
              </div>

              {/* Join Community - Takes up 1 column */}
              <div className="xl:col-span-1">
                <JoinCommunity language={language} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
