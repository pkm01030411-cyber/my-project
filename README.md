# GlobalWatch Frontend

A real-time global monitoring dashboard built with **Next.js 16**, **TypeScript**, and **Tailwind CSS**.

## Overview

GlobalWatch provides a unified view of geological, meteorological, environmental, and humanitarian events occurring around the world. It features:

- **Overview page** — Summary stats, recent alerts, and incidents by region
- **Dashboard** — Full aggregated event view with category and region breakdowns
- **Alert Center** — Severity-grouped alerts (critical → low) with live status
- **Map View** — Geographic visualization of active incidents

## Tech Stack

- [Next.js 16](https://nextjs.org) (App Router)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS v4](https://tailwindcss.com)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Project Structure

```
app/
  page.tsx          # Overview / home page
  dashboard/        # Full monitoring dashboard
  alerts/           # Alert center (severity-grouped)
  map/              # Geographic map view
components/
  Navbar.tsx        # Top navigation bar
  StatCard.tsx      # Metric summary card
  AlertItem.tsx     # Individual alert row
lib/
  mock-data.ts      # Sample incidents & region data
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
