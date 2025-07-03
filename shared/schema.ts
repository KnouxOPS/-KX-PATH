import {
  pgTable,
  text,
  varchar,
  timestamp,
  jsonb,
  index,
  serial,
  integer,
  decimal,
  boolean,
  uuid,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table (required for Replit Auth)
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table (required for Replit Auth)
export const users = pgTable("users", {
  id: varchar("id").primaryKey().notNull(),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  role: varchar("role").notNull().default("client"), // manager, client, field_worker
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Services table
export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  nameEn: varchar("name_en").notNull(),
  nameAr: varchar("name_ar").notNull(),
  descriptionEn: text("description_en").notNull(),
  descriptionAr: text("description_ar").notNull(),
  startingPrice: decimal("starting_price", { precision: 10, scale: 2 }).notNull(),
  category: varchar("category").notNull(),
  imageUrl: varchar("image_url"),
  features: jsonb("features"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Projects table
export const projects = pgTable("projects", {
  id: uuid("id").primaryKey().defaultRandom(),
  nameEn: varchar("name_en").notNull(),
  nameAr: varchar("name_ar").notNull(),
  clientId: varchar("client_id").references(() => users.id),
  managerId: varchar("manager_id").references(() => users.id),
  status: varchar("status").notNull().default("planning"), // planning, in_progress, completed, cancelled
  value: decimal("value", { precision: 12, scale: 2 }).notNull(),
  progress: integer("progress").default(0),
  startDate: timestamp("start_date"),
  endDate: timestamp("end_date"),
  estimatedCompletionDate: timestamp("estimated_completion_date"),
  location: varchar("location"),
  coordinates: jsonb("coordinates"),
  description: text("description"),
  imageUrl: varchar("image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Project Services (many-to-many relationship)
export const projectServices = pgTable("project_services", {
  id: serial("id").primaryKey(),
  projectId: uuid("project_id").references(() => projects.id),
  serviceId: integer("service_id").references(() => services.id),
  quantity: integer("quantity").default(1),
  price: decimal("price", { precision: 10, scale: 2 }),
  createdAt: timestamp("created_at").defaultNow(),
});

// Project Updates/Feed
export const projectUpdates = pgTable("project_updates", {
  id: serial("id").primaryKey(),
  projectId: uuid("project_id").references(() => projects.id),
  userId: varchar("user_id").references(() => users.id),
  title: varchar("title").notNull(),
  description: text("description"),
  imageUrl: varchar("image_url"),
  updateType: varchar("update_type").notNull(), // progress, image, milestone, issue
  createdAt: timestamp("created_at").defaultNow(),
});

// Quotes table
export const quotes = pgTable("quotes", {
  id: uuid("id").primaryKey().defaultRandom(),
  clientId: varchar("client_id").references(() => users.id),
  projectId: uuid("project_id").references(() => projects.id),
  totalAmount: decimal("total_amount", { precision: 12, scale: 2 }).notNull(),
  status: varchar("status").notNull().default("draft"), // draft, sent, accepted, rejected
  validUntil: timestamp("valid_until"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Client leads and prospects (KnoxRadar functionality)
export const leads = pgTable("leads", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name").notNull(),
  email: varchar("email"),
  phone: varchar("phone"),
  location: varchar("location"),
  propertyType: varchar("property_type"),
  budget: varchar("budget"),
  source: varchar("source", { enum: ["radar", "referral", "website", "social", "other"] }).default("website"),
  status: varchar("status", { enum: ["new", "contacted", "qualified", "proposal", "client", "closed"] }).default("new"),
  notes: text("notes"),
  assignedTo: varchar("assigned_to").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// AI design sessions and generated content (KnoxDesign)
export const aiDesigns = pgTable("ai_designs", {
  id: uuid("id").primaryKey().defaultRandom(),
  projectId: uuid("project_id").references(() => projects.id),
  leadId: uuid("lead_id").references(() => leads.id),
  designType: varchar("design_type", { enum: ["garden", "pool", "irrigation", "lighting", "playground", "full_landscape"] }).notNull(),
  inputData: jsonb("input_data"), // JSON of input parameters
  generatedDesign: jsonb("generated_design"), // JSON of AI output
  imageUrls: text("image_urls").array(),
  status: varchar("status", { enum: ["generating", "ready", "approved", "rejected"] }).default("generating"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Smart irrigation systems
export const irrigationSystems = pgTable("irrigation_systems", {
  id: uuid("id").primaryKey().defaultRandom(),
  projectId: uuid("project_id").references(() => projects.id).notNull(),
  systemType: varchar("system_type", { enum: ["drip", "spray", "smart", "hybrid"] }).notNull(),
  zones: integer("zones").default(1),
  sensors: text("sensors").array(), // Types of sensors installed
  schedule: jsonb("schedule"), // JSON of watering schedule
  isActive: boolean("is_active").default(true),
  lastMaintenance: timestamp("last_maintenance"),
  nextMaintenance: timestamp("next_maintenance"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Smart lighting systems  
export const lightingSystems = pgTable("lighting_systems", {
  id: uuid("id").primaryKey().defaultRandom(),
  projectId: uuid("project_id").references(() => projects.id).notNull(),
  systemType: varchar("system_type", { enum: ["led", "solar", "smart", "decorative"] }).notNull(),
  zones: integer("zones").default(1),
  schedule: jsonb("schedule"), // JSON of lighting schedule
  colorSettings: jsonb("color_settings"), // JSON for smart lighting
  isActive: boolean("is_active").default(true),
  energyEfficiency: varchar("energy_efficiency"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Material and equipment inventory
export const inventory = pgTable("inventory", {
  id: uuid("id").primaryKey().defaultRandom(),
  itemName: varchar("item_name").notNull(),
  itemNameAr: varchar("item_name_ar"),
  category: varchar("category", { enum: ["plants", "materials", "equipment", "tools", "decorative"] }).notNull(),
  quantity: integer("quantity").default(0),
  unitPrice: decimal("unit_price", { precision: 10, scale: 2 }),
  supplier: varchar("supplier"),
  location: varchar("location"),
  minStock: integer("min_stock").default(0),
  maxStock: integer("max_stock").default(100),
  lastRestocked: timestamp("last_restocked"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Maintenance schedules and tracking
export const maintenanceSchedules = pgTable("maintenance_schedules", {
  id: uuid("id").primaryKey().defaultRandom(),
  projectId: uuid("project_id").references(() => projects.id).notNull(),
  serviceType: varchar("service_type", { enum: ["irrigation", "lighting", "plants", "pool", "general"] }).notNull(),
  frequency: varchar("frequency", { enum: ["weekly", "monthly", "quarterly", "yearly"] }).notNull(),
  nextDue: timestamp("next_due").notNull(),
  lastCompleted: timestamp("last_completed"),
  assignedTo: varchar("assigned_to").references(() => users.id),
  cost: decimal("cost", { precision: 10, scale: 2 }),
  notes: text("notes"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Pool systems and configurations
export const poolSystems = pgTable("pool_systems", {
  id: uuid("id").primaryKey().defaultRandom(),
  projectId: uuid("project_id").references(() => projects.id).notNull(),
  poolType: varchar("pool_type", { enum: ["infinity", "lap", "recreational", "natural", "spa"] }).notNull(),
  size: varchar("size"), // dimensions
  depth: varchar("depth"),
  filtrationSystem: varchar("filtration_system"),
  heatingSystem: varchar("heating_system"),
  lightingSystem: varchar("lighting_system"),
  automationLevel: varchar("automation_level", { enum: ["basic", "advanced", "smart"] }).default("basic"),
  maintenanceSchedule: jsonb("maintenance_schedule"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  clientProjects: many(projects, { relationName: "clientProjects" }),
  managedProjects: many(projects, { relationName: "managedProjects" }),
  projectUpdates: many(projectUpdates),
  quotes: many(quotes),
}));

export const projectsRelations = relations(projects, ({ one, many }) => ({
  client: one(users, {
    fields: [projects.clientId],
    references: [users.id],
    relationName: "clientProjects",
  }),
  manager: one(users, {
    fields: [projects.managerId],
    references: [users.id],
    relationName: "managedProjects",
  }),
  projectServices: many(projectServices),
  updates: many(projectUpdates),
  quotes: many(quotes),
}));

export const servicesRelations = relations(services, ({ many }) => ({
  projectServices: many(projectServices),
}));

export const projectServicesRelations = relations(projectServices, ({ one }) => ({
  project: one(projects, {
    fields: [projectServices.projectId],
    references: [projects.id],
  }),
  service: one(services, {
    fields: [projectServices.serviceId],
    references: [services.id],
  }),
}));

export const projectUpdatesRelations = relations(projectUpdates, ({ one }) => ({
  project: one(projects, {
    fields: [projectUpdates.projectId],
    references: [projects.id],
  }),
  user: one(users, {
    fields: [projectUpdates.userId],
    references: [users.id],
  }),
}));

export const quotesRelations = relations(quotes, ({ one }) => ({
  client: one(users, {
    fields: [quotes.clientId],
    references: [users.id],
  }),
  project: one(projects, {
    fields: [quotes.projectId],
    references: [projects.id],
  }),
}));

// New Relations for advanced features
export const leadsRelations = relations(leads, ({ one, many }) => ({
  assignedUser: one(users, {
    fields: [leads.assignedTo],
    references: [users.id],
  }),
  aiDesigns: many(aiDesigns),
}));

export const aiDesignsRelations = relations(aiDesigns, ({ one }) => ({
  project: one(projects, {
    fields: [aiDesigns.projectId],
    references: [projects.id],
  }),
  lead: one(leads, {
    fields: [aiDesigns.leadId],
    references: [leads.id],
  }),
}));

export const irrigationSystemsRelations = relations(irrigationSystems, ({ one }) => ({
  project: one(projects, {
    fields: [irrigationSystems.projectId],
    references: [projects.id],
  }),
}));

export const lightingSystemsRelations = relations(lightingSystems, ({ one }) => ({
  project: one(projects, {
    fields: [lightingSystems.projectId],
    references: [projects.id],
  }),
}));

export const maintenanceSchedulesRelations = relations(maintenanceSchedules, ({ one }) => ({
  project: one(projects, {
    fields: [maintenanceSchedules.projectId],
    references: [projects.id],
  }),
  assignedUser: one(users, {
    fields: [maintenanceSchedules.assignedTo],
    references: [users.id],
  }),
}));

export const poolSystemsRelations = relations(poolSystems, ({ one }) => ({
  project: one(projects, {
    fields: [poolSystems.projectId],
    references: [projects.id],
  }),
}));

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertServiceSchema = createInsertSchema(services).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertProjectUpdateSchema = createInsertSchema(projectUpdates).omit({
  id: true,
  createdAt: true,
});

export const insertQuoteSchema = createInsertSchema(quotes).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// New insert schemas for advanced features
export const insertLeadSchema = createInsertSchema(leads).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertAiDesignSchema = createInsertSchema(aiDesigns).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertIrrigationSystemSchema = createInsertSchema(irrigationSystems).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertLightingSystemSchema = createInsertSchema(lightingSystems).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertInventorySchema = createInsertSchema(inventory).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertMaintenanceScheduleSchema = createInsertSchema(maintenanceSchedules).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertPoolSystemSchema = createInsertSchema(poolSystems).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Types
export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;
export type Service = typeof services.$inferSelect;
export type InsertService = z.infer<typeof insertServiceSchema>;
export type Project = typeof projects.$inferSelect;
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type ProjectUpdate = typeof projectUpdates.$inferSelect;
export type InsertProjectUpdate = z.infer<typeof insertProjectUpdateSchema>;
export type Quote = typeof quotes.$inferSelect;
export type InsertQuote = z.infer<typeof insertQuoteSchema>;

// New types for advanced features
export type Lead = typeof leads.$inferSelect;
export type InsertLead = z.infer<typeof insertLeadSchema>;
export type AiDesign = typeof aiDesigns.$inferSelect;
export type InsertAiDesign = z.infer<typeof insertAiDesignSchema>;
export type IrrigationSystem = typeof irrigationSystems.$inferSelect;
export type InsertIrrigationSystem = z.infer<typeof insertIrrigationSystemSchema>;
export type LightingSystem = typeof lightingSystems.$inferSelect;
export type InsertLightingSystem = z.infer<typeof insertLightingSystemSchema>;
export type InventoryItem = typeof inventory.$inferSelect;
export type InsertInventoryItem = z.infer<typeof insertInventorySchema>;
export type MaintenanceSchedule = typeof maintenanceSchedules.$inferSelect;
export type InsertMaintenanceSchedule = z.infer<typeof insertMaintenanceScheduleSchema>;
export type PoolSystem = typeof poolSystems.$inferSelect;
export type InsertPoolSystem = z.infer<typeof insertPoolSystemSchema>;
