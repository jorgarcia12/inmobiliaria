import { useEffect } from "react";
import type { IPropiedad } from "../../../types/IPropiedad";
import { PropertyCard } from "./PropertyCard";

import { usePropiedadesStore } from "../../../store/propiedadesStore";
import type { FiltrosPropiedad } from "../../../types/FiltrosPropiedad";

interface ImagesSectionProps {
  filters?: FiltrosPropiedad;
}

export const ImagesSection = ({ filters }: ImagesSectionProps) => {
  const {
    propiedades,
    fetchPropiedades,
    fetchPropiedadesFiltradas,
    loading,
    error,
  } = usePropiedadesStore();

  useEffect(() => {
    if (filters) {
      fetchPropiedadesFiltradas(filters);
    } else {
      fetchPropiedades();
    }
  }, [filters]);

  const propiedadesHabilitadas = propiedades.filter((p) => p.publicada);

  return (
    <>
      {loading && <p>Cargando propiedades...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="d-flex flex-wrap gap-3">
        {propiedadesHabilitadas.length > 0
          ? propiedadesHabilitadas.map((prop: IPropiedad) => (
              <PropertyCard key={prop.id} propiedad={prop} />
            ))
          : !loading && <p>No hay propiedades cargadas</p>}
      </div>
    </>
  );
};
