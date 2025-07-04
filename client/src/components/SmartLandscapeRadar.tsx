import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  useMap,
} from "react-leaflet";
import { LatLngTuple } from "leaflet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  TrendingUp,
  MapPin,
  Zap,
  Eye,
  Award,
  AlertCircle,
  Leaf,
  Target,
} from "lucide-react";
import "leaflet/dist/leaflet.css";

// Fix for default markers in react-leaflet
import L from "leaflet";
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

interface District {
  id: string;
  name: string;
  nameAr: string;
  position: LatLngTuple;
  color: string;
  projects: number;
  newConstructions: number;
  landscapeOpportunities: number;
  lastActivity: string;
  topCompany?: string;
  avgBudget: string;
  terrain: "urban" | "residential" | "commercial" | "mixed";
  alerts: {
    type: "new_land" | "no_landscape" | "opportunity";
    message: string;
    urgent?: boolean;
  }[];
}

const uaeDistricts: District[] = [
  {
    id: "downtown_dubai",
    name: "Downtown Dubai",
    nameAr: "وسط دبي",
    position: [25.1972, 55.2744],
    color: "#10b981",
    projects: 45,
    newConstructions: 8,
    landscapeOpportunities: 12,
    lastActivity: "منذ ساعتين",
    topCompany: "GreenScape UAE",
    avgBudget: "250,000 AED",
    terrain: "commercial",
    alerts: [
      {
        type: "new_land",
        message: "🧱 تم شراء أرض جديدة بمساحة 1200م² – اليوم!",
        urgent: true,
      },
      { type: "opportunity", message: "💰 مشروع فاخر يطلب عروض تنسيق حدائق" },
    ],
  },
  {
    id: "al_rashidiya",
    name: "Al Rashidiya",
    nameAr: "الراشدية",
    position: [25.2285, 55.3273],
    color: "#f59e0b",
    projects: 28,
    newConstructions: 15,
    landscapeOpportunities: 23,
    lastActivity: "منذ 3 ساعات",
    topCompany: "Desert Bloom",
    avgBudget: "180,000 AED",
    terrain: "residential",
    alerts: [
      {
        type: "no_landscape",
        message: "🚨 15 فيلة حديثة بدون لاندسكيب حتى الآن!",
        urgent: true,
      },
      { type: "opportunity", message: "🌱 حي جديد يحتاج خدمات البستنة" },
    ],
  },
  {
    id: "al_mizhar",
    name: "Al Mizhar",
    nameAr: "المزهر",
    position: [25.2406, 55.4041],
    color: "#ef4444",
    projects: 32,
    newConstructions: 12,
    landscapeOpportunities: 18,
    lastActivity: "منذ ساعة",
    topCompany: "Urban Gardens",
    avgBudget: "220,000 AED",
    terrain: "mixed",
    alerts: [
      { type: "new_land", message: "🏗️ 5 فيلات جديدة في طور الإنشاء" },
      {
        type: "opportunity",
        message: "⭐ عميل VIP يطلب تصميم حديقة استثنائية",
      },
    ],
  },
  {
    id: "khalifa_city",
    name: "Khalifa City A",
    nameAr: "مدينة خليفة أ",
    position: [24.4139, 54.5479],
    color: "#8b5cf6",
    projects: 38,
    newConstructions: 22,
    landscapeOpportunities: 31,
    lastActivity: "منذ 30 دقيقة",
    topCompany: "Emirates Green",
    avgBudget: "320,000 AED",
    terrain: "residential",
    alerts: [
      {
        type: "opportunity",
        message: "🔥 أكبر مشروع سكني لهذا العام - 200 فيلة",
        urgent: true,
      },
      { type: "new_land", message: "📍 منطقة جديدة تحتاج مقاولين مختصين" },
    ],
  },
  {
    id: "al_zahia",
    name: "Al Zahia",
    nameAr: "الزاهية",
    position: [25.3218, 55.5136],
    color: "#06b6d4",
    projects: 19,
    newConstructions: 9,
    landscapeOpportunities: 14,
    lastActivity: "منذ 45 دقيقة",
    avgBudget: "195,000 AED",
    terrain: "residential",
    alerts: [
      { type: "no_landscape", message: "💎 حي راقي بدون منافسة قوية بعد" },
      { type: "opportunity", message: "🌿 فرصة ذهبية للدخول في السوق" },
    ],
  },
];

const SmartLandscapeRadar: React.FC = () => {
  const [selectedDistrict, setSelectedDistrict] = useState<District | null>(
    null,
  );
  const [viewMode, setViewMode] = useState<
    "satellite" | "terrain" | "standard"
  >("standard");
  const [showOpportunities, setShowOpportunities] = useState(false);
  const [realTimeAlerts, setRealTimeAlerts] =
    useState<District[]>(uaeDistricts);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeAlerts((prev) =>
        prev.map((district) => ({
          ...district,
          projects: district.projects + Math.floor(Math.random() * 2),
          newConstructions:
            district.newConstructions + Math.floor(Math.random() * 3),
        })),
      );
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const getTileLayer = () => {
    switch (viewMode) {
      case "satellite":
        return "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";
      case "terrain":
        return "https://server.arcgisonline.com/ArcGIS/rest/services/World_Physical_Map/MapServer/tile/{z}/{y}/{x}";
      default:
        return "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    }
  };

  const getDistrictIcon = (district: District) => {
    const hasUrgentAlert = district.alerts.some((alert) => alert.urgent);
    return new L.DivIcon({
      html: `
        <div style="
          background: ${district.color};
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 3px solid white;
          box-shadow: 0 2px 10px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 12px;
          position: relative;
          ${hasUrgentAlert ? "animation: pulse 2s infinite;" : ""}
        ">
          ${district.newConstructions}
          ${hasUrgentAlert ? '<div style="position: absolute; top: -5px; right: -5px; width: 12px; height: 12px; background: #ef4444; border-radius: 50%; border: 2px solid white;"></div>' : ""}
        </div>
        <style>
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
          }
        </style>
      `,
      className: "custom-district-icon",
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      {/* Header */}
      <div className="relative z-10 pt-20 pb-10">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-4 bg-gradient-to-r from-green-500 to-blue-500 text-white border-0 px-6 py-2 text-lg">
              🛰️ KX Smart Terrain
            </Badge>
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              الحيّ الذكي
            </h1>
            <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-blue-300">
              Smart Landscape Radar
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              كشف ذكي للفرص العمرانية • اكتشف الأحياء الجديدة • تتبع المشاريع
              الحية • استثمر في المستقبل
            </p>
          </motion.div>
        </div>
      </div>

      {/* Control Panel */}
      <div className="relative z-10 container mx-auto px-4 mb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/20 p-6"
        >
          <div className="flex flex-wrap gap-4 justify-center items-center">
            <div className="flex gap-2">
              <Button
                variant={viewMode === "standard" ? "default" : "outline"}
                onClick={() => setViewMode("standard")}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <MapPin className="w-4 h-4 mr-2" />
                خريطة عادية
              </Button>
              <Button
                variant={viewMode === "satellite" ? "default" : "outline"}
                onClick={() => setViewMode("satellite")}
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
              >
                🛰️ قمر صناعي
              </Button>
              <Button
                variant={viewMode === "terrain" ? "default" : "outline"}
                onClick={() => setViewMode("terrain")}
                className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
              >
                🏔️ تضاريس
              </Button>
            </div>

            <Button
              variant={showOpportunities ? "default" : "outline"}
              onClick={() => setShowOpportunities(!showOpportunities)}
              className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700"
            >
              <Eye className="w-4 h-4 mr-2" />
              👁️ اكتشف الأحياء بدون لاندسكيب
            </Button>

            <Button className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700">
              <Zap className="w-4 h-4 mr-2" />
              🤖 KnouxAI التوصيات
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Map Container */}
      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/20 p-6 h-[600px]"
        >
          <MapContainer
            center={[25.2048, 55.2708]}
            zoom={10}
            style={{ height: "100%", width: "100%", borderRadius: "12px" }}
          >
            <TileLayer url={getTileLayer()} />

            {realTimeAlerts.map((district) => (
              <React.Fragment key={district.id}>
                <Marker
                  position={district.position}
                  icon={getDistrictIcon(district)}
                  eventHandlers={{
                    click: () => setSelectedDistrict(district),
                  }}
                >
                  <Popup className="custom-popup">
                    <div className="p-4 bg-gradient-to-br from-slate-900 to-purple-900 text-white rounded-lg min-w-[300px]">
                      <h3 className="text-xl font-bold mb-2 text-center">
                        {district.nameAr} - {district.name}
                      </h3>

                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-400">
                            {district.projects}
                          </div>
                          <div className="text-sm text-gray-300">
                            مشاريع مكتملة
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-yellow-400">
                            {district.newConstructions}
                          </div>
                          <div className="text-sm text-gray-300">
                            مباني جديدة
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2 mb-4">
                        {district.alerts.map((alert, idx) => (
                          <div
                            key={idx}
                            className={`p-2 rounded text-sm ${
                              alert.urgent
                                ? "bg-red-500/20 border border-red-500/50 text-red-200"
                                : "bg-blue-500/20 border border-blue-500/50 text-blue-200"
                            }`}
                          >
                            {alert.message}
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-col gap-2">
                        <Button className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                          هل تملك شركة؟ نفّذ الآن في هذا الحي! 🚀
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full border-yellow-500 text-yellow-400 hover:bg-yellow-500/10"
                        >
                          اقترح أفضل تنسيق لحديقة في {district.nameAr} 👇
                        </Button>
                      </div>
                    </div>
                  </Popup>
                </Marker>

                {showOpportunities && district.landscapeOpportunities > 15 && (
                  <Circle
                    center={district.position}
                    radius={1000}
                    pathOptions={{
                      color: "#fbbf24",
                      fillColor: "#fbbf24",
                      fillOpacity: 0.2,
                      weight: 2,
                      dashArray: "5, 5",
                    }}
                  />
                )}
              </React.Fragment>
            ))}
          </MapContainer>
        </motion.div>
      </div>

      {/* Live Stats */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="grid md:grid-cols-3 gap-6"
        >
          <Card className="bg-black/40 backdrop-blur-xl border-green-500/30 text-white">
            <CardHeader className="text-center">
              <CardTitle className="text-green-400 flex items-center justify-center gap-2">
                <TrendingUp className="w-5 h-5" />
                🏆 أكثر الأحياء نشاطاً
              </CardTitle>
            </CardHeader>
            <CardContent>
              {realTimeAlerts
                .sort((a, b) => b.projects - a.projects)
                .slice(0, 3)
                .map((district, idx) => (
                  <div
                    key={district.id}
                    className="flex justify-between items-center py-2 border-b border-gray-700 last:border-0"
                  >
                    <div>
                      <div className="font-semibold">{district.nameAr}</div>
                      <div className="text-sm text-gray-400">
                        {district.topCompany}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-400">
                        {district.projects}
                      </div>
                      <div className="text-xs text-gray-400">مشروع</div>
                    </div>
                  </div>
                ))}
            </CardContent>
          </Card>

          <Card className="bg-black/40 backdrop-blur-xl border-yellow-500/30 text-white">
            <CardHeader className="text-center">
              <CardTitle className="text-yellow-400 flex items-center justify-center gap-2">
                <AlertCircle className="w-5 h-5" />
                🚨 فرص عاجلة
              </CardTitle>
            </CardHeader>
            <CardContent>
              {realTimeAlerts
                .filter((d) => d.alerts.some((a) => a.urgent))
                .slice(0, 3)
                .map((district) => (
                  <div
                    key={district.id}
                    className="py-2 border-b border-gray-700 last:border-0"
                  >
                    <div className="font-semibold text-yellow-300">
                      {district.nameAr}
                    </div>
                    <div className="text-sm text-gray-300">
                      {district.alerts.find((a) => a.urgent)?.message}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      {district.lastActivity}
                    </div>
                  </div>
                ))}
            </CardContent>
          </Card>

          <Card className="bg-black/40 backdrop-blur-xl border-blue-500/30 text-white">
            <CardHeader className="text-center">
              <CardTitle className="text-blue-400 flex items-center justify-center gap-2">
                <Leaf className="w-5 h-5" />
                🌱 فرص لاندسكيب
              </CardTitle>
            </CardHeader>
            <CardContent>
              {realTimeAlerts
                .sort(
                  (a, b) => b.landscapeOpportunities - a.landscapeOpportunities,
                )
                .slice(0, 3)
                .map((district) => (
                  <div
                    key={district.id}
                    className="flex justify-between items-center py-2 border-b border-gray-700 last:border-0"
                  >
                    <div>
                      <div className="font-semibold">{district.nameAr}</div>
                      <div className="text-sm text-gray-400">
                        متوسط الميزانية: {district.avgBudget}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-blue-400">
                        {district.landscapeOpportunities}
                      </div>
                      <div className="text-xs text-gray-400">فرصة</div>
                    </div>
                  </div>
                ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Bottom CTA */}
      <div className="relative z-10 container mx-auto px-4 py-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="bg-gradient-to-r from-green-600/20 to-blue-600/20 backdrop-blur-xl rounded-2xl border border-white/20 p-8"
        >
          <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            مستعد لتحويل الإمارات خضراء؟
          </h3>
          <p className="text-xl text-gray-300 mb-6">
            انضم إلى شبكة الشركات الذكية واكتشف الفرص قبل المنافسين
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
            >
              <Target className="w-5 h-5 mr-2" />
              سجّل شركتك الآن مجاناً
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-blue-400 text-blue-400 hover:bg-blue-400/10"
            >
              <Award className="w-5 h-5 mr-2" />
              شاهد العرض التوضيحي
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Selected District Modal */}
      <AnimatePresence>
        {selectedDistrict && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedDistrict(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-gradient-to-br from-slate-900 to-purple-900 rounded-2xl border border-white/20 p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-white mb-2">
                  {selectedDistrict.nameAr} - {selectedDistrict.name}
                </h2>
                <Badge className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
                  {selectedDistrict.terrain === "residential" && "🏘️ سكني"}
                  {selectedDistrict.terrain === "commercial" && "🏢 تجاري"}
                  {selectedDistrict.terrain === "mixed" && "🏙️ مختلط"}
                  {selectedDistrict.terrain === "urban" && "🌆 حضري"}
                </Badge>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div className="bg-black/40 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-green-400 mb-3">
                      📊 إحصائيات الحي
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-300">
                          المشاريع المكتملة:
                        </span>
                        <span className="text-green-400 font-bold">
                          {selectedDistrict.projects}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">المباني الجديدة:</span>
                        <span className="text-yellow-400 font-bold">
                          {selectedDistrict.newConstructions}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">فرص اللاندسكيب:</span>
                        <span className="text-blue-400 font-bold">
                          {selectedDistrict.landscapeOpportunities}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">متوسط الميزانية:</span>
                        <span className="text-purple-400 font-bold">
                          {selectedDistrict.avgBudget}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-black/40 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-blue-400 mb-3">
                      🚨 تنبيهات حية
                    </h3>
                    <div className="space-y-2">
                      {selectedDistrict.alerts.map((alert, idx) => (
                        <div
                          key={idx}
                          className={`p-3 rounded-lg text-sm ${
                            alert.urgent
                              ? "bg-red-500/20 border border-red-500/50 text-red-200"
                              : "bg-blue-500/20 border border-blue-500/50 text-blue-200"
                          }`}
                        >
                          {alert.message}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Button className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-lg py-4">
                  🚀 ابدأ مشروعك في {selectedDistrict.nameAr} الآن
                </Button>
                <div className="grid md:grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    className="border-yellow-500 text-yellow-400 hover:bg-yellow-500/10"
                  >
                    🤖 توصيات KnouxAI
                  </Button>
                  <Button
                    variant="outline"
                    className="border-purple-500 text-purple-400 hover:bg-purple-500/10"
                  >
                    📞 تواصل مع العملاء
                  </Button>
                </div>
              </div>

              <Button
                variant="outline"
                className="absolute top-4 right-4 border-gray-500 text-gray-400 hover:bg-gray-500/10"
                onClick={() => setSelectedDistrict(null)}
              >
                ✕
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SmartLandscapeRadar;
