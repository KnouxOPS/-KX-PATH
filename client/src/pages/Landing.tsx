import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Palmtree, Droplets, Lightbulb, Wrench } from "lucide-react";

export default function Landing() {
  const handleLogin = () => {
    window.location.href = "/api/login";
  };

  return (
    <div className="min-h-screen gradient-bg-hero">
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
                About
              </Button>
              <Button variant="ghost" className="text-gray-700 hover:text-primary">
                Services
              </Button>
              <Button onClick={handleLogin} className="btn-primary">
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-6">
          <section className="text-center py-20">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-6xl font-bold mb-6 text-gray-800 floating-element">
                <span className="font-arabic">مرحباً بك في عالم الخبرة</span>
              </h1>
              <p className="text-2xl mb-8 text-gray-600">
                نظام تشغيل اللاندسكيب بالذكاء الاصطناعي
              </p>
              <p className="text-xl mb-12 text-gray-600 max-w-2xl mx-auto">
                Transform your luxury landscaping business with our AI-powered management platform designed specifically for the UAE market.
              </p>
              <div className="flex justify-center space-x-4">
                <Button onClick={handleLogin} size="lg" className="btn-primary text-lg px-8 py-4">
                  Get Started
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                  Learn More
                </Button>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-20">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6 text-gray-800">
                خدماتنا المتميزة
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Comprehensive landscape management solutions powered by artificial intelligence
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="glass-card service-card">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mx-auto mb-6">
                    <Palmtree className="text-white text-2xl" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">AI Garden Design</h3>
                  <p className="text-gray-600">
                    Create stunning 3D landscape designs with our AI-powered design studio
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-card service-card">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-secondary rounded-xl flex items-center justify-center mx-auto mb-6">
                    <Droplets className="text-white text-2xl" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">Smart Irrigation</h3>
                  <p className="text-gray-600">
                    Intelligent watering systems adapted for UAE's desert climate
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-card service-card">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-accent rounded-xl flex items-center justify-center mx-auto mb-6">
                    <Lightbulb className="text-white text-2xl" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">Smart Lighting</h3>
                  <p className="text-gray-600">
                    Automated outdoor lighting systems with energy optimization
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-card service-card">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center mx-auto mb-6">
                    <Wrench className="text-white text-2xl" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">Smart Maintenance</h3>
                  <p className="text-gray-600">
                    Predictive maintenance with intelligent alerts and scheduling
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-4xl font-bold mb-6 text-gray-800">
                Ready to Transform Your Business?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Join the future of luxury landscaping with KX PATH's AI-powered platform
              </p>
              <Button onClick={handleLogin} size="lg" className="btn-primary text-lg px-12 py-4">
                Start Your Journey
              </Button>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="glass-dark text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">KX PATH</h3>
              <p className="text-gray-300 mb-4 font-arabic">نظام تشغيل اللاندسكيب بالذكاء الاصطناعي</p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-300">
                <li>Garden Design</li>
                <li>Pool Design</li>
                <li>Smart Systems</li>
                <li>Maintenance</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-300">
                <li>About</li>
                <li>Team</li>
                <li>Projects</li>
                <li>Contact</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <div className="space-y-3 text-gray-300">
                <p>Dubai, UAE</p>
                <p>+971 50 123 4567</p>
                <p>info@kxpath.ae</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2024 KX PATH - طريق الخبرة. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
