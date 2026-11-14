# Barberly storefront

Responsive barber discovery and booking frontend built with Astro static rendering, Tailwind CSS, React islands, TypeScript, Zustand and Lucide icons.

## Development

Use Node.js `22.23.4` or newer (see `.nvmrc` and `package.json`):

```sh
npm install
npm run dev
```

Quality checks and production build:

```sh
npm run check
npm run build
```

## Routes

- `/` — home and nearby shops
- `/explore` — search, recent searches, shop filters and recently viewed cards
- `/services/haircuts` — haircut shop results
- `/notifications` — notification history
- `/bookings` and `/booking-details` — booking dashboard, invoice preview and cancellation dialog
- `/salon/classic-cuts` — shop information, service accordions and gallery
- `/salon/[slug]` — statically generated salon detail pages for the sample shops
- `/book` — multi-step appointment request flow

The business names, reviews, distances and appointment details are illustrative UI data based on the supplied screen references. The booking UI is frontend-only: no appointment, payment, cancellation or notification is submitted. Connect a real scheduling/payment provider before production use. Sitemap generation and canonical URLs are intentionally not configured until the production site origin is known.
