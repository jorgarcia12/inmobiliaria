import axios from "axios";
import type { IPropiedad } from "../types/IPropiedad";

const API_URL = "http://localhost:8080/propiedad";

export const propiedadService = {
  //OBTENER TODAS LAS PROPIEDADES
  getAllProperties: async (): Promise<IPropiedad[]> => {
    try {
      const res = await axios.get<IPropiedad[]>(API_URL);
      return res.data;
    } catch (error) {
      console.error("Error al obtener propiedades:", error);
      throw new Error("Error al obtener propiedades");
    }
  },

  //OBTENER UNA PROPIEDAD POR ID
  getPropertyById: async (id: number): Promise<IPropiedad> => {
    try {
      const { data } = await axios.get<IPropiedad>(`${API_URL}/${id}`);
      return data;
    } catch (error) {
      console.log("Error al obtener la propiedad de id:" + id, error);
      throw new Error("Error al obtener la propiedad de id:" + id);
    }
  },

  //CREAR UNA PROPIEDAD
  create: async (propiedad: IPropiedad): Promise<IPropiedad> => {
    try {
      const res = await axios.post<IPropiedad>(API_URL, propiedad, {
        headers: { "Content-Type": "application/json" },
      });
      return res.data;
    } catch (error) {
      console.error("Error al crear propiedad:", error);
      throw new Error("Error al crear propiedad");
    }
  },

  //ACTUALIZAR UNA PROPIEDAD
  updateProperty: async (
    id: number,
    propiedad: IPropiedad
  ): Promise<IPropiedad> => {
    try {
      const { data } = await axios.put<IPropiedad>(
        `${API_URL}/${id}`,
        propiedad
      );
      return data;
    } catch (error) {
      console.log("Error al actualizar la propiedad", error);
      throw new Error("Error al actualizar la propiedad");
    }
  },

  //ELIMINAR UNA PROPIEDAD
  deleteProperty: async (id: number): Promise<void> => {
    try {
      await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
      console.log("Error al eliminar la propiedad", error);
      throw new Error("Error al eliminar la propiedad");
    }
  },
};
