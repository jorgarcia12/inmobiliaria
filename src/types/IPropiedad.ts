import type { Estado, TipoOperacion, TipoPropiedad } from "./enums";
import type { IDireccion } from "./IDireccion";
import type { IImagenPropiedad } from "./IImagenPropiedad";
import type { IUsuario } from "./IUsuario";

export interface IPropiedad {
  id?: number;
  titulo: string;
  descripcion: string;
  precio: number;
  supCubierta: number;
  supTotal: number;
  cantidadHabitaciones: number;
  cantidadAmbientes: number;
  cantidadBanos: number;
  estado: Estado;
  fechaCreacion?: Date;
  fechaModificacion?: Date;
  fechaPublicacion?: Date;
  tipoOperacion: TipoOperacion;
  agenteAsignado?: IUsuario;
  tipoPropiedad: TipoPropiedad;
  direccion: IDireccion;
  imagenes: IImagenPropiedad[];
  publicada: boolean;
  patio: boolean;
  cochera: boolean;
  permuta: boolean;
  servicios: boolean;
  amoblado: boolean;
  pileta: boolean;
  aptProf: boolean;
  barrioPriv: boolean;
}
