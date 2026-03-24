import type { MappedDataset } from "@shared/types";
import styles from "./DatasetIndex.module.css";
import Pagination from "./Pagination";

import { useState, useMemo } from "react";

interface DatasetIndexProps {
  datasets: MappedDataset[];
}

//object map that returns css classes based on the accessServiceCategory value
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
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const pageSize = 10;

  // filter datasets based on search term
  const filtered = useMemo(() => {
    return datasets.filter(
      (dataset) =>
        dataset.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dataset.description.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [datasets, searchTerm]);

  // calculate total pages and paginated datasets
  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className={styles.datasetIndex}>
      <input
        type="text"
        placeholder="Search datasets by title or description..."
        value={searchTerm}
        onChange={handleSearch}
        className={styles.searchInput}
      />

      <p className={styles.resultCount}>
        {filtered.length} dataset{filtered.length !== 1 ? "s" : ""} found
      </p>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {paginated.map((dataset, index) => (
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

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

export default DatasetIndex;
