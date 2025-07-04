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
  DollarSign,
  Eye,
  Zap,
  Camera,
  BarChart3,
  PieChart,
  Globe,
  Shield,
} from "lucide-react";

interface SidebarProps {
  language: "en" | "ar";
  activeModule?: string;
  onModuleChange?: (module: string) => void;
  appType?: "crypto" | "landscape" | "kxpath";
  userRole?: "admin" | "client" | "premium" | "field" | "researcher";
}

const kxPathMenuItems = {
  en: [
    { icon: Home, label: "Dashboard", id: "dashboard" },
    { icon: Wrench, label: "Smart Services", id: "services" },
    { icon: Bot, label: "AI Design Hub", id: "ai-hub" },
    { icon: BarChart3, label: "Market Data", id: "market-data" },
    { icon: Radar, label: "Smart Sniper", id: "smart-sniper" },
    { icon: Briefcase, label: "Projects", id: "projects" },
    { icon: Eye, label: "Live Feed", id: "live-feed" },
    { icon: DollarSign, label: "Finance", id: "finance" },
    { icon: Shield, label: "Premium Zone", id: "premium" },
    { icon: PieChart, label: "Research Hub", id: "research" },
    { icon: Users, label: "Field Team", id: "field" },
    { icon: Settings, label: "Settings", id: "settings" },
    { icon: User, label: "Profile", id: "profile" },
  ],
  ar: [
    { icon: Home, label: "الرئيسية", id: "dashboard" },
    { icon: Wrench, label: "الخدمات الذكية", id: "services" },
    { icon: Bot, label: "مركز التصميم الذكي", id: "ai-hub" },
    { icon: BarChart3, label: "بيانات السوق", id: "market-data" },
    { icon: Radar, label: "الرادار الذكي", id: "smart-sniper" },
    { icon: Briefcase, label: "إدارة المشاريع", id: "projects" },
    { icon: Eye, label: "البث المباشر", id: "live-feed" },
    { icon: DollarSign, label: "المالية والعقود", id: "finance" },
    { icon: Shield, label: "المنطقة المميزة", id: "premium" },
    { icon: PieChart, label: "مركز الباحثين", id: "research" },
    { icon: Users, label: "الفريق الميداني", id: "field" },
    { icon: Settings, label: "الإعدادات", id: "settings" },
    { icon: User, label: "الملف الشخصي", id: "profile" },
  ],
};

const landscapeMenuItems = {
  en: [
    { icon: Home, label: "Dashboard", id: "dashboard" },
    { icon: Users, label: "Clients", id: "clients" },
    { icon: Briefcase, label: "Projects", id: "projects" },
    { icon: Bot, label: "AI Studio", id: "ai" },
    { icon: Radar, label: "Smart Radar", id: "radar" },
    { icon: Map, label: "Projects Map", id: "map" },
    { icon: Settings, label: "Settings", id: "settings" },
    { icon: User, label: "Profile", id: "profile" },
  ],
  ar: [
    { icon: Home, label: "الرئيسية", id: "dashboard" },
    { icon: Users, label: "العملاء", id: "clients" },
    { icon: Briefcase, label: "المشاريع", id: "projects" },
    { icon: Bot, label: "ستوديو الذكاء", id: "ai" },
    { icon: Radar, label: "الرادار الذكي", id: "radar" },
    { icon: Map, label: "خريطة المشاريع", id: "map" },
    { icon: Settings, label: "الإعدادات", id: "settings" },
    { icon: User, label: "الملف الشخصي", id: "profile" },
  ],
};

const cryptoMenuItems = {
  en: [
    { icon: Home, label: "Dashboard", id: "dashboard" },
    { icon: Users, label: "Trade", id: "trade" },
    { icon: Briefcase, label: "Deposits", id: "deposits" },
    { icon: Bot, label: "Protocols", id: "protocols" },
    { icon: Settings, label: "Settings", id: "settings" },
    { icon: User, label: "Profile", id: "profile" },
  ],
  ar: [
    { icon: Home, label: "لوحة القيادة", id: "dashboard" },
    { icon: Users, label: "التداول", id: "trade" },
    { icon: Briefcase, label: "الودائع", id: "deposits" },
    { icon: Bot, label: "البروتوكولات", id: "protocols" },
    { icon: Settings, label: "الإعدادات", id: "settings" },
    { icon: User, label: "الملف الشخصي", id: "profile" },
  ],
};

export default function Sidebar({
  language,
  activeModule = "dashboard",
  onModuleChange,
  appType = "kxpath",
  userRole = "admin",
}: SidebarProps) {
  let items;
  if (appType === "kxpath") {
    items = kxPathMenuItems[language];
  } else if (appType === "landscape") {
    items = landscapeMenuItems[language];
  } else {
    items = cryptoMenuItems[language];
  }

  // Filter items based on user role
  const filteredItems = items.filter((item) => {
    if (userRole === "client") {
      return [
        "dashboard",
        "services",
        "ai-hub",
        "projects",
        "profile",
      ].includes(item.id);
    }
    if (userRole === "field") {
      return ["dashboard", "projects", "live-feed", "profile"].includes(
        item.id,
      );
    }
    if (userRole === "researcher") {
      return ["dashboard", "market-data", "research", "profile"].includes(
        item.id,
      );
    }
    return true; // admin sees all
  });

  const isRTL = language === "ar";

  const getAppConfig = () => {
    switch (appType) {
      case "kxpath":
        return {
          title: language === "ar" ? "طريق الخبرة" : "KX PATH",
          subtitle:
            language === "ar" ? "نظام اللاندسكيب الذكي" : "Landscape AI-OS",
          icons: (
            <div className="flex gap-1">
              <TreePine className="w-8 h-8 text-emerald-400" />
              <Waves className="w-6 h-6 text-teal-400 mt-1" />
              <Lightbulb className="w-6 h-6 text-yellow-400 mt-1" />
            </div>
          ),
          gradient: "from-emerald-600 via-teal-600 to-green-600",
        };
      case "landscape":
        return {
          title: language === "ar" ? "طريق الخبرة" : "KX PATH",
          subtitle: language === "ar" ? "نظام اللاندسكيب" : "Landscape OS",
          icons: (
            <div className="flex gap-1">
              <TreePine className="w-8 h-8 text-emerald-400" />
              <Waves className="w-6 h-6 text-teal-400 mt-1" />
              <Lightbulb className="w-6 h-6 text-yellow-400 mt-1" />
            </div>
          ),
          gradient: "from-emerald-600 via-teal-600 to-green-600",
        };
      default:
        return {
          title: "Cryptfest",
          subtitle: "",
          icons: (
            <div className="flex gap-1">
              <div className="w-3 h-3 bg-white rounded-tr-md rounded-tl-md rounded-bl-md" />
              <div className="w-3 h-3 bg-white rounded-tr-md rounded-tl-md rounded-bl-md" />
              <div className="w-3 h-3 bg-white rounded-tr-md rounded-tl-md rounded-bl-md mt-3" />
            </div>
          ),
          gradient: "from-blue-600 via-purple-600 to-pink-600",
        };
    }
  };

  const appConfig = getAppConfig();

  return (
    <div
      className={`fixed ${isRTL ? "right-0" : "left-0"} top-0 h-screen w-[273px] z-20`}
    >
      <div className="h-full bg-black/20 backdrop-blur-xl border-r border-white/10 p-10">
        {/* Logo */}
        <div
          className={`flex items-center gap-3 mb-16 ${isRTL ? "flex-row-reverse" : ""}`}
        >
          {appConfig.icons}
          <div className={`${isRTL ? "text-right" : "text-left"}`}>
            <h1 className="text-xl font-bold text-white">{appConfig.title}</h1>
            {appConfig.subtitle && (
              <p className="text-xs text-emerald-300 opacity-80">
                {appConfig.subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Active Dashboard Item */}
        <div className="mb-8">
          <div
            className={`flex items-center gap-5 p-4 rounded-2xl cursor-pointer transition-all ${
              activeModule === "dashboard"
                ? `bg-gradient-to-r ${appConfig.gradient}`
                : "hover:bg-white/10"
            } ${isRTL ? "flex-row-reverse" : ""}`}
            onClick={() => onModuleChange?.("dashboard")}
          >
            <Home className="w-6 h-6 text-white" />
            <span className="text-white text-lg font-medium">
              {filteredItems[0]?.label}
            </span>
          </div>
        </div>

        {/* Menu Items */}
        <div className="space-y-6">
          {filteredItems.slice(1, -3).map((item, index) => (
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

        {/* Settings Section */}
        <div className="absolute bottom-20 left-10 right-10 space-y-4">
          {filteredItems.slice(-3, -1).map((item, index) => (
            <div
              key={index}
              className={`flex items-center gap-5 p-3 cursor-pointer hover:bg-white/10 rounded-xl transition-all ${isRTL ? "flex-row-reverse" : ""}`}
              onClick={() => onModuleChange?.(item.id)}
            >
              <item.icon className="w-5 h-5 text-white" />
              <span className="text-[#DDD] font-medium hover:text-white transition-colors">
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
