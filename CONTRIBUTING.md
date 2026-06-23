# Contributing to Aroma Corner

First off — thanks for taking the time to contribute! 🎉

This document covers everything you need to know to set up the project, write code that fits the existing patterns, and submit changes that get merged quickly.

---

## Table of Contents

- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Code Style](#code-style)
- [TypeScript Rules](#typescript-rules)
- [Component Conventions](#component-conventions)
- [State Management](#state-management)
- [API & Mock Data](#api--mock-data)
- [Styling](#styling)
- [Accessibility](#accessibility)
- [Testing](#testing)
- [Git Workflow](#git-workflow)
- [Pull Request Checklist](#pull-request-checklist)

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.example .env
# Edit .env with your local values (API URL, mock mode, etc.)

# 3. Start the dev server
npm run dev

# 4. Run tests
npm test

# 5. Build for production
npm run build
```

---

## Project Structure

```
src/
├── api/                    # Backend API services (auth, cart, products, etc.)
│   ├── endpoints.ts        # Centralized API endpoint paths
│   └── services/           # Service modules (one per domain)
├── features/               # Feature-based modules (colocated components + hooks)
│   ├── home/               # Home page sections (HeroBanner, FeaturedProducts, etc.)
│   ├── products/           # Product list, ProductCard, QuickView
│   └── checkout/           # Checkout flow + order API
├── pages/                  # Route-level components (one file per page)
├── services/               # Shared infrastructure (apiClient, axios instance)
├── shared/                 # Cross-cutting concerns
│   ├── components/         # Reusable UI components (Button, FormField, etc.)
│   ├── data/               # Mock data + fallback helpers
│   ├── hooks/              # Custom hooks (useAuth, useScrollReveal, etc.)
│   ├── types/              # Shared TypeScript types
│   └── utils/              # Pure utility functions (cn, formatCurrency, apiLogger)
├── store/                  # Zustand stores (cart, wishlist)
└── App.tsx                 # Root component with routes + lazy loading
```

**Key principle:** Features are self-contained. A feature folder holds its own components, hooks, types, and API calls. Cross-feature code goes in `shared/`.

---

## Tech Stack

- **Vite 6 + React 18** — build tool + UI library
- **TypeScript** (strict mode, `verbatimModuleSyntax: true`)
- **Tailwind CSS v4** — styling with custom `coffee-*` color palette
- **Zustand** — client state (cart, wishlist)
- **TanStack Query** — server state (products, orders)
- **React Router v6** — routing with `React.lazy` code splitting
- **react-hook-form** — form state
- **react-hot-toast** — notifications
- **lucide-react** — icons
- **Vitest + Testing Library** — unit/integration tests

---

## Code Style

### General

- Use **2-space indentation** for JSX, 4 spaces for TS/TSX logic blocks.
- Maximum line length: **100 characters** (let Prettier handle this).
- Always use **named exports** for components (`export function Foo()`), never default exports — this keeps `React.lazy` imports consistent.
- Use **`const` arrow functions** for helpers inside a file, **`function` declarations** for exported top-level functions.

### Comments

- **English only** in source files. No Arabic comments in production code.
- Use **JSDoc** for exported functions and complex types.
- Comment the **"why"**, not the "what" — code should explain itself.

```ts
// ❌ Bad
const x = 5; // set x to 5

// ✅ Good
// 5 is the max retry count before we give up and fall back to mock data
const MAX_RETRIES = 5;
```

### Naming

- **Components**: `PascalCase` (`ProductCard`, `HeroBanner`)
- **Functions / variables**: `camelCase` (`formatCurrency`, `useAuth`)
- **Types / Interfaces**: `PascalCase` (`Product`, `CartItem`)
- **Constants**: `SCREAMING_SNAKE_CASE` (`ITEMS_PER_PAGE`, `MAX_RETRIES`)
- **Files**: same as their default export (`ProductCard.tsx`, `useAuth.ts`)

---

## TypeScript Rules

### `verbatimModuleSyntax` is ON

This means type-only imports MUST use `import type`:

```ts
// ❌ Will fail at build time
import { Product, ProductsQuery } from '@/shared/types/product.types';

// ✅ Correct
import type { Product, ProductsQuery } from '@/shared/types/product.types';

// ✅ Mixed import — value + type
import { formatCurrency } from '@/shared/utils/formatCurrency';
import type { Product } from '@/shared/types/product.types';
```

### Strict Mode Rules

- **No `any`** — use `unknown` and narrow with type guards.
- **No non-null assertions (`!`)** unless absolutely necessary — prefer optional chaining.
- **Always type function parameters and return types** for exported functions.
- **Enable `noUncheckedIndexedAccess`** if you touch `tsconfig.json` (it's safer).

### Discriminated Unions

When a component has variants, use a discriminant:

```ts
type ButtonProps = {
  variant: 'primary' | 'secondary' | 'ghost';
  size: 'sm' | 'md' | 'lg';
  // ...
};
```

---

## Component Conventions

### Reusable Components

- Live in `src/shared/components/`.
- Accept a `className` prop merged via `cn()` for override flexibility.
- Forward refs when the component wraps a DOM element (`Button`, `FormField`).

```tsx
import { forwardRef } from 'react';
import { cn } from '@/shared/utils/cn';

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => (
    <button ref={ref} className={cn(baseClasses, className)} {...props} />
  )
);
Button.displayName = 'Button';
```

### Page Components

- Live in `src/pages/`.
- One file per route.
- Wrapped in `<main aria-label="...">` with a descriptive label.
- Use `React.lazy` for code splitting — don't import them eagerly in `App.tsx` (except `HomePage` and `NotFoundPage`).

### Variant Pattern

When a component supports multiple visual variants, use a `variant` prop instead of duplicating the component:

```tsx
<ProductCard product={p} variant="beans" />
<ProductCard product={p} variant="equipment" />
```

See `src/features/products/ProductCard.tsx` for the reference implementation.

---

## State Management

### Client State (Zustand)

- Use Zustand for UI state that needs to persist across route changes (cart, wishlist).
- Stores live in `src/store/`.
- Use the `persist` middleware for state that should survive page reloads.

```ts
export const useCartStore = create<CartState>()(
  persist(
    (set) => ({ /* ... */ }),
    { name: 'aroma-cart-storage' }
  )
);
```

### Server State (TanStack Query)

- Use React Query for anything that comes from the API.
- Define `queryKey` arrays that include all params affecting the response.
- Use `staleTime: 1000 * 60 * 5` (5 minutes) as a sensible default.

```ts
useQuery({
  queryKey: ['products', query],
  queryFn: () => productsService.getAll(query),
  staleTime: 1000 * 60 * 5,
});
```

---

## API & Mock Data

### Service Pattern

Every service follows the same structure:

```ts
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

export const fooService = {
  get: USE_MOCK
    ? () => Promise.resolve(mockGet())
    : async () => {
        try {
          return await apiGet();
        } catch (err) {
          logApiFallback('foo', 'get', err);  // ← NEVER silent catch
          return mockGet();
        }
      },
};
```

### Rules

- **Never use `catch {}`** without logging — always call `logApiFallback()` or `logIgnoredError()`.
- **Mock implementations come first**, real API calls come second. This makes the file easy to scan.
- **Tokens and secrets go in `.env`**, never in source code.
- **All env vars** must start with `VITE_` to be exposed to the client.

---

## Styling

### Tailwind Tokens

Use the `coffee-*` palette defined in `tailwind.config.js`. **Never hardcode hex values.**

```tsx
// ❌ Bad
<div className="bg-[#3f2518] text-[#8C6239]">

// ✅ Good
<div className="bg-coffee-900 text-coffee-500">
```

### Color Reference

| Token | Hex | Usage |
|---|---|---|
| `coffee-50` | `#fff8f1` | Lightest background |
| `coffee-400` | `#d9aa7b` | Accent (light) |
| `coffee-500` | `#8C6239` | Primary brand |
| `coffee-700` | `#5f3a26` | Dark brown (buttons) |
| `coffee-900` | `#3f2518` | Darkest text |
| `coffee-950` | `#2e1a12` | Near-black background |
| `brand-cream` | `#f3b079` | Gold accent |

### Glassmorphism

Auth pages and hero sections use glassmorphism:

```tsx
<div className="rounded-[2.5rem] border border-white/30 bg-white/15 backdrop-blur-2xl shadow-2xl">
```

### Class Merging

Always use `cn()` from `@/shared/utils/cn` when combining conditional classes:

```tsx
import { cn } from '@/shared/utils/cn';

<div className={cn('base classes', isActive && 'active classes', className)} />
```

---

## Accessibility

Every page and component must meet WCAG 2.1 AA. Checklist:

- **Buttons**: `type="button"` (unless submit), `aria-label` if icon-only.
- **Forms**: `<label htmlFor>` linked to `<input id>`, `aria-invalid` + `aria-describedby` on errors.
- **Images**: `alt` attribute (decorative → `alt=""` or `aria-hidden`).
- **Icons**: `aria-hidden="true"` unless they convey meaning.
- **Live regions**: `role="status"` + `aria-live="polite"` for loading states, `role="alert"` for errors.
- **Pagination**: `<nav aria-label="Pagination">`, `aria-current="page"` on active page.
- **Modals**: focus trap, `role="dialog"`, `aria-modal="true"`, ESC to close.
- **Color contrast**: minimum 4.5:1 for body text, 3:1 for large text.

Use `prefers-reduced-motion` for animations:

```tsx
if (prefersReducedMotion) {
  return <StaticFallback />;
}
```

---

## Testing

- **Vitest + Testing Library** is the test framework.
- Test files live next to the source: `Foo.tsx` → `Foo.test.tsx`.
- Aim for **behavior-driven tests** — test what the user sees, not implementation details.
- Run tests with `npm test` (watch mode) or `npm run test:run` (single run).

```tsx
import { render, screen } from '@testing-library/react';
import { ProductCard } from './ProductCard';

it('shows out of stock overlay when product is unavailable', () => {
  render(<ProductCard product={{ ...mockProduct, inStock: false }} />);
  expect(screen.getByText(/out of stock/i)).toBeInTheDocument();
});
```

---

## Git Workflow

### Branches

- `main` — production-ready code, always deployable
- `develop` — integration branch for the next release
- `feature/<short-name>` — new features (e.g. `feature/wishlist-persist`)
- `fix/<short-name>` — bug fixes (e.g. `fix/login-redirect-loop`)
- `chore/<short-name>` — tooling, deps, refactors

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

Examples:

```
feat(products): add variant prop to ProductCard for equipment
fix(auth): redirect to original page after login
docs(contributing): add accessibility checklist
refactor(api): replace silent catch with logApiFallback
```

---

## Pull Request Checklist

Before submitting a PR, make sure:

- [ ] Code follows the style guide above
- [ ] No Arabic comments in source files
- [ ] No hardcoded hex colors — use Tailwind tokens
- [ ] No silent `catch {}` blocks — use `logApiFallback`
- [ ] All new components have proper ARIA attributes
- [ ] TypeScript compiles without errors (`npm run typecheck`)
- [ ] Tests pass (`npm run test:run`)
- [ ] Build succeeds (`npm run build`)
- [ ] Commit messages follow Conventional Commits
- [ ] PR description explains the **why**, not just the **what**
- [ ] Screenshots attached for UI changes

---

## Questions?

- Check the existing codebase first — most patterns are established.
- For architectural questions, open a GitHub Discussion.
- For bugs, open an Issue with reproduction steps.

Happy coding! ☕
