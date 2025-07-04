import { useState } from "react";
import {
  Bot,
  Sparkles,
  Upload,
  Download,
  RefreshCw,
  Wand2,
  Camera,
  FileImage,
  Cpu,
  Zap,
  Eye,
  Settings,
  MapPin,
  Thermometer,
  TreePine,
  Droplets,
  Sun,
} from "lucide-react";

interface AIDesignHubProps {
  language: "en" | "ar";
}

const translations = {
  en: {
    aiDesignHub: "AI Design Hub",
    subtitle: "Knox Design Engine - Advanced Landscape AI",
    knoxDesign: "KnoxDesign",
    knoxQuote: "KnoxQuote",
    knoxPlants: "KnoxPlants",
    knoxSuggest: "KnoxSuggest",
    uploadImage: "Upload Site Image",
    describeDesign: "Describe Your Vision",
    placeholder:
      "I want a modern infinity pool with palm trees, outdoor dining area, and smart lighting...",
    generateDesign: "Generate 3D Design",
    generating: "AI is creating your design...",
    designReady: "Your AI design is ready!",
    download3D: "Download 3D Model",
    downloadPlan: "Download Plans",
    getQuote: "Get Instant Quote",
    viewAR: "View in AR/VR",
    instantPricing: "Instant Pricing",
    plantRecommendations: "Plant Recommendations",
    smartSuggestions: "Smart Suggestions",
    climateAnalysis: "Climate Analysis",
    soilAnalysis: "Soil Analysis",
    seasonalPreview: "Seasonal Preview",
    maintenanceSchedule: "Maintenance Schedule",
    location: "Location",
    selectLocation: "Select project location",
    projectSize: "Project Size",
    budget: "Budget Range",
    timeline: "Timeline",
    features: "Requested Features",
    processingStage: "Processing Stage",
    analyzing: "Analyzing site conditions...",
    designing: "Creating 3D landscape design...",
    optimizing: "Optimizing plant selection...",
    pricing: "Calculating project costs...",
    rendering: "Rendering final visualization...",
  },
  ar: {
    aiDesignHub: "مركز التصميم الذكي",
    subtitle: "محرك نوكس للتصميم - الذكاء الاصطناعي المتقدم للمناظر الطبيعية",
    knoxDesign: "نوكس للتصميم",
    knoxQuote: "نوكس للتسعير",
    knoxPlants: "نوكس للنباتات",
    knoxSuggest: "نوكس للاقتراحات",
    uploadImage: "رفع صورة الموقع",
    describeDesign: "صف رؤيتك",
    placeholder:
      "أريد مسبح لا نهائي عصري مع أشجار النخيل ومنطقة طعام خارجية وإضاءة ذكية...",
    generateDesign: "إنتاج تصميم ثلاثي الأبعاد",
    generating: "الذكاء الاصطناعي ينشئ تصميمك...",
    designReady: "تصميمك الذكي جاهز!",
    download3D: "تحميل النموذج ثلاثي الأبعاد",
    downloadPlan: "تحميل المخططات",
    getQuote: "الحصول على عرض سعر فوري",
    viewAR: "عرض بالواقع المعزز/الافتراضي",
    instantPricing: "التسعير الفوري",
    plantRecommendations: "توصيات النباتات",
    smartSuggestions: "الاقتراحات الذكية",
    climateAnalysis: "تحليل المناخ",
    soilAnalysis: "تحليل التربة",
    seasonalPreview: "معاينة فصلية",
    maintenanceSchedule: "جدول الصيانة",
    location: "الموقع",
    selectLocation: "اختر موقع المشروع",
    projectSize: "حجم المشروع",
    budget: "نطاق الميزانية",
    timeline: "الجدول الزمني",
    features: "الميزات المطلوبة",
    processingStage: "مرحلة المعالجة",
    analyzing: "تحليل ظروف الموقع...",
    designing: "إنشاء تصميم المناظر الطبيعية ثلاثي الأبعاد...",
    optimizing: "تحسين اختيار النباتات...",
    pricing: "حساب تكاليف المشروع...",
    rendering: "عرض التصور النهائي...",
  },
};

const processingStages = [
  { key: "analyzing", icon: Cpu, color: "blue" },
  { key: "designing", icon: Bot, color: "purple" },
  { key: "optimizing", icon: TreePine, color: "green" },
  { key: "pricing", icon: Wand2, color: "yellow" },
  { key: "rendering", icon: Eye, color: "emerald" },
];

const aiEngines = [
  {
    name: "KnoxDesign",
    nameAr: "نوكس للتصميم",
    description:
      "3D landscape design generation from descriptions and site photos",
    descriptionAr:
      "إنتاج تصاميم المناظر الطبيعية ثلاثية الأبعاد من الوصف وصور الموقع",
    icon: Bot,
    color: "purple",
    status: "active",
  },
  {
    name: "KnoxQuote",
    nameAr: "نوكس للتسعير",
    description:
      "Real-time pricing based on live market data and project specs",
    descriptionAr:
      "التسعير الفوري بناءً على بيانات السوق الحية ومواصفات المشروع",
    icon: Zap,
    color: "yellow",
    status: "active",
  },
  {
    name: "KnoxPlants",
    nameAr: "نوكس للنباتات",
    description: "AI plant selection for UAE climate and soil conditions",
    descriptionAr: "اختيار النباتات الذكي لمناخ وتربة الإمارات",
    icon: TreePine,
    color: "green",
    status: "active",
  },
  {
    name: "KnoxSuggest",
    nameAr: "نوكس للاقتراحات",
    description:
      "Smart recommendations based on client behavior and preferences",
    descriptionAr: "التوصيات الذكية بناءً على سلوك العميل وتفضيلاته",
    icon: Sparkles,
    color: "emerald",
    status: "processing",
  },
];

export default function AIDesignHub({ language }: AIDesignHubProps) {
  const [designInput, setDesignInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStage, setCurrentStage] = useState(0);
  const [generatedDesign, setGeneratedDesign] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState("Dubai");
  const [projectSize, setProjectSize] = useState("500");
  const [budget, setBudget] = useState("50000-100000");

  const t = translations[language];
  const isRTL = language === "ar";

  const handleGenerate = async () => {
    if (!designInput.trim()) return;

    setIsGenerating(true);
    setCurrentStage(0);

    // Simulate AI processing stages
    for (let i = 0; i < processingStages.length; i++) {
      setCurrentStage(i);
      await new Promise((resolve) => setTimeout(resolve, 1500));
    }

    setGeneratedDesign("ai-generated-design");
    setIsGenerating(false);
  };

  const getColorClasses = (color: string) => {
    switch (color) {
      case "purple":
        return "from-purple-400 to-purple-600";
      case "yellow":
        return "from-yellow-400 to-orange-500";
      case "green":
        return "from-green-400 to-emerald-500";
      case "emerald":
        return "from-emerald-400 to-teal-500";
      case "blue":
        return "from-blue-400 to-cyan-500";
      default:
        return "from-gray-400 to-gray-600";
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className={`${isRTL ? "text-right" : "text-left"}`}>
        <h1 className="text-3xl font-bold text-white mb-2">{t.aiDesignHub}</h1>
        <p className="text-purple-300 text-lg opacity-90">{t.subtitle}</p>
      </div>

      {/* AI Engines Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {aiEngines.map((engine, index) => (
          <div
            key={index}
            className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20"
          >
            <div
              className={`flex items-center gap-3 mb-3 ${isRTL ? "flex-row-reverse" : ""}`}
            >
              <div
                className={`w-10 h-10 bg-gradient-to-br ${getColorClasses(engine.color)} rounded-lg flex items-center justify-center`}
              >
                <engine.icon className="w-5 h-5 text-white" />
              </div>
              <div className={`${isRTL ? "text-right" : "text-left"}`}>
                <div className="text-white font-semibold text-sm">
                  {language === "ar" ? engine.nameAr : engine.name}
                </div>
                <div
                  className={`w-2 h-2 rounded-full ${engine.status === "active" ? "bg-green-400" : "bg-yellow-400"} animate-pulse`}
                />
              </div>
            </div>
            <p className="text-gray-300 text-xs leading-relaxed">
              {language === "ar" ? engine.descriptionAr : engine.description}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Project Parameters */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
            <h3
              className={`text-xl font-semibold text-white mb-6 ${isRTL ? "text-right" : "text-left"}`}
            >
              {t.knoxDesign}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label
                  className={`block text-white font-medium mb-2 ${isRTL ? "text-right" : "text-left"}`}
                >
                  {t.location}
                </label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white"
                >
                  <option value="Dubai">Dubai - دبي</option>
                  <option value="Abu Dhabi">Abu Dhabi - أبوظبي</option>
                  <option value="Sharjah">Sharjah - الشارقة</option>
                  <option value="Ajman">Ajman - عجمان</option>
                </select>
              </div>

              <div>
                <label
                  className={`block text-white font-medium mb-2 ${isRTL ? "text-right" : "text-left"}`}
                >
                  {t.projectSize} (m²)
                </label>
                <input
                  type="number"
                  value={projectSize}
                  onChange={(e) => setProjectSize(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white"
                />
              </div>
            </div>

            {/* Image Upload */}
            <div className="mb-6">
              <label
                className={`block text-white font-medium mb-3 ${isRTL ? "text-right" : "text-left"}`}
              >
                {t.uploadImage}
              </label>
              <div className="border-2 border-dashed border-white/30 rounded-xl p-8 text-center hover:border-purple-400 transition-colors cursor-pointer">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-300 mb-2">
                  {language === "ar"
                    ? "اسحب وأفلت صورة الموقع هنا أو انقر للتصفح"
                    : "Drag & drop site image here or click to browse"}
                </p>
                <p className="text-gray-500 text-sm">PNG, JPG up to 10MB</p>
              </div>
            </div>

            {/* Design Description */}
            <div className="mb-6">
              <label
                className={`block text-white font-medium mb-3 ${isRTL ? "text-right" : "text-left"}`}
              >
                {t.describeDesign}
              </label>
              <textarea
                value={designInput}
                onChange={(e) => setDesignInput(e.target.value)}
                placeholder={t.placeholder}
                className={`w-full h-32 bg-white/10 border border-white/20 rounded-lg p-4 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 resize-none ${isRTL ? "text-right" : "text-left"}`}
                dir={isRTL ? "rtl" : "ltr"}
              />
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={!designInput.trim() || isGenerating}
              className={`w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-4 px-6 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed ${!isGenerating ? "hover:scale-105" : ""}`}
            >
              <div
                className={`flex items-center justify-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-6 h-6 animate-spin" />
                    <span>{t.generating}</span>
                  </>
                ) : (
                  <>
                    <Wand2 className="w-6 h-6" />
                    <span>{t.generateDesign}</span>
                  </>
                )}
              </div>
            </button>
          </div>

          {/* Generated Design Display */}
          {(isGenerating || generatedDesign) && (
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
              {isGenerating ? (
                <div className="text-center py-12">
                  <div className="mb-8">
                    <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                      {processingStages[currentStage]?.icon &&
                        (() => {
                          const IconComponent =
                            processingStages[currentStage].icon;
                          return (
                            <IconComponent className="w-10 h-10 text-white" />
                          );
                        })()}
                    </div>
                    <div className="text-white font-semibold text-xl mb-2">
                      {t.processingStage}
                    </div>
                    <div className="text-purple-300 text-lg">
                      {t[processingStages[currentStage]?.key as keyof typeof t]}
                    </div>
                  </div>

                  {/* Progress Stages */}
                  <div className="flex justify-center items-center gap-4 mb-8">
                    {processingStages.map((stage, index) => (
                      <div
                        key={index}
                        className={`flex flex-col items-center ${index <= currentStage ? "opacity-100" : "opacity-30"}`}
                      >
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                            index < currentStage
                              ? "bg-green-500"
                              : index === currentStage
                                ? `bg-gradient-to-r ${getColorClasses(stage.color)}`
                                : "bg-gray-600"
                          }`}
                        >
                          <stage.icon className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xs text-gray-300">
                          {t[stage.key as keyof typeof t]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <div
                    className={`flex items-center justify-between mb-6 ${isRTL ? "flex-row-reverse" : ""}`}
                  >
                    <h3 className="text-white font-semibold text-xl">
                      {t.designReady}
                    </h3>
                    <div
                      className={`flex gap-2 ${isRTL ? "flex-row-reverse" : ""}`}
                    >
                      <button className="p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                        <Download className="w-5 h-5 text-white" />
                      </button>
                      <button className="p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                        <Eye className="w-5 h-5 text-white" />
                      </button>
                    </div>
                  </div>

                  {/* 3D Design Preview */}
                  <div className="aspect-video bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-xl border border-white/20 flex items-center justify-center mb-6">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Bot className="w-10 h-10 text-white" />
                      </div>
                      <div className="text-white text-lg font-semibold mb-2">
                        3D Design Preview
                      </div>
                      <div className="text-purple-300">
                        {language === "ar"
                          ? "معاينة التصميم ثلاثي الأبعاد"
                          : "Interactive 3D landscape visualization"}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-4">
                    <button className="bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold py-3 px-4 rounded-lg hover:scale-105 transition-all">
                      {t.download3D}
                    </button>
                    <button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold py-3 px-4 rounded-lg hover:scale-105 transition-all">
                      {t.viewAR}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* AI Insights Sidebar */}
        <div className="space-y-6">
          {/* Climate Analysis */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
            <h3
              className={`text-lg font-semibold text-white mb-4 ${isRTL ? "text-right" : "text-left"}`}
            >
              {t.climateAnalysis}
            </h3>
            <div className="space-y-3">
              <div
                className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}
              >
                <Sun className="w-5 h-5 text-yellow-400" />
                <div>
                  <div className="text-white text-sm">Temperature: 35°C</div>
                  <div className="text-gray-400 text-xs">
                    High heat tolerance needed
                  </div>
                </div>
              </div>
              <div
                className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}
              >
                <Droplets className="w-5 h-5 text-blue-400" />
                <div>
                  <div className="text-white text-sm">Humidity: 65%</div>
                  <div className="text-gray-400 text-xs">
                    Moderate moisture level
                  </div>
                </div>
              </div>
              <div
                className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}
              >
                <MapPin className="w-5 h-5 text-emerald-400" />
                <div>
                  <div className="text-white text-sm">
                    Location: {selectedLocation}
                  </div>
                  <div className="text-gray-400 text-xs">
                    Desert climate zone
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Instant Pricing */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
            <h3
              className={`text-lg font-semibold text-white mb-4 ${isRTL ? "text-right" : "text-left"}`}
            >
              {t.instantPricing}
            </h3>
            <div className="space-y-3">
              <div
                className={`flex justify-between ${isRTL ? "flex-row-reverse" : ""}`}
              >
                <span className="text-gray-300">Design & Planning</span>
                <span className="text-emerald-400 font-semibold">
                  15,000 SAR
                </span>
              </div>
              <div
                className={`flex justify-between ${isRTL ? "flex-row-reverse" : ""}`}
              >
                <span className="text-gray-300">Materials</span>
                <span className="text-emerald-400 font-semibold">
                  45,000 SAR
                </span>
              </div>
              <div
                className={`flex justify-between ${isRTL ? "flex-row-reverse" : ""}`}
              >
                <span className="text-gray-300">Installation</span>
                <span className="text-emerald-400 font-semibold">
                  25,000 SAR
                </span>
              </div>
              <hr className="border-white/20" />
              <div
                className={`flex justify-between text-lg font-bold ${isRTL ? "flex-row-reverse" : ""}`}
              >
                <span className="text-white">Total Estimate</span>
                <span className="text-emerald-400">85,000 SAR</span>
              </div>
            </div>
            <button className="w-full mt-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold py-3 px-4 rounded-lg hover:scale-105 transition-all">
              {t.getQuote}
            </button>
          </div>

          {/* Plant Recommendations */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
            <h3
              className={`text-lg font-semibold text-white mb-4 ${isRTL ? "text-right" : "text-left"}`}
            >
              {t.plantRecommendations}
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-lg">
                  🌴
                </div>
                <div>
                  <div className="text-white text-sm">Date Palm</div>
                  <div className="text-green-400 text-xs">
                    Excellent for UAE climate
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-lg">
                  🌺
                </div>
                <div>
                  <div className="text-white text-sm">Bougainvillea</div>
                  <div className="text-emerald-400 text-xs">
                    Low water requirement
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center text-lg">
                  🌿
                </div>
                <div>
                  <div className="text-white text-sm">Desert Rose</div>
                  <div className="text-teal-400 text-xs">Heat resistant</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
