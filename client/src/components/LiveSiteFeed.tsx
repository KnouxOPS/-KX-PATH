import { useState } from "react";
import {
  Camera,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  RotateCcw,
  MapPin,
  Calendar,
  Users,
} from "lucide-react";

interface LiveSiteFeedProps {
  language: "en" | "ar";
}

export default function LiveSiteFeed({ language }: LiveSiteFeedProps) {
  const [selectedCamera, setSelectedCamera] = useState("cam-1");
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  const cameras = [
    {
      id: "cam-1",
      name:
        language === "ar"
          ? "الكاميرا الرئيسية - حديقة الياسمين"
          : "Main Camera - Jasmine Garden",
      location:
        language === "ar" ? "مدخل الحديقة الرئيسي" : "Main Garden Entrance",
      status: "live",
      viewers: 12,
      project: "جاسمين فيلا",
      quality: "4K",
      lastUpdate: "2 ثواني",
    },
    {
      id: "cam-2",
      name:
        language === "ar"
          ? "كاميرا الزراعة - المنطقة الشرقية"
          : "Planting Camera - East Zone",
      location:
        language === "ar" ? "منطقة زراعة الأشجار" : "Tree Planting Area",
      status: "live",
      viewers: 8,
      project: "جاسمين فيلا",
      quality: "HD",
      lastUpdate: "5 ثواني",
    },
    {
      id: "cam-3",
      name:
        language === "ar"
          ? "كاميرا الري - النظام الذكي"
          : "Irrigation Camera - Smart System",
      location:
        language === "ar"
          ? "نظام الري التلقائي"
          : "Automated Irrigation System",
      status: "live",
      viewers: 15,
      project: "الخضراء التجاري",
      quality: "HD",
      lastUpdate: "1 دقيقة",
    },
    {
      id: "cam-4",
      name:
        language === "ar"
          ? "كاميرا الإضا��ة - المسارات"
          : "Lighting Camera - Pathways",
      location:
        language === "ar"
          ? "إضاءة المسارات والممرات"
          : "Pathway and Walkway Lighting",
      status: "offline",
      viewers: 0,
      project: "جاسمين فيلا",
      quality: "HD",
      lastUpdate: "10 دقائق",
    },
  ];

  const activities = [
    {
      time: "14:32",
      action:
        language === "ar"
          ? "بدء زراعة 15 شجرة نخيل"
          : "Started planting 15 palm trees",
      camera: "cam-2",
      team: "فريق الزراعة A",
    },
    {
      time: "14:28",
      action:
        language === "ar"
          ? "اكتمال تركيب نظام الري في القسم الشرقي"
          : "Completed irrigation system in east section",
      camera: "cam-3",
      team: "فريق الري",
    },
    {
      time: "14:15",
      action:
        language === "ar"
          ? "فحص جودة التربة - نتائج ممتازة"
          : "Soil quality inspection - excellent results",
      camera: "cam-1",
      team: "فريق الفحص",
    },
    {
      time: "13:45",
      action:
        language === "ar"
          ? "تركيب 8 وحدات إضاءة LED ذكية"
          : "Installed 8 smart LED lighting units",
      camera: "cam-4",
      team: "فريق الكهرباء",
    },
    {
      time: "13:20",
      action:
        language === "ar"
          ? "وصول شحنة نباتات الزينة الجديدة"
          : "New ornamental plants shipment arrived",
      camera: "cam-1",
      team: "فريق اللوجستيات",
    },
  ];

  const currentCamera =
    cameras.find((cam) => cam.id === selectedCamera) || cameras[0];

  return (
    <div className="space-y-6" dir={language === "ar" ? "rtl" : "ltr"}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-emerald-300">
          {language === "ar" ? "البث المباشر من الموقع" : "Live Site Feed"}
        </h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-green-500/20 px-4 py-2 rounded-xl">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-300 font-medium">
              {language === "ar" ? "مباشر" : "LIVE"}
            </span>
          </div>
          <div className="text-emerald-400">
            {cameras.filter((cam) => cam.status === "live").length} /{" "}
            {cameras.length}{" "}
            {language === "ar" ? "كاميرات نشطة" : "cameras active"}
          </div>
        </div>
      </div>

      {/* Main Feed Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Video Feed */}
        <div className="lg:col-span-3">
          <div className="bg-black/50 backdrop-blur-lg rounded-2xl border border-emerald-400/30 overflow-hidden">
            {/* Video Player */}
            <div className="relative aspect-video bg-slate-900">
              {/* Simulated Video Content */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/50 to-teal-900/50 flex items-center justify-center">
                <div className="text-center">
                  <Camera className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
                  <div className="text-xl text-emerald-300 font-medium">
                    {currentCamera.name}
                  </div>
                  <div className="text-emerald-400 mt-2">
                    {language === "ar" ? "جودة البث:" : "Stream Quality:"}{" "}
                    {currentCamera.quality}
                  </div>
                </div>
              </div>

              {/* Live Indicator */}
              <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-500/90 px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                <span className="text-white text-sm font-medium">
                  {language === "ar" ? "مباشر" : "LIVE"}
                </span>
              </div>

              {/* Camera Info */}
              <div className="absolute top-4 right-4 bg-black/70 backdrop-blur px-4 py-2 rounded-xl">
                <div className="text-white text-sm font-medium">
                  {currentCamera.viewers}{" "}
                  {language === "ar" ? "مشاهد" : "viewers"}
                </div>
              </div>

              {/* Bottom Info Bar */}
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 backdrop-blur p-4">
                <div className="flex items-center justify-between text-white">
                  <div>
                    <div className="font-medium">{currentCamera.location}</div>
                    <div className="text-sm text-emerald-300">
                      {language === "ar" ? "آخر تحديث:" : "Last update:"}{" "}
                      {currentCamera.lastUpdate}
                    </div>
                  </div>

                  {/* Video Controls */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="p-2 bg-emerald-500 hover:bg-emerald-600 rounded-full transition-colors"
                    >
                      {isPlaying ? (
                        <Pause className="w-5 h-5" />
                      ) : (
                        <Play className="w-5 h-5" />
                      )}
                    </button>
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="p-2 bg-slate-600 hover:bg-slate-700 rounded-full transition-colors"
                    >
                      {isMuted ? (
                        <VolumeX className="w-5 h-5" />
                      ) : (
                        <Volume2 className="w-5 h-5" />
                      )}
                    </button>
                    <button className="p-2 bg-slate-600 hover:bg-slate-700 rounded-full transition-colors">
                      <RotateCcw className="w-5 h-5" />
                    </button>
                    <button className="p-2 bg-slate-600 hover:bg-slate-700 rounded-full transition-colors">
                      <Maximize className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Camera Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {cameras.map((camera) => (
              <button
                key={camera.id}
                onClick={() => setSelectedCamera(camera.id)}
                className={`relative p-4 rounded-xl transition-all duration-300 ${
                  selectedCamera === camera.id
                    ? "bg-emerald-500/20 border-2 border-emerald-400"
                    : "bg-white/10 backdrop-blur border border-emerald-400/30 hover:bg-white/15"
                }`}
              >
                <div className="aspect-video bg-slate-800/50 rounded-lg mb-3 flex items-center justify-center">
                  <Camera className="w-6 h-6 text-emerald-400" />
                </div>

                <div className="text-left">
                  <div className="text-sm font-medium text-emerald-200 truncate">
                    {camera.name.split(" - ")[0]}
                  </div>
                  <div className="text-xs text-emerald-400 truncate">
                    {camera.location}
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <div
                      className={`flex items-center gap-1 ${
                        camera.status === "live"
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      <div
                        className={`w-2 h-2 rounded-full ${
                          camera.status === "live"
                            ? "bg-green-400 animate-pulse"
                            : "bg-red-400"
                        }`}
                      ></div>
                      <span className="text-xs">
                        {camera.status === "live"
                          ? language === "ar"
                            ? "مباشر"
                            : "Live"
                          : language === "ar"
                            ? "متوقف"
                            : "Offline"}
                      </span>
                    </div>
                    {camera.status === "live" && (
                      <span className="text-xs text-emerald-300">
                        {camera.viewers}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Sidebar - Activity Feed */}
        <div className="space-y-6">
          {/* Live Activity */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-emerald-400/30 p-6">
            <h3 className="text-xl font-bold text-emerald-300 mb-4">
              {language === "ar" ? "النشاطات المباشرة" : "Live Activities"}
            </h3>

            <div className="space-y-4">
              {activities.map((activity, index) => (
                <div
                  key={index}
                  className="flex gap-3 p-3 bg-slate-800/30 rounded-xl"
                >
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-emerald-500/20 rounded-full flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-emerald-400" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-emerald-200">
                      {activity.action}
                    </div>
                    <div className="text-xs text-emerald-400 mt-1">
                      {activity.time} • {activity.team}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-4 py-2 text-emerald-300 hover:text-emerald-200 text-sm transition-colors">
              {language === "ar" ? "عرض جميع النشاطات" : "View All Activities"}
            </button>
          </div>

          {/* Quick Stats */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-emerald-400/30 p-6">
            <h3 className="text-xl font-bold text-emerald-300 mb-4">
              {language === "ar" ? "إحصائيات سريعة" : "Quick Stats"}
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-emerald-400">
                  {language === "ar" ? "فرق العمل النشطة" : "Active Teams"}
                </span>
                <span className="text-emerald-200 font-medium">4</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-emerald-400">
                  {language === "ar"
                    ? "المهام المكتملة اليوم"
                    : "Tasks Completed Today"}
                </span>
                <span className="text-emerald-200 font-medium">12</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-emerald-400">
                  {language === "ar" ? "ساعات العمل" : "Work Hours"}
                </span>
                <span className="text-emerald-200 font-medium">7.5h</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-emerald-400">
                  {language === "ar" ? "تقدم المشروع" : "Project Progress"}
                </span>
                <span className="text-emerald-200 font-medium">75%</span>
              </div>
            </div>
          </div>

          {/* Weather Conditions */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-emerald-400/30 p-6">
            <h3 className="text-xl font-bold text-emerald-300 mb-4">
              {language === "ar" ? "أحوال الطقس" : "Weather Conditions"}
            </h3>

            <div className="text-center">
              <div className="text-4xl mb-2">☀️</div>
              <div className="text-2xl font-bold text-emerald-200">28°C</div>
              <div className="text-emerald-400">
                {language === "ar" ? "مشمس" : "Sunny"}
              </div>
              <div className="text-sm text-emerald-500 mt-2">
                {language === "ar"
                  ? "ظروف مثالية للعمل"
                  : "Perfect working conditions"}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="text-center">
                <div className="text-emerald-400 text-sm">
                  {language === "ar" ? "الرطوبة" : "Humidity"}
                </div>
                <div className="text-emerald-200 font-medium">65%</div>
              </div>
              <div className="text-center">
                <div className="text-emerald-400 text-sm">
                  {language === "ar" ? "الرياح" : "Wind"}
                </div>
                <div className="text-emerald-200 font-medium">12 km/h</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
