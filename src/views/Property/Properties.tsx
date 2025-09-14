import { useState } from "react";
import { FilterColumn } from "../../components/UI/FilterColumn/FilterColumn";
import { ImagesSection } from "../../components/UI/ImagesSection/ImagesSection";
import styles from "./Properties.module.css";
import type { FiltrosPropiedad } from "../../types/FiltrosPropiedad";

export const Properties = () => {
  const [filters, setFilters] = useState<FiltrosPropiedad>({ search: "" });
  return (
    <div className={styles.propertiesContainer}>
      <div className={styles.contentContainer}>
        <div className={styles.filterColumn}>
         <FilterColumn filters={filters} setFilters={setFilters} />
        </div>
        <div className={styles.propertiesCards}>
           <ImagesSection filters={filters} />
        </div>
      </div>
    </div>
  );
};
