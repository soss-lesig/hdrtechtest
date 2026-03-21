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
      <div>
        {datasets.map((dataset) => (
          <div key={dataset.id} className="dataset-card">
            <h3>{dataset.title}</h3>
            <p>{dataset.description}</p>
            <p>{dataset.accessServiceCategory}</p>
            <a
              href={dataset.accessRights}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Dataset
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
