import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { IPropiedad } from "../../../../types/IPropiedad";
import { propiedadService } from "../../../../services/propiedadService";
import { Alert, Spinner } from "react-bootstrap";
import { FormAddProperty } from "../FormAddProperty/FormAddProperty";

export const EditProperty = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [propiedad, setPropiedad] = useState<IPropiedad | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchProperty = async () => {
      try {
        const data = await propiedadService.getPropertyById(Number(id));
        setPropiedad(data);
      } catch (err) {
        console.error(err);
        setError("No se pudo cargar la propiedad.");
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  const handleUpdate = async (propiedadActualizada: IPropiedad) => {
    if (!id) return;
    try {
      const updated = await propiedadService.updateProperty(
        Number(id),
        propiedadActualizada
      );
      console.log("Respuesta del update:", updated);
      navigate("/admin");
    } catch (error) {
      alert("Error al actualizar la propiedad");
      console.error("Error al actualizar la propiedad", error);
    }
  };
  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div style={{ overflowX: "hidden" }}>
      <h2>Editar Propiedad</h2>
      {propiedad && (
        <FormAddProperty
          propiedadInicial={propiedad}
          modo="editar"
          onSubmit={handleUpdate}
        />
      )}
    </div>
  );
};
