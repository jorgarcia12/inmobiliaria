import { useEffect, useState } from "react";
import type { IPropiedad } from "../../../types/IPropiedad";
import { PropertyCard } from "./PropertyCard";
import { PropertyInfo } from "../PropertyInfo/PropertyInfo";
import { usePropiedadesStore } from "../../../store/propiedadesStore";
export const ImagesSection = () => {
  const { propiedades, fetchPropiedades, loading, error } =
    usePropiedadesStore();
  const [propiedadSeleccionada, setPropiedadSeleccionada] =
    useState<IPropiedad | null>(null);

  useEffect(() => {
    fetchPropiedades();
  }, []);

  const propiedadesHabilitadas = propiedades.filter((p) => p.publicada);

  return (
    <>
      {loading && <p>Cargando propiedades...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="d-flex flex-wrap gap-3">
        {propiedadesHabilitadas.length > 0
          ? propiedadesHabilitadas.map((prop: IPropiedad) => (
              <PropertyCard
                key={prop.id}
                propiedad={prop}
                onOpenModal={() => setPropiedadSeleccionada(prop)}
              />
            ))
          : !loading && <p>No hay propiedades cargadas</p>}
      </div>

      {propiedadSeleccionada && (
        <PropertyInfo
          propiedad={propiedadSeleccionada}
          show={!!propiedadSeleccionada}
          onClose={() => setPropiedadSeleccionada(null)}
        />
      )}
    </>
  );
};
