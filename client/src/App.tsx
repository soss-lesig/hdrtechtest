import { useDatasets } from "./hooks/useDatasets";
import DatasetIndex from "./components/DatasetIndex";

function App() {
  const { datasets, loading, error } = useDatasets();

  if (loading) {
    return <div className="app">Loading...</div>;
  }

  if (error) {
    return <div className="app">Error: {error}</div>;
  }

  return (
    <div className="app">
      <h1>HDR UK Dataset Explorer</h1>
      <DatasetIndex datasets={datasets} />
    </div>
  );
}

export default App;
