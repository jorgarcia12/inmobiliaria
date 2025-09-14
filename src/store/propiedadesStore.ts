import { create } from "zustand";
import type { IPropiedad } from "../types/IPropiedad";
import { propiedadService } from "../services/propiedadService";
import type { FiltrosPropiedad } from "../types/FiltrosPropiedad";

interface PropiedadesState {
  propiedades: IPropiedad[];
  loading: boolean;
  error: string | null;
  fetchPropiedades: () => Promise<void>;
  fetchPropiedadesFiltradas: (filters: FiltrosPropiedad) => Promise<void>;
  togglePublicada: (id: number, publicada: boolean) => Promise<void>;
  deleteProperty: (id: number) => Promise<void>;
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

  fetchPropiedadesFiltradas: async (filters: FiltrosPropiedad) => {
  set({ loading: true, error: null });
  try {
    const data = await propiedadService.getFilteredProperties(filters);
    set({ propiedades: data, loading: false });
  } catch (error) {
    set({ error: "Error al cargar propiedades filtradas", loading: false });
    console.log("Error al cargar las propiedades filtradas", error);
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

  deleteProperty: async (id: number) => {
    try {
      await propiedadService.deleteProperty(id);
      set({
        propiedades: get().propiedades.filter((p) => p.id !== id),
      });
    } catch (err) {
      set({ error: "Error al eliminar la propiedad" });
      console.log("Error al eliminar la propiedad", err);
    }
  },
}));
