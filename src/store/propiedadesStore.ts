import { create } from "zustand";
import type { IPropiedad } from "../types/IPropiedad";
import { propiedadService } from "../services/propiedadService";
import type { FiltrosPropiedad } from "../types/FiltrosPropiedad";
import { cleanFilters } from "../utils/cleanFilters";
import type { TipoOperacion } from "../types/enums";

interface PropiedadesState {
  propiedades: IPropiedad[];
  loading: boolean;
  filtros: FiltrosPropiedad;
  error: string | null;
  fetchPropiedades: () => Promise<void>;
  fetchPropiedadesFiltradas: (filters: FiltrosPropiedad) => Promise<void>;
  aplicarTipoOperacionDesdeBanner: (
    tipoOperacion: TipoOperacion
  ) => Promise<void>;
  togglePublicada: (id: number, publicada: boolean) => Promise<void>;
  deleteProperty: (id: number) => Promise<void>;
}

export const usePropiedadesStore = create<PropiedadesState>((set, get) => ({
  propiedades: [],
  filtros: {
    search: "",
    titulo: "",
    precioMin: 0,
    precioMax: 1000000,
    tipoOperacion: "",
    tipoPropiedad: "",
    estado: "",
  },
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
    set({ loading: true, error: null, filtros: filters });

    try {
      const filtrosLimpios = cleanFilters(filters);
      const data = await propiedadService.filterProperties(filtrosLimpios);

      set({ propiedades: data, loading: false });
    } catch (error) {
      set({
        error: "Error al cargar propiedades filtradas",
        loading: false,
      });
      console.log(error);
    }
  },

  aplicarTipoOperacionDesdeBanner: async (tipoOperacion: TipoOperacion) => {
    const filtrosActuales = get().filtros;

    const nuevosFiltros: FiltrosPropiedad = {
      ...filtrosActuales,
      tipoOperacion,
    };

    set({ loading: true, filtros: nuevosFiltros });

    try {
      const filtrosLimpios = cleanFilters(nuevosFiltros);
      const data = await propiedadService.filterProperties(filtrosLimpios);

      set({ propiedades: data, loading: false });
    } catch (error) {
      set({
        error: "Error al cargar propiedades por tipo de operacion",
        loading: false,
      });
      console.error(error);
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
