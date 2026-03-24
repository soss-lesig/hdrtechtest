# HDR UK Dataset Explorer

A web application that surfaces metadata from HDR UK's health dataset catalogue. Built as a technical test submission for the Junior Full Stack Software Engineer role.

**Live:** hdr-techtest.drewbs.dev  
**Author:** Andrew Pendlebury

---

## The Brief

> Create a web application that exposes title, description, accessServiceCategory, and a link to accessRights for each dataset from the HDR UK dataset metadata JSON.

---

## Features

Beyond the four required fields, the application includes:

- **Search** - filters datasets by title or description in real time
- **Pagination** - 10 datasets per page with first/previous/dropdown/next/last navigation
- **Category colour coding** - access service categories displayed as colour-coded pills
- **Responsive layout** - cards with clamped descriptions that work across screen sizes

---

## Running Locally

### Prerequisites

- Node.js 20+
- npm

### Quick Start

```bash
git clone https://github.com/soss-lesig/hdrtechtest.git
cd hdrtechtest
```

**Generate the dataset and start the client:**

```bash
cd server && npm install && cd ..
cd client && npm install && cd ..
npm run build:data
npm run dev:client
```

The client dev server runs at `http://localhost:5173`.

**To run the full stack (Express API + React client):**

```bash
npm run dev
```

This starts the Express server on `http://localhost:3001` and the Vite dev server on `http://localhost:5173` concurrently.

### Available Scripts

| Script | What it does |
|--------|-------------|
| `npm run dev` | Starts both the Express API server and the React dev server |
| `npm run dev:client` | Starts only the React dev server (requires `build:data` first) |
| `npm run dev:server` | Starts only the Express API server |
| `npm run build:data` | Fetches the raw JSON from GitHub, maps it, writes static output to `client/public/data/` |
| `npm run build` | Full production build: install deps, generate data, build client |
| `npm run preview` | Preview the production build locally |

---

## Architecture

```
hdrtechtest/
├── shared/                  Types and mapping shared between server and client
│   ├── types.ts             RawDataset and MappedDataset interfaces
│   ├── mapDataset.ts        Pure transform function with null handling
│   └── tsconfig.json
├── server/                  Express API and build-time data generation
│   └── src/
│       ├── index.ts         Express server: GET /api/datasets
│       └── generate.ts      Build script: fetch, map, write static JSON
├── client/                  React 19 + Vite + TypeScript frontend
│   └── src/
│       ├── App.tsx           Root component with loading/error states
│       ├── main.tsx          Entry point
│       ├── hooks/
│       │   └── useDatasets.ts   Fetches and returns typed dataset array
│       ├── components/
│       │   ├── DatasetIndex.tsx          Search, filter, paginate, render cards
│       │   ├── DatasetIndex.module.css   Card styles, category pills, search
│       │   ├── Pagination.tsx            Reusable pagination with dropdown
│       │   └── Pagination.module.css
│       └── styles/
│           ├── tokens.css    CSS custom properties (colours, spacing, type scale)
│           ├── reset.css     Browser normalisation
│           ├── layout.css    Page structure
│           ├── components.css Reusable UI classes
│           └── index.css     Import entry point
├── package.json             Root scripts for monorepo orchestration
└── wrangler.toml            Cloudflare Pages deployment config
```

### Data Flow

1. **At build time:** `generate.ts` fetches the raw JSON from GitHub, passes each item through `mapDataset` (which flattens the nested structure and handles null fields with fallback values), and writes the result as static JSON into the client's public directory.
2. **In production:** The React app loads the pre-built JSON on mount via `useDatasets`. No runtime API call, no loading spinner for remote data.
3. **In development:** The Express server runs live at `localhost:3001/api/datasets`, performing the same fetch-and-map in real time. The client can fetch from either source.

### Why Build-Time Generation?

The upstream dataset is a static JSON file in a GitHub repository. It does not change between page loads. Fetching it on every visit would waste bandwidth and add a loading state the user does not need. The Express server demonstrates API development skills (data transformation, error handling, typed responses), while the build-time approach demonstrates the judgement to know when a live API is not warranted.

---

## Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| Frontend | React 19, TypeScript, Vite | Matches the job spec. Vite for fast dev feedback. TypeScript for type safety on nested external data. |
| Server | Express 5, TypeScript, tsx | Demonstrates API development. `tsx` for direct TypeScript execution without a compile step. |
| Shared | TypeScript interfaces, pure functions | Single source of truth for the data contract between server and client. |
| Styling | CSS custom properties, CSS Modules | Token-based design system adapted from my portfolio. Zero runtime cost. No library dependencies. |
| Deployment | Cloudflare Pages | Static site hosting on a custom subdomain. Build pipeline: generate data, build client, deploy. |

---

## Key Decisions

Significant technical choices are documented in my engineering decision log, including:

- Why a monorepo with shared types rather than duplicated interfaces
- Why `useState` over `useReducer` over Redux for state management
- Why CSS custom properties over styled-components
- Why client-side search and pagination over server-side
- Why a dropdown page selector over numbered page buttons
- Why build-time static generation over runtime API calls

Each decision documents what was considered, what was rejected, and why.

---

## AI Tool Usage

Claude (Anthropic) was used as a pair programming partner during this project. A detailed disclosure is provided in AI-DISCLOSURE.md.

**Summary:** Claude assisted with planning, architectural decision-making, boilerplate generation (file scaffolding, component skeletons, CSS modules), and code review. All implementation logic (data mapping, search filtering, pagination, state management) and all final decisions were mine. The full reasoning is documented in the disclosure file.

---

## What I Would Do With More Time

- **Unit tests** for `mapDataset` (it is pure and trivially testable) and the filter/pagination logic
- **Table view** with a toggle alongside the existing card view, for denser scanning on desktop
- **Sort controls** for title and access category
- **URL query parameter sync** so filtered/paginated views are shareable and bookmarkable
- **Keyboard navigation** and ARIA attributes for accessibility
- **Virtualised rendering** if the dataset count grew significantly beyond 1000
- **Loading skeleton** instead of the plain text loading state
