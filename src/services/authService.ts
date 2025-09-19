import axios from "axios";
import type { Rol } from "../types/enums";

const API_URL = import.meta.env.VITE_API_URL + "/auth";

export const authService = {
  login: async (username: string, password: string) => {
    const { data } = await axios.post(`${API_URL}/login`, {
      username,
      password,
    });
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
    const { data } = await axios.post(`${API_URL}/register`, {
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
