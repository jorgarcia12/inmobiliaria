import { Breadcrumb } from "../../components/BreadCrumb/BreadCrumb";
import { FilterColumn } from "../../components/UI/FilterColumn/FilterColumn";
import { ImagesSection } from "../../components/UI/ImagesSection/ImagesSection";
import styles from "./Properties.module.css";

export const Properties = () => {
  return (
    <div className={styles.propertiesContainer}>
      <Breadcrumb />
      <div className={styles.contentContainer}>
        <div className={styles.filterColumn}>
          <FilterColumn />
        </div>
        <div className={styles.propertiesCards}>
          <ImagesSection />
        </div>
      </div>
    </div>
  );
};
