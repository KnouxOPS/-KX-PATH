import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import KXPathDashboard from "@/components/KXPathDashboard";
import SmartServicesHub from "@/components/SmartServicesHub";
import AIDesignHub from "@/components/AIDesignHub";
import LiveMarketData from "@/components/LiveMarketData";
import SmartSniperRadar from "@/components/SmartSniperRadar";
import ProjectManagement from "@/components/ProjectManagement";
import LiveSiteFeed from "@/components/LiveSiteFeed";
import FinanceContracts from "@/components/FinanceContracts";
import PremiumZone from "@/components/PremiumZone";
import ResearcherHub from "@/components/ResearcherHub";
import FieldTeamDashboard from "@/components/FieldTeamDashboard";
import EpicSplash from "@/components/EpicSplash";
import UAESmartMap from "@/components/UAESmartMap";
import SmartUAERadar from "@/components/SmartUAERadar";
import SmartOpportunityHunter from "@/components/SmartOpportunityHunter";

export default function KXPathOS() {
  const [language, setLanguage] = useState<"en" | "ar">("ar");
  const [activeModule, setActiveModule] = useState("dashboard");
  const [showSplash, setShowSplash] = useState(true);
  const [userRole, setUserRole] = useState<
    "admin" | "client" | "premium" | "field" | "researcher"
  >("admin");

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "ar" : "en"));
  };

  // Show splash screen first
  if (showSplash) {
    return <EpicSplash onComplete={() => setShowSplash(false)} />;
  }

  const renderContent = () => {
    switch (activeModule) {
      case "services":
        return <SmartServicesHub language={language} userRole={userRole} />;
      case "ai-hub":
        return <AIDesignHub language={language} />;
      case "market-data":
        return <LiveMarketData language={language} />;
      case "smart-sniper":
        return <SmartSniperRadar language={language} />;
      case "uae-radar":
        return <SmartUAERadar language={language} />;
      case "uae-map":
        return <UAESmartMap language={language} />;
      case "opportunity-hunter":
        return <SmartOpportunityHunter language={language} />;
      case "projects":
        return <ProjectManagement language={language} userRole={userRole} />;
      case "live-feed":
        return <LiveSiteFeed language={language} />;
      case "finance":
        return <FinanceContracts language={language} userRole={userRole} />;
      case "premium":
        return <PremiumZone language={language} />;
      case "research":
        return <ResearcherHub language={language} />;
      case "field":
        return <FieldTeamDashboard language={language} />;
      default:
        return <KXPathDashboard language={language} userRole={userRole} />;
    }
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-green-900 text-white overflow-hidden ${language === "ar" ? "font-arabic" : ""}`}
    >
      {/* Advanced Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Main Gradient Orbs */}
        <div className="absolute left-[200px] top-[-128px] w-[400px] h-[500px] rounded-full bg-gradient-to-b from-emerald-400/30 to-teal-400/20 blur-[200px] animate-pulse" />
        <div
          className="absolute right-[100px] top-[-100px] w-[300px] h-[400px] rounded-full bg-gradient-to-b from-green-400/20 to-emerald-400/10 blur-[100px] animate-pulse"
          style={{ animationDelay: "2s" }}
        />

        {/* Floating Nature Elements */}
        <div className="absolute top-20 left-1/4 w-8 h-8 text-emerald-400/30 animate-leaf-sway text-4xl">
          🌿
        </div>
        <div
          className="absolute top-40 right-1/3 w-6 h-6 text-green-400/20 animate-water-wave text-3xl"
          style={{ animationDelay: "2s" }}
        >
          🍃
        </div>
        <div
          className="absolute bottom-40 left-1/3 w-10 h-10 text-teal-400/25 animate-light-flicker text-5xl"
          style={{ animationDelay: "4s" }}
        >
          🌱
        </div>
        <div
          className="absolute top-60 right-1/4 w-6 h-6 text-yellow-400/20 animate-light-flicker text-3xl"
          style={{ animationDelay: "6s" }}
        >
          💧
        </div>
        <div
          className="absolute bottom-60 right-1/5 w-8 h-8 text-emerald-300/25 animate-float text-4xl"
          style={{ animationDelay: "3s" }}
        >
          🌸
        </div>

        {/* Dynamic Grid Overlay */}
        <div
          className={
            'absolute inset-0 bg-[url(\'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="%23ffffff" stroke-width="0.3" opacity="0.08"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>\')] opacity-20'
          }
        />

        {/* Smart Particles */}
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-emerald-400/40 rounded-full animate-float particle"
            style={{
              left: `${20 + i * 7}%`,
              top: `${10 + i * 5}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex">
        <Sidebar
          language={language}
          activeModule={activeModule}
          onModuleChange={setActiveModule}
          appType="kxpath"
          userRole={userRole}
        />

        <div className="flex-1 ml-[273px]">
          <Header
            language={language}
            onToggleLanguage={toggleLanguage}
            appType="kxpath"
            userRole={userRole}
            onRoleChange={setUserRole}
          />

          <div className="p-8">{renderContent()}</div>
        </div>
      </div>

      {/* Global KX PATH Branding */}
      <div className="fixed bottom-4 left-4 z-20 bg-black/30 backdrop-blur-lg rounded-full px-4 py-2 border border-emerald-400/30">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center">
            <span className="text-white text-xs font-bold">KX</span>
          </div>
          <span className="text-emerald-300 text-sm font-medium">
            PATH OS v2.0
          </span>
        </div>
      </div>
    </div>
  );
}
