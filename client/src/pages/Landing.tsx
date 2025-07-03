import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Palmtree, Droplets, Lightbulb, Wrench, Bot, Calculator, MapPin, Camera,
  Flower2, Waves, TreePine, Sprout, Zap, Mountain, Eye, Truck, Shield,
  BarChart3, Users, Compass, Cpu, ArrowRight, PlayCircle, Star
} from "lucide-react";
import Splash from "./Splash";

export default function Landing() {
  const [showSplash, setShowSplash] = useState(true);

  const handleLogin = () => {
    window.location.href = "/api/login";
  };

  if (showSplash) {
    return <Splash onComplete={() => setShowSplash(false)} />;
  }

  // خدمات شركة طريق الخبرة المتميزة
  const premiumServices = [
    {
      id: 1,
      icon: <Bot className="h-8 w-8" />,
      titleAr: "تصميم الحدائق بالذكاء الاصطناعي",
      titleEn: "AI Garden Design Studio",
      descriptionAr: "تصميمات ثلاثية الأبعاد مذهلة بتقنية KnoxDesign",
      descriptionEn: "Stunning 3D designs with KnoxDesign AI technology",
      category: "AI-Powered",
      gradient: "from-primary to-primary-700"
    },
    {
      id: 2,
      icon: <Waves className="h-8 w-8" />,
      titleAr: "مسابح ذكية فاخرة",
      titleEn: "Smart Luxury Pools",
      descriptionAr: "تصميم وإنشاء مسابح بأنظمة ذكية متطورة",
      descriptionEn: "Design and build pools with advanced smart systems",
      category: "Premium",
      gradient: "from-accent to-accent"
    },
    {
      id: 3,
      icon: <Droplets className="h-8 w-8" />,
      titleAr: "أنظمة الري الذكية",
      titleEn: "Smart Irrigation Systems",
      descriptionAr: "أنظمة ري أوتوماتيكية مدعومة بـ IoT",
      descriptionEn: "Automated irrigation with IoT technology",
      category: "IoT",
      gradient: "from-secondary to-secondary"
    },
    {
      id: 4,
      icon: <Lightbulb className="h-8 w-8" />,
      titleAr: "الإضاءة الليلية الذكية",
      titleEn: "Smart Landscape Lighting",
      descriptionAr: "أنظمة إضاءة موفرة للطاقة ومبرمجة",
      descriptionEn: "Energy-efficient programmable lighting systems",
      category: "Energy Efficient",
      gradient: "from-yellow-500 to-orange-500"
    },
    {
      id: 5,
      icon: <TreePine className="h-8 w-8" />,
      titleAr: "الجدران والسقوف الخضراء",
      titleEn: "Vertical Gardens & Green Roofs",
      descriptionAr: "حلول مستدامة للمساحات العمودية",
      descriptionEn: "Sustainable solutions for vertical spaces",
      category: "Sustainable",
      gradient: "from-green-500 to-emerald-600"
    },
    {
      id: 6,
      icon: <Wrench className="h-8 w-8" />,
      titleAr: "الصيانة الذكية",
      titleEn: "Smart Maintenance",
      descriptionAr: "صيانة تنبؤية بتنبيهات ذكية",
      descriptionEn: "Predictive maintenance with smart alerts",
      category: "24/7",
      gradient: "from-gray-600 to-gray-800"
    },
    {
      id: 7,
      icon: <Mountain className="h-8 w-8" />,
      titleAr: "تنسيق النباتات المناخية",
      titleEn: "Climate-Adapted Plants",
      descriptionAr: "نباتات مختارة خصيصاً لمناخ الإمارات",
      descriptionEn: "Plants specially selected for UAE climate",
      category: "UAE Climate",
      gradient: "from-emerald-600 to-teal-600"
    },
    {
      id: 8,
      icon: <Eye className="h-8 w-8" />,
      titleAr: "الواقع المعزز للتصميم",
      titleEn: "AR Design Preview",
      descriptionAr: "شاهد تصميمك بتقنية الواقع المعزز",
      descriptionEn: "View your design with AR technology",
      category: "AR/VR",
      gradient: "from-purple-600 to-pink-600"
    }
  ];

  const aiFeatures = [
    {
      icon: <Calculator className="h-6 w-6" />,
      title: "KnoxQuote AI",
      description: "تسعير فوري دقيق"
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "KnoxScan",
      description: "تحليل المواقع بالذكاء الاصطناعي"
    },
    {
      icon: <Flower2 className="h-6 w-6" />,
      title: "KnoxPlants Match",
      description: "اختيار النباتات المثالية"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "KnoxCare AI",
      description: "صيانة تنبؤية ذكية"
    }
  ];

  return (
    <div className="min-h-screen gradient-bg-hero overflow-x-hidden">
      {/* Header */}
      <header className="glass-card fixed w-full top-0 z-50 shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                <Palmtree className="text-white text-xl" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">KX PATH</h1>
                <p className="text-sm text-gray-600 font-arabic">طريق الخبرة</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="text-gray-700 hover:text-primary">
                عن الشركة
              </Button>
              <Button variant="ghost" className="text-gray-700 hover:text-primary">
                خدماتنا
              </Button>
              <Button onClick={handleLogin} className="btn-primary">
                <Star className="ml-2 h-4 w-4" />
                دخول النظام
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-6">
          {/* Hero Banner */}
          <section className="relative py-20 mb-16 overflow-hidden">
            <div className="absolute inset-0 rounded-3xl">
              <img 
                src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=800" 
                alt="KX PATH Landscape" 
                className="w-full h-full object-cover rounded-3xl"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 via-primary-700/80 to-accent/80 rounded-3xl"></div>
            </div>
            
            <div className="relative text-center text-white py-16">
              <div className="floating-element mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-secondary to-accent rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <Palmtree className="text-white text-4xl" />
                </div>
              </div>
              
              <h1 className="text-7xl font-bold mb-6 font-arabic floating-element">
                مرحباً بك في عالم الخبرة
              </h1>
              <p className="text-3xl mb-4 opacity-90">
                KX PATH - Landscape AI-OS
              </p>
              <p className="text-xl mb-12 opacity-80 max-w-3xl mx-auto">
                نظام تشغيل رقمي ثوري لقطاع اللاندسكيب الفاخر في دولة الإمارات العربية المتحدة
              </p>
              
              <div className="flex justify-center space-x-6 mb-8">
                <Button onClick={handleLogin} size="lg" className="btn-secondary text-xl px-10 py-4">
                  <PlayCircle className="ml-2 h-6 w-6" />
                  ابدأ رحلتك
                </Button>
                <Button variant="outline" size="lg" className="text-xl px-10 py-4 border-white text-white hover:bg-white hover:text-primary">
                  <Eye className="ml-2 h-6 w-6" />
                  شاهد العرض
                </Button>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                <Card className="glass-card">
                  <CardContent className="p-6 text-center">
                    <p className="text-3xl font-bold text-secondary">20+</p>
                    <p className="text-sm opacity-75">خدمة متخصصة</p>
                  </CardContent>
                </Card>
                <Card className="glass-card">
                  <CardContent className="p-6 text-center">
                    <p className="text-3xl font-bold text-accent">AI</p>
                    <p className="text-sm opacity-75">ذكاء اصطناعي</p>
                  </CardContent>
                </Card>
                <Card className="glass-card">
                  <CardContent className="p-6 text-center">
                    <p className="text-3xl font-bold text-primary">UAE</p>
                    <p className="text-sm opacity-75">مناخ الإمارات</p>
                  </CardContent>
                </Card>
                <Card className="glass-card">
                  <CardContent className="p-6 text-center">
                    <p className="text-3xl font-bold text-secondary">24/7</p>
                    <p className="text-sm opacity-75">دعم مستمر</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Premium Services Section */}
          <section className="py-20">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold mb-6 text-gray-800 font-arabic">
                خدماتنا المتميزة
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                أكثر من 20 خدمة متخصصة في اللاندسكيب الفاخر مدعومة بأحدث تقنيات الذكاء الاصطناعي
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {premiumServices.map((service) => (
                <Card key={service.id} className="glass-card service-card group cursor-pointer">
                  <CardContent className="p-8">
                    <div className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <div className="text-white">
                        {service.icon}
                      </div>
                    </div>
                    
                    <div className="text-center mb-4">
                      <Badge variant="outline" className="mb-3 text-xs">
                        {service.category}
                      </Badge>
                      <h3 className="text-lg font-bold mb-2 font-arabic text-gray-800">
                        {service.titleAr}
                      </h3>
                      <p className="text-sm text-gray-500 mb-3">
                        {service.titleEn}
                      </p>
                    </div>
                    
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {service.descriptionAr}
                    </p>
                    
                    <Button className="w-full mt-4 btn-primary text-sm group-hover:shadow-lg transition-all">
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      اطلب الخدمة
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* AI Features Hub */}
          <section className="py-20">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold mb-6 text-gray-800 font-arabic">
                مركز الذكاء الاصطناعي
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                أدوات متطورة مدعومة بالذكاء الاصطناعي لتحليل وتصميم وإدارة مشاريع اللاندسكيب
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {aiFeatures.map((feature, index) => (
                <Card key={index} className="glass-card hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center mx-auto mb-4">
                      <div className="text-white">
                        {feature.icon}
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm font-arabic">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Premium Showcase */}
          <section className="py-20">
            <div className="relative rounded-3xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=600" 
                alt="Premium Landscaping" 
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary-900/95 to-accent/90"></div>
              
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white max-w-4xl px-8">
                  <h2 className="text-5xl font-bold mb-6 font-arabic">
                    لماذا تختار طريق الخبرة؟
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Cpu className="text-white h-8 w-8" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">تقنية متقدمة</h3>
                      <p className="opacity-90">أول نظام تشغيل للاندسكيب بالذكاء الاصطناعي</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Users className="text-white h-8 w-8" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">خبرة محلية</h3>
                      <p className="opacity-90">متخصصون في مناخ وظروف الإمارات</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <BarChart3 className="text-white h-8 w-8" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">إدارة شاملة</h3>
                      <p className="opacity-90">من التصميم إلى التنفيذ والصيانة</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-6xl font-bold mb-6 text-gray-800 font-arabic">
                ابدأ رحلتك مع المستقبل
              </h2>
              <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
                انضم إلى ثورة اللاندسكيب الرقمي واكتشف كيف يمكن للذكاء الاصطناعي أن يحول مشاريعك إلى تحف فنية
              </p>
              
              <div className="flex justify-center space-x-6">
                <Button onClick={handleLogin} size="lg" className="btn-primary text-xl px-12 py-4">
                  <Star className="ml-2 h-6 w-6" />
                  ابدأ مشروعك
                </Button>
                <Button variant="outline" size="lg" className="text-xl px-12 py-4">
                  <Camera className="ml-2 h-6 w-6" />
                  جولة افتراضية
                </Button>
              </div>

              {/* Premium Benefits */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                <Card className="glass-card">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <Compass className="text-white h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-bold mb-4">استشارة مجانية</h3>
                    <p className="text-gray-600">تحليل موقعك وتقديم اقتراحات أولية بدون مقابل</p>
                  </CardContent>
                </Card>

                <Card className="glass-card">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-secondary to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <Eye className="text-white h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-bold mb-4">متابعة مباشرة</h3>
                    <p className="text-gray-600">راقب تقدم مشروعك لحظة بلحظة عبر التطبيق</p>
                  </CardContent>
                </Card>

                <Card className="glass-card">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-accent to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <Shield className="text-white h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-bold mb-4">ضمان الجودة</h3>
                    <p className="text-gray-600">ضمان شامل على جميع الأعمال والمواد المستخدمة</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="glass-dark text-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-secondary to-accent rounded-2xl flex items-center justify-center">
                  <Palmtree className="text-white text-2xl" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">KX PATH</h3>
                  <p className="text-gray-300 font-arabic">طريق الخبرة</p>
                </div>
              </div>
              <p className="text-gray-300 mb-6 text-lg leading-relaxed">
                نظام تشغيل رقمي ثوري لقطاع اللاندسكيب الفاخر في دولة الإمارات العربية المتحدة، 
                مدعوم بأحدث تقنيات الذكاء الاصطناعي وصُمم خصيصاً للسوق المحلي.
              </p>
              <div className="flex space-x-4">
                <Button className="btn-secondary">
                  <PlayCircle className="ml-2 h-4 w-4" />
                  شاهد العرض التوضيحي
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                  <Camera className="ml-2 h-4 w-4" />
                  معرض المشاريع
                </Button>
              </div>
            </div>
            
            <div>
              <h4 className="text-xl font-semibold mb-6 font-arabic">خدماتنا</h4>
              <ul className="space-y-3 text-gray-300">
                <li className="hover:text-secondary transition-colors cursor-pointer">تصميم الحدائق بالذكاء الاصطناعي</li>
                <li className="hover:text-secondary transition-colors cursor-pointer">المسابح الذكية الفاخرة</li>
                <li className="hover:text-secondary transition-colors cursor-pointer">أنظمة الري الذكية</li>
                <li className="hover:text-secondary transition-colors cursor-pointer">الإضاءة الليلية</li>
                <li className="hover:text-secondary transition-colors cursor-pointer">الصيانة الذكية</li>
                <li className="hover:text-secondary transition-colors cursor-pointer">الواقع المعزز</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-xl font-semibold mb-6 font-arabic">تواصل معنا</h4>
              <div className="space-y-4 text-gray-300">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-secondary" />
                  <span>دبي، الإمارات العربية المتحدة</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-secondary">📱</span>
                  <span>+971 50 123 4567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-secondary">✉️</span>
                  <span>info@kxpath.ae</span>
                </div>
                
                <div className="pt-4">
                  <p className="text-sm text-gray-400 mb-3">تابعنا على وسائل التواصل</p>
                  <div className="flex space-x-3">
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-secondary transition-colors cursor-pointer">
                      <span className="text-white">📘</span>
                    </div>
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-secondary transition-colors cursor-pointer">
                      <span className="text-white">📷</span>
                    </div>
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-secondary transition-colors cursor-pointer">
                      <span className="text-white">🐦</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/20 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-300 mb-4 md:mb-0">
                &copy; 2024 KX PATH - طريق الخبرة. جميع الحقوق محفوظة.
              </p>
              <div className="flex space-x-6 text-sm text-gray-400">
                <span className="hover:text-secondary cursor-pointer">سياسة الخصوصية</span>
                <span className="hover:text-secondary cursor-pointer">شروط الاستخدام</span>
                <span className="hover:text-secondary cursor-pointer">اتفاقية الخدمة</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
