import { useState, type FormEvent } from "react";
import styles from "./LoginView.module.css";

import { useNavigate } from "react-router-dom";
import { LoginPhoto } from "../../../components/UI/Login/LoginPhoto/LoginPhoto";
import { LoginForm } from "../../../components/UI/Login/LoginForm/LoginForm";
import { authService } from "../../../services/authService";
import { usuarioStore } from "../../../store/usuarioStore";
import { toast } from "react-toastify";

export const LoginView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUsuarioLogueado } = usuarioStore();
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Por favor completa todos los campos");
      return;
    }
    try {
      const data = await authService.login(username, password);
      console.log(data.usuario.nombre);

      localStorage.setItem("token", data.token);

      localStorage.setItem("user", JSON.stringify(data.usuario));
      setUsuarioLogueado(data.usuario);

      setError("");
      navigate("/admin");
      toast("Bienvenido! " + data.usuario.nombre);
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
