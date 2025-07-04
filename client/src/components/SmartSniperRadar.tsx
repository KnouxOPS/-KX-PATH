import { useState, useEffect } from "react";
import {
  Radar,
  Target,
  Send,
  Phone,
  MapPin,
  Home,
  TrendingUp,
  Eye,
  Zap,
  DollarSign,
  Calendar,
  Users,
  AlertCircle,
  Filter,
  Search,
  Download,
  RefreshCw,
  Bot,
} from "lucide-react";

interface SmartSniperRadarProps {
  language: "en" | "ar";
}

const translations = {
  en: {
    smartSniper: "Smart Sniper Radar",
    subtitle: "AI-Powered Market Intelligence & Lead Generation",
    marketOpportunities: "Market Opportunities",
    leadGeneration: "Lead Generation",
    activeScanning: "Active Scanning",
    opportunitiesFound: "Opportunities Found",
    autoOffers: "Auto Offers Sent",
    conversionRate: "Conversion Rate",
    recentPurchases: "Recent Property Purchases",
    hotLeads: "Hot Leads",
    marketTrends: "Market Trends",
    sendOffer: "Send Custom Offer",
    contactLead: "Contact Lead",
    viewProfile: "View Profile",
    generateOffer: "Generate AI Offer",
    newProperty: "New Property",
    hotLead: "Hot Lead",
    qualified: "Qualified",
    contacted: "Contacted",
    potentialValue: "Potential Value",
    location: "Location",
    propertyType: "Property Type",
    budget: "Budget",
    source: "Source",
    villa: "Villa",
    apartment: "Apartment",
    compound: "Compound",
    commercial: "Commercial",
    recentActivity: "Recent Activity",
    scanning: "Scanning market...",
    found: "opportunities found",
    autoSendOffers: "Auto-send personalized offers",
    marketAnalysis: "Market Analysis",
    highDemandAreas: "High Demand Areas",
    priceRanges: "Price Ranges",
    seasonalTrends: "Seasonal Trends",
    competitorActivity: "Competitor Activity",
    leadSources: "Lead Sources",
    socialMedia: "Social Media",
    propertyWebsites: "Property Websites",
    referrals: "Referrals",
    directInquiry: "Direct Inquiry",
  },
  ar: {
    smartSniper: "الرادار التسويقي الذكي",
    subtitle: "استخبارات السوق والذكاء الاصطناعي لتوليد العملاء المحتملين",
    marketOpportunities: "الفرص السوقية",
    leadGeneration: "توليد العملاء المحتملين",
    activeScanning: "المسح النشط",
    opportunitiesFound: "الفرص المكتشفة",
    autoOffers: "العروض الآلية المرسلة",
    conversionRate: "معدل التحويل",
    recentPurchases: "المشتريات العقارية الحديثة",
    hotLeads: "العملاء المحتملون المهمون",
    marketTrends: "اتجاهات السوق",
    sendOffer: "إرسال عرض مخصص",
    contactLead: "التواصل مع العميل",
    viewProfile: "عرض الملف الشخصي",
    generateOffer: "إنتاج عرض ذكي",
    newProperty: "عقار جديد",
    hotLead: "عميل مهم",
    qualified: "مؤهل",
    contacted: "تم التواصل",
    potentialValue: "القيمة المحتملة",
    location: "الموقع",
    propertyType: "نوع العقار",
    budget: "الميزانية",
    source: "المصدر",
    villa: "فيلا",
    apartment: "شقة",
    compound: "مجمع سكني",
    commercial: "تجاري",
    recentActivity: "النشاط الحديث",
    scanning: "جاري فحص السوق...",
    found: "فرصة تم العثور عليها",
    autoSendOffers: "إرسال العروض المخصصة تلقائياً",
    marketAnalysis: "تحليل السوق",
    highDemandAreas: "المناطق عالية الطلب",
    priceRanges: "نطاقات الأسعار",
    seasonalTrends: "الاتجاهات الموسمية",
    competitorActivity: "نشاط المنافسين",
    leadSources: "مصادر العملاء المحتملين",
    socialMedia: "وسائل التواصل الاجتماعي",
    propertyWebsites: "مواقع العقارات",
    referrals: "الإحالات",
    directInquiry: "الاستفسار المباشر",
  },
};

interface Lead {
  id: number;
  name: string;
  phone: string;
  location: string;
  propertyType: "villa" | "apartment" | "compound" | "commercial";
  budget: string;
  status: "newProperty" | "hotLead" | "qualified" | "contacted";
  source: string;
  potentialValue: string;
  lastActivity: string;
  score: number;
  purchaseDate: string;
  propertyValue: string;
}

const mockLeads: Lead[] = [
  {
    id: 1,
    name: "Ahmed Mohammed Al-Faisal",
    phone: "+971 50 123 4567",
    location: "Dubai - Palm Jumeirah",
    propertyType: "villa",
    budget: "300K - 500K",
    status: "hotLead",
    source: "Property Portal",
    potentialValue: "450K",
    lastActivity: "Purchased villa 2 days ago",
    score: 98,
    purchaseDate: "2024-01-15",
    propertyValue: "8.5M AED",
  },
  {
    id: 2,
    name: "Sarah Abdullah",
    phone: "+971 55 987 6543",
    location: "Abu Dhabi - Saadiyat Island",
    propertyType: "compound",
    budget: "200K - 300K",
    status: "qualified",
    source: "Social Media",
    potentialValue: "280K",
    lastActivity: "Liked luxury landscaping posts",
    score: 87,
    purchaseDate: "2024-01-10",
    propertyValue: "4.2M AED",
  },
  {
    id: 3,
    name: "Khalid Bin Saeed",
    phone: "+971 56 456 7890",
    location: "Sharjah - Al Majaz",
    propertyType: "villa",
    budget: "150K - 250K",
    status: "newProperty",
    source: "Real Estate App",
    potentialValue: "200K",
    lastActivity: "Just completed property registration",
    score: 92,
    purchaseDate: "2024-01-18",
    propertyValue: "3.8M AED",
  },
];

const marketMetrics = [
  { label: "activeScanning", value: "24/7", icon: Radar, color: "blue" },
  { label: "opportunitiesFound", value: "1,247", icon: Target, color: "green" },
  { label: "autoOffers", value: "89", icon: Send, color: "purple" },
  {
    label: "conversionRate",
    value: "34.2%",
    icon: TrendingUp,
    color: "emerald",
  },
];

const highDemandAreas = [
  { area: "Palm Jumeirah", demandLevel: 95, avgValue: "8.5M" },
  { area: "Downtown Dubai", demandLevel: 88, avgValue: "6.2M" },
  { area: "Saadiyat Island", demandLevel: 82, avgValue: "4.8M" },
  { area: "Al Majaz", demandLevel: 76, avgValue: "3.2M" },
];

export default function SmartSniperRadar({ language }: SmartSniperRadarProps) {
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [isScanning, setIsScanning] = useState(true);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const t = translations[language];
  const isRTL = language === "ar";

  useEffect(() => {
    // Simulate real-time lead updates
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const newLead: Lead = {
          id: Date.now(),
          name: `New Lead ${Date.now().toString().slice(-4)}`,
          phone: "+971 5X XXX XXXX",
          location: "Dubai - New Development",
          propertyType: "villa",
          budget: "250K+",
          status: "newProperty",
          source: "AI Detection",
          potentialValue: "320K",
          lastActivity: "Property purchase detected",
          score: Math.floor(Math.random() * 30) + 70,
          purchaseDate: new Date().toISOString().split("T")[0],
          propertyValue: `${(Math.random() * 5 + 3).toFixed(1)}M AED`,
        };
        setLeads((prev) => [newLead, ...prev.slice(0, 9)]);
      }
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "hotLead":
        return "bg-red-500 text-white";
      case "newProperty":
        return "bg-green-500 text-white";
      case "qualified":
        return "bg-yellow-500 text-black";
      case "contacted":
        return "bg-blue-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-400";
    if (score >= 75) return "text-yellow-400";
    return "text-red-400";
  };

  const filteredLeads = leads.filter((lead) => {
    const matchesFilter =
      filterStatus === "all" || lead.status === filterStatus;
    const matchesSearch =
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className={`${isRTL ? "text-right" : "text-left"}`}>
        <h1 className="text-3xl font-bold text-white mb-2">{t.smartSniper}</h1>
        <p className="text-blue-300 text-lg opacity-90">{t.subtitle}</p>
      </div>

      {/* Market Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {marketMetrics.map((metric, index) => (
          <div
            key={index}
            className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20"
          >
            <div
              className={`flex items-center gap-4 ${isRTL ? "flex-row-reverse" : ""}`}
            >
              <div
                className={`w-12 h-12 bg-gradient-to-br from-${metric.color}-400 to-${metric.color}-600 rounded-xl flex items-center justify-center`}
              >
                <metric.icon className="w-6 h-6 text-white" />
              </div>
              <div className={`${isRTL ? "text-right" : "text-left"}`}>
                <div className="text-2xl font-bold text-white">
                  {metric.value}
                </div>
                <div className="text-sm text-gray-300">
                  {t[metric.label as keyof typeof t]}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Scanning Status */}
      {isScanning && (
        <div className="bg-blue-500/20 border border-blue-400/30 rounded-lg p-4">
          <div
            className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}
          >
            <div className="w-6 h-6 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
            <span className="text-blue-400">{t.scanning}</span>
            <div className="flex-1 bg-blue-900/30 rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-blue-400 rounded-full animate-pulse"
                style={{ width: "75%" }}
              />
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Leads Management */}
        <div className="lg:col-span-3 space-y-6">
          {/* Filters */}
          <div className={`flex gap-4 ${isRTL ? "flex-row-reverse" : ""}`}>
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder={
                  language === "ar" ? "البحث في العملاء..." : "Search leads..."
                }
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
              />
            </div>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-400"
            >
              <option value="all">
                {language === "ar" ? "جميع العملاء" : "All Leads"}
              </option>
              <option value="hotLead">{t.hotLead}</option>
              <option value="newProperty">{t.newProperty}</option>
              <option value="qualified">{t.qualified}</option>
              <option value="contacted">{t.contacted}</option>
            </select>
          </div>

          {/* Leads List */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
            <h3
              className={`text-xl font-semibold text-white mb-6 ${isRTL ? "text-right" : "text-left"}`}
            >
              {t.leadGeneration}
            </h3>

            <div className="space-y-4">
              {filteredLeads.map((lead) => (
                <div
                  key={lead.id}
                  className={`p-4 bg-white/5 rounded-lg border border-white/10 hover:border-white/20 transition-all cursor-pointer ${selectedLead?.id === lead.id ? "border-blue-400 bg-blue-400/10" : ""}`}
                  onClick={() => setSelectedLead(lead)}
                >
                  <div
                    className={`flex items-start justify-between ${isRTL ? "flex-row-reverse" : ""}`}
                  >
                    {/* Lead Info */}
                    <div
                      className={`flex-1 ${isRTL ? "text-right" : "text-left"}`}
                    >
                      <div
                        className={`flex items-center gap-3 mb-2 ${isRTL ? "flex-row-reverse" : ""}`}
                      >
                        <h4 className="text-white font-semibold">
                          {lead.name}
                        </h4>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}
                        >
                          {t[lead.status]}
                        </span>
                      </div>

                      <div className="space-y-1 text-sm text-gray-300">
                        <div
                          className={`flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}
                        >
                          <MapPin className="w-4 h-4" />
                          <span>{lead.location}</span>
                        </div>
                        <div
                          className={`flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}
                        >
                          <Home className="w-4 h-4" />
                          <span>
                            {t[lead.propertyType]} • {lead.budget}
                          </span>
                        </div>
                        <div
                          className={`flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}
                        >
                          <Calendar className="w-4 h-4" />
                          <span>{lead.lastActivity}</span>
                        </div>
                      </div>
                    </div>

                    {/* Score & Value */}
                    <div
                      className={`flex flex-col items-center gap-2 ${isRTL ? "items-start" : "items-end"}`}
                    >
                      <div
                        className={`text-lg font-bold ${getScoreColor(lead.score)}`}
                      >
                        {lead.score}%
                      </div>
                      <div className="text-emerald-400 text-sm font-semibold">
                        {lead.potentialValue}
                      </div>
                      <div className="text-gray-400 text-xs">
                        {lead.propertyValue}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Selected Lead Details */}
          {selectedLead ? (
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
              <h3
                className={`text-lg font-semibold text-white mb-4 ${isRTL ? "text-right" : "text-left"}`}
              >
                {selectedLead.name}
              </h3>

              <div className="space-y-3 mb-6">
                <div
                  className={`flex justify-between ${isRTL ? "flex-row-reverse" : ""}`}
                >
                  <span className="text-gray-300">{t.potentialValue}:</span>
                  <span className="text-emerald-400 font-semibold">
                    {selectedLead.potentialValue}
                  </span>
                </div>
                <div
                  className={`flex justify-between ${isRTL ? "flex-row-reverse" : ""}`}
                >
                  <span className="text-gray-300">{t.propertyType}:</span>
                  <span className="text-white">
                    {t[selectedLead.propertyType]}
                  </span>
                </div>
                <div
                  className={`flex justify-between ${isRTL ? "flex-row-reverse" : ""}`}
                >
                  <span className="text-gray-300">{t.budget}:</span>
                  <span className="text-white">{selectedLead.budget}</span>
                </div>
                <div
                  className={`flex justify-between ${isRTL ? "flex-row-reverse" : ""}`}
                >
                  <span className="text-gray-300">{t.source}:</span>
                  <span className="text-white">{selectedLead.source}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-3 px-4 rounded-lg hover:scale-105 transition-all flex items-center justify-center gap-2">
                  <Bot className="w-4 h-4" />
                  {t.generateOffer}
                </button>
                <button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold py-3 px-4 rounded-lg hover:scale-105 transition-all flex items-center justify-center gap-2">
                  <Send className="w-4 h-4" />
                  {t.sendOffer}
                </button>
                <button className="w-full bg-white/10 hover:bg-white/20 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                  <Phone className="w-4 h-4" />
                  {t.contactLead}
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 text-center">
              <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-300">
                {language === "ar"
                  ? "اختر عميلاً محتملاً لعرض التفاصيل"
                  : "Select a lead to view details"}
              </p>
            </div>
          )}

          {/* Market Analysis */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
            <h3
              className={`text-lg font-semibold text-white mb-4 ${isRTL ? "text-right" : "text-left"}`}
            >
              {t.marketAnalysis}
            </h3>

            <div className="space-y-4">
              <div>
                <h4 className="text-white font-medium mb-3">
                  {t.highDemandAreas}
                </h4>
                <div className="space-y-2">
                  {highDemandAreas.map((area, index) => (
                    <div key={index} className="space-y-1">
                      <div
                        className={`flex justify-between text-sm ${isRTL ? "flex-row-reverse" : ""}`}
                      >
                        <span className="text-gray-300">{area.area}</span>
                        <span className="text-emerald-400">
                          {area.avgValue}
                        </span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-emerald-400 h-2 rounded-full transition-all"
                          style={{ width: `${area.demandLevel}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Auto Marketing Status */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
            <h3
              className={`text-lg font-semibold text-white mb-4 ${isRTL ? "text-right" : "text-left"}`}
            >
              {language === "ar" ? "التسويق الآلي" : "Auto Marketing"}
            </h3>

            <div className="space-y-3">
              <div
                className={`flex items-center justify-between ${isRTL ? "flex-row-reverse" : ""}`}
              >
                <span className="text-gray-300 text-sm">
                  {t.autoSendOffers}
                </span>
                <div className="w-12 h-6 bg-green-500 rounded-full flex items-center p-1">
                  <div className="w-4 h-4 bg-white rounded-full ml-auto transition-all" />
                </div>
              </div>

              <div className="space-y-2 text-xs text-gray-400">
                <div>
                  {language === "ar"
                    ? "89 عرض تم إرساله هذا الأسبوع"
                    : "89 offers sent this week"}
                </div>
                <div>
                  {language === "ar"
                    ? "34.2% معدل الاستجابة"
                    : "34.2% response rate"}
                </div>
                <div>
                  {language === "ar"
                    ? "12 عميل جديد هذا الشهر"
                    : "12 new clients this month"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
