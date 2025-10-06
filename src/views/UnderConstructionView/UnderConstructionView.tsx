import { useNavigate } from "react-router-dom";
import styles from "./UnderConstructionView.module.css";
import { Hammer, ArrowLeft } from "lucide-react";

export const UnderConstructionView = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <div className={styles.underConstruction}>
      <Hammer size={64} className={styles.icon} />
      <h1>Página en construcción</h1>
      <p>Estamos trabajando para mejorar tu experiencia. Vuelve pronto 🚧</p>
      <button className={styles.backButton} onClick={handleBack}>
        <ArrowLeft size={18} />
        <span>Volver atrás</span>
      </button>
    </div>
  );
};
