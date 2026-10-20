---
name: solid-dry-kiss-yagni
description: Enforces SOLID, DRY, KISS, and YAGNI on Foodiesaurus TypeScript, React, and Clean Architecture code. Use when writing, refactoring, reviewing, or adding features, use cases, components, hooks, or domain logic. Prevents extra layers, copy-paste, and unused abstractions.
---

# SOLID, DRY, KISS, YAGNI

Read this skill before changing architecture or adding types, helpers, or layers. Prefer the smallest change that fits the current design.

This app is Next.js App Router + FSD on the client + Clean Architecture / DDD on the server. Client code never imports Prisma.

## SOLID

Map each letter to this repo, not to extra patterns.

| Principle | Do | Do not |
| --- | --- | --- |
| **S**ingle responsibility | One use case per action (`SearchRestaurantsUseCase`, `GetRestaurantByIdUseCase`). One UI job per component (`RestaurantCard` renders a card). | Stuff search, sort, and fetch into a page helper. Grow `Restaurant` with unrelated fields. |
| **O**pen/closed | Add a new use case or strategy (new sort key in `sortRestaurants`) without rewriting callers. | Edit Prisma in `app/` or branch the same use case with flags for every new screen. |
| **L**iskov | `InMemoryRestaurantRepository` and `PrismaRestaurantRepository` honor `RestaurantRepository` (same filters, same empty/null behavior). | Test doubles that ignore case, `term`, or `findById` null. |
| **I**nterface segregation | Keep `RestaurantRepository` to `search` + `findById` until a real caller needs more. | One mega-repository “for later”. |
| **D**ependency inversion | Application depends on `RestaurantRepository`. Routes/use cases receive the port. | Use cases import `prisma`. Client fetches `/api`, never the database. |

## DRY

Extract only when the **same rule** is used in more than one place for the same reason.

Already shared on purpose: `formatScore`, `hasValue`, `sortRestaurants`, `computeRestaurantAverages`.

- Duplicate JSX for a one-off block is fine.
- Two similar types (client `Restaurant` vs server entity) are fine: they sit on different sides of the API.
- Do not create `utils.ts` dumping bag.

## KISS

- Prefer a function over a class when there is no invariant to protect.
- Prefer props and a hook over a store.
- Keep validators small (Zod at the HTTP edge, nothing more).
- Tests describe user behavior; they do not mock internals.

## YAGNI

Do not add what nobody asked for in this conversation or the current ticket.

- No extra food/accessibility option boxes (already removed).
- No Playwright, storybook, or new state library unless requested.
- No generic `BaseRepository`, mappers, or DI container.
- No unused props, feature flags, or “for the future” fields on entities.
- No abstraction for a single call site.

## Check before finishing

- [ ] New code has one reason to change
- [ ] No new layer unless it crosses an existing boundary (`app` → use case → domain → infra)
- [ ] Duplication left only when the rules differ
- [ ] Nothing shipped that the user did not ask for
