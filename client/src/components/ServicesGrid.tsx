import { TreePine, Waves, Lightbulb, Wrench, Bot, Camera } from "lucide-react";

interface ServicesGridProps {
  language: "en" | "ar";
}

const translations = {
  en: {
    services: "Our Services",
    getQuote: "Get Quote",
    landscapeDesign: "Landscape Design",
    landscapeDesc: "Professional garden and landscape design services",
    poolConstruction: "Pool Construction",
    poolDesc: "Swimming pool design and construction",
    smartIrrigation: "Smart Irrigation",
    irrigationDesc: "Automated watering systems with IoT sensors",
    lighting: "Outdoor Lighting",
    lightingDesc: "LED and smart lighting solutions",
    maintenance: "Maintenance",
    maintenanceDesc: "Regular maintenance and care services",
    aiDesign: "AI Design Studio",
    aiDesc: "AI-powered landscape design generation",
  },
  ar: {
    services: "خدماتنا",
    getQuote: "طلب عرض سعر",
    landscapeDesign: "تصميم المناظر الطبيعية",
    landscapeDesc: "خدمات تصميم الحدائق والمناظر الطبيعية الاحترافية",
    poolConstruction: "إنشاء المسابح",
    poolDesc: "تصميم وإنشاء أحواض السباحة",
    smartIrrigation: "الري الذكي",
    irrigationDesc: "أنظمة الري الآلية مع أجهزة استشعار الإنترنت",
    lighting: "الإضاءة الخارجية",
    lightingDesc: "حلول الإضاءة LED والذكية",
    maintenance: "الصيانة",
    maintenanceDesc: "خدمات الصيانة والعناية المنتظمة",
    aiDesign: "ستوديو التصميم الذكي",
    aiDesc: "إنتاج تصاميم المناظر الطبيعية بالذكاء الاصطناعي",
  },
};

const services = [
  {
    icon: TreePine,
    key: "landscapeDesign",
    color: "emerald",
    gradient: "from-emerald-400 to-green-500",
  },
  {
    icon: Waves,
    key: "poolConstruction",
    color: "blue",
    gradient: "from-blue-400 to-cyan-500",
  },
  {
    icon: Lightbulb,
    key: "smartIrrigation",
    color: "teal",
    gradient: "from-teal-400 to-emerald-500",
  },
  {
    icon: Camera,
    key: "lighting",
    color: "yellow",
    gradient: "from-yellow-400 to-orange-500",
  },
  {
    icon: Wrench,
    key: "maintenance",
    color: "gray",
    gradient: "from-gray-400 to-slate-500",
  },
  {
    icon: Bot,
    key: "aiDesign",
    color: "purple",
    gradient: "from-purple-400 to-pink-500",
  },
];

export default function ServicesGrid({ language }: ServicesGridProps) {
  const t = translations[language];
  const isRTL = language === "ar";

  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20">
      <h3
        className={`text-xl font-semibold text-white mb-6 ${isRTL ? "text-right" : "text-left"}`}
      >
        {t.services}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div key={service.key} className="group relative">
            {/* Service Card */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 hover:bg-white/10 transition-all duration-300 cursor-pointer border border-white/10 hover:border-white/20 hover:scale-105">
              {/* Icon */}
              <div
                className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                <service.icon className="w-8 h-8 text-white" />
              </div>

              {/* Content */}
              <div className={`${isRTL ? "text-right" : "text-left"}`}>
                <h4 className="text-white font-semibold text-lg mb-2">
                  {t[service.key as keyof typeof t]}
                </h4>
                <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                  {t[`${service.key}Desc` as keyof typeof t]}
                </p>

                {/* CTA Button */}
                <button
                  className={`w-full bg-gradient-to-r ${service.gradient} text-white font-medium py-2 px-4 rounded-lg hover:opacity-90 transition-opacity`}
                >
                  {t.getQuote}
                </button>
              </div>
            </div>

            {/* Hover Effect */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300 pointer-events-none`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
