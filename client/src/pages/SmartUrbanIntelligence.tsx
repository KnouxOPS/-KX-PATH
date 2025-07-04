import React, { useState, useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polygon,
  Circle,
} from "react-leaflet";
import { LatLngTuple } from "leaflet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  MapPin,
  Satellite,
  Mountain,
  Zap,
  Activity,
  Bell,
  Building2,
  Home,
  Truck,
  FileText,
  TrendingUp,
  DollarSign,
  Clock,
  Eye,
  Target,
  Wifi,
  BarChart3,
  Settings,
  AlertTriangle,
} from "lucide-react";

// UAE Emirates Data
const uaeEmirates = [
  {
    id: "DU",
    name: "Dubai",
    nameAr: "دبي",
    center: [25.2048, 55.2708] as LatLngTuple,
    color: "#10b981",
  },
  {
    id: "AB",
    name: "Abu Dhabi",
    nameAr: "أبو ظبي",
    center: [24.2534, 54.647] as LatLngTuple,
    color: "#3b82f6",
  },
  {
    id: "SH",
    name: "Sharjah",
    nameAr: "الشارقة",
    center: [25.3463, 55.4209] as LatLngTuple,
    color: "#8b5cf6",
  },
  {
    id: "AJ",
    name: "Ajman",
    nameAr: "عجمان",
    center: [25.4052, 55.5136] as LatLngTuple,
    color: "#f59e0b",
  },
  {
    id: "RA",
    name: "Ras Al Khaimah",
    nameAr: "رأس الخيمة",
    center: [25.7887, 55.9727] as LatLngTuple,
    color: "#ef4444",
  },
  {
    id: "FU",
    name: "Fujairah",
    nameAr: "الفجيرة",
    center: [25.1167, 56.35] as LatLngTuple,
    color: "#06b6d4",
  },
  {
    id: "UM",
    name: "Umm Al Quwain",
    nameAr: "أم القيوين",
    center: [25.5651, 55.755] as LatLngTuple,
    color: "#84cc16",
  },
];

// Opportunity Types
interface Opportunity {
  id: string;
  type: "land_sale" | "new_construction" | "license_approval" | "investment";
  title: string;
  titleAr: string;
  location: string;
  locationAr: string;
  value: number;
  completionRate: number;
  timeAgo: string;
  emirate: string;
  position: LatLngTuple;
  urgent: boolean;
  status: "active" | "pending" | "sold";
}

// Mock Real-time Data
const generateOpportunities = (): Opportunity[] => [
  {
    id: "1",
    type: "new_construction",
    title: "New Villa Under Construction",
    titleAr: "فيلا جديدة قيد الإنشاء",
    location: "Al Nuaimiya - Ajman",
    locationAr: "النعيمية - عجمان",
    value: 2500000,
    completionRate: 95,
    timeAgo: "منذ ساعتين",
    emirate: "AJ",
    position: [25.4052, 55.5136],
    urgent: true,
    status: "active",
  },
  {
    id: "2",
    type: "land_sale",
    title: "Residential Land Sold",
    titleAr: "تم بيع أرض سكنية",
    location: "Al Rashidiya - Sharjah",
    locationAr: "الراشدية - الشارقة",
    value: 1800000,
    completionRate: 88,
    timeAgo: "منذ 4 ساعات",
    emirate: "SH",
    position: [25.3463, 55.4209],
    urgent: false,
    status: "sold",
  },
  {
    id: "3",
    type: "license_approval",
    title: "New Complex License",
    titleAr: "ترخيص مجمع جديد",
    location: "Khalifa City - Abu Dhabi",
    locationAr: "مدينة خليفة - أبوظبي",
    value: 25000000,
    completionRate: 92,
    timeAgo: "منذ 6 ساعات",
    emirate: "AB",
    position: [24.2534, 54.647],
    urgent: true,
    status: "active",
  },
  {
    id: "4",
    type: "investment",
    title: "Investment Opportunity",
    titleAr: "فرصة استثمارية جديدة",
    location: "Downtown Dubai",
    locationAr: "وسط دبي",
    value: 4800000,
    completionRate: 84,
    timeAgo: "الآن",
    emirate: "DU",
    position: [25.2048, 55.2708],
    urgent: true,
    status: "active",
  },
];

const SmartUrbanIntelligence: React.FC = () => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>(
    generateOpportunities(),
  );
  const [selectedEmirate, setSelectedEmirate] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<
    "standard" | "satellite" | "terrain"
  >("standard");
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [isRealTimeActive, setIsRealTimeActive] = useState(true);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [selectedOpportunity, setSelectedOpportunity] =
    useState<Opportunity | null>(null);
  const mapRef = useRef<any>(null);

  // Real-time updates simulation
  useEffect(() => {
    if (!isRealTimeActive) return;

    const interval = setInterval(() => {
      // Simulate new opportunities
      if (Math.random() > 0.7) {
        const newOpportunity: Opportunity = {
          id: Date.now().toString(),
          type: [
            "land_sale",
            "new_construction",
            "license_approval",
            "investment",
          ][Math.floor(Math.random() * 4)] as any,
          title: "New Investment Opportunity",
          titleAr: "فرصة استثمارية جديدة",
          location: "New Location",
          locationAr: "موقع جديد",
          value: 1000000 + Math.random() * 5000000,
          completionRate: 70 + Math.random() * 30,
          timeAgo: "الآن",
          emirate:
            uaeEmirates[Math.floor(Math.random() * uaeEmirates.length)].id,
          position: [
            25.2048 + (Math.random() - 0.5) * 2,
            55.2708 + (Math.random() - 0.5) * 2,
          ],
          urgent: Math.random() > 0.5,
          status: "active",
        };

        setOpportunities((prev) => [newOpportunity, ...prev.slice(0, 9)]);

        // Add notification
        setNotifications((prev) =>
          [
            ...prev,
            {
              id: Date.now(),
              message: `🚨 فرصة جديدة في ${newOpportunity.locationAr}`,
              timestamp: new Date().toISOString(),
              type: "new_opportunity",
            },
          ].slice(-5),
        );
      }
    }, 8000);

    return () => clearInterval(interval);
  }, [isRealTimeActive]);

  const filteredOpportunities = opportunities.filter((opp) => {
    const matchesEmirate =
      selectedEmirate === "all" || opp.emirate === selectedEmirate;
    const matchesSearch =
      searchQuery === "" ||
      opp.titleAr.includes(searchQuery) ||
      opp.locationAr.includes(searchQuery) ||
      opp.title.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesEmirate && matchesSearch;
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ar-AE", {
      style: "currency",
      currency: "AED",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      notation: price > 1000000 ? "compact" : "standard",
      compactDisplay: "short",
    }).format(price);
  };

  const getOpportunityIcon = (type: string) => {
    switch (type) {
      case "new_construction":
        return "🏗️";
      case "land_sale":
        return "🏡";
      case "license_approval":
        return "📋";
      case "investment":
        return "💰";
      default:
        return "🏢";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return { color: "bg-green-500", text: "متاح" };
      case "pending":
        return { color: "bg-yellow-500", text: "قيد المراجعة" };
      case "sold":
        return { color: "bg-gray-500", text: "تم البيع" };
      default:
        return { color: "bg-blue-500", text: "جديد" };
    }
  };

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white">
      {/* Header */}
      <div className="relative z-20 pt-20 pb-8">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F74c3699232444cda89c7094dd408430f%2F904ded2e5f2e4b65a4090ca759a801ec?format=webp&width=800"
                alt="KX PATH Logo"
                className="w-16 h-16 rounded-lg"
              />
              <div>
                <Badge className="bg-gradient-to-r from-green-500 to-blue-500 text-white border-0 px-6 py-2 text-lg">
                  🇦🇪 KX PATH UAE Edition
                </Badge>
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              الحيّ الذكي
            </h1>
            <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-blue-300">
              Smart Urban Intelligence
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              كشف ذكي للفرص العمرانية • مسح حيّ كامل • استخبارات حية • صُنع في
              الإمارات بفخر لخدمة الوطن
            </p>
          </motion.div>

          {/* Control Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/20 p-6 mb-6"
          >
            <div className="grid lg:grid-cols-5 gap-6">
              {/* Search & Emirates Filter */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="البحث في المنطقة..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                    />
                  </div>
                  <Button
                    variant="outline"
                    className="border-blue-500 text-blue-400 hover:bg-blue-500/10"
                  >
                    <Filter className="w-4 h-4" />
                  </Button>
                </div>

                <Select
                  value={selectedEmirate}
                  onValueChange={setSelectedEmirate}
                >
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="جميع الإمارات" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع الإمارات</SelectItem>
                    {uaeEmirates.map((emirate) => (
                      <SelectItem key={emirate.id} value={emirate.id}>
                        {emirate.id} - {emirate.nameAr}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Map Controls */}
              <div className="space-y-4">
                <div className="flex gap-1">
                  <Button
                    variant={viewMode === "standard" ? "default" : "outline"}
                    onClick={() => setViewMode("standard")}
                    size="sm"
                    className="flex-1 text-xs"
                  >
                    خريطة
                  </Button>
                  <Button
                    variant={viewMode === "satellite" ? "default" : "outline"}
                    onClick={() => setViewMode("satellite")}
                    size="sm"
                    className="flex-1 text-xs"
                  >
                    🛰️
                  </Button>
                  <Button
                    variant={viewMode === "terrain" ? "default" : "outline"}
                    onClick={() => setViewMode("terrain")}
                    size="sm"
                    className="flex-1 text-xs"
                  >
                    🏔️
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">
                    الخريطة الحرارية
                  </span>
                  <Switch
                    checked={showHeatmap}
                    onCheckedChange={setShowHeatmap}
                  />
                </div>
              </div>

              {/* Live Status */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">
                    البيانات المباشرة
                  </span>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={isRealTimeActive}
                      onCheckedChange={setIsRealTimeActive}
                    />
                    {isRealTimeActive ? (
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-xs text-green-400">مباشر</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                        <span className="text-xs text-gray-400">متوقف</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-blue-500/20 rounded-lg p-3 border border-blue-500/30">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-blue-300">الفرص النشطة</span>
                    <Activity className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="text-lg font-bold text-blue-400">
                    {
                      filteredOpportunities.filter((o) => o.status === "active")
                        .length
                    }
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-2">
                <Button className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-sm">
                  🎯 صياد الفرص
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-purple-500 text-purple-400 hover:bg-purple-500/10 text-sm"
                >
                  🔍 ذكاء المنافسين
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-yellow-500 text-yellow-400 hover:bg-yellow-500/10 text-sm"
                >
                  📡 ماسح السوق
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="container mx-auto px-4 pb-8">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Live Alerts Panel */}
          <div className="lg:col-span-1">
            <Card className="bg-black/40 backdrop-blur-xl border-white/20 text-white h-fit sticky top-8">
              <CardHeader>
                <CardTitle className="text-yellow-400 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  التنبيهات الحية
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 max-h-96 overflow-y-auto">
                {filteredOpportunities.slice(0, 6).map((opportunity) => (
                  <motion.div
                    key={opportunity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`p-4 rounded-lg border cursor-pointer hover:scale-105 transition-transform ${
                      opportunity.urgent
                        ? "bg-red-500/20 border-red-500/30"
                        : "bg-blue-500/20 border-blue-500/30"
                    }`}
                    onClick={() => setSelectedOpportunity(opportunity)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">
                        {getOpportunityIcon(opportunity.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          {opportunity.urgent && (
                            <Badge className="bg-red-500 text-white text-xs px-1 py-0">
                              🚨
                            </Badge>
                          )}
                          <Badge
                            className={`${getStatusBadge(opportunity.status).color} text-white text-xs px-1 py-0`}
                          >
                            {getStatusBadge(opportunity.status).text}
                          </Badge>
                        </div>
                        <h4 className="font-semibold text-sm mb-1 truncate">
                          {opportunity.titleAr}
                        </h4>
                        <p className="text-xs text-gray-300 mb-2 truncate">
                          {opportunity.locationAr}
                        </p>
                        <div className="flex justify-between items-center">
                          <span className="text-green-400 font-bold text-sm">
                            {formatPrice(opportunity.value)}
                          </span>
                          <span className="text-blue-400 text-xs">
                            {opportunity.completionRate}%
                          </span>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700 text-xs px-2 py-1"
                          >
                            عرض التفاصيل
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-xs px-2 py-1 border-blue-500 text-blue-400"
                          >
                            تقديم عرض
                          </Button>
                        </div>
                        <div className="text-xs text-gray-400 mt-1">
                          {opportunity.timeAgo}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Map Container */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/20 overflow-hidden h-[600px] relative"
            >
              <MapContainer
                center={[24.5, 55.5]}
                zoom={7}
                style={{ height: "100%", width: "100%" }}
                ref={mapRef}
              >
                <TileLayer url={getTileLayer()} />

                {/* Emirates Polygons with Heatmap */}
                {uaeEmirates.map((emirate) => {
                  const emirateOpportunities = filteredOpportunities.filter(
                    (o) => o.emirate === emirate.id,
                  );
                  const heatmapOpacity = showHeatmap
                    ? Math.min(emirateOpportunities.length * 0.1, 0.8)
                    : 0.2;

                  return (
                    <Circle
                      key={emirate.id}
                      center={emirate.center}
                      radius={30000}
                      pathOptions={{
                        color: emirate.color,
                        fillColor: emirate.color,
                        fillOpacity: heatmapOpacity,
                        weight: 2,
                      }}
                    >
                      <Popup>
                        <div className="p-3 bg-gradient-to-br from-slate-900 to-blue-900 text-white rounded-lg min-w-[200px]">
                          <h3 className="font-bold text-lg mb-2">
                            {emirate.nameAr}
                          </h3>
                          <div className="space-y-1">
                            <div className="flex justify-between">
                              <span>الفرص النشطة:</span>
                              <span className="text-green-400 font-bold">
                                {emirateOpportunities.length}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>إجمالي القيمة:</span>
                              <span className="text-blue-400 font-bold">
                                {formatPrice(
                                  emirateOpportunities.reduce(
                                    (sum, o) => sum + o.value,
                                    0,
                                  ),
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Popup>
                    </Circle>
                  );
                })}

                {/* Opportunity Markers */}
                {filteredOpportunities.map((opportunity) => (
                  <Marker
                    key={opportunity.id}
                    position={opportunity.position}
                    eventHandlers={{
                      click: () => setSelectedOpportunity(opportunity),
                    }}
                  >
                    <Popup>
                      <div className="p-4 bg-gradient-to-br from-slate-900 to-purple-900 text-white rounded-lg min-w-[300px]">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-bold text-lg">
                              {getOpportunityIcon(opportunity.type)}{" "}
                              {opportunity.titleAr}
                            </h4>
                            <p className="text-sm text-gray-300">
                              {opportunity.locationAr}
                            </p>
                          </div>
                          <Badge
                            className={`${getStatusBadge(opportunity.status).color} text-white`}
                          >
                            {getStatusBadge(opportunity.status).text}
                          </Badge>
                        </div>

                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between">
                            <span className="text-gray-300">القيمة:</span>
                            <span className="font-bold text-green-400">
                              {formatPrice(opportunity.value)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">نسبة الإنجاز:</span>
                            <span className="text-blue-400">
                              {opportunity.completionRate}%
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-300">آخر تحديث:</span>
                            <span className="text-yellow-400">
                              {opportunity.timeAgo}
                            </span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Button className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                            📞 تواصل مع المطور
                          </Button>
                          <div className="grid grid-cols-2 gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-blue-500 text-blue-400"
                            >
                              📊 تحليل مفصل
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-purple-500 text-purple-400"
                            >
                              ❤️ حفظ الفرصة
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>

              {/* Live Notifications Overlay */}
              <AnimatePresence>
                {notifications.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, x: 300 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 300 }}
                    className="absolute top-4 right-4 z-20 space-y-2"
                  >
                    {notifications.slice(-3).map((notif) => (
                      <motion.div
                        key={notif.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="bg-blue-600/90 backdrop-blur-sm text-white p-3 rounded-lg border border-blue-400/30 max-w-xs"
                      >
                        <div className="flex items-center gap-2">
                          <Bell className="w-4 h-4" />
                          <span className="text-sm">{notif.message}</span>
                        </div>
                        <div className="text-xs text-blue-200 mt-1">
                          {new Date(notif.timestamp).toLocaleTimeString(
                            "ar-AE",
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Map Legend */}
              <div className="absolute bottom-4 left-4 z-20 bg-black/60 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                <h4 className="text-white font-semibold mb-2 text-sm">
                  الإمارات السبع
                </h4>
                <div className="grid grid-cols-4 gap-2 text-xs">
                  {uaeEmirates.map((emirate) => (
                    <div key={emirate.id} className="flex items-center gap-1">
                      <div
                        className={`w-3 h-3 rounded-full`}
                        style={{ backgroundColor: emirate.color }}
                      ></div>
                      <span className="text-white">{emirate.id}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer with KX PATH Branding */}
      <div className="bg-black/60 backdrop-blur-xl border-t border-white/20 py-6">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-4 mb-2">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F74c3699232444cda89c7094dd408430f%2F904ded2e5f2e4b65a4090ca759a801ec?format=webp&width=800"
              alt="KX PATH Logo"
              className="w-12 h-12 rounded-lg"
            />
            <div className="text-left">
              <h3 className="text-white font-bold">KX PATH</h3>
              <p className="text-gray-300 text-sm">
                نظام تشغيل المناظر الطبيعية
              </p>
            </div>
          </div>
          <p className="text-gray-400 text-sm">
            🇦🇪 صُنع في الإمارات بفخر لخدمة الوطن • KX PATH v2.0 UAE Edition
          </p>
        </div>
      </div>
    </div>
  );
};

export default SmartUrbanIntelligence;
