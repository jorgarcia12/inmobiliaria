import { CircleCheckBig } from "lucide-react";
import styles from "./SideBarProperties.module.css";
export const SideBarProperties = () => {
  return (
    <div className={styles.sideContainer}>
      <div className={styles.stepContainer}>
        <h5>
          <CircleCheckBig /> Cargar datos
        </h5>
      </div>
      <div className={styles.stepContainer}>
        <h5>
          <CircleCheckBig /> Revision de datos
        </h5>
      </div>
      <div className={styles.stepContainer}>
        <h5>
          <CircleCheckBig />
          Confirmar
        </h5>
      </div>
    </div>
  );
};
