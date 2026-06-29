# UniPath

Global university search engine. Actual requirements, deadlines, and tuition fees.

## Stack

- **Next.js 14** (App Router, SSR)
- **TypeScript**
- **Tailwind CSS**
- **Jest**

## Architecture

Static catalog: 62 programs, 21 countries. Data in src/data/programs.ts. No backend, no database. Manual updates via Git once a month.

Future: Supabase for real-time deadline updates, user auth, favorites.

## Project structure
src/
+-- app/ # Pages (App Router)
¦ +-- page.tsx # Home
¦ +-- explore/ # Catalog with filters (SSR)
¦ +-- compare/ # Compare programs (URL params)
¦ +-- wizard/ # Step-by-step wizard (Client)
¦ L-- uni/[id]/ # University page (stub)
+-- components/ # UI components
¦ +-- ui/ # Button, Card, Badge, Skeleton
¦ +-- layout/ # Header, Footer
¦ L-- wizard/ # Wizard steps
+-- data/ # Data
¦ L-- programs.ts # 62 programs
+-- lib/ # Utils
¦ L-- utils.ts # formatCurrency, daysUntil
+-- types/ # TypeScript types
¦ L-- index.ts # ProgramData

text

## Routes

| Route | Render | Description |
|---|---|---|
| / | Static | Home page |
| /explore | SSR | Catalog with search & filters |
| /explore?country=Germany&degree=Master | SSR | Filters via URL params |
| /compare?ids=1,3,5 | SSR | Compare up to 5 programs |
| /wizard | Client | Step-by-step wizard |
| /uni/[id] | SSG | University page (WIP) |

## Tests

`ash
npm test
16 tests: utils, data validation, filtering logic.

Run
bash
npm install
npm run dev
Open http://localhost:3000
