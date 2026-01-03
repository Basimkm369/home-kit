# Home Kit — React + TypeScript + Vite

Tailwind-styled multi-page demo covering booking flow, services listing, contact form, and admin views. Data is mocked; state persists in Redux Toolkit.

## Setup
- Install deps: `npm install`
- Run dev server: `npm run dev`
- Type-check/build: `npm run build`
- Lint: `npm run lint`

## Architecture
```
src/
├─ store/         # Redux store
├─ state/         # booking slice + types
├─ router/        # routes config with lazy loading
├─ pages/         # route pages (home, services, booking, contact, admin)
├─ components/    # shared components (buttons, cards, status pills, stepper)
├─ forms/         # form inputs (text, number, select, textarea)
├─ layouts/       # app + admin layouts
├─ services/      # service catalog + mock client
├─ hooks.ts       # typed Redux hooks
└─ utils/         # mock data + helpers
```
Routing uses `createBrowserRouter` with lazy-loaded pages for code splitting. State uses Redux Toolkit with typed hooks (`useAppDispatch`, `useAppSelector`). Tailwind v4 runs via PostCSS (`@tailwindcss/postcss`).

## Booking flow
Multi-step wizard with validation and back/forward persistence:
1. Category → 2. Sub-category → 3. Location → 4. Schedule → 5. User → 6. Address → 7. Confirmation
- Required fields block progression; state remains when navigating away.
- Confirmation adds a booking to the mock list for admin visibility.

## Services & admin
- Services page lists categories/sub-categories with filtering and “Book” shortcuts that prefill the flow.
- Admin dashboard shows totals/status counts and latest bookings.
- Booking list table with ID, customer, service, schedule, and status; detail page shows full info.

## Styling & quality
- Tailwind CSS v4 (`@import 'tailwindcss'; @reference 'tailwindcss/utilities';` in `src/index.css`).
- ESLint configured; Prettier config in `.prettierrc`.
- TypeScript strict mode with path aliases via `@/*`.

## Assumptions & mock data
- No backend; data is static in `utils/mockBookings.ts` and `services/mockClient.ts`.
- Location step uses freeform text (no external map API). Use the admin panel to view newly confirmed bookings.
