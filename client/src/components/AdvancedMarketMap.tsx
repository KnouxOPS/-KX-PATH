import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  Polygon,
  useMap,
  LayersControl,
  FeatureGroup,
} from "react-leaflet";
import { LatLngTuple, LatLngBounds, DivIcon } from "leaflet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  Search,
  Filter,
  Layers,
  Activity,
  DollarSign,
  Clock,
  Users,
  Home,
  Truck,
  Sparkles,
  BarChart3,
  Wifi,
  Bell,
  Settings,
  Play,
  Pause,
} from "lucide-react";
import "leaflet/dist/leaflet.css";

// Advanced Data Interfaces
interface MarketData {
  id: string;
  position: LatLngTuple;
  type: "residential" | "commercial" | "industrial" | "mixed";
  status: "active" | "pending" | "sold" | "construction" | "planning";
  price: number;
  priceHistory: { date: string; price: number }[];
  size: number;
  listingDate: string;
  developer?: string;
  urgency: "low" | "medium" | "high" | "critical";
  tags: string[];
  description: string;
  amenities: string[];
  roi?: number;
  trending: boolean;
  views: number;
  contacts: number;
}

interface District {
  id: string;
  name: string;
  nameAr: string;
  bounds: LatLngTuple[];
  center: LatLngTuple;
  color: string;
  opacity: number;
  properties: MarketData[];
  stats: {
    avgPrice: number;
    priceChange: number;
    totalListings: number;
    newListings: number;
    activeBuyers: number;
    averageDays: number;
    satisfaction: number;
  };
  infrastructure: {
    schools: number;
    hospitals: number;
    malls: number;
    mosques: number;
    parks: number;
    transport: number;
  };
  alerts: {
    type:
      | "price_drop"
      | "new_listing"
      | "hot_market"
      | "investment_opportunity";
    message: string;
    timestamp: string;
    urgent: boolean;
  }[];
}

// Mock Real-time Data
const generateRealTimeData = (): District[] => [
  {
    id: "downtown_dubai",
    name: "Downtown Dubai",
    nameAr: "وسط دبي",
    bounds: [
      [25.19, 55.265] as LatLngTuple,
      [25.205, 55.265] as LatLngTuple,
      [25.205, 55.285] as LatLngTuple,
      [25.19, 55.285] as LatLngTuple,
    ],
    center: [25.1972, 55.2744] as LatLngTuple,
    color: "#10b981",
    opacity: 0.3,
    properties: Array.from({ length: 15 }, (_, i) => ({
      id: `dt_${i}`,
      position: [
        25.19 + Math.random() * 0.015,
        55.265 + Math.random() * 0.02,
      ] as LatLngTuple,
      type: Math.random() > 0.7 ? "commercial" : ("residential" as any),
      status: ["active", "pending", "construction"][
        Math.floor(Math.random() * 3)
      ] as any,
      price: 1500000 + Math.random() * 3500000,
      priceHistory: Array.from({ length: 6 }, (_, j) => ({
        date: new Date(Date.now() - j * 30 * 24 * 60 * 60 * 1000).toISOString(),
        price: 1500000 + Math.random() * 3500000,
      })),
      size: 800 + Math.random() * 1200,
      listingDate: new Date(
        Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000,
      ).toISOString(),
      developer: ["Emaar", "Damac", "Sobha"][Math.floor(Math.random() * 3)],
      urgency: ["low", "medium", "high", "critical"][
        Math.floor(Math.random() * 4)
      ] as any,
      tags: ["luxury", "branded", "furnished", "investment"].slice(
        0,
        Math.floor(Math.random() * 4) + 1,
      ),
      description: "Premium property in the heart of Dubai",
      amenities: ["Pool", "Gym", "Parking", "Security", "Garden"],
      roi: 6 + Math.random() * 4,
      trending: Math.random() > 0.7,
      views: Math.floor(Math.random() * 1000),
      contacts: Math.floor(Math.random() * 50),
    })),
    stats: {
      avgPrice: 2500000,
      priceChange: 8.5,
      totalListings: 145,
      newListings: 23,
      activeBuyers: 89,
      averageDays: 45,
      satisfaction: 4.6,
    },
    infrastructure: {
      schools: 12,
      hospitals: 5,
      malls: 8,
      mosques: 15,
      parks: 6,
      transport: 10,
    },
    alerts: [
      {
        type: "hot_market",
        message: "🔥 ارتفاع 15% في الأسعار هذا الشهر - فرصة استثمارية",
        timestamp: new Date().toISOString(),
        urgent: true,
      },
      {
        type: "new_listing",
        message: "🏢 5 مشاريع جديدة أعلنت عن إطلاقها قريباً",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        urgent: false,
      },
    ],
  },
  // Add more districts...
];

const AdvancedMarketMap: React.FC = () => {
  const [districts, setDistricts] = useState<District[]>(
    generateRealTimeData(),
  );
  const [selectedProperty, setSelectedProperty] = useState<MarketData | null>(
    null,
  );
  const [selectedDistrict, setSelectedDistrict] = useState<District | null>(
    null,
  );
  const [viewMode, setViewMode] = useState<
    "satellite" | "terrain" | "standard"
  >("standard");
  const [activeLayer, setActiveLayer] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000000]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isRealTimeActive, setIsRealTimeActive] = useState(true);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [filterType, setFilterType] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const mapRef = useRef<any>(null);

  // Real-time data simulation
  useEffect(() => {
    if (!isRealTimeActive) return;

    const interval = setInterval(() => {
      setDistricts((prev) =>
        prev.map((district) => ({
          ...district,
          properties: district.properties.map((prop) => ({
            ...prop,
            views: prop.views + Math.floor(Math.random() * 5),
            contacts: prop.contacts + (Math.random() > 0.8 ? 1 : 0),
            trending: Math.random() > 0.85,
          })),
          stats: {
            ...district.stats,
            activeBuyers:
              district.stats.activeBuyers + Math.floor(Math.random() * 3) - 1,
          },
        })),
      );

      // Add random notifications
      if (Math.random() > 0.7) {
        setNotifications((prev) =>
          [
            ...prev,
            {
              id: Date.now(),
              message: `🔔 نشاط جديد في ${districts[Math.floor(Math.random() * districts.length)].nameAr}`,
              timestamp: new Date().toISOString(),
              type: "info",
            },
          ].slice(-5),
        );
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isRealTimeActive, districts]);

  // Filter properties based on criteria
  const filteredDistricts = districts.map((district) => ({
    ...district,
    properties: district.properties.filter((prop) => {
      const matchesPrice =
        prop.price >= priceRange[0] && prop.price <= priceRange[1];
      const matchesType = filterType === "all" || prop.type === filterType;
      const matchesStatus =
        filterStatus === "all" || prop.status === filterStatus;
      const matchesSearch =
        searchQuery === "" ||
        district.nameAr.includes(searchQuery) ||
        district.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prop.tags.some((tag) => tag.includes(searchQuery.toLowerCase()));

      return matchesPrice && matchesType && matchesStatus && matchesSearch;
    }),
  }));

  const getPropertyIcon = (property: MarketData): DivIcon => {
    const urgencyColors = {
      low: "#10b981",
      medium: "#f59e0b",
      high: "#ef4444",
      critical: "#dc2626",
    };

    const statusIcons = {
      active: "🏠",
      pending: "⏳",
      sold: "✅",
      construction: "🏗️",
      planning: "📋",
    };

    return new DivIcon({
      html: `
        <div style="
          background: ${urgencyColors[property.urgency]};
          width: ${property.trending ? "50px" : "40px"};
          height: ${property.trending ? "50px" : "40px"};
          border-radius: 50%;
          border: 3px solid white;
          box-shadow: 0 4px 15px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 16px;
          position: relative;
          ${property.trending ? "animation: pulse 2s infinite;" : ""}
          ${property.urgency === "critical" ? "animation: bounce 1s infinite;" : ""}
        ">
          ${statusIcons[property.status]}
          ${property.trending ? '<div style="position: absolute; top: -5px; right: -5px; width: 12px; height: 12px; background: #f59e0b; border-radius: 50%; border: 2px solid white;"></div>' : ""}
          ${property.urgency === "critical" ? '<div style="position: absolute; top: -8px; right: -8px; width: 16px; height: 16px; background: #dc2626; border-radius: 50%; border: 2px solid white; animation: ping 1s infinite;"></div>' : ""}
        </div>
      `,
      className: "custom-property-icon",
      iconSize: [property.trending ? 50 : 40, property.trending ? 50 : 40],
      iconAnchor: [property.trending ? 25 : 20, property.trending ? 50 : 40],
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ar-AE", {
      style: "currency",
      currency: "AED",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
      {/* Header */}
      <div className="relative z-20 pt-20 pb-8">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <Badge className="mb-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 px-6 py-2 text-lg">
              🛰️ Knoux Market Intelligence
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              خريطة السوق الذكية
            </h1>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              خريطة تفاعلية حية مرتبطة بالسوق • بيانات لحظية • ذكاء اصطناعي •
              تحليلات متقدمة
            </p>
          </motion.div>

          {/* Control Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/20 p-6 mb-6"
          >
            <div className="grid lg:grid-cols-4 gap-6">
              {/* Search & Filters */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="البحث في الأحياء والمشاريع..."
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

                <div className="grid grid-cols-2 gap-2">
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="نوع العقار" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">جميع الأنواع</SelectItem>
                      <SelectItem value="residential">سكني</SelectItem>
                      <SelectItem value="commercial">تجاري</SelectItem>
                      <SelectItem value="industrial">صناعي</SelectItem>
                      <SelectItem value="mixed">مختلط</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="حالة العقار" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">جميع الحالات</SelectItem>
                      <SelectItem value="active">متاح</SelectItem>
                      <SelectItem value="pending">قيد التفاوض</SelectItem>
                      <SelectItem value="construction">تحت الإنشاء</SelectItem>
                      <SelectItem value="planning">مخطط</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-300">
                    نطاق السعر: {formatPrice(priceRange[0])} -{" "}
                    {formatPrice(priceRange[1])}
                  </label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange as any}
                    max={10000000}
                    min={0}
                    step={100000}
                    className="w-full"
                  />
                </div>
              </div>

              {/* View Controls */}
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Button
                    variant={viewMode === "standard" ? "default" : "outline"}
                    onClick={() => setViewMode("standard")}
                    size="sm"
                    className="flex-1"
                  >
                    <MapPin className="w-4 h-4 mr-1" />
                    عادية
                  </Button>
                  <Button
                    variant={viewMode === "satellite" ? "default" : "outline"}
                    onClick={() => setViewMode("satellite")}
                    size="sm"
                    className="flex-1"
                  >
                    🛰️ قمر
                  </Button>
                </div>

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
                      <Wifi className="w-4 h-4 text-green-400" />
                    ) : (
                      <Wifi className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
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

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">لوحة التحليلات</span>
                  <Switch
                    checked={showAnalytics}
                    onCheckedChange={setShowAnalytics}
                  />
                </div>
              </div>

              {/* Quick Stats */}
              <div className="space-y-2">
                <div className="bg-green-500/20 rounded-lg p-3 border border-green-500/30">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-green-300">
                      العقارات النشطة
                    </span>
                    <Activity className="w-4 h-4 text-green-400" />
                  </div>
                  <div className="text-2xl font-bold text-green-400">
                    {filteredDistricts.reduce(
                      (sum, d) =>
                        sum +
                        d.properties.filter((p) => p.status === "active")
                          .length,
                      0,
                    )}
                  </div>
                </div>

                <div className="bg-blue-500/20 rounded-lg p-3 border border-blue-500/30">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-blue-300">متوسط السعر</span>
                    <DollarSign className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="text-lg font-bold text-blue-400">
                    {formatPrice(
                      filteredDistricts.reduce(
                        (sum, d) => sum + d.stats.avgPrice,
                        0,
                      ) / filteredDistricts.length,
                    )}
                  </div>
                </div>

                <div className="bg-purple-500/20 rounded-lg p-3 border border-purple-500/30">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-purple-300">
                      المشاهدات الحية
                    </span>
                    <Eye className="w-4 h-4 text-purple-400" />
                  </div>
                  <div className="text-lg font-bold text-purple-400">
                    {filteredDistricts
                      .reduce(
                        (sum, d) =>
                          sum +
                          d.properties.reduce((pSum, p) => pSum + p.views, 0),
                        0,
                      )
                      .toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Map Container */}
      <div className="relative z-10 container mx-auto px-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/20 overflow-hidden"
        >
          <div className="h-[700px] relative">
            <MapContainer
              center={[25.2048, 55.2708]}
              zoom={11}
              style={{ height: "100%", width: "100%" }}
              ref={mapRef}
            >
              <TileLayer url={getTileLayer()} />

              {/* District Polygons */}
              {filteredDistricts.map((district) => (
                <React.Fragment key={district.id}>
                  <Polygon
                    positions={district.bounds}
                    pathOptions={{
                      color: district.color,
                      fillColor: district.color,
                      fillOpacity: showHeatmap
                        ? district.properties.length * 0.05
                        : district.opacity,
                      weight: 2,
                      dashArray:
                        district.properties.length > 10 ? undefined : "5, 5",
                    }}
                    eventHandlers={{
                      click: () => setSelectedDistrict(district),
                    }}
                  >
                    <Popup>
                      <div className="p-4 bg-gradient-to-br from-slate-900 to-blue-900 text-white rounded-lg min-w-[350px]">
                        <h3 className="text-xl font-bold mb-3 text-center">
                          {district.nameAr} - {district.name}
                        </h3>

                        <div className="grid grid-cols-2 gap-3 mb-4">
                          <div className="text-center bg-black/30 rounded-lg p-2">
                            <div className="text-lg font-bold text-green-400">
                              {district.properties.length}
                            </div>
                            <div className="text-xs text-gray-300">
                              عقارات متاحة
                            </div>
                          </div>
                          <div className="text-center bg-black/30 rounded-lg p-2">
                            <div className="text-lg font-bold text-blue-400">
                              {formatPrice(district.stats.avgPrice)}
                            </div>
                            <div className="text-xs text-gray-300">
                              متوسط السعر
                            </div>
                          </div>
                          <div className="text-center bg-black/30 rounded-lg p-2">
                            <div className="text-lg font-bold text-purple-400">
                              {district.stats.activeBuyers}
                            </div>
                            <div className="text-xs text-gray-300">
                              مشترين نشطين
                            </div>
                          </div>
                          <div className="text-center bg-black/30 rounded-lg p-2">
                            <div className="text-lg font-bold text-yellow-400">
                              +{district.stats.priceChange}%
                            </div>
                            <div className="text-xs text-gray-300">
                              نمو الأسعار
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2 mb-4">
                          {district.alerts.slice(0, 2).map((alert, idx) => (
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

                        <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                          🎯 استكشف الفرص في {district.nameAr}
                        </Button>
                      </div>
                    </Popup>
                  </Polygon>

                  {/* Property Markers */}
                  {district.properties.map((property) => (
                    <Marker
                      key={property.id}
                      position={property.position}
                      icon={getPropertyIcon(property)}
                      eventHandlers={{
                        click: () => setSelectedProperty(property),
                      }}
                    >
                      <Popup>
                        <div className="p-4 bg-gradient-to-br from-slate-900 to-purple-900 text-white rounded-lg min-w-[300px]">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h4 className="font-bold text-lg">
                                {property.type === "residential"
                                  ? "🏠 سكني"
                                  : "🏢 تجاري"}
                              </h4>
                              <p className="text-sm text-gray-300">
                                {property.developer}
                              </p>
                            </div>
                            <Badge
                              className={`
                              ${property.status === "active" ? "bg-green-500" : ""}
                              ${property.status === "pending" ? "bg-yellow-500" : ""}
                              ${property.status === "construction" ? "bg-blue-500" : ""}
                              ${property.status === "planning" ? "bg-purple-500" : ""}
                            `}
                            >
                              {property.status === "active" && "متاح"}
                              {property.status === "pending" && "قيد التفاوض"}
                              {property.status === "construction" &&
                                "تحت الإنشاء"}
                              {property.status === "planning" && "مخطط"}
                            </Badge>
                          </div>

                          <div className="space-y-2 mb-4">
                            <div className="flex justify-between">
                              <span className="text-gray-300">السعر:</span>
                              <span className="font-bold text-green-400">
                                {formatPrice(property.price)}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-300">المساحة:</span>
                              <span className="text-blue-400">
                                {property.size.toLocaleString()} م²
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-300">
                                العائد المتوقع:
                              </span>
                              <span className="text-purple-400">
                                {property.roi}%
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-300">المشاهدات:</span>
                              <span className="text-yellow-400">
                                {property.views.toLocaleString()}
                              </span>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-1 mb-4">
                            {property.tags.map((tag, idx) => (
                              <Badge
                                key={idx}
                                variant="outline"
                                className="text-xs"
                              >
                                {tag}
                              </Badge>
                            ))}
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
                                ❤️ حفظ العقار
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </React.Fragment>
              ))}
            </MapContainer>

            {/* Live Notifications */}
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
                        {new Date(notif.timestamp).toLocaleTimeString("ar-AE")}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Map Controls */}
            <div className="absolute bottom-4 left-4 z-20 flex flex-col gap-2">
              <Button
                variant="outline"
                size="sm"
                className="bg-black/60 border-white/20 text-white hover:bg-black/80"
                onClick={() => setShowAnalytics(!showAnalytics)}
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                التحليلات
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-black/60 border-white/20 text-white hover:bg-black/80"
              >
                <Target className="w-4 h-4 mr-2" />
                تحديد منطقة
              </Button>
            </div>

            {/* Real-time Indicator */}
            <div className="absolute top-4 left-4 z-20">
              <div className="bg-black/60 backdrop-blur-sm rounded-lg p-2 border border-white/20">
                <div className="flex items-center gap-2 text-white">
                  {isRealTimeActive ? (
                    <>
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-sm">مباشر</span>
                    </>
                  ) : (
                    <>
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                      <span className="text-sm">متوقف</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Analytics Panel */}
      <AnimatePresence>
        {showAnalytics && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-0 left-0 right-0 z-30 bg-black/90 backdrop-blur-xl border-t border-white/20 p-6"
          >
            <div className="container mx-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-white">
                  📊 لوحة التحليلات المباشرة
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAnalytics(false)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </Button>
              </div>

              <div className="grid md:grid-cols-4 gap-4">
                <Card className="bg-gradient-to-br from-green-900/50 to-green-700/50 border-green-500/30">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-green-300 text-sm">
                          ��جمالي القيمة السوقية
                        </p>
                        <p className="text-2xl font-bold text-green-400">
                          {formatPrice(
                            filteredDistricts.reduce(
                              (sum, d) =>
                                sum +
                                d.properties.reduce(
                                  (pSum, p) => pSum + p.price,
                                  0,
                                ),
                              0,
                            ),
                          )}
                        </p>
                      </div>
                      <DollarSign className="w-8 h-8 text-green-400" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-blue-900/50 to-blue-700/50 border-blue-500/30">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-300 text-sm">النشاط اليومي</p>
                        <p className="text-2xl font-bold text-blue-400">
                          {filteredDistricts.reduce(
                            (sum, d) => sum + d.stats.activeBuyers,
                            0,
                          )}
                        </p>
                      </div>
                      <Activity className="w-8 h-8 text-blue-400" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-900/50 to-purple-700/50 border-purple-500/30">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-purple-300 text-sm">متوسط العائد</p>
                        <p className="text-2xl font-bold text-purple-400">
                          {(
                            filteredDistricts.reduce(
                              (sum, d) =>
                                sum +
                                d.properties.reduce(
                                  (pSum, p) => pSum + (p.roi || 0),
                                  0,
                                ),
                              0,
                            ) /
                            filteredDistricts.reduce(
                              (sum, d) => sum + d.properties.length,
                              0,
                            )
                          ).toFixed(1)}
                          %
                        </p>
                      </div>
                      <TrendingUp className="w-8 h-8 text-purple-400" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-yellow-900/50 to-yellow-700/50 border-yellow-500/30">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-yellow-300 text-sm">
                          المشاريع الرائجة
                        </p>
                        <p className="text-2xl font-bold text-yellow-400">
                          {filteredDistricts.reduce(
                            (sum, d) =>
                              sum +
                              d.properties.filter((p) => p.trending).length,
                            0,
                          )}
                        </p>
                      </div>
                      <Sparkles className="w-8 h-8 text-yellow-400" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdvancedMarketMap;
