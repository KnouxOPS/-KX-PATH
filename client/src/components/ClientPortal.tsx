import { useState } from "react";
import {
  User,
  Plus,
  Search,
  Filter,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Star,
} from "lucide-react";

interface ClientPortalProps {
  language: "en" | "ar";
}

const translations = {
  en: {
    clientPortal: "Client Portal",
    addClient: "Add New Client",
    searchClients: "Search clients...",
    allClients: "All Clients",
    activeProjects: "Active Projects",
    completedProjects: "Completed",
    totalSpent: "Total Spent",
    joinDate: "Join Date",
    lastProject: "Last Project",
    contactClient: "Contact Client",
    viewProjects: "View Projects",
    newProject: "New Project",
    clientSince: "Client since",
    projectsCompleted: "Projects completed",
    rating: "Rating",
    vip: "VIP Client",
    premium: "Premium",
    regular: "Regular",
  },
  ar: {
    clientPortal: "بوابة العملاء",
    addClient: "إضافة عميل جديد",
    searchClients: "البحث في العملاء...",
    allClients: "جميع العملاء",
    activeProjects: "المشاريع النشطة",
    completedProjects: "مكتمل",
    totalSpent: "إجمالي الإنفاق",
    joinDate: "تاريخ الانضمام",
    lastProject: "آخر مشروع",
    contactClient: "التواصل مع العميل",
    viewProjects: "عرض المشاريع",
    newProject: "مشروع جديد",
    clientSince: "عميل منذ",
    projectsCompleted: "مشاريع مكتملة",
    rating: "التقييم",
    vip: "عميل مميز",
    premium: "مميز",
    regular: "عادي",
  },
};

interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  location: string;
  joinDate: string;
  totalSpent: string;
  activeProjects: number;
  completedProjects: number;
  lastProject: string;
  status: "vip" | "premium" | "regular";
  rating: number;
  avatar: string;
}

const mockClients: Client[] = [
  {
    id: 1,
    name: "أحمد محمد الفيصل",
    email: "ahmed.faisal@email.com",
    phone: "+966 50 123 4567",
    location: "الرياض - حي الملقا",
    joinDate: "2023-01-15",
    totalSpent: "850K",
    activeProjects: 2,
    completedProjects: 5,
    lastProject: "Royal Villa Landscape",
    status: "vip",
    rating: 5,
    avatar: "👨‍💼",
  },
  {
    id: 2,
    name: "فاطمة سعد العلي",
    email: "fatima.ali@email.com",
    phone: "+966 55 987 6543",
    location: "جدة - أبحر الشمالية",
    joinDate: "2023-03-22",
    totalSpent: "320K",
    activeProjects: 1,
    completedProjects: 2,
    lastProject: "Smart Garden System",
    status: "premium",
    rating: 4,
    avatar: "👩‍💼",
  },
  {
    id: 3,
    name: "خالد بن سعد الغامدي",
    email: "khalid.ghamdi@email.com",
    phone: "+966 56 456 7890",
    location: "الدمام - الخليج",
    joinDate: "2023-06-10",
    totalSpent: "150K",
    activeProjects: 1,
    completedProjects: 1,
    lastProject: "Pool Construction",
    status: "regular",
    rating: 4,
    avatar: "👨",
  },
  {
    id: 4,
    name: "شركة الواحة للتطوير",
    email: "info@oasisdev.com",
    phone: "+966 50 789 0123",
    location: "الرياض - طريق الملك فهد",
    joinDate: "2022-11-05",
    totalSpent: "1.2M",
    activeProjects: 3,
    completedProjects: 8,
    lastProject: "Commercial Complex",
    status: "vip",
    rating: 5,
    avatar: "🏢",
  },
];

export default function ClientPortal({ language }: ClientPortalProps) {
  const [clients, setClients] = useState<Client[]>(mockClients);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("allClients");
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const t = translations[language];
  const isRTL = language === "ar";

  const getStatusColor = (status: string) => {
    switch (status) {
      case "vip":
        return "bg-gradient-to-r from-yellow-400 to-orange-500 text-white";
      case "premium":
        return "bg-gradient-to-r from-purple-400 to-pink-500 text-white";
      case "regular":
        return "bg-gray-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-400"}`}
      />
    ));
  };

  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.location.toLowerCase().includes(searchTerm.toLowerCase());

    if (filterStatus === "allClients") return matchesSearch;
    if (filterStatus === "activeProjects")
      return matchesSearch && client.activeProjects > 0;
    if (filterStatus === "completedProjects")
      return matchesSearch && client.completedProjects > 0;

    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div
        className={`flex items-center justify-between ${isRTL ? "flex-row-reverse" : ""}`}
      >
        <div
          className={`flex items-center gap-4 ${isRTL ? "flex-row-reverse" : ""}`}
        >
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
          <div className={`${isRTL ? "text-right" : "text-left"}`}>
            <h2 className="text-2xl font-bold text-white">{t.clientPortal}</h2>
            <p className="text-gray-300">
              {filteredClients.length} {language === "ar" ? "عميل" : "clients"}
            </p>
          </div>
        </div>

        <button className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold py-3 px-6 rounded-lg hover:scale-105 transition-all flex items-center gap-2">
          <Plus className="w-5 h-5" />
          {t.addClient}
        </button>
      </div>

      {/* Search & Filters */}
      <div className={`flex gap-4 ${isRTL ? "flex-row-reverse" : ""}`}>
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder={t.searchClients}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400"
          />
        </div>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-400"
        >
          <option value="allClients">{t.allClients}</option>
          <option value="activeProjects">{t.activeProjects}</option>
          <option value="completedProjects">{t.completedProjects}</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Clients List */}
        <div className="lg:col-span-2 space-y-4">
          {filteredClients.map((client) => (
            <div
              key={client.id}
              className={`bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:border-white/30 transition-all cursor-pointer ${selectedClient?.id === client.id ? "border-emerald-400 bg-emerald-400/10" : ""}`}
              onClick={() => setSelectedClient(client)}
            >
              <div
                className={`flex items-start gap-4 ${isRTL ? "flex-row-reverse" : ""}`}
              >
                {/* Avatar */}
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                  {client.avatar}
                </div>

                {/* Client Info */}
                <div className={`flex-1 ${isRTL ? "text-right" : "text-left"}`}>
                  <div
                    className={`flex items-center gap-3 mb-2 ${isRTL ? "flex-row-reverse" : ""}`}
                  >
                    <h3 className="text-white font-semibold text-lg">
                      {client.name}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(client.status)}`}
                    >
                      {t[client.status]}
                    </span>
                  </div>

                  <div className="space-y-1 text-sm text-gray-300 mb-3">
                    <div
                      className={`flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}
                    >
                      <Mail className="w-4 h-4" />
                      <span>{client.email}</span>
                    </div>
                    <div
                      className={`flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}
                    >
                      <Phone className="w-4 h-4" />
                      <span>{client.phone}</span>
                    </div>
                    <div
                      className={`flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}
                    >
                      <MapPin className="w-4 h-4" />
                      <span>{client.location}</span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div
                    className={`grid grid-cols-3 gap-4 text-center ${isRTL ? "text-right" : "text-left"}`}
                  >
                    <div>
                      <div className="text-emerald-400 font-bold text-lg">
                        {client.totalSpent}
                      </div>
                      <div className="text-xs text-gray-400">
                        {t.totalSpent}
                      </div>
                    </div>
                    <div>
                      <div className="text-yellow-400 font-bold text-lg">
                        {client.activeProjects}
                      </div>
                      <div className="text-xs text-gray-400">
                        {t.activeProjects}
                      </div>
                    </div>
                    <div>
                      <div className="text-blue-400 font-bold text-lg">
                        {client.completedProjects}
                      </div>
                      <div className="text-xs text-gray-400">
                        {t.completedProjects}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Rating */}
                <div
                  className={`flex flex-col items-center gap-2 ${isRTL ? "items-start" : "items-end"}`}
                >
                  <div
                    className={`flex gap-1 ${isRTL ? "flex-row-reverse" : ""}`}
                  >
                    {renderStars(client.rating)}
                  </div>
                  <div className="text-gray-400 text-xs">{client.rating}/5</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Client Details */}
        <div>
          {selectedClient ? (
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 sticky top-6">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                  {selectedClient.avatar}
                </div>
                <h3 className="text-white font-bold text-xl mb-2">
                  {selectedClient.name}
                </h3>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedClient.status)}`}
                >
                  {t[selectedClient.status]}
                </span>
              </div>

              <div className="space-y-4 mb-6">
                <div
                  className={`flex justify-between ${isRTL ? "flex-row-reverse" : ""}`}
                >
                  <span className="text-gray-300">{t.clientSince}:</span>
                  <span className="text-white">
                    {new Date(selectedClient.joinDate).getFullYear()}
                  </span>
                </div>
                <div
                  className={`flex justify-between ${isRTL ? "flex-row-reverse" : ""}`}
                >
                  <span className="text-gray-300">{t.projectsCompleted}:</span>
                  <span className="text-emerald-400">
                    {selectedClient.completedProjects}
                  </span>
                </div>
                <div
                  className={`flex justify-between ${isRTL ? "flex-row-reverse" : ""}`}
                >
                  <span className="text-gray-300">{t.totalSpent}:</span>
                  <span className="text-emerald-400 font-bold">
                    {selectedClient.totalSpent}
                  </span>
                </div>
                <div
                  className={`flex justify-between ${isRTL ? "flex-row-reverse" : ""}`}
                >
                  <span className="text-gray-300">{t.lastProject}:</span>
                  <span className="text-white text-sm">
                    {selectedClient.lastProject}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <button className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold py-3 px-4 rounded-lg hover:scale-105 transition-all">
                  {t.newProject}
                </button>
                <button className="w-full bg-white/10 hover:bg-white/20 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                  {t.contactClient}
                </button>
                <button className="w-full bg-white/10 hover:bg-white/20 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                  {t.viewProjects}
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 text-center">
              <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-300">
                {language === "ar"
                  ? "اختر عميلاً لعرض التفاصيل"
                  : "Select a client to view details"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
