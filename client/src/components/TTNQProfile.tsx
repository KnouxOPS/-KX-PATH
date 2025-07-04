import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  Star,
  MapPin,
  Phone,
  Mail,
  Globe,
  Building2,
  Users,
  Award,
  Calendar,
  CheckCircle,
  TrendingUp,
  Activity,
} from "lucide-react";

interface TTNQProject {
  id: string;
  name: string;
  nameAr: string;
  location: string;
  locationAr: string;
  value: number;
  status: "completed" | "ongoing" | "planned";
  completion: number;
  startDate: string;
  type: "residential" | "commercial" | "public";
  images: string[];
}

const ttnqProjects: TTNQProject[] = [
  {
    id: "1",
    name: "Dubai Marina Landscape",
    nameAr: "تنسيق مارينا دبي",
    location: "Dubai Marina",
    locationAr: "مارينا دبي",
    value: 4500000,
    status: "completed",
    completion: 100,
    startDate: "2023-01-15",
    type: "commercial",
    images: [],
  },
  {
    id: "2",
    name: "Sharjah Public Garden",
    nameAr: "حديقة الشارقة العامة",
    location: "Al Majaz - Sharjah",
    locationAr: "الماجز - الشارقة",
    value: 2800000,
    status: "ongoing",
    completion: 75,
    startDate: "2024-03-01",
    type: "public",
    images: [],
  },
  {
    id: "3",
    name: "Ajman Residential Complex",
    nameAr: "مجمع عجمان السكني",
    location: "Al Nuaimiya - Ajman",
    locationAr: "النعيمية - عجمان",
    value: 1900000,
    status: "planned",
    completion: 15,
    startDate: "2024-06-01",
    type: "residential",
    images: [],
  },
];

const TTNQProfile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "overview" | "projects" | "services"
  >("overview");

  const ttnqData = {
    name: "TTNQ AL-JEARA TECHNICAL SERVICES",
    nameAr: "طريق الجيرة للخدمات الفنية",
    logo: "https://cdn.builder.io/api/v1/image/assets%2F74c3699232444cda89c7094dd408430f%2F904ded2e5f2e4b65a4090ca759a801ec?format=webp&width=800",
    established: "2009",
    rating: 4.8,
    totalProjects: 187,
    activeProjects: 23,
    teamSize: 145,
    coverage: ["Dubai", "Sharjah", "Ajman", "Ras Al Khaimah"],
    specialties: [
      "تصميم الحدائق العامة والخاصة",
      "أنظمة الري الذكية والتوفيرية",
      "زراعة وصيانة النخيل والأشجار",
      "تركيب العشب الطبيعي والصناعي",
      "أنظمة الإضاءة الخارجية",
      "صيا��ة المساحات الخضراء",
    ],
    certifications: [
      "ISO 9001:2015 إدارة الجودة",
      "ISO 14001:2015 الإدارة البيئية",
      "شهادة بلدية دبي للمقاولين",
      "عضوية غرفة تجارة الشارقة",
    ],
    contact: {
      phone: "+971 6 123 4567",
      mobile: "+971 50 987 6543",
      email: "info@ttnq-aljeara.ae",
      website: "www.ttnq-aljeara.ae",
      address: "الشارقة - الإمارات العربية المتحدة",
    },
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ar-AE", {
      style: "currency",
      currency: "AED",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      notation: price > 1000000 ? "compact" : "standard",
    }).format(price);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return {
          color: "bg-green-500",
          text: "مكتمل",
          icon: <CheckCircle className="w-3 h-3" />,
        };
      case "ongoing":
        return {
          color: "bg-blue-500",
          text: "جاري التنفيذ",
          icon: <Activity className="w-3 h-3" />,
        };
      case "planned":
        return {
          color: "bg-yellow-500",
          text: "مخطط",
          icon: <Calendar className="w-3 h-3" />,
        };
      default:
        return { color: "bg-gray-500", text: "غير محدد", icon: null };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-slate-900 to-blue-800 text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-6 mb-6">
            <img
              src={ttnqData.logo}
              alt="TTNQ AL-JEARA Logo"
              className="w-24 h-24 rounded-2xl bg-white p-3 shadow-2xl"
            />
            <div className="text-left">
              <h1 className="text-4xl font-bold text-white mb-2">
                {ttnqData.nameAr}
              </h1>
              <p className="text-xl text-blue-300 mb-2">{ttnqData.name}</p>
              <div className="flex items-center gap-4">
                <Badge className="bg-blue-600 text-white">
                  تأسست {ttnqData.established}
                </Badge>
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="text-yellow-400 font-bold">
                    {ttnqData.rating}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-black/40 backdrop-blur-xl rounded-xl p-2 border border-white/20">
            <div className="flex gap-2">
              {[
                {
                  id: "overview",
                  label: "نظرة عامة",
                  icon: <Building2 className="w-4 h-4" />,
                },
                {
                  id: "projects",
                  label: "المشاريع",
                  icon: <Award className="w-4 h-4" />,
                },
                {
                  id: "services",
                  label: "الخدمات",
                  icon: <Users className="w-4 h-4" />,
                },
              ].map((tab) => (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? "default" : "ghost"}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 ${
                    activeTab === tab.id
                      ? "bg-blue-600 text-white"
                      : "text-blue-300 hover:text-white hover:bg-blue-600/20"
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === "overview" && (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Company Stats */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="bg-black/40 backdrop-blur-xl border-white/20 text-white">
                  <CardHeader>
                    <CardTitle className="text-blue-400 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      إحصائيات الشركة
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-400 mb-2">
                          {ttnqData.totalProjects}
                        </div>
                        <div className="text-sm text-gray-300">
                          إجمالي المشاريع
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-400 mb-2">
                          {ttnqData.activeProjects}
                        </div>
                        <div className="text-sm text-gray-300">مشاريع نشطة</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-purple-400 mb-2">
                          {ttnqData.teamSize}
                        </div>
                        <div className="text-sm text-gray-300">
                          عضو في الفريق
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-yellow-400 mb-2">
                          {ttnqData.coverage.length}
                        </div>
                        <div className="text-sm text-gray-300">
                          إمارات التغطية
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-black/40 backdrop-blur-xl border-white/20 text-white">
                  <CardHeader>
                    <CardTitle className="text-blue-400">
                      التخصصات والخدمات
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      {ttnqData.specialties.map((specialty, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-3 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20"
                        >
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          <span className="text-blue-100">{specialty}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-black/40 backdrop-blur-xl border-white/20 text-white">
                  <CardHeader>
                    <CardTitle className="text-blue-400">
                      الشهادات والاعتمادات
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      {ttnqData.certifications.map((cert, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-3 p-3 bg-green-500/10 rounded-lg border border-green-500/20"
                        >
                          <Award className="w-5 h-5 text-green-400" />
                          <span className="text-green-100">{cert}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Information */}
              <div className="space-y-6">
                <Card className="bg-black/40 backdrop-blur-xl border-white/20 text-white">
                  <CardHeader>
                    <CardTitle className="text-blue-400">
                      معلومات التواصل
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-blue-400" />
                      <div>
                        <div className="text-white">
                          {ttnqData.contact.phone}
                        </div>
                        <div className="text-gray-400 text-sm">هاتف المكتب</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-green-400" />
                      <div>
                        <div className="text-white">
                          {ttnqData.contact.mobile}
                        </div>
                        <div className="text-gray-400 text-sm">الجوال</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-purple-400" />
                      <div>
                        <div className="text-white">
                          {ttnqData.contact.email}
                        </div>
                        <div className="text-gray-400 text-sm">
                          البريد الإلكتروني
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Globe className="w-5 h-5 text-yellow-400" />
                      <div>
                        <div className="text-white">
                          {ttnqData.contact.website}
                        </div>
                        <div className="text-gray-400 text-sm">
                          الموقع الإلكتروني
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-red-400" />
                      <div>
                        <div className="text-white">
                          {ttnqData.contact.address}
                        </div>
                        <div className="text-gray-400 text-sm">العنوان</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-black/40 backdrop-blur-xl border-white/20 text-white">
                  <CardHeader>
                    <CardTitle className="text-blue-400">
                      مناطق التغطية
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {ttnqData.coverage.map((area, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-3 p-2 bg-blue-500/10 rounded-lg"
                        >
                          <MapPin className="w-4 h-4 text-blue-400" />
                          <span className="text-blue-100">{area}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "projects" && (
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {ttnqProjects.map((project) => (
                <Card
                  key={project.id}
                  className="bg-black/40 backdrop-blur-xl border-white/20 text-white hover:scale-105 transition-transform"
                >
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg text-blue-300">
                          {project.nameAr}
                        </CardTitle>
                        <p className="text-sm text-gray-400">
                          {project.locationAr}
                        </p>
                      </div>
                      <Badge
                        className={`${getStatusBadge(project.status).color} text-white flex items-center gap-1`}
                      >
                        {getStatusBadge(project.status).icon}
                        {getStatusBadge(project.status).text}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-300">القيمة:</span>
                        <span className="text-green-400 font-bold">
                          {formatPrice(project.value)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">نسبة الإنجاز:</span>
                        <span className="text-blue-400">
                          {project.completion}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all"
                          style={{ width: `${project.completion}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">تاريخ البدء:</span>
                        <span className="text-purple-400">
                          {new Date(project.startDate).toLocaleDateString(
                            "ar-AE",
                          )}
                        </span>
                      </div>
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 mt-4">
                        عرض تفاصيل المشروع
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {activeTab === "services" && (
            <div className="grid lg:grid-cols-2 gap-8">
              {ttnqData.specialties.map((service, idx) => (
                <Card
                  key={idx}
                  className="bg-black/40 backdrop-blur-xl border-white/20 text-white"
                >
                  <CardHeader>
                    <CardTitle className="text-blue-400 flex items-center gap-2">
                      <Building2 className="w-5 h-5" />
                      {service}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 mb-4">
                      خدمة متخصصة وعالية الجودة مع ضمان الامتياز في التنفيذ
                      والمتابعة.
                    </p>
                    <div className="flex gap-3">
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        طلب عرض سعر
                      </Button>
                      <Button
                        variant="outline"
                        className="border-blue-500 text-blue-400"
                      >
                        تفاصيل أكثر
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default TTNQProfile;
