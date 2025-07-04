import { useState, useEffect } from "react";
import {
  Target,
  Zap,
  Send,
  Eye,
  Download,
  MapPin,
  DollarSign,
  Calendar,
  TrendingUp,
  Sparkles,
  Bot,
} from "lucide-react";

interface SmartOpportunityHunterProps {
  language: "en" | "ar";
}

interface SmartOffer {
  id: string;
  title_ar: string;
  title_en: string;
  client_type: string;
  property_details: {
    type: "villa" | "apartment" | "commercial";
    size_sqm: number;
    location: string;
    estimated_value: number;
  };
  generated_design: {
    style: string;
    key_features: string[];
    estimated_cost: number;
    timeline_weeks: number;
  };
  ai_score: number;
  personalization_level: number;
  marketing_angle: string;
  status: "generated" | "reviewed" | "sent" | "responded";
  created_at: string;
  response_rate_prediction: number;
}

interface OpportunityAlert {
  id: string;
  type: "new_construction" | "property_sale" | "land_purchase";
  title_ar: string;
  title_en: string;
  location: string;
  coordinates: { lat: number; lng: number };
  detected_at: string;
  confidence: number;
  auto_offer_generated: boolean;
}

export default function SmartOpportunityHunter({
  language,
}: SmartOpportunityHunterProps) {
  const [activeTab, setActiveTab] = useState<"alerts" | "offers" | "analytics">(
    "alerts",
  );
  const [isHunting, setIsHunting] = useState(true);
  const [autoOfferMode, setAutoOfferMode] = useState(true);
  const [selectedAlert, setSelectedAlert] = useState<OpportunityAlert | null>(
    null,
  );

  // Mock data for demonstration
  const [alerts, setAlerts] = useState<OpportunityAlert[]>([
    {
      id: "ALT_001",
      type: "new_construction",
      title_ar: "فيلا جديدة قيد الإنشاء - الخالدية",
      title_en: "New Villa Under Construction - Al Khalidiyah",
      location: "أبوظبي - الخالدية",
      coordinates: { lat: 24.425, lng: 54.605 },
      detected_at: "2024-01-22T10:30:00Z",
      confidence: 94,
      auto_offer_generated: true,
    },
    {
      id: "ALT_002",
      type: "property_sale",
      title_ar: "بيع فيلا بحديقة كبيرة - الجميرا",
      title_en: "Villa with Large Garden Sold - Jumeirah",
      location: "دبي - الجميرا",
      coordinates: { lat: 25.21, lng: 55.275 },
      detected_at: "2024-01-22T11:45:00Z",
      confidence: 89,
      auto_offer_generated: false,
    },
    {
      id: "ALT_003",
      type: "land_purchase",
      title_ar: "شراء أرض 2000 متر - الشارقة",
      title_en: "2000 sqm Land Purchase - Sharjah",
      location: "الشارقة - الخوانيج",
      coordinates: { lat: 25.1926, lng: 55.4661 },
      detected_at: "2024-01-22T14:20:00Z",
      confidence: 76,
      auto_offer_generated: false,
    },
  ]);

  const [smartOffers, setSmartOffers] = useState<SmartOffer[]>([
    {
      id: "OFFER_001",
      title_ar: "عرض حديقة فيلا فاخرة - الخالدية",
      title_en: "Luxury Villa Garden Offer - Al Khalidiyah",
      client_type: "high_net_worth_individual",
      property_details: {
        type: "villa",
        size_sqm: 1200,
        location: "أبوظبي - الخالدية",
        estimated_value: 4500000,
      },
      generated_design: {
        style: "Modern Arabic Garden with Water Features",
        key_features: [
          "نافورة مركزية بتصميم إسلامي عصري",
          "مسارات من الحجر الطبيعي الإماراتي",
          "نباتات محلية مقاومة للحرارة",
          "نظام ري ذكي موفر للمياه",
          "إضاءة LED تفاعلية",
        ],
        estimated_cost: 450000,
        timeline_weeks: 12,
      },
      ai_score: 96,
      personalization_level: 91,
      marketing_angle:
        "حديقة تعكس الهوية الإماراتية العصرية مع الاستدامة البيئية",
      status: "generated",
      created_at: "2024-01-22T10:35:00Z",
      response_rate_prediction: 78,
    },
    {
      id: "OFFER_002",
      title_ar: "تجديد حديقة تجارية - الجميرا",
      title_en: "Commercial Garden Renovation - Jumeirah",
      client_type: "commercial_property_investor",
      property_details: {
        type: "commercial",
        size_sqm: 800,
        location: "دبي - الجميرا",
        estimated_value: 6200000,
      },
      generated_design: {
        style: "Sustainable Business Landscape",
        key_features: [
          "مناطق جلوس خارجية للموظفين",
          "نباتات منقية للهواء",
          "نظام جمع مياه الأمطار",
          "مسارات للمشي والرياضة",
          "شحن السيارات الكهربائية بالطاقة الشمسية",
        ],
        estimated_cost: 280000,
        timeline_weeks: 8,
      },
      ai_score: 88,
      personalization_level: 85,
      marketing_angle: "تحسين بيئة العمل وزيادة إنتاجية الموظفين بنسبة 23%",
      status: "sent",
      created_at: "2024-01-22T11:50:00Z",
      response_rate_prediction: 65,
    },
  ]);

  const hunterStats = {
    alerts_today: 12,
    offers_generated: 8,
    response_rate: 73.5,
    conversion_rate: 18.2,
    revenue_generated: 2400000,
    active_leads: 34,
  };

  const generateSmartOffer = (alert: OpportunityAlert) => {
    // In real system, this would call AI to generate personalized offer
    const newOffer: SmartOffer = {
      id: `OFFER_${Date.now()}`,
      title_ar: `عرض ذكي - ${alert.location}`,
      title_en: `Smart Offer - ${alert.location}`,
      client_type: "potential_client",
      property_details: {
        type: "villa",
        size_sqm: 1000,
        location: alert.location,
        estimated_value: 3000000,
      },
      generated_design: {
        style: "AI-Generated Custom Design",
        key_features: [
          "تصميم مخصص بالذكاء الاصطناعي",
          "نباتات مناسبة للمناخ المحلي",
          "نظام ري أوتوماتيكي",
          "إضاءة ليلية ذكية",
        ],
        estimated_cost: 350000,
        timeline_weeks: 10,
      },
      ai_score: 92,
      personalization_level: 88,
      marketing_angle: "حلول مبتكرة مصممة خصيصاً لعقارك",
      status: "generated",
      created_at: new Date().toISOString(),
      response_rate_prediction: 82,
    };

    setSmartOffers((prev) => [newOffer, ...prev]);
    setAlerts((prev) =>
      prev.map((a) =>
        a.id === alert.id ? { ...a, auto_offer_generated: true } : a,
      ),
    );

    alert(
      `${language === "ar" ? "تم توليد عرض ذكي!" : "Smart offer generated!"}`,
    );
  };

  const sendOffer = (offerId: string) => {
    setSmartOffers((prev) =>
      prev.map((offer) =>
        offer.id === offerId ? { ...offer, status: "sent" } : offer,
      ),
    );
    alert(`${language === "ar" ? "تم إرسال العرض!" : "Offer sent!"}`);
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "new_construction":
        return "🏗️";
      case "property_sale":
        return "🏡";
      case "land_purchase":
        return "🏞️";
      default:
        return "📍";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "generated":
        return "bg-blue-500/20 text-blue-300 border-blue-400/30";
      case "reviewed":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-400/30";
      case "sent":
        return "bg-purple-500/20 text-purple-300 border-purple-400/30";
      case "responded":
        return "bg-green-500/20 text-green-300 border-green-400/30";
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-400/30";
    }
  };

  return (
    <div className="space-y-6" dir={language === "ar" ? "rtl" : "ltr"}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div
            className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 ${
              isHunting
                ? "bg-gradient-to-br from-purple-500 to-pink-600 animate-pulse"
                : "bg-gradient-to-br from-gray-500 to-gray-600"
            }`}
          >
            <Target
              className={`w-8 h-8 text-white ${isHunting ? "animate-ping" : ""}`}
            />
          </div>

          <div>
            <h2 className="text-3xl font-bold text-purple-300">
              {language === "ar"
                ? "🎯 صياد الفرص الذكي"
                : "🎯 Smart Opportunity Hunter"}
            </h2>
            <p className="text-purple-400">
              {language === "ar"
                ? "اكتشاف وتوليد العروض التلقائية للفرص العقارية"
                : "Automatic opportunity detection and offer generation"}
            </p>
            <div className="flex items-center gap-4 mt-2">
              <div
                className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
                  isHunting
                    ? "bg-green-500/20 text-green-300"
                    : "bg-gray-500/20 text-gray-300"
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full ${isHunting ? "bg-green-400 animate-pulse" : "bg-gray-400"}`}
                ></div>
                {isHunting
                  ? language === "ar"
                    ? "يبحث..."
                    : "Hunting..."
                  : language === "ar"
                    ? "متوقف"
                    : "Stopped"}
              </div>

              <div className="text-sm text-purple-400">
                {language === "ar" ? "آخر فحص:" : "Last Scan:"}{" "}
                {language === "ar" ? "منذ 2 دقيقة" : "2 minutes ago"}
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="autoOffer"
              checked={autoOfferMode}
              onChange={(e) => setAutoOfferMode(e.target.checked)}
              className="w-4 h-4 text-purple-500 bg-slate-800 border-purple-400 rounded focus:ring-purple-500"
            />
            <label htmlFor="autoOffer" className="text-purple-400 text-sm">
              {language === "ar" ? "توليد عروض تلقائي" : "Auto-generate offers"}
            </label>
          </div>

          <button
            onClick={() => setIsHunting(!isHunting)}
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              isHunting
                ? "bg-red-500 hover:bg-red-600 text-white"
                : "bg-purple-500 hover:bg-purple-600 text-white"
            }`}
          >
            {isHunting
              ? language === "ar"
                ? "إيقاف البحث"
                : "Stop Hunting"
              : language === "ar"
                ? "بدء البحث"
                : "Start Hunting"}
          </button>
        </div>
      </div>

      {/* Stats Dashboard */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-purple-400/30 p-4 text-center">
          <Zap className="w-6 h-6 text-purple-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-purple-300">
            {hunterStats.alerts_today}
          </div>
          <div className="text-xs text-purple-400">
            {language === "ar" ? "تنبيهات اليوم" : "Alerts Today"}
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-blue-400/30 p-4 text-center">
          <Bot className="w-6 h-6 text-blue-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-blue-300">
            {hunterStats.offers_generated}
          </div>
          <div className="text-xs text-blue-400">
            {language === "ar" ? "عروض مولدة" : "Offers Generated"}
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-green-400/30 p-4 text-center">
          <TrendingUp className="w-6 h-6 text-green-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-green-300">
            {hunterStats.response_rate}%
          </div>
          <div className="text-xs text-green-400">
            {language === "ar" ? "معدل الاستجابة" : "Response Rate"}
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-yellow-400/30 p-4 text-center">
          <Target className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-yellow-300">
            {hunterStats.conversion_rate}%
          </div>
          <div className="text-xs text-yellow-400">
            {language === "ar" ? "معدل التحويل" : "Conversion Rate"}
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-emerald-400/30 p-4 text-center">
          <DollarSign className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-emerald-300">
            {(hunterStats.revenue_generated / 1000000).toFixed(1)}M
          </div>
          <div className="text-xs text-emerald-400">
            {language === "ar" ? "إيرادات مولدة" : "Revenue Generated"}
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-orange-400/30 p-4 text-center">
          <Sparkles className="w-6 h-6 text-orange-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-orange-300">
            {hunterStats.active_leads}
          </div>
          <div className="text-xs text-orange-400">
            {language === "ar" ? "عملاء نشطين" : "Active Leads"}
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-2">
        {[
          {
            id: "alerts",
            name_ar: "التنبيهات المباشرة",
            name_en: "Live Alerts",
            icon: Zap,
          },
          {
            id: "offers",
            name_ar: "العروض المولدة",
            name_en: "Generated Offers",
            icon: Bot,
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
                ? "bg-purple-500 text-white"
                : "bg-white/10 text-purple-300 hover:bg-white/15"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {language === "ar" ? tab.name_ar : tab.name_en}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === "alerts" && (
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className="bg-white/10 backdrop-blur-lg rounded-2xl border border-purple-400/30 p-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{getAlertIcon(alert.type)}</span>
                    <div>
                      <h3 className="text-lg font-bold text-purple-200">
                        {language === "ar" ? alert.title_ar : alert.title_en}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-purple-400">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {alert.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Target className="w-4 h-4" />
                          {alert.confidence}%{" "}
                          {language === "ar" ? "ثقة" : "confidence"}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(alert.detected_at).toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 ml-4">
                  {alert.auto_offer_generated ? (
                    <div className="px-4 py-2 bg-green-500/20 text-green-300 rounded-xl text-sm border border-green-400/30">
                      {language === "ar" ? "✅ عرض مولد" : "✅ Offer Generated"}
                    </div>
                  ) : (
                    <button
                      onClick={() => generateSmartOffer(alert)}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-4 py-2 rounded-xl text-sm font-medium transition-colors"
                    >
                      {language === "ar"
                        ? "🧠 توليد عرض ذكي"
                        : "🧠 Generate Smart Offer"}
                    </button>
                  )}

                  <button
                    onClick={() => setSelectedAlert(alert)}
                    className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-xl text-sm font-medium transition-colors"
                  >
                    {language === "ar" ? "عرض التفاصيل" : "View Details"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "offers" && (
        <div className="space-y-4">
          {smartOffers.map((offer) => (
            <div
              key={offer.id}
              className="bg-white/10 backdrop-blur-lg rounded-2xl border border-blue-400/30 p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-lg font-bold text-blue-200">
                      {language === "ar" ? offer.title_ar : offer.title_en}
                    </h3>
                    <div
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(offer.status)}`}
                    >
                      {offer.status}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="text-sm text-blue-400">
                        {language === "ar" ? "الموقع:" : "Location:"}
                      </div>
                      <div className="text-blue-200">
                        {offer.property_details.location}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-blue-400">
                        {language === "ar"
                          ? "التكلفة المقدرة:"
                          : "Estimated Cost:"}
                      </div>
                      <div className="text-blue-200 font-bold">
                        AED{" "}
                        {offer.generated_design.estimated_cost.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="text-sm text-blue-400 mb-2">
                      {language === "ar"
                        ? "المميزات الرئيسية:"
                        : "Key Features:"}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {offer.generated_design.key_features
                        .slice(0, 3)
                        .map((feature, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs"
                          >
                            {feature}
                          </span>
                        ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-1 text-yellow-400">
                      <Sparkles className="w-4 h-4" />
                      AI Score: {offer.ai_score}/100
                    </div>
                    <div className="flex items-center gap-1 text-green-400">
                      <TrendingUp className="w-4 h-4" />
                      {offer.response_rate_prediction}%{" "}
                      {language === "ar"
                        ? "احتمالية الاستجابة"
                        : "response rate"}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 ml-4">
                  {offer.status === "generated" && (
                    <button
                      onClick={() => sendOffer(offer.id)}
                      className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 px-4 py-2 rounded-xl text-sm font-medium transition-colors"
                    >
                      <Send className="w-4 h-4 inline mr-2" />
                      {language === "ar" ? "إرسال العرض" : "Send Offer"}
                    </button>
                  )}

                  <button className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-xl text-sm font-medium transition-colors">
                    <Eye className="w-4 h-4 inline mr-2" />
                    {language === "ar" ? "معاينة" : "Preview"}
                  </button>

                  <button className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-xl text-sm font-medium transition-colors">
                    <Download className="w-4 h-4 inline mr-2" />
                    {language === "ar" ? "تحميل PDF" : "Download PDF"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "analytics" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-purple-400/30 p-6">
            <h3 className="text-xl font-bold text-purple-300 mb-4">
              {language === "ar"
                ? "أداء الصياد - آخر 30 يوم"
                : "Hunter Performance - Last 30 Days"}
            </h3>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-purple-400">
                  {language === "ar"
                    ? "فرص اكتشفت:"
                    : "Opportunities Detected:"}
                </span>
                <span className="text-purple-200 font-bold">342</span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-400">
                  {language === "ar"
                    ? "عروض ذكية مولدة:"
                    : "Smart Offers Generated:"}
                </span>
                <span className="text-purple-200 font-bold">289</span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-400">
                  {language === "ar" ? "عروض مرسلة:" : "Offers Sent:"}
                </span>
                <span className="text-blue-300 font-bold">245</span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-400">
                  {language === "ar"
                    ? "استجابات إيجابية:"
                    : "Positive Responses:"}
                </span>
                <span className="text-green-300 font-bold">89</span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-400">
                  {language === "ar" ? "صفقات مغلقة:" : "Deals Closed:"}
                </span>
                <span className="text-yellow-300 font-bold">34</span>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-purple-400/30 p-6">
            <h3 className="text-xl font-bold text-purple-300 mb-4">
              {language === "ar" ? "أفضل أنواع الفرص" : "Top Opportunity Types"}
            </h3>

            <div className="space-y-3">
              {[
                {
                  type: "new_construction",
                  type_ar: "بناء جديد",
                  success: 34,
                  color: "emerald",
                },
                {
                  type: "property_sale",
                  type_ar: "بيع عقارات",
                  success: 28,
                  color: "blue",
                },
                {
                  type: "land_purchase",
                  type_ar: "شراء أراضي",
                  success: 19,
                  color: "purple",
                },
                {
                  type: "renovation",
                  type_ar: "تجديد",
                  success: 15,
                  color: "orange",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-slate-800/30 rounded-xl"
                >
                  <span className="text-purple-200">
                    {language === "ar"
                      ? item.type_ar
                      : item.type.replace("_", " ")}
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-slate-700 rounded-full h-2">
                      <div
                        className={`bg-gradient-to-r from-${item.color}-500 to-${item.color}-400 h-full rounded-full`}
                        style={{ width: `${(item.success / 40) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-purple-300 text-sm">
                      {item.success}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
