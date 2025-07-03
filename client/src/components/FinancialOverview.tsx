import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Wallet, Clock } from "lucide-react";

interface DashboardStats {
  activeProjects: number;
  completedProjects: number;
  totalRevenue: number;
  monthlyRevenue: number;
  netProfit: number;
  pendingPayments: number;
}

interface FinancialOverviewProps {
  stats?: DashboardStats;
}

export default function FinancialOverview({ stats }: FinancialOverviewProps) {
  const formatCurrency = (amount: number) => {
    return `${amount.toLocaleString()} درهم`;
  };

  return (
    <Card className="glass-card">
      <CardContent className="p-8">
        <h3 className="text-2xl font-bold mb-6 text-gray-800 font-arabic">الملخص المالي</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-white/30 rounded-xl">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <TrendingUp className="text-white h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold">الإيرادات الشهرية</p>
                <p className="text-sm text-gray-600">يناير 2024</p>
              </div>
            </div>
            <span className="text-2xl font-bold text-primary-custom">
              {formatCurrency(stats?.monthlyRevenue || 0)}
            </span>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-white/30 rounded-xl">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                <Wallet className="text-white h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold">الأرباح الصافية</p>
                <p className="text-sm text-gray-600">بعد المصروفات</p>
              </div>
            </div>
            <span className="text-2xl font-bold text-secondary-custom">
              {formatCurrency(stats?.netProfit || 0)}
            </span>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-white/30 rounded-xl">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                <Clock className="text-white h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold">المدفوعات المعلقة</p>
                <p className="text-sm text-gray-600">في انتظار التحصيل</p>
              </div>
            </div>
            <span className="text-2xl font-bold text-accent-custom">
              {formatCurrency(stats?.pendingPayments || 0)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
