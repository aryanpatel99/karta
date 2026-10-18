# Karta — Project Context & Decisions

Karta is a Trello clone built as a college project. The name means "map" / "card" in several languages.

## Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 16 (App Router) | Latest; uses route groups, server actions, server components |
| Auth | Clerk (`@clerk/nextjs` v7) | Handles users, orgs, org switching, and membership out of the box |
| Database | PostgreSQL via Prisma 8 ORM (`@prisma/orm-postgres`) | Typed ORM with contract-based schema (`contract.prisma`) |
| UI primitives | Base UI (`@base-ui/react`) + shadcn components | Headless + styled; Popover, Accordion, Sheet, etc. |
| Styling | Tailwind CSS 4 + `tw-animate-css` + CVA | Utility-first; CVA for button/input variants |
| Icons | Tabler Icons (`@tabler/icons-react`) | Primary icon set used across all components |
| State | Zustand (mobile sidebar store) + `usehooks-ts` (localStorage) | Minimal client state; most state is server-driven |
| Validation | Zod v4 | Schema validation for server actions |
| Notifications | Sonner | Toast notifications |
| Images | Unsplash API (`unsplash-js`) | Board background images fetched server-side |
| Middleware | `proxy.ts` (Clerk's `clerkMiddleware`) | Auth gating + redirect logic for public/protected routes |

## Architecture Decisions

### Route groups
- `(marketing)` — public landing page
- `(platform)/(clerk)` — auth pages (sign-in, sign-up, select-org)
- `(platform)/(dashboard)` — authenticated dashboard with sidebar + navbar

### Server actions pattern
All mutations go through a `createSafeAction` wrapper:
1. `schema.ts` — Zod schema for input validation
2. `index.ts` — `"use server"` handler with auth check → DB call → revalidation
3. `types.ts` — derived `InputType` / `ReturnType` from schema + Prisma model

Client components call actions via the `useAction` hook which handles loading, field errors, and success/error callbacks.

### Unsplash images stay server-side
The Unsplash API key is **not** exposed to the client. `lib/unsplash.ts` uses `UNSPLASH_ACCESS_KEY` (no `NEXT_PUBLIC_` prefix). The `fetchUnsplashImages` server action proxies the call to the client `FormPicker`.

### Prisma 8 specifics
- Schema lives in `src/prisma/contract.prisma` (not the classic `prisma/schema.prisma`)
- Uses `temporal.updatedAtString()` instead of the classic `@updatedAt`
- DB client is instantiated in `src/prisma/db.ts` via `@prisma/orm-postgres/runtime`
- Types are exported from `src/prisma/db.ts` (e.g. `Board`)
- Scripts: `contract:emit`, `db:init`, `db:update`, `db:sign`, `db:verify`

### Clerk org scoping
- Every board belongs to an `orgId` from Clerk's `auth()`
- Middleware redirects authenticated users without an org to `/select-org`
- Sidebar lists orgs via Clerk's `useOrganizationList`

### Component conventions
- Reusable form components: `FormInput`, `FormSubmit`, `FormError`, `FormPicker`, `FormPopover`
- Page-specific components live in `_components/` directories alongside their route
- UI primitives live in `components/ui/`
- Shared components live in `components/`

## Environment Variables

| Variable | Scope | Purpose |
|---|---|---|
| `DATABASE_URL` | Server | Postgres connection string |
| `UNSPLASH_ACCESS_KEY` | Server | Unsplash API key (never expose to client) |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Client | Clerk frontend key |
| `CLERK_SECRET_KEY` | Server | Clerk backend key |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | Client | `/sign-in` |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | Client | `/sign-up` |
