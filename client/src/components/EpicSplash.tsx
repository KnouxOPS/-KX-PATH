import { useState, useEffect } from "react";
import {
  Sparkles,
  MapPin,
  Users,
  TrendingUp,
  Zap,
  Crown,
  Globe,
  Building,
  Leaf,
} from "lucide-react";

interface EpicSplashProps {
  onComplete: () => void;
}

export default function EpicSplash({ onComplete }: EpicSplashProps) {
  const [stage, setStage] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showLogo3D, setShowLogo3D] = useState(false);
  const [showUAEFlag, setShowUAEFlag] = useState(false);

  const stages = [
    "🌱 تحضير نظام KX PATH للسوق الإماراتي...",
    "🤖 تفعيل محركات الذكاء الاصطناعي المتقدمة...",
    "📡 الاتصال بقواعد البيانات الإماراتية المحلية...",
    "🗺️ تحديث خرائط المشاريع والمناطق الإماراتية...",
    "📊 تحليل السوق العقاري والمناظر الطبيعية...",
    "🛰️ تفعيل الرادار الذكي لرصد الفرص...",
    "🇦🇪 تخصيص النظام للسوق الإماراتي 100%...",
    "✅ KX PATH جاهز. أهلاً بك في مستقبل المناظر الطبيعية الذكية",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          if (stage < stages.length - 1) {
            setStage((s) => s + 1);
            if (stage === 2) setShowLogo3D(true);
            if (stage === 5) setShowUAEFlag(true);
            return 0;
          } else {
            clearInterval(timer);
            setTimeout(onComplete, 2000);
            return 100;
          }
        }
        return prev + 1.5;
      });
    }, 40);

    return () => clearInterval(timer);
  }, [stage, onComplete]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-emerald-900 via-teal-900 to-green-900 flex items-center justify-center overflow-hidden">
      {/* Advanced Background Effects */}
      <div className="absolute inset-0">
        {/* Main Gradient Orbs */}
        <div className="absolute left-[200px] top-[-128px] w-[400px] h-[500px] rounded-full bg-gradient-to-b from-emerald-400/30 to-teal-400/20 blur-[200px] animate-pulse" />
        <div
          className="absolute right-[100px] top-[-100px] w-[300px] h-[400px] rounded-full bg-gradient-to-b from-green-400/20 to-emerald-400/10 blur-[100px] animate-pulse"
          style={{ animationDelay: "2s" }}
        />

        {/* UAE Coastline Animation */}
        <svg
          className="absolute inset-0 w-full h-full opacity-20"
          viewBox="0 0 800 600"
        >
          <defs>
            <linearGradient
              id="uaeGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="50%" stopColor="#0D9488" />
              <stop offset="100%" stopColor="#047857" />
            </linearGradient>
          </defs>

          <path
            d="M100,200 Q200,180 300,190 Q400,200 500,180 Q600,170 700,185 L720,220 Q600,240 500,250 Q400,260 300,250 Q200,240 100,250 Z"
            fill="url(#uaeGradient)"
            opacity="0.3"
            className="animate-pulse"
          />

          {/* UAE Emirates */}
          <circle
            cx="450"
            cy="320"
            r="8"
            fill="#10B981"
            opacity="0.6"
            className="animate-ping"
          />
          <circle
            cx="480"
            cy="340"
            r="6"
            fill="#10B981"
            opacity="0.6"
            className="animate-ping"
            style={{ animationDelay: "1s" }}
          />
          <circle
            cx="420"
            cy="300"
            r="5"
            fill="#10B981"
            opacity="0.6"
            className="animate-ping"
            style={{ animationDelay: "2s" }}
          />
        </svg>

        {/* Smart Particles representing projects */}
        {Array.from({ length: 25 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-emerald-400/40 rounded-full animate-float particle"
            style={{
              left: `${10 + i * 3.5}%`,
              top: `${5 + i * 3.8}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${2 + Math.random() * 4}s`,
            }}
          />
        ))}

        {/* Floating UAE Elements */}
        <div className="absolute top-20 left-1/4 w-8 h-8 text-emerald-400/30 animate-leaf-sway text-4xl">
          🌿
        </div>
        <div
          className="absolute top-40 right-1/3 w-6 h-6 text-green-400/20 animate-water-wave text-3xl"
          style={{ animationDelay: "2s" }}
        >
          🏗️
        </div>
        <div
          className="absolute bottom-40 left-1/3 w-10 h-10 text-teal-400/25 animate-light-flicker text-5xl"
          style={{ animationDelay: "4s" }}
        >
          🇦🇪
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-3xl mx-auto px-8">
        {/* Enhanced Logo Animation */}
        <div className="mb-16">
          <div className="relative">
            {/* 3D Logo Container */}
            <div className="w-40 h-40 mx-auto mb-8 relative">
              {/* Background Glow - Enhanced */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/50 via-teal-400/50 to-green-400/50 rounded-3xl blur-2xl animate-pulse"></div>

              {/* Secondary Glow Ring */}
              <div
                className="absolute inset-2 bg-gradient-to-br from-yellow-400/30 to-orange-400/30 rounded-3xl blur-xl animate-pulse"
                style={{ animationDelay: "1s" }}
              ></div>

              {/* Logo Background - Enhanced */}
              <div
                className={`relative w-full h-full bg-gradient-to-br from-emerald-500 via-teal-600 to-green-600 rounded-3xl flex items-center justify-center border-4 border-emerald-400/30 backdrop-blur-lg transition-all duration-1000 ${
                  showLogo3D ? "transform rotate-y-12 scale-110" : ""
                }`}
              >
                {/* KX PATH Logo */}
                <div className="text-center">
                  <div className="text-5xl font-bold text-white mb-2 filter drop-shadow-lg">
                    KX
                  </div>
                  <div className="text-lg text-emerald-200 font-medium">
                    PATH
                  </div>
                  <div className="text-xs text-emerald-300 mt-1">UAE 🇦🇪</div>
                </div>
              </div>

              {/* Enhanced Orbiting Elements */}
              <div
                className="absolute inset-0 animate-spin"
                style={{ animationDuration: "8s" }}
              >
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
              <div
                className="absolute inset-0 animate-spin"
                style={{
                  animationDuration: "12s",
                  animationDirection: "reverse",
                }}
              >
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
              <div
                className="absolute inset-0 animate-spin"
                style={{ animationDuration: "15s" }}
              >
                <div className="absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                    <Building className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
              <div
                className="absolute inset-0 animate-spin"
                style={{
                  animationDuration: "10s",
                  animationDirection: "reverse",
                }}
              >
                <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center">
                    <Leaf className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Animated Title */}
            <div className="space-y-6">
              <h1 className="text-6xl font-bold bg-gradient-to-r from-emerald-300 via-teal-300 to-green-300 bg-clip-text text-transparent animate-pulse">
                KX PATH
              </h1>
              <h2 className="text-3xl text-emerald-200 font-light">
                طريق الخبرة | Smart Landscape AI-OS
              </h2>
              <div
                className={`transition-all duration-1000 ${showUAEFlag ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
              >
                <div className="inline-flex items-center gap-3 bg-gradient-to-r from-red-500/20 via-white/10 to-green-500/20 backdrop-blur-lg rounded-2xl border border-emerald-400/30 px-6 py-3">
                  <span className="text-2xl">🇦🇪</span>
                  <span className="text-emerald-300 font-semibold">
                    مخصص 100% للسوق الإماراتي
                  </span>
                  <span className="text-2xl">🇦🇪</span>
                </div>
              </div>
              <p className="text-emerald-400 max-w-2xl mx-auto text-lg leading-relaxed">
                أول نظام تشغيل ذكي متكامل للمناظر الطبيعية في دولة الإمارات
                العربية المتحدة
                <br />
                مدعوم بالذكاء الاصطناعي والرادار الذكي لرصد الفرص العقارية
              </p>
            </div>
          </div>
        </div>

        {/* Enhanced Loading Section */}
        <div className="space-y-8">
          {/* Current Stage with UAE Theme */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-emerald-400/30 p-8">
            <div className="text-emerald-300 text-xl font-medium mb-6 min-h-[2rem]">
              {stages[stage]}
            </div>

            {/* Enhanced Progress Bar */}
            <div className="w-full bg-slate-800/50 rounded-full h-4 mb-6 overflow-hidden">
              <div
                className="bg-gradient-to-r from-emerald-500 via-teal-400 to-green-500 h-full rounded-full transition-all duration-500 ease-out relative"
                style={{ width: `${progress}%` }}
              >
                <div className="w-full h-full bg-white/20 rounded-full animate-pulse"></div>
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-slide"></div>
              </div>
            </div>

            {/* Enhanced Stage Indicators */}
            <div className="flex justify-center space-x-3">
              {stages.map((_, index) => (
                <div
                  key={index}
                  className={`w-4 h-4 rounded-full transition-all duration-500 ${
                    index < stage
                      ? "bg-gradient-to-r from-emerald-400 to-teal-400 scale-110"
                      : index === stage
                        ? "bg-gradient-to-r from-emerald-500 to-teal-500 animate-pulse scale-125"
                        : "bg-slate-600 scale-90"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Enhanced System Stats Preview */}
          {stage >= 3 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in">
              <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-emerald-400/20 p-4 text-center hover:scale-105 transition-transform">
                <MapPin className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
                <div className="text-3xl font-bold text-emerald-300">143</div>
                <div className="text-sm text-emerald-400">مشروع نشط</div>
              </div>

              <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-blue-400/20 p-4 text-center hover:scale-105 transition-transform">
                <Users className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                <div className="text-3xl font-bold text-blue-300">89</div>
                <div className="text-sm text-emerald-400">عضو فريق</div>
              </div>

              <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-green-400/20 p-4 text-center hover:scale-105 transition-transform">
                <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-3" />
                <div className="text-3xl font-bold text-green-300">2.4M</div>
                <div className="text-sm text-emerald-400">درهم شهرياً</div>
              </div>

              <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-yellow-400/20 p-4 text-center hover:scale-105 transition-transform">
                <Globe className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
                <div className="text-3xl font-bold text-yellow-300">7</div>
                <div className="text-sm text-emerald-400">إمارات</div>
              </div>
            </div>
          )}

          {/* UAE Smart Features Preview */}
          {stage >= 5 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in">
              <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 backdrop-blur-lg rounded-xl border border-purple-400/30 p-4 text-center">
                <div className="text-2xl mb-2">🛰️</div>
                <div className="text-purple-300 font-semibold">رادار ذكي</div>
                <div className="text-xs text-purple-400">
                  رصد الفرص العقارية
                </div>
              </div>

              <div className="bg-gradient-to-br from-orange-900/30 to-red-900/30 backdrop-blur-lg rounded-xl border border-orange-400/30 p-4 text-center">
                <div className="text-2xl mb-2">🗺️</div>
                <div className="text-orange-300 font-semibold">
                  خرائط تفاعلية
                </div>
                <div className="text-xs text-orange-400">
                  جميع الإمارات السبع
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 backdrop-blur-lg rounded-xl border border-green-400/30 p-4 text-center">
                <div className="text-2xl mb-2">🤖</div>
                <div className="text-green-300 font-semibold">ذكاء اصطناعي</div>
                <div className="text-xs text-green-400">محرك KnoxAI</div>
              </div>
            </div>
          )}
        </div>

        {/* Enhanced Final Stage Message */}
        {stage === stages.length - 1 && (
          <div className="mt-12 animate-fade-in">
            <div className="bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-green-500/20 backdrop-blur-lg rounded-3xl border border-emerald-400/50 p-8">
              <div className="flex items-center justify-center gap-4 text-emerald-300 mb-4">
                <Zap className="w-8 h-8 animate-pulse" />
                <span className="text-2xl font-bold">
                  مرحباً بك في مستقبل المناظر الطبيعية الذكية
                </span>
                <Zap className="w-8 h-8 animate-pulse" />
              </div>
              <div className="text-emerald-400 text-lg">
                "في KX PATH، نحن لا ننفّذ فقط... نحن نصنع تجربة تستحق الذكرى."
              </div>
              <div className="mt-4 text-emerald-500 text-sm">
                🇦🇪 صُنع بفخر في دولة الإمارات العربية المتحدة 🇦🇪
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Loading Dots Animation */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <div className="flex space-x-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="w-3 h-3 bg-emerald-400 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
