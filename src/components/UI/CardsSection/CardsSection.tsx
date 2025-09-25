import styles from "./CardsSection.module.css";
import casaCard from "../../../assets/img_card1.jpg";
import contact from "../../../assets/Casa Garitaonandia-33.png";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
export const CardsSection = () => {
  const phone = import.meta.env.VITE_CONTACT_PHONE;
  const navigate = useNavigate();

  const handleGoProperties = () => {
    navigate("/propiedades");
  };
  const handleContacto = () => {
    window.open(`https://wa.me/${phone}`, "_blank");
  };

  return (
    <div className={styles.cardsContainer}>
      <div className={styles.card}>
        <div className={styles.cardImgContainer}>
          <img
            src={casaCard}
            alt="Properties Image"
            className={styles.cardImg}
          />
        </div>
        <div className={styles.cardInfoContainer}>
          <h5>
            Propiedades pensadas para vos, con el respaldo de nuestra
            experiencia
          </h5>
          <p className={styles.cardText}>
            Te acompañamos en cada paso para que encuentres el inmueble que se
            adapte a tu vida.
          </p>
          <Button
            className={styles.buttonPropiedades}
            onClick={handleGoProperties}
          >
            Ver Propiedades
          </Button>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.cardInfoContainer2}>
          <h5 className={styles.cardTitle}>Quienes somos!</h5>
          <p className={styles.cardText}>
            En casa Garitaonandia estamos comprometidos con brindar un servicio
            cercano, transparente y profesional. Nuestro objetivo es ayudarte a
            encontrar la propiedad ideal para vos y tu familia, ofreciendo
            acompañamiento en cada paso del proceso de compra, venta o alquiler.
          </p>
          <Button className={styles.buttonPropiedades} onClick={handleContacto}>
            Contactanos!
          </Button>
        </div>
        <div className={styles.cardImgContainer}>
          <img
            src={contact}
            alt="Properties Image"
            className={styles.cardImg}
          />
        </div>
      </div>
    </div>
  );
};
