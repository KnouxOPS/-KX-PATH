import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, Calculator, MapPin, BarChart3 } from "lucide-react";

export default function QuickActions() {
  return (
    <section className="mb-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="glass-card hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                <Bot className="text-white text-xl" />
              </div>
              <span className="text-sm font-medium text-primary-custom">AI Design</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">KnoxDesign Studio</h3>
            <p className="text-gray-600 text-sm mb-4">Create stunning 3D landscape designs with AI</p>
            <Button className="w-full btn-primary">
              Launch Designer
            </Button>
          </CardContent>
        </Card>

        <Card className="glass-card hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center">
                <Calculator className="text-white text-xl" />
              </div>
              <span className="text-sm font-medium text-secondary-custom">Smart Quote</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">KnoxQuote Engine</h3>
            <p className="text-gray-600 text-sm mb-4">Generate instant project quotes with AI</p>
            <Button className="w-full btn-secondary">
              Create Quote
            </Button>
          </CardContent>
        </Card>

        <Card className="glass-card hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center">
                <MapPin className="text-white text-xl" />
              </div>
              <span className="text-sm font-medium text-accent-custom">Live Projects</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Project Radar</h3>
            <p className="text-gray-600 text-sm mb-4">Monitor all projects in real-time</p>
            <Button className="w-full btn-accent">
              View Map
            </Button>
          </CardContent>
        </Card>

        <Card className="glass-card hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                <BarChart3 className="text-white text-xl" />
              </div>
              <span className="text-sm font-medium text-primary-custom">Analytics</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Business Intelligence</h3>
            <p className="text-gray-600 text-sm mb-4">Advanced market & performance analytics</p>
            <Button className="w-full gradient-bg text-white hover:shadow-lg transition-all">
              View Reports
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
