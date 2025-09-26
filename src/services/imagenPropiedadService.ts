import api from "../interceptors/api.interceptor";

export const imagenPropiedadService = {
  delete: async (id: number): Promise<void> => {
    await api.delete(`/imagen_propiedad/${id}`);
    console.log(`Imagen con id ${id} eliminada de la DB`);
  },
};
