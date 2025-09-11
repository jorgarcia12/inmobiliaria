import axios from "axios";
import type { IPropiedad } from "../types/IPropiedad";

const API_URL = "http://localhost:8080/propiedad";

export const propiedadService = {
  getAllProperties: async (): Promise<IPropiedad[]> => {
    try {
      const res = await axios.get<IPropiedad[]>(API_URL);
      return res.data;
    } catch (error) {
      console.error("Error al obtener propiedades:", error);
      throw new Error("Error al obtener propiedades");
    }
  },

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
};
