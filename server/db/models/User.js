const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: function (email) {
          return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
        },
        message: "Please provide a valid email address",
      },
    },
    passwordHash: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters long"],
    },
    role: {
      type: String,
      enum: {
        values: ["client", "company", "admin"],
        message: "Role must be either client, company, or admin",
      },
      default: "client",
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      validate: {
        validator: function (phone) {
          // UAE phone number validation (971 country code)
          return /^(\+971|971|0)?[1-9][0-9]{8}$/.test(phone);
        },
        message: "Please provide a valid UAE phone number",
      },
    },
    location: {
      type: String,
      required: [true, "Location is required"],
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
        message: "Location must be a valid UAE emirate",
      },
    },
    avatarUrl: {
      type: String,
      default: null,
      validate: {
        validator: function (url) {
          if (!url) return true; // Allow null/empty
          return /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(url);
        },
        message: "Avatar URL must be a valid image URL",
      },
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      default: null,
    },
    resetPasswordToken: {
      type: String,
      default: null,
    },
    resetPasswordExpires: {
      type: Date,
      default: null,
    },
    lastLogin: {
      type: Date,
      default: null,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    preferences: {
      language: {
        type: String,
        enum: ["ar", "en"],
        default: "ar",
      },
      notifications: {
        email: { type: Boolean, default: true },
        sms: { type: Boolean, default: true },
        push: { type: Boolean, default: true },
      },
      theme: {
        type: String,
        enum: ["light", "dark", "auto"],
        default: "auto",
      },
    },
    metadata: {
      signupSource: {
        type: String,
        enum: ["web", "mobile", "referral", "social"],
        default: "web",
      },
      deviceInfo: {
        type: String,
        default: null,
      },
      ipAddress: {
        type: String,
        default: null,
      },
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
    collection: "users",
  },
);

// Indexes for performance
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ role: 1 });
userSchema.index({ location: 1 });
userSchema.index({ isActive: 1 });
userSchema.index({ createdAt: -1 });

// Virtual for user's full profile URL
userSchema.virtual("profileUrl").get(function () {
  return `/api/users/${this._id}`;
});

// Pre-save middleware to hash password
userSchema.pre("save", async function (next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified("passwordHash")) return next();

  try {
    // Hash password with cost of 12
    const salt = await bcrypt.genSalt(12);
    this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to check password
userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.passwordHash);
  } catch (error) {
    throw new Error("Password comparison failed");
  }
};

// Method to generate JWT token
userSchema.methods.generateToken = function () {
  const jwt = require("jsonwebtoken");

  return jwt.sign(
    {
      id: this._id,
      email: this.email,
      role: this.role,
      location: this.location,
    },
    process.env.JWT_SECRET || "kx-path-uae-secret-key-2024",
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" },
  );
};

// Method to update last login
userSchema.methods.updateLastLogin = async function () {
  this.lastLogin = new Date();
  return await this.save({ validateBeforeSave: false });
};

// Static method to find users by role
userSchema.statics.findByRole = function (role) {
  return this.find({ role, isActive: true });
};

// Static method to find users by location
userSchema.statics.findByLocation = function (location) {
  return this.find({ location, isActive: true });
};

// Method to sanitize user data for API responses
userSchema.methods.toPublicJSON = function () {
  const userObject = this.toObject();

  // Remove sensitive fields
  delete userObject.passwordHash;
  delete userObject.verificationToken;
  delete userObject.resetPasswordToken;
  delete userObject.resetPasswordExpires;
  delete userObject.metadata.ipAddress;
  delete userObject.metadata.deviceInfo;

  return userObject;
};

// Transform function for JSON serialization
userSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.passwordHash;
    delete ret.verificationToken;
    delete ret.resetPasswordToken;
    delete ret.resetPasswordExpires;
    return ret;
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
