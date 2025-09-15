export interface IDireccion {
  id?: number;
  calle: string;
  numeracion: string;
  pisoDepartamento?: string;
  barrio?: string;
  ciudad: string;
  provincia: string;
  
  pais?: string;
  lat?: number;
  lon?: number;
  placeId?: string;
  formattedAddress?: string;
}
