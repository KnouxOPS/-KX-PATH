import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import ProjectsOverview from "@/components/ProjectsOverview";
import ServicesGrid from "@/components/ServicesGrid";
import LiveProjectFeed from "@/components/LiveProjectFeed";
import AIDesignStudio from "@/components/AIDesignStudio";
import SmartRadar from "@/components/SmartRadar";
import ClientPortal from "@/components/ClientPortal";
import ProjectsMap from "@/components/ProjectsMap";
import EpicSplash from "@/components/EpicSplash";
import WorldClassFeatures from "@/components/WorldClassFeatures";

export default function LandscapeOS() {
  const [language, setLanguage] = useState<"en" | "ar">("ar");
  const [activeModule, setActiveModule] = useState("dashboard");
  const [showSplash, setShowSplash] = useState(true);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "ar" : "en"));
  };

  // Show splash screen first
  if (showSplash) {
    return <EpicSplash onComplete={() => setShowSplash(false)} />;
  }

  const renderContent = () => {
    switch (activeModule) {
      case "clients":
        return <ClientPortal language={language} />;
      case "projects":
        return <ProjectsOverview language={language} />;
      case "ai":
        return <AIDesignStudio language={language} />;
      case "radar":
        return <SmartRadar language={language} />;
      case "map":
        return <ProjectsMap language={language} />;
      default:
        return (
          <div className="space-y-8">
            <ProjectsOverview language={language} />
            <WorldClassFeatures language={language} />
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              <div className="xl:col-span-2">
                <ServicesGrid language={language} />
              </div>
              <div className="xl:col-span-1">
                <LiveProjectFeed language={language} />
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-green-900 text-white overflow-hidden ${language === "ar" ? "font-arabic" : ""}`}
    >
      {/* Background Nature Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-[200px] top-[-128px] w-[400px] h-[500px] rounded-full bg-gradient-to-b from-emerald-400/30 to-teal-400/20 blur-[200px]" />
        <div className="absolute right-[100px] top-[-100px] w-[300px] h-[400px] rounded-full bg-gradient-to-b from-green-400/20 to-emerald-400/10 blur-[100px]" />

        {/* Floating Elements */}
        <div className="absolute top-20 left-1/4 w-8 h-8 text-emerald-400/30 animate-float">
          🌿
        </div>
        <div
          className="absolute top-40 right-1/3 w-6 h-6 text-green-400/20 animate-float"
          style={{ animationDelay: "2s" }}
        >
          🍃
        </div>
        <div
          className="absolute bottom-40 left-1/3 w-10 h-10 text-teal-400/25 animate-float"
          style={{ animationDelay: "4s" }}
        >
          🌱
        </div>
      </div>

      <div className="relative z-10 flex">
        <Sidebar
          language={language}
          activeModule={activeModule}
          onModuleChange={setActiveModule}
          appType="landscape"
        />

        <div className="flex-1 ml-[273px]">
          <Header
            language={language}
            onToggleLanguage={toggleLanguage}
            appType="landscape"
          />

          <div className="p-8">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
}
