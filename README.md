# Autonomous Business Finance Platform (ABFP)

[![Node.js](https://img.shields.io/badge/Node.js-24+-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![NestJS](https://img.shields.io/badge/NestJS-12-E0234E?logo=nestjs&logoColor=white)](https://nestjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-6.4-2D3748?logo=prisma&logoColor=white)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16+-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org/)

An industrial-grade, browser-based **Autonomous Business Finance Platform (ABFP)** designed for automated financial reconciliation, treasury analysis, autonomous audit tracing, and intelligent capital decision-making.

> [!NOTE]
> **Phase 1 Milestone**: This repository contains the initialized foundational architecture, decoupled client-server environments, Prisma ORM PostgreSQL configuration, and health diagnostic telemetry. Per design governance, speculative financial logic, AI agent SDKs, and business modules remain uninstantiated until subsequent phases.

---

## Architecture Topology

```
autonomous-business-finance/
├── backend/                  # NestJS 12 Enterprise REST API
│   ├── prisma/               # Prisma ORM schema & migrations
│   │   └── schema.prisma
│   ├── src/
│   │   ├── common/           # Cross-cutting filters & interceptors
│   │   ├── config/           # Type-safe configuration service
│   │   ├── database/         # PrismaService & connection lifecycle
│   │   ├── health/           # GET /api/health controller & service
│   │   ├── app.module.ts     # Root dependency injection container
│   │   └── main.ts           # Application bootstrap entry
│   ├── test/                 # Vitest e2e & integration tests
│   ├── .env.example          # Backend environment template
│   ├── eslint.config.js      # ESLint flat configuration
│   └── package.json
├── frontend/                 # React 19 + TypeScript + Vite SPA
│   ├── src/
│   │   ├── components/       # High-density UI & health status cards
│   │   ├── services/         # API client & health API callers
│   │   ├── types/            # TypeScript data contracts & DTOs
│   │   ├── App.tsx           # Primary platform view
│   │   ├── index.css         # Tailwind CSS v4 entry
│   │   └── main.tsx          # React application root
│   ├── .env.example          # Frontend environment template
│   ├── eslint.config.js      # Frontend ESLint flat configuration
│   ├── package.json
│   └── vite.config.ts        # Vite configuration & proxy routes
├── docs/                     # Architectural specifications
│   └── architecture.md
├── .gitignore                # Root secret and artifact protections
└── README.md                 # System documentation & runbook
```

---

## Technology Stack

| Layer | Technologies | Description |
| :--- | :--- | :--- |
| **Frontend** | React 19, TypeScript 5.8, Vite 8, Tailwind CSS v4, Lucide React | High-performance responsive web client with dark-mode financial density. |
| **Backend** | NestJS 12, Node.js 24, TypeScript, Express engine | Enterprise modular REST API with dependency injection & global exception filters. |
| **Database** | PostgreSQL 16+, Prisma ORM 6.4 | Type-safe declarative schema modeling and connection lifecycle management. |
| **Code Quality** | ESLint (Flat Config), Prettier, Vitest | Static analysis, automated deterministic formatting, and unit testing suites. |

---

## Getting Started

### Prerequisites
- **Node.js**: `v20.x` or `v24.x` (Recommended: `v24.19.0+`)
- **npm**: `v10.x` or `v12.x`
- **PostgreSQL**: `v14+` or `v16+` (local service or managed cloud instance)
- **Git**

---

### Step 1: Clone & Configure Environments

1. Clone repository:
   ```bash
   git clone <repository-url>
   cd autonomous-business-finance
   ```

2. Configure backend environment:
   ```bash
   cp backend/.env.example backend/.env
   ```
   *Edit `backend/.env` to configure your PostgreSQL credentials:*
   ```env
   PORT=3000
   NODE_ENV=development
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/abfp_dev?schema=public"
   CORS_ORIGIN="http://localhost:5173"
   ```

3. Configure frontend environment:
   ```bash
   cp frontend/.env.example frontend/.env
   ```
   *`frontend/.env` contents:*
   ```env
   VITE_API_BASE_URL="http://localhost:3000"
   ```

---

### Step 2: Install Dependencies & Setup Prisma

1. **Backend Setup**:
   ```bash
   cd backend
   npm install
   npx prisma generate
   ```

   *(Optional) If your PostgreSQL server is active, push the initial schema:*
   ```bash
   npx prisma db push
   ```

2. **Frontend Setup**:
   ```bash
   cd ../frontend
   npm install
   ```

---

### Step 3: Run the Development Servers

Open two terminal sessions:

#### Terminal 1 — Start Backend API
```bash
cd backend
npm run start:dev
```
*The backend REST API will listen on `http://localhost:3000/api`.*

#### Terminal 2 — Start Frontend Client
```bash
cd frontend
npm run dev
```
*The Vite development server will open on `http://localhost:5173`.*

---

## Health-Check Endpoint Specification

- **Endpoint**: `GET /api/health`
- **Controller**: `HealthController` (`backend/src/health/health.controller.ts`)
- **Service**: `HealthService` (`backend/src/health/health.service.ts`)
- **Response Format**: `application/json`

### Sample Response (`HTTP 200 OK`)
```json
{
  "status": "ok",
  "service": "autonomous-business-finance-api",
  "version": "1.0.0",
  "environment": "development",
  "timestamp": "2026-11-01T12:00:00.000Z",
  "uptimeSeconds": 142,
  "database": {
    "status": "connected",
    "provider": "postgresql",
    "message": "PostgreSQL connection verified via Prisma query execution"
  },
  "system": {
    "nodeVersion": "v24.19.0",
    "memoryUsageMB": 72
  }
}
```

> [!TIP]
> If PostgreSQL is temporarily offline during initial scaffolding, the health-check gracefully reports `"status": "degraded"` with `"database.status": "disconnected"` without throwing unhandled exceptions or crashing the API process.

---

## Verification & Quality Assurance Runbook

### Backend Quality Commands
```bash
cd backend

# Execute unit tests
npm test

# Run ESLint analysis
npm run lint

# Check Prettier formatting
npm run format:check

# Compile production bundle
npm run build
```

### Frontend Quality Commands
```bash
cd frontend

# Run ESLint analysis
npm run lint

# Check Prettier formatting
npm run format:check

# Compile production bundle
npm run build
```

---

## Phase 1 Deliverables Checklist

- [x] Separate `frontend/` and `backend/` applications established.
- [x] React 19, TypeScript, and Vite configured.
- [x] NestJS 12 and TypeScript configured.
- [x] Tailwind CSS v4 utility styling configured.
- [x] Prisma ORM 6.4 configured with PostgreSQL datasource and initial schema.
- [x] Environment configuration management via `@nestjs/config` and `.env.example`.
- [x] Clean, scalable folder structure (`components/`, `services/`, `types/`, `database/`, `health/`, `common/filters/`).
- [x] Root and sub-project `.gitignore` rules preventing tracking of secrets or build outputs.
- [x] ESLint flat config and Prettier formatting configured across frontend and backend.
- [x] Frontend title: "Autonomous Business Finance Platform" with responsive UI.
- [x] Backend health-check endpoint: `GET /api/health`.
- [x] Frontend-to-backend API communication service (`apiClient.ts` and `healthApi.ts`).
- [x] Global exception handling and formatted error payloads (`all-exceptions.filter.ts`).
- [x] Zero hardcoded credentials or API keys.

---

## Next Steps (Phase 2 Roadmap)
1. PostgreSQL database migration pipeline and core financial entity relational modeling (Accounts, Ledgers, Transactions).
2. Authentication & Authorization (JWT, RBAC, API Keys).
3. Financial Data Ingestion pipeline & Autonomous Agent Orchestration engine.
