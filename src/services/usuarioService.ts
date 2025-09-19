import axios from "axios";
import type { IUsuario } from "../types/IUsuario";

const API_URL = import.meta.env.VITE_API_URL + "/usuario";

interface UsuarioCreate {
  nombre: string;
  username: string;
  apellido: string;
  email: string;
  telefono?: string;
  rol: string;
  fechaNacimiento?: Date;
  password?: string;
}

export const usuarioService = {
  //CREAR USUARIO
  createUsuario: async (usuario: UsuarioCreate) => {
    try {
      const res = await axios.post(API_URL, usuario, {
        headers: { "Content-Type": "application/json" },
      });
      return res.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Error al crear el usuario:",
          error.response?.data || error.message
        );
      } else {
        console.error("Error desconocido:", error);
      }
      throw error;
    }
  },

  //OBTENER TODOS LOS USUARIOS
  getAllUsers: async (): Promise<IUsuario[]> => {
    try {
      const res = await axios.get(API_URL);
      return res.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Error obteniendo usuarios:",
          error.response?.data || error.message
        );
      } else {
        console.error("Error desconocido:", error);
      }
      throw error;
    }
  },

  //ACTUALIZAR UN USUARIO
  updateUsuario: async (
    id: number,
    usuario: Partial<IUsuario>
  ): Promise<IUsuario> => {
    const res = await axios.put(`${API_URL}/${id}`, usuario, {
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  },
  //ELIMINAR UN USUARIO
  deleteUsuario: async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
  },

  //ACTUALIZAR EL USUARIO ACTIVO
  updateActivo: async (id: number, activo: boolean) => {
    try {
      const res = await axios.patch(`${API_URL}/${id}/activo`, { activo });
      return res.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Error al actualizar usuario:",
          error.response?.data || error.message
        );
      } else {
        console.error("Error desconocido:", error);
      }
      throw error;
    }
  },
};
