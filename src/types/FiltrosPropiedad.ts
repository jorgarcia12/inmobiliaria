export interface FiltrosPropiedad {
  search?: string;
  tipo_propiedad?: string;
  tipo_operacion?: string;
  habitaciones?: string | number;
  ambientes?: string | number;
  banos?: string | number;
  barriopriv?: boolean;
  patio?: boolean;
  cochera?: boolean;
  permuta?: boolean;
  servicios?: boolean;
  pileta?: boolean;
  amoblado?: boolean;
  apt_prof?: boolean;
  precio_min?: number;
  precio_max?: number;
  [key: string]: string | number | boolean | undefined; // permite filtros adicionales
}
