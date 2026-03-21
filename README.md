# HDR UK Dataset Explorer

A web application that surfaces metadata from HDR UK's dataset catalogue, exposing title, description, access service category, and access rights for each dataset in a searchable, filterable interface.

**Live:** [hdr-techtest.drewbs.dev](https://hdr-techtest.drewbs.dev)

---

## Running locally

### Prerequisites

- Node.js 20+
- npm

### Setup

```bash
git clone https://github.com/soss-lesig/hdrtechtest.git
cd hdrtechtest

# Install dependencies for all workspaces
cd server && npm install && cd ..
cd client && npm install && cd ..

# Generate the dataset file (fetches from GitHub, maps, writes static JSON)
npm run build:data

# Start the client dev server
npm run dev:client
```

The data generation step fetches the raw JSON from the HDRUK GitHub repository, maps each dataset through a shared transform function, and writes the output to `client/public/data/datasets.json`. The client then consumes this as a static file at runtime.

---

## Architecture

```
hdrtechtest/
  shared/        Shared TypeScript types and mapping function
  server/        Build-time data generation script
  client/        React frontend (Vite + TypeScript)
```

### shared/

Types and a pure mapping function consumed by both server and client. `RawDataset` describes the shape of the upstream JSON. `MappedDataset` is the flat shape the UI needs. `mapDataset` handles the transform, including null coalescing for missing fields.

Keeping these in a shared directory means the server and client always agree on the data contract. If the upstream schema changes, there is one place to update.

### server/

A build-time data generation script (`generate.ts`) that fetches the raw dataset JSON from GitHub, maps it through the shared transform, and writes a static `datasets.json` file into the client's public directory. This runs before the client build via `npm run build:data`.

The script exits with code 1 on failure, which halts the build pipeline. A partial or missing data file should never make it to production.

There is also an Express API endpoint (`index.ts`) that serves the mapped data at runtime. This was built first as a learning exercise and to validate the mapping logic, but the production frontend consumes the static file instead. The API exists as a demonstration that the data layer could be extracted to a backend service if the project needed server-side filtering, pagination, or authentication.

### client/

React 19 with Vite and TypeScript. CSS architecture uses a layered module system adapted from my portfolio site ([drewbs.dev](https://drewbs.dev)):

- `tokens.css` defines all CSS custom properties (colours, spacing, typography, radii)
- `reset.css` normalises browser defaults and sets base element styles
- `layout.css` handles structural page layout
- `components.css` contains reusable UI classes
- `index.css` is the entry point that imports everything in the correct cascade order

The colour palette was eyedropped from [hdruk.ac.uk](https://www.hdruk.ac.uk) and converted to HSL for consistency with the token system.

---

## Tech choices

**React + Vite + TypeScript** because these are what I use daily and can move fastest with. Vite's dev server and build tooling are excellent for a project this size.

**Monorepo with shared types** because the mapping function and type definitions are consumed by both the data generation script and the client. Duplicating them would create a maintenance risk where the two could drift apart.

**Build-time data generation rather than runtime fetching** because the upstream data does not change between page loads. Fetching 900+ datasets on every visit wastes bandwidth and adds a loading state the user does not need to see. The trade-off is that the data is only as fresh as the last build, which is acceptable for a catalogue of this nature.

**CSS custom properties rather than styled-components** because I evaluated styled-components during planning and decided against it. The setup overhead (TypeScript declaration files, ThemeProvider wiring, learning a new API under time pressure) was not justified for a project with fewer than 15 components. CSS custom properties give me the same token-based design system with zero runtime cost, and it is the approach I can explain and defend without hesitation. The reasoning is documented in my engineering vault at [drewbs.dev/vault](https://drewbs.dev/vault).

---

## AI tool usage

Claude (Anthropic) was used for planning, review, and limited boilerplate assistance such as scaffolding and type shapes. Core application logic and final implementation decisions were made by me, and I reviewed and edited any AI-assisted output before including it.

---

## What I would do with more time

- Add unit tests for the mapping function (it is pure and trivially testable)
- Add integration tests for the filter/sort/pagination logic
- Implement URL query parameter sync so filtered views are shareable
- Add keyboard navigation for the table
- Consider virtualised rendering if the dataset count grows significantly
