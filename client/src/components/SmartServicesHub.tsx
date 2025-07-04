import { useState } from "react";
import {
  TreePine,
  Waves,
  Lightbulb,
  Wrench,
  Camera,
  Truck,
  Shield,
  Flower2,
  Mountain,
  Droplets,
  Zap,
  Cpu,
  Search,
  Filter,
  Star,
  MapPin,
  Clock,
  DollarSign,
} from "lucide-react";

interface SmartServicesHubProps {
  language: "en" | "ar";
  userRole: "admin" | "client" | "premium" | "field" | "researcher";
}

const translations = {
  en: {
    smartServices: "Smart Services Hub",
    subtitle: "Comprehensive Landscape Solutions",
    searchServices: "Search services...",
    allCategories: "All Categories",
    landscapeDesign: "Landscape Design",
    poolConstruction: "Pool Construction",
    irrigation: "Smart Irrigation",
    lighting: "Outdoor Lighting",
    maintenance: "Maintenance",
    decoration: "Garden Decoration",
    requestQuote: "Request Quote",
    viewDetails: "View Details",
    bookService: "Book Service",
    premium: "Premium",
    popular: "Popular",
    new: "New",
    rating: "Rating",
    from: "From",
    duration: "Duration",
    availability: "Available Now",
  },
  ar: {
    smartServices: "مركز الخدمات الذكية",
    subtitle: "حلول شاملة للمناظر الطبيعية",
    searchServices: "البحث في الخدمات...",
    allCategories: "جميع الفئات",
    landscapeDesign: "تصميم المناظر الطبيعية",
    poolConstruction: "إنشاء المسابح",
    irrigation: "الري الذكي",
    lighting: "الإضاءة الخارجية",
    maintenance: "الصيانة",
    decoration: "ديكور الحدائق",
    requestQuote: "طلب عرض سعر",
    viewDetails: "عرض التفاصيل",
    bookService: "حجز الخدمة",
    premium: "مميز",
    popular: "شائع",
    new: "جديد",
    rating: "التقييم",
    from: "من",
    duration: "المدة",
    availability: "متوفر الآن",
  },
};

const serviceCategories = [
  { key: "all", labelEn: "All Categories", labelAr: "جميع الفئات" },
  { key: "design", labelEn: "Design", labelAr: "التصميم" },
  { key: "construction", labelEn: "Construction", labelAr: "الإنشاء" },
  { key: "systems", labelEn: "Smart Systems", labelAr: "الأنظمة الذكية" },
  { key: "maintenance", labelEn: "Maintenance", labelAr: "الصيانة" },
  { key: "decoration", labelEn: "Decoration", labelAr: "الديكور" },
];

const smartServices = [
  {
    id: 1,
    nameEn: "AI-Powered Garden Design",
    nameAr: "تصميم الحدائق بالذكاء الاصطناعي",
    category: "design",
    icon: TreePine,
    gradient: "from-emerald-400 to-green-500",
    price: "2,500",
    duration: "7-14 أيام",
    durationEn: "7-14 days",
    rating: 4.9,
    reviews: 156,
    badge: "premium",
    descriptionEn:
      "Advanced AI generates personalized garden designs based on your preferences, climate, and space.",
    descriptionAr:
      "الذكاء الاصطناعي المتقدم ينتج تصاميم حدائق مخصصة حسب تفضيلاتك والمناخ والمساحة.",
    features: [
      "3D Visualization",
      "Plant Selection AI",
      "Climate Analysis",
      "Maintenance Schedule",
    ],
  },
  {
    id: 2,
    nameEn: "Smart Swimming Pool Construction",
    nameAr: "إنشاء مسابح ذكية",
    category: "construction",
    icon: Waves,
    gradient: "from-blue-400 to-cyan-500",
    price: "45,000",
    duration: "21-30 يوم",
    durationEn: "21-30 days",
    rating: 4.8,
    reviews: 89,
    badge: "popular",
    descriptionEn:
      "Complete smart pool construction with automated systems, LED lighting, and remote control.",
    descriptionAr:
      "إنشاء مسابح ذكية كاملة مع أنظمة آلية وإضاءة LED والتحكم عن بُعد.",
    features: [
      "Smart Filtration",
      "LED Lighting",
      "Remote Control",
      "Safety Systems",
    ],
  },
  {
    id: 3,
    nameEn: "IoT Irrigation System",
    nameAr: "نظام الري الذكي",
    category: "systems",
    icon: Droplets,
    gradient: "from-teal-400 to-emerald-500",
    price: "3,200",
    duration: "3-5 أيام",
    durationEn: "3-5 days",
    rating: 4.7,
    reviews: 234,
    badge: "new",
    descriptionEn:
      "Automated irrigation with soil sensors, weather integration, and mobile app control.",
    descriptionAr:
      "الري الآلي مع أجهزة استشعار التربة ودمج الطقس والتحكم عبر التطبيق.",
    features: [
      "Soil Sensors",
      "Weather API",
      "Mobile Control",
      "Water Analytics",
    ],
  },
  {
    id: 4,
    nameEn: "Smart Outdoor Lighting",
    nameAr: "الإضاءة الخارجية الذكية",
    category: "systems",
    icon: Lightbulb,
    gradient: "from-yellow-400 to-orange-500",
    price: "1,800",
    duration: "2-3 أيام",
    durationEn: "2-3 days",
    rating: 4.6,
    reviews: 178,
    badge: "popular",
    descriptionEn:
      "LED smart lighting with motion sensors, color changing, and programmable schedules.",
    descriptionAr:
      "إضاءة LED ذكية مع أجهزة استشعار الحركة وتغيير الألوان والجداول القابلة للبرمجة.",
    features: [
      "Motion Sensors",
      "Color Changing",
      "Schedule Control",
      "Energy Efficient",
    ],
  },
  {
    id: 5,
    nameEn: "Vertical Garden Systems",
    nameAr: "أنظمة الحدائق العمودية",
    category: "design",
    icon: Mountain,
    gradient: "from-green-400 to-emerald-500",
    price: "4,500",
    duration: "5-7 أيام",
    durationEn: "5-7 days",
    rating: 4.8,
    reviews: 67,
    badge: "premium",
    descriptionEn:
      "Modern vertical gardens with automated watering and nutrient delivery systems.",
    descriptionAr: "حدائق عمودية عص��ية مع أنظمة الري الآلي وتوصيل المغذيات.",
    features: [
      "Auto Watering",
      "Nutrient System",
      "Air Purification",
      "Space Efficient",
    ],
  },
  {
    id: 6,
    nameEn: "Complete Maintenance Package",
    nameAr: "باقة الصيانة الشاملة",
    category: "maintenance",
    icon: Wrench,
    gradient: "from-gray-400 to-slate-500",
    price: "599/شهر",
    duration: "خدمة مستمرة",
    durationEn: "Ongoing service",
    rating: 4.9,
    reviews: 312,
    badge: "popular",
    descriptionEn:
      "Regular maintenance, plant care, system checks, and emergency repairs.",
    descriptionAr:
      "الصيانة المنتظمة وعناية النباتات وفحص الأنظمة والإصلاحات الطارئة.",
    features: [
      "Weekly Visits",
      "Plant Care",
      "System Maintenance",
      "Emergency Support",
    ],
  },
];

export default function SmartServicesHub({
  language,
  userRole,
}: SmartServicesHubProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedService, setSelectedService] = useState<number | null>(null);

  const t = translations[language];
  const isRTL = language === "ar";

  const filteredServices = smartServices.filter((service) => {
    const matchesCategory =
      selectedCategory === "all" || service.category === selectedCategory;
    const matchesSearch =
      service.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.nameAr.includes(searchTerm);
    return matchesCategory && matchesSearch;
  });

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case "premium":
        return "bg-gradient-to-r from-yellow-400 to-orange-500";
      case "popular":
        return "bg-gradient-to-r from-green-400 to-emerald-500";
      case "new":
        return "bg-gradient-to-r from-blue-400 to-cyan-500";
      default:
        return "bg-gray-500";
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-400"}`}
      />
    ));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className={`${isRTL ? "text-right" : "text-left"}`}>
        <h1 className="text-3xl font-bold text-white mb-2">
          {t.smartServices}
        </h1>
        <p className="text-emerald-300 text-lg opacity-90">{t.subtitle}</p>
      </div>

      {/* Search and Filters */}
      <div className={`flex gap-4 ${isRTL ? "flex-row-reverse" : ""}`}>
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder={t.searchServices}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400"
          />
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-400"
        >
          {serviceCategories.map((category) => (
            <option key={category.key} value={category.key}>
              {language === "ar" ? category.labelAr : category.labelEn}
            </option>
          ))}
        </select>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 overflow-hidden hover-lift interactive-card group"
          >
            {/* Service Header */}
            <div className="relative p-6 pb-4">
              {/* Badge */}
              <div
                className={`absolute top-4 ${isRTL ? "left-4" : "right-4"} px-3 py-1 rounded-full text-xs font-medium text-white ${getBadgeColor(service.badge)}`}
              >
                {t[service.badge as keyof typeof t]}
              </div>

              {/* Icon */}
              <div
                className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                <service.icon className="w-8 h-8 text-white" />
              </div>

              {/* Service Info */}
              <h3 className="text-white font-bold text-lg mb-2">
                {language === "ar" ? service.nameAr : service.nameEn}
              </h3>

              <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                {language === "ar"
                  ? service.descriptionAr
                  : service.descriptionEn}
              </p>

              {/* Rating */}
              <div
                className={`flex items-center gap-2 mb-4 ${isRTL ? "flex-row-reverse" : ""}`}
              >
                <div
                  className={`flex gap-1 ${isRTL ? "flex-row-reverse" : ""}`}
                >
                  {renderStars(service.rating)}
                </div>
                <span className="text-white font-medium">{service.rating}</span>
                <span className="text-gray-400 text-sm">
                  ({service.reviews})
                </span>
              </div>

              {/* Features */}
              <div className="space-y-2 mb-4">
                {service.features.slice(0, 3).map((feature, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-2 text-sm text-emerald-300 ${isRTL ? "flex-row-reverse" : ""}`}
                  >
                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Service Footer */}
            <div className="px-6 pb-6">
              <div
                className={`flex items-center justify-between mb-4 ${isRTL ? "flex-row-reverse" : ""}`}
              >
                <div className={`${isRTL ? "text-right" : "text-left"}`}>
                  <div className="text-emerald-400 font-bold text-xl">
                    {t.from} {service.price} {language === "ar" ? "ر.س" : "SAR"}
                  </div>
                  <div className="text-gray-400 text-sm flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {language === "ar" ? service.duration : service.durationEn}
                  </div>
                </div>
                <div className="text-green-400 text-sm font-medium">
                  {t.availability}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <button
                  className={`w-full bg-gradient-to-r ${service.gradient} text-white font-semibold py-3 px-4 rounded-lg hover:scale-105 transition-all`}
                >
                  {userRole === "premium" ? t.bookService : t.requestQuote}
                </button>
                <button
                  onClick={() =>
                    setSelectedService(
                      selectedService === service.id ? null : service.id,
                    )
                  }
                  className="w-full bg-white/10 hover:bg-white/20 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  {t.viewDetails}
                </button>
              </div>
            </div>

            {/* Expanded Details */}
            {selectedService === service.id && (
              <div className="px-6 pb-6 border-t border-white/10 pt-4 animate-slide-in-bottom">
                <div className="space-y-3">
                  <h4 className="text-white font-semibold">
                    {language === "ar" ? "جميع الميزات:" : "All Features:"}
                  </h4>
                  {service.features.map((feature, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-2 text-sm text-gray-300 ${isRTL ? "flex-row-reverse" : ""}`}
                    >
                      <div className="w-2 h-2 bg-emerald-400 rounded-full" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredServices.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-300 text-lg">
            {language === "ar"
              ? "لم يتم العثور على خدمات"
              : "No services found"}
          </p>
        </div>
      )}
    </div>
  );
}
