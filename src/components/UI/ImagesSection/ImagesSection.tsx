import { useEffect, useState } from "react";
import type { IPropiedad } from "../../../types/IPropiedad";
import { PropertyCard } from "./PropertyCard";
import { PropertyInfo } from "../PropertyInfo/PropertyInfo";
import { propiedadService } from "../../../services/propiedadService"; // 👈 importa el servicio

export const ImagesSection = () => {
  const [propiedadSeleccionada, setPropiedadSeleccionada] =
    useState<IPropiedad | null>(null);
  const [propiedades, setPropiedades] = useState<IPropiedad[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await propiedadService.getAllProperties();
        setPropiedades(data);
      } catch (err) {
        console.error("Error al obtener propiedades:", err);
        setError("No se pudieron cargar las propiedades");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {loading && <p>Cargando propiedades...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="d-flex flex-wrap gap-3">
        {propiedades.length > 0 ? (
          propiedades.map((prop: IPropiedad) => (
            <PropertyCard
              key={prop.id}
              propiedad={prop}
              onOpenModal={() => setPropiedadSeleccionada(prop)}
            />
          ))
        ) : (
          !loading && <p>No hay propiedades cargadas</p>
        )}
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
