import { useState } from "react";
import {
  Crown,
  Star,
  Sparkles,
  Eye,
  Headphones,
  Calendar,
  Gift,
  Zap,
  Diamond,
} from "lucide-react";

interface PremiumZoneProps {
  language: "en" | "ar";
}

export default function PremiumZone({ language }: PremiumZoneProps) {
  const [activeService, setActiveService] = useState("vr-ar");

  const premiumServices = [
    {
      id: "vr-ar",
      title: language === "ar" ? "جولات VR/AR" : "VR/AR Tours",
      description:
        language === "ar"
          ? "جولات افتراضية ثلاثية الأبعاد لحديقتك قبل التنفيذ"
          : "3D virtual tours of your garden before implementation",
      icon: Eye,
      price: "$299",
      features: [
        language === "ar"
          ? "جولة افتراضية تفاعلية 360°"
          : "Interactive 360° virtual tour",
        language === "ar" ? "محاكاة الفصول المختلفة" : "Seasonal simulation",
        language === "ar"
          ? "مشاهدة النباتات في مراحل النمو"
          : "Plant growth stage visualization",
        language === "ar"
          ? "تجربة الإضاءة الليلية"
          : "Night lighting experience",
      ],
    },
    {
      id: "ai-consultation",
      title:
        language === "ar"
          ? "استشارة الذكي الاصطناعي المتقدمة"
          : "Advanced AI Consultation",
      description:
        language === "ar"
          ? "جلسات استشارية مع خبراء الذكي الاصطناعي المتخصصين"
          : "Consultation sessions with specialized AI experts",
      icon: Sparkles,
      price: "$199",
      features: [
        language === "ar"
          ? "تحليل التربة بالذكي الاصطناعي"
          : "AI-powered soil analysis",
        language === "ar"
          ? "اقتراحات نباتات مخصصة"
          : "Personalized plant recommendations",
        language === "ar"
          ? "تحسين استهلاك المياه"
          : "Water consumption optimization",
        language === "ar"
          ? "تنبؤات النمو والصحة"
          : "Growth and health predictions",
      ],
    },
    {
      id: "premium-design",
      title:
        language === "ar" ? "تصميم حصري متميز" : "Exclusive Premium Design",
      description:
        language === "ar"
          ? "تصاميم حصرية من كبار المصممين العالميين"
          : "Exclusive designs from top international designers",
      icon: Crown,
      price: "$899",
      features: [
        language === "ar"
          ? "تصميم من مصمم عالمي معتمد"
          : "Design by certified international designer",
        language === "ar"
          ? "نباتات نادرة ومستوردة"
          : "Rare and imported plants",
        language === "ar" ? "أثاث حدائق فاخر" : "Luxury garden furniture",
        language === "ar" ? "ضمان لمدة 5 سنوات" : "5-year warranty",
      ],
    },
    {
      id: "smart-maintenance",
      title:
        language === "ar" ? "صيانة ذكية متقدمة" : "Advanced Smart Maintenance",
      description:
        language === "ar"
          ? "نظام صيانة ذكي بالذكي الاصطناعي وإنترنت الأشياء"
          : "Smart AI and IoT-powered maintenance system",
      icon: Zap,
      price: "$399",
      features: [
        language === "ar"
          ? "مراقبة مستمرة بالاستشعار"
          : "Continuous sensor monitoring",
        language === "ar" ? "ري تلقائي ذكي" : "Smart automated irrigation",
        language === "ar" ? "تنبيهات فورية للمشاكل" : "Instant problem alerts",
        language === "ar"
          ? "صيانة وقائية مجدولة"
          : "Scheduled preventive maintenance",
      ],
    },
  ];

  const exclusiveBenefits = [
    {
      icon: Star,
      title: language === "ar" ? "أولوية في المواعيد" : "Priority Scheduling",
      description:
        language === "ar"
          ? "حجز مواعيد عاجلة خلال 24 ساعة"
          : "Emergency appointments within 24 hours",
    },
    {
      icon: Headphones,
      title: language === "ar" ? "دعم مخصص 24/7" : "24/7 Dedicated Support",
      description:
        language === "ar"
          ? "خط ساخن مخصص لعملاء البريميوم"
          : "Dedicated hotline for premium clients",
    },
    {
      icon: Gift,
      title:
        language === "ar"
          ? "هدايا وخصومات حصرية"
          : "Exclusive Gifts & Discounts",
      description:
        language === "ar"
          ? "خصومات تصل إلى 30% على الخدمات الإضافية"
          : "Up to 30% discounts on additional services",
    },
    {
      icon: Calendar,
      title: language === "ar" ? "فعاليات VIP" : "VIP Events",
      description:
        language === "ar"
          ? "دعوات حصرية لمعارض وورش العمل"
          : "Exclusive invitations to exhibitions and workshops",
    },
  ];

  const successStories = [
    {
      client: language === "ar" ? "عائلة الزهراني" : "Al Zahrani Family",
      project:
        language === "ar" ? "فيلا الريان الفاخرة" : "Luxury Al Rayyan Villa",
      image: "🏰",
      testimonial:
        language === "ar"
          ? "الخدمة المتميزة والتصميم الاستثنائي فاق كل توقعاتنا. جودة عالمية بمعايير لا مثيل لها."
          : "The premium service and exceptional design exceeded all our expectations. World-class quality with unmatched standards.",
      value: "$150,000",
      completion: "2023",
    },
    {
      client:
        language === "ar"
          ? "شركة الإمارات للضيافة"
          : "Emirates Hospitality Group",
      project: language === "ar" ? "منتجع النخيل الذهبي" : "Golden Palm Resort",
      image: "🌴",
      testimonial:
        language === "ar"
          ? "تحويل حقيقي لمفهوم الحدائق التجارية. نظام ذكي متطور وصيانة لا تحتاج تدخل."
          : "A real transformation of commercial gardens concept. Advanced smart system with maintenance-free operation.",
      value: "$500,000",
      completion: "2023",
    },
  ];

  const activeServiceData =
    premiumServices.find((service) => service.id === activeService) ||
    premiumServices[0];

  return (
    <div className="space-y-8" dir={language === "ar" ? "rtl" : "ltr"}>
      {/* Premium Header */}
      <div className="relative bg-gradient-to-r from-purple-900/50 via-indigo-900/50 to-purple-900/50 backdrop-blur-lg rounded-3xl border border-purple-400/30 p-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 backdrop-blur-3xl"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
              <Crown className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {language === "ar" ? "المنطقة المتميزة" : "Premium Zone"}
              </h1>
              <p className="text-purple-300 text-lg">
                {language === "ar"
                  ? "خدمات حصرية لعملاء النخبة"
                  : "Exclusive services for elite clients"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-300">50+</div>
              <div className="text-purple-400">
                {language === "ar" ? "عميل متميز" : "Premium Clients"}
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-300">$2.5M</div>
              <div className="text-purple-400">
                {language === "ar"
                  ? "قيمة المشاريع المتميزة"
                  : "Premium Projects Value"}
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-300">98%</div>
              <div className="text-purple-400">
                {language === "ar" ? "معدل الرضا" : "Satisfaction Rate"}
              </div>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-10 right-10 w-20 h-20 bg-purple-500/20 rounded-full blur-xl animate-pulse"></div>
        <div
          className="absolute bottom-10 left-10 w-16 h-16 bg-pink-500/20 rounded-full blur-xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      {/* Premium Services */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Service Selection */}
        <div className="lg:col-span-1">
          <h3 className="text-2xl font-bold text-purple-300 mb-6">
            {language === "ar" ? "الخدمات المتميزة" : "Premium Services"}
          </h3>
          <div className="space-y-4">
            {premiumServices.map((service) => (
              <button
                key={service.id}
                onClick={() => setActiveService(service.id)}
                className={`w-full p-4 rounded-2xl transition-all duration-300 text-left ${
                  activeService === service.id
                    ? "bg-gradient-to-r from-purple-600/30 to-pink-600/30 border border-purple-400/50"
                    : "bg-white/5 hover:bg-white/10 border border-purple-400/20"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      activeService === service.id
                        ? "bg-gradient-to-br from-purple-500 to-pink-500"
                        : "bg-purple-500/20"
                    }`}
                  >
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-purple-200">
                      {service.title}
                    </div>
                    <div className="text-sm text-purple-400 mt-1">
                      {service.price}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Service Details */}
        <div className="lg:col-span-2">
          <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-lg rounded-2xl border border-purple-400/30 p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                <activeServiceData.icon className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-purple-300">
                  {activeServiceData.title}
                </h3>
                <p className="text-purple-400">
                  {activeServiceData.description}
                </p>
              </div>
              <div className="ml-auto text-right">
                <div className="text-3xl font-bold text-purple-300">
                  {activeServiceData.price}
                </div>
                <div className="text-purple-400">
                  {language === "ar" ? "للجلسة" : "per session"}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-purple-300">
                {language === "ar"
                  ? "المميزات المتضمنة:"
                  : "Included Features:"}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeServiceData.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-purple-800/20 rounded-xl"
                  >
                    <Diamond className="w-5 h-5 text-purple-400" />
                    <span className="text-purple-200">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex gap-4">
              <button className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-6 py-3 rounded-xl font-semibold transition-all duration-300">
                {language === "ar" ? "احجز الآن" : "Book Now"}
              </button>
              <button className="px-6 py-3 border border-purple-400/50 rounded-xl text-purple-300 hover:bg-purple-600/20 transition-all duration-300">
                {language === "ar" ? "معرفة المزيد" : "Learn More"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Exclusive Benefits */}
      <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-purple-400/30 p-8">
        <h3 className="text-2xl font-bold text-purple-300 mb-6">
          {language === "ar"
            ? "مزايا حصرية لعملاء البريميوم"
            : "Exclusive Premium Benefits"}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {exclusiveBenefits.map((benefit, index) => (
            <div
              key={index}
              className="text-center p-6 bg-purple-800/20 rounded-2xl"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <benefit.icon className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-semibold text-purple-200 mb-2">
                {benefit.title}
              </h4>
              <p className="text-purple-400 text-sm">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Success Stories */}
      <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-purple-400/30 p-8">
        <h3 className="text-2xl font-bold text-purple-300 mb-6">
          {language === "ar"
            ? "قصص نجاح العملاء المتميزين"
            : "Premium Client Success Stories"}
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {successStories.map((story, index) => (
            <div key={index} className="bg-purple-800/20 rounded-2xl p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="text-4xl">{story.image}</div>
                <div className="flex-1">
                  <h4 className="font-semibold text-purple-200">
                    {story.client}
                  </h4>
                  <p className="text-purple-400">{story.project}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-purple-300 font-bold">
                      {story.value}
                    </span>
                    <span className="text-purple-400">{story.completion}</span>
                  </div>
                </div>
              </div>

              <blockquote className="text-purple-200 italic border-l-4 border-purple-400 pl-4">
                "{story.testimonial}"
              </blockquote>

              <div className="flex items-center gap-1 mt-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Premium Team */}
      <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur-lg rounded-2xl border border-purple-400/30 p-8 text-center">
        <h3 className="text-2xl font-bold text-purple-300 mb-4">
          {language === "ar"
            ? "تواصل مع فريق الخدمات المتميزة"
            : "Contact Premium Services Team"}
        </h3>
        <p className="text-purple-400 mb-6">
          {language === "ar"
            ? "استشاراتنا الحصرية متاحة 24/7 لعملاء البريميوم فقط"
            : "Our exclusive consultations are available 24/7 for premium clients only"}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-8 py-3 rounded-xl font-semibold transition-all duration-300">
            {language === "ar" ? "اتصل بنا الآن" : "Call Us Now"}
          </button>
          <button className="border border-purple-400/50 px-8 py-3 rounded-xl text-purple-300 hover:bg-purple-600/20 transition-all duration-300">
            {language === "ar" ? "حدد موعد استشارة" : "Schedule Consultation"}
          </button>
        </div>

        <div className="mt-6 flex items-center justify-center gap-8 text-purple-400">
          <div className="flex items-center gap-2">
            <Headphones className="w-5 h-5" />
            <span>+971-800-PREMIUM</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            <span>{language === "ar" ? "متاح 24/7" : "Available 24/7"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
