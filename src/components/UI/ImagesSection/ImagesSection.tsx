import { useState } from "react";
import type { IPropiedad } from "../../../types/IPropiedad";
import { PropertyCard } from "./PropertyCard";
import { PropertyInfo } from "../PropertyInfo/PropertyInfo";

const propiedadesEjemplo: IPropiedad[] = [
  {
    id: 1,
    titulo: "Casa moderna en el centro",
    descripcion:
      "Hermosa casa ubicada en pleno centro de la ciudad, con patio amplio y detalles de categoría.",
    precio: 150000,
    supCubierta:120,
    supTotal: 120,  
    cantidadHabitaciones: 3,
    cantidadAmbientes:2,
    cantidadBanos: 2,
    estado: "DISPONIBLE",
    tipoOperacion:"VENTA",
    tipoPropiedad:"CASA",
    imagenes: [
      {
        id: 101,
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
        propId: 1,
      },
      {
        id: 102,
        url: "https://images.unsplash.com/photo-1570129477492-45c003edd2be",
        propId: 1,
      },
    ],
  },
  {
    id: 2,
    titulo: "Departamento con vista al río",
    descripcion:
      "Departamento moderno, luminoso, con balcón y excelente ubicación frente al río.",
    precio: 50000,
    supCubierta:120,
    supTotal: 200,  
    cantidadHabitaciones: 3,
    cantidadAmbientes:2,
    cantidadBanos: 2,
    estado: "DISPONIBLE",
    tipoOperacion:"VENTA",
    tipoPropiedad:"CASA",
    imagenes: [
      {
        id: 201,
        url: "https://images.unsplash.com/photo-1570129477492-45c003edd2be",
        propId: 2,
      },
    ],
  },
];

export const ImagesSection = () => {
  const [propiedadSeleccionada, setPropiedadSeleccionada] = useState<IPropiedad | null>(null);

  

  return (
    <>
      <div className="d-flex flex-wrap gap-3">
        {propiedadesEjemplo.map((prop) => (
          <PropertyCard
            key={prop.id}
            propiedad={prop}
            onOpenModal={() => setPropiedadSeleccionada(prop)}
          />
        ))}
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