# Aroma Corner

Coffee shop e-commerce website built with React, Vite, and TypeScript.

## Tech Stack

- [React 19](https://react.dev/) — UI library
- [Vite 6](https://vitejs.dev/) — Build tool and dev server
- [TypeScript 5.9](https://www.typescriptlang.org/) — Type safety
- [Tailwind CSS v4](https://tailwindcss.com/) — Utility-first CSS
- [Zustand](https://zustand-demo.pmnd.rs/) — State management
- [TanStack React Query v5](https://tanstack.com/query/latest) — Data fetching and caching
- [React Router v7](https://reactrouter.com/) — Routing
- [Zod](https://zod.dev/) — Schema validation
- [Axios](https://axios-http.com/) — HTTP client
- [Vitest](https://vitest.dev/) — Testing framework

## Getting Started

```bash
npm install
cp .env.example .env
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |
| `npm test` | Run tests |
| `npm run test:ui` | Run tests with UI |

## Project Structure

```text
coffe-Shop/
├── src/
│   ├── features/
│   │   ├── cart/
│   │   ├── checkout/
│   │   ├── home/
│   │   └── products/
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── CartPage.tsx
│   │   ├── CoffeeListPage.tsx
│   │   └── ...
│   ├── shared/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── types/
│   │   └── utils/
│   ├── store/
│   └── services/
├── public/
└── ...
```
