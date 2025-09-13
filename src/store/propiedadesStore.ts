import { create } from "zustand";
import type { IPropiedad } from "../types/IPropiedad";
import { propiedadService } from "../services/propiedadService";

interface PropiedadesState {
  propiedades: IPropiedad[];
  loading: boolean;
  error: string | null;
  fetchPropiedades: () => Promise<void>;
  togglePublicada: (id: number, publicada: boolean) => Promise<void>;
}

export const usePropiedadesStore = create<PropiedadesState>((set, get) => ({
  propiedades: [],
  loading: false,
  error: null,
  fetchPropiedades: async () => {
    set({ loading: true, error: null });
    try {
      const data = await propiedadService.getAllProperties();
      set({ propiedades: data, loading: false });
    } catch (err) {
      set({ error: "Error al cargar propiedades", loading: false });
      console.log("Error al cargar propiedades", err);
    }
  },
  togglePublicada: async (id: number, publicada: boolean) => {
    try {
      const actualizada = await propiedadService.togglePublicada(id, publicada);
      set({
        propiedades: get().propiedades.map((p) =>
          p.id === id ? actualizada : p
        ),
      });
    } catch (err) {
      set({ error: "Error al actualizar publicada" });
      console.log("Error al actualizar publicada", err);
    }
  },
}));
