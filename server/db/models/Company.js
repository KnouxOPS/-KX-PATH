const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
      unique: true,
      validate: {
        validator: async function (userId) {
          const User = mongoose.model("User");
          const user = await User.findById(userId);
          return user && user.role === "company";
        },
        message: "User must exist and have company role",
      },
    },
    companyName: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
      maxlength: [200, "Company name cannot exceed 200 characters"],
      minlength: [2, "Company name must be at least 2 characters long"],
    },
    companyNameArabic: {
      type: String,
      trim: true,
      maxlength: [200, "Arabic company name cannot exceed 200 characters"],
    },
    description: {
      type: String,
      required: [true, "Company description is required"],
      trim: true,
      maxlength: [2000, "Description cannot exceed 2000 characters"],
      minlength: [50, "Description must be at least 50 characters long"],
    },
    descriptionArabic: {
      type: String,
      trim: true,
      maxlength: [2000, "Arabic description cannot exceed 2000 characters"],
    },
    legalInfo: {
      licenseNumber: {
        type: String,
        required: [true, "License number is required"],
        unique: true,
        trim: true,
        validate: {
          validator: function (license) {
            // UAE trade license format validation
            return /^[A-Z]{2}\d{6,10}$/.test(license);
          },
          message: "Invalid UAE trade license format",
        },
      },
      issueDate: {
        type: Date,
        required: [true, "License issue date is required"],
      },
      expiryDate: {
        type: Date,
        required: [true, "License expiry date is required"],
        validate: {
          validator: function (expiry) {
            return expiry > new Date();
          },
          message: "License expiry date must be in the future",
        },
      },
      issuingAuthority: {
        type: String,
        required: [true, "Issuing authority is required"],
        enum: {
          values: [
            "DED Dubai",
            "ADCCI Abu Dhabi",
            "SCCI Sharjah",
            "AJCCI Ajman",
            "RAKCII RAK",
            "UAQCCI UAQ",
            "FCCI Fujairah",
          ],
          message: "Invalid issuing authority",
        },
      },
      taxNumber: {
        type: String,
        validate: {
          validator: function (tax) {
            if (!tax) return true; // Optional field
            return /^\d{15}$/.test(tax); // UAE VAT number format
          },
          message: "Invalid UAE VAT number format",
        },
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
      serviceAreas: [
        {
          emirate: {
            type: String,
            enum: [
              "Abu Dhabi",
              "Dubai",
              "Sharjah",
              "Ajman",
              "Ras Al Khaimah",
              "Umm Al Quwain",
              "Fujairah",
            ],
            required: true,
          },
          cities: [{ type: String }],
          maxRadius: { type: Number, min: 1, max: 200 }, // in kilometers
        },
      ],
    },
    servicesOffered: [
      {
        service: {
          type: String,
          enum: {
            values: [
              "landscape_design",
              "pool_installation",
              "irrigation_systems",
              "green_roof",
              "lighting_systems",
              "hardscaping",
              "softscaping",
              "tree_services",
              "lawn_care",
              "garden_maintenance",
              "water_features",
              "outdoor_kitchens",
              "pergolas_gazebos",
              "drainage_systems",
              "artificial_grass",
              "vertical_gardens",
              "smart_irrigation",
              "landscape_consulting",
              "soil_preparation",
              "plant_nursery",
            ],
            message: "Invalid service type",
          },
          required: true,
        },
        description: {
          type: String,
          maxlength: [500, "Service description cannot exceed 500 characters"],
        },
        priceRange: {
          min: { type: Number, min: 0 },
          max: { type: Number, min: 0 },
          unit: {
            type: String,
            enum: ["per_sqm", "per_project", "per_hour", "per_piece"],
            default: "per_project",
          },
        },
        isActive: { type: Boolean, default: true },
        experience: { type: Number, min: 0, max: 50 }, // years of experience
        certifications: [{ type: String }],
      },
    ],
    portfolioImages: [
      {
        url: {
          type: String,
          required: [true, "Portfolio image URL is required"],
          validate: {
            validator: function (url) {
              return /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(url);
            },
            message: "Portfolio image URL must be a valid image URL",
          },
        },
        title: {
          type: String,
          required: [true, "Portfolio image title is required"],
          maxlength: [100, "Title cannot exceed 100 characters"],
        },
        description: {
          type: String,
          maxlength: [300, "Description cannot exceed 300 characters"],
        },
        projectType: {
          type: String,
          enum: [
            "residential",
            "commercial",
            "public",
            "hospitality",
            "industrial",
            "educational",
            "healthcare",
            "retail",
          ],
          required: true,
        },
        completionDate: {
          type: Date,
          required: true,
        },
        projectValue: {
          type: Number,
          min: 0,
        },
        location: {
          type: String,
          required: true,
        },
        tags: [{ type: String }],
        beforeImage: { type: String }, // URL to before image
        isFeature: { type: Boolean, default: false },
        displayOrder: { type: Number, default: 0 },
      },
    ],
    team: {
      totalEmployees: {
        type: Number,
        required: [true, "Total employees count is required"],
        min: [1, "Company must have at least 1 employee"],
      },
      categories: [
        {
          category: {
            type: String,
            enum: [
              "landscape_architects",
              "designers",
              "project_managers",
              "gardeners",
              "irrigation_specialists",
              "electricians",
              "construction_workers",
              "equipment_operators",
              "supervisors",
              "sales_representatives",
              "customer_service",
              "administration",
            ],
            required: true,
          },
          count: {
            type: Number,
            required: true,
            min: 0,
          },
          leadPerson: {
            name: { type: String },
            qualification: { type: String },
            experience: { type: Number, min: 0 },
          },
        },
      ],
      certifications: [
        {
          name: { type: String, required: true },
          issuingOrganization: { type: String, required: true },
          validUntil: { type: Date },
          certificateNumber: { type: String },
          scope: { type: String }, // what this certification covers
        },
      ],
    },
    businessMetrics: {
      rating: {
        average: {
          type: Number,
          min: [0, "Rating cannot be negative"],
          max: [5, "Rating cannot exceed 5"],
          default: 0,
        },
        totalReviews: {
          type: Number,
          min: [0, "Total reviews cannot be negative"],
          default: 0,
        },
        breakdown: {
          fiveStars: { type: Number, default: 0 },
          fourStars: { type: Number, default: 0 },
          threeStars: { type: Number, default: 0 },
          twoStars: { type: Number, default: 0 },
          oneStar: { type: Number, default: 0 },
        },
      },
      projectsCompleted: {
        type: Number,
        min: [0, "Projects completed cannot be negative"],
        default: 0,
      },
      activeProjects: {
        type: Number,
        min: [0, "Active projects cannot be negative"],
        default: 0,
      },
      clientRetentionRate: {
        type: Number,
        min: [0, "Retention rate cannot be negative"],
        max: [100, "Retention rate cannot exceed 100%"],
        default: 0,
      },
      onTimeCompletionRate: {
        type: Number,
        min: [0, "Completion rate cannot be negative"],
        max: [100, "Completion rate cannot exceed 100%"],
        default: 0,
      },
      averageProjectValue: {
        type: Number,
        min: [0, "Average project value cannot be negative"],
        default: 0,
      },
    },
    verification: {
      verified: {
        type: Boolean,
        default: false,
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
      verificationLevel: {
        type: String,
        enum: ["basic", "standard", "premium", "enterprise"],
        default: "basic",
      },
      documents: [
        {
          type: {
            type: String,
            enum: [
              "trade_license",
              "vat_certificate",
              "insurance_certificate",
              "professional_license",
              "safety_certificate",
              "quality_certificate",
            ],
            required: true,
          },
          url: {
            type: String,
            required: true,
          },
          uploadedAt: {
            type: Date,
            default: Date.now,
          },
          verifiedAt: {
            type: Date,
            default: null,
          },
          status: {
            type: String,
            enum: ["pending", "approved", "rejected"],
            default: "pending",
          },
        },
      ],
      badges: [
        {
          type: String,
          enum: [
            "eco_friendly",
            "premium_service",
            "quick_response",
            "top_rated",
            "verified_license",
            "insurance_covered",
            "local_expert",
            "innovation_leader",
            "customer_choice",
          ],
        },
      ],
    },
    contactInfo: {
      primaryPhone: {
        type: String,
        required: [true, "Primary phone is required"],
        validate: {
          validator: function (phone) {
            return /^(\+971|971|0)?[1-9][0-9]{8}$/.test(phone);
          },
          message: "Please provide a valid UAE phone number",
        },
      },
      secondaryPhone: {
        type: String,
        validate: {
          validator: function (phone) {
            if (!phone) return true; // Optional field
            return /^(\+971|971|0)?[1-9][0-9]{8}$/.test(phone);
          },
          message: "Please provide a valid UAE phone number",
        },
      },
      whatsapp: {
        type: String,
        validate: {
          validator: function (phone) {
            if (!phone) return true; // Optional field
            return /^(\+971|971|0)?[1-9][0-9]{8}$/.test(phone);
          },
          message: "Please provide a valid UAE phone number",
        },
      },
      email: {
        type: String,
        required: [true, "Company email is required"],
        validate: {
          validator: function (email) {
            return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
          },
          message: "Please provide a valid email address",
        },
      },
      website: {
        type: String,
        validate: {
          validator: function (website) {
            if (!website) return true; // Optional field
            return /^https?:\/\/.+\..+/.test(website);
          },
          message: "Please provide a valid website URL",
        },
      },
      socialMedia: {
        instagram: { type: String },
        facebook: { type: String },
        linkedin: { type: String },
        twitter: { type: String },
      },
    },
    operationalInfo: {
      workingHours: {
        monday: {
          open: String,
          close: String,
          isOpen: { type: Boolean, default: true },
        },
        tuesday: {
          open: String,
          close: String,
          isOpen: { type: Boolean, default: true },
        },
        wednesday: {
          open: String,
          close: String,
          isOpen: { type: Boolean, default: true },
        },
        thursday: {
          open: String,
          close: String,
          isOpen: { type: Boolean, default: true },
        },
        friday: {
          open: String,
          close: String,
          isOpen: { type: Boolean, default: true },
        },
        saturday: {
          open: String,
          close: String,
          isOpen: { type: Boolean, default: false },
        },
        sunday: {
          open: String,
          close: String,
          isOpen: { type: Boolean, default: false },
        },
      },
      languages: [
        {
          type: String,
          enum: [
            "Arabic",
            "English",
            "Hindi",
            "Urdu",
            "Filipino",
            "Bengali",
            "Other",
          ],
          required: true,
        },
      ],
      paymentMethods: [
        {
          type: String,
          enum: [
            "cash",
            "bank_transfer",
            "credit_card",
            "cheque",
            "installments",
          ],
          required: true,
        },
      ],
      emergencyService: {
        available: { type: Boolean, default: false },
        phone: { type: String },
        additionalCost: { type: Number, min: 0 },
      },
      warranty: {
        plantsWarranty: { type: Number, min: 0, max: 60 }, // months
        workmanshipWarranty: { type: Number, min: 0, max: 120 }, // months
        materialWarranty: { type: Number, min: 0, max: 120 }, // months
      },
    },
    subscription: {
      plan: {
        type: String,
        enum: ["basic", "standard", "premium", "enterprise"],
        default: "basic",
      },
      isActive: {
        type: Boolean,
        default: true,
      },
      startDate: {
        type: Date,
        default: Date.now,
      },
      endDate: {
        type: Date,
        required: true,
      },
      features: [
        {
          feature: { type: String, required: true },
          limit: { type: Number }, // null means unlimited
          used: { type: Number, default: 0 },
        },
      ],
    },
  },
  {
    timestamps: true,
    collection: "companies",
  },
);

// Indexes for performance
companySchema.index({ userId: 1 }, { unique: true });
companySchema.index({ "location.emirate": 1 });
companySchema.index({ "verification.verified": 1 });
companySchema.index({ "businessMetrics.rating.average": -1 });
companySchema.index({ "servicesOffered.service": 1 });
companySchema.index({ "legalInfo.licenseNumber": 1 }, { unique: true });
companySchema.index({ companyName: "text", description: "text" });

// Virtual for company profile URL
companySchema.virtual("profileUrl").get(function () {
  return `/api/companies/${this._id}`;
});

// Virtual for verification status display
companySchema.virtual("verificationStatus").get(function () {
  if (!this.verification.verified) return "Unverified";
  return `${this.verification.verificationLevel.charAt(0).toUpperCase() + this.verification.verificationLevel.slice(1)} Verified`;
});

// Virtual for service areas display
companySchema.virtual("serviceAreasDisplay").get(function () {
  return this.location.serviceAreas.map((area) => area.emirate).join(", ");
});

// Method to calculate verification score
companySchema.methods.calculateVerificationScore = function () {
  let score = 0;

  // Basic verification
  if (this.verification.verified) score += 30;

  // Documents verification
  const verifiedDocs = this.verification.documents.filter(
    (doc) => doc.status === "approved",
  ).length;
  score += verifiedDocs * 10;

  // Rating factor
  if (this.businessMetrics.rating.average >= 4.5) score += 20;
  else if (this.businessMetrics.rating.average >= 4.0) score += 15;
  else if (this.businessMetrics.rating.average >= 3.5) score += 10;

  // Projects completed
  if (this.businessMetrics.projectsCompleted >= 100) score += 15;
  else if (this.businessMetrics.projectsCompleted >= 50) score += 10;
  else if (this.businessMetrics.projectsCompleted >= 10) score += 5;

  // Portfolio size
  if (this.portfolioImages.length >= 20) score += 10;
  else if (this.portfolioImages.length >= 10) score += 5;

  return Math.min(score, 100);
};

// Method to update rating
companySchema.methods.updateRating = function (newRating) {
  const breakdown = this.businessMetrics.rating.breakdown;
  const totalReviews = this.businessMetrics.rating.totalReviews;

  // Add new rating to breakdown
  switch (newRating) {
    case 5:
      breakdown.fiveStars += 1;
      break;
    case 4:
      breakdown.fourStars += 1;
      break;
    case 3:
      breakdown.threeStars += 1;
      break;
    case 2:
      breakdown.twoStars += 1;
      break;
    case 1:
      breakdown.oneStar += 1;
      break;
  }

  // Update total reviews
  this.businessMetrics.rating.totalReviews += 1;

  // Calculate new average
  const totalStars =
    breakdown.fiveStars * 5 +
    breakdown.fourStars * 4 +
    breakdown.threeStars * 3 +
    breakdown.twoStars * 2 +
    breakdown.oneStar * 1;

  this.businessMetrics.rating.average =
    totalStars / this.businessMetrics.rating.totalReviews;

  return this.save();
};

// Method to check if company serves an area
companySchema.methods.servesArea = function (emirate, city = null) {
  return this.location.serviceAreas.some((area) => {
    if (area.emirate !== emirate) return false;
    if (city && area.cities.length > 0) {
      return area.cities.includes(city);
    }
    return true;
  });
};

// Static method to find companies by service
companySchema.statics.findByService = function (service, emirate = null) {
  const query = { "servicesOffered.service": service };
  if (emirate) {
    query["location.serviceAreas.emirate"] = emirate;
  }
  return this.find(query);
};

// Static method to find verified companies
companySchema.statics.findVerified = function (emirate = null) {
  const query = { "verification.verified": true };
  if (emirate) {
    query["location.emirate"] = emirate;
  }
  return this.find(query);
};

// Method to get company public profile
companySchema.methods.getPublicProfile = function () {
  const profile = this.toObject();

  // Remove sensitive information
  delete profile.legalInfo.taxNumber;
  delete profile.subscription;
  delete profile.verification.documents;

  return profile;
};

const Company = mongoose.model("Company", companySchema);

module.exports = Company;
