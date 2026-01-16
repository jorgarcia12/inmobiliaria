import type { IPropiedad } from "./IPropiedad";

export interface IImagenPropiedad {
  id?: number;
  url: string;
  propId?: number
  propiedad?: IPropiedad;
}
