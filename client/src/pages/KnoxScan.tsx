import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Camera, 
  Upload,
  ScanLine,
  MapPin,
  Thermometer,
  Droplets,
  Sun,
  Leaf,
  Mountain,
  Zap,
  CheckCircle,
  AlertTriangle,
  Info,
  Download,
  Share,
  Eye,
  Target,
  BarChart3
} from "lucide-react";

interface ScanResult {
  soilType: string;
  ph: number;
  moisture: number;
  temperature: number;
  sunlight: string;
  drainage: string;
  recommendations: string[];
  plantSuggestions: string[];
  confidence: number;
  area: number;
}

export default function KnoxScan() {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const mockScanResult: ScanResult = {
    soilType: "طين رملي مختلط",
    ph: 7.2,
    moisture: 65,
    temperature: 28,
    sunlight: "شمس جزئية (6-8 ساعات)",
    drainage: "جيد إلى متوسط",
    recommendations: [
      "إضافة سماد عضوي لتحسين بنية التربة",
      "تحسين نظام الصرف في المناطق المنخفضة",
      "زراعة النباتات المحبة للرطوبة في الجانب الشمالي",
      "استخدام نظام ري بالتنقيط للمناطق المرتفعة"
    ],
    plantSuggestions: [
      "نخيل التمر",
      "الياسمين العربي", 
      "أشجار السدر",
      "نبات الزعتر البري",
      "أشجار الليمون",
      "نبات اللافندر"
    ],
    confidence: 92,
    area: 245
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const startScan = () => {
    setIsScanning(true);
    setScanProgress(0);
    
    // محاكاة عملية المسح
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          setScanResult(mockScanResult);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2 font-arabic">
                🔍 KnoxScan - التحليل الذكي للمواقع
              </h1>
              <p className="text-lg text-gray-600">
                تحليل أي موقع بالذكاء الاصطناعي لاكتشاف نوع التربة والمناخ المحلي
              </p>
            </div>
          </div>
        </div>

        {/* Upload Section */}
        {!scanResult && (
          <Card className="glass-card mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">
                ارفع صورة الموقع للتحليل
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Image Upload Area */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-primary transition-colors">
                {selectedImage ? (
                  <div className="space-y-4">
                    <img 
                      src={selectedImage} 
                      alt="Selected" 
                      className="max-h-64 mx-auto rounded-lg shadow-lg"
                    />
                    <p className="text-sm text-gray-600">صورة جاهزة للتحليل</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload className="h-16 w-16 text-gray-400 mx-auto" />
                    <div>
                      <p className="text-lg font-medium text-gray-600 mb-2">
                        اختر صورة من جهازك أو التقط صورة جديدة
                      </p>
                      <p className="text-sm text-gray-500">
                        يدعم PNG, JPG, JPEG حتى 10MB
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Upload Buttons */}
              <div className="flex gap-4 justify-center">
                <Button 
                  onClick={() => fileInputRef.current?.click()}
                  className="btn-primary"
                  disabled={isScanning}
                >
                  <Upload className="ml-2 h-5 w-5" />
                  رفع صورة
                </Button>
                <Button 
                  variant="outline"
                  disabled={isScanning}
                >
                  <Camera className="ml-2 h-5 w-5" />
                  التقاط صورة
                </Button>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />

              {/* Scan Button */}
              {selectedImage && (
                <div className="text-center">
                  <Button 
                    onClick={startScan}
                    className="btn-secondary text-lg px-8 py-3"
                    disabled={isScanning}
                  >
                    {isScanning ? (
                      <>
                        <ScanLine className="ml-2 h-5 w-5 animate-pulse" />
                        جاري التحليل...
                      </>
                    ) : (
                      <>
                        <ScanLine className="ml-2 h-5 w-5" />
                        بدء التحليل الذكي
                      </>
                    )}
                  </Button>
                </div>
              )}

              {/* Progress Bar */}
              {isScanning && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>تحليل الصورة...</span>
                    <span>{scanProgress}%</span>
                  </div>
                  <Progress value={scanProgress} className="h-2" />
                  <div className="text-center text-sm text-gray-600">
                    {scanProgress < 30 && "تحليل الألوان والأنسجة..."}
                    {scanProgress >= 30 && scanProgress < 60 && "تحديد نوع التربة..."}
                    {scanProgress >= 60 && scanProgress < 90 && "تقييم ظروف الإضاءة والرطوبة..."}
                    {scanProgress >= 90 && "إنشاء التوصيات..."}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Scan Results */}
        {scanResult && (
          <div className="space-y-8">
            {/* Result Header */}
            <Card className="glass-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                      نتائج التحليل الذكي
                    </h2>
                    <div className="flex items-center gap-4">
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="ml-1 h-4 w-4" />
                        اكتمل التحليل
                      </Badge>
                      <span className="text-sm text-gray-600">
                        دقة التحليل: {scanResult.confidence}%
                      </span>
                      <span className="text-sm text-gray-600">
                        المساحة: {scanResult.area} متر مربع
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Download className="ml-2 h-4 w-4" />
                      تحميل التقرير
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share className="ml-2 h-4 w-4" />
                      مشاركة
                    </Button>
                  </div>
                </div>

                {selectedImage && (
                  <img 
                    src={selectedImage} 
                    alt="Analyzed site" 
                    className="w-full max-h-48 object-cover rounded-lg shadow-lg"
                  />
                )}
              </CardContent>
            </Card>

            {/* Analysis Results */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Environmental Conditions */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mountain className="h-5 w-5 text-green-600" />
                    الظروف البيئية
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <Thermometer className="h-8 w-8 text-red-500 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">درجة الحرارة</p>
                      <p className="text-xl font-bold">{scanResult.temperature}°C</p>
                    </div>
                    
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <Droplets className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">الرطوبة</p>
                      <p className="text-xl font-bold">{scanResult.moisture}%</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                      <Sun className="h-6 w-6 text-yellow-600" />
                      <div>
                        <p className="font-medium">التعرض للشمس</p>
                        <p className="text-sm text-gray-600">{scanResult.sunlight}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <Target className="h-6 w-6 text-green-600" />
                      <div>
                        <p className="font-medium">نوع التربة</p>
                        <p className="text-sm text-gray-600">{scanResult.soilType}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                      <BarChart3 className="h-6 w-6 text-purple-600" />
                      <div>
                        <p className="font-medium">مستوى الحموضة (pH)</p>
                        <p className="text-sm text-gray-600">{scanResult.ph} - متعادل مثالي</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Droplets className="h-6 w-6 text-gray-600" />
                      <div>
                        <p className="font-medium">الصرف</p>
                        <p className="text-sm text-gray-600">{scanResult.drainage}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recommendations */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-yellow-600" />
                    التوصيات الذكية
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-800">إجراءات مُوصى بها:</h4>
                    {scanResult.recommendations.map((rec, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                        <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <p className="text-sm">{rec}</p>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-800 flex items-center gap-2">
                      <Leaf className="h-5 w-5 text-green-600" />
                      النباتات المُوصى بها:
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {scanResult.plantSuggestions.map((plant, index) => (
                        <Badge key={index} variant="secondary" className="justify-center p-2">
                          {plant}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Action Buttons */}
            <Card className="glass-card">
              <CardContent className="p-6">
                <div className="flex flex-wrap gap-4 justify-center">
                  <Button className="btn-primary">
                    <Eye className="ml-2 h-5 w-5" />
                    إنشاء تصميم ثلاثي الأبعاد
                  </Button>
                  <Button className="btn-secondary">
                    <Target className="ml-2 h-5 w-5" />
                    طلب عرض سعر
                  </Button>
                  <Button variant="outline">
                    <Camera className="ml-2 h-5 w-5" />
                    تحليل موقع آخر
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setScanResult(null);
                      setSelectedImage(null);
                    }}
                  >
                    <ScanLine className="ml-2 h-5 w-5" />
                    مسح جديد
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}