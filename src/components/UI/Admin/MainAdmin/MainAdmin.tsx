import styles from "./MainAdmin.module.css";
import type { IPropiedad } from "../../../../types/IPropiedad";
import { Fragment, useEffect, useState } from "react";
import { propiedadService } from "../../../../services/propiedadService";
import { Button, Spinner, Table } from "react-bootstrap";
import { ModalDetallePropiedad } from "../ModalDetallePropiedad/ModalDetallePropiedad";

export const MainAdmin = () => {
  const [propiedades, setPropiedades] = useState<IPropiedad[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [propiedadSeleccionada, setPropiedadSeleccionada] =
    useState<IPropiedad | null>(null);

  useEffect(() => {
    const fetchPropiedades = async () => {
      try {
        const data = await propiedadService.getAllProperties();
        setPropiedades(data);
      } catch (error) {
        console.log("error al traer las propiedades", error);
        setError("Error al cargar las propiedades");
      } finally {
        setLoading(false);
      }
    };
    fetchPropiedades();
  }, []);

  if (loading) return <Spinner animation="border" />;
  if (error) return <div>{error}</div>;
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
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {propiedades.map((prop) => (
            <Fragment key={prop.id}>
              <tr>
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
                    <span>Sin Imagenes</span>
                  )}
                </td>
                <td>{prop.tipoPropiedad}</td>
                <td>{prop.tipoOperacion}</td>
                <td>${prop.precio.toLocaleString()}</td>
                <td>{prop.direccion?.ciudad || "-"}</td>
                <td>{prop.cantidadHabitaciones}</td>
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
                </td>
              </tr>

              {/* Fila de detalle inline */}
              {propiedadSeleccionada?.id === prop.id && (
                <tr>
                  <td colSpan={8}>
                    <ModalDetallePropiedad
                      propiedad={propiedadSeleccionada!}
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
