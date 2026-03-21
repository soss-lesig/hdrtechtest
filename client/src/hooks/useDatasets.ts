import { useState, useEffect } from "react";

export function useDatasets() {
  const [datasets, setDatasets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    //fetch data from datasets.json and add it to the datasets state
    fetch("/data/datasets.json")
      .then((response) => response.json())
      .then((data) => setDatasets(data))
      .then(() => setLoading(false))
      .catch((error) => {
        console.error("Error fetching datasets:", error);
        setError(error.message || "Failed to fetch datasets");
        setLoading(false);
      });
  }, []);

  return { datasets, loading, error };
}
