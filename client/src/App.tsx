import { useDatasets } from "./hooks/useDatasets";

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
      <pre>{JSON.stringify(datasets, null, 2)}</pre>
    </div>
  );
}

export default App;
