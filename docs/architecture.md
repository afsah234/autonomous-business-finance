# Autonomous Business Finance Platform (ABFP) - Architecture & System Design

## 1. Overview
The Autonomous Business Finance Platform (ABFP) is an industrial-grade, browser-based financial operations and intelligence platform. 

This document defines the foundational architecture established in Phase 1: Environment & Project Initialization.

## 2. System Topology
The platform follows a decoupled, monorepo-friendly multi-package client-server architecture:

```
[ Client: React + Vite + Tailwind CSS ]
                   |
            (HTTP / REST JSON)
                   |
                   v
[ API Server: NestJS (Express Engine) ]
                   |
            (Prisma ORM)
                   |
                   v
[ Database: PostgreSQL 16+ ]
```

## 3. Directory Layout
```
autonomous-business-finance/
├── backend/                  # NestJS backend REST API
│   ├── prisma/               # Prisma ORM schema & migrations
│   │   └── schema.prisma
│   ├── src/
│   │   ├── common/           # Shared filters, interceptors, pipes, decorators
│   │   ├── config/           # Environment configuration & validation
│   │   ├── database/         # PrismaService and database modules
│   │   ├── health/           # Health-check endpoints & system diagnostics
│   │   ├── app.module.ts     # Root NestJS application module
│   │   └── main.ts           # Application bootstrap entry point
│   ├── test/                 # E2E test suites
│   ├── .env.example          # Sample environment variables
│   ├── package.json
│   └── tsconfig.json
├── frontend/                 # React + TypeScript + Vite SPA
│   ├── src/
│   │   ├── assets/           # Static images, icons, and fonts
│   │   ├── components/       # Reusable UI components & layouts
│   │   ├── hooks/            # Custom React hooks
│   │   ├── services/         # API clients and HTTP communication layer
│   │   ├── types/            # TypeScript data contracts & DTOs
│   │   ├── App.tsx           # Root UI component
│   │   ├── index.css         # Tailwind CSS entry & custom directives
│   │   └── main.tsx          # React DOM render entry point
│   ├── public/               # Public assets
│   ├── .env.example          # Sample frontend environment variables
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.ts    # Tailwind CSS configuration
│   ├── tsconfig.json
│   └── vite.config.ts
├── docs/                     # Architectural & onboarding documentation
│   └── architecture.md
├── .gitignore                # Root gitignore protecting secrets and artifacts
└── README.md                 # Complete platform onboarding and developer runbook
```

## 4. Backend Architecture (NestJS)
- **Modularity**: Domain logic is partitioned into dedicated NestJS modules (`HealthModule`, `DatabaseModule`, `ConfigModule`).
- **Configuration Management**: Strictly validated environment variables via `@nestjs/config` and schema validation. Database credentials, ports, and API secrets are never committed.
- **Data Layer**: Prisma ORM with connection pooling, declarative schema modeling, and type-safe query generation for PostgreSQL.
- **Resilience & Diagnostics**: Built-in global exception filters, standard response envelopes, and dedicated health diagnostics endpoints (`/api/health`).
- **CORS & Security**: Standardized CORS headers allowing controlled cross-origin communication between the frontend client and backend API.

## 5. Frontend Architecture (React + Vite)
- **Build Tool**: Vite provides near-instant HMR (Hot Module Replacement) and optimized tree-shaken production bundles.
- **Type Safety**: End-to-end TypeScript enforcement aligning DTOs with backend models.
- **Styling**: Tailwind CSS utility-first framework for responsive, accessible, high-density financial data presentation.
- **API Communication**: Centralized HTTP client service (`apiClient`) with standard error extraction, base URL configuration via `VITE_API_BASE_URL`, and graceful retry/fallback patterns.

## 6. Security & Credential Hygiene
- All secrets, tokens, credentials, and connection strings reside exclusively in local `.env` files.
- `.gitignore` prevents tracking of `.env`, `node_modules`, build artifacts (`dist/`), and runtime cache files.
- Sample environment variables are documented with clear placeholders in `.env.example` across both frontend and backend.
