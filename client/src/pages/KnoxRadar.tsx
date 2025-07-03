import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Radar, 
  Users, 
  TrendingUp, 
  MapPin, 
  Phone, 
  Mail, 
  DollarSign,
  Target,
  Zap,
  Eye,
  Filter,
  Search,
  Plus,
  BarChart3,
  Trophy,
  Star
} from "lucide-react";

// Mock data - في الواقع سيأتي من API
const mockLeads = [
  {
    id: "1",
    name: "أحمد محمد السويدي",
    email: "ahmed@example.com",
    phone: "+971 50 123 4567",
    location: "دبي - جميرا",
    propertyType: "فيلا فاخرة",
    budget: "500,000 - 750,000 درهم",
    source: "radar",
    status: "new",
    notes: "مهتم بحديقة وحمام سباحة",
    assignedTo: null,
    createdAt: "2024-01-15",
    score: 95
  },
  {
    id: "2", 
    name: "فاطمة علي النعيمي",
    email: "fatima@example.com",
    phone: "+971 56 789 0123",
    location: "أبوظبي - الخالدية",
    propertyType: "قصر",
    budget: "1,000,000+ درهم",
    source: "referral",
    status: "contacted",
    notes: "تريد نظام ري ذكي كامل",
    assignedTo: "مدير المبيعات",
    createdAt: "2024-01-14",
    score: 98
  },
  {
    id: "3",
    name: "سالم حمد المزروعي",
    email: "salem@example.com", 
    phone: "+971 55 456 7890",
    location: "الشارقة - الخان",
    propertyType: "فيلا متوسطة",
    budget: "200,000 - 400,000 درهم",
    source: "website",
    status: "qualified",
    notes: "مشروع إنارة وتنسيق حديقة",
    assignedTo: "مندوب المبيعات",
    createdAt: "2024-01-13",
    score: 85
  }
];

const statusColors = {
  new: "bg-blue-100 text-blue-800",
  contacted: "bg-yellow-100 text-yellow-800", 
  qualified: "bg-green-100 text-green-800",
  proposal: "bg-purple-100 text-purple-800",
  client: "bg-emerald-100 text-emerald-800",
  closed: "bg-gray-100 text-gray-800"
};

const sourceIcons = {
  radar: <Radar className="h-4 w-4" />,
  referral: <Users className="h-4 w-4" />,
  website: <Eye className="h-4 w-4" />,
  social: <Star className="h-4 w-4" />,
  other: <Target className="h-4 w-4" />
};

export default function KnoxRadar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");
  
  const filteredLeads = mockLeads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || lead.status === statusFilter;
    const matchesSource = sourceFilter === "all" || lead.source === sourceFilter;
    
    return matchesSearch && matchesStatus && matchesSource;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 p-6">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2 font-arabic">
                🛰️ KnoxRadar - رادار الفرص الذكي
              </h1>
              <p className="text-lg text-gray-600">
                اكتشف العملاء المحتملين وحوّل الفرص إلى مشاريع بالذكاء الاصطناعي
              </p>
            </div>
            <Button className="btn-primary">
              <Plus className="ml-2 h-5 w-5" />
              إضافة عميل محتمل
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">عملاء محتملين جدد</p>
                  <p className="text-3xl font-bold text-blue-600">24</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Users className="text-blue-600 h-6 w-6" />
                </div>
              </div>
              <div className="flex items-center mt-4 text-sm">
                <TrendingUp className="h-4 w-4 text-green-500 ml-1" />
                <span className="text-green-500">+15%</span>
                <span className="text-gray-500 mr-2">هذا الأسبوع</span>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">معدل التحويل</p>
                  <p className="text-3xl font-bold text-green-600">68%</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <Target className="text-green-600 h-6 w-6" />
                </div>
              </div>
              <div className="flex items-center mt-4 text-sm">
                <TrendingUp className="h-4 w-4 text-green-500 ml-1" />
                <span className="text-green-500">+8%</span>
                <span className="text-gray-500 mr-2">الشهر الماضي</span>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">قيمة الفرص</p>
                  <p className="text-3xl font-bold text-purple-600">2.4M</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <DollarSign className="text-purple-600 h-6 w-6" />
                </div>
              </div>
              <div className="flex items-center mt-4 text-sm">
                <span className="text-gray-500">درهم إماراتي</span>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">مسح الرادار</p>
                  <p className="text-3xl font-bold text-orange-600">Live</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Radar className="text-orange-600 h-6 w-6 animate-spin" />
                </div>
              </div>
              <div className="flex items-center mt-4 text-sm">
                <Zap className="h-4 w-4 text-orange-500 ml-1" />
                <span className="text-orange-500">نشط</span>
                <span className="text-gray-500 mr-2">24/7</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="glass-card mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="البحث بالاسم أو الموقع..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="الحالة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الحالات</SelectItem>
                  <SelectItem value="new">جديد</SelectItem>
                  <SelectItem value="contacted">تم التواصل</SelectItem>
                  <SelectItem value="qualified">مؤهل</SelectItem>
                  <SelectItem value="proposal">عرض سعر</SelectItem>
                  <SelectItem value="client">عميل</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sourceFilter} onValueChange={setSourceFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="المصدر" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع المصادر</SelectItem>
                  <SelectItem value="radar">رادار ذكي</SelectItem>
                  <SelectItem value="referral">إحالة</SelectItem>
                  <SelectItem value="website">موقع إلكتروني</SelectItem>
                  <SelectItem value="social">وسائل التواصل</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Leads List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredLeads.map((lead) => (
            <Card key={lead.id} className="glass-card hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl font-bold text-gray-800 mb-2">
                      {lead.name}
                    </CardTitle>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={statusColors[lead.status as keyof typeof statusColors]}>
                        {lead.status === 'new' && 'جديد'}
                        {lead.status === 'contacted' && 'تم التواصل'}
                        {lead.status === 'qualified' && 'مؤهل'}
                        {lead.status === 'proposal' && 'عرض سعر'}
                        {lead.status === 'client' && 'عميل'}
                      </Badge>
                      <div className="flex items-center gap-1">
                        {sourceIcons[lead.source as keyof typeof sourceIcons]}
                        <span className="text-sm text-gray-500">
                          {lead.source === 'radar' && 'رادار'}
                          {lead.source === 'referral' && 'إحالة'}
                          {lead.source === 'website' && 'موقع'}
                          {lead.source === 'social' && 'سوشيال'}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium text-gray-700">
                        نقاط الجودة: {lead.score}/100
                      </span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>{lead.location}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="h-4 w-4" />
                    <span>{lead.phone}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="h-4 w-4" />
                    <span>{lead.email}</span>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm text-gray-600 mb-1">نوع العقار:</p>
                  <p className="font-medium">{lead.propertyType}</p>
                </div>

                <div className="bg-green-50 rounded-lg p-3">
                  <p className="text-sm text-gray-600 mb-1">الميزانية المتوقعة:</p>
                  <p className="font-medium text-green-700">{lead.budget}</p>
                </div>

                {lead.notes && (
                  <div className="bg-blue-50 rounded-lg p-3">
                    <p className="text-sm text-gray-600 mb-1">ملاحظات:</p>
                    <p className="text-sm">{lead.notes}</p>
                  </div>
                )}

                <div className="flex gap-2 pt-4">
                  <Button className="flex-1 btn-primary">
                    <Phone className="ml-2 h-4 w-4" />
                    اتصال
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Mail className="ml-2 h-4 w-4" />
                    إيميل
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <BarChart3 className="ml-2 h-4 w-4" />
                    عرض سعر
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredLeads.length === 0 && (
          <Card className="glass-card">
            <CardContent className="text-center py-12">
              <Radar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-600 mb-2">
                لا توجد نتائج
              </h3>
              <p className="text-gray-500">
                جرب تغيير مرشحات البحث أو إضافة عملاء محتملين جدد
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}