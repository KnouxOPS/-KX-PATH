import { useState, useEffect } from "react";
import {
  BarChart3,
  TrendingUp,
  Users,
  DollarSign,
  Calendar,
  MapPin,
  Zap,
  Bot,
  Radar,
  Eye,
  Award,
  Shield,
  Activity,
  Clock,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

interface KXPathDashboardProps {
  language: "en" | "ar";
  userRole: "admin" | "client" | "premium" | "field" | "researcher";
}

const translations = {
  en: {
    welcome: "Welcome to KX PATH",
    subtitle: "Smart Landscape Operating System",
    systemStatus: "System Status",
    quickStats: "Quick Statistics",
    liveProjects: "Live Projects",
    recentActivity: "Recent Activity",
    marketIntel: "Market Intelligence",
    aiInsights: "AI Insights",
    activeProjects: "Active Projects",
    totalRevenue: "Total Revenue",
    clientSatisfaction: "Client Satisfaction",
    teamEfficiency: "Team Efficiency",
    projectsCompleted: "Projects Completed",
    newLeads: "New Leads",
    systemHealth: "System Health",
    optimal: "Optimal",
    online: "Online",
    processing: "Processing",
    monitoring: "Monitoring",
    viewAll: "View All",
    quickActions: "Quick Actions",
    newProject: "New Project",
    generateDesign: "Generate AI Design",
    marketScan: "Market Scan",
    liveMonitoring: "Live Monitoring",
  },
  ar: {
    welcome: "مرحباً بك في طريق الخبرة",
    subtitle: "نظام تشغيل اللاندسكيب الذكي",
    systemStatus: "حالة النظام",
    quickStats: "الإحصائيات السريعة",
    liveProjects: "المشاريع المباشرة",
    recentActivity: "النشاط الحديث",
    marketIntel: "استخبارات السوق",
    aiInsights: "رؤى الذكاء الاصطناعي",
    activeProjects: "المشاريع النشطة",
    totalRevenue: "إجمالي الإيرادات",
    clientSatisfaction: "رضا العملاء",
    teamEfficiency: "كفاءة الفريق",
    projectsCompleted: "المشاريع المكتمل��",
    newLeads: "عملاء محتملون جدد",
    systemHealth: "صحة النظام",
    optimal: "مثلى",
    online: "متصل",
    processing: "جاري المعالجة",
    monitoring: "المراقبة",
    viewAll: "عرض الكل",
    quickActions: "الإجراءات السريعة",
    newProject: "مشروع جديد",
    generateDesign: "إنتاج تصميم ذكي",
    marketScan: "فحص السوق",
    liveMonitoring: "المراقبة المباشرة",
  },
};

const systemMetrics = [
  {
    icon: Activity,
    value: "143",
    label: "activeProjects",
    color: "emerald",
    trend: "+12%",
  },
  {
    icon: DollarSign,
    value: "2.4M",
    label: "totalRevenue",
    color: "green",
    trend: "+23%",
  },
  {
    icon: Users,
    value: "97.8%",
    label: "clientSatisfaction",
    color: "blue",
    trend: "+2.1%",
  },
  {
    icon: TrendingUp,
    value: "94%",
    label: "teamEfficiency",
    color: "purple",
    trend: "+8%",
  },
  {
    icon: CheckCircle,
    value: "1,247",
    label: "projectsCompleted",
    color: "teal",
    trend: "+156",
  },
  {
    icon: Radar,
    value: "89",
    label: "newLeads",
    color: "yellow",
    trend: "+34%",
  },
];

const systemStatus = [
  { component: "AI Design Engine", status: "optimal", icon: Bot },
  { component: "Smart Radar", status: "online", icon: Radar },
  { component: "Live Monitoring", status: "processing", icon: Eye },
  { component: "Market Data", status: "monitoring", icon: BarChart3 },
];

const recentActivities = [
  {
    id: 1,
    type: "project_update",
    title: "Royal Villa Landscape - 85% Complete",
    titleAr: "تنسيق فيلا ملكية - مكتمل 85%",
    time: "2 دقائق مضت",
    timeEn: "2 minutes ago",
    icon: MapPin,
    color: "emerald",
  },
  {
    id: 2,
    type: "ai_design",
    title: "AI Generated New Pool Design for Client #2847",
    titleAr: "تصميم ذكي جديد للمسبح للعميل #2847",
    time: "5 دقائق مضت",
    timeEn: "5 minutes ago",
    icon: Bot,
    color: "purple",
  },
  {
    id: 3,
    type: "market_intel",
    title: "New Lead Detected: Villa Purchase in Jumeirah",
    titleAr: "عميل محتمل جديد: شراء فيلا في الجميرا",
    time: "12 دقيقة مضت",
    timeEn: "12 minutes ago",
    icon: Radar,
    color: "blue",
  },
  {
    id: 4,
    type: "finance",
    title: "Invoice #INV-2024-0892 - Payment Received",
    titleAr: "فاتورة #INV-2024-0892 - تم استلام الدفعة",
    time: "25 دقيقة مضت",
    timeEn: "25 minutes ago",
    icon: DollarSign,
    color: "green",
  },
];

export default function KXPathDashboard({
  language,
  userRole,
}: KXPathDashboardProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [animatedMetrics, setAnimatedMetrics] = useState(
    systemMetrics.map(() => 0),
  );

  const t = translations[language];
  const isRTL = language === "ar";

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Animate metrics
    systemMetrics.forEach((metric, index) => {
      const numericValue = parseFloat(metric.value.replace(/[^\d.]/g, ""));
      let current = 0;
      const increment = numericValue / 50;
      const timer = setInterval(() => {
        current += increment;
        if (current >= numericValue) {
          current = numericValue;
          clearInterval(timer);
        }
        setAnimatedMetrics((prev) => {
          const newMetrics = [...prev];
          newMetrics[index] = current;
          return newMetrics;
        });
      }, 30);
    });
  }, []);

  const getColorClasses = (color: string) => {
    switch (color) {
      case "emerald":
        return "from-emerald-400 to-emerald-600";
      case "green":
        return "from-green-400 to-green-600";
      case "blue":
        return "from-blue-400 to-blue-600";
      case "purple":
        return "from-purple-400 to-purple-600";
      case "teal":
        return "from-teal-400 to-teal-600";
      case "yellow":
        return "from-yellow-400 to-orange-500";
      default:
        return "from-gray-400 to-gray-600";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "optimal":
        return "text-green-400";
      case "online":
        return "text-emerald-400";
      case "processing":
        return "text-yellow-400";
      case "monitoring":
        return "text-blue-400";
      default:
        return "text-gray-400";
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className={`${isRTL ? "text-right" : "text-left"}`}>
        <h1 className="text-4xl font-bold text-white mb-2">{t.welcome}</h1>
        <p className="text-emerald-300 text-xl opacity-90">{t.subtitle}</p>
        <div className="flex items-center gap-4 mt-4">
          <div className="text-gray-300">
            {currentTime.toLocaleDateString(
              language === "ar" ? "ar-SA" : "en-US",
              {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              },
            )}
          </div>
          <div className="text-emerald-400">
            {currentTime.toLocaleTimeString(
              language === "ar" ? "ar-SA" : "en-US",
            )}
          </div>
        </div>
      </div>

      {/* System Status Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          {/* Key Metrics */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 mb-6">
            <h3
              className={`text-xl font-semibold text-white mb-6 ${isRTL ? "text-right" : "text-left"}`}
            >
              {t.quickStats}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {systemMetrics.map((metric, index) => (
                <div
                  key={index}
                  className="bg-white/5 rounded-xl p-4 hover-scale interactive-card"
                >
                  <div
                    className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}
                  >
                    <div
                      className={`w-12 h-12 bg-gradient-to-br ${getColorClasses(metric.color)} rounded-xl flex items-center justify-center`}
                    >
                      <metric.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className={`${isRTL ? "text-right" : "text-left"}`}>
                      <div className="text-2xl font-bold text-white">
                        {metric.value.includes("%")
                          ? `${animatedMetrics[index].toFixed(1)}%`
                          : metric.value.includes("M")
                            ? `${(animatedMetrics[index] / 1000000).toFixed(1)}M`
                            : metric.value.includes("K")
                              ? `${(animatedMetrics[index] / 1000).toFixed(0)}K`
                              : Math.floor(
                                  animatedMetrics[index],
                                ).toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-300">
                        {t[metric.label as keyof typeof t]}
                      </div>
                      <div className="text-xs text-green-400 font-medium">
                        {metric.trend}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
            <h3
              className={`text-xl font-semibold text-white mb-6 ${isRTL ? "text-right" : "text-left"}`}
            >
              {t.recentActivity}
            </h3>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className={`flex items-center gap-4 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all ${isRTL ? "flex-row-reverse" : ""}`}
                >
                  <div
                    className={`w-10 h-10 bg-gradient-to-br ${getColorClasses(activity.color)} rounded-lg flex items-center justify-center flex-shrink-0`}
                  >
                    <activity.icon className="w-5 h-5 text-white" />
                  </div>
                  <div
                    className={`flex-1 ${isRTL ? "text-right" : "text-left"}`}
                  >
                    <div className="text-white font-medium text-sm">
                      {language === "ar" ? activity.titleAr : activity.title}
                    </div>
                    <div className="text-gray-400 text-xs">
                      {language === "ar" ? activity.time : activity.timeEn}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 transition-colors rounded-lg py-2 text-white font-medium">
              {t.viewAll}
            </button>
          </div>
        </div>

        {/* System Status & Quick Actions */}
        <div className="space-y-6">
          {/* System Status */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
            <h3
              className={`text-lg font-semibold text-white mb-4 ${isRTL ? "text-right" : "text-left"}`}
            >
              {t.systemStatus}
            </h3>
            <div className="space-y-3">
              {systemStatus.map((system, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}
                >
                  <system.icon className="w-5 h-5 text-gray-400" />
                  <div
                    className={`flex-1 ${isRTL ? "text-right" : "text-left"}`}
                  >
                    <div className="text-white text-sm">{system.component}</div>
                    <div
                      className={`text-xs font-medium ${getStatusColor(system.status)}`}
                    >
                      {t[system.status as keyof typeof t]}
                    </div>
                  </div>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
            <h3
              className={`text-lg font-semibold text-white mb-4 ${isRTL ? "text-right" : "text-left"}`}
            >
              {t.quickActions}
            </h3>
            <div className="space-y-3">
              <button className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold py-3 px-4 rounded-lg hover:scale-105 transition-all">
                {t.newProject}
              </button>
              <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-3 px-4 rounded-lg hover:scale-105 transition-all">
                {t.generateDesign}
              </button>
              <button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold py-3 px-4 rounded-lg hover:scale-105 transition-all">
                {t.marketScan}
              </button>
              <button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold py-3 px-4 rounded-lg hover:scale-105 transition-all">
                {t.liveMonitoring}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
