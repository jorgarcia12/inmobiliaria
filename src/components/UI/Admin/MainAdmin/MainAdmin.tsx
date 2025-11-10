import type { IPropiedad } from "../../../../types/IPropiedad";
import { Fragment, useEffect, useState } from "react";
import { Button, Form, Spinner, Table } from "react-bootstrap";
import { ModalDetallePropiedad } from "../ModalDetallePropiedad/ModalDetallePropiedad";
import { usePropiedadesStore } from "../../../../store/propiedadesStore";

export const MainAdmin = () => {
  const { propiedades, loading, error, fetchPropiedades, togglePublicada } =
    usePropiedadesStore();
  const [propiedadSeleccionada, setPropiedadSeleccionada] =
    useState<IPropiedad | null>(null);
  useEffect(() => {
    fetchPropiedades();
  }, []);
  if (loading) return <Spinner animation="grow" />;
  if (error) return <div>{error}</div>;

  return (
    <div
      style={{
        padding: "20px",
        width: "100%",
        margin: "0 auto",
        fontFamily: " Arial, sans-serif",
      }}
    >
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
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {propiedades.map((prop) => (
            <Fragment key={prop.id}>
              <tr>
                <td>#{prop.id}</td>
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
                    <span>Sin Imagenes</span>
                  )}
                </td>
                <td>{prop.tipoPropiedad || "-"}</td>
                <td>{prop.tipoOperacion || "-"}</td>
                <td>
                  {" "}
                  {prop.precio != null
                    ? `$${prop.precio.toLocaleString()}`
                    : "No disponible"}
                </td>
                <td>{prop.direccion?.ciudad || "-"}</td>
                <td>{prop.cantidadHabitaciones || 0}</td>
                <td>
                  <Button
                    variant="dark"
                    size="sm"
                    onClick={() =>
                      setPropiedadSeleccionada(
                        propiedadSeleccionada?.id === prop.id ? null : prop
                      )
                    }
                  >
                    {propiedadSeleccionada?.id === prop.id
                      ? "Cerrar detalle"
                      : "Ver detalle"}
                  </Button>
                  <Form.Check
                    type="checkbox"
                    label="Publicada"
                    checked={prop.publicada}
                    onChange={(e) =>
                      togglePublicada(prop.id!, e.target.checked)
                    }
                  />
                </td>
              </tr>
              {propiedadSeleccionada?.id === prop.id &&
                propiedadSeleccionada && (
                  <tr>
                    <td colSpan={8}>
                      <ModalDetallePropiedad
                        propiedad={propiedadSeleccionada}
                        onClose={() => setPropiedadSeleccionada(null)}
                      />
                    </td>
                  </tr>
                )}
            </Fragment>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
