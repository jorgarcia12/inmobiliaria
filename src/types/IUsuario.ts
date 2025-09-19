import type { Rol } from "./enums";

export interface IUsuario {
  id?: number;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  rol: Rol;
  username: string;
  password: string;
  fechaNacimiento: Date;
  fechaAlta: Date;
}
