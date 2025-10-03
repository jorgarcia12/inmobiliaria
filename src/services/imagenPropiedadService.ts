import api from "../interceptors/api.interceptor";

export const imagenPropiedadService = {
  delete: async (id: number): Promise<void> => {
    await api.delete(`/imagen_propiedad/${id}`);
    console.log(`Imagen con id ${id} eliminada de la DB`);
  },

  create: async (
    propId: number,
    imgData: { url: string; public_id?: string }
  ): Promise<void> => {
    await api.post(`/imagen_propiedad`, {
      propId,
      url: imgData.url,
      publicId: imgData.public_id,
    });
    console.log("Imagen asociada propiedad ", propId, "creada");
  },
};
