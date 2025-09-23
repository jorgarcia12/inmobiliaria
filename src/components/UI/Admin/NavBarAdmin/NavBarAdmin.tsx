import styles from "./NavBarAdmin.module.css";
import logo from "../../../../assets/Casa Garitaonandia-34.png";
import { CircleUserRound, LogOut, Plus } from "lucide-react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { usuarioStore } from "../../../../store/usuarioStore";

export const NavBarAdmin = () => {
  const navigate = useNavigate();

  const { usuarioLogueado, logout } = usuarioStore();
  const handleNavigate = () => {
    navigate("/admin/add-property");
  };
  const handleLogout = () => {
    logout();
    setTimeout(() => navigate("/", { replace: true }), 0);
  };
  return (
    <div className={styles.navBarAdminContainer}>
      <div className={styles.userInfoContainer}>
        <CircleUserRound size={50} />
        <div className={styles.userText}>
          <div className={styles.userName}>
            {usuarioLogueado
              ? `${usuarioLogueado.nombre} ${usuarioLogueado.apellido}`
              : "Usuario"}
          </div>
          <div className={styles.userRole}>
            {usuarioLogueado ? usuarioLogueado.rol : "-"}
          </div>
        </div>
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
        <Button
          variant="dark"
          className={styles.buttonLogout}
          onClick={handleLogout}
        >
          <LogOut />
        </Button>
      </div>
    </div>
  );
};
