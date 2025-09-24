import api from "../interceptors/api.interceptor"; 

const API_URL = "/imagen_propiedad"; 

export const imagenPropiedadService = {
  delete: async (id: number): Promise<void> => {
    await api.delete(`${API_URL}/${id}`);
    console.log(`Imagen con id ${id} eliminada de la DB`);
  },
};
