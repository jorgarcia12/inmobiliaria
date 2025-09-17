import logo from "../../../../assets/Casa Garitaonandia-35.png";
import styles from "../../../../views/AuthView/LoginView/LoginView.module.css";


export const LoginPhoto = () => {
  return (
    <div className={styles.loginImageSide}>
      <div className={styles.overlay}>
        <img
          src={logo}
          alt="logoCasaGaritaonandia-blanco-texto"
          style={{ width: "300px" }}
        />
        <p>Administra tus propiedades fácilmente</p>
      </div>
    </div>
  );
};
