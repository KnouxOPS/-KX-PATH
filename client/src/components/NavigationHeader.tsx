import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Palmtree, Globe, LogOut } from "lucide-react";

export default function NavigationHeader() {
  const { user } = useAuth();

  const handleLogout = () => {
    window.location.href = "/api/logout";
  };

  return (
    <header className="glass-card fixed w-full top-0 z-50 shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                <Palmtree className="text-white text-xl" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">KX PATH</h1>
                <p className="text-sm text-gray-600 font-arabic">طريق الخبرة</p>
              </div>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#dashboard" className="text-gray-700 hover:text-primary-custom font-medium transition-colors">
              Dashboard
            </a>
            <a href="#services" className="text-gray-700 hover:text-primary-custom font-medium transition-colors">
              Services
            </a>
            <a href="#projects" className="text-gray-700 hover:text-primary-custom font-medium transition-colors">
              Projects
            </a>
            <a href="#ai-hub" className="text-gray-700 hover:text-primary-custom font-medium transition-colors">
              AI Hub
            </a>
          </nav>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-gray-700 hover:text-primary-custom">
              <Globe className="mr-1 h-4 w-4" />
              EN | AR
            </Button>
            
            <div className="flex items-center space-x-2">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user?.profileImageUrl || ""} alt={user?.firstName || ""} />
                <AvatarFallback>
                  {user?.firstName?.[0]}{user?.lastName?.[0]}
                </AvatarFallback>
              </Avatar>
              <div className="text-sm">
                <p className="font-medium text-gray-800">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-gray-600 capitalize">{user?.role}</p>
              </div>
            </div>
            
            <Button variant="ghost" size="sm" onClick={handleLogout} className="text-gray-700 hover:text-red-600">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
