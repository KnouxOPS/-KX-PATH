import { useEffect, useState } from "react";
import { Camera, Clock, MapPin, User } from "lucide-react";

interface LiveProjectFeedProps {
  language: "en" | "ar";
}

interface ProjectUpdate {
  id: number;
  projectName: string;
  projectNameAr: string;
  clientName: string;
  location: string;
  updateType: "photo" | "progress" | "milestone" | "issue";
  description: string;
  descriptionAr: string;
  timestamp: Date;
  image?: string;
}

const translations = {
  en: {
    liveUpdates: "Live Project Updates",
    justNow: "Just now",
    minutesAgo: "minutes ago",
    hoursAgo: "hours ago",
    viewAll: "View All Updates",
    photoUpdate: "Photo Update",
    progressUpdate: "Progress Update",
    milestoneReached: "Milestone Reached",
    issueReported: "Issue Reported",
  },
  ar: {
    liveUpdates: "التحديثات المباشرة للمشاريع",
    justNow: "الآن",
    minutesAgo: "دقائق مضت",
    hoursAgo: "ساعات مضت",
    viewAll: "عرض جميع التحديثات",
    photoUpdate: "تحديث الصور",
    progressUpdate: "تحديث التقدم",
    milestoneReached: "تم الوصول لمعلم مهم",
    issueReported: "تم الإبلاغ عن مشكلة",
  },
};

export default function LiveProjectFeed({ language }: LiveProjectFeedProps) {
  const [updates, setUpdates] = useState<ProjectUpdate[]>([
    {
      id: 1,
      projectName: "Royal Villa Landscape",
      projectNameAr: "تنسيق فيلا ملكية",
      clientName: "أحمد الفيصل",
      location: "الرياض",
      updateType: "photo",
      description: "New landscaping progress photos uploaded",
      descriptionAr: "تم رفع صور جديدة لتقدم أعمال التنسيق",
      timestamp: new Date(Date.now() - 5 * 60000),
      image: "🌿",
    },
    {
      id: 2,
      projectName: "Swimming Pool Complex",
      projectNameAr: "مجمع المسابح",
      clientName: "شركة الواحة",
      location: "جدة",
      updateType: "milestone",
      description: "Pool excavation completed successfully",
      descriptionAr: "تم الانتهاء من حفر المسبح بنجاح",
      timestamp: new Date(Date.now() - 45 * 60000),
      image: "🏊",
    },
    {
      id: 3,
      projectName: "Smart Garden System",
      projectNameAr: "نظام الحديقة الذكية",
      clientName: "سارة العلي",
      location: "الدمام",
      updateType: "progress",
      description: "Irrigation system installation 60% complete",
      descriptionAr: "تم إنجاز 60% من تركيب نظام الري",
      timestamp: new Date(Date.now() - 2 * 3600000),
      image: "💧",
    },
  ]);

  const t = translations[language];
  const isRTL = language === "ar";

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate new updates
      const newUpdate: ProjectUpdate = {
        id: Date.now(),
        projectName: "New Project Update",
        projectNameAr: "تحديث مشروع جديد",
        clientName: "عميل جديد",
        location: "المدينة",
        updateType: "photo",
        description: "Real-time update received",
        descriptionAr: "تم ��ستقبال تحديث فوري",
        timestamp: new Date(),
        image: "📸",
      };

      setUpdates((prev) => [newUpdate, ...prev.slice(0, 4)]);
    }, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const getTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diff = Math.floor((now.getTime() - timestamp.getTime()) / 1000);

    if (diff < 60) return t.justNow;
    if (diff < 3600) return `${Math.floor(diff / 60)} ${t.minutesAgo}`;
    return `${Math.floor(diff / 3600)} ${t.hoursAgo}`;
  };

  const getUpdateTypeColor = (type: string) => {
    switch (type) {
      case "photo":
        return "bg-blue-500";
      case "progress":
        return "bg-green-500";
      case "milestone":
        return "bg-purple-500";
      case "issue":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getUpdateTypeIcon = (type: string) => {
    switch (type) {
      case "photo":
        return Camera;
      case "progress":
        return Clock;
      case "milestone":
        return MapPin;
      case "issue":
        return User;
      default:
        return Camera;
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 h-fit">
      <div
        className={`flex items-center justify-between mb-6 ${isRTL ? "flex-row-reverse" : ""}`}
      >
        <h3 className="text-lg font-semibold text-white">{t.liveUpdates}</h3>
        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
      </div>

      <div className="space-y-4">
        {updates.map((update) => {
          const UpdateIcon = getUpdateTypeIcon(update.updateType);

          return (
            <div
              key={update.id}
              className={`flex gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all cursor-pointer ${isRTL ? "flex-row-reverse" : ""}`}
            >
              {/* Project Image */}
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-lg flex items-center justify-center text-lg flex-shrink-0">
                {update.image}
              </div>

              {/* Update Content */}
              <div
                className={`flex-1 min-w-0 ${isRTL ? "text-right" : "text-left"}`}
              >
                <div
                  className={`flex items-center gap-2 mb-1 ${isRTL ? "flex-row-reverse" : ""}`}
                >
                  <h4 className="text-white font-medium text-sm truncate">
                    {language === "ar"
                      ? update.projectNameAr
                      : update.projectName}
                  </h4>
                  <div
                    className={`w-2 h-2 rounded-full ${getUpdateTypeColor(update.updateType)} flex-shrink-0`}
                  />
                </div>

                <p className="text-gray-300 text-xs mb-2 line-clamp-2">
                  {language === "ar"
                    ? update.descriptionAr
                    : update.description}
                </p>

                <div
                  className={`flex items-center gap-3 text-xs text-gray-400 ${isRTL ? "flex-row-reverse" : ""}`}
                >
                  <div
                    className={`flex items-center gap-1 ${isRTL ? "flex-row-reverse" : ""}`}
                  >
                    <User className="w-3 h-3" />
                    <span>{update.clientName}</span>
                  </div>
                  <div
                    className={`flex items-center gap-1 ${isRTL ? "flex-row-reverse" : ""}`}
                  >
                    <Clock className="w-3 h-3" />
                    <span>{getTimeAgo(update.timestamp)}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* View All Button */}
      <button className="w-full mt-6 bg-emerald-600 hover:bg-emerald-700 transition-colors rounded-lg py-3 text-white font-medium">
        {t.viewAll}
      </button>
    </div>
  );
}
