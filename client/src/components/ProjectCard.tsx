import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Eye, Camera, Compass } from "lucide-react";

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

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const formatValue = (value: string) => {
    const numValue = parseFloat(value);
    return `${numValue.toLocaleString()} درهم`;
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      'planning': { label: 'Planning', variant: 'secondary' as const },
      'in_progress': { label: 'In Progress', variant: 'default' as const },
      'completed': { label: 'Completed', variant: 'outline' as const },
      'cancelled': { label: 'Cancelled', variant: 'destructive' as const },
    };
    return badges[status as keyof typeof badges] || badges.planning;
  };

  const getProjectImage = (status: string) => {
    const images = {
      'planning': 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300',
      'in_progress': 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300',
      'completed': 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300',
      'cancelled': 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300',
    };
    return images[status as keyof typeof images] || images.planning;
  };

  const badge = getStatusBadge(project.status);

  return (
    <Card className="glass-card rounded-2xl hover:shadow-xl transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold font-arabic">{project.nameAr}</h3>
          <Badge variant={badge.variant} className="text-sm font-medium">
            {badge.label}
          </Badge>
        </div>
        
        <img 
          src={project.imageUrl || getProjectImage(project.status)} 
          alt={project.nameEn} 
          className="w-full h-32 object-cover rounded-lg mb-4"
        />
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">القيمة:</span>
            <span className="font-bold text-primary-custom">{formatValue(project.value)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">التقدم:</span>
            <span className="font-medium">{project.progress}%</span>
          </div>
          <Progress value={project.progress} className="w-full h-2" />
        </div>
        
        <div className="flex space-x-2 mt-4">
          <Button className="flex-1 btn-primary text-sm">
            <Eye className="mr-1 h-3 w-3" />
            View Details
          </Button>
          {project.status === 'in_progress' && (
            <Button className="flex-1 btn-accent text-sm">
              <Camera className="mr-1 h-3 w-3" />
              Live Feed
            </Button>
          )}
          {project.status === 'planning' && (
            <Button className="flex-1 btn-secondary text-sm">
              <Compass className="mr-1 h-3 w-3" />
              AI Design
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
