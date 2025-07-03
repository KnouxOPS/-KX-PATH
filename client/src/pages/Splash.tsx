import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Palmtree, Droplets, Lightbulb, MapPin, Zap } from "lucide-react";

interface SplashProps {
  onComplete: () => void;
}

export default function Splash({ onComplete }: SplashProps) {
  const [progress, setProgress] = useState(0);
  const [currentText, setCurrentText] = useState(0);
  const [golfAnimation, setGolfAnimation] = useState(0);
  const [showImpact, setShowImpact] = useState(false);
  const [showLogo, setShowLogo] = useState(false);

  const loadingTexts = [
    "تجهيز ملعب الجولف الرقمي",
    "تحضير اللاعب الكاريكاتيري", 
    "شحن كرة الذكاء الاصطناعي",
    "تجهيز الضربة المثالية",
    "مرحباً بك في طريق الخبرة"
  ];

  useEffect(() => {
    // Golf animation timeline
    const animationTimeline = [
      { time: 1000, action: () => setGolfAnimation(1) }, // Player winds up
      { time: 2000, action: () => setGolfAnimation(2) }, // Player swings
      { time: 2500, action: () => setGolfAnimation(3) }, // Ball flies
      { time: 3200, action: () => setShowImpact(true) }, // Ball hits screen
      { time: 3400, action: () => setShowLogo(true) }, // Logo appears
    ];

    animationTimeline.forEach(({ time, action }) => {
      setTimeout(action, time);
    });

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => onComplete(), 2000);
          return 100;
        }
        return prev + 1.5;
      });
    }, 60);

    const textInterval = setInterval(() => {
      setCurrentText(prev => (prev + 1) % loadingTexts.length);
    }, 1200);

    return () => {
      clearInterval(interval);
      clearInterval(textInterval);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Golf Course Background */}
      <div className="absolute inset-0">
        {/* Sky gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-400 via-blue-300 to-green-200"></div>
        
        {/* Golf course grass */}
        <div className="absolute bottom-0 w-full h-2/3 bg-gradient-to-t from-green-600 via-green-500 to-green-400"></div>
        
        {/* Golf course path */}
        <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-green-700 to-green-600"></div>
        
        {/* Clouds */}
        <div className="absolute top-10 left-20 w-24 h-12 bg-white/80 rounded-full"></div>
        <div className="absolute top-16 right-32 w-32 h-16 bg-white/70 rounded-full"></div>
        <div className="absolute top-24 left-1/2 w-20 h-10 bg-white/60 rounded-full"></div>
        
        {/* Golf hole flag in distance */}
        <div className="absolute bottom-40 right-32">
          <div className="w-1 h-24 bg-yellow-600"></div>
          <div className="w-8 h-6 bg-red-500 relative -top-6 left-1"></div>
        </div>
        
        {/* Trees */}
        <div className="absolute bottom-32 left-16">
          <div className="w-4 h-12 bg-amber-800"></div>
          <div className="w-16 h-16 bg-green-600 rounded-full relative -top-8 -left-6"></div>
        </div>
        <div className="absolute bottom-36 right-16">
          <div className="w-3 h-10 bg-amber-800"></div>
          <div className="w-12 h-12 bg-green-600 rounded-full relative -top-6 -left-4"></div>
        </div>
      </div>

      {/* Golf Ball with Impact Effect */}
      {golfAnimation >= 3 && (
        <div 
          className={`absolute w-8 h-8 bg-white rounded-full shadow-lg transition-all duration-700 ${
            showImpact ? 'scale-150' : 'scale-100'
          }`}
          style={{
            right: showImpact ? '50%' : '200px',
            top: showImpact ? '40%' : '60%',
            transform: showImpact ? 'translate(50%, -50%)' : 'none'
          }}
        >
          {/* Ball trail effect */}
          <div className="absolute inset-0 bg-white/50 rounded-full animate-ping"></div>
        </div>
      )}

      {/* Impact Explosion Effect */}
      {showImpact && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            {/* Impact rings */}
            <div className="absolute w-32 h-32 border-4 border-yellow-400 rounded-full animate-ping"></div>
            <div className="absolute w-48 h-48 border-2 border-orange-400 rounded-full animate-ping" style={{animationDelay: '0.2s'}}></div>
            <div className="absolute w-64 h-64 border-2 border-red-400 rounded-full animate-ping" style={{animationDelay: '0.4s'}}></div>
            
            {/* Sparks */}
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-bounce"
                style={{
                  left: `${50 + 30 * Math.cos(i * 30 * Math.PI / 180)}%`,
                  top: `${50 + 30 * Math.sin(i * 30 * Math.PI / 180)}%`,
                  animationDelay: `${i * 0.1}s`
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Golf Player Character */}
      <div className="absolute bottom-20 left-1/4">
        <div className={`relative transition-all duration-500 ${
          golfAnimation >= 1 ? 'transform -rotate-12' : ''
        } ${
          golfAnimation >= 2 ? 'rotate-12 scale-110' : ''
        }`}>
          {/* Player Body */}
          <div className="relative">
            {/* Head */}
            <div className="w-12 h-12 bg-amber-300 rounded-full mx-auto mb-2 relative">
              {/* Face */}
              <div className="absolute top-3 left-3 w-1 h-1 bg-black rounded-full"></div>
              <div className="absolute top-3 right-3 w-1 h-1 bg-black rounded-full"></div>
              <div className="absolute top-6 left-1/2 w-2 h-1 bg-pink-400 rounded-full transform -translate-x-1/2"></div>
              {/* Golf cap */}
              <div className="absolute -top-2 w-14 h-6 bg-red-600 rounded-t-full transform -translate-x-1"></div>
            </div>
            
            {/* Body */}
            <div className="w-16 h-20 bg-blue-600 rounded-lg mx-auto mb-2 relative">
              {/* Arms */}
              <div className={`absolute -left-3 top-2 w-6 h-3 bg-amber-300 rounded-full transition-all duration-300 ${
                golfAnimation >= 1 ? 'transform rotate-45' : ''
              }`}></div>
              <div className={`absolute -right-3 top-2 w-6 h-3 bg-amber-300 rounded-full transition-all duration-300 ${
                golfAnimation >= 1 ? 'transform -rotate-45' : ''
              }`}></div>
            </div>
            
            {/* Legs */}
            <div className="flex justify-center space-x-2">
              <div className="w-4 h-12 bg-black rounded-b-lg"></div>
              <div className="w-4 h-12 bg-black rounded-b-lg"></div>
            </div>
            
            {/* Golf Club */}
            <div className={`absolute top-0 right-2 w-1 h-32 bg-gray-800 origin-bottom transition-all duration-500 ${
              golfAnimation >= 1 ? 'transform rotate-45' : ''
            } ${
              golfAnimation >= 2 ? 'rotate-90' : ''
            }`}>
              <div className="absolute bottom-0 w-4 h-2 bg-gray-600 rounded transform -translate-x-1.5"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Logo Reveal */}
      {showLogo && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`transform transition-all duration-1000 ${showLogo ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
            <Card className="glass-card p-16 max-w-2xl text-center shadow-2xl">
              {/* Spectacular Logo */}
              <div className="mb-8 relative">
                <div className="w-32 h-32 bg-gradient-to-br from-secondary via-accent to-primary rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl transform hover:scale-105 transition-transform">
                  <Palmtree className="text-white text-6xl" />
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-secondary/50 via-accent/50 to-primary/50 rounded-3xl blur-xl"></div>
                </div>
                
                {/* Main title with amazing typography */}
                <h1 className="text-7xl font-bold text-white mb-4 tracking-wider">
                  KX PATH
                </h1>
                <div className="relative">
                  <h2 className="text-5xl font-bold font-arabic text-transparent bg-gradient-to-r from-secondary via-accent to-primary bg-clip-text mb-2">
                    طريق الخبرة
                  </h2>
                  {/* Underline effect */}
                  <div className="w-64 h-1 bg-gradient-to-r from-secondary via-accent to-primary mx-auto rounded-full"></div>
                </div>
                <p className="text-xl text-white/80 mt-4 tracking-widest">
                  LANDSCAPE AI-OS
                </p>
              </div>

              {/* Floating particles around logo */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-3 h-3 bg-gradient-to-r from-secondary to-accent rounded-full animate-pulse"
                    style={{
                      left: `${20 + 60 * Math.cos(i * 45 * Math.PI / 180)}%`,
                      top: `${30 + 30 * Math.sin(i * 45 * Math.PI / 180)}%`,
                      animationDelay: `${i * 0.2}s`
                    }}
                  />
                ))}
              </div>

              {/* Success message */}
              <div className="text-center">
                <p className="text-2xl text-white/90 font-arabic mb-4">
                  مرحباً بك في عالم الذكاء الاصطناعي
                </p>
                <p className="text-lg text-white/70">
                  جاهز لتحويل رؤيتك إلى واقع رقمي مذهل
                </p>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* Loading UI - Bottom overlay */}
      {!showLogo && (
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <Card className="glass-card p-8 max-w-lg mx-auto text-center">
            {/* Loading Text */}
            <div className="mb-6">
              <p className="text-white text-xl font-arabic transition-all duration-500">
                {loadingTexts[currentText]}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-white/20 rounded-full h-3 mb-4">
              <div 
                className="bg-gradient-to-r from-secondary to-accent h-3 rounded-full transition-all duration-300 ease-out shadow-lg"
                style={{ width: `${progress}%` }}
              />
            </div>
            
            <p className="text-white/70 text-lg font-bold">{Math.round(progress)}%</p>
          </Card>
        </div>
      )}
    </div>
  );
}