import { useEffect, useState } from "react";
import type { Rol } from "../../../../../types/enums";
import { generarUsername } from "../../../../../utils/createUsername";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";

import styles from "./CreateUserForm.tsx.module.css";
import { authService } from "../../../../../services/authService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ArrowLeft } from "lucide-react";

export const CreateUserForm = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [rol, setRol] = useState<Rol>("USUARIO");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Actualizar username en tiempo real
  useEffect(() => {
    if (nombre && apellido) {
      setUsername(generarUsername(nombre, apellido));
    } else {
      setUsername("");
    }
  }, [nombre, apellido]);
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await authService.register(
        nombre,
        apellido,
        email,
        telefono,
        rol,
        fechaNacimiento,
        username,
        password
      );

      toast.success("Usuario creado correctamente!");

      setNombre("");
      setApellido("");
      setEmail("");
      setTelefono("");
      setRol("USUARIO");
      setFechaNacimiento("");
      setUsername("");
      setPassword("");
      setConfirmPassword("");

      navigate("/admin");
    } catch (error) {
      console.error(error);
      toast.error("Hubo un error al crear el usuario.");
    }
  };

  return (
    <Form onSubmit={handleSubmit} className={styles.formContainer}>
      <div className={styles.columnContainer}>
        <div className={styles.column}>
          <h3 className={styles.title}>Crear Usuario</h3>
          <Form.Group className={styles.formGroup}>
            <Form.Label className={styles.formLabel}>Nombre</Form.Label>
            <Form.Control
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              className={styles.formInput}
            />
          </Form.Group>

          <Form.Group className={styles.formGroup}>
            <Form.Label className={styles.formLabel}>Apellido</Form.Label>
            <Form.Control
              type="text"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              required
              className={styles.formInput}
            />
          </Form.Group>

          <Form.Group className={styles.formGroup}>
            <Form.Label className={styles.formLabel}>
              Nombre de Usuario (autogenerado)
            </Form.Label>
            <Form.Control
              type="text"
              value={username}
              readOnly
              className={styles.formInput}
            />
          </Form.Group>

          <Form.Group className={styles.formGroup}>
            <Form.Label className={styles.formLabel}>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={styles.formInput}
            />
          </Form.Group>

          <Form.Group className={styles.formGroup}>
            <Form.Label className={styles.formLabel}>Teléfono</Form.Label>
            <Form.Control
              type="text"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              className={styles.formInput}
            />
          </Form.Group>
        </div>
        <div className={styles.column}>
          <Form.Group className={styles.formGroup}>
            <Form.Label className={styles.formLabel}>Contraseña</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={styles.passwordInput}
            />
          </Form.Group>

          <Form.Group className={styles.formGroup}>
            <Form.Label className={styles.formLabel}>
              Confirmar Contraseña
            </Form.Label>
            <Form.Control
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className={styles.passwordInput}
            />
          </Form.Group>

          <Form.Group className={styles.formGroup}>
            <Form.Label className={styles.formLabel}>Rol</Form.Label>
            <Form.Select
              value={rol}
              onChange={(e) => setRol(e.target.value as Rol)}
              className={styles.formSelect}
            >
              <option value="AGENTE">Agente</option>
              <option value="ADMIN">Administrador</option>
              <option value="USUARIO">Usuario</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className={styles.formGroup}>
            <Form.Label className={styles.formLabel}>
              Fecha de Nacimiento
            </Form.Label>
            <Form.Control
              type="date"
              value={fechaNacimiento}
              onChange={(e) => setFechaNacimiento(e.target.value)}
              className={styles.formInput}
            />
          </Form.Group>
          <div className={styles.actions}>
            <Button type="submit" className={styles.submitButton}>
              Crear Usuario
            </Button>
            <Button
              type="button"
              variant="secondary"
              className={styles.backButton}
              onClick={() => navigate(-1)}
            >
              <ArrowLeft size={18} style={{ marginRight: "6px" }} />
              Volver atrás
            </Button>
          </div>
        </div>
      </div>
    </Form>
  );
};
