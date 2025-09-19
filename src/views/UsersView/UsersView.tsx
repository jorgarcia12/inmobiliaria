import { SideBarAdmin } from "../../components/UI/Admin/SideBarAdmin/SideBarAdmin";
import { Users } from "../../components/UI/Admin/Users/Users/Users";

import styles from "../AdminView/AdminView.module.css";

export const UsersView = () => {
  return (
    <div className={styles.adminViewContainer}>
      <div className={styles.mainContent}>
        <SideBarAdmin />
        <Users />
      </div>
    </div>
  );
};
