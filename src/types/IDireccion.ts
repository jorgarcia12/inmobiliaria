export interface IDireccion {
  calle: string;
  numeracion: string;
  pisoDepartamento?: string;
  barrio?: string;
  ciudad: string;
  provincia: string;
  codPostal: string;
  pais?: string;
  lat?: number;
  lon?: number;
  placeId?: string;
  formattedAddress?: string;
}
