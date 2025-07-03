import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import NavigationHeader from "@/components/NavigationHeader";
import QuickActions from "@/components/QuickActions";
import ServiceCard from "@/components/ServiceCard";
import ProjectCard from "@/components/ProjectCard";
import FinancialOverview from "@/components/FinancialOverview";
import TeamPerformance from "@/components/TeamPerformance";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Filter } from "lucide-react";

interface DashboardStats {
  activeProjects: number;
  completedProjects: number;
  totalRevenue: number;
  monthlyRevenue: number;
  netProfit: number;
  pendingPayments: number;
}

interface Service {
  id: number;
  nameEn: string;
  nameAr: string;
  descriptionEn: string;
  descriptionAr: string;
  startingPrice: string;
  category: string;
  imageUrl?: string;
}

interface Project {
  id: string;
  nameEn: string;
  nameAr: string;
  status: string;
  value: string;
  progress: number;
  clientId: string;
  imageUrl?: string;
}

export default function Dashboard() {
  const { user } = useAuth();
  
  const { data: stats, isLoading: statsLoading } = useQuery<DashboardStats>({
    queryKey: ['/api/dashboard/stats'],
  });

  const { data: services = [], isLoading: servicesLoading } = useQuery<Service[]>({
    queryKey: ['/api/services'],
  });

  const { data: projects = [], isLoading: projectsLoading } = useQuery<Project[]>({
    queryKey: ['/api/projects'],
  });

  if (statsLoading || servicesLoading || projectsLoading) {
    return (
      <div className="min-h-screen gradient-bg-hero">
        <NavigationHeader />
        <div className="pt-24 pb-12">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-gray-600">Loading your dashboard...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-bg-hero">
      <NavigationHeader />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-6">
          
          {/* Hero Section with Live Stats */}
          <section className="mb-12">
            <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&h=800" 
                alt="Dubai Luxury Landscape" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary-900/70 to-accent-custom/70"></div>
              
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <h2 className="text-5xl font-bold mb-4 floating-element font-arabic">
                    مرحباً بك في عالم الخبرة
                  </h2>
                  <p className="text-xl mb-8 opacity-90">
                    نظام تشغيل اللاندسكيب بالذكاء الاصطناعي
                  </p>
                  <div className="flex justify-center space-x-6">
                    <Card className="glass-card">
                      <CardContent className="px-6 py-4">
                        <p className="text-2xl font-bold">{stats?.activeProjects || 0}</p>
                        <p className="text-sm opacity-75">Active Projects</p>
                      </CardContent>
                    </Card>
                    <Card className="glass-card">
                      <CardContent className="px-6 py-4">
                        <p className="text-2xl font-bold">{stats?.completedProjects || 0}</p>
                        <p className="text-sm opacity-75">Completed</p>
                      </CardContent>
                    </Card>
                    <Card className="glass-card">
                      <CardContent className="px-6 py-4">
                        <p className="text-2xl font-bold">{((stats?.totalRevenue || 0) / 1000000).toFixed(1)}M</p>
                        <p className="text-sm opacity-75">AED Revenue</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Quick Actions Dashboard */}
          <QuickActions />

          {/* Services Showcase */}
          <section className="mb-12" id="services">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-800 font-arabic">خدماتنا المتميزة</h2>
              {user?.role === 'manager' && (
                <Button className="btn-primary">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Service
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </section>

          {/* Live Projects Feed */}
          <section className="mb-12" id="projects">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-800 font-arabic">المشاريع الحية</h2>
              <div className="flex space-x-4">
                <Button variant="outline" className="text-gray-700">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
                {user?.role === 'manager' && (
                  <Button className="btn-primary">
                    <Plus className="mr-2 h-4 w-4" />
                    New Project
                  </Button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </section>

          {/* Financial Overview */}
          {user?.role === 'manager' && (
            <section className="mb-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <FinancialOverview stats={stats} />
                <TeamPerformance />
              </div>
            </section>
          )}

        </div>
      </main>
    </div>
  );
}
