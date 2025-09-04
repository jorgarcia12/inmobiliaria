import styles from "./NavBar.module.css";
import logo from "../../../assets/Casa Garitaonandia-35.png";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

export const NavBar = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/admin");
  };

  

  return (
    <div className={styles.navBarContainer}>
      <Link to="/" className={styles.navLogo}>
        <img src={logo} alt="Logo" />
      </Link>
      <nav className={styles.navBar}>
        <ul>
          <li>
            <Link to="/comprar" className={styles.links}>
              Comprar
            </Link>
          </li>
          <li>
            <Link to="/vender" className={styles.links}>
              Vender
            </Link>
          </li>
          <li>
            <Link to="/alquilar" className={styles.links}>
              Alquilar
            </Link>
          </li>
          <li>
            <Link to="/contacto" className={styles.links}>
              Contacto
            </Link>
          </li>
        </ul>
      </nav>
      <div className={styles.loginContainer}>
        <Button className={styles.loginButton} onClick={handleLogin}>
          Iniciar Sesion
        </Button>
      </div>
    </div>
  );
};
