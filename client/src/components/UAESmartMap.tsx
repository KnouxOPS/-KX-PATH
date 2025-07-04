import { useState, useEffect, useRef } from "react";
import {
  MapPin,
  Layers,
  Satellite,
  Home,
  Building2,
  TreePine,
  Zap,
  Filter,
  Search,
  TrendingUp,
} from "lucide-react";

// Define interfaces for our UAE-specific data
interface UAEArea {
  id: string;
  name_ar: string;
  name_en: string;
  emirate:
    | "dubai"
    | "abudhabi"
    | "sharjah"
    | "ajman"
    | "rak"
    | "fujairah"
    | "uaq";
  coordinates: {
    lat: number;
    lng: number;
    bounds: {
      north: number;
      south: number;
      east: number;
      west: number;
    };
  };
  villa_count: number;
  active_projects: number;
  interested_clients: number;
  landscape_potential: "high" | "medium" | "low";
  avg_property_value: number;
}

interface LiveProject {
  id: string;
  title_ar: string;
  title_en: string;
  coordinates: { lat: number; lng: number };
  status:
    | "planning"
    | "design"
    | "approval"
    | "execution"
    | "completed"
    | "maintenance";
  budget: number;
  progress_percentage: number;
  client_tier: "standard" | "premium" | "vip";
  project_type:
    | "villa_garden"
    | "commercial_landscape"
    | "pool_installation"
    | "maintenance"
    | "irrigation_system";
}

interface SmartNotification {
  id: string;
  type:
    | "new_construction"
    | "property_sale"
    | "land_purchase"
    | "development_permit";
  title_ar: string;
  title_en: string;
  coordinates: { lat: number; lng: number };
  opportunity_score: number;
  created_at: string;
}

interface UAESmartMapProps {
  language: "en" | "ar";
}

export default function UAESmartMap({ language }: UAESmartMapProps) {
  const [selectedEmirate, setSelectedEmirate] = useState<string>("all");
  const [mapLayer, setMapLayer] = useState<"satellite" | "streets" | "terrain">(
    "satellite",
  );
  const [showProjects, setShowProjects] = useState(true);
  const [showOpportunities, setShowOpportunities] = useState(true);
  const [showAreas, setShowAreas] = useState(true);
  const [selectedProject, setSelectedProject] = useState<LiveProject | null>(
    null,
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [heatmapMode, setHeatmapMode] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);

  // Mock data - في التطبيق الحقيقي، هذه ستأتي من قاعدة البيانات
  const uaeAreas: UAEArea[] = [
    {
      id: "dubai_jumeirah",
      name_ar: "الجميرا",
      name_en: "Jumeirah",
      emirate: "dubai",
      coordinates: {
        lat: 25.2084,
        lng: 55.2719,
        bounds: { north: 25.22, south: 25.1968, east: 55.285, west: 55.2588 },
      },
      villa_count: 2450,
      active_projects: 18,
      interested_clients: 45,
      landscape_potential: "high",
      avg_property_value: 3500000,
    },
    {
      id: "abudhabi_khalifa_city",
      name_ar: "مدينة خليفة",
      name_en: "Khalifa City",
      emirate: "abudhabi",
      coordinates: {
        lat: 24.4292,
        lng: 54.6094,
        bounds: { north: 24.44, south: 24.4184, east: 54.62, west: 54.5988 },
      },
      villa_count: 3200,
      active_projects: 25,
      interested_clients: 38,
      landscape_potential: "high",
      avg_property_value: 2200000,
    },
    {
      id: "sharjah_al_khawaneej",
      name_ar: "الخوانيج",
      name_en: "Al Khawaneej",
      emirate: "sharjah",
      coordinates: {
        lat: 25.1926,
        lng: 55.4661,
        bounds: { north: 25.205, south: 25.1802, east: 55.4789, west: 55.4533 },
      },
      villa_count: 2100,
      active_projects: 10,
      interested_clients: 19,
      landscape_potential: "medium",
      avg_property_value: 1800000,
    },
  ];

  const liveProjects: LiveProject[] = [
    {
      id: "LP_2024_001",
      title_ar: "حديقة فيلا الياسمين الفاخرة",
      title_en: "Luxury Jasmine Villa Garden",
      coordinates: { lat: 25.2048, lng: 55.2708 },
      status: "execution",
      budget: 450000,
      progress_percentage: 75,
      client_tier: "vip",
      project_type: "villa_garden",
    },
    {
      id: "LP_2024_002",
      title_ar: "منتجع الخضراء التجاري",
      title_en: "Al Khadra Commercial Resort",
      coordinates: { lat: 24.5311, lng: 54.4339 },
      status: "design",
      budget: 1200000,
      progress_percentage: 25,
      client_tier: "premium",
      project_type: "commercial_landscape",
    },
    {
      id: "LP_2024_003",
      title_ar: "نظام ري ذكي - الخالدية",
      title_en: "Smart Irrigation System - Al Khalidiyah",
      coordinates: { lat: 24.425, lng: 54.605 },
      status: "planning",
      budget: 180000,
      progress_percentage: 15,
      client_tier: "standard",
      project_type: "irrigation_system",
    },
  ];

  const smartOpportunities: SmartNotification[] = [
    {
      id: "SN_2024_001",
      type: "new_construction",
      title_ar: "🏗️ فيلا جديدة قيد الإنشاء",
      title_en: "🏗️ New Villa Under Construction",
      coordinates: { lat: 25.21, lng: 55.275 },
      opportunity_score: 92,
      created_at: "2024-01-22T09:15:00Z",
    },
    {
      id: "SN_2024_002",
      type: "development_permit",
      title_ar: "📋 ترخيص مجمع سكني جديد",
      title_en: "📋 New Residential Complex Permit",
      coordinates: { lat: 25.19, lng: 55.47 },
      opportunity_score: 95,
      created_at: "2024-01-22T14:00:00Z",
    },
  ];

  const emirates = [
    { id: "all", name_ar: "جميع الإمارات", name_en: "All Emirates" },
    { id: "dubai", name_ar: "دبي", name_en: "Dubai" },
    { id: "abudhabi", name_ar: "أبوظبي", name_en: "Abu Dhabi" },
    { id: "sharjah", name_ar: "الشارقة", name_en: "Sharjah" },
    { id: "ajman", name_ar: "عجمان", name_en: "Ajman" },
    { id: "rak", name_ar: "رأس الخيمة", name_en: "Ras Al Khaimah" },
    { id: "fujairah", name_ar: "الفجيرة", name_en: "Fujairah" },
    { id: "uaq", name_ar: "أم القيوين", name_en: "Umm Al Quwain" },
  ];

  const filteredAreas =
    selectedEmirate === "all"
      ? uaeAreas
      : uaeAreas.filter((area) => area.emirate === selectedEmirate);

  const getProjectStatusColor = (status: string) => {
    switch (status) {
      case "planning":
        return "bg-yellow-500";
      case "design":
        return "bg-blue-500";
      case "approval":
        return "bg-orange-500";
      case "execution":
        return "bg-green-500";
      case "completed":
        return "bg-purple-500";
      case "maintenance":
        return "bg-teal-500";
      default:
        return "bg-gray-500";
    }
  };

  const getClientTierColor = (tier: string) => {
    switch (tier) {
      case "vip":
        return "ring-4 ring-yellow-400";
      case "premium":
        return "ring-4 ring-purple-400";
      default:
        return "ring-2 ring-emerald-400";
    }
  };

  const getPotentialColor = (potential: string) => {
    switch (potential) {
      case "high":
        return "from-green-500/40 to-emerald-600/40 border-green-400";
      case "medium":
        return "from-yellow-500/40 to-orange-600/40 border-yellow-400";
      case "low":
        return "from-red-500/40 to-pink-600/40 border-red-400";
      default:
        return "from-gray-500/40 to-gray-600/40 border-gray-400";
    }
  };

  // Center coordinates for UAE
  const uaeCenter = { lat: 24.4539, lng: 54.3773 };

  return (
    <div
      className="h-full flex flex-col"
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      {/* Map Controls Header */}
      <div className="bg-white/10 backdrop-blur-lg border-b border-emerald-400/30 p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-emerald-300">
                {language === "ar" ? "خريطة الإمارات الذكية" : "UAE Smart Map"}
              </h2>
              <div className="text-sm text-emerald-400">
                {filteredAreas.length} {language === "ar" ? "منطقة" : "areas"} •
                {liveProjects.length}{" "}
                {language === "ar" ? "مشروع نشط" : "active projects"}
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-400 w-5 h-5" />
            <input
              type="text"
              placeholder={
                language === "ar"
                  ? "ابحث في المناطق والمشاريع..."
                  : "Search areas and projects..."
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-800/50 border border-emerald-400/30 rounded-xl px-10 py-2 text-emerald-200 placeholder-emerald-400/60 focus:border-emerald-400/60 focus:outline-none"
            />
          </div>

          {/* Emirates Filter */}
          <select
            value={selectedEmirate}
            onChange={(e) => setSelectedEmirate(e.target.value)}
            className="bg-slate-800/50 border border-emerald-400/30 rounded-xl px-4 py-2 text-emerald-200"
          >
            {emirates.map((emirate) => (
              <option key={emirate.id} value={emirate.id}>
                {language === "ar" ? emirate.name_ar : emirate.name_en}
              </option>
            ))}
          </select>
        </div>

        {/* Map Layer Controls */}
        <div className="flex items-center gap-4 mt-4">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-emerald-400" />
            <span className="text-emerald-400 text-sm">
              {language === "ar" ? "طبقات الخريطة:" : "Map Layers:"}
            </span>
          </div>

          {/* Layer Buttons */}
          {["satellite", "streets", "terrain"].map((layer) => (
            <button
              key={layer}
              onClick={() => setMapLayer(layer as any)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-300 ${
                mapLayer === layer
                  ? "bg-emerald-500 text-white"
                  : "bg-slate-800/30 text-emerald-300 hover:bg-slate-700/40"
              }`}
            >
              {layer === "satellite"
                ? language === "ar"
                  ? "أقمار"
                  : "Satellite"
                : layer === "streets"
                  ? language === "ar"
                    ? "شوارع"
                    : "Streets"
                  : language === "ar"
                    ? "تضاريس"
                    : "Terrain"}
            </button>
          ))}

          <div className="w-px h-6 bg-emerald-400/30 mx-2"></div>

          {/* Toggle Buttons */}
          <button
            onClick={() => setShowProjects(!showProjects)}
            className={`flex items-center gap-2 px-3 py-1 rounded-lg text-sm transition-colors ${
              showProjects
                ? "bg-green-500/20 text-green-300"
                : "bg-slate-800/30 text-emerald-400"
            }`}
          >
            <Building2 className="w-4 h-4" />
            {language === "ar" ? "المشاريع" : "Projects"}
          </button>

          <button
            onClick={() => setShowOpportunities(!showOpportunities)}
            className={`flex items-center gap-2 px-3 py-1 rounded-lg text-sm transition-colors ${
              showOpportunities
                ? "bg-yellow-500/20 text-yellow-300"
                : "bg-slate-800/30 text-emerald-400"
            }`}
          >
            <Zap className="w-4 h-4" />
            {language === "ar" ? "الفرص" : "Opportunities"}
          </button>

          <button
            onClick={() => setHeatmapMode(!heatmapMode)}
            className={`flex items-center gap-2 px-3 py-1 rounded-lg text-sm transition-colors ${
              heatmapMode
                ? "bg-purple-500/20 text-purple-300"
                : "bg-slate-800/30 text-emerald-400"
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            {language === "ar" ? "خريطة حرارية" : "Heatmap"}
          </button>
        </div>
      </div>

      {/* Map Container */}
      <div className="flex-1 relative">
        <div
          ref={mapRef}
          className="w-full h-full bg-slate-900 relative overflow-hidden"
        >
          {/* Simulated UAE Map Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-black">
            {/* Map Layer Background Effect */}
            <div
              className={`absolute inset-0 ${
                mapLayer === "satellite"
                  ? "bg-gradient-to-br from-green-900/20 via-blue-900/20 to-yellow-900/20"
                  : mapLayer === "streets"
                    ? "bg-gradient-to-br from-gray-800 via-gray-900 to-black"
                    : "bg-gradient-to-br from-amber-900/30 via-red-900/20 to-orange-900/20"
              }`}
            ></div>

            {/* Grid overlay for map effect */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `
                linear-gradient(rgba(16, 185, 129, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(16, 185, 129, 0.3) 1px, transparent 1px)
              `,
                backgroundSize: "50px 50px",
              }}
            ></div>

            {/* UAE Coastline Simulation */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 800 600"
            >
              <defs>
                <linearGradient
                  id="coastGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#1F2937" />
                  <stop offset="50%" stopColor="#059669" />
                  <stop offset="100%" stopColor="#1E40AF" />
                </linearGradient>
              </defs>

              {/* Simulated UAE coastline */}
              <path
                d="M100,200 Q200,180 300,190 Q400,200 500,180 Q600,170 700,185 L720,220 Q600,240 500,250 Q400,260 300,250 Q200,240 100,250 Z"
                fill="url(#coastGradient)"
                opacity="0.3"
              />

              {/* Islands */}
              <circle cx="450" cy="320" r="15" fill="#059669" opacity="0.4" />
              <circle cx="480" cy="340" r="10" fill="#059669" opacity="0.4" />
            </svg>
          </div>

          {/* Areas */}
          {showAreas &&
            filteredAreas.map((area, index) => (
              <div
                key={area.id}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${
                  heatmapMode ? "opacity-80" : "opacity-90"
                }`}
                style={{
                  left: `${20 + (index % 3) * 25 + Math.random() * 10}%`,
                  top: `${25 + Math.floor(index / 3) * 20 + Math.random() * 10}%`,
                }}
              >
                <div
                  className={`
                ${
                  heatmapMode
                    ? `w-20 h-20 rounded-full bg-gradient-to-br ${getPotentialColor(area.landscape_potential)} blur-sm`
                    : `p-4 rounded-2xl bg-gradient-to-br ${getPotentialColor(area.landscape_potential)} border backdrop-blur-lg`
                }
                cursor-pointer transition-all duration-300 hover:scale-110 hover:z-10
              `}
                >
                  {!heatmapMode && (
                    <div className="text-center">
                      <div className="text-sm font-bold text-white mb-1">
                        {language === "ar" ? area.name_ar : area.name_en}
                      </div>
                      <div className="text-xs text-white/80">
                        {area.villa_count}{" "}
                        {language === "ar" ? "فيلا" : "villas"}
                      </div>
                      <div className="text-xs text-white/80">
                        {area.active_projects}{" "}
                        {language === "ar" ? "مشروع" : "projects"}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

          {/* Live Projects */}
          {showProjects &&
            liveProjects.map((project, index) => (
              <div
                key={project.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20"
                style={{
                  left: `${30 + (index % 4) * 20 + Math.random() * 15}%`,
                  top: `${35 + Math.floor(index / 4) * 25 + Math.random() * 15}%`,
                }}
                onClick={() => setSelectedProject(project)}
              >
                <div
                  className={`
                w-4 h-4 rounded-full ${getProjectStatusColor(project.status)} ${getClientTierColor(project.client_tier)}
                animate-pulse hover:scale-150 transition-all duration-300
              `}
                >
                  <div className="absolute -top-8 -left-12 opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-black/90 text-white text-xs p-2 rounded-lg whitespace-nowrap">
                      {language === "ar" ? project.title_ar : project.title_en}
                    </div>
                  </div>
                </div>
              </div>
            ))}

          {/* Smart Opportunities */}
          {showOpportunities &&
            smartOpportunities.map((opportunity, index) => (
              <div
                key={opportunity.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 z-30"
                style={{
                  left: `${40 + (index % 3) * 25 + Math.random() * 20}%`,
                  top: `${20 + Math.floor(index / 3) * 30 + Math.random() * 20}%`,
                }}
              >
                <div className="relative">
                  <div className="w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-bounce">
                    <Zap className="w-4 h-4 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                  </div>
                  <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-black/90 text-white text-xs p-2 rounded-lg whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity duration-300">
                    {language === "ar"
                      ? opportunity.title_ar
                      : opportunity.title_en}
                    <div className="text-yellow-400">
                      Score: {opportunity.opportunity_score}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-white/10 backdrop-blur-lg rounded-xl border border-emerald-400/30 p-4">
          <h4 className="text-emerald-300 font-semibold mb-3">
            {language === "ar" ? "مفتاح الخريطة" : "Map Legend"}
          </h4>

          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <span className="text-emerald-200">
                {language === "ar" ? "مشاريع نشطة" : "Active Projects"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-400 rounded-full animate-bounce"></div>
              <span className="text-emerald-200">
                {language === "ar" ? "فرص ذكية" : "Smart Opportunities"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gradient-to-br from-green-500/40 to-emerald-600/40 border border-green-400 rounded"></div>
              <span className="text-emerald-200">
                {language === "ar" ? "إمكانية عالية" : "High Potential"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 ring-4 ring-yellow-400 rounded-full bg-purple-500"></div>
              <span className="text-emerald-200">
                {language === "ar" ? "عميل VIP" : "VIP Client"}
              </span>
            </div>
          </div>
        </div>

        {/* Stats Panel */}
        <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-lg rounded-xl border border-emerald-400/30 p-4">
          <h4 className="text-emerald-300 font-semibold mb-3">
            {language === "ar" ? "إحصائيات مباشرة" : "Live Stats"}
          </h4>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-emerald-400">
                {language === "ar" ? "المشاريع النشطة:" : "Active Projects:"}
              </span>
              <span className="text-emerald-200 font-bold">
                {liveProjects.filter((p) => p.status === "execution").length}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-emerald-400">
                {language === "ar" ? "الفرص الجديدة:" : "New Opportunities:"}
              </span>
              <span className="text-yellow-300 font-bold">
                {smartOpportunities.length}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-emerald-400">
                {language === "ar" ? "إجمالي الفلل:" : "Total Villas:"}
              </span>
              <span className="text-emerald-200 font-bold">
                {filteredAreas
                  .reduce((sum, area) => sum + area.villa_count, 0)
                  .toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-emerald-400">
                {language === "ar"
                  ? "العملاء المهتمين:"
                  : "Interested Clients:"}
              </span>
              <span className="text-purple-300 font-bold">
                {filteredAreas.reduce(
                  (sum, area) => sum + area.interested_clients,
                  0,
                )}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="bg-white/10 backdrop-blur-lg rounded-2xl border border-emerald-400/30 p-6 m-4 max-w-lg w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-emerald-300">
                {language === "ar"
                  ? selectedProject.title_ar
                  : selectedProject.title_en}
              </h3>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-emerald-400 hover:text-emerald-300"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-emerald-400">
                  {language === "ar" ? "الحالة:" : "Status:"}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${getProjectStatusColor(selectedProject.status)} text-white`}
                >
                  {selectedProject.status}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-emerald-400">
                  {language === "ar" ? "الميزانية:" : "Budget:"}
                </span>
                <span className="text-emerald-200 font-bold">
                  AED {selectedProject.budget.toLocaleString()}
                </span>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-emerald-400">
                    {language === "ar" ? "التقدم:" : "Progress:"}
                  </span>
                  <span className="text-emerald-200">
                    {selectedProject.progress_percentage}%
                  </span>
                </div>
                <div className="bg-slate-800/50 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full"
                    style={{ width: `${selectedProject.progress_percentage}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button className="flex-1 bg-emerald-500 hover:bg-emerald-600 px-4 py-2 rounded-xl font-medium transition-colors">
                  {language === "ar" ? "عرض التفاصيل" : "View Details"}
                </button>
                <button className="px-4 py-2 border border-emerald-400/50 rounded-xl text-emerald-300 hover:bg-emerald-600/20 transition-colors">
                  {language === "ar" ? "تتبع التقدم" : "Track Progress"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
