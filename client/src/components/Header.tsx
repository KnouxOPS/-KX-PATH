import { Search, Bell, Globe, Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  language: "en" | "ar";
  onToggleLanguage: () => void;
  appType?: "crypto" | "landscape";
}

export default function Header({
  language,
  onToggleLanguage,
  appType = "landscape",
}: HeaderProps) {
  const isRTL = language === "ar";

  const welcomeText = {
    crypto: {
      en: "Welcome Back, Arkhan",
      ar: "مرحباً بعودتك، أرخان",
    },
    landscape: {
      en: "Welcome to KX PATH Dashboard",
      ar: "مرحباً بك في لوحة تحكم طريق الخبرة",
    },
  };

  const currentDate = new Date().toLocaleDateString(
    language === "ar" ? "ar-SA" : "en-US",
    {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  );

  return (
    <div
      className={`flex items-center justify-between p-8 ${isRTL ? "flex-row-reverse" : ""}`}
    >
      {/* Welcome Section */}
      <div className={`${isRTL ? "text-right" : "text-left"}`}>
        <h2 className="text-2xl font-bold text-white mb-1">
          {welcomeText[appType][language]}
        </h2>
        {appType === "landscape" && (
          <div
            className={`flex items-center gap-2 text-emerald-300 text-sm ${isRTL ? "flex-row-reverse" : ""}`}
          >
            <Calendar className="w-4 h-4" />
            <span>{currentDate}</span>
            <MapPin className="w-4 h-4 ml-4" />
            <span>
              {language === "ar" ? "الرياض، السعودية" : "Riyadh, Saudi Arabia"}
            </span>
          </div>
        )}
      </div>

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
              {language === "en"
                ? "Search projects..."
                : "البحث في المشاريع..."}
            </span>
          </div>
        </div>

        {/* Notifications */}
        <div className="relative">
          <Bell className="w-6 h-6 text-white cursor-pointer" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#FC0A0A] rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">3</span>
          </div>
        </div>

        {/* User Avatar */}
        <div
          className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}
        >
          <span className="text-[#DDD] text-lg">
            {language === "en" ? "Admin" : "المدير"}
          </span>
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-teal-400 flex items-center justify-center text-white font-bold">
            KX
          </div>
        </div>
      </div>
    </div>
  );
}
