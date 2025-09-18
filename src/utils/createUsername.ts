
export const generarUsername = (nombre: string, apellido: string): string => {
  const parteApellido = apellido.slice(0, 4).toLowerCase();
  const parteNombre = nombre.toLowerCase().replace(/\s+/g, "");
  return `${parteNombre}${parteApellido}`;
};
