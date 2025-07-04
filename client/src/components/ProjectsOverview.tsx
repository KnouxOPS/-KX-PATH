import {
  TrendingUp,
  Users,
  DollarSign,
  Calendar,
  MapPin,
  Camera,
} from "lucide-react";

interface ProjectsOverviewProps {
  language: "en" | "ar";
}

const translations = {
  en: {
    overview: "Projects Overview",
    activeProjects: "Active Projects",
    totalClients: "Total Clients",
    monthlyRevenue: "Monthly Revenue",
    completionRate: "Completion Rate",
    recentProjects: "Recent Projects",
    viewProject: "View Project",
    inProgress: "In Progress",
    planning: "Planning",
    completed: "Completed",
  },
  ar: {
    overview: "نظرة عامة على المشاريع",
    activeProjects: "المشاريع النشطة",
    totalClients: "إجمالي العملاء",
    monthlyRevenue: "الإيرادات الشهرية",
    completionRate: "معدل الإنجاز",
    recentProjects: "المشاريع الحديثة",
    viewProject: "عرض المشروع",
    inProgress: "قيد التنفيذ",
    planning: "التخطيط",
    completed: "مكتمل",
  },
};

const stats = [
  { icon: TrendingUp, value: "24", label: "activeProjects", color: "emerald" },
  { icon: Users, value: "156", label: "totalClients", color: "teal" },
  { icon: DollarSign, value: "284K", label: "monthlyRevenue", color: "green" },
  { icon: Calendar, value: "94%", label: "completionRate", color: "blue" },
];

const recentProjects = [
  {
    id: 1,
    nameEn: "Royal Villa Landscape",
    nameAr: "تنسيق فيلا ملكية",
    client: "أحمد الفيصل",
    location: "الرياض",
    progress: 85,
    status: "inProgress",
    image: "🏡",
  },
  {
    id: 2,
    nameEn: "Swimming Pool Complex",
    nameAr: "مجمع المسابح",
    client: "شركة الواحة",
    location: "جدة",
    progress: 45,
    status: "inProgress",
    image: "🏊",
  },
  {
    id: 3,
    nameEn: "Golf Course Design",
    nameAr: "تصميم ملعب الجولف",
    client: "نادي الرياض",
    location: "الرياض",
    progress: 100,
    status: "completed",
    image: "⛳",
  },
];

export default function ProjectsOverview({ language }: ProjectsOverviewProps) {
  const t = translations[language];
  const isRTL = language === "ar";

  const getStatusColor = (status: string) => {
    switch (status) {
      case "inProgress":
        return "bg-yellow-500";
      case "planning":
        return "bg-blue-500";
      case "completed":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20"
          >
            <div
              className={`flex items-center gap-4 ${isRTL ? "flex-row-reverse" : ""}`}
            >
              <div
                className={`w-12 h-12 bg-${stat.color}-500/20 rounded-xl flex items-center justify-center`}
              >
                <stat.icon className={`w-6 h-6 text-${stat.color}-400`} />
              </div>
              <div className={`${isRTL ? "text-right" : "text-left"}`}>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-gray-300">
                  {t[stat.label as keyof typeof t]}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Projects */}
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20">
        <h3
          className={`text-xl font-semibold text-white mb-6 ${isRTL ? "text-right" : "text-left"}`}
        >
          {t.recentProjects}
        </h3>

        <div className="space-y-4">
          {recentProjects.map((project) => (
            <div
              key={project.id}
              className={`flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all cursor-pointer ${isRTL ? "flex-row-reverse" : ""}`}
            >
              {/* Project Image */}
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-xl flex items-center justify-center text-2xl">
                {project.image}
              </div>

              {/* Project Info */}
              <div className={`flex-1 ${isRTL ? "text-right" : "text-left"}`}>
                <h4 className="text-white font-semibold text-lg">
                  {language === "ar" ? project.nameAr : project.nameEn}
                </h4>
                <div
                  className={`flex items-center gap-4 text-sm text-gray-300 mt-1 ${isRTL ? "flex-row-reverse" : ""}`}
                >
                  <span>{project.client}</span>
                  <div
                    className={`flex items-center gap-1 ${isRTL ? "flex-row-reverse" : ""}`}
                  >
                    <MapPin className="w-4 h-4" />
                    <span>{project.location}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-3">
                  <div
                    className={`flex items-center justify-between text-xs text-gray-300 mb-1 ${isRTL ? "flex-row-reverse" : ""}`}
                  >
                    <span>{language === "ar" ? "التقدم" : "Progress"}</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-emerald-400 to-teal-400 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Status & Actions */}
              <div
                className={`flex flex-col items-center gap-2 ${isRTL ? "items-start" : "items-end"}`}
              >
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(project.status)}`}
                >
                  {t[project.status as keyof typeof t]}
                </span>
                <button className="text-emerald-400 hover:text-emerald-300 text-sm font-medium transition-colors">
                  {t.viewProject}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
