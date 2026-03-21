import type { MappedDataset } from "@shared/types";
import styles from "./DatasetIndex.module.css";

interface DatasetIndexProps {
  datasets: MappedDataset[];
}

function DatasetIndex({ datasets }: DatasetIndexProps) {
  return (
    <div className={styles.datasetIndex}>
      {datasets.map((dataset) => (
        <div key={dataset.id} className={styles.datasetCard}>
          <h2>{dataset.title}</h2>
          <p className={styles.description}>{dataset.description}</p>
          <div className={styles.meta}>
            <span className={styles.category}>
              {dataset.accessServiceCategory}
            </span>
            <a
              href={dataset.accessRights}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.accessLink}
            >
              View Access Rights
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DatasetIndex;
