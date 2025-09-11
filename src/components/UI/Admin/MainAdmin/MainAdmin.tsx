import styles from "./MainAdmin.module.css";
import type { IPropiedad } from "../../../../types/IPropiedad";
import { useEffect, useState } from "react";
import { propiedadService } from "../../../../services/propiedadService";
import { Button, Spinner, Table } from "react-bootstrap";

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
              <td>{prop.direccion?.ciudad || "-"}</td>
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

      {/* mostrar un modal o sección con la propiedad seleccionada */}
      {propiedadSeleccionada && (
        <div className={styles.detalleContainer}>
          <h4>{propiedadSeleccionada.titulo}</h4>
          <p>{propiedadSeleccionada.descripcion}</p>
          <p>
            {propiedadSeleccionada.cantidadHabitaciones} hab |{" "}
            {propiedadSeleccionada.cantidadBanos} baños
          </p>
          {propiedadSeleccionada.imagenes.map((img) => (
            <img
              key={img.id}
              src={img.url}
              alt="detalle"
              style={{ width: "100px", marginRight: "5px" }}
            />
          ))}
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setPropiedadSeleccionada(null)}
          >
            Cerrar
          </Button>
        </div>
      )}
    </div>
  );
};
