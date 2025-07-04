import { useState, useEffect } from "react";
import {
  Globe,
  Trophy,
  Star,
  TrendingUp,
  Users,
  MapPin,
  Calendar,
  Bell,
  Zap,
  Shield,
  Award,
  Target,
} from "lucide-react";

interface WorldClassFeaturesProps {
  language: "en" | "ar";
}

const translations = {
  en: {
    globalStats: "Global Impact",
    projectsWorldwide: "Projects Worldwide",
    countriesServed: "Countries Served",
    happyClients: "Happy Clients",
    awardWinning: "Award Winning",
    certifications: "International Certifications",
    iso9001: "ISO 9001:2015 Quality Management",
    iso14001: "ISO 14001:2015 Environmental",
    leed: "LEED Green Building Certified",
    expertise: "20+ Years of Excellence",
    realTimeUpdates: "Live Global Operations",
    marketLeader: "Market Leader in MENA",
    innovation: "AI-Powered Innovation",
    sustainability: "Sustainable Practices",
  },
  ar: {
    globalStats: "التأثير العالمي",
    projectsWorldwide: "المشاريع حول العالم",
    countriesServed: "الدول المخدومة",
    happyClients: "العملاء السعداء",
    awardWinning: "حائزة على جوائز",
    certifications: "الشهادات الدولية",
    iso9001: "شهادة ISO 9001:2015 لإدارة الجودة",
    iso14001: "شهادة ISO 14001:2015 البيئية",
    leed: "شهادة LEED للمباني الخضراء",
    expertise: "أكثر من 20 عاماً من التميز",
    realTimeUpdates: "العمليات العالمية المباشرة",
    marketLeader: "الرائدة في منطقة الشرق الأوسط",
    innovation: "الابتكار بالذكاء الاصطناعي",
    sustainability: "الممارسات المستدامة",
  },
};

const globalStats = [
  { value: 5420, label: "projectsWorldwide", icon: Globe, suffix: "+" },
  { value: 47, label: "countriesServed", icon: MapPin, suffix: "" },
  { value: 12650, label: "happyClients", icon: Users, suffix: "+" },
  { value: 98.7, label: "satisfaction", icon: Star, suffix: "%" },
];

const achievements = [
  { icon: Trophy, key: "awardWinning", color: "yellow" },
  { icon: Shield, key: "iso9001", color: "blue" },
  { icon: Award, key: "leed", color: "green" },
  { icon: Target, key: "marketLeader", color: "purple" },
];

export default function WorldClassFeatures({
  language,
}: WorldClassFeaturesProps) {
  const [animatedStats, setAnimatedStats] = useState(globalStats.map(() => 0));
  const [showAchievements, setShowAchievements] = useState(false);

  const t = translations[language];
  const isRTL = language === "ar";

  useEffect(() => {
    // Animate numbers
    globalStats.forEach((stat, index) => {
      let current = 0;
      const increment = stat.value / 50;
      const timer = setInterval(() => {
        current += increment;
        if (current >= stat.value) {
          current = stat.value;
          clearInterval(timer);
        }
        setAnimatedStats((prev) => {
          const newStats = [...prev];
          newStats[index] = Math.floor(current);
          return newStats;
        });
      }, 50);
    });

    // Show achievements after stats
    setTimeout(() => setShowAchievements(true), 2000);
  }, []);

  const getColorClasses = (color: string) => {
    switch (color) {
      case "yellow":
        return "from-yellow-400 to-orange-500";
      case "blue":
        return "from-blue-400 to-cyan-500";
      case "green":
        return "from-green-400 to-emerald-500";
      case "purple":
        return "from-purple-400 to-pink-500";
      default:
        return "from-gray-400 to-gray-500";
    }
  };

  return (
    <div className="space-y-8">
      {/* Global Impact Header */}
      <div
        className={`text-center mb-12 ${isRTL ? "text-right" : "text-left"}`}
      >
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center animate-glow">
            <Globe className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white">{t.globalStats}</h2>
        </div>
        <p className="text-emerald-300 text-lg opacity-90">
          {language === "ar"
            ? "نقود ثورة تقنية في مجال اللاندسكيب عالمياً"
            : "Leading the global landscape technology revolution"}
        </p>
      </div>

      {/* Animated Global Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {globalStats.map((stat, index) => (
          <div
            key={index}
            className="glass-nature rounded-2xl p-6 hover-lift interactive-card"
          >
            <div
              className={`flex items-center gap-4 ${isRTL ? "flex-row-reverse" : ""}`}
            >
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center animate-glow">
                <stat.icon className="w-7 h-7 text-white" />
              </div>
              <div className={`${isRTL ? "text-right" : "text-left"}`}>
                <div className="text-3xl font-bold text-white gradient-text">
                  {animatedStats[index].toLocaleString()}
                  {stat.suffix}
                </div>
                <div className="text-emerald-300 text-sm font-medium">
                  {t[stat.label as keyof typeof t]}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* World-Class Achievements */}
      <div
        className={`transition-all duration-1000 ${showAchievements ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="glass-nature rounded-2xl p-8">
          <h3
            className={`text-2xl font-bold text-white mb-6 ${isRTL ? "text-right" : "text-left"}`}
          >
            {t.certifications}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className={`bg-white/5 rounded-xl p-6 hover-scale interactive-card animate-scale-in delay-${index * 200}`}
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${getColorClasses(achievement.color)} rounded-2xl flex items-center justify-center mb-4 mx-auto animate-rotate-in`}
                >
                  <achievement.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-center">
                  <div className="text-white font-semibold mb-2">
                    {t[achievement.key as keyof typeof t]}
                  </div>
                  <div className="text-xs text-emerald-300 opacity-80">
                    {language === "ar"
                      ? "معتمد دولياً"
                      : "Internationally Certified"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Live Operations Monitor */}
      <div className="glass-nature rounded-2xl p-8">
        <div
          className={`flex items-center justify-between mb-6 ${isRTL ? "flex-row-reverse" : ""}`}
        >
          <h3 className="text-xl font-bold text-white">{t.realTimeUpdates}</h3>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
            <span className="text-green-400 text-sm font-medium">
              {language === "ar" ? "م��صل مباشرة" : "Live Connected"}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Active Projects Map */}
          <div className="bg-white/5 rounded-xl p-4">
            <div className="text-center mb-4">
              <div className="text-2xl font-bold text-emerald-400">143</div>
              <div className="text-sm text-white opacity-80">
                {language === "ar" ? "مشاريع نشطة الآن" : "Active Projects Now"}
              </div>
            </div>
            <div className="relative h-20 bg-emerald-900/30 rounded-lg overflow-hidden">
              {/* Mini world map visualization */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-teal-400/20" />
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-emerald-400 rounded-full animate-pulse"
                  style={{
                    left: `${Math.random() * 80 + 10}%`,
                    top: `${Math.random() * 60 + 20}%`,
                    animationDelay: `${i * 0.5}s`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Team Status */}
          <div className="bg-white/5 rounded-xl p-4">
            <div className="text-center mb-4">
              <div className="text-2xl font-bold text-blue-400">89</div>
              <div className="text-sm text-white opacity-80">
                {language === "ar" ? "فريق العمل النشط" : "Active Team Members"}
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-gray-300">
                  {language === "ar" ? "المهندسين" : "Engineers"}
                </span>
                <span className="text-blue-400">34</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-300">
                  {language === "ar" ? "الفنيين" : "Technicians"}
                </span>
                <span className="text-green-400">28</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-300">
                  {language === "ar" ? "المديرين" : "Managers"}
                </span>
                <span className="text-purple-400">12</span>
              </div>
            </div>
          </div>

          {/* Revenue Tracker */}
          <div className="bg-white/5 rounded-xl p-4">
            <div className="text-center mb-4">
              <div className="text-2xl font-bold text-yellow-400">$2.4M</div>
              <div className="text-sm text-white opacity-80">
                {language === "ar" ? "الإيرادات هذا الشهر" : "Monthly Revenue"}
              </div>
            </div>
            <div className="flex items-center justify-center">
              <TrendingUp className="w-8 h-8 text-green-400 animate-bounce" />
              <span className="text-green-400 font-bold ml-2">+23%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Innovation Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-nature rounded-2xl p-8">
          <div
            className={`flex items-center gap-4 mb-6 ${isRTL ? "flex-row-reverse" : ""}`}
          >
            <Zap className="w-8 h-8 text-yellow-400 animate-light-flicker" />
            <h3 className="text-xl font-bold text-white">{t.innovation}</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-emerald-300">
                {language === "ar"
                  ? "تحليل الصور بالذكاء الاصطناعي"
                  : "AI-Powered Image Analysis"}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse" />
              <span className="text-teal-300">
                {language === "ar"
                  ? "التنبؤ بأداء النباتات"
                  : "Plant Performance Prediction"}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              <span className="text-blue-300">
                {language === "ar"
                  ? "أنظمة الري الذكية"
                  : "Smart Irrigation Systems"}
              </span>
            </div>
          </div>
        </div>

        <div className="glass-nature rounded-2xl p-8">
          <div
            className={`flex items-center gap-4 mb-6 ${isRTL ? "flex-row-reverse" : ""}`}
          >
            <Award className="w-8 h-8 text-green-400 animate-glow" />
            <h3 className="text-xl font-bold text-white">{t.sustainability}</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-green-300">
                {language === "ar"
                  ? "توفير 40% من استهلاك المياه"
                  : "40% Water Consumption Reduction"}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-emerald-300">
                {language === "ar"
                  ? "استخدام طاقة متجددة 100%"
                  : "100% Renewable Energy Usage"}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse" />
              <span className="text-teal-300">
                {language === "ar"
                  ? "شهادة الكربون المحايد"
                  : "Carbon Neutral Certified"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
