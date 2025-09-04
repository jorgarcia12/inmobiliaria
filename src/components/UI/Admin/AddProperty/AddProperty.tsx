import { FormAddProperty } from "../FormAddProperty/FormAddProperty";
import { SideBarProperties } from "../SideBarProperties/SideBarProperties";
import styles from "./AddProperty.module.css";

export const AddProperty = () => {
  return (
    <div className={styles.addPropertyContainer}>
      <FormAddProperty />
      <SideBarProperties />
    </div>
  );
};
