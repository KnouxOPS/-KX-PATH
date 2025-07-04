// KX_CITY_DB - UAE Smart Landscape Database
// مخصص بالكامل للسوق الإماراتي 🇦🇪

export interface UAEArea {
  id: string;
  name_ar: string;
  name_en: string;
  emirate:
    | "dubai"
    | "abudhabi"
    | "sharjah"
    | "ajman"
    | "rak"
    | "fujairah"
    | "uaq";
  coordinates: {
    lat: number;
    lng: number;
    bounds: {
      north: number;
      south: number;
      east: number;
      west: number;
    };
  };
  population: number;
  villa_count: number;
  apartment_count: number;
  avg_property_value: number;
  terrain_type: "coastal" | "desert" | "mountain" | "urban" | "suburban";
  development_status: "established" | "developing" | "new" | "planned";
  landscape_potential: "high" | "medium" | "low";
  active_projects: number;
  interested_clients: number;
}

export interface LiveProject {
  id: string;
  title_ar: string;
  title_en: string;
  client_name: string;
  area_id: string;
  coordinates: { lat: number; lng: number };
  project_type:
    | "villa_garden"
    | "commercial_landscape"
    | "pool_installation"
    | "maintenance"
    | "irrigation_system";
  status:
    | "planning"
    | "design"
    | "approval"
    | "execution"
    | "completed"
    | "maintenance";
  budget: number;
  start_date: string;
  estimated_completion: string;
  progress_percentage: number;
  assigned_team: string[];
  priority: "low" | "medium" | "high" | "urgent";
  client_tier: "standard" | "premium" | "vip";
  terrain_analysis: {
    soil_type: string;
    drainage: string;
    sun_exposure: string;
    existing_vegetation: string[];
  };
  ai_recommendations: string[];
  last_update: string;
}

export interface SmartNotification {
  id: string;
  type:
    | "new_construction"
    | "property_sale"
    | "land_purchase"
    | "development_permit"
    | "market_opportunity";
  title_ar: string;
  title_en: string;
  description_ar: string;
  description_en: string;
  area_id: string;
  coordinates: { lat: number; lng: number };
  property_details: {
    type: "villa" | "apartment" | "commercial" | "land";
    size_sqm: number;
    estimated_value: number;
    owner_type: "individual" | "developer" | "government";
  };
  opportunity_score: number; // 0-100
  created_at: string;
  expires_at: string;
  is_processed: boolean;
  generated_leads: number;
}

export interface UAEMarketData {
  id: string;
  area_id: string;
  date: string;
  property_transactions: number;
  avg_transaction_value: number;
  new_constructions: number;
  landscape_service_demand: number;
  seasonal_trends: {
    winter_demand: number;
    summer_demand: number;
    peak_months: string[];
  };
  competitor_activity: number;
  material_costs: {
    plants: number;
    irrigation: number;
    lighting: number;
    maintenance: number;
  };
}

// UAE Areas Database
export const uaeAreasData: UAEArea[] = [
  // Dubai Areas
  {
    id: "dubai_jumeirah",
    name_ar: "الجميرا",
    name_en: "Jumeirah",
    emirate: "dubai",
    coordinates: {
      lat: 25.2084,
      lng: 55.2719,
      bounds: { north: 25.22, south: 25.1968, east: 55.285, west: 55.2588 },
    },
    population: 85000,
    villa_count: 2450,
    apartment_count: 1200,
    avg_property_value: 3500000,
    terrain_type: "coastal",
    development_status: "established",
    landscape_potential: "high",
    active_projects: 18,
    interested_clients: 45,
  },
  {
    id: "dubai_downtown",
    name_ar: "وسط المدينة",
    name_en: "Downtown Dubai",
    emirate: "dubai",
    coordinates: {
      lat: 25.1972,
      lng: 55.2744,
      bounds: { north: 25.205, south: 25.1894, east: 55.2822, west: 55.2666 },
    },
    population: 120000,
    villa_count: 150,
    apartment_count: 8500,
    avg_property_value: 2800000,
    terrain_type: "urban",
    development_status: "established",
    landscape_potential: "medium",
    active_projects: 12,
    interested_clients: 28,
  },
  {
    id: "dubai_emirates_hills",
    name_ar: "تلال الإمارات",
    name_en: "Emirates Hills",
    emirate: "dubai",
    coordinates: {
      lat: 25.1126,
      lng: 55.1661,
      bounds: { north: 25.125, south: 25.1002, east: 55.1789, west: 55.1533 },
    },
    population: 12000,
    villa_count: 650,
    apartment_count: 0,
    avg_property_value: 15000000,
    terrain_type: "suburban",
    development_status: "established",
    landscape_potential: "high",
    active_projects: 8,
    interested_clients: 22,
  },

  // Abu Dhabi Areas
  {
    id: "abudhabi_khalifa_city",
    name_ar: "مدينة خليفة",
    name_en: "Khalifa City",
    emirate: "abudhabi",
    coordinates: {
      lat: 24.4292,
      lng: 54.6094,
      bounds: { north: 24.44, south: 24.4184, east: 54.62, west: 54.5988 },
    },
    population: 95000,
    villa_count: 3200,
    apartment_count: 2800,
    avg_property_value: 2200000,
    terrain_type: "suburban",
    development_status: "developing",
    landscape_potential: "high",
    active_projects: 25,
    interested_clients: 38,
  },
  {
    id: "abudhabi_saadiyat",
    name_ar: "جزيرة السعديات",
    name_en: "Saadiyat Island",
    emirate: "abudhabi",
    coordinates: {
      lat: 24.5311,
      lng: 54.4339,
      bounds: { north: 24.545, south: 24.5172, east: 54.4467, west: 54.4211 },
    },
    population: 45000,
    villa_count: 1800,
    apartment_count: 3500,
    avg_property_value: 4200000,
    terrain_type: "coastal",
    development_status: "developing",
    landscape_potential: "high",
    active_projects: 15,
    interested_clients: 32,
  },

  // Sharjah Areas
  {
    id: "sharjah_al_khawaneej",
    name_ar: "الخوانيج",
    name_en: "Al Khawaneej",
    emirate: "sharjah",
    coordinates: {
      lat: 25.1926,
      lng: 55.4661,
      bounds: { north: 25.205, south: 25.1802, east: 55.4789, west: 55.4533 },
    },
    population: 68000,
    villa_count: 2100,
    apartment_count: 1500,
    avg_property_value: 1800000,
    terrain_type: "suburban",
    development_status: "established",
    landscape_potential: "medium",
    active_projects: 10,
    interested_clients: 19,
  },

  // Ajman Areas
  {
    id: "ajman_al_nuaimiya",
    name_ar: "النعيمية",
    name_en: "Al Nuaimiya",
    emirate: "ajman",
    coordinates: {
      lat: 25.4052,
      lng: 55.4661,
      bounds: { north: 25.415, south: 25.3954, east: 55.4789, west: 55.4533 },
    },
    population: 125000,
    villa_count: 850,
    apartment_count: 4200,
    avg_property_value: 950000,
    terrain_type: "urban",
    development_status: "established",
    landscape_potential: "medium",
    active_projects: 6,
    interested_clients: 14,
  },

  // RAK Areas
  {
    id: "rak_al_hamra",
    name_ar: "الحمراء",
    name_en: "Al Hamra",
    emirate: "rak",
    coordinates: {
      lat: 25.6816,
      lng: 55.7369,
      bounds: { north: 25.695, south: 25.6682, east: 55.7497, west: 55.7241 },
    },
    population: 35000,
    villa_count: 1200,
    apartment_count: 2800,
    avg_property_value: 1650000,
    terrain_type: "coastal",
    development_status: "developing",
    landscape_potential: "high",
    active_projects: 8,
    interested_clients: 16,
  },
];

// Live Projects Data
export const liveProjectsData: LiveProject[] = [
  {
    id: "LP_2024_001",
    title_ar: "حديقة فيلا الياسمين الفاخرة",
    title_en: "Luxury Jasmine Villa Garden",
    client_name: "عائلة المحمد",
    area_id: "dubai_jumeirah",
    coordinates: { lat: 25.2048, lng: 55.2708 },
    project_type: "villa_garden",
    status: "execution",
    budget: 450000,
    start_date: "2024-01-15",
    estimated_completion: "2024-03-20",
    progress_percentage: 75,
    assigned_team: ["ahmed_almarzoqi", "fatima_alsalem", "khalid_alshamsi"],
    priority: "high",
    client_tier: "vip",
    terrain_analysis: {
      soil_type: "sandy_clay",
      drainage: "good",
      sun_exposure: "full_sun",
      existing_vegetation: ["date_palms", "bougainvillea", "grass_area"],
    },
    ai_recommendations: [
      "استخدام نباتات محلية مقاومة للحرارة",
      "نظام ري ذكي بالتنقيط",
      "إضاءة LED موفرة للطاقة",
      "مسارات من الحجر الطبيعي",
    ],
    last_update: "2024-01-22T14:30:00Z",
  },
  {
    id: "LP_2024_002",
    title_ar: "منتجع الخضراء التجاري - المرحلة الثانية",
    title_en: "Al Khadra Commercial Resort - Phase 2",
    client_name: "شركة الرؤية العقارية",
    area_id: "abudhabi_saadiyat",
    coordinates: { lat: 24.5311, lng: 54.4339 },
    project_type: "commercial_landscape",
    status: "design",
    budget: 1200000,
    start_date: "2024-02-01",
    estimated_completion: "2024-06-30",
    progress_percentage: 25,
    assigned_team: ["sara_alfalasi", "omar_alkhalid", "nora_alawadhi"],
    priority: "high",
    client_tier: "premium",
    terrain_analysis: {
      soil_type: "coastal_sand",
      drainage: "requires_improvement",
      sun_exposure: "partial_shade",
      existing_vegetation: ["mangroves", "palm_trees"],
    },
    ai_recommendations: [
      "تحسين نظام الصرف ��بل الزراعة",
      "نباتات مقاومة للملوحة",
      "نظام ري بالرش للمساحات الكبيرة",
      "مناطق استراحة مظللة",
    ],
    last_update: "2024-01-22T16:45:00Z",
  },
  {
    id: "LP_2024_003",
    title_ar: "صيانة وتطوير حديقة قصر الإمارات",
    title_en: "Emirates Palace Garden Maintenance & Development",
    client_name: "فندق قصر الإمارات",
    area_id: "abudhabi_khalifa_city",
    coordinates: { lat: 24.4292, lng: 54.6094 },
    project_type: "maintenance",
    status: "execution",
    budget: 850000,
    start_date: "2024-01-01",
    estimated_completion: "2024-12-31",
    progress_percentage: 45,
    assigned_team: ["mohammed_alnuaimi", "aisha_alzaabi"],
    priority: "medium",
    client_tier: "premium",
    terrain_analysis: {
      soil_type: "clay_loam",
      drainage: "excellent",
      sun_exposure: "mixed",
      existing_vegetation: ["royal_palms", "roses", "tropical_plants"],
    },
    ai_recommendations: [
      "صيانة دورية شهرية للنباتات النادرة",
      "نظام مراقبة ذكي للري",
      "إضافة نباتات عطرية للممرات",
      "تحديث نظام الإضاءة الليلية",
    ],
    last_update: "2024-01-22T11:20:00Z",
  },
];

// Smart Notifications Data
export const smartNotificationsData: SmartNotification[] = [
  {
    id: "SN_2024_001",
    type: "new_construction",
    title_ar: "🏗️ فيلا جديدة قيد الإنشاء - الخالدية",
    title_en: "🏗️ New Villa Under Construction - Al Khalidiyah",
    description_ar:
      "تم رصد بناء فيلا جديدة بمساحة 800 متر مربع في منطقة الخالدية. فرصة ممتازة لعرض خدمات التصميم.",
    description_en:
      "New villa construction detected with 800 sqm area in Al Khalidiyah. Excellent opportunity for design services.",
    area_id: "abudhabi_khalifa_city",
    coordinates: { lat: 24.425, lng: 54.605 },
    property_details: {
      type: "villa",
      size_sqm: 800,
      estimated_value: 4500000,
      owner_type: "individual",
    },
    opportunity_score: 92,
    created_at: "2024-01-22T09:15:00Z",
    expires_at: "2024-01-29T09:15:00Z",
    is_processed: false,
    generated_leads: 0,
  },
  {
    id: "SN_2024_002",
    type: "property_sale",
    title_ar: "🏡 بيع فيلا بحديقة كبيرة - الجميرا",
    title_en: "🏡 Villa with Large Garden Sold - Jumeirah",
    description_ar:
      "تم بيع فيلا مع حديقة 1200 متر مربع. المالك الجديد قد يحتاج خدمات تجديد المناظر الطبيعية.",
    description_en:
      "Villa with 1200 sqm garden sold. New owner may need landscape renovation services.",
    area_id: "dubai_jumeirah",
    coordinates: { lat: 25.21, lng: 55.275 },
    property_details: {
      type: "villa",
      size_sqm: 1200,
      estimated_value: 6200000,
      owner_type: "individual",
    },
    opportunity_score: 87,
    created_at: "2024-01-22T11:30:00Z",
    expires_at: "2024-01-29T11:30:00Z",
    is_processed: false,
    generated_leads: 1,
  },
  {
    id: "SN_2024_003",
    type: "development_permit",
    title_ar: "📋 ترخيص مجمع سكني جديد - الشارقة",
    title_en: "📋 New Residential Complex Permit - Sharjah",
    description_ar:
      "تم منح ترخيص لبناء مجمع سكني يضم 50 فيلا في الخوانيج. فرصة للحصول على عقد شامل.",
    description_en:
      "Permit granted for 50-villa residential complex in Al Khawaneej. Opportunity for comprehensive contract.",
    area_id: "sharjah_al_khawaneej",
    coordinates: { lat: 25.19, lng: 55.47 },
    property_details: {
      type: "commercial",
      size_sqm: 25000,
      estimated_value: 75000000,
      owner_type: "developer",
    },
    opportunity_score: 95,
    created_at: "2024-01-22T14:00:00Z",
    expires_at: "2024-02-05T14:00:00Z",
    is_processed: false,
    generated_leads: 0,
  },
];

// Market Data
export const marketDataSample: UAEMarketData[] = [
  {
    id: "MD_2024_W3_dubai_jumeirah",
    area_id: "dubai_jumeirah",
    date: "2024-01-22",
    property_transactions: 28,
    avg_transaction_value: 3800000,
    new_constructions: 5,
    landscape_service_demand: 85,
    seasonal_trends: {
      winter_demand: 95,
      summer_demand: 45,
      peak_months: ["November", "December", "January", "February", "March"],
    },
    competitor_activity: 68,
    material_costs: {
      plants: 15.5,
      irrigation: 12.8,
      lighting: 18.2,
      maintenance: 22.1,
    },
  },
];

// Helper Functions
export const getAreasByEmirate = (emirate: string): UAEArea[] => {
  return uaeAreasData.filter((area) => area.emirate === emirate);
};

export const getActiveProjectsByArea = (areaId: string): LiveProject[] => {
  return liveProjectsData.filter(
    (project) => project.area_id === areaId && project.status !== "completed",
  );
};

export const getHighOpportunityNotifications = (): SmartNotification[] => {
  return smartNotificationsData
    .filter(
      (notification) =>
        notification.opportunity_score >= 80 && !notification.is_processed,
    )
    .sort((a, b) => b.opportunity_score - a.opportunity_score);
};

export const calculateAreaPotential = (areaId: string): number => {
  const area = uaeAreasData.find((a) => a.id === areaId);
  const activeProjects = getActiveProjectsByArea(areaId).length;
  const notifications = smartNotificationsData.filter(
    (n) => n.area_id === areaId,
  ).length;

  if (!area) return 0;

  const baseScore =
    area.landscape_potential === "high"
      ? 80
      : area.landscape_potential === "medium"
        ? 60
        : 40;
  const projectBonus = Math.min(activeProjects * 5, 15);
  const opportunityBonus = Math.min(notifications * 3, 10);

  return Math.min(baseScore + projectBonus + opportunityBonus, 100);
};
