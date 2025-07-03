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
