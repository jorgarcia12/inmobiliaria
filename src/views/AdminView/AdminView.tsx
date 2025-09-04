import { MainAdmin } from "../../components/UI/Admin/MainAdmin/MainAdmin";
import { SideBarAdmin } from "../../components/UI/Admin/SideBarAdmin/SideBarAdmin";
import styles from "./AdminView.module.css";
export const AdminView = () => {
  return (
    <div className={styles.adminViewContainer}>
      <div className={styles.mainContent}>
        <SideBarAdmin />
        <MainAdmin />
      </div>
    </div>
  );
};
