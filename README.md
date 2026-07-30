# Project Architecture
This project is a **Full Stack monolithic application** built with:

- Next.js (App Router)
- React
- TypeScript
- Node.js
- Tailwind CSS
- Prisma ORM
- PostgreSQL

The application follows a scalable architecture combining:

- **Feature-Sliced Design (FSD)** for frontend organization.
- **Clean Architecture** for backend separation.
- **Domain-Driven Design (DDD)** for business logic.
- **Atomic Design principles** for UI components.

The main objective is to keep responsibilities separated while maintaining a simple deployment strategy using a single Next.js repository.

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
│   ├── widgets/
│   │   └── navbar/
│   │       ├── ui/
│   │       │   └── Navbar.tsx
│   │       └── index.ts
│   │
│   ├── features/
│   ├── entities/
│   └── shared/
│       ├── ui/
│       ├── hooks/
│       └── lib/
│
├── server/
│   # Clean Architecture + DDD
│   ├── domain/
│   ├── application/
│   ├── infrastructure/
│   └── interfaces/
│
├── shared/
│   # Código realmente compartido frontend/backend
│
├── prisma/
│   └── schema.prisma
│
├── public/
│
├── package.json
└── README.md
```

---

# Frontend Architecture
The frontend follows Feature-Sliced Design principles and The UI layer follows Atomic Design concepts.

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
├── dashboard/
├── profile/
└── login/
```

## Widgets Layer

Widgets are large reusable UI blocks. They combine: features, shared UI or entities

```text
widgets/

├── navbar/
├── sidebar/
└── user-table/
```

## Features Layer
Features represent user actions and business capabilities. A feature owns everything required for a specific user action: UI, hooks, api communication, validations...

```text
features/

├── authentication/
├── create-user/
├── update-profile/
├── checkout/
└── search-products/
```

## Entities Layer

Entities represent frontend business objects. Entities contain: models, types...

```text
entities/

├── user/
├── product/
├── order/
└── category/
```

## Shared Frontend Layer

Shared contains reusable code without business meaning.

```text
shared/

├── ui/
├── hooks/
├── utils/
├── constants/
├── config/
└── types/
```

Shared must not depend on features, pages or entities

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
├── infrastructure/
└── interfaces/
```

---

## Domain Layer

The Domain layer contains the core business rules.

Example:

```text
domain/

└── user/

    ├── entities/
    ├── value-objects/
    ├── repositories/
    └── services/
```

Contains:

- Domain entities.
- Value Objects.
- Domain services.
- Repository contracts.
- Domain events.

---

## Application Layer

The Application layer contains use cases.

Examples:

```text
application/

├── create-user/
├── login-user/
├── update-profile/
└── create-order/
```

Responsibilities:

- Execute application workflows.
- Coordinate domain operations.
- Validate business processes.

Example flow:

```text
CreateUserUseCase

        |

        v

User Domain Entity

        |

        v

User Repository Interface
```

---

## Infrastructure Layer

The Infrastructure layer contains technical implementations.

Example:

```text
infrastructure/

├── database/
│
│   └── prisma/
│
├── repositories/
├── email/
├── storage/
└── external-services/
```

Responsibilities:

- Prisma implementation.
- Database access.
- External APIs.
- Email providers.
- File storage.

Infrastructure implements interfaces defined by the domain.

---

## Interfaces Layer

The Interfaces layer connects external requests with the application.

Example:

```text
interfaces/

├── api/
├── actions/
├── controllers/
└── validators/
```

Contains:

- Next.js Route Handlers.
- Server Actions.
- Request validation.
- Input mapping.

This layer communicates with Application Use Cases.

---

# Database Architecture

The application uses Prisma as the database access layer.

The dependency flow is:

```text
Frontend

↓

Server Action / API Route

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

# Development

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Application:

```text
http://localhost:3000
```