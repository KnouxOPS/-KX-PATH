import { useState } from "react";
import {
  BookOpen,
  BarChart3,
  Microscope,
  Globe,
  Database,
  Download,
  Filter,
  Search,
  TrendingUp,
  Leaf,
} from "lucide-react";

interface ResearcherHubProps {
  language: "en" | "ar";
}

export default function ResearcherHub({ language }: ResearcherHubProps) {
  const [activeCategory, setActiveCategory] = useState("market-trends");
  const [searchQuery, setSearchQuery] = useState("");

  const researchCategories = [
    {
      id: "market-trends",
      title: language === "ar" ? "اتجاهات السوق" : "Market Trends",
      icon: TrendingUp,
      count: 45,
      description:
        language === "ar"
          ? "تحليلات وتوقعات السوق العالمي للمناظر الطبيعية"
          : "Global landscape market analysis and forecasts",
    },
    {
      id: "plant-science",
      title: language === "ar" ? "علوم النبات" : "Plant Science",
      icon: Leaf,
      count: 128,
      description:
        language === "ar"
          ? "أبحاث حديثة في علم النبات والزراعة المستدامة"
          : "Latest research in botany and sustainable agriculture",
    },
    {
      id: "climate-data",
      title: language === "ar" ? "البيانات المناخية" : "Climate Data",
      icon: Globe,
      count: 87,
      description:
        language === "ar"
          ? "بيانات المناخ والطقس للمنطقة الخليجية"
          : "Climate and weather data for the Gulf region",
    },
    {
      id: "innovation",
      title: language === "ar" ? "الابتكار والتقنيات" : "Innovation & Tech",
      icon: Microscope,
      count: 76,
      description:
        language === "ar"
          ? "أحدث التقنيات في تصميم المناظر الطبيعية"
          : "Latest technologies in landscape design",
    },
  ];

  const researchPapers = [
    {
      id: "RP-2024-001",
      title:
        language === "ar"
          ? "تأثير النباتات المحلية على استهلاك المياه في الحدائق الحضرية بدولة الإمارات"
          : "Impact of Native Plants on Water Consumption in UAE Urban Gardens",
      authors:
        language === "ar"
          ? "د. أحمد الفلاسي، د. فاطمة الشامسي"
          : "Dr. Ahmed Al Falasi, Dr. Fatima Al Shamsi",
      journal:
        language === "ar"
          ? "مجلة الزراعة المستدامة الخليجية"
          : "Gulf Sustainable Agriculture Journal",
      date: "2024-01-15",
      category: "plant-science",
      downloads: 1240,
      citations: 18,
      abstract:
        language === "ar"
          ? "دراسة شاملة حول تأثير استخدام النباتات المحلية في تقليل استهلاك المياه بنسبة تصل إلى 40% في الحدائق الحضرية..."
          : "Comprehensive study on the impact of using native plants to reduce water consumption by up to 40% in urban gardens...",
      tags: ["نباتات محلية", "توفير المياه", "الحدائق الحضرية", "الاستدامة"],
    },
    {
      id: "RP-2024-002",
      title:
        language === "ar"
          ? "تحليل اتجاهات السوق العالمي للمناظر الطبيعية الذكية 2024-2030"
          : "Global Smart Landscaping Market Trends Analysis 2024-2030",
      authors:
        language === "ar"
          ? "د. محمد العوضي، د. نورا الزعابي"
          : "Dr. Mohammed Al Awadhi, Dr. Nora Al Zaabi",
      journal:
        language === "ar"
          ? "مجلة اقتصاديات البيئة"
          : "Environmental Economics Journal",
      date: "2024-01-10",
      category: "market-trends",
      downloads: 890,
      citations: 12,
      abstract:
        language === "ar"
          ? "تحليل شامل لاتجاهات السوق العالمي للمناظر الطبيعية الذكية مع توقعات نمو تصل إلى 15% سنوياً..."
          : "Comprehensive analysis of global smart landscaping market trends with growth projections of up to 15% annually...",
      tags: ["اتجاهات السوق", "المناظر الذكية", "النمو الاقتصادي", "التوقعات"],
    },
    {
      id: "RP-2024-003",
      title:
        language === "ar"
          ? "نمذجة تأثير التغير المناخي على تصميم الحدائق في منطقة الخليج"
          : "Climate Change Impact Modeling on Gulf Region Garden Design",
      authors:
        language === "ar"
          ? "د. سارة المنصوري، د. خالد البلوشي"
          : "Dr. Sara Al Mansoori, Dr. Khalid Al Balushi",
      journal:
        language === "ar"
          ? "مجلة علوم المناخ التطبيقية"
          : "Applied Climate Science Journal",
      date: "2024-01-05",
      category: "climate-data",
      downloads: 756,
      citations: 9,
      abstract:
        language === "ar"
          ? "نموذج تنبؤي متقدم لتأثير التغير المناخي على اختيار النباتات وتصميم الحدائق في المناخ الصحراوي..."
          : "Advanced predictive model for climate change impact on plant selection and garden design in desert climates...",
      tags: ["التغير المناخي", "النمذجة", "تصميم الحدائق", "المناخ الصحراوي"],
    },
  ];

  const marketReports = [
    {
      id: "MR-2024-Q1",
      title:
        language === "ar"
          ? "تقرير السوق الفصلي - الربع الأول 2024"
          : "Quarterly Market Report - Q1 2024",
      type: "market-report",
      date: "2024-03-31",
      pages: 45,
      price: "Free",
      summary:
        language === "ar"
          ? "نمو بنسبة 23% في قطاع المناظر الطبيعية الذكية مع زيادة الطلب على الحلول المستدامة"
          : "23% growth in smart landscaping sector with increased demand for sustainable solutions",
    },
    {
      id: "MR-2024-SUSTAINABILITY",
      title:
        language === "ar"
          ? "تقرير الاستدامة والابتكار في المناظر الطبيعية"
          : "Sustainability & Innovation in Landscaping Report",
      type: "research-report",
      date: "2024-02-15",
      pages: 78,
      price: "$299",
      summary:
        language === "ar"
          ? "دراسة شاملة حول الابتكارات الحديثة وتقنيات الاستدامة في تصميم المناظر الطبيعية"
          : "Comprehensive study on modern innovations and sustainability technologies in landscape design",
    },
  ];

  const databases = [
    {
      name:
        language === "ar"
          ? "قاعدة بيانات النباتات المحلية"
          : "Native Plants Database",
      description:
        language === "ar"
          ? "أكثر من 500 نوع من النباتات المحلية مع معلومات مفصلة"
          : "Over 500 native plant species with detailed information",
      records: "500+",
      lastUpdate: "2024-01-20",
      access: "premium",
    },
    {
      name:
        language === "ar" ? "بيانات الطقس والمناخ" : "Weather & Climate Data",
      description:
        language === "ar"
          ? "بيانات تاريخية ومتوقعة للطقس والمناخ"
          : "Historical and forecasted weather and climate data",
      records: "15 years",
      lastUpdate: "2024-01-22",
      access: "free",
    },
    {
      name:
        language === "ar"
          ? "أسعار المواد والخدمات"
          : "Materials & Services Pricing",
      description:
        language === "ar"
          ? "أسعار محدثة للمواد والخدمات في المنطقة"
          : "Updated pricing for materials and services in the region",
      records: "1000+",
      lastUpdate: "2024-01-22",
      access: "premium",
    },
  ];

  const filteredPapers = researchPapers.filter(
    (paper) =>
      (activeCategory === "all" || paper.category === activeCategory) &&
      (searchQuery === "" ||
        paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        paper.authors.toLowerCase().includes(searchQuery.toLowerCase()) ||
        paper.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase()),
        )),
  );

  return (
    <div className="space-y-8" dir={language === "ar" ? "rtl" : "ltr"}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-emerald-300">
            {language === "ar"
              ? "مركز الأبحاث والدراسات"
              : "Research & Studies Hub"}
          </h2>
          <p className="text-emerald-400 mt-2">
            {language === "ar"
              ? "منصة شاملة للأبحاث والبيانات الأكاديمية المتخصصة"
              : "Comprehensive platform for specialized academic research and data"}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-emerald-400">
            {language === "ar" ? "آخر تحديث:" : "Last Updated:"}{" "}
            <span className="text-emerald-200">2024-01-22</span>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-emerald-400/30 p-6 text-center">
          <BookOpen className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
          <div className="text-2xl font-bold text-emerald-300">336</div>
          <div className="text-emerald-400">
            {language === "ar" ? "ورقة بحثية" : "Research Papers"}
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-emerald-400/30 p-6 text-center">
          <BarChart3 className="w-8 h-8 text-blue-400 mx-auto mb-3" />
          <div className="text-2xl font-bold text-blue-300">48</div>
          <div className="text-emerald-400">
            {language === "ar" ? "تقرير سوق" : "Market Reports"}
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-emerald-400/30 p-6 text-center">
          <Database className="w-8 h-8 text-purple-400 mx-auto mb-3" />
          <div className="text-2xl font-bold text-purple-300">12</div>
          <div className="text-emerald-400">
            {language === "ar" ? "قاعدة بيانات" : "Databases"}
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-emerald-400/30 p-6 text-center">
          <Globe className="w-8 h-8 text-teal-400 mx-auto mb-3" />
          <div className="text-2xl font-bold text-teal-300">25K+</div>
          <div className="text-emerald-400">
            {language === "ar" ? "عدد التحميلات" : "Downloads"}
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-emerald-400/30 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-400 w-5 h-5" />
            <input
              type="text"
              placeholder={
                language === "ar"
                  ? "ابحث في الأبحاث والتقارير..."
                  : "Search research papers and reports..."
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-800/50 border border-emerald-400/30 rounded-xl px-12 py-3 text-emerald-200 placeholder-emerald-400/60 focus:border-emerald-400/60 focus:outline-none"
            />
          </div>

          <div className="flex gap-4">
            <select className="bg-slate-800/50 border border-emerald-400/30 rounded-xl px-4 py-3 text-emerald-200">
              <option>
                {language === "ar" ? "تاريخ النشر" : "Publication Date"}
              </option>
              <option>{language === "ar" ? "2024" : "2024"}</option>
              <option>{language === "ar" ? "2023" : "2023"}</option>
            </select>

            <button className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 px-6 py-3 rounded-xl transition-colors">
              <Filter className="w-5 h-5" />
              {language === "ar" ? "فلترة" : "Filter"}
            </button>
          </div>
        </div>
      </div>

      {/* Research Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {researchCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`p-6 rounded-2xl transition-all duration-300 text-left ${
              activeCategory === category.id
                ? "bg-emerald-500/20 border border-emerald-400/50"
                : "bg-white/10 backdrop-blur-lg border border-emerald-400/30 hover:bg-white/15"
            }`}
          >
            <div className="flex items-center gap-4 mb-4">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  activeCategory === category.id
                    ? "bg-emerald-500"
                    : "bg-emerald-500/20"
                }`}
              >
                <category.icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-emerald-200">
                  {category.title}
                </div>
                <div className="text-emerald-400 text-sm">
                  {category.count} {language === "ar" ? "عنصر" : "items"}
                </div>
              </div>
            </div>
            <p className="text-emerald-400 text-sm">{category.description}</p>
          </button>
        ))}
      </div>

      {/* Research Papers */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-emerald-400/30">
        <div className="p-6 border-b border-emerald-400/20">
          <h3 className="text-xl font-bold text-emerald-300">
            {language === "ar"
              ? "الأوراق البحثية الحديثة"
              : "Latest Research Papers"}
          </h3>
        </div>

        <div className="space-y-6 p-6">
          {filteredPapers.map((paper) => (
            <div key={paper.id} className="bg-slate-800/30 rounded-xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-emerald-200 mb-2">
                    {paper.title}
                  </h4>
                  <div className="text-emerald-400 mb-2">{paper.authors}</div>
                  <div className="text-sm text-emerald-500">
                    {paper.journal} • {paper.date}
                  </div>
                </div>
                <div className="text-right">
                  <button className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 px-4 py-2 rounded-xl transition-colors mb-2">
                    <Download className="w-4 h-4" />
                    {language === "ar" ? "تحميل" : "Download"}
                  </button>
                  <div className="text-sm text-emerald-400">
                    {paper.downloads}{" "}
                    {language === "ar" ? "تحميل" : "downloads"} •{" "}
                    {paper.citations}{" "}
                    {language === "ar" ? "اقتباس" : "citations"}
                  </div>
                </div>
              </div>

              <p className="text-emerald-200 mb-4">{paper.abstract}</p>

              <div className="flex flex-wrap gap-2">
                {paper.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Market Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-emerald-400/30">
          <div className="p-6 border-b border-emerald-400/20">
            <h3 className="text-xl font-bold text-emerald-300">
              {language === "ar" ? "تقارير السوق" : "Market Reports"}
            </h3>
          </div>

          <div className="space-y-4 p-6">
            {marketReports.map((report) => (
              <div key={report.id} className="bg-slate-800/30 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-emerald-200">
                    {report.title}
                  </h4>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      report.price === "Free"
                        ? "bg-green-500/20 text-green-300"
                        : "bg-blue-500/20 text-blue-300"
                    }`}
                  >
                    {report.price}
                  </span>
                </div>

                <p className="text-emerald-400 text-sm mb-3">
                  {report.summary}
                </p>

                <div className="flex items-center justify-between text-sm text-emerald-500">
                  <span>
                    {report.date} • {report.pages}{" "}
                    {language === "ar" ? "صفحة" : "pages"}
                  </span>
                  <button className="text-emerald-300 hover:text-emerald-200 transition-colors">
                    {language === "ar" ? "عرض التفاصيل" : "View Details"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Databases Access */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-emerald-400/30">
          <div className="p-6 border-b border-emerald-400/20">
            <h3 className="text-xl font-bold text-emerald-300">
              {language === "ar" ? "قواعد البيانات" : "Research Databases"}
            </h3>
          </div>

          <div className="space-y-4 p-6">
            {databases.map((database, index) => (
              <div key={index} className="bg-slate-800/30 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-emerald-200">
                    {database.name}
                  </h4>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      database.access === "free"
                        ? "bg-green-500/20 text-green-300"
                        : "bg-purple-500/20 text-purple-300"
                    }`}
                  >
                    {database.access === "free"
                      ? language === "ar"
                        ? "مجاني"
                        : "Free"
                      : language === "ar"
                        ? "مميز"
                        : "Premium"}
                  </span>
                </div>

                <p className="text-emerald-400 text-sm mb-3">
                  {database.description}
                </p>

                <div className="flex items-center justify-between text-sm text-emerald-500">
                  <span>
                    {database.records} {language === "ar" ? "سجل" : "records"}
                  </span>
                  <span>
                    {language === "ar" ? "آخر تحديث:" : "Updated:"}{" "}
                    {database.lastUpdate}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
