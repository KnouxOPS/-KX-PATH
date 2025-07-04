const mongoose = require("mongoose");

const mapDataSchema = new mongoose.Schema(
  {
    zoneName: {
      type: String,
      required: [true, "Zone name is required"],
      trim: true,
      maxlength: [200, "Zone name cannot exceed 200 characters"],
    },
    zoneNameArabic: {
      type: String,
      trim: true,
      maxlength: [200, "Arabic zone name cannot exceed 200 characters"],
    },
    emirate: {
      type: String,
      required: [true, "Emirate is required"],
      enum: {
        values: [
          "Abu Dhabi",
          "Dubai",
          "Sharjah",
          "Ajman",
          "Ras Al Khaimah",
          "Umm Al Quwain",
          "Fujairah",
        ],
        message: "Invalid emirate",
      },
    },
    coordinates: {
      type: {
        type: String,
        enum: ["Polygon"],
        required: true,
      },
      coordinates: {
        type: [[[Number]]], // GeoJSON Polygon format
        required: true,
        validate: {
          validator: function (coords) {
            // Basic validation for UAE coordinates
            return coords[0].every(
              (point) =>
                point[0] >= 51 &&
                point[0] <= 57 && // Longitude
                point[1] >= 22 &&
                point[1] <= 27, // Latitude
            );
          },
          message: "Coordinates must be within UAE bounds",
        },
      },
    },
    centerPoint: {
      latitude: {
        type: Number,
        required: true,
        min: [22, "Latitude must be within UAE bounds"],
        max: [27, "Latitude must be within UAE bounds"],
      },
      longitude: {
        type: Number,
        required: true,
        min: [51, "Longitude must be within UAE bounds"],
        max: [57, "Longitude must be within UAE bounds"],
      },
    },
    terrainType: {
      type: String,
      required: [true, "Terrain type is required"],
      enum: {
        values: [
          "sandy",
          "rocky",
          "flat",
          "mountainous",
          "coastal",
          "urban",
          "desert",
          "oasis",
        ],
        message: "Invalid terrain type",
      },
    },
    demographics: {
      population: {
        type: Number,
        min: [0, "Population cannot be negative"],
        default: 0,
      },
      households: {
        type: Number,
        min: [0, "Households cannot be negative"],
        default: 0,
      },
      averageIncome: {
        type: Number,
        min: [0, "Average income cannot be negative"],
        default: 0,
      },
      predominantNationality: {
        type: String,
        enum: [
          "UAE",
          "Indian",
          "Pakistani",
          "Egyptian",
          "Filipino",
          "Bangladeshi",
          "Iranian",
          "Other",
        ],
        default: "UAE",
      },
    },
    constructionDensity: {
      type: Number,
      required: [true, "Construction density is required"],
      min: [0, "Construction density cannot be negative"],
      max: [100, "Construction density cannot exceed 100%"],
    },
    propertyTypes: [
      {
        type: {
          type: String,
          enum: [
            "villa",
            "apartment",
            "townhouse",
            "commercial",
            "industrial",
            "mixed_use",
          ],
          required: true,
        },
        count: {
          type: Number,
          required: true,
          min: 0,
        },
        averageValue: {
          type: Number,
          min: 0,
        },
        averageSize: {
          type: Number, // in sqm
          min: 0,
        },
      },
    ],
    infrastructure: {
      roadQuality: {
        type: String,
        enum: ["excellent", "good", "fair", "poor"],
        default: "good",
      },
      publicTransport: {
        type: Boolean,
        default: false,
      },
      utilities: {
        electricity: { type: Boolean, default: true },
        water: { type: Boolean, default: true },
        sewage: { type: Boolean, default: true },
        gas: { type: Boolean, default: false },
        internet: { type: Boolean, default: true },
      },
      nearbyAmenities: [
        {
          type: {
            type: String,
            enum: [
              "school",
              "hospital",
              "mosque",
              "shopping_mall",
              "supermarket",
              "restaurant",
              "park",
              "beach",
              "metro_station",
              "bus_stop",
            ],
            required: true,
          },
          name: { type: String, required: true },
          distance: { type: Number, required: true }, // in meters
          rating: { type: Number, min: 1, max: 5 },
        },
      ],
      developmentProjects: [
        {
          name: { type: String, required: true },
          type: {
            type: String,
            enum: [
              "residential",
              "commercial",
              "infrastructure",
              "recreational",
            ],
            required: true,
          },
          status: {
            type: String,
            enum: ["planned", "approved", "under_construction", "completed"],
            required: true,
          },
          estimatedCompletion: { type: Date },
          impact: {
            type: String,
            enum: ["low", "medium", "high"],
            required: true,
          },
        },
      ],
    },
    marketData: {
      averagePropertyPrice: {
        type: Number,
        min: [0, "Average property price cannot be negative"],
        default: 0,
      },
      pricePerSqm: {
        type: Number,
        min: [0, "Price per sqm cannot be negative"],
        default: 0,
      },
      priceGrowthRate: {
        type: Number, // percentage
        default: 0,
      },
      rentalYield: {
        type: Number, // percentage
        min: [0, "Rental yield cannot be negative"],
        max: [100, "Rental yield cannot exceed 100%"],
        default: 0,
      },
      demandLevel: {
        type: String,
        enum: ["very_low", "low", "medium", "high", "very_high"],
        default: "medium",
      },
      marketTrend: {
        type: String,
        enum: ["declining", "stable", "growing", "booming"],
        default: "stable",
      },
    },
    landscapingPotential: {
      score: {
        type: Number,
        required: [true, "Landscaping potential score is required"],
        min: [0, "Score cannot be negative"],
        max: [100, "Score cannot exceed 100"],
      },
      factors: {
        climateSuitability: { type: Number, min: 0, max: 100 },
        soilQuality: { type: Number, min: 0, max: 100 },
        waterAvailability: { type: Number, min: 0, max: 100 },
        sunExposure: { type: Number, min: 0, max: 100 },
        accessibility: { type: Number, min: 0, max: 100 },
      },
      seasonalConsiderations: [
        {
          season: {
            type: String,
            enum: ["spring", "summer", "autumn", "winter"],
            required: true,
          },
          challenges: [{ type: String }],
          opportunities: [{ type: String }],
          recommendedActivities: [{ type: String }],
        },
      ],
      recommendedPlants: [
        {
          name: { type: String, required: true },
          scientificName: { type: String },
          suitabilityScore: { type: Number, min: 0, max: 100, required: true },
          maintenanceLevel: { type: String, enum: ["low", "medium", "high"] },
          waterRequirement: { type: String, enum: ["low", "medium", "high"] },
        },
      ],
    },
    businessOpportunities: {
      competitorDensity: {
        type: Number,
        min: [0, "Competitor density cannot be negative"],
        default: 0,
      },
      marketSaturation: {
        type: String,
        enum: ["undersaturated", "optimal", "saturated", "oversaturated"],
        default: "optimal",
      },
      averageProjectValue: {
        type: Number,
        min: [0, "Average project value cannot be negative"],
        default: 0,
      },
      seasonalDemand: [
        {
          month: {
            type: Number,
            min: 1,
            max: 12,
            required: true,
          },
          demandLevel: {
            type: Number,
            min: 0,
            max: 100,
            required: true,
          },
          averageProjects: { type: Number, min: 0, default: 0 },
        },
      ],
      growthProjection: {
        type: Number, // percentage for next 5 years
        default: 0,
      },
    },
    environmentalFactors: {
      airQuality: {
        type: String,
        enum: ["excellent", "good", "moderate", "poor", "hazardous"],
        default: "good",
      },
      averageTemperature: {
        summer: { type: Number, required: true },
        winter: { type: Number, required: true },
      },
      humidity: {
        summer: { type: Number, min: 0, max: 100, required: true },
        winter: { type: Number, min: 0, max: 100, required: true },
      },
      rainfall: {
        annual: { type: Number, min: 0, required: true }, // in mm
        pattern: {
          type: String,
          enum: ["minimal", "seasonal", "moderate", "heavy"],
          required: true,
        },
      },
      windPatterns: [
        {
          direction: { type: String, required: true },
          season: {
            type: String,
            enum: ["spring", "summer", "autumn", "winter"],
          },
          averageSpeed: { type: Number, min: 0 }, // km/h
          impact: {
            type: String,
            enum: ["beneficial", "neutral", "challenging"],
          },
        },
      ],
      naturalHazards: [
        {
          type: {
            type: String,
            enum: ["sandstorm", "flooding", "extreme_heat", "high_winds"],
            required: true,
          },
          frequency: {
            type: String,
            enum: ["rare", "occasional", "seasonal", "frequent"],
            required: true,
          },
          severity: {
            type: String,
            enum: ["low", "medium", "high"],
            required: true,
          },
          seasonality: [
            {
              type: String,
              enum: ["spring", "summer", "autumn", "winter"],
            },
          ],
        },
      ],
    },
    metadata: {
      dataSource: {
        type: String,
        enum: [
          "government",
          "satellite",
          "survey",
          "estimation",
          "third_party",
        ],
        default: "estimation",
      },
      accuracy: {
        type: String,
        enum: ["low", "medium", "high", "very_high"],
        default: "medium",
      },
      lastSurveyDate: {
        type: Date,
        default: null,
      },
      nextUpdateDue: {
        type: Date,
        default: function () {
          return new Date(Date.now() + 365 * 24 * 60 * 60 * 1000); // 1 year from now
        },
      },
    },
  },
  {
    timestamps: true,
    collection: "map_data",
  },
);

// GeoSpatial index for location queries
mapDataSchema.index({ coordinates: "2dsphere" });
mapDataSchema.index({ centerPoint: "2dsphere" });

// Regular indexes
mapDataSchema.index({ emirate: 1 });
mapDataSchema.index({ terrainType: 1 });
mapDataSchema.index({ "landscapingPotential.score": -1 });
mapDataSchema.index({ "marketData.demandLevel": 1 });
mapDataSchema.index({ updatedAt: -1 });

// Text search index
mapDataSchema.index({
  zoneName: "text",
  zoneNameArabic: "text",
  "infrastructure.nearbyAmenities.name": "text",
});

// Virtual for display name
mapDataSchema.virtual("displayName").get(function () {
  return this.zoneNameArabic || this.zoneName;
});

// Method to find nearby zones
mapDataSchema.methods.findNearbyZones = function (radiusInKm = 10) {
  return this.constructor.find({
    centerPoint: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [this.centerPoint.longitude, this.centerPoint.latitude],
        },
        $maxDistance: radiusInKm * 1000, // Convert km to meters
      },
    },
    _id: { $ne: this._id },
  });
};

// Method to calculate business opportunity score
mapDataSchema.methods.calculateBusinessScore = function () {
  let score = 0;

  // Market factors (40%)
  if (this.marketData.demandLevel === "very_high") score += 20;
  else if (this.marketData.demandLevel === "high") score += 15;
  else if (this.marketData.demandLevel === "medium") score += 10;

  if (this.businessOpportunities.marketSaturation === "undersaturated")
    score += 15;
  else if (this.businessOpportunities.marketSaturation === "optimal")
    score += 10;

  if (this.businessOpportunities.averageProjectValue > 100000) score += 5;

  // Demographics (20%)
  if (this.demographics.averageIncome > 30000) score += 10;
  else if (this.demographics.averageIncome > 20000) score += 7;
  else if (this.demographics.averageIncome > 15000) score += 5;

  if (this.demographics.population > 50000) score += 5;
  else if (this.demographics.population > 20000) score += 3;

  // Landscaping potential (25%)
  score += (this.landscapingPotential.score / 100) * 25;

  // Infrastructure (15%)
  if (this.infrastructure.roadQuality === "excellent") score += 5;
  else if (this.infrastructure.roadQuality === "good") score += 3;

  if (this.infrastructure.publicTransport) score += 3;

  const utilitiesCount = Object.values(this.infrastructure.utilities).filter(
    Boolean,
  ).length;
  score += (utilitiesCount / 5) * 7; // Max 7 points for all utilities

  return Math.min(Math.round(score), 100);
};

// Static method to find zones by emirate
mapDataSchema.statics.findByEmirate = function (emirate) {
  return this.find({ emirate });
};

// Static method to find high-potential zones
mapDataSchema.statics.findHighPotential = function (minScore = 70) {
  return this.find({ "landscapingPotential.score": { $gte: minScore } });
};

// Static method to find zones within radius
mapDataSchema.statics.findWithinRadius = function (
  longitude,
  latitude,
  radiusInKm,
) {
  return this.find({
    centerPoint: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [longitude, latitude],
        },
        $maxDistance: radiusInKm * 1000,
      },
    },
  });
};

const MapData = mongoose.model("MapData", mapDataSchema);

// Construction Alerts Schema
const constructionAlertSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Alert title is required"],
      trim: true,
      maxlength: [300, "Title cannot exceed 300 characters"],
    },
    titleArabic: {
      type: String,
      trim: true,
      maxlength: [300, "Arabic title cannot exceed 300 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },
    descriptionArabic: {
      type: String,
      trim: true,
      maxlength: [1000, "Arabic description cannot exceed 1000 characters"],
    },
    coordinates: {
      latitude: {
        type: Number,
        required: [true, "Latitude is required"],
        min: [22, "Latitude must be within UAE bounds"],
        max: [27, "Latitude must be within UAE bounds"],
      },
      longitude: {
        type: Number,
        required: [true, "Longitude is required"],
        min: [51, "Longitude must be within UAE bounds"],
        max: [57, "Longitude must be within UAE bounds"],
      },
    },
    zoneId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MapData",
      required: [true, "Zone ID is required"],
    },
    alertType: {
      type: String,
      required: [true, "Alert type is required"],
      enum: {
        values: [
          "new_construction",
          "villa_purchased",
          "renovation",
          "demolition",
          "land_development",
          "permit_issued",
          "project_completed",
          "for_sale",
          "for_rent",
          "auction",
          "investment_opportunity",
        ],
        message: "Invalid alert type",
      },
    },
    propertyDetails: {
      type: {
        type: String,
        enum: [
          "villa",
          "apartment",
          "townhouse",
          "commercial",
          "land",
          "mixed_use",
        ],
        required: true,
      },
      size: {
        plotSize: { type: Number, min: 0 }, // sqm
        builtUpArea: { type: Number, min: 0 }, // sqm
        bedrooms: { type: Number, min: 0 },
        bathrooms: { type: Number, min: 0 },
      },
      value: {
        estimated: { type: Number, min: 0 },
        currency: { type: String, default: "AED" },
        pricePerSqm: { type: Number, min: 0 },
      },
      features: [
        {
          type: String,
          enum: [
            "garden",
            "pool",
            "garage",
            "maid_room",
            "driver_room",
            "balcony",
            "terrace",
            "basement",
            "elevator",
            "security",
          ],
        },
      ],
    },
    source: {
      type: String,
      required: [true, "Source is required"],
      enum: {
        values: [
          "DLD_Dubai",
          "RERA_Sharjah",
          "ADRE_AbuDhabi",
          "Ajman_Municipality",
          "RAK_Municipality",
          "UAQ_Municipality",
          "Fujairah_Municipality",
          "Manual_Entry",
          "Partner_API",
          "Web_Scraping",
          "Satellite_Analysis",
        ],
        message: "Invalid source",
      },
    },
    sourceDetails: {
      reference: { type: String }, // permit number, transaction ID, etc.
      url: { type: String },
      confidence: {
        type: Number,
        min: 0,
        max: 100,
        default: 75,
      },
      verifiedAt: { type: Date },
      verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
    imageUrl: {
      type: String,
      validate: {
        validator: function (url) {
          if (!url) return true; // Optional field
          return /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(url);
        },
        message: "Image URL must be a valid image URL",
      },
    },
    attachments: [
      {
        type: {
          type: String,
          enum: ["image", "document", "map", "permit"],
          required: true,
        },
        url: { type: String, required: true },
        filename: { type: String, required: true },
        description: { type: String },
      },
    ],
    priority: {
      type: String,
      enum: ["low", "medium", "high", "urgent"],
      default: "medium",
    },
    status: {
      type: String,
      enum: ["active", "processed", "expired", "invalid", "duplicate"],
      default: "active",
    },
    businessPotential: {
      score: {
        type: Number,
        min: 0,
        max: 100,
        required: true,
      },
      factors: {
        propertyValue: { type: Number, min: 0, max: 100 },
        location: { type: Number, min: 0, max: 100 },
        timing: { type: Number, min: 0, max: 100 },
        competition: { type: Number, min: 0, max: 100 },
        clientProfile: { type: Number, min: 0, max: 100 },
      },
      estimatedProjectValue: {
        min: { type: Number, min: 0 },
        max: { type: Number, min: 0 },
        most_likely: { type: Number, min: 0 },
      },
    },
    targetAudience: [
      {
        companyType: {
          type: String,
          enum: [
            "landscape_design",
            "construction",
            "real_estate",
            "interior_design",
          ],
          required: true,
        },
        relevanceScore: {
          type: Number,
          min: 0,
          max: 100,
          required: true,
        },
        estimatedInterest: {
          type: String,
          enum: ["low", "medium", "high"],
          required: true,
        },
      },
    ],
    expiresAt: {
      type: Date,
      required: true,
      default: function () {
        return new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days from now
      },
    },
    interactions: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        action: {
          type: String,
          enum: ["viewed", "saved", "contacted", "quoted", "ignored"],
          required: true,
        },
        timestamp: { type: Date, default: Date.now },
        notes: { type: String, maxlength: 500 },
      },
    ],
    generatedLeads: {
      count: { type: Number, min: 0, default: 0 },
      companies: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Company",
        },
      ],
      successfulContacts: { type: Number, min: 0, default: 0 },
    },
  },
  {
    timestamps: true,
    collection: "construction_alerts",
  },
);

// Indexes for Construction Alerts
constructionAlertSchema.index({ coordinates: "2dsphere" });
constructionAlertSchema.index({ zoneId: 1 });
constructionAlertSchema.index({ alertType: 1 });
constructionAlertSchema.index({ status: 1 });
constructionAlertSchema.index({ priority: 1, createdAt: -1 });
constructionAlertSchema.index({ "businessPotential.score": -1 });
constructionAlertSchema.index({ expiresAt: 1 });
constructionAlertSchema.index({ source: 1 });

// TTL index to automatically remove expired alerts
constructionAlertSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Method to calculate business potential score
constructionAlertSchema.methods.calculateBusinessPotential = function () {
  let score = 0;

  // Property value factor (30%)
  if (this.propertyDetails.value.estimated > 5000000) score += 30;
  else if (this.propertyDetails.value.estimated > 2000000) score += 25;
  else if (this.propertyDetails.value.estimated > 1000000) score += 20;
  else if (this.propertyDetails.value.estimated > 500000) score += 15;
  else score += 10;

  // Alert type factor (25%)
  switch (this.alertType) {
    case "new_construction":
      score += 25;
      break;
    case "villa_purchased":
      score += 20;
      break;
    case "renovation":
      score += 15;
      break;
    case "land_development":
      score += 22;
      break;
    default:
      score += 10;
  }

  // Property size factor (20%)
  if (this.propertyDetails.size.plotSize > 2000) score += 20;
  else if (this.propertyDetails.size.plotSize > 1000) score += 15;
  else if (this.propertyDetails.size.plotSize > 500) score += 10;
  else score += 5;

  // Location factor (15%)
  // This would be calculated based on zone data
  score += 15; // Default for now

  // Timing factor (10%)
  const daysSinceCreated = Math.floor(
    (Date.now() - this.createdAt) / (1000 * 60 * 60 * 24),
  );
  if (daysSinceCreated <= 1) score += 10;
  else if (daysSinceCreated <= 7) score += 8;
  else if (daysSinceCreated <= 14) score += 5;
  else score += 2;

  this.businessPotential.score = Math.min(score, 100);
  return this.businessPotential.score;
};

// Method to add interaction
constructionAlertSchema.methods.addInteraction = function (
  userId,
  action,
  notes = "",
) {
  this.interactions.push({
    userId,
    action,
    notes,
    timestamp: new Date(),
  });

  if (action === "contacted") {
    this.generatedLeads.successfulContacts += 1;
  }

  return this.save();
};

// Static method to find alerts by type
constructionAlertSchema.statics.findByType = function (
  alertType,
  status = "active",
) {
  return this.find({ alertType, status });
};

// Static method to find high-potential alerts
constructionAlertSchema.statics.findHighPotential = function (minScore = 80) {
  return this.find({
    "businessPotential.score": { $gte: minScore },
    status: "active",
    expiresAt: { $gt: new Date() },
  });
};

const ConstructionAlert = mongoose.model(
  "ConstructionAlert",
  constructionAlertSchema,
);

module.exports = { MapData, ConstructionAlert };
