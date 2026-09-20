# Karta

> **Karta is still cooking.** This project is an early work in progress: the foundation is in place, while many of the planned planning and collaboration features are still being built.

Karta is a collaborative workspace for turning plans into forward progress. Teams can work inside shared organizations, create boards for their work, and—over time—organize the tasks, ideas, and activity that move a project forward.

## Current state

Karta currently provides the first layer of the product:

- Authentication and account management through [Clerk](https://clerk.com/)
- Organization-based workspaces and workspace switching
- Protected application routes
- A dashboard for an organization
- Board creation and board listing
- A PostgreSQL-backed `Board` model managed with Prisma

The product is intentionally early-stage. Boards currently contain a title only, and they are not yet scoped to individual organizations in the database. Features such as lists, cards, assignments, activity history, richer board views, and real-time collaboration are planned but not implemented.

## Tech stack

- [Next.js 16](https://nextjs.org/) with React 19 and TypeScript
- [Clerk](https://clerk.com/) for authentication and organizations
- [Prisma ORM](https://www.prisma.io/) with PostgreSQL
- [Tailwind CSS](https://tailwindcss.com/) and shadcn-style UI components
- Zod for server-action input validation
- Zustand and reusable React hooks for client-side state and interactions

## Project structure

```text
app/
  (marketing)/              Public landing page
  (platform)/               Authenticated application experience
    (dashboard)/            Organization dashboard and settings routes
actions/
  create-board/             Validated server action for board creation
components/                 Shared UI and application components
src/prisma/                 Prisma database client and data contract
proxy.ts                    Clerk route protection and redirects
```

## Getting started

### Prerequisites

- Node.js 20 or later
- npm
- A PostgreSQL database
- A Clerk application with Organizations enabled

### Install and configure

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a local environment file and add the credentials required by Clerk and your database. The exact keys depend on your Clerk and Prisma configuration, but will typically include Clerk publishable/secret keys and a PostgreSQL connection string.

3. Initialize or update the database contract:

   ```bash
   npm run db:init
   npm run db:update
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Visit [http://localhost:3000](http://localhost:3000).

Authenticated users are directed to their active organization; users without an active organization are prompted to select one.

## Available scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Next.js development server. |
| `npm run build` | Create a production build. |
| `npm run start` | Run the production server after building. |
| `npm run lint` | Run ESLint. |
| `npm run contract:emit` | Emit the Prisma data contract. |
| `npm run db:init` | Initialize the Prisma database. |
| `npm run db:update` | Apply the current Prisma database contract. |
| `npm run db:sign` | Sign the Prisma database contract. |
| `npm run db:verify` | Verify the Prisma database contract. |

## Roadmap

The likely next pieces of Karta include:

- Associate boards with organizations and enforce tenant isolation
- Add board images, descriptions, and organization-aware board browsing
- Introduce lists and cards for task management
- Add member assignments, due dates, labels, and activity tracking
- Build polished empty, loading, and error states
- Improve test coverage, access control, and production configuration

## Contributing

Karta is currently under active development. Before making a substantial change, keep the organization-based model and the planned collaborative workflow in mind. Please run linting and a production build before opening a pull request:

```bash
npm run lint
npm run build
```

## License

No license has been specified yet.
