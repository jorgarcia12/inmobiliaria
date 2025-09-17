import styles from "./NavBarAdmin.module.css";
import logo from "../../../../assets/Casa Garitaonandia-34.png";
import { CircleUserRound, LogOut, Plus } from "lucide-react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const NavBarAdmin = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/admin/add-property");
  };
  const handleLogout = () => {
    navigate("/");
  };
  return (
    <div className={styles.navBarAdminContainer}>
      <div className={styles.userIconContainer}>
        <CircleUserRound size={50} />
      </div>

      <div className={styles.logoContainer}>
        <img src={logo} alt="logo-casaGarita" />
      </div>
      <div className={styles.buttonsContainer}>
        <Button
          variant="dark"
          className={styles.buttonAddProperty}
          onClick={handleNavigate}
        >
          Agregar Propiedad <Plus />
        </Button>
        <Button variant="dark" className={styles.buttonLogout}>
          <LogOut onClick={handleLogout} />
        </Button>
      </div>
    </div>
  );
};
