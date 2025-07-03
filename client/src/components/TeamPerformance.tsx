import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  projects: number;
  avatar: string;
}

export default function TeamPerformance() {
  // Mock team data - in a real app, this would come from an API
  const teamMembers: TeamMember[] = [
    {
      id: '1',
      name: 'أحمد الكعبي',
      role: 'مهندس المناظر الطبيعية',
      projects: 12,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100'
    },
    {
      id: '2',
      name: 'سارة المنصوري',
      role: 'مختصة الأنظمة الذكية',
      projects: 8,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332c55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100'
    },
    {
      id: '3',
      name: 'محمد الشامسي',
      role: 'مدير المشاريع الميدانية',
      projects: 15,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100'
    }
  ];

  const getProjectColor = (projects: number) => {
    if (projects >= 15) return 'text-accent-custom';
    if (projects >= 10) return 'text-primary-custom';
    return 'text-secondary-custom';
  };

  return (
    <Card className="glass-card">
      <CardContent className="p-8">
        <h3 className="text-2xl font-bold mb-6 text-gray-800 font-arabic">أداء الفريق</h3>
        <div className="space-y-4">
          {teamMembers.map((member) => (
            <div key={member.id} className="flex items-center justify-between p-4 bg-white/30 rounded-xl">
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback>{member.name.split(' ')[0][0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold font-arabic">{member.name}</p>
                  <p className="text-sm text-gray-600 font-arabic">{member.role}</p>
                </div>
              </div>
              <span className={`text-lg font-bold ${getProjectColor(member.projects)}`}>
                {member.projects} مشروع
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
