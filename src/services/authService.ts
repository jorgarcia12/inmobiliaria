import api from "../interceptors/api.interceptor";
import type { Rol } from "../types/enums";

export const authService = {
  login: async (username: string, password: string) => {
    const { data } = await api.post("/auth/login", { username, password });
    return data;
  },

  register: async (
    nombre: string,
    apellido: string,
    email: string,
    telefono: string,
    rol: Rol,
    fechaNacimiento: string,
    username: string,
    password: string
  ) => {
    const { data } = await api.post("/auth/register", {
      nombre,
      apellido,
      email,
      telefono,
      rol,
      fechaNacimiento,
      username,
      password,
    });
    return data;
  },
};
