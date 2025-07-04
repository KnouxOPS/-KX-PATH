import {
  Home,
  Users,
  Briefcase,
  Bot,
  Radar,
  Map,
  Settings,
  User,
  LogOut,
  Wrench,
  TreePine,
  Waves,
  Lightbulb,
} from "lucide-react";

interface SidebarProps {
  language: "en" | "ar";
  activeModule?: string;
  onModuleChange?: (module: string) => void;
  appType?: "crypto" | "landscape";
}

const landscapeMenuItems = {
  en: [
    { icon: Home, label: "Dashboard", id: "dashboard", active: true },
    { icon: Users, label: "Clients", id: "clients", active: false },
    { icon: Briefcase, label: "Projects", id: "projects", active: false },
    { icon: Bot, label: "AI Studio", id: "ai", active: false },
    { icon: Radar, label: "Smart Radar", id: "radar", active: false },
    { icon: Map, label: "Projects Map", id: "map", active: false },
    { icon: Settings, label: "Settings", id: "settings", active: false },
    { icon: User, label: "Profile", id: "profile", active: false },
  ],
  ar: [
    { icon: Home, label: "الرئيسية", id: "dashboard", active: true },
    { icon: Users, label: "العملاء", id: "clients", active: false },
    { icon: Briefcase, label: "المشاريع", id: "projects", active: false },
    { icon: Bot, label: "ستوديو الذكاء", id: "ai", active: false },
    { icon: Radar, label: "الرادار الذكي", id: "radar", active: false },
    { icon: Map, label: "خريطة المشاريع", id: "map", active: false },
    { icon: Settings, label: "الإعدادات", id: "settings", active: false },
    { icon: User, label: "الملف الشخصي", id: "profile", active: false },
  ],
};

const cryptoMenuItems = {
  en: [
    { icon: Home, label: "Dashboard", id: "dashboard", active: true },
    { icon: Users, label: "Trade", id: "trade", active: false },
    { icon: Briefcase, label: "Deposits", id: "deposits", active: false },
    { icon: Bot, label: "Protocols", id: "protocols", active: false },
    { icon: Settings, label: "Settings", id: "settings", active: false },
    { icon: User, label: "Profile", id: "profile", active: false },
  ],
  ar: [
    { icon: Home, label: "لوحة القيادة", id: "dashboard", active: true },
    { icon: Users, label: "التداول", id: "trade", active: false },
    { icon: Briefcase, label: "الودائع", id: "deposits", active: false },
    { icon: Bot, label: "البروتوكولات", id: "protocols", active: false },
    { icon: Settings, label: "الإعدادات", id: "settings", active: false },
    { icon: User, label: "الملف الشخصي", id: "profile", active: false },
  ],
};

export default function Sidebar({
  language,
  activeModule = "dashboard",
  onModuleChange,
  appType = "landscape",
}: SidebarProps) {
  const items =
    appType === "landscape"
      ? landscapeMenuItems[language]
      : cryptoMenuItems[language];
  const isRTL = language === "ar";

  const appTitle =
    appType === "landscape"
      ? language === "ar"
        ? "طريق الخبرة"
        : "KX PATH"
      : "Cryptfest";

  const appSubtitle =
    appType === "landscape"
      ? language === "ar"
        ? "نظام اللاندسكيب"
        : "Landscape OS"
      : "";

  return (
    <div
      className={`fixed ${isRTL ? "right-0" : "left-0"} top-0 h-screen w-[273px] z-20`}
    >
      <div className="h-full bg-black/20 backdrop-blur-xl border-r border-white/10 p-10">
        {/* Logo */}
        <div
          className={`flex items-center gap-3 mb-16 ${isRTL ? "flex-row-reverse" : ""}`}
        >
          {appType === "landscape" ? (
            <div className="flex gap-1">
              <TreePine className="w-8 h-8 text-emerald-400" />
              <Waves className="w-6 h-6 text-teal-400 mt-1" />
              <Lightbulb className="w-6 h-6 text-yellow-400 mt-1" />
            </div>
          ) : (
            <div className="flex gap-1">
              <div className="w-3 h-3 bg-white rounded-tr-md rounded-tl-md rounded-bl-md" />
              <div className="w-3 h-3 bg-white rounded-tr-md rounded-tl-md rounded-bl-md" />
              <div className="w-3 h-3 bg-white rounded-tr-md rounded-tl-md rounded-bl-md mt-3" />
            </div>
          )}
          <div>
            <h1 className="text-xl font-bold text-white">{appTitle}</h1>
            {appSubtitle && (
              <p className="text-xs text-emerald-300 opacity-80">
                {appSubtitle}
              </p>
            )}
          </div>
        </div>

        {/* Active Dashboard Item */}
        <div className="mb-8">
          <div
            className={`flex items-center gap-5 p-4 rounded-2xl cursor-pointer transition-all ${
              activeModule === "dashboard"
                ? "bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600"
                : "hover:bg-white/10"
            } ${isRTL ? "flex-row-reverse" : ""}`}
            onClick={() => onModuleChange?.("dashboard")}
          >
            <Home className="w-6 h-6 text-white" />
            <span className="text-white text-lg font-medium">
              {items[0].label}
            </span>
          </div>
        </div>

        {/* Menu Items */}
        <div className="space-y-6">
          {items.slice(1).map((item, index) => (
            <div
              key={index}
              className={`flex items-center gap-5 p-3 cursor-pointer hover:bg-white/10 rounded-xl transition-all ${
                activeModule === item.id ? "bg-white/10" : ""
              } ${isRTL ? "flex-row-reverse" : ""}`}
              onClick={() => onModuleChange?.(item.id)}
            >
              <item.icon className="w-6 h-6 text-white" />
              <span className="text-[#DDD] text-lg font-medium hover:text-white transition-colors">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Logout */}
        <div
          className={`absolute bottom-10 flex items-center gap-5 cursor-pointer hover:opacity-80 transition-opacity ${isRTL ? "flex-row-reverse right-10" : "left-10"}`}
        >
          <LogOut className="w-6 h-6 text-white" />
          <span className="text-[#DDD] text-lg font-medium">
            {language === "en" ? "Log Out" : "تسجيل الخروج"}
          </span>
        </div>
      </div>
    </div>
  );
}
