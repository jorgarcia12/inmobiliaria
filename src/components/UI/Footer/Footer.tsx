import styles from "./Footer.module.css";
import logoFooter from "../../../assets/Casa Garitaonandia-35.png";
import { Instagram, Mail, Phone } from "lucide-react";

export const Footer = () => {
  return (
    <div className={styles.footerContainer}>
  <div className={styles.logoContainer}>
    <img src={logoFooter} />
    <h4>Encontremos tu Próximo Hogar!</h4>
  </div>

  <div className={styles.footerIndex}>
    <h4>Explorar</h4>
    <li>Inicio</li>
    <li>Comprar</li>
    <li>Vender</li>
    <li>Alquilar</li>
    <li>Contacto</li>
  </div>

  <div className={styles.contactContainer}>
    <h4>Contactanos</h4>
    <p>
      <Mail /> casaGarita@gmail.com
    </p>
    <p>
      <Phone /> +54 261 5789043
    </p>
  </div>

  <div className={styles.socialContainer}>
    <h4>Redes Sociales</h4>
    <p>
      <Instagram /> @casaGarita
    </p>
  </div>
</div>

  );
};
