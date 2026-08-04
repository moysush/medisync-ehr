# MediSync EHR — frontend

React 18 + TypeScript SPA for the MediSync EHR system, built with Vite, Tailwind CSS v4, and the shadcn/ui (radix-rhea) component set. Light/dark/system theming is handled by `next-themes`, mutations surface through `sonner` toasts, and date inputs use `react-day-picker` calendar pickers.

## Getting started

```bash
pnpm install
pnpm dev
```

Runs at <http://localhost:5173>. The API defaults to `http://localhost:3001/api`; override it with `VITE_API_BASE_URL` if your backend is elsewhere.

## Scripts

| Script            | Description                                    |
| ----------------- | ---------------------------------------------- |
| `pnpm dev`        | Vite dev server with HMR                       |
| `pnpm build`      | `tsc --noEmit` + production build to `dist/`   |
| `pnpm lint`       | ESLint (`--max-warnings 0`)                    |
| `pnpm preview`    | Preview the production build                   |

## Structure

- `src/components/ui/` — shadcn/ui primitives (Radix + Tailwind)
- `src/components/` — feature components: directory, patient details, entry form, add-patient modal
- `src/services/` — typed Axios API clients
- `src/utility/` — formatting, error mapping, health-rating metadata
- `src/types.ts` — domain types shared with the backend contract

For full setup (including the backend and Docker), see the [root README](../README.md).
