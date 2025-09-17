import { useState, type FormEvent } from "react";
import styles from "./LoginView.module.css";

import { useNavigate } from "react-router-dom";
import { LoginPhoto } from "../../../components/UI/Login/LoginPhoto/LoginPhoto";
import { LoginForm } from "../../../components/UI/Login/LoginForm/LoginForm";
import { authService } from "../../../services/authService";
export const LoginView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Por favor completa todos los campos");
      return;
    }
    try {
      const data = await authService.login(username, password);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setError("");
      navigate("/admin");
    } catch (err) {
      setError("Usuario o contraseña incorrectos");
      console.log("Usuario o contraseña incorrectos", err);
    }
  };

  return (
    <div className={styles.loginPageWrapper}>
      <LoginPhoto />
      <LoginForm
        username={username}
        password={password}
        error={error}
        setUsername={setUsername}
        setPassword={setPassword}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};
