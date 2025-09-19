import { Button, Spinner, Table } from "react-bootstrap";
import { usuarioStore } from "../../../../../store/usuarioStore";
import { useEffect } from "react";
import type { IUsuario } from "../../../../../types/IUsuario";
import styles from "./Users.module.css";
import { Trash } from "lucide-react";
import { confirmToast } from "../../../../../utils/confirmToast";

export const Users = () => {
  const { usuarios, getUsuarios, loading, error, deleteUsuario } =
    usuarioStore();

  useEffect(() => {
    getUsuarios();
  }, [getUsuarios]);

  const handleDelete = (id: number) => {
    confirmToast({
      message: "¿Estás seguro de eliminar este usuario?",
      onConfirm: async () => {
        await deleteUsuario(id);
      },
    });
  };

  if (loading) return <Spinner animation="grow" />;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.usersContainer}>
      <h2>Usuarios</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Telefono</th>
            <th>Nombre de Usuario</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u: IUsuario) => (
            <tr key={u.id}>
              <td>
                {u.nombre} {u.apellido}
              </td>
              <td>{u.email}</td>
              <td>{u.telefono}</td>
              <td>{u.username}</td>
              <td>{u.rol}</td>
              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(u.id!)}
                >
                  <Trash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
