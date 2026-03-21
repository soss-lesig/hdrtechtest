// Pure mapping function - transforms a raw dataset into the flat shape the UI needs
// Handles null/undefined defensively at the boundary

import type { RawDataset, MappedDataset } from "./types";

function mapDataset(raw: RawDataset): MappedDataset {
  return {
    id: raw.id,
    title: raw.metadata.summary.title,
    description: raw.metadata.summary.description ?? "No description provided",
    accessServiceCategory:
      raw.metadata.accessibility.access.accessServiceCategory ??
      "Not specified",
    accessRights:
      raw.metadata.accessibility.access.accessRights ?? "Not available",
  };
}

export { mapDataset };
