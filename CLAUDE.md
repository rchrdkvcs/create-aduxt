# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **monorepo** combining an AdonisJS v6 backend API with a Nuxt 4 frontend, managed via Bun workspaces. The two applications communicate using **Tuyau**, a type-safe RPC client/server library that provides end-to-end type safety between the API and web layers.

## Architecture

### Monorepo Structure

- **`api/`** - AdonisJS v6 backend (TypeScript)
- **`web/`** - Nuxt 4 frontend (Vue 3, TypeScript)
- **Root workspace** - Contains shared dev dependencies (ESLint, Prettier, TypeScript)

### Key Technology Integrations

**Tuyau RPC Integration:**
- The API exports type definitions via `api/.adonisjs/index.ts`
- The web app imports these types: `import { api } from "@aduxt/api/api"`
- Type-safe API client configured in `web/app/plugins/tuyau.ts` (baseUrl: http://localhost:3333)
- Access via composable: `const tuyau = useTuyau()` in Vue components

**Path Aliases (API):**
```typescript
#core/*     -> ./app/core/*.js
#auth/*     -> ./app/auth/*.js
#models/*   -> ./app/user/models/*.js
#database/* -> ./database/*.js
#start/*    -> ./start/*.js
#tests/*    -> ./tests/*.js
#config/*   -> ./config/*.js
```

### Application Structure

**API (AdonisJS):**
- Entry point: `api/bin/server.ts`
- Routes: `api/start/routes.ts`
- Middleware & providers: `api/start/kernel.ts`
- App modules organized by domain: `api/app/auth/`, `api/app/core/`
- Database: PostgreSQL via Lucid ORM
- Hot reload: Enabled for controllers and middleware (`hotHook` config in package.json)

**Web (Nuxt):**
- Entry point: `web/app/app.vue`
- Pages: `web/app/pages/`
- Composables: `web/app/composables/`
- UI framework: Nuxt UI with Tailwind CSS v4

## Development Commands

### Root Commands
```bash
bun run dev          # Run both API and web concurrently
bun run dev:api      # Run API only (port 3333)
bun run dev:web      # Run web only (port 3000)
```

### API Commands
```bash
cd api
node ace serve --hmr      # Start dev server with hot reload
node ace build            # Build for production
node ace test             # Run all tests
node ace test unit        # Run unit tests only
node ace test functional  # Run functional tests only
bun run lint              # Lint code
bun run format            # Format code
bun run typecheck         # Type check without emitting

# Database
node ace migration:run    # Run pending migrations
node ace migration:rollback
node ace migration:fresh  # Drop all tables and re-run migrations
node ace make:migration <name>
node ace make:model <name>

# Tuyau
node ace tuyau:generate   # Generate type definitions for frontend
```

### Web Commands
```bash
cd web
bun run dev              # Start dev server
bun run build            # Build for production
bun run preview          # Preview production build
bun run generate         # Generate static site
```

## Testing

Test configuration is in `api/adonisrc.ts`:
- **Unit tests:** `tests/unit/**/*.spec.ts` (timeout: 2s)
- **Functional tests:** `tests/functional/**/*.spec.ts` (timeout: 30s)

Testing framework: Japa with @japa/plugin-adonisjs

## Environment Setup

Required environment variables (see `api/.env.example`):
- `TZ`, `PORT`, `HOST`, `LOG_LEVEL`, `APP_KEY`
- Database: `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_DATABASE`
- `SESSION_DRIVER`, `NODE_ENV`

**Generate APP_KEY:** `node ace generate:key`

## Docker & Deployment

Multi-stage Dockerfile builds both apps:
- API build: `cd api && node ace build --ignore-ts-errors`
- Web build: `cd web && bun run build`
- Production: `script/start.sh` runs both servers concurrently
- Exposed ports: 3000 (web), 3333 (api)

## Important Notes

- **Always regenerate Tuyau types** after modifying API routes/controllers: `node ace tuyau:generate`
- The web app depends on `@aduxt/api` workspace for type imports
- Bun is used as the package manager (not npm/yarn/pnpm)
- Hot reload is configured for API controllers and middleware only
- Database connection uses PostgreSQL by default
