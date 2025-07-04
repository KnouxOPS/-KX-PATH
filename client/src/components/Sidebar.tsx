import {
  Home,
  BarChart3,
  Cpu,
  Target,
  FolderOpen,
  Video,
  CreditCard,
  Crown,
  BookOpen,
  Users,
  Settings,
  MapPin,
  Radar,
  Zap,
  Building2,
  Globe,
} from "lucide-react";

interface SidebarProps {
  language: "en" | "ar";
  activeModule: string;
  onModuleChange: (module: string) => void;
  appType?: "crypto" | "landscape" | "kxpath";
  userRole?: "admin" | "client" | "premium" | "field" | "researcher";
}

export default function Sidebar({
  language,
  activeModule,
  onModuleChange,
  appType = "kxpath",
  userRole = "admin",
}: SidebarProps) {
  const kxPathModules = [
    {
      id: "dashboard",
      name_ar: "لوحة التحكم",
      name_en: "Dashboard",
      icon: Home,
      color: "emerald",
      roles: ["admin", "client", "premium", "field", "researcher"],
    },
    {
      id: "services",
      name_ar: "كتالوج الخدمات الذكية",
      name_en: "Smart Services Hub",
      icon: Building2,
      color: "blue",
      roles: ["admin", "client", "premium"],
    },
    {
      id: "ai-hub",
      name_ar: "مركز الذكاء الاصطناعي",
      name_en: "AI Design Hub",
      icon: Cpu,
      color: "purple",
      roles: ["admin", "premium"],
    },
    {
      id: "uae-map",
      name_ar: "🇦🇪 خريطة الإمارات الذكية",
      name_en: "🇦🇪 UAE Smart Map",
      icon: MapPin,
      color: "teal",
      roles: ["admin", "field"],
      highlight: true,
    },
    {
      id: "uae-radar",
      name_ar: "🛰️ الرادار الذكي الإماراتي",
      name_en: "🛰️ Smart UAE Radar",
      icon: Radar,
      color: "orange",
      roles: ["admin"],
      highlight: true,
    },
    {
      id: "opportunity-hunter",
      name_ar: "🎯 صياد الفرص الذكي",
      name_en: "🎯 Smart Opportunity Hunter",
      icon: Target,
      color: "pink",
      roles: ["admin"],
      highlight: true,
    },
    {
      id: "market-data",
      name_ar: "بيانات السوق الحية",
      name_en: "Live Market Data",
      icon: BarChart3,
      color: "green",
      roles: ["admin", "researcher"],
    },
    {
      id: "projects",
      name_ar: "إدارة المشاريع",
      name_en: "Project Management",
      icon: FolderOpen,
      color: "indigo",
      roles: ["admin", "client", "premium", "field"],
    },
    {
      id: "live-feed",
      name_ar: "البث المباشر للمشاريع",
      name_en: "Live Site Feed",
      icon: Video,
      color: "red",
      roles: ["admin", "client", "premium", "field"],
    },
    {
      id: "finance",
      name_ar: "المالية والعقود",
      name_en: "Finance & Contracts",
      icon: CreditCard,
      color: "yellow",
      roles: ["admin"],
    },
    {
      id: "premium",
      name_ar: "المنطقة المتميزة",
      name_en: "Premium Zone",
      icon: Crown,
      color: "purple",
      roles: ["admin", "premium"],
    },
    {
      id: "research",
      name_ar: "مركز الأبحاث",
      name_en: "Research Hub",
      icon: BookOpen,
      color: "cyan",
      roles: ["admin", "researcher"],
    },
    {
      id: "field",
      name_ar: "لوحة الفرق الميدانية",
      name_en: "Field Teams",
      icon: Users,
      color: "orange",
      roles: ["admin", "field"],
    },
  ];

  const filteredModules = kxPathModules.filter((module) =>
    module.roles.includes(userRole),
  );

  const getColorClasses = (
    color: string,
    isActive: boolean,
    isHighlight?: boolean,
  ) => {
    const baseClasses = isActive
      ? `bg-${color}-500 text-white border-${color}-400`
      : `hover:bg-${color}-500/20 text-${color}-300 border-${color}-400/30`;

    if (isHighlight && !isActive) {
      return `${baseClasses} bg-gradient-to-r from-${color}-500/10 to-${color}-600/10 border-${color}-400/50 ring-1 ring-${color}-400/30`;
    }

    return baseClasses;
  };

  return (
    <div
      className={`fixed left-0 top-0 h-screen w-[273px] bg-black/30 backdrop-blur-xl border-r border-emerald-400/30 z-20 ${
        language === "ar" ? "font-arabic" : ""
      }`}
    >
      {/* Header */}
      <div className="p-6 border-b border-emerald-400/20">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
            <Globe className="w-7 h-7 text-white" />
          </div>
          <div>
            <div className="text-emerald-300 font-bold text-lg">KX PATH</div>
            <div className="text-emerald-500 text-xs">
              {language === "ar"
                ? "نظام تشغيل المناظر الطبيعية"
                : "Landscape OS"}
            </div>
            <div className="text-emerald-400 text-xs mt-1 flex items-center gap-1">
              🇦🇪{" "}
              {language === "ar" ? "الإمارات العربية المتحدة" : "UAE Edition"}
            </div>
          </div>
        </div>
      </div>

      {/* User Role Badge */}
      <div className="p-4">
        <div
          className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium ${
            userRole === "admin"
              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/30"
              : userRole === "premium"
                ? "bg-purple-500/20 text-purple-300 border border-purple-400/30"
                : userRole === "field"
                  ? "bg-orange-500/20 text-orange-300 border border-orange-400/30"
                  : userRole === "researcher"
                    ? "bg-blue-500/20 text-blue-300 border border-blue-400/30"
                    : "bg-slate-500/20 text-slate-300 border border-slate-400/30"
          }`}
        >
          {userRole === "admin" && <Settings className="w-4 h-4" />}
          {userRole === "premium" && <Crown className="w-4 h-4" />}
          {userRole === "field" && <Users className="w-4 h-4" />}
          {userRole === "researcher" && <BookOpen className="w-4 h-4" />}
          {userRole === "client" && <Home className="w-4 h-4" />}

          <span>
            {userRole === "admin" &&
              (language === "ar" ? "مدير النظام" : "System Admin")}
            {userRole === "premium" &&
              (language === "ar" ? "عضو متميز" : "Premium Member")}
            {userRole === "field" &&
              (language === "ar" ? "فريق ميداني" : "Field Team")}
            {userRole === "researcher" &&
              (language === "ar" ? "باحث" : "Researcher")}
            {userRole === "client" && (language === "ar" ? "عميل" : "Client")}
          </span>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {filteredModules.map((module) => {
          const isActive = activeModule === module.id;
          const IconComponent = module.icon;

          return (
            <button
              key={module.id}
              onClick={() => onModuleChange(module.id)}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-300
                ${getColorClasses(module.color, isActive, module.highlight)}
                ${isActive ? "scale-105 shadow-lg" : "hover:scale-102"}
                ${module.highlight ? "relative overflow-hidden" : ""}
              `}
            >
              {module.highlight && !isActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              )}

              <IconComponent
                className={`w-5 h-5 flex-shrink-0 ${
                  isActive ? "text-white" : `text-${module.color}-400`
                }`}
              />

              <div className="flex-1 text-left">
                <div
                  className={`font-medium text-sm ${
                    isActive ? "text-white" : `text-${module.color}-200`
                  }`}
                >
                  {language === "ar" ? module.name_ar : module.name_en}
                </div>
                {module.highlight && (
                  <div className="text-xs text-emerald-400 mt-1">
                    {language === "ar" ? "جديد!" : "New!"}
                  </div>
                )}
              </div>

              {isActive && (
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer - UAE Branding */}
      <div className="p-4 border-t border-emerald-400/20">
        <div className="bg-gradient-to-r from-red-500/10 via-white/5 to-green-500/10 backdrop-blur-lg rounded-xl border border-emerald-400/20 p-3 text-center">
          <div className="text-emerald-300 text-sm font-medium mb-1">
            🇦🇪 {language === "ar" ? "صُنع في الإمارات" : "Made in UAE"}
          </div>
          <div className="text-emerald-500 text-xs">
            {language === "ar"
              ? "بفخر لخدمة الوطن"
              : "Proudly Serving the Nation"}
          </div>
        </div>

        <div className="mt-3 text-center text-xs text-emerald-400/60">
          KX PATH v2.0 UAE Edition
        </div>
      </div>
    </div>
  );
}
