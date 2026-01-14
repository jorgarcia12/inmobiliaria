import styles from "./MainBanner.module.css";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
export const MainBanner = () => {
  const navigate = useNavigate();

  const numeroTelefono = import.meta.env.VITE_CONTACT_PHONE;

  const handleNavComprar = () => {
    navigate("/propiedades?tipo_operacion=VENTA");
  };

  const handleNavAlquilar = () => {
    navigate("/propiedades?tipo_operacion=ALQUILER");
  };

  const handleNavVender = () => {
    const numero = numeroTelefono;
    const mensaje = "Hola, estoy interesado en publicar mi propiedad!";
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
  };

  return (
    <div className={styles.banner}>
      <div className={styles.bannerSearchContainer}>
        <h1 className={styles.bannerTitle}>Inverti con vision</h1>
        <div className={styles.preFilterContainer}>
          <Button
            variant="none"
            className={styles.bannerMainButton}
            onClick={handleNavComprar}
          >
            Quiero Comprar
          </Button>
          <Button
            variant="none"
            className={styles.bannerButton}
            onClick={handleNavAlquilar}
          >
            Quiero Alquilar
          </Button>
          <Button
            variant="none"
            className={styles.bannerButton}
            onClick={handleNavVender}
          >
            Quiero Vender
          </Button>
        </div>
      </div>
    </div>
  );
};
