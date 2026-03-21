// Build-time data generation script
// Fetches raw JSON from GitHub, maps it, writes static output for the client build
// Run via: npm run build:data (from root or server directory)

import fs from 'fs'
import path from 'path'

const DATA_URL = 'https://raw.githubusercontent.com/HDRUK/hackathon-entity-linkage/refs/heads/dev/fe-implement/app/data/all_datasets.json'
const OUTPUT_PATH = path.resolve(import.meta.dirname, '../../client/public/data/datasets.json')

// TODO: implement the build script
// - Fetch from DATA_URL
// - Map each item using mapDataset from @shared/mapDataset
// - Ensure output directory exists
// - Write JSON to OUTPUT_PATH
// - Log success/failure

console.log('Build script not yet implemented')
