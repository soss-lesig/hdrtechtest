// Express server entry point
// Serves the mapped dataset API at GET /api/datasets
// In development: runs live on localhost:3001
// At build time: generate.ts uses the same transform logic to write static JSON

import express from 'express'
import cors from 'cors'

const app = express()
const PORT = 3001

app.use(cors())

// TODO: implement GET /api/datasets endpoint
// - Fetch raw JSON from GitHub
// - Map using mapDataset from @shared/mapDataset
// - Return flat array as JSON

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
