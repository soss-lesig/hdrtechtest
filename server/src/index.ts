// Express server entry point
// Serves the mapped dataset API at GET /api/datasets
// In development: runs live on localhost:3001
// At build time: generate.ts uses the same transform logic to write static JSON

import express from "express";
import cors from "cors";
import { mapDataset } from "@shared/mapDataset.ts";

const app = express();
const PORT = 3001;

app.use(cors());

app.get("/api/datasets", async (req, res) => {
  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/HDRUK/hackathon-entity-linkage/refs/heads/dev/fe-implement/app/data/all_datasets.json",
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch datasets: ${response.statusText}`);
    }
    const rawDatasets = await response.json();
    // Map raw datasets to the shape the UI needs
    const mappedDatasets = rawDatasets.map(mapDataset);
    res.json(mappedDatasets);
  } catch (error) {
    console.error("Error fetching or processing datasets:", error);
    res.status(500).json({ error: "Failed to fetch datasets" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
