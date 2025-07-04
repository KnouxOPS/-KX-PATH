const mongoose = require("mongoose");

const aiPlanSchema = new mongoose.Schema(
  {
    gardenRequestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GardenRequest",
      required: [true, "Garden request ID is required"],
      unique: true, // One AI plan per garden request
    },
    generationMetadata: {
      modelUsed: {
        type: String,
        required: [true, "AI model information is required"],
        enum: {
          values: [
            "KnoxDesign-V1",
            "KnoxDesign-V2",
            "StableDiffusion-Landscape",
            "DALL-E-3-Garden",
            "Midjourney-V6",
            "Custom-UAE-Landscape",
            "KnoxPlants-Classifier",
            "KnoxQuote-Calculator",
          ],
          message: "Invalid AI model specified",
        },
      },
      prompt: {
        type: String,
        required: [true, "Generation prompt is required"],
        maxlength: [2000, "Prompt cannot exceed 2000 characters"],
      },
      parameters: {
        style: { type: String, default: "realistic" },
        quality: {
          type: String,
          enum: ["draft", "standard", "high", "premium"],
          default: "standard",
        },
        iterations: { type: Number, min: 1, max: 10, default: 1 },
        seed: { type: Number, default: null },
        guidance: { type: Number, min: 1, max: 20, default: 7.5 },
        steps: { type: Number, min: 10, max: 150, default: 50 },
      },
      generationTime: {
        type: Number, // in seconds
        min: [0, "Generation time cannot be negative"],
        default: 0,
      },
      cost: {
        type: Number, // in AED
        min: [0, "Cost cannot be negative"],
        default: 0,
      },
    },
    designImages: [
      {
        url: {
          type: String,
          required: [true, "Image URL is required"],
          validate: {
            validator: function (url) {
              return /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(url);
            },
            message: "Image URL must be a valid image URL",
          },
        },
        type: {
          type: String,
          enum: {
            values: [
              "overview",
              "detail",
              "night-view",
              "seasonal",
              "3d-render",
              "blueprint",
              "elevation",
            ],
            message: "Invalid image type",
          },
          required: true,
        },
        description: {
          type: String,
          maxlength: [300, "Image description cannot exceed 300 characters"],
        },
        resolution: {
          width: { type: Number, required: true },
          height: { type: Number, required: true },
        },
        fileSize: {
          type: Number, // in bytes
          required: true,
        },
        metadata: {
          cameraAngle: { type: String },
          timeOfDay: { type: String },
          season: { type: String },
          weatherCondition: { type: String },
        },
      },
    ],
    designSummary: {
      style: {
        type: String,
        required: [true, "Design style is required"],
      },
      theme: {
        type: String,
        required: [true, "Design theme is required"],
      },
      colorPalette: [
        {
          name: { type: String, required: true },
          hex: {
            type: String,
            required: true,
            validate: {
              validator: function (hex) {
                return /^#[0-9A-F]{6}$/i.test(hex);
              },
              message: "Invalid hex color format",
            },
          },
        },
      ],
      keyFeatures: [
        {
          name: { type: String, required: true },
          description: { type: String, required: true },
          location: { type: String }, // where in the garden
          estimatedCost: { type: Number, min: 0 },
        },
      ],
      plantingSuggestions: [
        {
          plantName: { type: String, required: true },
          scientificName: { type: String },
          category: {
            type: String,
            enum: [
              "tree",
              "shrub",
              "flower",
              "grass",
              "succulent",
              "palm",
              "climbing",
            ],
            required: true,
          },
          quantity: { type: Number, min: 1, required: true },
          size: {
            type: String,
            enum: ["small", "medium", "large", "extra-large"],
            required: true,
          },
          placement: { type: String, required: true },
          careLevel: {
            type: String,
            enum: ["low", "medium", "high"],
            default: "medium",
          },
          waterRequirement: {
            type: String,
            enum: ["low", "medium", "high"],
            default: "medium",
          },
          sunRequirement: {
            type: String,
            enum: ["full-sun", "partial-sun", "shade"],
            default: "full-sun",
          },
          seasonality: {
            bloomingSeason: [{ type: String }],
            bestPlantingTime: [{ type: String }],
          },
          estimatedCost: { type: Number, min: 0 },
          notes: { type: String, maxlength: 200 },
        },
      ],
      materialsList: [
        {
          category: {
            type: String,
            enum: [
              "hardscape",
              "softscape",
              "lighting",
              "irrigation",
              "furniture",
              "decoration",
            ],
            required: true,
          },
          item: { type: String, required: true },
          specification: { type: String },
          quantity: { type: Number, min: 0, required: true },
          unit: { type: String, required: true }, // sqm, pcs, meters, etc.
          estimatedCost: { type: Number, min: 0 },
          supplier: { type: String },
          notes: { type: String },
        },
      ],
    },
    costBreakdown: {
      planning: { type: Number, min: 0, default: 0 },
      materials: { type: Number, min: 0, default: 0 },
      plants: { type: Number, min: 0, default: 0 },
      labor: { type: Number, min: 0, default: 0 },
      equipment: { type: Number, min: 0, default: 0 },
      permits: { type: Number, min: 0, default: 0 },
      contingency: { type: Number, min: 0, default: 0 },
      total: { type: Number, min: 0, required: true },
    },
    timeline: {
      phases: [
        {
          name: { type: String, required: true },
          description: { type: String },
          duration: { type: Number, required: true }, // in days
          dependencies: [{ type: String }], // names of other phases
          tasks: [
            {
              name: { type: String, required: true },
              duration: { type: Number, required: true },
              resources: [{ type: String }],
            },
          ],
        },
      ],
      totalDuration: { type: Number, required: true }, // in days
      criticalPath: [{ type: String }],
      seasonalConsiderations: [
        {
          season: {
            type: String,
            enum: ["spring", "summer", "autumn", "winter"],
          },
          activities: [{ type: String }],
          restrictions: [{ type: String }],
        },
      ],
    },
    terrainOverlay: {
      topographyData: {
        type: String, // JSON string or file reference
        default: null,
      },
      soilAnalysis: {
        ph: { type: Number, min: 0, max: 14 },
        drainage: { type: String, enum: ["poor", "fair", "good", "excellent"] },
        nutrients: {
          nitrogen: { type: String, enum: ["low", "medium", "high"] },
          phosphorus: { type: String, enum: ["low", "medium", "high"] },
          potassium: { type: String, enum: ["low", "medium", "high"] },
        },
        recommendations: [{ type: String }],
      },
      microclimate: {
        sunExposure: [
          {
            area: { type: String },
            hours: { type: Number, min: 0, max: 24 },
            season: { type: String },
          },
        ],
        windPatterns: [
          {
            direction: { type: String },
            strength: { type: String, enum: ["light", "moderate", "strong"] },
            season: { type: String },
          },
        ],
        moistureZones: [
          {
            area: { type: String },
            level: { type: String, enum: ["dry", "moderate", "moist", "wet"] },
          },
        ],
      },
    },
    approvals: {
      approvedByClient: {
        status: { type: Boolean, default: false },
        approvedAt: { type: Date, default: null },
        comments: { type: String, maxlength: 500 },
      },
      approvedByCompany: {
        status: { type: Boolean, default: false },
        approvedAt: { type: Date, default: null },
        approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        technicalNotes: { type: String, maxlength: 1000 },
      },
      revisionRequests: [
        {
          requestedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
          },
          requestType: {
            type: String,
            enum: ["client", "company"],
            required: true,
          },
          reason: { type: String, required: true, maxlength: 500 },
          specificChanges: [{ type: String }],
          priority: {
            type: String,
            enum: ["low", "medium", "high"],
            default: "medium",
          },
          requestedAt: { type: Date, default: Date.now },
          resolvedAt: { type: Date, default: null },
          status: {
            type: String,
            enum: ["pending", "in-progress", "resolved", "rejected"],
            default: "pending",
          },
        },
      ],
    },
    aiConfidenceScore: {
      type: Number,
      min: [0, "Confidence score cannot be negative"],
      max: [100, "Confidence score cannot exceed 100"],
      required: true,
    },
    sustainability: {
      waterEfficiency: {
        score: { type: Number, min: 0, max: 100 },
        features: [{ type: String }],
        annualSaving: { type: Number, min: 0 }, // in liters
      },
      energyEfficiency: {
        score: { type: Number, min: 0, max: 100 },
        features: [{ type: String }],
        annualSaving: { type: Number, min: 0 }, // in kWh
      },
      nativePlantUsage: {
        percentage: { type: Number, min: 0, max: 100 },
        benefits: [{ type: String }],
      },
      carbonFootprint: {
        constructionEmissions: { type: Number, min: 0 }, // in kg CO2
        operationalEmissions: { type: Number }, // annual, can be negative for carbon sinks
        offsetPotential: { type: Number, min: 0 },
      },
    },
    versions: [
      {
        version: { type: Number, required: true },
        changes: [{ type: String }],
        createdAt: { type: Date, default: Date.now },
        reason: { type: String, maxlength: 300 },
      },
    ],
    currentVersion: { type: Number, default: 1 },
  },
  {
    timestamps: true,
    collection: "ai_plans",
  },
);

// Indexes for performance
aiPlanSchema.index({ gardenRequestId: 1 }, { unique: true });
aiPlanSchema.index({ "approvals.approvedByClient.status": 1 });
aiPlanSchema.index({ "approvals.approvedByCompany.status": 1 });
aiPlanSchema.index({ aiConfidenceScore: -1 });
aiPlanSchema.index({ createdAt: -1 });
aiPlanSchema.index({ "generationMetadata.modelUsed": 1 });

// Virtual for total images count
aiPlanSchema.virtual("imagesCount").get(function () {
  return this.designImages.length;
});

// Virtual for approval status
aiPlanSchema.virtual("overallApprovalStatus").get(function () {
  if (
    this.approvals.approvedByClient.status &&
    this.approvals.approvedByCompany.status
  ) {
    return "fully-approved";
  } else if (
    this.approvals.approvedByClient.status ||
    this.approvals.approvedByCompany.status
  ) {
    return "partially-approved";
  } else {
    return "pending-approval";
  }
});

// Virtual for sustainability rating
aiPlanSchema.virtual("sustainabilityRating").get(function () {
  if (!this.sustainability) return "Not Assessed";

  const scores = [
    this.sustainability.waterEfficiency?.score || 0,
    this.sustainability.energyEfficiency?.score || 0,
    this.sustainability.nativePlantUsage?.percentage || 0,
  ];

  const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;

  if (avgScore >= 80) return "Excellent";
  if (avgScore >= 60) return "Good";
  if (avgScore >= 40) return "Fair";
  return "Needs Improvement";
});

// Pre-save middleware to calculate total cost
aiPlanSchema.pre("save", function (next) {
  if (this.costBreakdown) {
    this.costBreakdown.total =
      (this.costBreakdown.planning || 0) +
      (this.costBreakdown.materials || 0) +
      (this.costBreakdown.plants || 0) +
      (this.costBreakdown.labor || 0) +
      (this.costBreakdown.equipment || 0) +
      (this.costBreakdown.permits || 0) +
      (this.costBreakdown.contingency || 0);
  }
  next();
});

// Method to add revision request
aiPlanSchema.methods.addRevisionRequest = function (
  requestedBy,
  requestType,
  reason,
  specificChanges = [],
  priority = "medium",
) {
  this.approvals.revisionRequests.push({
    requestedBy,
    requestType,
    reason,
    specificChanges,
    priority,
    requestedAt: new Date(),
    status: "pending",
  });
  return this.save();
};

// Method to approve by client
aiPlanSchema.methods.approveByClient = function (comments = "") {
  this.approvals.approvedByClient.status = true;
  this.approvals.approvedByClient.approvedAt = new Date();
  this.approvals.approvedByClient.comments = comments;
  return this.save();
};

// Method to approve by company
aiPlanSchema.methods.approveByCompany = function (
  approvedBy,
  technicalNotes = "",
) {
  this.approvals.approvedByCompany.status = true;
  this.approvals.approvedByCompany.approvedAt = new Date();
  this.approvals.approvedByCompany.approvedBy = approvedBy;
  this.approvals.approvedByCompany.technicalNotes = technicalNotes;
  return this.save();
};

// Method to create new version
aiPlanSchema.methods.createNewVersion = function (changes, reason) {
  this.currentVersion += 1;
  this.versions.push({
    version: this.currentVersion,
    changes,
    reason,
    createdAt: new Date(),
  });

  // Reset approvals for new version
  this.approvals.approvedByClient.status = false;
  this.approvals.approvedByCompany.status = false;

  return this.save();
};

// Method to calculate project complexity score
aiPlanSchema.methods.calculateComplexityScore = function () {
  let score = 0;

  // Features complexity
  score += (this.designSummary.keyFeatures?.length || 0) * 10;

  // Plants diversity
  score += (this.designSummary.plantingSuggestions?.length || 0) * 5;

  // Materials variety
  score += (this.designSummary.materialsList?.length || 0) * 3;

  // Timeline phases
  score += (this.timeline.phases?.length || 0) * 8;

  // Cost factor
  if (this.costBreakdown.total > 100000) score += 30;
  else if (this.costBreakdown.total > 50000) score += 20;
  else if (this.costBreakdown.total > 20000) score += 10;

  return Math.min(score, 100);
};

// Static method to find plans by approval status
aiPlanSchema.statics.findByApprovalStatus = function (status) {
  const query = {};

  if (status === "fully-approved") {
    query["approvals.approvedByClient.status"] = true;
    query["approvals.approvedByCompany.status"] = true;
  } else if (status === "pending-approval") {
    query["approvals.approvedByClient.status"] = false;
    query["approvals.approvedByCompany.status"] = false;
  }

  return this.find(query);
};

// Static method to find plans by AI model
aiPlanSchema.statics.findByAIModel = function (modelUsed) {
  return this.find({ "generationMetadata.modelUsed": modelUsed });
};

const AIPlan = mongoose.model("AIPlan", aiPlanSchema);

module.exports = AIPlan;
