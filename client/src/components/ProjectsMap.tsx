import { useState } from "react";
import { MapPin, Filter, Search, Eye } from "lucide-react";

interface ProjectsMapProps {
  language: "en" | "ar";
}

const translations = {
  en: {
    projectsMap: "Projects Map",
    filterProjects: "Filter Projects",
    searchLocation: "Search location...",
    allProjects: "All Projects",
    inProgress: "In Progress",
    completed: "Completed",
    planning: "Planning",
    viewDetails: "View Details",
    totalProjects: "Total Projects",
    riyadh: "Riyadh",
    jeddah: "Jeddah",
    dammam: "Dammam",
    mecca: "Mecca",
  },
  ar: {
    projectsMap: "خريطة المشاريع",
    filterProjects: "تصفية المشاريع",
    searchLocation: "البحث عن الموقع...",
    allProjects: "جميع المشاريع",
    inProgress: "قيد التنفيذ",
    completed: "مكتمل",
    planning: "التخطيط",
    viewDetails: "عرض التفاصيل",
    totalProjects: "إجمالي المشاريع",
    riyadh: "الرياض",
    jeddah: "جدة",
    dammam: "الدمام",
    mecca: "مكة",
  },
};

const mapProjects = [
  {
    id: 1,
    nameEn: "Royal Villa Landscape",
    nameAr: "تنسيق فيلا ملكية",
    city: "riyadh",
    status: "inProgress",
    progress: 85,
    x: 35,
    y: 25,
    value: "250K",
    client: "أحمد الفيصل",
  },
  {
    id: 2,
    nameEn: "Swimming Pool Complex",
    nameAr: "مجمع المسابح",
    city: "jeddah",
    status: "inProgress",
    progress: 45,
    x: 15,
    y: 45,
    value: "180K",
    client: "شركة الواحة",
  },
  {
    id: 3,
    nameEn: "Golf Course Design",
    nameAr: "تصميم ملعب الجولف",
    city: "riyadh",
    status: "completed",
    progress: 100,
    x: 40,
    y: 30,
    value: "500K",
    client: "نادي الرياض",
  },
  {
    id: 4,
    nameEn: "Smart Garden System",
    nameAr: "نظام الحديقة الذكية",
    city: "dammam",
    status: "planning",
    progress: 15,
    x: 70,
    y: 35,
    value: "120K",
    client: "سارة العلي",
  },
];

export default function ProjectsMap({ language }: ProjectsMapProps) {
  const [selectedFilter, setSelectedFilter] = useState("allProjects");
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const t = translations[language];
  const isRTL = language === "ar";

  const getStatusColor = (status: string) => {
    switch (status) {
      case "inProgress":
        return "bg-yellow-500 border-yellow-300";
      case "completed":
        return "bg-green-500 border-green-300";
      case "planning":
        return "bg-blue-500 border-blue-300";
      default:
        return "bg-gray-500 border-gray-300";
    }
  };

  const filteredProjects =
    selectedFilter === "allProjects"
      ? mapProjects
      : mapProjects.filter((p) => p.status === selectedFilter);

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div
        className={`flex items-center justify-between ${isRTL ? "flex-row-reverse" : ""}`}
      >
        <h2 className="text-2xl font-bold text-white">{t.projectsMap}</h2>

        <div
          className={`flex items-center gap-4 ${isRTL ? "flex-row-reverse" : ""}`}
        >
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder={t.searchLocation}
              className="bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400"
            />
          </div>

          {/* Filter */}
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-400"
          >
            <option value="allProjects">{t.allProjects}</option>
            <option value="inProgress">{t.inProgress}</option>
            <option value="completed">{t.completed}</option>
            <option value="planning">{t.planning}</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Map Area */}
        <div className="lg:col-span-3 bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
          <div className="relative w-full h-[500px] bg-gradient-to-br from-emerald-800/30 to-teal-800/30 rounded-xl border border-white/10 overflow-hidden">
            {/* Map Background */}
            <div
              className={
                'absolute inset-0 bg-[url(\'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="%23ffffff" stroke-width="0.5" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>\')] opacity-20'
              }
            />

            {/* Saudi Arabia Outline */}
            <div className="absolute inset-4 border border-white/20 rounded-lg bg-white/5">
              <div className="absolute top-4 left-4 text-white/60 text-sm font-medium">
                {language === "ar"
                  ? "المملكة العربية السعودية"
                  : "Saudi Arabia"}
              </div>

              {/* Project Markers */}
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className={`absolute w-4 h-4 rounded-full border-2 cursor-pointer transform -translate-x-2 -translate-y-2 hover:scale-125 transition-transform ${getStatusColor(project.status)} ${selectedProject === project.id ? "scale-150 ring-4 ring-white/50" : ""}`}
                  style={{ left: `${project.x}%`, top: `${project.y}%` }}
                  onClick={() =>
                    setSelectedProject(
                      selectedProject === project.id ? null : project.id,
                    )
                  }
                >
                  {/* Pulse Animation for Active Projects */}
                  {project.status === "inProgress" && (
                    <div className="absolute inset-0 rounded-full bg-yellow-400 animate-ping opacity-75" />
                  )}
                </div>
              ))}

              {/* City Labels */}
              <div className="absolute top-[20%] left-[30%] text-white/70 text-xs font-medium">
                {t.riyadh}
              </div>
              <div className="absolute top-[40%] left-[10%] text-white/70 text-xs font-medium">
                {t.jeddah}
              </div>
              <div className="absolute top-[30%] left-[65%] text-white/70 text-xs font-medium">
                {t.dammam}
              </div>
            </div>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg p-3">
              <div className="space-y-2 text-xs">
                <div
                  className={`flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}
                >
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <span className="text-white">{t.inProgress}</span>
                </div>
                <div
                  className={`flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}
                >
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-white">{t.completed}</span>
                </div>
                <div
                  className={`flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}
                >
                  <div className="w-3 h-3 rounded-full bg-blue-500" />
                  <span className="text-white">{t.planning}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Project Details Sidebar */}
        <div className="space-y-4">
          {/* Stats */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">
                {filteredProjects.length}
              </div>
              <div className="text-sm text-gray-300">{t.totalProjects}</div>
            </div>
          </div>

          {/* Project List */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20 max-h-[400px] overflow-y-auto">
            <div className="space-y-3">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className={`p-3 bg-white/5 rounded-lg border transition-all cursor-pointer ${
                    selectedProject === project.id
                      ? "border-emerald-400 bg-emerald-400/10"
                      : "border-white/10 hover:border-white/20"
                  }`}
                  onClick={() =>
                    setSelectedProject(
                      selectedProject === project.id ? null : project.id,
                    )
                  }
                >
                  <div className={`${isRTL ? "text-right" : "text-left"}`}>
                    <h4 className="text-white font-medium text-sm mb-1">
                      {language === "ar" ? project.nameAr : project.nameEn}
                    </h4>
                    <div className="text-xs text-gray-300 mb-2">
                      <div>{project.client}</div>
                      <div>{t[project.city as keyof typeof t]}</div>
                    </div>

                    {/* Progress */}
                    <div className="mb-2">
                      <div
                        className={`flex justify-between text-xs text-gray-300 mb-1 ${isRTL ? "flex-row-reverse" : ""}`}
                      >
                        <span>{language === "ar" ? "التقدم" : "Progress"}</span>
                        <span>{project.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-1">
                        <div
                          className="bg-emerald-400 h-1 rounded-full transition-all"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>

                    <div
                      className={`flex justify-between items-center ${isRTL ? "flex-row-reverse" : ""}`}
                    >
                      <span className="text-emerald-400 text-sm font-medium">
                        {project.value}
                      </span>
                      <button className="text-white hover:text-emerald-400 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
