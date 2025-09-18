import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/usuario";

interface UsuarioCreate {
  nombre: string;
  username: string;
  apellido: string;
  email: string;
  telefono?: string;
  rol: string;
  fechaNacimiento?: string;
  password?: string;
}

export const usuarioService = {
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

  getAllUsers: async (): Promise<UsuarioCreate[]> => {
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
};
