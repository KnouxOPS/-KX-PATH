import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const formatPrice = (price: string) => {
    const numPrice = parseFloat(price);
    return `من ${numPrice.toLocaleString()} درهم`;
  };

  const getServiceImage = (category: string) => {
    const images = {
      'garden': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
      'pool': 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
      'irrigation': 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
      'lighting': 'https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
      'vertical': 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
      'maintenance': 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
    };
    return images[category as keyof typeof images] || images.garden;
  };

  const getCategoryBadge = (category: string) => {
    const badges = {
      'garden': { label: 'AI-Powered', variant: 'default' as const },
      'pool': { label: 'Premium', variant: 'secondary' as const },
      'irrigation': { label: 'IoT', variant: 'outline' as const },
      'lighting': { label: 'Energy Efficient', variant: 'default' as const },
      'vertical': { label: 'Sustainable', variant: 'secondary' as const },
      'maintenance': { label: '24/7', variant: 'outline' as const },
    };
    return badges[category as keyof typeof badges] || badges.garden;
  };

  const badge = getCategoryBadge(service.category);

  return (
    <Card className="glass-card rounded-2xl overflow-hidden hover:shadow-2xl service-card transition-all duration-300">
      <img 
        src={service.imageUrl || getServiceImage(service.category)} 
        alt={service.nameEn} 
        className="w-full h-48 object-cover"
      />
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-semibold font-arabic">{service.nameAr}</h3>
          <Badge variant={badge.variant} className="text-sm font-medium">
            {badge.label}
          </Badge>
        </div>
        <p className="text-gray-600 mb-4">{service.descriptionEn}</p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary-custom">
            {formatPrice(service.startingPrice)}
          </span>
          <Button className="btn-primary">
            طلب الخدمة
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
