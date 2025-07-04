import {
  BarChart3,
  TrendingUp,
  DollarSign,
  Settings,
  User,
  LogOut,
  Grid3X3,
} from "lucide-react";

interface SidebarProps {
  language: "en" | "ar";
}

const menuItems = {
  en: [
    { icon: Grid3X3, label: "Dashboard", active: true },
    { icon: TrendingUp, label: "Trade", active: false },
    { icon: DollarSign, label: "Deposits", active: false },
    { icon: BarChart3, label: "Protocols", active: false },
    { icon: Settings, label: "Settings", active: false },
    { icon: User, label: "Profile", active: false },
  ],
  ar: [
    { icon: Grid3X3, label: "لوحة القيادة", active: true },
    { icon: TrendingUp, label: "التداول", active: false },
    { icon: DollarSign, label: "الودائع", active: false },
    { icon: BarChart3, label: "البروتوكولات", active: false },
    { icon: Settings, label: "الإعدادات", active: false },
    { icon: User, label: "الملف الشخصي", active: false },
  ],
};

export default function Sidebar({ language }: SidebarProps) {
  const items = menuItems[language];
  const isRTL = language === "ar";

  return (
    <div
      className={`fixed ${isRTL ? "right-0" : "left-0"} top-0 h-screen w-[273px] z-20`}
    >
      <div className="h-full bg-black/20 backdrop-blur-xl border-r border-white/10 p-10">
        {/* Logo */}
        <div
          className={`flex items-center gap-3 mb-16 ${isRTL ? "flex-row-reverse" : ""}`}
        >
          <div className="flex gap-1">
            <div className="w-3 h-3 bg-white rounded-tr-md rounded-tl-md rounded-bl-md" />
            <div className="w-3 h-3 bg-white rounded-tr-md rounded-tl-md rounded-bl-md" />
            <div className="w-3 h-3 bg-white rounded-tr-md rounded-tl-md rounded-bl-md mt-3" />
          </div>
          <h1 className="text-2xl font-normal">
            <span className="text-white">Crypt</span>
            <span className="text-white">fest</span>
          </h1>
        </div>

        {/* Active Dashboard Item */}
        <div className="mb-8">
          <div
            className={`flex items-center gap-5 p-4 rounded-2xl bg-gradient-to-r from-[#1F8EBE] via-[#440495] to-[#B102CD] ${isRTL ? "flex-row-reverse" : ""}`}
          >
            <Grid3X3 className="w-6 h-6 text-white" />
            <span className="text-white text-lg font-medium">
              {items[0].label}
            </span>
          </div>
        </div>

        {/* Menu Items */}
        <div className="space-y-9">
          {items.slice(1).map((item, index) => (
            <div
              key={index}
              className={`flex items-center gap-5 p-1 cursor-pointer hover:opacity-80 transition-opacity ${isRTL ? "flex-row-reverse" : ""}`}
            >
              <item.icon className="w-6 h-6 text-white" />
              <span className="text-[#DDD] text-lg font-medium">
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
