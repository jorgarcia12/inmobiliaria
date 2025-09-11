import styles from "./NavBar.module.css";
import logo from "../../../assets/Casa Garitaonandia-35.png";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export const NavBar = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/admin");
  };

  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={styles.navBarContainer}>
      <Link to="/" className={styles.navLogo}>
        <img src={logo} alt="Logo" />
      </Link>

      <div className={styles.hamburguesa} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? (
          <X size={28} color="white" />
        ) : (
          <Menu size={28} color="white" />
        )}
      </div>

      <nav className={`${styles.navBar} ${isOpen ? styles.active : ""}`}>
        <ul>
          <li>
            <Link
              to="/propiedades"
              className={styles.links}
              onClick={() => setIsOpen(false)}
            >
              Comprar
            </Link>
          </li>
          <li>
            <Link
              to="/vender"
              className={styles.links}
              onClick={() => setIsOpen(false)}
            >
              Vender
            </Link>
          </li>
          <li>
            <Link
              to="/propiedades"
              className={styles.links}
              onClick={() => setIsOpen(false)}
            >
              Alquilar
            </Link>
          </li>
          <li>
            <Link
              to="/contacto"
              className={styles.links}
              onClick={() => setIsOpen(false)}
            >
              Contacto
            </Link>
          </li>
        </ul>
        <div className={styles.loginContainer}>
          <Button className={styles.loginButton} onClick={handleLogin}>
            Iniciar Sesion
          </Button>
        </div>
      </nav>
    </div>
  );
};
