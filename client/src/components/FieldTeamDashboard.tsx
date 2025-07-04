import { useState } from "react";
import {
  MapPin,
  Clock,
  CheckCircle,
  AlertTriangle,
  Users,
  Navigation,
  Camera,
  Wrench,
  MessageSquare,
  Battery,
} from "lucide-react";

interface FieldTeamDashboardProps {
  language: "en" | "ar";
}

export default function FieldTeamDashboard({
  language,
}: FieldTeamDashboardProps) {
  const [selectedTeam, setSelectedTeam] = useState("team-1");
  const [activeView, setActiveView] = useState("overview");

  const fieldTeams = [
    {
      id: "team-1",
      name: language === "ar" ? "فريق الزراعة الأول" : "Planting Team Alpha",
      leader: language === "ar" ? "أحمد المرزوقي" : "Ahmed Al Marzoqi",
      members: 4,
      status: "active",
      currentProject:
        language === "ar" ? "حديقة فيلا الياسمين" : "Jasmine Villa Garden",
      location:
        language === "ar" ? "دبي - منطقة الجميرا" : "Dubai - Jumeirah Area",
      coordinates: { lat: 25.2048, lng: 55.2708 },
      tasksCompleted: 8,
      tasksTotal: 12,
      efficiency: 89,
      lastUpdate: "5 دقائق",
    },
    {
      id: "team-2",
      name:
        language === "ar"
          ? "فريق الري و��لكهرباء"
          : "Irrigation & Electrical Team",
      leader: language === "ar" ? "محمد النعيمي" : "Mohammed Al Nuaimi",
      members: 3,
      status: "break",
      currentProject:
        language === "ar"
          ? "منتجع الخضراء التجاري"
          : "Al Khadra Commercial Resort",
      location:
        language === "ar"
          ? "أبوظبي - منطقة السعديات"
          : "Abu Dhabi - Saadiyat Area",
      coordinates: { lat: 24.5311, lng: 54.4339 },
      tasksCompleted: 15,
      tasksTotal: 18,
      efficiency: 94,
      lastUpdate: "استراحة غداء",
    },
    {
      id: "team-3",
      name:
        language === "ar" ? "فريق الصيانة السريعة" : "Quick Maintenance Team",
      leader: language === "ar" ? "سارة الفلاسي" : "Sara Al Falasi",
      members: 2,
      status: "transit",
      currentProject:
        language === "ar"
          ? "صيانة طارئة - مجمع البستان"
          : "Emergency Maintenance - Al Bustan Complex",
      location: language === "ar" ? "في الطريق إلى الموقع" : "En route to site",
      coordinates: { lat: 25.276, lng: 55.2962 },
      tasksCompleted: 3,
      tasksTotal: 5,
      efficiency: 87,
      lastUpdate: "منذ دقيقتين",
    },
  ];

  const currentTeam =
    fieldTeams.find((team) => team.id === selectedTeam) || fieldTeams[0];

  const teamActivities = [
    {
      time: "14:35",
      action:
        language === "ar"
          ? "اكتمال زراعة 12 شجرة نخيل"
          : "Completed planting 12 palm trees",
      teamMember: language === "ar" ? "أحمد المرزوقي" : "Ahmed Al Marzoqi",
      location: language === "ar" ? "القسم الشرقي" : "East Section",
      status: "completed",
      photo: true,
    },
    {
      time: "14:20",
      action:
        language === "ar"
          ? "فحص نظام الري - كل شيء يعمل بشكل طبيعي"
          : "Irrigation system check - all normal",
      teamMember: language === "ar" ? "فاطمة السالم" : "Fatima Al Salem",
      location: language === "ar" ? "المنطقة المركزية" : "Central Area",
      status: "completed",
      photo: false,
    },
    {
      time: "14:05",
      action:
        language === "ar"
          ? "تبديل أدوات العمل - احتياج لمعدات إضافية"
          : "Tool replacement - additional equipment needed",
      teamMember: language === "ar" ? "خالد الشامسي" : "Khalid Al Shamsi",
      location: language === "ar" ? "منطقة التخزين" : "Storage Area",
      status: "pending",
      photo: false,
    },
    {
      time: "13:45",
      action:
        language === "ar"
          ? "بدء تركيب نظام الإضاءة للمسارات"
          : "Started pathway lighting installation",
      teamMember: language === "ar" ? "نورا العوضي" : "Nora Al Awadhi",
      location: language === "ar" ? "مسارات الحديقة" : "Garden Pathways",
      status: "in-progress",
      photo: true,
    },
  ];

  const equipmentStatus = [
    {
      name: language === "ar" ? "حفارة صغيرة" : "Mini Excavator",
      status: "operational",
      battery: 85,
      location: language === "ar" ? "الموقع الرئيسي" : "Main Site",
      lastMaintenance: "2024-01-15",
    },
    {
      name:
        language === "ar" ? "نظام الري المحمول" : "Portable Irrigation System",
      status: "operational",
      battery: 92,
      location: language === "ar" ? "القسم الشرقي" : "East Section",
      lastMaintenance: "2024-01-20",
    },
    {
      name: language === "ar" ? "مولد كهربائي" : "Power Generator",
      status: "maintenance",
      battery: 0,
      location: language === "ar" ? "ورشة الصيانة" : "Maintenance Workshop",
      lastMaintenance: "2024-01-10",
    },
    {
      name:
        language === "ar" ? "أدوات الحفر المتقدمة" : "Advanced Digging Tools",
      status: "operational",
      battery: 78,
      location: language === "ar" ? "شاحنة الفريق" : "Team Truck",
      lastMaintenance: "2024-01-18",
    },
  ];

  const renderOverview = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Team Status Cards */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-emerald-400/30 p-6">
          <h3 className="text-xl font-bold text-emerald-300 mb-4">
            {language === "ar" ? "حالة الفرق الميدانية" : "Field Teams Status"}
          </h3>

          <div className="space-y-4">
            {fieldTeams.map((team) => (
              <div
                key={team.id}
                onClick={() => setSelectedTeam(team.id)}
                className={`p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                  selectedTeam === team.id
                    ? "bg-emerald-500/20 border border-emerald-400/50"
                    : "bg-slate-800/30 hover:bg-slate-700/40"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-4 h-4 rounded-full ${
                        team.status === "active"
                          ? "bg-green-400 animate-pulse"
                          : team.status === "break"
                            ? "bg-yellow-400"
                            : "bg-blue-400"
                      }`}
                    ></div>
                    <div>
                      <div className="font-semibold text-emerald-200">
                        {team.name}
                      </div>
                      <div className="text-sm text-emerald-400">
                        {team.leader} • {team.members}{" "}
                        {language === "ar" ? "أعضاء" : "members"}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-emerald-300 font-medium">
                      {team.efficiency}%
                    </div>
                    <div className="text-xs text-emerald-400">
                      {language === "ar" ? "الكفاءة" : "Efficiency"}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-emerald-400">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {team.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" />
                    {team.tasksCompleted}/{team.tasksTotal}{" "}
                    {language === "ar" ? "مهام" : "tasks"}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {team.lastUpdate}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Activities */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-emerald-400/30 p-6">
          <h3 className="text-xl font-bold text-emerald-300 mb-4">
            {language === "ar" ? "النشاطات المباشرة" : "Live Activities"}
          </h3>

          <div className="space-y-4">
            {teamActivities.map((activity, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 bg-slate-800/30 rounded-xl"
              >
                <div className="flex-shrink-0">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      activity.status === "completed"
                        ? "bg-green-500/20"
                        : activity.status === "in-progress"
                          ? "bg-blue-500/20"
                          : "bg-yellow-500/20"
                    }`}
                  >
                    {activity.status === "completed" ? (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    ) : activity.status === "in-progress" ? (
                      <Clock className="w-5 h-5 text-blue-400" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-yellow-400" />
                    )}
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="font-medium text-emerald-200">
                      {activity.action}
                    </div>
                    <div className="text-sm text-emerald-400">
                      {activity.time}
                    </div>
                  </div>
                  <div className="text-sm text-emerald-400">
                    {activity.teamMember} • {activity.location}
                    {activity.photo && (
                      <span className="ml-2 inline-flex items-center gap-1 text-emerald-300">
                        <Camera className="w-3 h-3" />
                        {language === "ar" ? "صورة مرفقة" : "Photo attached"}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Details Sidebar */}
      <div className="space-y-6">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-emerald-400/30 p-6">
          <h3 className="text-lg font-bold text-emerald-300 mb-4">
            {currentTeam.name}
          </h3>

          <div className="space-y-4">
            <div>
              <div className="text-sm text-emerald-400">
                {language === "ar" ? "قائد الفريق" : "Team Leader"}
              </div>
              <div className="text-emerald-200 font-medium">
                {currentTeam.leader}
              </div>
            </div>

            <div>
              <div className="text-sm text-emerald-400">
                {language === "ar" ? "المشروع الحالي" : "Current Project"}
              </div>
              <div className="text-emerald-200 font-medium">
                {currentTeam.currentProject}
              </div>
            </div>

            <div>
              <div className="text-sm text-emerald-400">
                {language === "ar" ? "الموقع" : "Location"}
              </div>
              <div className="text-emerald-200 font-medium flex items-center gap-2">
                <Navigation className="w-4 h-4" />
                {currentTeam.location}
              </div>
            </div>

            <div>
              <div className="text-sm text-emerald-400 mb-2">
                {language === "ar" ? "تقدم المهام" : "Task Progress"}
              </div>
              <div className="bg-slate-800/50 rounded-full h-3 mb-2">
                <div
                  className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full"
                  style={{
                    width: `${(currentTeam.tasksCompleted / currentTeam.tasksTotal) * 100}%`,
                  }}
                ></div>
              </div>
              <div className="text-emerald-300 text-sm">
                {currentTeam.tasksCompleted} / {currentTeam.tasksTotal}{" "}
                {language === "ar" ? "مهام مكتملة" : "tasks completed"}
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 px-4 py-2 rounded-xl transition-colors text-sm">
                <MessageSquare className="w-4 h-4" />
                {language === "ar" ? "راسل الفريق" : "Message Team"}
              </button>
              <button className="flex items-center gap-2 bg-slate-600 hover:bg-slate-700 px-4 py-2 rounded-xl transition-colors text-sm">
                <Navigation className="w-4 h-4" />
                {language === "ar" ? "تتبع" : "Track"}
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-emerald-400/30 p-6">
          <h3 className="text-lg font-bold text-emerald-300 mb-4">
            {language === "ar" ? "إحصائيات سريعة" : "Quick Stats"}
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-emerald-400">
                {language === "ar" ? "فرق نشطة" : "Active Teams"}
              </span>
              <span className="text-emerald-200 font-medium">
                {fieldTeams.filter((team) => team.status === "active").length}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-emerald-400">
                {language === "ar"
                  ? "مهام مكتملة اليوم"
                  : "Tasks Completed Today"}
              </span>
              <span className="text-emerald-200 font-medium">26</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-emerald-400">
                {language === "ar" ? "متوسط الكفاءة" : "Average Efficiency"}
              </span>
              <span className="text-emerald-200 font-medium">90%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-emerald-400">
                {language === "ar" ? "ساعات العمل اليوم" : "Work Hours Today"}
              </span>
              <span className="text-emerald-200 font-medium">42h</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderEquipment = () => (
    <div className="space-y-6">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-emerald-400/30 p-6">
        <h3 className="text-xl font-bold text-emerald-300 mb-4">
          {language === "ar"
            ? "حالة المعدات والأدوات"
            : "Equipment & Tools Status"}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {equipmentStatus.map((equipment, index) => (
            <div key={index} className="bg-slate-800/30 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      equipment.status === "operational"
                        ? "bg-green-500/20"
                        : "bg-red-500/20"
                    }`}
                  >
                    <Wrench className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-emerald-200">
                      {equipment.name}
                    </div>
                    <div className="text-sm text-emerald-400">
                      {equipment.location}
                    </div>
                  </div>
                </div>

                <div
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    equipment.status === "operational"
                      ? "bg-green-500/20 text-green-300"
                      : "bg-red-500/20 text-red-300"
                  }`}
                >
                  {equipment.status === "operational"
                    ? language === "ar"
                      ? "تعمل"
                      : "Operational"
                    : language === "ar"
                      ? "صيانة"
                      : "Maintenance"}
                </div>
              </div>

              {equipment.status === "operational" && (
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-emerald-400 text-sm">
                      {language === "ar" ? "البطارية" : "Battery"}
                    </span>
                    <span className="text-emerald-300">
                      {equipment.battery}%
                    </span>
                  </div>
                  <div className="bg-slate-700/50 rounded-full h-2">
                    <div
                      className={`h-full rounded-full ${
                        equipment.battery > 50
                          ? "bg-green-400"
                          : equipment.battery > 20
                            ? "bg-yellow-400"
                            : "bg-red-400"
                      }`}
                      style={{ width: `${equipment.battery}%` }}
                    ></div>
                  </div>
                </div>
              )}

              <div className="text-sm text-emerald-500">
                {language === "ar" ? "آخر صيانة:" : "Last Maintenance:"}{" "}
                {equipment.lastMaintenance}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6" dir={language === "ar" ? "rtl" : "ltr"}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-emerald-300">
          {language === "ar" ? "لوحة الفرق الميدانية" : "Field Teams Dashboard"}
        </h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-green-500/20 px-4 py-2 rounded-xl">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-300 font-medium">
              {fieldTeams.filter((team) => team.status === "active").length}{" "}
              {language === "ar" ? "فرق نشطة" : "Active Teams"}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-4">
        {["overview", "equipment", "map"].map((view) => (
          <button
            key={view}
            onClick={() => setActiveView(view)}
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              activeView === view
                ? "bg-emerald-500 text-white"
                : "bg-white/10 text-emerald-300 hover:bg-white/15"
            }`}
          >
            {view === "overview"
              ? language === "ar"
                ? "نظرة عامة"
                : "Overview"
              : view === "equipment"
                ? language === "ar"
                  ? "المعدات"
                  : "Equipment"
                : language === "ar"
                  ? "الخريطة"
                  : "Map"}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeView === "overview" && renderOverview()}
      {activeView === "equipment" && renderEquipment()}
      {activeView === "map" && (
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-emerald-400/30 p-6 h-96 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
            <div className="text-xl text-emerald-300 font-medium">
              {language === "ar"
                ? "خريطة تتبع الفرق الميدانية"
                : "Field Teams Tracking Map"}
            </div>
            <div className="text-emerald-400 mt-2">
              {language === "ar"
                ? "قريباً - تكامل مع نظام تحديد المواقع"
                : "Coming Soon - GPS Integration"}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
