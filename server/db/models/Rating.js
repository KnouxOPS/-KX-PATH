const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema(
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
        message: "Client must exist and have client role",
      },
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: [true, "Company ID is required"],
    },
    gardenRequestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GardenRequest",
      required: [true, "Garden request ID is required"],
    },
    overallRating: {
      stars: {
        type: Number,
        required: [true, "Overall rating is required"],
        min: [1, "Rating must be at least 1 star"],
        max: [5, "Rating cannot exceed 5 stars"],
      },
      comment: {
        type: String,
        trim: true,
        maxlength: [1000, "Comment cannot exceed 1000 characters"],
      },
    },
    detailedRatings: {
      quality: {
        stars: {
          type: Number,
          required: [true, "Quality rating is required"],
          min: [1, "Rating must be at least 1 star"],
          max: [5, "Rating cannot exceed 5 stars"],
        },
        comment: {
          type: String,
          trim: true,
          maxlength: [500, "Quality comment cannot exceed 500 characters"],
        },
      },
      timeliness: {
        stars: {
          type: Number,
          required: [true, "Timeliness rating is required"],
          min: [1, "Rating must be at least 1 star"],
          max: [5, "Rating cannot exceed 5 stars"],
        },
        comment: {
          type: String,
          trim: true,
          maxlength: [500, "Timeliness comment cannot exceed 500 characters"],
        },
      },
      communication: {
        stars: {
          type: Number,
          required: [true, "Communication rating is required"],
          min: [1, "Rating must be at least 1 star"],
          max: [5, "Rating cannot exceed 5 stars"],
        },
        comment: {
          type: String,
          trim: true,
          maxlength: [
            500,
            "Communication comment cannot exceed 500 characters",
          ],
        },
      },
      professionalism: {
        stars: {
          type: Number,
          required: [true, "Professionalism rating is required"],
          min: [1, "Rating must be at least 1 star"],
          max: [5, "Rating cannot exceed 5 stars"],
        },
        comment: {
          type: String,
          trim: true,
          maxlength: [
            500,
            "Professionalism comment cannot exceed 500 characters",
          ],
        },
      },
      valueForMoney: {
        stars: {
          type: Number,
          required: [true, "Value for money rating is required"],
          min: [1, "Rating must be at least 1 star"],
          max: [5, "Rating cannot exceed 5 stars"],
        },
        comment: {
          type: String,
          trim: true,
          maxlength: [
            500,
            "Value for money comment cannot exceed 500 characters",
          ],
        },
      },
    },
    projectDetails: {
      projectType: {
        type: String,
        required: [true, "Project type is required"],
        enum: [
          "garden_design",
          "pool_installation",
          "irrigation_system",
          "lighting_installation",
          "hardscaping",
          "maintenance",
          "renovation",
          "consultation",
          "full_landscape",
        ],
      },
      projectValue: {
        type: Number,
        required: [true, "Project value is required"],
        min: [0, "Project value cannot be negative"],
      },
      duration: {
        planned: { type: Number, required: true }, // in days
        actual: { type: Number, required: true }, // in days
        variance: { type: Number }, // calculated: actual - planned
      },
      completionDate: {
        type: Date,
        required: [true, "Completion date is required"],
      },
    },
    media: {
      beforeImages: [
        {
          url: {
            type: String,
            validate: {
              validator: function (url) {
                return /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(url);
              },
              message: "Image URL must be a valid image URL",
            },
          },
          description: { type: String, maxlength: 200 },
        },
      ],
      afterImages: [
        {
          url: {
            type: String,
            validate: {
              validator: function (url) {
                return /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(url);
              },
              message: "Image URL must be a valid image URL",
            },
          },
          description: { type: String, maxlength: 200 },
        },
      ],
      videoTestimonial: {
        url: {
          type: String,
          validate: {
            validator: function (url) {
              if (!url) return true; // Optional field
              return (
                /^https?:\/\/.+\.(mp4|webm|ogg)$/i.test(url) ||
                /youtube\.com|youtu\.be|vimeo\.com/.test(url)
              );
            },
            message: "Video URL must be a valid video URL",
          },
        },
        duration: { type: Number }, // in seconds
        thumbnail: { type: String },
      },
    },
    recommendations: {
      wouldRecommend: {
        type: Boolean,
        required: [true, "Recommendation status is required"],
      },
      recommendationReason: {
        type: String,
        trim: true,
        maxlength: [500, "Recommendation reason cannot exceed 500 characters"],
      },
      targetAudience: [
        {
          type: String,
          enum: [
            "first_time_buyers",
            "luxury_clients",
            "commercial_projects",
            "budget_conscious",
            "eco_friendly",
            "quick_turnaround",
          ],
        },
      ],
    },
    companyResponse: {
      responded: {
        type: Boolean,
        default: false,
      },
      responseDate: {
        type: Date,
        default: null,
      },
      message: {
        type: String,
        trim: true,
        maxlength: [1000, "Response message cannot exceed 1000 characters"],
      },
      actionsTaken: [
        {
          action: { type: String, required: true },
          description: { type: String },
          completedAt: { type: Date, default: Date.now },
        },
      ],
    },
    verification: {
      isVerified: {
        type: Boolean,
        default: false,
      },
      verificationMethod: {
        type: String,
        enum: ["email", "phone", "site_visit", "document_check"],
        default: null,
      },
      verifiedAt: {
        type: Date,
        default: null,
      },
      verifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
      },
    },
    flags: {
      isFlagged: {
        type: Boolean,
        default: false,
      },
      flagReason: {
        type: String,
        enum: [
          "inappropriate_content",
          "fake_review",
          "spam",
          "conflict_of_interest",
        ],
        default: null,
      },
      flaggedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
      },
      flaggedAt: {
        type: Date,
        default: null,
      },
      reviewStatus: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "approved",
      },
    },
    analytics: {
      helpfulVotes: {
        type: Number,
        min: [0, "Helpful votes cannot be negative"],
        default: 0,
      },
      viewCount: {
        type: Number,
        min: [0, "View count cannot be negative"],
        default: 0,
      },
      reportCount: {
        type: Number,
        min: [0, "Report count cannot be negative"],
        default: 0,
      },
      shareCount: {
        type: Number,
        min: [0, "Share count cannot be negative"],
        default: 0,
      },
    },
    metadata: {
      source: {
        type: String,
        enum: ["web", "mobile", "email_survey", "phone_survey", "site_visit"],
        default: "web",
      },
      ipAddress: {
        type: String,
        default: null,
      },
      userAgent: {
        type: String,
        default: null,
      },
      deviceInfo: {
        type: String,
        default: null,
      },
      submissionTime: {
        type: Number, // time taken to submit in seconds
        min: 0,
        default: 0,
      },
    },
  },
  {
    timestamps: true,
    collection: "ratings",
  },
);

// Compound indexes for performance
ratingSchema.index({ companyId: 1, createdAt: -1 });
ratingSchema.index({ clientId: 1, companyId: 1 }, { unique: true }); // One rating per client per company
ratingSchema.index({ gardenRequestId: 1 }, { unique: true }); // One rating per garden request
ratingSchema.index({ "overallRating.stars": -1 });
ratingSchema.index({ "verification.isVerified": 1 });
ratingSchema.index({ "flags.isFlagged": 1 });

// Virtual for average detailed rating
ratingSchema.virtual("averageDetailedRating").get(function () {
  const ratings = [
    this.detailedRatings.quality.stars,
    this.detailedRatings.timeliness.stars,
    this.detailedRatings.communication.stars,
    this.detailedRatings.professionalism.stars,
    this.detailedRatings.valueForMoney.stars,
  ];

  return ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length;
});

// Virtual for project efficiency score
ratingSchema.virtual("projectEfficiency").get(function () {
  if (!this.projectDetails.duration.variance) return 100;

  const variance = Math.abs(this.projectDetails.duration.variance);
  const planned = this.projectDetails.duration.planned;
  const efficiencyScore = Math.max(0, 100 - (variance / planned) * 100);

  return Math.round(efficiencyScore);
});

// Pre-save middleware to calculate duration variance
ratingSchema.pre("save", function (next) {
  if (
    this.projectDetails.duration.actual &&
    this.projectDetails.duration.planned
  ) {
    this.projectDetails.duration.variance =
      this.projectDetails.duration.actual -
      this.projectDetails.duration.planned;
  }
  next();
});

// Method to add helpful vote
ratingSchema.methods.addHelpfulVote = function () {
  this.analytics.helpfulVotes += 1;
  return this.save();
};

// Method to increment view count
ratingSchema.methods.incrementViewCount = function () {
  this.analytics.viewCount += 1;
  return this.save({ validateBeforeSave: false });
};

// Method to flag rating
ratingSchema.methods.flagRating = function (reason, flaggedBy) {
  this.flags.isFlagged = true;
  this.flags.flagReason = reason;
  this.flags.flaggedBy = flaggedBy;
  this.flags.flaggedAt = new Date();
  this.flags.reviewStatus = "pending";
  return this.save();
};

// Method to add company response
ratingSchema.methods.addCompanyResponse = function (
  message,
  actionsTaken = [],
) {
  this.companyResponse.responded = true;
  this.companyResponse.responseDate = new Date();
  this.companyResponse.message = message;
  this.companyResponse.actionsTaken = actionsTaken;
  return this.save();
};

// Static method to find ratings by company
ratingSchema.statics.findByCompany = function (companyId, verified = null) {
  const query = { companyId };
  if (verified !== null) {
    query["verification.isVerified"] = verified;
  }
  return this.find(query).sort({ createdAt: -1 });
};

// Static method to calculate company rating statistics
ratingSchema.statics.getCompanyStats = function (companyId) {
  return this.aggregate([
    { $match: { companyId: mongoose.Types.ObjectId(companyId) } },
    {
      $group: {
        _id: null,
        totalRatings: { $sum: 1 },
        averageOverall: { $avg: "$overallRating.stars" },
        averageQuality: { $avg: "$detailedRatings.quality.stars" },
        averageTimeliness: { $avg: "$detailedRatings.timeliness.stars" },
        averageCommunication: { $avg: "$detailedRatings.communication.stars" },
        averageProfessionalism: {
          $avg: "$detailedRatings.professionalism.stars",
        },
        averageValueForMoney: { $avg: "$detailedRatings.valueForMoney.stars" },
        recommendationRate: {
          $avg: {
            $cond: [{ $eq: ["$recommendations.wouldRecommend", true] }, 1, 0],
          },
        },
        totalProjectValue: { $sum: "$projectDetails.projectValue" },
        averageProjectValue: { $avg: "$projectDetails.projectValue" },
      },
    },
  ]);
};

const Rating = mongoose.model("Rating", ratingSchema);

// Admin Logs Schema
const adminLogSchema = new mongoose.Schema(
  {
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Admin ID is required"],
      validate: {
        validator: async function (adminId) {
          const User = mongoose.model("User");
          const admin = await User.findById(adminId);
          return admin && admin.role === "admin";
        },
        message: "User must exist and have admin role",
      },
    },
    action: {
      type: String,
      required: [true, "Action is required"],
      enum: {
        values: [
          "user_created",
          "user_updated",
          "user_deleted",
          "user_suspended",
          "user_activated",
          "company_verified",
          "company_rejected",
          "company_suspended",
          "company_updated",
          "rating_flagged",
          "rating_approved",
          "rating_rejected",
          "rating_deleted",
          "garden_request_approved",
          "garden_request_rejected",
          "garden_request_updated",
          "ai_plan_reviewed",
          "ai_plan_approved",
          "ai_plan_rejected",
          "alert_created",
          "alert_verified",
          "alert_deleted",
          "alert_updated",
          "system_backup",
          "system_maintenance",
          "system_configuration",
          "data_export",
          "data_import",
          "report_generated",
          "security_incident",
          "login_attempt",
          "password_reset",
        ],
        message: "Invalid action type",
      },
    },
    targetType: {
      type: String,
      required: [true, "Target type is required"],
      enum: {
        values: [
          "User",
          "Company",
          "GardenRequest",
          "AIPlan",
          "Rating",
          "ConstructionAlert",
          "MapData",
          "System",
        ],
        message: "Invalid target type",
      },
    },
    targetId: {
      type: mongoose.Schema.Types.ObjectId,
      required: function () {
        return this.targetType !== "System";
      },
    },
    details: {
      description: {
        type: String,
        required: [true, "Action description is required"],
        trim: true,
        maxlength: [1000, "Description cannot exceed 1000 characters"],
      },
      previousValues: {
        type: mongoose.Schema.Types.Mixed,
        default: null,
      },
      newValues: {
        type: mongoose.Schema.Types.Mixed,
        default: null,
      },
      affectedFields: [
        {
          type: String,
        },
      ],
      reason: {
        type: String,
        trim: true,
        maxlength: [500, "Reason cannot exceed 500 characters"],
      },
      notes: {
        type: String,
        trim: true,
        maxlength: [1000, "Notes cannot exceed 1000 characters"],
      },
    },
    metadata: {
      ipAddress: {
        type: String,
        required: [true, "IP address is required"],
      },
      userAgent: {
        type: String,
        required: [true, "User agent is required"],
      },
      sessionId: {
        type: String,
        default: null,
      },
      requestId: {
        type: String,
        default: null,
      },
      method: {
        type: String,
        enum: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        default: "POST",
      },
      endpoint: {
        type: String,
        default: null,
      },
      responseTime: {
        type: Number, // in milliseconds
        min: 0,
        default: null,
      },
      success: {
        type: Boolean,
        required: [true, "Success status is required"],
      },
      errorMessage: {
        type: String,
        default: null,
      },
    },
    severity: {
      type: String,
      enum: ["low", "medium", "high", "critical"],
      default: "medium",
    },
    category: {
      type: String,
      enum: [
        "user_management",
        "content_moderation",
        "system_administration",
        "security",
        "data_management",
        "business_operations",
        "maintenance",
      ],
      required: [true, "Category is required"],
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    isArchived: {
      type: Boolean,
      default: false,
    },
    retentionDate: {
      type: Date,
      default: function () {
        // Default retention: 2 years for security logs, 1 year for others
        const months = this.category === "security" ? 24 : 12;
        return new Date(Date.now() + months * 30 * 24 * 60 * 60 * 1000);
      },
    },
  },
  {
    timestamps: true,
    collection: "admin_logs",
  },
);

// Indexes for admin logs
adminLogSchema.index({ adminId: 1, createdAt: -1 });
adminLogSchema.index({ action: 1, createdAt: -1 });
adminLogSchema.index({ targetType: 1, targetId: 1 });
adminLogSchema.index({ category: 1, severity: 1 });
adminLogSchema.index({ "metadata.success": 1 });
adminLogSchema.index({ retentionDate: 1 });
adminLogSchema.index({ isArchived: 1 });

// TTL index for automatic cleanup
adminLogSchema.index({ retentionDate: 1 }, { expireAfterSeconds: 0 });

// Method to archive log
adminLogSchema.methods.archive = function () {
  this.isArchived = true;
  return this.save();
};

// Static method to create log entry
adminLogSchema.statics.createLog = function (logData) {
  return this.create(logData);
};

// Static method to find logs by admin
adminLogSchema.statics.findByAdmin = function (adminId, limit = 50) {
  return this.find({ adminId })
    .sort({ createdAt: -1 })
    .limit(limit)
    .populate("adminId", "name email");
};

// Static method to find logs by action
adminLogSchema.statics.findByAction = function (action, days = 30) {
  const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
  return this.find({
    action,
    createdAt: { $gte: startDate },
  }).sort({ createdAt: -1 });
};

// Static method to find security logs
adminLogSchema.statics.findSecurityLogs = function (days = 7) {
  const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
  return this.find({
    category: "security",
    createdAt: { $gte: startDate },
  }).sort({ createdAt: -1 });
};

// Static method to get admin activity summary
adminLogSchema.statics.getActivitySummary = function (adminId, days = 30) {
  const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

  return this.aggregate([
    {
      $match: {
        adminId: mongoose.Types.ObjectId(adminId),
        createdAt: { $gte: startDate },
      },
    },
    {
      $group: {
        _id: "$action",
        count: { $sum: 1 },
        lastActivity: { $max: "$createdAt" },
      },
    },
    { $sort: { count: -1 } },
  ]);
};

const AdminLog = mongoose.model("AdminLog", adminLogSchema);

module.exports = { Rating, AdminLog };
