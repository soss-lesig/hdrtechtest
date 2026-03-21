import type { MappedDataset } from "@shared/types";
import styles from "./DatasetIndex.module.css";

interface DatasetIndexProps {
  datasets: MappedDataset[];
}

//object map that returns css clases based on the accessServiceCategory value
const getCategoryClass = (category: string) => {
  switch (category) {
    case "Open access":
      return styles.openAccess;
    case "Direct access":
      return styles.directAccess;
    case "TRE/SDE":
      return styles.treSde;
    case "Varies based on project":
      return styles.varies;
    default:
      return styles.notSpecified;
  }
};

function DatasetIndex({ datasets }: DatasetIndexProps) {
  return (
    <div className={styles.datasetIndex}>
      {datasets.map((dataset, index) => (
        <div key={index} className={styles.datasetCard}>
          <h2>{dataset.title}</h2>
          <p className={styles.description}>{dataset.description}</p>
          <div className={styles.meta}>
            <span className={styles.categoryLabel}>Access:</span>
            <span className={getCategoryClass(dataset.accessServiceCategory)}>
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
