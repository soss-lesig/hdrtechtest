// Build-time data generation script
// Fetches raw JSON from GitHub, maps it, writes static output for the client build
// Run via: npm run build:data (from root or server directory)

import fs from "fs";
import path from "path";
import { mapDataset } from "@shared/mapDataset.ts";

const DATA_URL =
  "https://raw.githubusercontent.com/HDRUK/hackathon-entity-linkage/refs/heads/dev/fe-implement/app/data/all_datasets.json";
const OUTPUT_PATH = path.resolve(
  import.meta.dirname,
  "../../client/public/data/datasets.json",
);

const generateData = async () => {
  try {
    const response = await fetch(DATA_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
    const rawDatasets = await response.json();
    const mappedDatasets = rawDatasets.map(mapDataset);

    // Ensure output directory exists
    fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(mappedDatasets, null, 2));
    console.log(`Data generated successfully at ${OUTPUT_PATH}`);
  } catch (error) {
    console.error("Error generating data:", error);
    process.exit(1);
  }
};

generateData();
