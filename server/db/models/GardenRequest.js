const mongoose = require("mongoose");

const gardenRequestSchema = new mongoose.Schema(
  {
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Client ID is required"],
      validate: {
        validator: async function (clientId) {
          const User = mongoose.model("User");
          const client = await User.findById(clientId);
          return (
            client && (client.role === "client" || client.role === "admin")
          );
        },
        message: "Client must exist and have client or admin role",
      },
    },
    title: {
      type: String,
      required: [true, "Garden request title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
      minlength: [5, "Title must be at least 5 characters long"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: [2000, "Description cannot exceed 2000 characters"],
      minlength: [20, "Description must be at least 20 characters long"],
    },
    areaSize: {
      type: Number,
      required: [true, "Area size is required"],
      min: [1, "Area size must be at least 1 square meter"],
      max: [50000, "Area size cannot exceed 50,000 square meters"],
    },
    budgetRange: {
      min: {
        type: Number,
        required: [true, "Minimum budget is required"],
        min: [1000, "Minimum budget must be at least AED 1,000"],
      },
      max: {
        type: Number,
        required: [true, "Maximum budget is required"],
        validate: {
          validator: function (maxBudget) {
            return maxBudget > this.budgetRange.min;
          },
          message: "Maximum budget must be greater than minimum budget",
        },
      },
    },
    preferredStyles: [
      {
        type: String,
        enum: {
          values: [
            "modern",
            "zen",
            "desert",
            "green-roof",
            "traditional-arabic",
            "mediterranean",
            "tropical",
            "minimalist",
            "english-garden",
            "japanese",
            "islamic",
            "contemporary",
            "rustic",
            "formal",
          ],
          message: "Invalid garden style selected",
        },
      },
    ],
    features: {
      hasPool: {
        type: Boolean,
        default: false,
      },
      hasGazebo: {
        type: Boolean,
        default: false,
      },
      hasPlayground: {
        type: Boolean,
        default: false,
      },
      hasBBQArea: {
        type: Boolean,
        default: false,
      },
      hasWaterFeature: {
        type: Boolean,
        default: false,
      },
      hasOutdoorKitchen: {
        type: Boolean,
        default: false,
      },
      hasParkingShade: {
        type: Boolean,
        default: false,
      },
      hasGreenhouse: {
        type: Boolean,
        default: false,
      },
    },
    siteConditions: {
      soilType: {
        type: String,
        enum: {
          values: ["sandy", "clay", "rocky", "mixed", "artificial", "unknown"],
          message: "Invalid soil type",
        },
        default: "unknown",
      },
      sunExposure: {
        type: String,
        enum: {
          values: [
            "full-sun",
            "partial-sun",
            "partial-shade",
            "full-shade",
            "mixed",
          ],
          message: "Invalid sun exposure type",
        },
        default: "full-sun",
      },
      drainage: {
        type: String,
        enum: {
          values: ["excellent", "good", "fair", "poor", "unknown"],
          message: "Invalid drainage condition",
        },
        default: "unknown",
      },
      existingTrees: {
        type: Number,
        min: [0, "Number of existing trees cannot be negative"],
        default: 0,
      },
      slopeCondition: {
        type: String,
        enum: {
          values: ["flat", "gentle-slope", "moderate-slope", "steep-slope"],
          message: "Invalid slope condition",
        },
        default: "flat",
      },
    },
    location: {
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
      city: {
        type: String,
        required: [true, "City is required"],
        trim: true,
      },
      address: {
        type: String,
        required: [true, "Address is required"],
        trim: true,
        maxlength: [500, "Address cannot exceed 500 characters"],
      },
      coordinates: {
        latitude: {
          type: Number,
          min: [22, "Latitude must be within UAE bounds"],
          max: [27, "Latitude must be within UAE bounds"],
        },
        longitude: {
          type: Number,
          min: [51, "Longitude must be within UAE bounds"],
          max: [57, "Longitude must be within UAE bounds"],
        },
      },
    },
    terrainInfoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TerrainInfo",
      default: null,
    },
    status: {
      type: String,
      enum: {
        values: [
          "pending",
          "reviewing",
          "quoted",
          "in_progress",
          "completed",
          "cancelled",
          "rejected",
        ],
        message: "Invalid status",
      },
      default: "pending",
    },
    priority: {
      type: String,
      enum: {
        values: ["low", "medium", "high", "urgent"],
        message: "Invalid priority level",
      },
      default: "medium",
    },
    assignedCompanyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      default: null,
    },
    aiPlanId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AIPlan",
      default: null,
    },
    timeline: {
      estimatedStartDate: {
        type: Date,
        default: null,
      },
      estimatedCompletionDate: {
        type: Date,
        default: null,
      },
      actualStartDate: {
        type: Date,
        default: null,
      },
      actualCompletionDate: {
        type: Date,
        default: null,
      },
    },
    attachments: [
      {
        type: {
          type: String,
          enum: ["image", "document", "video"],
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
        filename: {
          type: String,
          required: true,
        },
        size: {
          type: Number,
          required: true,
        },
        uploadedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    communications: [
      {
        from: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        message: {
          type: String,
          required: true,
          maxlength: [1000, "Message cannot exceed 1000 characters"],
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
        isRead: {
          type: Boolean,
          default: false,
        },
      },
    ],
    ratings: {
      clientRating: {
        stars: {
          type: Number,
          min: 1,
          max: 5,
        },
        comment: {
          type: String,
          maxlength: [500, "Rating comment cannot exceed 500 characters"],
        },
        ratedAt: {
          type: Date,
        },
      },
      companyRating: {
        stars: {
          type: Number,
          min: 1,
          max: 5,
        },
        comment: {
          type: String,
          maxlength: [500, "Rating comment cannot exceed 500 characters"],
        },
        ratedAt: {
          type: Date,
        },
      },
    },
    metadata: {
      source: {
        type: String,
        enum: ["web", "mobile", "phone", "referral"],
        default: "web",
      },
      referralCode: {
        type: String,
        default: null,
      },
      seasonRequested: {
        type: String,
        enum: ["spring", "summer", "autumn", "winter"],
        default: function () {
          const month = new Date().getMonth() + 1;
          if (month >= 3 && month <= 5) return "spring";
          if (month >= 6 && month <= 8) return "summer";
          if (month >= 9 && month <= 11) return "autumn";
          return "winter";
        },
      },
    },
  },
  {
    timestamps: true,
    collection: "garden_requests",
  },
);

// Indexes for performance
gardenRequestSchema.index({ clientId: 1 });
gardenRequestSchema.index({ status: 1 });
gardenRequestSchema.index({ assignedCompanyId: 1 });
gardenRequestSchema.index({ "location.emirate": 1 });
gardenRequestSchema.index({ priority: 1, createdAt: -1 });
gardenRequestSchema.index({ createdAt: -1 });
gardenRequestSchema.index({ "budgetRange.min": 1, "budgetRange.max": 1 });

// Virtual for budget range string
gardenRequestSchema.virtual("budgetRangeString").get(function () {
  return `AED ${this.budgetRange.min.toLocaleString()} - ${this.budgetRange.max.toLocaleString()}`;
});

// Virtual for project duration
gardenRequestSchema.virtual("projectDuration").get(function () {
  if (this.timeline.actualStartDate && this.timeline.actualCompletionDate) {
    const duration = Math.ceil(
      (this.timeline.actualCompletionDate - this.timeline.actualStartDate) /
        (1000 * 60 * 60 * 24),
    );
    return `${duration} days`;
  }
  if (
    this.timeline.estimatedStartDate &&
    this.timeline.estimatedCompletionDate
  ) {
    const duration = Math.ceil(
      (this.timeline.estimatedCompletionDate -
        this.timeline.estimatedStartDate) /
        (1000 * 60 * 60 * 24),
    );
    return `${duration} days (estimated)`;
  }
  return "Not scheduled";
});

// Pre-save middleware to validate budget range
gardenRequestSchema.pre("save", function (next) {
  if (this.budgetRange && this.budgetRange.max <= this.budgetRange.min) {
    return next(
      new Error("Maximum budget must be greater than minimum budget"),
    );
  }
  next();
});

// Method to add communication
gardenRequestSchema.methods.addCommunication = function (fromUserId, message) {
  this.communications.push({
    from: fromUserId,
    message: message,
    timestamp: new Date(),
    isRead: false,
  });
  return this.save();
};

// Method to update status with timestamp
gardenRequestSchema.methods.updateStatus = function (newStatus, userId) {
  const statusHistory = this.metadata.statusHistory || [];
  statusHistory.push({
    status: this.status,
    changedBy: userId,
    changedAt: new Date(),
  });

  this.status = newStatus;
  this.metadata.statusHistory = statusHistory;

  return this.save();
};

// Static method to find requests by emirate
gardenRequestSchema.statics.findByEmirate = function (emirate, status = null) {
  const query = { "location.emirate": emirate };
  if (status) query.status = status;
  return this.find(query);
};

// Static method to find requests within budget range
gardenRequestSchema.statics.findByBudgetRange = function (
  minBudget,
  maxBudget,
) {
  return this.find({
    "budgetRange.min": { $gte: minBudget },
    "budgetRange.max": { $lte: maxBudget },
  });
};

// Method to calculate AI recommendation score
gardenRequestSchema.methods.calculateAIScore = function () {
  let score = 0;

  // Budget factor (higher budget = higher score)
  const avgBudget = (this.budgetRange.min + this.budgetRange.max) / 2;
  if (avgBudget > 100000) score += 30;
  else if (avgBudget > 50000) score += 20;
  else if (avgBudget > 20000) score += 10;

  // Area size factor
  if (this.areaSize > 1000) score += 20;
  else if (this.areaSize > 500) score += 15;
  else if (this.areaSize > 200) score += 10;

  // Features complexity
  const featureCount = Object.values(this.features).filter(Boolean).length;
  score += Math.min(featureCount * 5, 25);

  // Location premium (Dubai/Abu Dhabi higher scores)
  if (["Dubai", "Abu Dhabi"].includes(this.location.emirate)) {
    score += 15;
  } else {
    score += 10;
  }

  // Urgency factor
  if (this.priority === "urgent") score += 10;
  else if (this.priority === "high") score += 5;

  return Math.min(score, 100);
};

const GardenRequest = mongoose.model("GardenRequest", gardenRequestSchema);

module.exports = GardenRequest;
