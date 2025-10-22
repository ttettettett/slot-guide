# Slot Guide Monorepo

This repository contains the Slot Guide web application powered by Next.js, Tailwind CSS, and shadcn/ui, managed with pnpm workspaces.

## Getting started

```bash
pnpm install
pnpm dev
```

## Useful scripts

- `pnpm dev` – run the Next.js development server for `apps/web`
- `pnpm build` – build the production bundle
- `pnpm lint` – run ESLint for the web app
- `pnpm typecheck` – run TypeScript checks
- `pnpm check` – lint via ESLint and Biome, then build
- `pnpm format` – format files with Biome

## Project structure

```
.
├── apps
│   └── web        # Next.js application
├── biome.json     # Biome formatter and linter configuration
├── package.json   # Workspace scripts and dev dependencies
└── pnpm-workspace.yaml
```

## Deployment notes

Deploy the Next.js app from the `apps/web` directory. When deploying to Vercel, set **Root Directory** to `apps/web` and configure the install command (`pnpm install`) and build command (`pnpm run build`).
