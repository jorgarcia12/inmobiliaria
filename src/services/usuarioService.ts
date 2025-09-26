import api from "../interceptors/api.interceptor";
import type { IUsuario } from "../types/IUsuario";

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
  createUsuario: async (usuario: UsuarioCreate) => {
    const { data } = await api.post("/usuario", usuario);
    return data;
  },

  getAllUsers: async (): Promise<IUsuario[]> => {
    const { data } = await api.get("/usuario");
    return data;
  },

  updateUsuario: async (
    id: number,
    usuario: Partial<IUsuario>
  ): Promise<IUsuario> => {
    const { data } = await api.put(`/usuario/${id}`, usuario);
    return data;
  },

  deleteUsuario: async (id: number): Promise<void> => {
    await api.delete(`/usuario/${id}`);
  },

  updateActivo: async (id: number, activo: boolean) => {
    const { data } = await api.patch(`/usuario/${id}/activo`, { activo });
    return data;
  },
};
