export interface FiltrosPropiedad {
  search?: string;
  titulo?: string;
  precioMin?: number;
  precioMax?: number;
  tipoOperacion?: string;
  tipoPropiedad?: string;
  estado?: string;
  habitaciones?: number;
  cantidadAmbientes?: number;
  cantidadBanos?: number;
  publicada?: boolean;
  patio?: boolean;
  cochera?: boolean;
  permuta?: boolean;
  servicios?: boolean;
  amoblado?: boolean;
  pileta?: boolean;
  aptProf?: boolean;
  barrioPriv?:boolean
  [key: string]: string | number | boolean | undefined;
}
