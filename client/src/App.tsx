import { useState, useEffect } from "react";

function App() {
  const [datasets, setDatasets] = useState([]);

  useEffect(() => {
    //fetch data from datasets.json and add it to the datasets state
    fetch("/data/datasets.json")
      .then((response) => response.json())
      .then((data) => setDatasets(data))
      .catch((error) => console.error("Error fetching datasets:", error));
  }, []);

  return (
    <div className="app">
      <h1>HDR UK Dataset Explorer</h1>
      <pre>{JSON.stringify(datasets, null, 2)}</pre>
    </div>
  );
}

export default App;
