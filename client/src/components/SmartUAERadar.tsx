import { useState, useEffect } from "react";
import {
  Radar,
  Zap,
  Target,
  TrendingUp,
  MapPin,
  DollarSign,
  Clock,
  Users,
  Building2,
  Home,
  AlertTriangle,
  CheckCircle,
  Send,
} from "lucide-react";

interface SmartUAERadarProps {
  language: "en" | "ar";
}

interface OpportunityAlert {
  id: string;
  type:
    | "new_construction"
    | "property_sale"
    | "land_purchase"
    | "development_permit"
    | "market_trend";
  title_ar: string;
  title_en: string;
  description_ar: string;
  description_en: string;
  area: string;
  coordinates: { lat: number; lng: number };
  opportunity_score: number;
  estimated_value: number;
  urgency: "low" | "medium" | "high" | "critical";
  detected_at: string;
  expires_at: string;
  status:
    | "new"
    | "contacted"
    | "qualified"
    | "proposal_sent"
    | "closed_won"
    | "closed_lost";
  auto_actions: string[];
  generated_leads: number;
  confidence_level: number;
}

interface RadarStats {
  total_opportunities: number;
  high_score_opportunities: number;
  active_monitoring_areas: number;
  success_rate: number;
  avg_response_time: number; // in minutes
  monthly_conversion: number;
}

export default function SmartUAERadar({ language }: SmartUAERadarProps) {
  const [activeTab, setActiveTab] = useState<
    "live" | "processed" | "analytics"
  >("live");
  const [filterType, setFilterType] = useState<string>("all");
  const [radarActive, setRadarActive] = useState(true);
  const [autoGenerate, setAutoGenerate] = useState(true);
  const [selectedOpportunity, setSelectedOpportunity] =
    useState<OpportunityAlert | null>(null);

  // Mock data - في النظام الحقيقي ستأتي من الخادم
  const [opportunities, setOpportunities] = useState<OpportunityAlert[]>([
    {
      id: "OPP_2024_001",
      type: "new_construction",
      title_ar: "🏗️ فيلا فاخرة جديدة - الخالدية أبوظبي",
      title_en: "🏗️ New Luxury Villa - Al Khalidiyah Abu Dhabi",
      description_ar:
        "رصد بن��ء فيلا جديدة بمساحة 1200 متر مربع مع حديقة خلفية كبيرة. المالك من رجال الأعمال المحليين. احتمالية عالية للحاجة لخدمات تنسيق حدائق فاخرة.",
      description_en:
        "Detected new villa construction with 1200 sqm area and large backyard. Owner is local businessman. High probability for luxury landscaping services need.",
      area: "أبوظبي - الخالدية",
      coordinates: { lat: 24.425, lng: 54.605 },
      opportunity_score: 94,
      estimated_value: 850000,
      urgency: "high",
      detected_at: "2024-01-22T09:15:00Z",
      expires_at: "2024-01-29T09:15:00Z",
      status: "new",
      auto_actions: [
        "تم إنشاء عرض تصميم أولي",
        "تم إرسال رسالة تعريفية",
        "جدولة اتصال متابعة",
      ],
      generated_leads: 1,
      confidence_level: 91,
    },
    {
      id: "OPP_2024_002",
      type: "property_sale",
      title_ar: "🏡 بيع فيلا بحديقة كبيرة - الجميرا",
      title_en: "🏡 Villa with Large Garden Sold - Jumeirah",
      description_ar:
        "تم بيع فيلا مع حديقة 1500 متر مربع في الجميرا. المالك الجديد شركة استثمارية أجنبية. الحديقة تحتاج ��جديد كامل.",
      description_en:
        "Villa with 1500 sqm garden sold in Jumeirah. New owner is foreign investment company. Garden needs complete renovation.",
      area: "دبي - الجميرا",
      coordinates: { lat: 25.21, lng: 55.275 },
      opportunity_score: 88,
      estimated_value: 1200000,
      urgency: "medium",
      detected_at: "2024-01-22T11:30:00Z",
      expires_at: "2024-01-29T11:30:00Z",
      status: "contacted",
      auto_actions: [
        "تم تحليل الموقع بالذكاء الاصطناعي",
        "تم إنشاء مقترح أولي",
        "إرسال عرض تفصيلي",
      ],
      generated_leads: 1,
      confidence_level: 85,
    },
    {
      id: "OPP_2024_003",
      type: "development_permit",
      title_ar: "📋 ترخيص مجمع سكني 50 فيلا - الشارقة",
      title_en: "📋 50-Villa Residential Complex Permit - Sharjah",
      description_ar:
        "تم منح ترخيص لبناء مجمع سكني يضم 50 فيلا في الخوانيج. الشركة المطورة معروفة بمشاريعها الفاخرة. فرصة للحصول على عقد شامل.",
      description_en:
        "Permit granted for 50-villa residential complex in Al Khawaneej. Developer known for luxury projects. Opportunity for comprehensive contract.",
      area: "الشارقة - الخوانيج",
      coordinates: { lat: 25.19, lng: 55.47 },
      opportunity_score: 97,
      estimated_value: 3500000,
      urgency: "critical",
      detected_at: "2024-01-22T14:00:00Z",
      expires_at: "2024-02-05T14:00:00Z",
      status: "qualified",
      auto_actions: [
        "تحليل المطور والمشاريع السابقة",
        "إعداد عرض تقديمي شامل",
        "تحديد موعد اجتماع",
      ],
      generated_leads: 3,
      confidence_level: 96,
    },
    {
      id: "OPP_2024_004",
      type: "market_trend",
      title_ar: "📈 زيادة الطلب على المسابح الذكية - دبي",
      title_en: "📈 Increased Demand for Smart Pools - Dubai",
      description_ar:
        'رصد زيادة 340% في البحث عن "مسابح ذكية" و "أنظمة ري أوتوماتيكية" في دبي خلال آخر 30 يوم. فرصة لحملة تسويقية مستهدفة.',
      description_en:
        '340% increase detected in searches for "smart pools" and "automatic irrigation" in Dubai over last 30 days. Opportunity for targeted marketing campaign.',
      area: "دبي - عام",
      coordinates: { lat: 25.2048, lng: 55.2762 },
      opportunity_score: 82,
      estimated_value: 2200000,
      urgency: "medium",
      detected_at: "2024-01-22T16:45:00Z",
      expires_at: "2024-02-22T16:45:00Z",
      status: "new",
      auto_actions: [
        "إنشاء حملة تسويق رقمي",
        "تصميم عروض خاصة للمسابح",
        "تحديث محتوى الموقع",
      ],
      generated_leads: 0,
      confidence_level: 78,
    },
  ]);

  const radarStats: RadarStats = {
    total_opportunities: 127,
    high_score_opportunities: 34,
    active_monitoring_areas: 15,
    success_rate: 73.5,
    avg_response_time: 12,
    monthly_conversion: 8.2,
  };

  const opportunityTypes = [
    {
      id: "all",
      name_ar: "جميع الفرص",
      name_en: "All Opportunities",
      count: opportunities.length,
    },
    {
      id: "new_construction",
      name_ar: "بناء جديد",
      name_en: "New Construction",
      count: opportunities.filter((o) => o.type === "new_construction").length,
    },
    {
      id: "property_sale",
      name_ar: "بيع عقارات",
      name_en: "Property Sales",
      count: opportunities.filter((o) => o.type === "property_sale").length,
    },
    {
      id: "development_permit",
      name_ar: "تراخيص تطوير",
      name_en: "Development Permits",
      count: opportunities.filter((o) => o.type === "development_permit")
        .length,
    },
    {
      id: "market_trend",
      name_ar: "اتجاهات السوق",
      name_en: "Market Trends",
      count: opportunities.filter((o) => o.type === "market_trend").length,
    },
  ];

  const filteredOpportunities =
    filterType === "all"
      ? opportunities
      : opportunities.filter((opp) => opp.type === filterType);

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "critical":
        return "from-red-500 to-red-600 border-red-400";
      case "high":
        return "from-orange-500 to-red-500 border-orange-400";
      case "medium":
        return "from-yellow-500 to-orange-500 border-yellow-400";
      default:
        return "from-blue-500 to-blue-600 border-blue-400";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-red-500/20 text-red-300 border-red-400/30";
      case "contacted":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-400/30";
      case "qualified":
        return "bg-blue-500/20 text-blue-300 border-blue-400/30";
      case "proposal_sent":
        return "bg-purple-500/20 text-purple-300 border-purple-400/30";
      case "closed_won":
        return "bg-green-500/20 text-green-300 border-green-400/30";
      case "closed_lost":
        return "bg-gray-500/20 text-gray-300 border-gray-400/30";
      default:
        return "bg-slate-500/20 text-slate-300 border-slate-400/30";
    }
  };

  const handleQuickAction = (opportunityId: string, action: string) => {
    setOpportunities((prev) =>
      prev.map((opp) => {
        if (opp.id === opportunityId) {
          let newStatus = opp.status;
          if (action === "contact") newStatus = "contacted";
          else if (action === "qualify") newStatus = "qualified";
          else if (action === "send_proposal") newStatus = "proposal_sent";

          return { ...opp, status: newStatus };
        }
        return opp;
      }),
    );
  };

  const generateSmartOffer = (opportunity: OpportunityAlert) => {
    // في النظام الحقيقي، هذا سيستدعي الذكاء الاصطناعي لتوليد عرض مخصص
    console.log("Generating smart offer for:", opportunity.id);
    alert(
      language === "ar"
        ? `تم توليد عرض ذكي لـ ${opportunity.title_ar}`
        : `Smart offer generated for ${opportunity.title_en}`,
    );
  };

  return (
    <div className="space-y-6" dir={language === "ar" ? "rtl" : "ltr"}>
      {/* Header with Radar Status */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div
              className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                radarActive
                  ? "bg-gradient-to-br from-green-500 to-emerald-600 animate-pulse"
                  : "bg-gradient-to-br from-gray-500 to-gray-600"
              }`}
            >
              <Radar
                className={`w-8 h-8 text-white ${radarActive ? "animate-spin" : ""}`}
              />
            </div>
            {radarActive && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-ping"></div>
            )}
          </div>

          <div>
            <h2 className="text-3xl font-bold text-emerald-300">
              {language === "ar"
                ? "🛰️ الرادار الذكي الإماراتي"
                : "🛰️ Smart UAE Radar"}
            </h2>
            <p className="text-emerald-400">
              {language === "ar"
                ? "نظام رصد الفرص العقارية والتجارية"
                : "Real Estate & Commercial Opportunity Detection System"}
            </p>
            <div className="flex items-center gap-4 mt-2">
              <div
                className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
                  radarActive
                    ? "bg-green-500/20 text-green-300"
                    : "bg-gray-500/20 text-gray-300"
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full ${radarActive ? "bg-green-400 animate-pulse" : "bg-gray-400"}`}
                ></div>
                {radarActive
                  ? language === "ar"
                    ? "نشط"
                    : "Active"
                  : language === "ar"
                    ? "متوقف"
                    : "Inactive"}
              </div>

              <div className="text-sm text-emerald-400">
                {language === "ar" ? "آخر فحص:" : "Last Scan:"}{" "}
                {language === "ar" ? "منذ 3 دقائق" : "3 minutes ago"}
              </div>
            </div>
          </div>
        </div>

        {/* Radar Controls */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setRadarActive(!radarActive)}
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              radarActive
                ? "bg-red-500 hover:bg-red-600 text-white"
                : "bg-green-500 hover:bg-green-600 text-white"
            }`}
          >
            {radarActive
              ? language === "ar"
                ? "إيقاف الرادار"
                : "Stop Radar"
              : language === "ar"
                ? "تشغيل الرادار"
                : "Start Radar"}
          </button>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="autoGenerate"
              checked={autoGenerate}
              onChange={(e) => setAutoGenerate(e.target.checked)}
              className="w-4 h-4 text-emerald-500 bg-slate-800 border-emerald-400 rounded focus:ring-emerald-500"
            />
            <label htmlFor="autoGenerate" className="text-emerald-400 text-sm">
              {language === "ar" ? "توليد عروض تلقائي" : "Auto-generate offers"}
            </label>
          </div>
        </div>
      </div>

      {/* Live Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-emerald-400/30 p-4 text-center">
          <Target className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-emerald-300">
            {radarStats.total_opportunities}
          </div>
          <div className="text-xs text-emerald-400">
            {language === "ar" ? "إجمالي الفرص" : "Total Opportunities"}
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-orange-400/30 p-4 text-center">
          <Zap className="w-6 h-6 text-orange-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-orange-300">
            {radarStats.high_score_opportunities}
          </div>
          <div className="text-xs text-orange-400">
            {language === "ar" ? "فرص عالية القيمة" : "High-Value Opps"}
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-blue-400/30 p-4 text-center">
          <MapPin className="w-6 h-6 text-blue-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-blue-300">
            {radarStats.active_monitoring_areas}
          </div>
          <div className="text-xs text-blue-400">
            {language === "ar" ? "مناطق الرصد" : "Monitoring Areas"}
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-green-400/30 p-4 text-center">
          <TrendingUp className="w-6 h-6 text-green-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-green-300">
            {radarStats.success_rate}%
          </div>
          <div className="text-xs text-green-400">
            {language === "ar" ? "معدل النجاح" : "Success Rate"}
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-purple-400/30 p-4 text-center">
          <Clock className="w-6 h-6 text-purple-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-purple-300">
            {radarStats.avg_response_time}m
          </div>
          <div className="text-xs text-purple-400">
            {language === "ar" ? "متوسط الاستجابة" : "Avg Response"}
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-yellow-400/30 p-4 text-center">
          <DollarSign className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-yellow-300">
            {radarStats.monthly_conversion}%
          </div>
          <div className="text-xs text-yellow-400">
            {language === "ar" ? "التحويل الشهري" : "Monthly Conversion"}
          </div>
        </div>
      </div>

      {/* Tabs and Filters */}
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
        {/* Tabs */}
        <div className="flex gap-2">
          {[
            {
              id: "live",
              name_ar: "الفرص المباشرة",
              name_en: "Live Opportunities",
              icon: Zap,
            },
            {
              id: "processed",
              name_ar: "المعالجة",
              name_en: "Processed",
              icon: CheckCircle,
            },
            {
              id: "analytics",
              name_ar: "التحليلات",
              name_en: "Analytics",
              icon: TrendingUp,
            },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? "bg-emerald-500 text-white"
                  : "bg-white/10 text-emerald-300 hover:bg-white/15"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {language === "ar" ? tab.name_ar : tab.name_en}
            </button>
          ))}
        </div>

        {/* Type Filters */}
        <div className="flex gap-2 flex-wrap">
          {opportunityTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setFilterType(type.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                filterType === type.id
                  ? "bg-emerald-500 text-white"
                  : "bg-slate-800/30 text-emerald-300 hover:bg-slate-700/40"
              }`}
            >
              {language === "ar" ? type.name_ar : type.name_en} ({type.count})
            </button>
          ))}
        </div>
      </div>

      {/* Opportunities List */}
      {activeTab === "live" && (
        <div className="space-y-4">
          {filteredOpportunities.map((opportunity) => (
            <div
              key={opportunity.id}
              className={`bg-gradient-to-r ${getUrgencyColor(opportunity.urgency)} p-1 rounded-2xl`}
            >
              <div className="bg-slate-900/95 backdrop-blur-lg rounded-xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-white">
                        {language === "ar"
                          ? opportunity.title_ar
                          : opportunity.title_en}
                      </h3>
                      <div
                        className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(opportunity.status)}`}
                      >
                        {opportunity.status.replace("_", " ")}
                      </div>
                    </div>

                    <p className="text-gray-300 mb-3">
                      {language === "ar"
                        ? opportunity.description_ar
                        : opportunity.description_en}
                    </p>

                    <div className="flex items-center gap-6 text-sm">
                      <div className="flex items-center gap-2 text-emerald-400">
                        <MapPin className="w-4 h-4" />
                        {opportunity.area}
                      </div>
                      <div className="flex items-center gap-2 text-yellow-400">
                        <Target className="w-4 h-4" />
                        {opportunity.opportunity_score}/100
                      </div>
                      <div className="flex items-center gap-2 text-green-400">
                        <DollarSign className="w-4 h-4" />
                        AED {opportunity.estimated_value.toLocaleString()}
                      </div>
                      <div className="flex items-center gap-2 text-blue-400">
                        <Users className="w-4 h-4" />
                        {opportunity.confidence_level}%{" "}
                        {language === "ar" ? "ثقة" : "confidence"}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 ml-4">
                    <button
                      onClick={() => generateSmartOffer(opportunity)}
                      className="bg-emerald-500 hover:bg-emerald-600 px-4 py-2 rounded-xl text-sm font-medium transition-colors"
                    >
                      {language === "ar" ? "عرض ذكي" : "Smart Offer"}
                    </button>

                    {opportunity.status === "new" && (
                      <button
                        onClick={() =>
                          handleQuickAction(opportunity.id, "contact")
                        }
                        className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-xl text-sm font-medium transition-colors"
                      >
                        {language === "ar" ? "تواصل" : "Contact"}
                      </button>
                    )}

                    <button
                      onClick={() => setSelectedOpportunity(opportunity)}
                      className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-xl text-sm font-medium transition-colors"
                    >
                      {language === "ar" ? "تفاصيل" : "Details"}
                    </button>
                  </div>
                </div>

                {/* Auto Actions */}
                {opportunity.auto_actions.length > 0 && (
                  <div className="border-t border-gray-700 pt-4">
                    <div className="text-sm text-gray-400 mb-2">
                      {language === "ar"
                        ? "الإجراءات التلقائية:"
                        : "Auto Actions:"}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {opportunity.auto_actions.map((action, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs"
                        >
                          {action}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Quick Analytics Tab */}
      {activeTab === "analytics" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-emerald-400/30 p-6">
            <h3 className="text-xl font-bold text-emerald-300 mb-4">
              {language === "ar"
                ? "أداء الرادار - آخر 30 يوم"
                : "Radar Performance - Last 30 Days"}
            </h3>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-emerald-400">
                  {language === "ar"
                    ? "فرص مكتشفة:"
                    : "Opportunities Detected:"}
                </span>
                <span className="text-emerald-200 font-bold">287</span>
              </div>
              <div className="flex justify-between">
                <span className="text-emerald-400">
                  {language === "ar" ? "عروض مولدة:" : "Offers Generated:"}
                </span>
                <span className="text-emerald-200 font-bold">156</span>
              </div>
              <div className="flex justify-between">
                <span className="text-emerald-400">
                  {language === "ar" ? "صفقات مغلقة:" : "Deals Closed:"}
                </span>
                <span className="text-green-300 font-bold">23</span>
              </div>
              <div className="flex justify-between">
                <span className="text-emerald-400">
                  {language === "ar" ? "إيرادات الرادار:" : "Radar Revenue:"}
                </span>
                <span className="text-yellow-300 font-bold">AED 2.4M</span>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-emerald-400/30 p-6">
            <h3 className="text-xl font-bold text-emerald-300 mb-4">
              {language === "ar" ? "أفضل المناطق" : "Top Performing Areas"}
            </h3>

            <div className="space-y-3">
              {[
                {
                  area: "دبي - الجميرا",
                  area_en: "Dubai - Jumeirah",
                  score: 94,
                },
                {
                  area: "أبوظبي - الخالدية",
                  area_en: "Abu Dhabi - Al Khalidiyah",
                  score: 89,
                },
                {
                  area: "الشارقة - الخوانيج",
                  area_en: "Sharjah - Al Khawaneej",
                  score: 82,
                },
                {
                  area: "دبي - تلال الإمارات",
                  area_en: "Dubai - Emirates Hills",
                  score: 78,
                },
              ].map((area, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-slate-800/30 rounded-xl"
                >
                  <span className="text-emerald-200">
                    {language === "ar" ? area.area : area.area_en}
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-slate-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full"
                        style={{ width: `${area.score}%` }}
                      ></div>
                    </div>
                    <span className="text-emerald-300 text-sm">
                      {area.score}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Opportunity Details Modal */}
      {selectedOpportunity && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setSelectedOpportunity(null)}
        >
          <div
            className="bg-white/10 backdrop-blur-lg rounded-2xl border border-emerald-400/30 p-6 m-4 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-emerald-300">
                {language === "ar" ? "تفاصيل الفرصة" : "Opportunity Details"}
              </h3>
              <button
                onClick={() => setSelectedOpportunity(null)}
                className="text-emerald-400 hover:text-emerald-300 text-xl"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-emerald-200 mb-2">
                  {language === "ar"
                    ? selectedOpportunity.title_ar
                    : selectedOpportunity.title_en}
                </h4>
                <p className="text-emerald-400">
                  {language === "ar"
                    ? selectedOpportunity.description_ar
                    : selectedOpportunity.description_en}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <span className="text-emerald-400 text-sm">
                      {language === "ar"
                        ? "نقاط الفرصة:"
                        : "Opportunity Score:"}
                    </span>
                    <div className="text-xl font-bold text-emerald-300">
                      {selectedOpportunity.opportunity_score}/100
                    </div>
                  </div>
                  <div>
                    <span className="text-emerald-400 text-sm">
                      {language === "ar"
                        ? "القيمة المقدرة:"
                        : "Estimated Value:"}
                    </span>
                    <div className="text-xl font-bold text-yellow-300">
                      AED {selectedOpportunity.estimated_value.toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <span className="text-emerald-400 text-sm">
                      {language === "ar" ? "مستوى الثقة:" : "Confidence Level:"}
                    </span>
                    <div className="text-xl font-bold text-blue-300">
                      {selectedOpportunity.confidence_level}%
                    </div>
                  </div>
                  <div>
                    <span className="text-emerald-400 text-sm">
                      {language === "ar"
                        ? "العملاء المولدون:"
                        : "Generated Leads:"}
                    </span>
                    <div className="text-xl font-bold text-purple-300">
                      {selectedOpportunity.generated_leads}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => generateSmartOffer(selectedOpportunity)}
                  className="flex-1 bg-emerald-500 hover:bg-emerald-600 px-6 py-3 rounded-xl font-semibold transition-colors"
                >
                  {language === "ar"
                    ? "🧠 توليد عرض ذكي"
                    : "🧠 Generate Smart Offer"}
                </button>
                <button className="px-6 py-3 border border-emerald-400/50 rounded-xl text-emerald-300 hover:bg-emerald-600/20 transition-colors">
                  {language === "ar" ? "📍 عرض على الخريطة" : "📍 Show on Map"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
