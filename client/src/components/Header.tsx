import { Search, Bell, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  language: "en" | "ar";
  onToggleLanguage: () => void;
}

export default function Header({ language, onToggleLanguage }: HeaderProps) {
  const isRTL = language === "ar";

  const welcomeText = {
    en: "Welcome Back, Arkhan",
    ar: "مرحباً بعودتك، أرخان",
  };

  return (
    <div
      className={`flex items-center justify-between p-8 ${isRTL ? "flex-row-reverse" : ""}`}
    >
      {/* Welcome Text */}
      <h2 className="text-2xl font-semibold text-white">
        {welcomeText[language]}
      </h2>

      <div
        className={`flex items-center gap-6 ${isRTL ? "flex-row-reverse" : ""}`}
      >
        {/* Language Toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleLanguage}
          className="text-white hover:bg-white/10"
        >
          <Globe className="w-4 h-4 mr-2" />
          {language === "en" ? "العربية" : "English"}
        </Button>

        {/* Search */}
        <div className="relative">
          <div className="flex items-center gap-5 bg-[rgba(28,31,37,0.6)] backdrop-blur-xl rounded-2xl px-4 py-3 w-[281px]">
            <Search className="w-6 h-6 text-white" />
            <span className="text-[#A0A0A0] text-lg">
              {language === "en" ? "Search" : "بحث"}
            </span>
          </div>
        </div>

        {/* Notifications */}
        <div className="relative">
          <Bell className="w-6 h-6 text-white cursor-pointer" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#FC0A0A] rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">6</span>
          </div>
        </div>

        {/* User Avatar */}
        <div
          className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}
        >
          <span className="text-[#DDD] text-lg">
            {language === "en" ? "Evano" : "إيفانو"}
          </span>
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-400" />
        </div>
      </div>
    </div>
  );
}
