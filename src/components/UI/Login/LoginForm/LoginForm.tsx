import type React from "react";
import styles from "../../../../views/AuthView/LoginView/LoginView.module.css";
import type { FC } from "react";
interface LoginFormProps {
  username: string;
  password: string;
  error: string;
  setUsername: (value: string) => void;
  setPassword: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
}
export const LoginForm: FC<LoginFormProps> = ({
  username,
  password,
  error,
  setUsername,
  setPassword,
  handleSubmit,
}) => {
  return (
    <div className={styles.loginFormSide}>
      <div className={styles.loginFormContainer}>
        <h2>Inicia sesión</h2>

        {error && <div className={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Usuario</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ingresa tu usuario"
            />
          </div>

          <div className={styles.formGroup}>
            <label>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa tu contraseña"
            />
          </div>

          <button type="submit">Ingresar</button>
        </form>
      </div>
    </div>
  );
};
