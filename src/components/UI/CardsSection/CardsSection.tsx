import styles from "./CardsSection.module.css";
import casaCard from "../../../assets/img_card1.jpg";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
export const CardsSection = () => {
  const navigate = useNavigate();
  const handleGoProperties = () => {
    navigate("/propiedades");
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
          <h5 className={styles.cardTitle}>
            Propiedades pensadas para vos, con el respaldo de nuestra
            experiencia
          </h5>
          <p className={styles.cardText}>
            Te acompañamos en cada paso para que encuentres el inmueble que se
            adapte a tu vida.
          </p>
          <Button className={styles.buttonPropiedades}>Ver Propiedades</Button>
        </div>
        <div className={styles.cardImgContainer}>
          <img
            src={casaCard}
            alt="Properties Image"
            className={styles.cardImg}
          />
        </div>
      </div>
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
          <Button className={styles.buttonPropiedades}>Ver Propiedades</Button>
        </div>
      </div>
    </div>
  );
};
