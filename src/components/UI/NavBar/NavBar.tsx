import styles from "./NavBar.module.css";
import logo from "../../../assets/Casa Garitaonandia-35.png";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { usuarioStore } from "../../../store/usuarioStore";
import { Logout } from "@mui/icons-material";
const numeroTelefono = import.meta.env.VITE_CONTACT_PHONE;
export const NavBar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { usuarioLogueado, logout } = usuarioStore();
  const handleLogin = () => {
    navigate("/auth/login");
  };
  const handleAdmin = () => {
    navigate("/admin");
  };

  const handleConsulta = () => {
    const numero = numeroTelefono;
    const mensaje = "Hola, estoy interesado en publicar mi propiedad!";
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
  };

  return (
    <div className={styles.navBarContainer}>
      {/* LOGO */}
      <Link to="/" className={styles.navLogo}>
        <img src={logo} alt="Logo" />
      </Link>
      {/* MENU HAMBURGUESA */}
      <div className={styles.hamburguesa} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? (
          <X size={28} color="white" />
        ) : (
          <Menu size={28} color="white" />
        )}
      </div>
      {/* NAVBAR */}
      <nav className={`${styles.navBar} ${isOpen ? styles.active : ""}`}>
        <ul>
          <li>
            <Link
              to="/propiedades?tipo_operacion=VENTA"
              className={styles.links}
              onClick={() => setIsOpen(false)}
            >
              Comprar
            </Link>
          </li>
          <li>
            <Link to="/" className={styles.links} onClick={handleConsulta}>
              Vender
            </Link>
          </li>
          <li>
            <Link
              to="/propiedades?tipo_operacion=ALQUILER"
              className={styles.links}
              onClick={() => setIsOpen(false)}
            >
              Alquilar
            </Link>
          </li>
        </ul>
        {/* INICIO DE SESION */}
        <div className={styles.loginContainer}>
          {usuarioLogueado ? (
            <div className={styles.userInfoContainer}>
              <div className={styles.username} onClick={handleAdmin}>
                {`${usuarioLogueado.nombre} ${usuarioLogueado.apellido}`}
              </div>

              <Button
                className={styles.logoutButton}
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                title="cerrar sesion"
              >
                <Logout />
              </Button>
            </div>
          ) : (
            <Button className={styles.loginButton} onClick={handleLogin}>
              Iniciar Sesion
            </Button>
          )}
        </div>
      </nav>
    </div>
  );
};
