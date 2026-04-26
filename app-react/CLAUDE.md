# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```sh
npm run dev       # start Vite dev server
npm run build     # tsc --noEmit then vite build
npm run lint      # ESLint across the repo
npm run preview   # serve production build locally
```

There is no test framework configured. Validation is `npm run lint && npm run build`.

## Architecture

This is a **Betha platform integration example** — a React 19 + Vite + TypeScript app demonstrating how to integrate Betha web components (`@betha-plataforma/estrutura-componentes`) with React Router and React Bootstrap.

### App bootstrap flow

`main.tsx` → registers Betha custom elements via `estrutura-componentes-loader`, then mounts React.  
`App.tsx` → wraps `AppShell` in `BrowserRouter`.  
`AppShell.tsx` → renders `<bth-app>` with all Betha header refs; listens to custom element events and calls `useNavigate()` to drive routing.  
`AppRoutes.tsx` → all 10 routes use `lazy()` + `<Suspense fallback={<LoadingOverlay />}>` for code splitting.

### Betha custom element integration pattern

Custom elements are initialized asynchronously. The pattern is:
1. Create a `useRef` per Betha element (`appRef`, `brandRef`, etc.)
2. Inside `useEffect`, call `whenCustomElementDefined('bth-xxx')` and then set properties on the ref.
3. Attach event listeners for Betha-specific events (`opcaoMenuSelecionada`, `opcaoUtilitarioSelecionada`, `logout`, `novaNotificacaoComLink`).

Active menu state is kept in sync via `findActiveMenuId()` which matches the current pathname against `MENU_ROUTE_ALIASES` in `src/data/examples.ts`.

### Key source locations

| Path | Purpose |
|---|---|
| `src/AppShell.tsx` | Betha shell layout, menu/event wiring |
| `src/AppRoutes.tsx` | All route definitions with lazy loading |
| `src/pages/` | One file per route (PascalCase). Pages export named components. |
| `src/components/` | Shared UI: `PageHeader`, `MdiIcon`, `LoadingOverlay`, `ItemActions` |
| `src/data/examples.ts` | All static demo data + exported TypeScript types |
| `src/custom-elements.d.ts` | Local typings for Betha custom elements |

### Static data

All demo data (menu options, authorization config, list records, timeline entries, card data) lives in `src/data/examples.ts`. No real API integration exists — this is purely a pattern showcase.

## Coding conventions

- TypeScript/TSX everywhere; strict mode is on — avoid `any`.
- 2-space indentation, single quotes, no semicolons.
- Named exports for pages and components; `App` is the only default export.
- PascalCase for components and page files; camelCase for variables/functions; `UPPER_SNAKE_CASE` for exported static constants.
- Conventional commit prefixes: `feat:`, `fix:`, `chore:`, `refactor:`.

## Adding a new page/route

1. Create `src/pages/MyPage.tsx` with a named export.
2. Add a lazy import and `<Route>` in `AppRoutes.tsx`.
3. Add a menu entry to `MENU_OPTIONS` and a path alias to `MENU_ROUTE_ALIASES` in `src/data/examples.ts`.
