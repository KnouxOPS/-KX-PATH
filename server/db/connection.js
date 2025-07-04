const mongoose = require("mongoose");

// Import all models to ensure they're registered
const User = require("./models/User");
const GardenRequest = require("./models/GardenRequest");
const AIPlan = require("./models/AIPlan");
const Company = require("./models/Company");
const { MapData, ConstructionAlert } = require("./models/MapData");
const { Rating, AdminLog } = require("./models/Rating");

class DatabaseConnection {
  constructor() {
    this.isConnected = false;
    this.connectionRetries = 0;
    this.maxRetries = 5;
  }

  async connect() {
    try {
      // MongoDB connection string - in production this should come from environment variables
      const mongoURI =
        process.env.MONGODB_URI || "mongodb://localhost:27017/kx_path_uae_db";

      // Connection options for optimal performance and reliability
      const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        maxPoolSize: 10, // Maintain up to 10 socket connections
        serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
        socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
        family: 4, // Use IPv4, skip trying IPv6
        retryWrites: true,
        retryReads: true,
        bufferMaxEntries: 0, // Disable mongoose buffering
        bufferCommands: false, // Disable mongoose buffering
        maxIdleTimeMS: 30000, // Close connections after 30 seconds of inactivity
        heartbeatFrequencyMS: 10000, // Send heartbeat every 10 seconds
      };

      console.log("🔄 Connecting to KX PATH UAE Database...");

      await mongoose.connect(mongoURI, options);

      this.isConnected = true;
      this.connectionRetries = 0;

      console.log("✅ KX PATH Database connected successfully!");
      console.log(`📊 Database: ${mongoose.connection.db.databaseName}`);
      console.log(
        `🌐 Host: ${mongoose.connection.host}:${mongoose.connection.port}`,
      );

      // Set up connection event listeners
      this.setupEventListeners();

      // Create indexes if they don't exist
      await this.createIndexes();

      return true;
    } catch (error) {
      console.error("❌ Database connection failed:", error.message);
      await this.handleConnectionError(error);
      return false;
    }
  }

  setupEventListeners() {
    const db = mongoose.connection;

    db.on("connected", () => {
      console.log("🟢 Mongoose connected to MongoDB");
      this.isConnected = true;
    });

    db.on("error", (error) => {
      console.error("🔴 Mongoose connection error:", error);
      this.isConnected = false;
    });

    db.on("disconnected", () => {
      console.log("🟡 Mongoose disconnected from MongoDB");
      this.isConnected = false;

      // Attempt to reconnect
      if (this.connectionRetries < this.maxRetries) {
        setTimeout(() => {
          console.log("🔄 Attempting to reconnect...");
          this.connect();
        }, 5000);
      }
    });

    db.on("reconnected", () => {
      console.log("🟢 Mongoose reconnected to MongoDB");
      this.isConnected = true;
    });

    // Graceful shutdown
    process.on("SIGINT", async () => {
      console.log("🔄 Gracefully shutting down database connection...");
      await this.disconnect();
      process.exit(0);
    });
  }

  async handleConnectionError(error) {
    this.connectionRetries++;

    if (this.connectionRetries <= this.maxRetries) {
      console.log(
        `🔄 Retrying connection (${this.connectionRetries}/${this.maxRetries})...`,
      );
      setTimeout(() => {
        this.connect();
      }, 5000 * this.connectionRetries); // Exponential backoff
    } else {
      console.error(
        "❌ Max connection retries reached. Please check your database configuration.",
      );
      throw error;
    }
  }

  async createIndexes() {
    try {
      console.log("📑 Creating database indexes...");

      // Create compound indexes for better query performance
      const collections = [
        { model: User, name: "Users" },
        { model: Company, name: "Companies" },
        { model: GardenRequest, name: "Garden Requests" },
        { model: AIPlan, name: "AI Plans" },
        { model: MapData, name: "Map Data" },
        { model: ConstructionAlert, name: "Construction Alerts" },
        { model: Rating, name: "Ratings" },
        { model: AdminLog, name: "Admin Logs" },
      ];

      for (const collection of collections) {
        try {
          await collection.model.createIndexes();
          console.log(`✅ Indexes created for ${collection.name}`);
        } catch (indexError) {
          console.warn(`⚠️ Some indexes already exist for ${collection.name}`);
        }
      }

      // Create text search indexes
      await this.createTextSearchIndexes();

      console.log("✅ All database indexes created successfully");
    } catch (error) {
      console.error("❌ Error creating indexes:", error.message);
    }
  }

  async createTextSearchIndexes() {
    try {
      // Create text search index for companies
      await Company.collection.createIndex(
        {
          companyName: "text",
          description: "text",
          "location.city": "text",
          "servicesOffered.service": "text",
        },
        {
          weights: {
            companyName: 10,
            description: 5,
            "location.city": 3,
            "servicesOffered.service": 8,
          },
          name: "company_text_search",
        },
      );

      // Create text search index for map data
      await MapData.collection.createIndex(
        {
          zoneName: "text",
          zoneNameArabic: "text",
          "infrastructure.nearbyAmenities.name": "text",
        },
        {
          weights: {
            zoneName: 10,
            zoneNameArabic: 10,
            "infrastructure.nearbyAmenities.name": 5,
          },
          name: "map_data_text_search",
        },
      );

      console.log("✅ Text search indexes created successfully");
    } catch (error) {
      console.warn("⚠️ Text search indexes may already exist");
    }
  }

  async disconnect() {
    try {
      await mongoose.connection.close();
      this.isConnected = false;
      console.log("✅ Database connection closed successfully");
    } catch (error) {
      console.error("❌ Error closing database connection:", error.message);
    }
  }

  getConnectionStatus() {
    return {
      isConnected: this.isConnected,
      readyState: mongoose.connection.readyState,
      host: mongoose.connection.host,
      port: mongoose.connection.port,
      name: mongoose.connection.name,
    };
  }

  // Health check method
  async healthCheck() {
    try {
      const admin = mongoose.connection.db.admin();
      const result = await admin.ping();

      return {
        status: "healthy",
        timestamp: new Date(),
        connection: this.getConnectionStatus(),
        ping: result,
      };
    } catch (error) {
      return {
        status: "unhealthy",
        timestamp: new Date(),
        error: error.message,
        connection: this.getConnectionStatus(),
      };
    }
  }

  // Database statistics
  async getStats() {
    try {
      const collections = await mongoose.connection.db
        .listCollections()
        .toArray();
      const stats = {
        totalCollections: collections.length,
        collections: [],
        timestamp: new Date(),
      };

      for (const collection of collections) {
        try {
          const collectionStats = await mongoose.connection.db
            .collection(collection.name)
            .stats();

          stats.collections.push({
            name: collection.name,
            documentCount: collectionStats.count || 0,
            size: collectionStats.size || 0,
            avgObjSize: collectionStats.avgObjSize || 0,
            indexes: collectionStats.nindexes || 0,
          });
        } catch (statError) {
          console.warn(
            `Warning: Could not get stats for collection ${collection.name}`,
          );
        }
      }

      return stats;
    } catch (error) {
      console.error("Error getting database stats:", error.message);
      return null;
    }
  }
}

// Create a singleton instance
const dbConnection = new DatabaseConnection();

module.exports = {
  connect: () => dbConnection.connect(),
  disconnect: () => dbConnection.disconnect(),
  getConnectionStatus: () => dbConnection.getConnectionStatus(),
  healthCheck: () => dbConnection.healthCheck(),
  getStats: () => dbConnection.getStats(),
  isConnected: () => dbConnection.isConnected,
};
