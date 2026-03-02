# Contact CRM

A full-stack contact management app built with React, Express, tRPC, and Drizzle ORM.

## Tech Stack

- **Client:** React 19, Vite, TailwindCSS, TanStack Query, tRPC, React Hook Form
- **Server:** Express, tRPC, Drizzle ORM, better-sqlite3
- **Shared:** Zod schemas

## Prerequisites

- [Node.js](https://nodejs.org/) v22+
- [pnpm](https://pnpm.io/) v9+

## Getting Started

```bash
# Install dependencies
pnpm install

# Seed the database
pnpm --filter @pr-exercise/server seed

# Start the dev servers (client + server in parallel)
pnpm dev
```

The client runs on [http://localhost:5173](http://localhost:5173) and the server on [http://localhost:3000](http://localhost:3000).

## Building for Production

```bash
pnpm build
```

## Project Structure

```
├── client/    # React frontend (Vite)
├── server/    # Express + tRPC API
└── shared/    # Shared Zod schemas and types
```
