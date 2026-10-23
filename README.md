# ☕ Aroma Corner

A coffee shop storefront built with React, Vite, and TypeScript. It includes a product catalog, product quick view, cart, wishlist, checkout flow, authentication screens, and a responsive layout for mobile and desktop.

> **Status:** Portfolio showcase. This repository contains no real customer data, API keys, or production credentials.
>
> **Live demo:** not hosted. Set `VITE_USE_MOCK=true` to run the UI without a backend (demo mode only).

## Features

- Coffee catalog with categories, product cards, quick view, and product details.
- Cart and wishlist with Zustand persistence.
- Checkout form with validation (React Hook Form + Zod).
- Login, register, forgot-password, and profile screens.
- Mock data mode for UI development; real API mode through a typed service layer.
- Responsive layout with Tailwind CSS, accessible components, and tests with Vitest.

## Tech Stack

- [React 19](https://react.dev/) — UI library
- [Vite 6](https://vite.dev/) — Build tool and dev server
- [TypeScript 5.9](https://www.typescriptlang.org/) — Type safety
- [Tailwind CSS v4](https://tailwindcss.com/) — Styling
- [Zustand](https://zustand.docs.pmnd.rs/) — State management
- [TanStack React Query v5](https://tanstack.com/query/latest) — Data fetching and caching
- [React Router v7](https://reactrouter.com/) — Routing
- [Zod](https://zod.dev/) — Schema validation
- [Axios](https://axios-http.com/) — HTTP client
- [Vitest](https://vitest.dev/) — Testing

## Getting Started

### Requirements

- Node.js 18+
- pnpm (recommended; `pnpm-lock.yaml` is included)

```bash
pnpm install
cp .env.example .env
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173).

### Demo mode

The example environment starts in demo mode, so the UI runs without a backend:

```bash
VITE_USE_MOCK=true
```

In demo mode any email/password is accepted. It is intentionally not real authentication and must be disabled in production. Set `VITE_USE_MOCK=false` to use the real API at `VITE_API_BASE_URL`.

## Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm preview` | Preview production build locally |
| `pnpm lint` | Run ESLint |
| `pnpm typecheck` | Type-check without emitting files |
| `pnpm test` | Run tests in watch mode |
| `pnpm test:run` | Run tests once |
| `pnpm test:ui` | Run tests with UI |

## Project Structure

```text
aroma-corner/
├── src/
│   ├── api/            # API clients, endpoints, service layer
│   ├── features/       # Home, products, and checkout features
│   ├── pages/          # Route-level pages
│   ├── shared/         # Components, hooks, types, utilities
│   ├── store/          # Zustand stores
│   └── services/       # Axios client
├── public/
└── ...
```

## Architecture

- **Feature modules** (`src/features`) keep UI, hooks, and API calls close to the feature they belong to.
- **Service layer** (`src/api/services`) hides whether data comes from the real API or the in-memory mock implementation.
- **Zustand stores** hold cart, wishlist, and authentication state; TanStack Query handles server state.
- **Shared components** provide consistent forms, empty states, pagination, and error boundaries.

## Security

- `.env` is ignored; only `.env.example` is committed.
- No real API keys, customer records, or production credentials are included.
- The mock authentication mode is for demos only and must be disabled in production.
- Real deployments must enforce authentication and authorization on the backend.

See [SECURITY.md](SECURITY.md) for reporting and security notes.

## License

MIT — see [LICENSE](LICENSE).
