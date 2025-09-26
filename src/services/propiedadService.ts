import api from "../interceptors/api.interceptor";
import type { IPropiedad } from "../types/IPropiedad";
import type { FiltrosPropiedad } from "../types/FiltrosPropiedad";

export const propiedadService = {
  getAllProperties: async (): Promise<IPropiedad[]> => {
    const { data } = await api.get("/propiedad");
    return data;
  },

  filterProperties: async (filtros: FiltrosPropiedad): Promise<IPropiedad[]> => {
    const queryParams = new URLSearchParams();
    Object.entries(filtros).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        queryParams.append(key, value.toString());
      }
    });
    const { data } = await api.get(`/propiedad/filtros?${queryParams.toString()}`);
    return data;
  },

  getPropertyById: async (id: number): Promise<IPropiedad> => {
    const { data } = await api.get(`/propiedad/${id}`);
    return data;
  },

  create: async (propiedad: IPropiedad): Promise<IPropiedad> => {
    const { data } = await api.post("/propiedad", propiedad);
    return data;
  },

  updateProperty: async (id: number, propiedad: IPropiedad): Promise<IPropiedad> => {
    const { data } = await api.put(`/propiedad/${id}`, propiedad);
    return data;
  },

  deleteProperty: async (id: number): Promise<void> => {
    await api.delete(`/propiedad/${id}`);
  },

  togglePublicada: async (id: number, publicada: boolean): Promise<IPropiedad> => {
    const { data } = await api.patch(`/propiedad/${id}/publicar?publicada=${publicada}`);
    return data;
  },
};
