import { useState } from "react";
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Play,
} from "lucide-react";

interface ProjectManagementProps {
  language: "en" | "ar";
  userRole: "admin" | "client" | "premium" | "field" | "researcher";
}

export default function ProjectManagement({
  language,
  userRole,
}: ProjectManagementProps) {
  const [selectedProject, setSelectedProject] = useState("project-1");
  const [activeView, setActiveView] = useState("gantt");

  const projects = [
    {
      id: "project-1",
      name: language === "ar" ? "حديقة فيلا الياسمين" : "Jasmine Villa Garden",
      client: language === "ar" ? "عائلة المحمد" : "Al Mohammed Family",
      status: "active",
      progress: 75,
      budget: "$45,000",
      location: language === "ar" ? "دبي - الإمارات" : "Dubai, UAE",
      startDate: "2024-01-15",
      endDate: "2024-03-20",
      tasks: 24,
      completedTasks: 18,
      team: [
        { name: "أحمد علي", role: "مهندس المناظر الطبيعية" },
        { name: "فاطمة حسن", role: "مصممة حدائق" },
        { name: "محمد سالم", role: "فني ري" },
      ],
    },
    {
      id: "project-2",
      name:
        language === "ar"
          ? "منتجع الخضراء التجاري"
          : "Al Khadra Commercial Resort",
      client:
        language === "ar" ? "شركة الرؤية العقارية" : "Vision Real Estate Co.",
      status: "planning",
      progress: 25,
      budget: "$120,000",
      location: language === "ar" ? "أبوظبي - الإمارات" : "Abu Dhabi, UAE",
      startDate: "2024-02-01",
      endDate: "2024-06-30",
      tasks: 36,
      completedTasks: 9,
      team: [
        { name: "سارة أحمد", role: "مديرة المشروع" },
        { name: "عمر خالد", role: "مهندس معماري" },
        { name: "نور الدين", role: "خبير نباتات" },
      ],
    },
  ];

  const currentProject =
    projects.find((p) => p.id === selectedProject) || projects[0];

  const renderGanttChart = () => (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-emerald-400/30 p-6">
      <h3 className="text-xl font-bold text-emerald-300 mb-4">
        {language === "ar" ? "مخطط جانت للمشروع" : "Project Gantt Chart"}
      </h3>

      <div className="space-y-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="flex items-center gap-4">
            <div className="w-48 text-sm text-emerald-200">
              {language === "ar"
                ? `مهمة ${index + 1} - ${["تصميم", "تحضير الموقع", "زراعة", "ري", "إضاءة", "تشطيب", "فحص", "تسليم"][index]}`
                : `Task ${index + 1} - ${["Design", "Site Prep", "Planting", "Irrigation", "Lighting", "Finishing", "Inspection", "Delivery"][index]}`}
            </div>
            <div className="flex-1 bg-slate-800/50 rounded-full h-6 relative">
              <div
                className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full flex items-center justify-end px-2"
                style={{ width: `${Math.random() * 80 + 20}%` }}
              >
                <span className="text-xs text-white font-medium">
                  {Math.floor(Math.random() * 80 + 20)}%
                </span>
              </div>
            </div>
            <div className="text-xs text-emerald-300">
              {new Date().toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTeamView = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-emerald-400/30 p-6">
        <h3 className="text-xl font-bold text-emerald-300 mb-4">
          {language === "ar" ? "فريق المشروع" : "Project Team"}
        </h3>

        <div className="space-y-4">
          {currentProject.team.map((member, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-4 bg-slate-800/30 rounded-xl"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-emerald-200">
                  {member.name}
                </div>
                <div className="text-sm text-emerald-400">{member.role}</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span className="text-xs text-emerald-300">
                  {language === "ar" ? "متاح" : "Available"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-emerald-400/30 p-6">
        <h3 className="text-xl font-bold text-emerald-300 mb-4">
          {language === "ar" ? "إحصائيات الفريق" : "Team Statistics"}
        </h3>

        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-slate-800/30 rounded-xl">
            <div className="text-2xl font-bold text-emerald-300">
              {currentProject.team.length}
            </div>
            <div className="text-sm text-emerald-400">
              {language === "ar" ? "أعضاء الفريق" : "Team Members"}
            </div>
          </div>
          <div className="text-center p-4 bg-slate-800/30 rounded-xl">
            <div className="text-2xl font-bold text-green-400">98%</div>
            <div className="text-sm text-emerald-400">
              {language === "ar" ? "معدل الحضور" : "Attendance Rate"}
            </div>
          </div>
          <div className="text-center p-4 bg-slate-800/30 rounded-xl">
            <div className="text-2xl font-bold text-teal-400">4.8</div>
            <div className="text-sm text-emerald-400">
              {language === "ar" ? "تقييم الأداء" : "Performance Score"}
            </div>
          </div>
          <div className="text-center p-4 bg-slate-800/30 rounded-xl">
            <div className="text-2xl font-bold text-blue-400">12</div>
            <div className="text-sm text-emerald-400">
              {language === "ar" ? "ساعات العمل" : "Work Hours"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTasksView = () => (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-emerald-400/30 p-6">
      <h3 className="text-xl font-bold text-emerald-300 mb-4">
        {language === "ar" ? "قائمة المهام" : "Task List"}
      </h3>

      <div className="space-y-3">
        {Array.from({ length: 10 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center gap-4 p-4 bg-slate-800/30 rounded-xl hover:bg-slate-700/40 transition-all duration-300"
          >
            <div className="flex items-center gap-3">
              {index < 6 ? (
                <CheckCircle className="w-5 h-5 text-green-400" />
              ) : index < 8 ? (
                <Play className="w-5 h-5 text-yellow-400" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-400" />
              )}
            </div>

            <div className="flex-1">
              <div className="font-medium text-emerald-200">
                {language === "ar"
                  ? `مهمة ${index + 1} - ${["تصميم الحديقة", "إعداد التربة", "زراعة الأشجار", "تركيب نظام الري", "إضاءة المسارات", "تركيب الأثاث", "فحص النباتات", "تنظيف الموقع", "مراجعة نهائية", "تسليم المشروع"][index]}`
                  : `Task ${index + 1} - ${["Garden Design", "Soil Preparation", "Tree Planting", "Irrigation Setup", "Path Lighting", "Furniture Install", "Plant Inspection", "Site Cleanup", "Final Review", "Project Delivery"][index]}`}
              </div>
              <div className="text-sm text-emerald-400">
                {language === "ar" ? "موعد التسليم:" : "Due:"}{" "}
                {new Date(Date.now() + index * 86400000).toLocaleDateString()}
              </div>
            </div>

            <div className="text-right">
              <div className="text-sm font-medium text-emerald-300">
                {index < 6 ? "100%" : index < 8 ? `${50 + index * 10}%` : "0%"}
              </div>
              <div className="text-xs text-emerald-400">
                {index < 6
                  ? language === "ar"
                    ? "مكتملة"
                    : "Complete"
                  : index < 8
                    ? language === "ar"
                      ? "قيد العمل"
                      : "In Progress"
                    : language === "ar"
                      ? "معلقة"
                      : "Pending"}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6" dir={language === "ar" ? "rtl" : "ltr"}>
      {/* Project Selection & Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-emerald-400/30 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-emerald-300">
                {language === "ar" ? "إدارة المشاريع" : "Project Management"}
              </h2>
              <select
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                className="bg-slate-800/50 border border-emerald-400/30 rounded-xl px-4 py-2 text-emerald-200"
              >
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-4 bg-slate-800/30 rounded-xl">
                <TrendingUp className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                <div className="text-lg font-bold text-emerald-300">
                  {currentProject.progress}%
                </div>
                <div className="text-sm text-emerald-400">
                  {language === "ar" ? "التقدم" : "Progress"}
                </div>
              </div>
              <div className="text-center p-4 bg-slate-800/30 rounded-xl">
                <Calendar className="w-8 h-8 text-teal-400 mx-auto mb-2" />
                <div className="text-lg font-bold text-teal-300">
                  {currentProject.tasks}
                </div>
                <div className="text-sm text-emerald-400">
                  {language === "ar" ? "المهام" : "Tasks"}
                </div>
              </div>
              <div className="text-center p-4 bg-slate-800/30 rounded-xl">
                <Users className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <div className="text-lg font-bold text-blue-300">
                  {currentProject.team.length}
                </div>
                <div className="text-sm text-emerald-400">
                  {language === "ar" ? "الفريق" : "Team"}
                </div>
              </div>
              <div className="text-center p-4 bg-slate-800/30 rounded-xl">
                <Clock className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <div className="text-lg font-bold text-yellow-300">
                  {Math.ceil(
                    (new Date(currentProject.endDate).getTime() -
                      new Date().getTime()) /
                      (1000 * 60 * 60 * 24),
                  )}
                </div>
                <div className="text-sm text-emerald-400">
                  {language === "ar" ? "أيام متبقية" : "Days Left"}
                </div>
              </div>
            </div>

            <div className="flex gap-4 mb-6">
              {["gantt", "team", "tasks"].map((view) => (
                <button
                  key={view}
                  onClick={() => setActiveView(view)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    activeView === view
                      ? "bg-emerald-500 text-white"
                      : "bg-slate-800/30 text-emerald-300 hover:bg-slate-700/40"
                  }`}
                >
                  {view === "gantt"
                    ? language === "ar"
                      ? "مخطط جانت"
                      : "Gantt Chart"
                    : view === "team"
                      ? language === "ar"
                        ? "الفريق"
                        : "Team"
                      : language === "ar"
                        ? "المهام"
                        : "Tasks"}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-emerald-400/30 p-6">
            <h3 className="text-lg font-bold text-emerald-300 mb-4">
              {language === "ar" ? "تفاصيل المشروع" : "Project Details"}
            </h3>
            <div className="space-y-3">
              <div>
                <div className="text-sm text-emerald-400">
                  {language === "ar" ? "العميل" : "Client"}
                </div>
                <div className="text-emerald-200 font-medium">
                  {currentProject.client}
                </div>
              </div>
              <div>
                <div className="text-sm text-emerald-400">
                  {language === "ar" ? "الميزانية" : "Budget"}
                </div>
                <div className="text-emerald-200 font-medium">
                  {currentProject.budget}
                </div>
              </div>
              <div>
                <div className="text-sm text-emerald-400">
                  {language === "ar" ? "الموقع" : "Location"}
                </div>
                <div className="text-emerald-200 font-medium flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {currentProject.location}
                </div>
              </div>
              <div>
                <div className="text-sm text-emerald-400">
                  {language === "ar" ? "الحالة" : "Status"}
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      currentProject.status === "active"
                        ? "bg-green-400"
                        : currentProject.status === "planning"
                          ? "bg-yellow-400"
                          : "bg-red-400"
                    }`}
                  ></div>
                  <span className="text-emerald-200 font-medium">
                    {currentProject.status === "active"
                      ? language === "ar"
                        ? "نشط"
                        : "Active"
                      : currentProject.status === "planning"
                        ? language === "ar"
                          ? "تخطيط"
                          : "Planning"
                        : language === "ar"
                          ? "مكتمل"
                          : "Completed"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Content Based on Active View */}
      {activeView === "gantt" && renderGanttChart()}
      {activeView === "team" && renderTeamView()}
      {activeView === "tasks" && renderTasksView()}
    </div>
  );
}
