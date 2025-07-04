import { useState } from "react";
import {
  DollarSign,
  FileText,
  Download,
  Eye,
  Edit,
  Plus,
  Calendar,
  TrendingUp,
  CreditCard,
  AlertCircle,
} from "lucide-react";

interface FinanceContractsProps {
  language: "en" | "ar";
  userRole: "admin" | "client" | "premium" | "field" | "researcher";
}

export default function FinanceContracts({
  language,
  userRole,
}: FinanceContractsProps) {
  const [activeTab, setActiveTab] = useState("contracts");
  const [selectedContract, setSelectedContract] = useState(null);

  const contracts = [
    {
      id: "CNT-2024-001",
      client: language === "ar" ? "عائلة المحمد" : "Al Mohammed Family",
      project:
        language === "ar" ? "حديقة فيلا الياسمين" : "Jasmine Villa Garden",
      value: "$45,000",
      status: "active",
      signed: true,
      progress: 75,
      startDate: "2024-01-15",
      endDate: "2024-03-20",
      nextPayment: "$15,000",
      paymentDate: "2024-02-15",
    },
    {
      id: "CNT-2024-002",
      client:
        language === "ar" ? "شركة الرؤية العقارية" : "Vision Real Estate Co.",
      project:
        language === "ar"
          ? "منتجع الخضراء التجاري"
          : "Al Khadra Commercial Resort",
      value: "$120,000",
      status: "pending",
      signed: false,
      progress: 0,
      startDate: "2024-02-01",
      endDate: "2024-06-30",
      nextPayment: "$30,000",
      paymentDate: "2024-02-01",
    },
    {
      id: "CNT-2024-003",
      client:
        language === "ar"
          ? "مؤسسة الخليج للتطوير"
          : "Gulf Development Foundation",
      project:
        language === "ar"
          ? "حديقة المجمع السكني الجديد"
          : "New Residential Complex Garden",
      value: "$85,000",
      status: "completed",
      signed: true,
      progress: 100,
      startDate: "2023-11-01",
      endDate: "2024-01-15",
      nextPayment: "Completed",
      paymentDate: "Completed",
    },
  ];

  const invoices = [
    {
      id: "INV-2024-0012",
      contract: "CNT-2024-001",
      amount: "$15,000",
      status: "paid",
      dueDate: "2024-01-15",
      paidDate: "2024-01-14",
      description:
        language === "ar"
          ? "دفعة أولى - تصميم وتحضير الموقع"
          : "Initial Payment - Design & Site Preparation",
    },
    {
      id: "INV-2024-0013",
      contract: "CNT-2024-001",
      amount: "$15,000",
      status: "overdue",
      dueDate: "2024-02-15",
      paidDate: null,
      description:
        language === "ar"
          ? "دفعة ثان��ة - زراعة ونظام الري"
          : "Second Payment - Planting & Irrigation",
    },
    {
      id: "INV-2024-0014",
      contract: "CNT-2024-002",
      amount: "$30,000",
      status: "pending",
      dueDate: "2024-02-01",
      paidDate: null,
      description:
        language === "ar"
          ? "دفعة أولى - موافقة العقد"
          : "Initial Payment - Contract Approval",
    },
  ];

  const payments = [
    {
      id: "PAY-001",
      date: "2024-01-14",
      amount: "$15,000",
      method: "تحويل بنكي",
      client: "عائلة المحمد",
      status: "completed",
    },
    {
      id: "PAY-002",
      date: "2024-01-10",
      amount: "$85,000",
      method: "شيك",
      client: "مؤسسة الخليج للتطوير",
      status: "completed",
    },
    {
      id: "PAY-003",
      date: "2024-02-15",
      amount: "$15,000",
      method: "تحويل بنكي",
      client: "عائلة المحمد",
      status: "pending",
    },
  ];

  const renderContracts = () => (
    <div className="space-y-6">
      {/* Contracts Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-emerald-400/30 p-6 text-center">
          <FileText className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
          <div className="text-2xl font-bold text-emerald-300">
            {contracts.length}
          </div>
          <div className="text-emerald-400">
            {language === "ar" ? "إجمالي العقود" : "Total Contracts"}
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-emerald-400/30 p-6 text-center">
          <DollarSign className="w-8 h-8 text-green-400 mx-auto mb-3" />
          <div className="text-2xl font-bold text-green-300">$250K</div>
          <div className="text-emerald-400">
            {language === "ar" ? "القيمة الإجمالية" : "Total Value"}
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-emerald-400/30 p-6 text-center">
          <TrendingUp className="w-8 h-8 text-blue-400 mx-auto mb-3" />
          <div className="text-2xl font-bold text-blue-300">2</div>
          <div className="text-emerald-400">
            {language === "ar" ? "عقود نشطة" : "Active Contracts"}
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-emerald-400/30 p-6 text-center">
          <Calendar className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
          <div className="text-2xl font-bold text-yellow-300">1</div>
          <div className="text-emerald-400">
            {language === "ar" ? "في انتظار التوقيع" : "Pending Signature"}
          </div>
        </div>
      </div>

      {/* Contracts List */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-emerald-400/30">
        <div className="p-6 border-b border-emerald-400/20">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-emerald-300">
              {language === "ar" ? "قائمة العقود" : "Contracts List"}
            </h3>
            {userRole === "admin" && (
              <button className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 px-4 py-2 rounded-xl transition-colors">
                <Plus className="w-5 h-5" />
                {language === "ar" ? "عقد جديد" : "New Contract"}
              </button>
            )}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-emerald-400/20">
                <th className="text-left p-4 text-emerald-400">
                  {language === "ar" ? "��قم العقد" : "Contract ID"}
                </th>
                <th className="text-left p-4 text-emerald-400">
                  {language === "ar" ? "العميل" : "Client"}
                </th>
                <th className="text-left p-4 text-emerald-400">
                  {language === "ar" ? "المشروع" : "Project"}
                </th>
                <th className="text-left p-4 text-emerald-400">
                  {language === "ar" ? "القيمة" : "Value"}
                </th>
                <th className="text-left p-4 text-emerald-400">
                  {language === "ar" ? "الحالة" : "Status"}
                </th>
                <th className="text-left p-4 text-emerald-400">
                  {language === "ar" ? "التقدم" : "Progress"}
                </th>
                <th className="text-left p-4 text-emerald-400">
                  {language === "ar" ? "الإجراءات" : "Actions"}
                </th>
              </tr>
            </thead>
            <tbody>
              {contracts.map((contract) => (
                <tr
                  key={contract.id}
                  className="border-b border-emerald-400/10 hover:bg-white/5"
                >
                  <td className="p-4 text-emerald-200 font-medium">
                    {contract.id}
                  </td>
                  <td className="p-4 text-emerald-200">{contract.client}</td>
                  <td className="p-4 text-emerald-200">{contract.project}</td>
                  <td className="p-4 text-emerald-200 font-bold">
                    {contract.value}
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        contract.status === "active"
                          ? "bg-green-500/20 text-green-300"
                          : contract.status === "pending"
                            ? "bg-yellow-500/20 text-yellow-300"
                            : "bg-blue-500/20 text-blue-300"
                      }`}
                    >
                      {contract.status === "active"
                        ? language === "ar"
                          ? "نشط"
                          : "Active"
                        : contract.status === "pending"
                          ? language === "ar"
                            ? "معلق"
                            : "Pending"
                          : language === "ar"
                            ? "مكتمل"
                            : "Completed"}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-slate-800/50 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full"
                          style={{ width: `${contract.progress}%` }}
                        />
                      </div>
                      <span className="text-emerald-300 text-sm">
                        {contract.progress}%
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-emerald-400 hover:text-emerald-300 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-emerald-400 hover:text-emerald-300 transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                      {userRole === "admin" && (
                        <button className="p-2 text-emerald-400 hover:text-emerald-300 transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderInvoices = () => (
    <div className="space-y-6">
      {/* Invoice Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-emerald-400/30 p-6 text-center">
          <div className="text-2xl font-bold text-emerald-300">
            {invoices.length}
          </div>
          <div className="text-emerald-400">
            {language === "ar" ? "إجمالي الفواتير" : "Total Invoices"}
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-emerald-400/30 p-6 text-center">
          <div className="text-2xl font-bold text-green-300">$15K</div>
          <div className="text-emerald-400">
            {language === "ar" ? "المدفوع" : "Paid"}
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-emerald-400/30 p-6 text-center">
          <div className="text-2xl font-bold text-red-300">$15K</div>
          <div className="text-emerald-400">
            {language === "ar" ? "متأخر" : "Overdue"}
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-emerald-400/30 p-6 text-center">
          <div className="text-2xl font-bold text-yellow-300">$30K</div>
          <div className="text-emerald-400">
            {language === "ar" ? "معلق" : "Pending"}
          </div>
        </div>
      </div>

      {/* Invoices List */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-emerald-400/30">
        <div className="p-6 border-b border-emerald-400/20">
          <h3 className="text-xl font-bold text-emerald-300">
            {language === "ar" ? "الفواتير" : "Invoices"}
          </h3>
        </div>

        <div className="space-y-4 p-6">
          {invoices.map((invoice) => (
            <div key={invoice.id} className="bg-slate-800/30 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-4">
                  <div className="font-medium text-emerald-200">
                    {invoice.id}
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      invoice.status === "paid"
                        ? "bg-green-500/20 text-green-300"
                        : invoice.status === "overdue"
                          ? "bg-red-500/20 text-red-300"
                          : "bg-yellow-500/20 text-yellow-300"
                    }`}
                  >
                    {invoice.status === "paid"
                      ? language === "ar"
                        ? "مدفوع"
                        : "Paid"
                      : invoice.status === "overdue"
                        ? language === "ar"
                          ? "متأخر"
                          : "Overdue"
                        : language === "ar"
                          ? "معلق"
                          : "Pending"}
                  </span>
                </div>
                <div className="text-xl font-bold text-emerald-300">
                  {invoice.amount}
                </div>
              </div>

              <div className="text-emerald-400 mb-2">{invoice.description}</div>

              <div className="flex items-center justify-between text-sm">
                <div className="text-emerald-500">
                  {language === "ar" ? "تاريخ الاستحقاق:" : "Due Date:"}{" "}
                  {invoice.dueDate}
                </div>
                {invoice.paidDate && (
                  <div className="text-green-400">
                    {language === "ar" ? "تاريخ الدفع:" : "Paid Date:"}{" "}
                    {invoice.paidDate}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPayments = () => (
    <div className="space-y-6">
      {/* Recent Payments */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-emerald-400/30">
        <div className="p-6 border-b border-emerald-400/20">
          <h3 className="text-xl font-bold text-emerald-300">
            {language === "ar" ? "المدفوعات الأخيرة" : "Recent Payments"}
          </h3>
        </div>

        <div className="space-y-4 p-6">
          {payments.map((payment) => (
            <div
              key={payment.id}
              className="flex items-center gap-4 p-4 bg-slate-800/30 rounded-xl"
            >
              <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-emerald-400" />
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <div className="font-medium text-emerald-200">
                    {payment.client}
                  </div>
                  <div className="text-xl font-bold text-emerald-300">
                    {payment.amount}
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="text-emerald-400">{payment.method}</div>
                  <div className="text-emerald-500">{payment.date}</div>
                </div>
              </div>

              <div
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  payment.status === "completed"
                    ? "bg-green-500/20 text-green-300"
                    : "bg-yellow-500/20 text-yellow-300"
                }`}
              >
                {payment.status === "completed"
                  ? language === "ar"
                    ? "مكتمل"
                    : "Completed"
                  : language === "ar"
                    ? "معلق"
                    : "Pending"}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6" dir={language === "ar" ? "rtl" : "ltr"}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-emerald-300">
          {language === "ar" ? "المالية والعقود" : "Finance & Contracts"}
        </h2>
        <div className="flex items-center gap-4">
          <div className="text-emerald-400">
            {language === "ar" ? "الإيرادات الشهرية:" : "Monthly Revenue:"}{" "}
            <span className="text-emerald-200 font-bold">$45,000</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-4">
        {["contracts", "invoices", "payments"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              activeTab === tab
                ? "bg-emerald-500 text-white"
                : "bg-white/10 text-emerald-300 hover:bg-white/15"
            }`}
          >
            {tab === "contracts"
              ? language === "ar"
                ? "العقود"
                : "Contracts"
              : tab === "invoices"
                ? language === "ar"
                  ? "الفواتير"
                  : "Invoices"
                : language === "ar"
                  ? "المدفوعات"
                  : "Payments"}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === "contracts" && renderContracts()}
      {activeTab === "invoices" && renderInvoices()}
      {activeTab === "payments" && renderPayments()}
    </div>
  );
}
