import {
  users,
  services,
  projects,
  projectUpdates,
  quotes,
  type User,
  type UpsertUser,
  type Service,
  type InsertService,
  type Project,
  type InsertProject,
  type ProjectUpdate,
  type InsertProjectUpdate,
  type Quote,
  type InsertQuote,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, sql } from "drizzle-orm";

// Interface for storage operations
export interface IStorage {
  // User operations (mandatory for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Service operations
  getServices(): Promise<Service[]>;
  getService(id: number): Promise<Service | undefined>;
  createService(service: InsertService): Promise<Service>;
  updateService(id: number, service: Partial<InsertService>): Promise<Service>;
  deleteService(id: number): Promise<void>;
  
  // Project operations
  getProjects(): Promise<Project[]>;
  getProject(id: string): Promise<Project | undefined>;
  getProjectsByClient(clientId: string): Promise<Project[]>;
  getProjectsByManager(managerId: string): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: string, project: Partial<InsertProject>): Promise<Project>;
  deleteProject(id: string): Promise<void>;
  
  // Project updates
  getProjectUpdates(projectId: string): Promise<ProjectUpdate[]>;
  createProjectUpdate(update: InsertProjectUpdate): Promise<ProjectUpdate>;
  
  // Quote operations
  getQuotes(): Promise<Quote[]>;
  getQuote(id: string): Promise<Quote | undefined>;
  getQuotesByClient(clientId: string): Promise<Quote[]>;
  createQuote(quote: InsertQuote): Promise<Quote>;
  updateQuote(id: string, quote: Partial<InsertQuote>): Promise<Quote>;
  
  // Dashboard stats
  getDashboardStats(): Promise<{
    activeProjects: number;
    completedProjects: number;
    totalRevenue: number;
    monthlyRevenue: number;
    netProfit: number;
    pendingPayments: number;
  }>;
}

export class DatabaseStorage implements IStorage {
  // User operations (mandatory for Replit Auth)
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Service operations
  async getServices(): Promise<Service[]> {
    return await db.select().from(services).where(eq(services.isActive, true));
  }

  async getService(id: number): Promise<Service | undefined> {
    const [service] = await db.select().from(services).where(eq(services.id, id));
    return service;
  }

  async createService(service: InsertService): Promise<Service> {
    const [newService] = await db.insert(services).values(service).returning();
    return newService;
  }

  async updateService(id: number, service: Partial<InsertService>): Promise<Service> {
    const [updatedService] = await db
      .update(services)
      .set({ ...service, updatedAt: new Date() })
      .where(eq(services.id, id))
      .returning();
    return updatedService;
  }

  async deleteService(id: number): Promise<void> {
    await db.update(services).set({ isActive: false }).where(eq(services.id, id));
  }

  // Project operations
  async getProjects(): Promise<Project[]> {
    return await db.select().from(projects).orderBy(desc(projects.createdAt));
  }

  async getProject(id: string): Promise<Project | undefined> {
    const [project] = await db.select().from(projects).where(eq(projects.id, id));
    return project;
  }

  async getProjectsByClient(clientId: string): Promise<Project[]> {
    return await db.select().from(projects).where(eq(projects.clientId, clientId));
  }

  async getProjectsByManager(managerId: string): Promise<Project[]> {
    return await db.select().from(projects).where(eq(projects.managerId, managerId));
  }

  async createProject(project: InsertProject): Promise<Project> {
    const [newProject] = await db.insert(projects).values(project).returning();
    return newProject;
  }

  async updateProject(id: string, project: Partial<InsertProject>): Promise<Project> {
    const [updatedProject] = await db
      .update(projects)
      .set({ ...project, updatedAt: new Date() })
      .where(eq(projects.id, id))
      .returning();
    return updatedProject;
  }

  async deleteProject(id: string): Promise<void> {
    await db.delete(projects).where(eq(projects.id, id));
  }

  // Project updates
  async getProjectUpdates(projectId: string): Promise<ProjectUpdate[]> {
    return await db
      .select()
      .from(projectUpdates)
      .where(eq(projectUpdates.projectId, projectId))
      .orderBy(desc(projectUpdates.createdAt));
  }

  async createProjectUpdate(update: InsertProjectUpdate): Promise<ProjectUpdate> {
    const [newUpdate] = await db.insert(projectUpdates).values(update).returning();
    return newUpdate;
  }

  // Quote operations
  async getQuotes(): Promise<Quote[]> {
    return await db.select().from(quotes).orderBy(desc(quotes.createdAt));
  }

  async getQuote(id: string): Promise<Quote | undefined> {
    const [quote] = await db.select().from(quotes).where(eq(quotes.id, id));
    return quote;
  }

  async getQuotesByClient(clientId: string): Promise<Quote[]> {
    return await db.select().from(quotes).where(eq(quotes.clientId, clientId));
  }

  async createQuote(quote: InsertQuote): Promise<Quote> {
    const [newQuote] = await db.insert(quotes).values(quote).returning();
    return newQuote;
  }

  async updateQuote(id: string, quote: Partial<InsertQuote>): Promise<Quote> {
    const [updatedQuote] = await db
      .update(quotes)
      .set({ ...quote, updatedAt: new Date() })
      .where(eq(quotes.id, id))
      .returning();
    return updatedQuote;
  }

  // Dashboard stats
  async getDashboardStats(): Promise<{
    activeProjects: number;
    completedProjects: number;
    totalRevenue: number;
    monthlyRevenue: number;
    netProfit: number;
    pendingPayments: number;
  }> {
    const [activeProjects] = await db
      .select({ count: sql<number>`count(*)` })
      .from(projects)
      .where(eq(projects.status, "in_progress"));

    const [completedProjects] = await db
      .select({ count: sql<number>`count(*)` })
      .from(projects)
      .where(eq(projects.status, "completed"));

    const [totalRevenue] = await db
      .select({ sum: sql<number>`coalesce(sum(${projects.value}), 0)` })
      .from(projects)
      .where(eq(projects.status, "completed"));

    const [monthlyRevenue] = await db
      .select({ sum: sql<number>`coalesce(sum(${projects.value}), 0)` })
      .from(projects)
      .where(
        and(
          eq(projects.status, "completed"),
          sql`extract(month from ${projects.createdAt}) = extract(month from now())`,
          sql`extract(year from ${projects.createdAt}) = extract(year from now())`
        )
      );

    const [pendingPayments] = await db
      .select({ sum: sql<number>`coalesce(sum(${projects.value}), 0)` })
      .from(projects)
      .where(eq(projects.status, "in_progress"));

    return {
      activeProjects: activeProjects?.count || 0,
      completedProjects: completedProjects?.count || 0,
      totalRevenue: totalRevenue?.sum || 0,
      monthlyRevenue: monthlyRevenue?.sum || 0,
      netProfit: (monthlyRevenue?.sum || 0) * 0.3, // 30% profit margin
      pendingPayments: pendingPayments?.sum || 0,
    };
  }
}

export const storage = new DatabaseStorage();
