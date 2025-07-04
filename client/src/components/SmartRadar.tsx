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
} from "lucide-react";

interface SmartRadarProps {
  language: "en" | "ar";
}

const translations = {
  en: {
    smartRadar: "Smart Marketing Radar",
    marketOpportunities: "Market Opportunities",
    leadGeneration: "Lead Generation",
    targetAudience: "Target Audience",
    sendOffer: "Send Custom Offer",
    contactLead: "Contact Lead",
    viewProfile: "View Profile",
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
    autoSend: "Auto-send personalized offers",
  },
  ar: {
    smartRadar: "الرادار التسويقي الذكي",
    marketOpportunities: "الفرص السوقية",
    leadGeneration: "توليد العملاء المحتملين",
    targetAudience: "الجمهور المستهدف",
    sendOffer: "إرسال عرض مخصص",
    contactLead: "التواصل مع العميل",
    viewProfile: "عرض الملف الشخصي",
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
    found: "فرصة تم الع��ور عليها",
    autoSend: "إرسال العروض المخصصة تلقائياً",
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
}

const mockLeads: Lead[] = [
  {
    id: 1,
    name: "أحمد محمد الفيصل",
    phone: "+966 50 123 4567",
    location: "الرياض - حي الملقا",
    propertyType: "villa",
    budget: "200K - 300K",
    status: "hotLead",
    source: "Real Estate Platform",
    potentialValue: "250K",
    lastActivity: "Viewed villa properties 2 hours ago",
    score: 95,
  },
  {
    id: 2,
    name: "فاطمة العلي",
    phone: "+966 55 987 6543",
    location: "جدة - أبحر الشمالية",
    propertyType: "compound",
    budget: "150K - 200K",
    status: "qualified",
    source: "Social Media",
    potentialValue: "180K",
    lastActivity: "Downloaded landscaping catalog",
    score: 85,
  },
  {
    id: 3,
    name: "خالد بن سعد",
    phone: "+966 56 456 7890",
    location: "الدمام - الخليج",
    propertyType: "villa",
    budget: "300K+",
    status: "newProperty",
    source: "Website Inquiry",
    potentialValue: "400K",
    lastActivity: "Just purchased new villa",
    score: 90,
  },
];

export default function SmartRadar({ language }: SmartRadarProps) {
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [isScanning, setIsScanning] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const t = translations[language];
  const isRTL = language === "ar";

  useEffect(() => {
    // Simulate real-time lead updates
    const interval = setInterval(() => {
      if (Math.random() > 0.8) {
        const newLead: Lead = {
          id: Date.now(),
          name: `عميل جديد ${Date.now().toString().slice(-4)}`,
          phone: "+966 5X XXX XXXX",
          location: "الرياض",
          propertyType: "villa",
          budget: "200K+",
          status: "newProperty",
          source: "Live Detection",
          potentialValue: "250K",
          lastActivity: "Just now",
          score: Math.floor(Math.random() * 30) + 70,
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div
        className={`flex items-center justify-between ${isRTL ? "flex-row-reverse" : ""}`}
      >
        <div
          className={`flex items-center gap-4 ${isRTL ? "flex-row-reverse" : ""}`}
        >
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
            <Radar className="w-6 h-6 text-white" />
          </div>
          <div className={`${isRTL ? "text-right" : "text-left"}`}>
            <h2 className="text-2xl font-bold text-white">{t.smartRadar}</h2>
            <p className="text-gray-300">{t.marketOpportunities}</p>
          </div>
        </div>

        <div
          className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}
        >
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
            <span className="text-green-400 text-sm">
              {leads.length} {t.found}
            </span>
          </div>
          <button
            onClick={() => setIsScanning(!isScanning)}
            className={`p-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors ${isScanning ? "animate-pulse" : ""}`}
          >
            <Target className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Scanning Status */}
      {isScanning && (
        <div className="bg-blue-500/20 border border-blue-400/30 rounded-lg p-4">
          <div
            className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}
          >
            <div className="w-6 h-6 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
            <span className="text-blue-400">{t.scanning}</span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Leads List */}
        <div className="lg:col-span-2 bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
          <h3
            className={`text-white font-semibold mb-4 ${isRTL ? "text-right" : "text-left"}`}
          >
            {t.leadGeneration}
          </h3>

          <div className="space-y-4">
            {leads.map((lead) => (
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
                      className={`flex items-center gap-2 mb-2 ${isRTL ? "flex-row-reverse" : ""}`}
                    >
                      <h4 className="text-white font-medium">{lead.name}</h4>
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
                      <div className="text-xs text-gray-400">
                        {language === "ar" ? "آخر نشاط: " : "Last activity: "}
                        {lead.lastActivity}
                      </div>
                    </div>
                  </div>

                  {/* Score & Actions */}
                  <div
                    className={`flex flex-col items-center gap-2 ${isRTL ? "items-start" : "items-end"}`}
                  >
                    <div
                      className={`text-lg font-bold ${getScoreColor(lead.score)}`}
                    >
                      {lead.score}%
                    </div>
                    <div className="text-emerald-400 text-sm font-medium">
                      {lead.potentialValue}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lead Details & Actions */}
        <div className="space-y-6">
          {selectedLead ? (
            <>
              {/* Selected Lead Details */}
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <h3
                  className={`text-white font-semibold mb-4 ${isRTL ? "text-right" : "text-left"}`}
                >
                  {selectedLead.name}
                </h3>

                <div className="space-y-3">
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
                    <span className="text-gray-300">{t.location}:</span>
                    <span className="text-white">{selectedLead.location}</span>
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
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 mt-6">
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
            </>
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

          {/* Auto Marketing */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
            <h3
              className={`text-white font-semibold mb-4 ${isRTL ? "text-right" : "text-left"}`}
            >
              {language === "ar" ? "التسويق الآلي" : "Auto Marketing"}
            </h3>

            <div className="space-y-3">
              <div
                className={`flex items-center justify-between ${isRTL ? "flex-row-reverse" : ""}`}
              >
                <span className="text-gray-300 text-sm">{t.autoSend}</span>
                <div className="w-12 h-6 bg-green-500 rounded-full flex items-center p-1">
                  <div className="w-4 h-4 bg-white rounded-full ml-auto transition-all" />
                </div>
              </div>

              <div className="text-xs text-gray-400">
                {language === "ar"
                  ? "12 عرض تم إرساله اليوم"
                  : "12 offers sent today"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
