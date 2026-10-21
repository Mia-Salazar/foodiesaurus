# Foodiesaurus

App to find restaurants that work for people with food allergies. The UI is in Spanish. Accessibility target: **WCAG 2.2 Level AAA** and **lectura fácil**.

---

# Project Architecture

This project is a **Full Stack monolithic application** built with:

- Next.js 16 (App Router)
- React
- TypeScript
- Node.js
- Tailwind CSS
- Prisma ORM
- PostgreSQL
- [pnpm](https://pnpm.io)

The application follows a scalable architecture combining:

- **Feature-Sliced Design (FSD)** for frontend organization.
- **Clean Architecture** for backend separation.
- **Domain-Driven Design (DDD)** for business logic.
- **Atomic Design principles** for UI components.

The main objective is to keep responsibilities separated while maintaining a simple deployment strategy using a single Next.js repository.

The client **never imports Prisma**. Pages and `/api` routes call application use cases.

---

# What exists today

| Area | What it does |
| --- | --- |
| Home `/` | Rita, search by name and province (Madrid, Barcelona, Sevilla) |
| Results `/restaurants?province=&term=&sort=` | List from `GET /api/restaurants`, sort by name or score, empty state with create |
| Detail `/restaurants/[id]` | `GET /api/restaurants/[id]`: data, map, averages, comments |
| Create `/restaurants/create` | Empty page (not built yet) |
| About `/about` | Prehistoria |
| Login `/login` | Google via NextAuth |

Search requires a province and accepts an optional name term. Detail scores use the weighted general note (attention, allergen chart, fidelity, allergic reactions). List cards use the simple average of review `generalScore`.

---

# Architecture Overview

The project follows a **modular monolith architecture**.

Frontend and backend live in the same repository, but they have clearly separated responsibilities.

```text
project-root/
├── app/
│   # Next.js App Router
│   # layouts, routes, API endpoints
│
├── client/
│   # Frontend architecture (FSD)
│   ├── pages/
│   ├── widgets/      # Big reusable UI blocks
│   ├── features/     # User actions
│   ├── entities/     # Doesn't know a thing about business logic
│   └── shared/
│       ├── ui/
│       ├── hooks/
│       └── lib/
│
├── server/
│   # Clean Architecture + DDD
│   ├── domain/
│   ├── application/
│   └── infraestructure/   # folder name in this repo
│
├── prisma/
│   └── schema.prisma
│
├── tests/
│   └── fakes/             # In-memory repository for use-case tests
│
├── public/
│
├── .cursor/
│   ├── skills/            # Agent skills
│   ├── rules/             # Test naming
│   └── mcp.json           # weAAAre readability MCP
│
├── package.json
├── pnpm-lock.yaml
└── README.md
```

HTTP entry is `app/` (pages and Route Handlers). There is no `server/interfaces` folder: a route validates input, runs a use case, and returns JSON or a page.

---

# Frontend Architecture

The frontend follows Feature-Sliced Design principles and the UI layer follows Atomic Design concepts.

```
Frontend
├── Pages
├── Widgets
├── Features
├── Entities
│
└── Shared
    │
    └── UI
        │
        └── Atomic Design
            │
            ├── Atoms
            ├── Molecules
            ├── Organisms
            └── Templates
```

## Pages Layer

The Pages layer represents application screens and routes.

```text
client/pages/
├── home/
├── restaurants/     # list, detail, create
├── about/
└── login/
```

## Widgets Layer

Widgets are large reusable UI blocks. They combine features, shared UI or entities.

```text
client/widgets/
├── Header.tsx
└── Footer.tsx
```

## Features Layer

Features represent user actions and business capabilities. A feature owns everything required for a specific user action: UI, hooks, API communication, validations...

```text
client/features/
└── search-restaurants/
    ├── api/
    ├── hooks/
    └── lib/sortRestaurants.ts
```

## Entities Layer

Entities represent frontend business objects. Entities contain models, types, small shared UI for that object.

```text
client/entities/restaurant/
├── model/types.ts
├── restaurant.constants.ts
├── lib/             # formatScore, hasValue
└── ui/              # RestaurantCard, InfoRow
```

## Shared Frontend Layer

Shared contains reusable code without business meaning. Doesn't know a thing about business.

```text
client/shared/
└── ui/atoms/
    ├── Button.tsx
    ├── Input.tsx
    ├── Loader.tsx
    ├── SkipToContent.tsx
    └── ...
```

Shared must not depend on features, pages or entities.

---

# Backend Architecture

The backend follows:

- Clean Architecture.
- Domain-Driven Design.

The objective is to isolate business rules from technical details.

Structure:

```text
server/
├── domain/
├── application/
└── infraestructure/
```

---

## Domain Layer

The Domain layer contains the core business rules.

```text
server/domain/restaurant/
├── entities/
├── repositories/restaurant.repository.ts
└── lib/computeRestaurantAverages.ts
```

Contains:

- Domain entities.
- Value Objects.
- Domain services.
- Repository contracts.
- Domain events.

The repository **contract** lives here. Implementations live in infraestructure.

---

## Application Layer

The Application layer contains use cases.

```text
server/application/
├── get-restaurants-by-province/
└── get-restaurant-by-id/
```

Responsibilities:

- Execute application workflows.
- Coordinate domain operations.
- Validate business processes.

Example flow:

```text
SearchRestaurantsUseCase
        |
        v
Restaurant Domain Entity
        |
        v
Restaurant Repository Interface
```

Use cases depend on `RestaurantRepository`, never on Prisma.

---

## Infrastructure Layer

The Infrastructure layer contains technical implementations. In this repo the folder is named `infraestructure`.

```text
server/infraestructure/
├── database/prisma.ts
├── repositories/prisma-restaurant.repository.ts
└── validators/
```

Responsibilities:

- Prisma implementation.
- Database access.
- External APIs.
- Request validation at the HTTP edge.
- Email providers.
- File storage.

Infrastructure implements interfaces defined by the domain.

---

## Interfaces (HTTP)

Next.js connects external requests with the application. That lives in `app/`, not under `server/`.

```text
app/
├── page.tsx
├── restaurants/
│   ├── page.tsx
│   ├── [id]/page.tsx
│   └── create/page.tsx
├── about/
├── login/
└── api/
    ├── restaurants/route.ts
    ├── restaurants/[id]/route.ts
    └── auth/[...nextauth]/route.ts
```

Contains:

- Next.js Route Handlers.
- Server Actions.
- Request validation (Zod in infraestructure, called from the route).
- Input mapping.

This layer communicates with Application Use Cases.

---

# Database Architecture

The application uses Prisma as the database access layer.

The dependency flow is:

```text
Frontend
        ↓
Server Component / API Route
        ↓
Application Use Case
        ↓
Domain Repository Interface
        ↓
Prisma Repository
        ↓
PostgreSQL
```

The frontend never accesses Prisma directly.

---

# Design Principles

This project follows:

- Clean Architecture.
- Domain Driven Design.
- Feature-Sliced Design.
- Atomic Design principles.
- Single Responsibility Principle.
- Dependency Inversion Principle.
- Separation of Concerns.
- Composition over inheritance.
- **SOLID**: one use case per action; ports in domain; Prisma only in infra.
- **DRY**: share a rule only when it is the same reason in more than one place (`formatScore`, `hasValue`, `sortRestaurants`, `computeRestaurantAverages`, `InfoRow`).
- **KISS**: no extra layers, stores, or mappers “for later”.
- **YAGNI**: do not add features, fields, or abstractions nobody asked for.

Agent skill: `.cursor/skills/solid-dry-kiss-yagni/`.

---

# Benefits

This architecture provides:

- Clear separation between frontend and backend.
- Independent business logic.
- Easier testing.
- Better maintainability.
- Scalable feature development.
- Reusable UI components.
- Framework-independent domain logic.
- Easier future backend extraction.

---

# Accessibility

Target: **WCAG 2.2 Level AAA** plus Spanish **lectura fácil**.

- Visible labels, skip link, `lang="es"`, keyboard, 44px targets, 7:1 contrast on brand colors.
- Copy: short sentences, one idea each, explain hard words (`carta de alérgenos`, `provincia`).
- Rita’s meteorite joke on the home hero stays; instructions, errors and empty states stay plain.

Measure reading level with weAAAre **`@weaaare/mcp-a11y-readability`** (INFLESZ, prefer *bastante fácil* / *fácil*). Config: `.cursor/mcp.json`. Enable the server in Cursor Settings → MCP if it does not load.

Agent skill: `.cursor/skills/accesibilidad/`.

---

# Tests

Vitest 5 + Testing Library. Tests describe **user behaviour**, not CSS or internals.

- **Integration first**: home / list / detail flows; use cases with the in-memory repository.
- **Unit** only for shared core: `formatScore`, `hasValue`, `sortRestaurants`, `computeRestaurantAverages`.
- Titles in **English**, as nested **Given / And / When / Then** (`describe` / `it`). UI strings stay in Spanish.
- Do not test async App Router pages or Prisma routes with Vitest.

```bash
pnpm test
pnpm test:watch
```

Rule: `.cursor/rules/tests-in-english.mdc`.

---

# Development

This project uses [pnpm](https://pnpm.io) as the package manager. Do not use npm or yarn.

Enable pnpm with Corepack (included with Node.js):

```bash
corepack enable pnpm
```

Install dependencies:

```bash
pnpm install
```

Run development server:

```bash
pnpm dev
```

Application:

```text
http://localhost:3000
```

Prisma studio:

```bash
pnpm prisma studio
```

```text
http://localhost:51212/
```

Migrate database:

```bash
pnpm migrate-data
```
