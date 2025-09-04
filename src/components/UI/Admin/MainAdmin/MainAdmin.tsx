import { Button, Table } from "react-bootstrap";
import styles from "./MainAdmin.module.css";
import type { IPropiedad } from "../../../../types/IPropiedad";
import { useState } from "react";

const propiedadesEjemplo: IPropiedad[] = [
  {
    id: 1,
    titulo: "Casa moderna en el centro",
    descripcion:
      "Hermosa casa ubicada en pleno centro de la ciudad, con patio amplio y detalles de categoría.",
    precio: 150000,
    supCubierta: 120,
    supTotal: 120,
    cantidadHabitaciones: 3,
    cantidadAmbientes: 2,
    cantidadBanos: 2,
    estado: "DISPONIBLE",
    tipoOperacion: "VENTA",
    tipoPropiedad: "CASA",
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
    supCubierta: 120,
    supTotal: 200,
    cantidadHabitaciones: 3,
    cantidadAmbientes: 2,
    cantidadBanos: 2,
    estado: "DISPONIBLE",
    tipoOperacion: "VENTA",
    tipoPropiedad: "CASA",
    imagenes: [
      {
        id: 201,
        url: "https://images.unsplash.com/photo-1570129477492-45c003edd2be",
        propId: 2,
      },
    ],
  },
];

export const MainAdmin = () => {
  const [propiedadSeleccionada, setPropiedadSeleccionada] =
    useState<IPropiedad | null>(null);

  return (
    <div className={styles.container}>
      <h2>Listado de Propiedades</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Imagen</th>
            <th>Tipo Propiedad</th>
            <th>Tipo Operación</th>
            <th>Precio</th>
            <th>Ciudad</th>
            <th>Dormitorios</th>
          </tr>
        </thead>
        <tbody>
          {propiedadesEjemplo.map((prop) => (
            <tr key={prop.id}>
              <td>{prop.id}</td>
              <td>
                {prop.imagenes && prop.imagenes.length > 0 ? (
                  <img
                    src={prop.imagenes[0].url}
                    alt="Imagen propiedad"
                    style={{
                      width: "80px",
                      height: "auto",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <span>Sin imagen</span>
                )}
              </td>
              <td>{prop.tipoPropiedad}</td>
              <td>{prop.tipoOperacion}</td>
              <td>${prop.precio.toLocaleString()}</td>
              <td>{prop.direccion?.ciudad}</td>
              <td>{prop.cantidadHabitaciones}</td>
              <td>
                <Button
                  variant="dark"
                  size="sm"
                  onClick={() => setPropiedadSeleccionada(prop)}
                >
                  Ver detalle
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {/* Mostrar la ficha tecnica completa de cada una de las propiedades */}
    </div>
  );
};
