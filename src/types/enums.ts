export type Estado = "DISPONIBLE" | "RESERVADO" | "VENDIDO" | "ALQUILADO";

export type TipoOperacion = "VENTA" | "ALQUILER" | "AMBOS";

export type TipoPropiedad =
  | "CASA"
  | "DEPARTAMENTO"
  | "LOCAL_COMERCIAL"
  | "OFICINA"
  | "TERRENO"
  | "GALPON"
  | "DUPLEX";

export type Rol = "ADMIN" | "AGENTE" | "USUARIO";

export type Divisa = "USD" | "ARS";