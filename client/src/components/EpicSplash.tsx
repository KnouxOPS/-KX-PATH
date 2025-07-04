import { useEffect, useState } from "react";
import {
  TreePine,
  Waves,
  Lightbulb,
  Zap,
  Sparkles,
  CheckCircle,
} from "lucide-react";

interface EpicSplashProps {
  onComplete: () => void;
}

export default function EpicSplash({ onComplete }: EpicSplashProps) {
  const [progress, setProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [showLogo, setShowLogo] = useState(false);
  const [showTagline, setShowTagline] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [completedPhases, setCompletedPhases] = useState<number[]>([]);

  const phases = [
    {
      text: "تهيئة نظام اللاندسكيب الذكي",
      textEn: "Initializing Smart Landscape OS",
      duration: 800,
    },
    {
      text: "تحميل ستوديو الذكاء الاصطناعي",
      textEn: "Loading AI Design Studio",
      duration: 1000,
    },
    {
      text: "تفعيل الرادار التسويقي",
      textEn: "Activating Smart Marketing Radar",
      duration: 900,
    },
    {
      text: "ربط أنظمة الري الذكية",
      textEn: "Connecting Smart Irrigation Systems",
      duration: 700,
    },
    {
      text: "تحضير واجهة المستخدم",
      textEn: "Preparing User Interface",
      duration: 600,
    },
    { text: "إطلاق طريق الخبرة", textEn: "Launching KX PATH", duration: 800 },
  ];

  useEffect(() => {
    // Show logo animation
    setTimeout(() => setShowLogo(true), 300);
    setTimeout(() => setShowTagline(true), 800);
    setTimeout(() => setShowProgress(true), 1200);

    // Phase progression
    let currentProgress = 0;
    const totalPhases = phases.length;

    phases.forEach((phase, index) => {
      setTimeout(
        () => {
          setCurrentPhase(index);

          // Simulate phase completion
          setTimeout(() => {
            setCompletedPhases((prev) => [...prev, index]);
            currentProgress = ((index + 1) / totalPhases) * 100;
            setProgress(currentProgress);

            // Complete splash after last phase
            if (index === totalPhases - 1) {
              setTimeout(() => {
                onComplete();
              }, 1000);
            }
          }, phase.duration);
        },
        1500 + index * 1200,
      );
    });
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-emerald-900 via-teal-900 to-green-900 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Floating Particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-emerald-400/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}

        {/* Gradient Orbs */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-emerald-400/20 to-teal-400/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-green-400/15 to-emerald-400/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />

        {/* Dynamic Grid */}
        <div
          className={
            'absolute inset-0 bg-[url(\'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="%23ffffff" stroke-width="0.5" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>\')] opacity-20'
          }
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-2xl mx-auto px-8">
        {/* Logo Animation */}
        <div
          className={`transition-all duration-1000 ${showLogo ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}
        >
          <div className="relative mb-8">
            {/* Logo Icons with Rotation */}
            <div className="flex justify-center items-center gap-4 mb-6">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-green-500 rounded-2xl flex items-center justify-center animate-spin-slow">
                  <TreePine className="w-8 h-8 text-white" />
                </div>
                <div className="absolute inset-0 w-16 h-16 bg-gradient-to-br from-emerald-400 to-green-500 rounded-2xl opacity-30 animate-ping" />
              </div>

              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-xl flex items-center justify-center animate-bounce">
                  <Waves className="w-6 h-6 text-white" />
                </div>
              </div>

              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center animate-pulse">
                  <Lightbulb className="w-7 h-7 text-white" />
                </div>
                <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-300 animate-spin" />
              </div>
            </div>

            {/* Company Name with Glow Effect */}
            <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-emerald-400 via-teal-300 to-green-400 bg-clip-text text-transparent animate-pulse">
              KX PATH
            </h1>
            <div className="text-3xl md:text-4xl font-bold text-white mb-2 opacity-90">
              طريق الخبرة
            </div>
          </div>
        </div>

        {/* Tagline */}
        <div
          className={`transition-all duration-1000 delay-500 ${showTagline ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <p className="text-xl md:text-2xl text-emerald-200 mb-2 font-medium">
            نظام تشغيل اللاندسكيب الذكي
          </p>
          <p className="text-lg md:text-xl text-teal-300 mb-8 opacity-80">
            Smart Landscape Operating System
          </p>

          {/* Feature Highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 text-sm">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
              <div className="text-2xl mb-1">🤖</div>
              <div className="text-white">AI Design</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
              <div className="text-2xl mb-1">📡</div>
              <div className="text-white">Smart Radar</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
              <div className="text-2xl mb-1">🗺️</div>
              <div className="text-white">Live Map</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
              <div className="text-2xl mb-1">💧</div>
              <div className="text-white">IoT Systems</div>
            </div>
          </div>
        </div>

        {/* Progress Section */}
        <div
          className={`transition-all duration-1000 delay-1000 ${showProgress ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {/* Current Phase */}
          <div className="mb-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Zap className="w-5 h-5 text-emerald-400 animate-pulse" />
              <div className="text-white font-medium">
                {phases[currentPhase]?.text}
              </div>
              <div className="text-emerald-300 text-sm opacity-70">
                {phases[currentPhase]?.textEn}
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-emerald-300 mb-2">
              <span>التقدم</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-400 via-teal-400 to-green-400 rounded-full transition-all duration-500 relative overflow-hidden"
                style={{ width: `${progress}%` }}
              >
                {/* Shimmer Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
              </div>
            </div>
          </div>

          {/* Phase List */}
          <div className="space-y-2">
            {phases.map((phase, index) => (
              <div
                key={index}
                className={`flex items-center gap-3 text-sm transition-all duration-300 ${
                  index === currentPhase
                    ? "text-emerald-300 scale-105"
                    : completedPhases.includes(index)
                      ? "text-green-400"
                      : "text-gray-400"
                }`}
              >
                {completedPhases.includes(index) ? (
                  <CheckCircle className="w-4 h-4 text-green-400" />
                ) : index === currentPhase ? (
                  <div className="w-4 h-4 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <div className="w-4 h-4 border-2 border-gray-500 rounded-full" />
                )}
                <span>{phase.text}</span>
              </div>
            ))}
          </div>

          {/* Loading Animation */}
          <div className="mt-8">
            <div className="flex justify-center space-x-2">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-3 h-3 bg-emerald-400 rounded-full animate-bounce"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Corner Branding */}
      <div className="absolute bottom-8 right-8 text-right">
        <div className="text-white/60 text-sm">Powered by</div>
        <div className="text-emerald-400 font-bold">KX PATH Technologies</div>
      </div>
    </div>
  );
}
