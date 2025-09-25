import styles from "./Footer.module.css";
import logoFooter from "../../../assets/Casa Garitaonandia-35.png";
import { Instagram, Mail, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Footer = () => {
  const phone = import.meta.env.VITE_CONTACT_PHONE;
  const mail = import.meta.env.VITE_CONTACT_MAIL;
  const instagram = import.meta.env.VITE_CONTACT_INSTAGRAM;

  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
    window.scrollTo(0, 0);
  };
 const handleContacto = () => {
    window.open(`https://wa.me/${phone}`, "_blank");
  };
  return (
    <div className={styles.footerContainer}>
      <div className={styles.logoContainer}>
        <img src={logoFooter} />
        <h4>Encontremos tu Próximo Hogar!</h4>
      </div>

      <div className={styles.footerIndex}>
        <h4>Explorar</h4>
        <li onClick={() => handleNavigate("/")}>Inicio</li>
        <li onClick={() => handleNavigate("/propiedades")}>Comprar</li>
        <li>Vender</li>
        <li onClick={() => navigate("/propiedades")}>Alquilar</li>
        <li onClick={handleContacto}>Contacto</li>
      </div>

      <div className={styles.contactContainer}>
        <h4>Contactanos</h4>

        <a href={`mailto:${mail}`}>
          <Mail /> casagaritaonandia@gmail.com
        </a>

        <a
          href={`https://wa.me/${phone}`}
          target="blank"
          rel="noopener noreferrer"
        >
          <Phone /> +54 261 6958957
        </a>
      </div>

      <div className={styles.socialContainer}>
        <h4>Redes Sociales</h4>
        <a
          href={`https://www.instagram.com/${instagram}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Instagram /> @casaGarita
        </a>
      </div>
    </div>
  );
};
