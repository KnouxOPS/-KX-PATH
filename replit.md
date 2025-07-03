# KX PATH - Landscape AI-OS

## Overview

KX PATH is a comprehensive AI-powered landscape management platform designed for "طريق الخبرة" (Path of Experience) company in the UAE. This system serves as an operating system for luxury landscaping businesses, providing end-to-end project management, AI-driven design tools, and multi-role dashboards for managers, clients, and field workers.

## System Architecture

The application follows a full-stack architecture with:
- **Frontend**: React with TypeScript, Vite build system, and Tailwind CSS for styling
- **Backend**: Express.js server with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Replit-based authentication system
- **UI Framework**: Radix UI components with custom glassmorphism styling

## Key Components

### Frontend Architecture
- **Component-based React architecture** with TypeScript for type safety
- **Tailwind CSS with custom design system** featuring glassmorphism effects and Arabic/English language support
- **Responsive design** optimized for both desktop and mobile experiences
- **State management** using TanStack Query for server state and React hooks for local state

### Backend Architecture
- **Express.js REST API** with TypeScript
- **Modular route structure** with authentication middleware
- **Database abstraction layer** using Drizzle ORM
- **Session management** with PostgreSQL-based storage

### Database Schema
- **Users table** with role-based access (manager, client, field_worker)
- **Services table** with bilingual support (Arabic/English)
- **Projects table** with status tracking and client relationships
- **Quotes table** for pricing and proposal management
- **Project updates table** for real-time progress tracking
- **Sessions table** for authentication state management

### Authentication System
- **Replit-based OIDC authentication** with custom passport strategy
- **Role-based access control** with different permissions for different user types
- **Session persistence** with PostgreSQL storage
- **Secure cookie management** with proper HTTPS configuration

## Data Flow

1. **User Authentication**: Users authenticate through Replit's OIDC system
2. **Role-based Routing**: Different dashboards and features based on user roles
3. **API Communication**: Frontend communicates with backend via REST APIs
4. **Real-time Updates**: Project status and updates are tracked in real-time
5. **Bilingual Support**: All content is available in both Arabic and English

## External Dependencies

### Core Technologies
- **@neondatabase/serverless**: Database connectivity
- **drizzle-orm**: Type-safe database operations
- **@tanstack/react-query**: Server state management
- **express**: Web server framework
- **passport**: Authentication middleware

### UI Components
- **@radix-ui/***: Accessible UI component primitives
- **tailwindcss**: Utility-first CSS framework
- **lucide-react**: Icon library
- **class-variance-authority**: Component variant management

### Development Tools
- **vite**: Build tool and development server
- **typescript**: Type checking and compilation
- **tsx**: TypeScript execution for development

## Deployment Strategy

The application is configured for deployment on Replit with:
- **Development mode**: Uses Vite dev server with HMR
- **Production build**: Compiled with Vite and esbuild
- **Database**: PostgreSQL with connection pooling
- **Environment variables**: Secure configuration management
- **Session storage**: PostgreSQL-based session management

## Changelog

- July 03, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.