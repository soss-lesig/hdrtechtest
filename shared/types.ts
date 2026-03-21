// Shared types for the HDR UK dataset metadata
// Used by both the Express server and the React client
interface RawDataset {
  id: number;
  metadata: {
    summary: {
      title: string;
      description: string | null;
    };
    accessibility: {
      access: {
        accessServiceCategory: string | null;
        accessRights: string | null;
      };
    };
  };
}

interface MappedDataset {
  id: number;
  title: string;
  description: string;
  accessServiceCategory: string;
  accessRights: string;
}

export type { RawDataset, MappedDataset };
