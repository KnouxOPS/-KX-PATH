import { useState } from "react";
import { Bot, Sparkles, Image, Download, RefreshCw, Wand2 } from "lucide-react";

interface AIDesignStudioProps {
  language: "en" | "ar";
}

const translations = {
  en: {
    aiStudio: "AI Design Studio",
    describe: "Describe your dream landscape",
    placeholder:
      "I want a modern garden with a swimming pool, palm trees, and outdoor seating area...",
    designType: "Design Type",
    garden: "Garden Design",
    pool: "Pool Design",
    irrigation: "Irrigation System",
    lighting: "Lighting Design",
    playground: "Playground",
    fullLandscape: "Full Landscape",
    generate: "Generate Design",
    generating: "Generating...",
    download: "Download",
    regenerate: "Regenerate",
    recentDesigns: "Recent AI Designs",
    inspiration: "Get Inspiration",
    tips: "Pro Tips",
    tip1: "Be specific about colors, materials, and style preferences",
    tip2: "Mention the space dimensions if known",
    tip3: "Include any existing features to work around",
    designReady: "Your AI design is ready!",
    processing: "Processing your request...",
  },
  ar: {
    aiStudio: "ستوديو التصميم الذكي",
    describe: "صف حديقة أحلامك",
    placeholder: "أريد حديقة عصرية فيها مسبح وأشجار نخيل ومنطقة جلوس خارجية...",
    designType: "نوع التصميم",
    garden: "تصميم الحديقة",
    pool: "تصميم المسبح",
    irrigation: "نظام الري",
    lighting: "تصميم الإضاءة",
    playground: "الملعب",
    fullLandscape: "تنسيق شامل",
    generate: "إنتاج التصميم",
    generating: "جاري الإنتاج...",
    download: "تحميل",
    regenerate: "إعادة الإنتاج",
    recentDesigns: "التصاميم الذكية الحديثة",
    inspiration: "احصل على الإلهام",
    tips: "نصائح احترافية",
    tip1: "كن محدداً حول الألوان والمواد وتفضيلات الطراز",
    tip2: "اذكر أبعاد المساحة إن كنت تعرفها",
    tip3: "أضف أي ميزات موجودة للعمل حولها",
    designReady: "تصميمك الذكي جاهز!",
    processing: "جاري معالجة طلبك...",
  },
};

const designTypes = [
  { key: "garden", icon: "🌿" },
  { key: "pool", icon: "🏊" },
  { key: "irrigation", icon: "💧" },
  { key: "lighting", icon: "💡" },
  { key: "playground", icon: "🛝" },
  { key: "fullLandscape", icon: "🏡" },
];

const recentDesigns = [
  {
    id: 1,
    name: "Modern Villa Garden",
    nameAr: "حديقة فيلا عصرية",
    image: "🌿",
    type: "garden",
  },
  {
    id: 2,
    name: "Infinity Pool Design",
    nameAr: "تصميم مسبح لا نهائي",
    image: "🏊",
    type: "pool",
  },
  {
    id: 3,
    name: "Smart Lighting System",
    nameAr: "نظام إضاءة ذكي",
    image: "💡",
    type: "lighting",
  },
];

export default function AIDesignStudio({ language }: AIDesignStudioProps) {
  const [description, setDescription] = useState("");
  const [selectedType, setSelectedType] = useState("garden");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedDesign, setGeneratedDesign] = useState<string | null>(null);

  const t = translations[language];
  const isRTL = language === "ar";

  const handleGenerate = async () => {
    if (!description.trim()) return;

    setIsGenerating(true);

    // Simulate AI generation
    setTimeout(() => {
      setGeneratedDesign("generated-design-placeholder");
      setIsGenerating(false);
    }, 3000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div
        className={`flex items-center gap-4 ${isRTL ? "flex-row-reverse" : ""}`}
      >
        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
          <Bot className="w-6 h-6 text-white" />
        </div>
        <div className={`${isRTL ? "text-right" : "text-left"}`}>
          <h2 className="text-2xl font-bold text-white">{t.aiStudio}</h2>
          <p className="text-gray-300">{t.describe}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description Input */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
            <div className="space-y-4">
              <label
                className={`block text-white font-medium ${isRTL ? "text-right" : "text-left"}`}
              >
                {t.describe}
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={t.placeholder}
                className={`w-full h-32 bg-white/5 border border-white/20 rounded-lg p-4 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 resize-none ${isRTL ? "text-right" : "text-left"}`}
                dir={isRTL ? "rtl" : "ltr"}
              />

              {/* Design Type Selection */}
              <div className="space-y-3">
                <label
                  className={`block text-white font-medium ${isRTL ? "text-right" : "text-left"}`}
                >
                  {t.designType}
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {designTypes.map((type) => (
                    <button
                      key={type.key}
                      onClick={() => setSelectedType(type.key)}
                      className={`p-3 rounded-lg border transition-all ${
                        selectedType === type.key
                          ? "border-purple-400 bg-purple-400/20"
                          : "border-white/20 bg-white/5 hover:border-white/30"
                      }`}
                    >
                      <div className="text-2xl mb-1">{type.icon}</div>
                      <div className="text-white text-sm font-medium">
                        {t[type.key as keyof typeof t]}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Generate Button */}
              <button
                onClick={handleGenerate}
                disabled={!description.trim() || isGenerating}
                className={`w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-3 px-6 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed ${!isGenerating ? "hover:scale-105" : ""}`}
              >
                <div
                  className={`flex items-center justify-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      <span>{t.generating}</span>
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-5 h-5" />
                      <span>{t.generate}</span>
                    </>
                  )}
                </div>
              </button>
            </div>
          </div>

          {/* Generated Design Display */}
          {(isGenerating || generatedDesign) && (
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
              {isGenerating ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-white font-medium mb-2">
                    {t.processing}
                  </div>
                  <div className="text-gray-300 text-sm">{t.generating}</div>
                </div>
              ) : (
                <div>
                  <div
                    className={`flex items-center justify-between mb-4 ${isRTL ? "flex-row-reverse" : ""}`}
                  >
                    <h3 className="text-white font-semibold">
                      {t.designReady}
                    </h3>
                    <div
                      className={`flex gap-2 ${isRTL ? "flex-row-reverse" : ""}`}
                    >
                      <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                        <Download className="w-4 h-4 text-white" />
                      </button>
                      <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                        <RefreshCw className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  </div>

                  {/* Design Preview */}
                  <div className="aspect-video bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-lg border border-white/20 flex items-center justify-center">
                    <div className="text-center">
                      <Image className="w-16 h-16 text-white/60 mx-auto mb-4" />
                      <div className="text-white/80">
                        {language === "ar"
                          ? "معاينة التصميم المُولد"
                          : "Generated Design Preview"}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recent Designs */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
            <h3
              className={`text-white font-semibold mb-4 ${isRTL ? "text-right" : "text-left"}`}
            >
              {t.recentDesigns}
            </h3>
            <div className="space-y-3">
              {recentDesigns.map((design) => (
                <div
                  key={design.id}
                  className="flex items-center gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <div className="text-2xl">{design.image}</div>
                  <div
                    className={`flex-1 ${isRTL ? "text-right" : "text-left"}`}
                  >
                    <div className="text-white text-sm font-medium">
                      {language === "ar" ? design.nameAr : design.name}
                    </div>
                    <div className="text-gray-400 text-xs">
                      {t[design.type as keyof typeof t]}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pro Tips */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
            <h3
              className={`text-white font-semibold mb-4 ${isRTL ? "text-right" : "text-left"}`}
            >
              {t.tips}
            </h3>
            <div className="space-y-3">
              <div
                className={`text-sm text-gray-300 ${isRTL ? "text-right" : "text-left"}`}
              >
                💡 {t.tip1}
              </div>
              <div
                className={`text-sm text-gray-300 ${isRTL ? "text-right" : "text-left"}`}
              >
                📏 {t.tip2}
              </div>
              <div
                className={`text-sm text-gray-300 ${isRTL ? "text-right" : "text-left"}`}
              >
                🏗️ {t.tip3}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
