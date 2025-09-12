import { type FC } from "react";
import type { IPropiedad } from "../../../../types/IPropiedad";
import styles from "./ModalDetallePropiedad.module.css";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

interface ModalDetallePropiedadProps {
  propiedad: IPropiedad;
  onClose: () => void;
}
export const ModalDetallePropiedad: FC<ModalDetallePropiedadProps> = ({
  propiedad,
  onClose,
}) => {
  const navigate = useNavigate();
  const handleEditar = () => {
    onClose();
    navigate(`/admin/editar/${propiedad.id}`);
  };
  return (
    <div className={styles.detalleContainer}>
      <h4>
        <b> # ID:</b> {propiedad.id} | {propiedad.titulo}
      </h4>

      <div className={styles.dataContainer}>
        <div className={styles.propInfo}>
          <h6>Precio: ${propiedad.precio.toLocaleString()}</h6>
          <h6>Superficie Total: {propiedad.supTotal} </h6>
          <h6>Superficie Cubierta: {propiedad.supCubierta} </h6>
          <h6>Habitaciones: {propiedad.cantidadHabitaciones} </h6>
          <h6>Baños: {propiedad.cantidadBanos} </h6>
          <h6>Estado: {propiedad.estado} </h6>
          <h6>
            Fecha Publicación:{" "}
            {propiedad.fechaPublicacion
              ? new Date(propiedad.fechaPublicacion).toLocaleDateString("es-AR")
              : "No registrada"}
          </h6>

          <h6>
            Fecha Modificación:{" "}
            {propiedad.fechaModificacion
              ? new Date(propiedad.fechaModificacion).toLocaleString("es-AR")
              : "No registrada"}
          </h6>
          <h6>Tipo de Operacion: {propiedad.tipoOperacion}</h6>
          <h6>
            Agente Asignado:{propiedad.agenteAsignado?.nombre}{" "}
            {propiedad.agenteAsignado?.apellido}
          </h6>
          <h6>Tipo de Propiedad:{propiedad.tipoPropiedad}</h6>
          <h6>
            {" "}
            Direccion: {propiedad.direccion.calle}{" "}
            {propiedad.direccion.numeracion}, {propiedad.direccion.ciudad},{" "}
            {propiedad.direccion.provincia}
          </h6>
        </div>

        <div className={styles.imgYDescContainer}>
          <div className={styles.imgsContainer}>
            {propiedad.imagenes.map((img) => (
              <img
                key={img.id}
                src={img.url}
                alt="detalle"
                className={styles.imgDetalleAdmin}
              />
            ))}
          </div>
          <div className={styles.descripcionContainer}>
            <p>{propiedad.descripcion}</p>
          </div>
        </div>
      </div>
      <div className={styles.buttonsContainer}>
        <Button variant="secondary" size="sm" onClick={onClose}>
          Cerrar
        </Button>
        <Button variant="secondary" size="sm" onClick={handleEditar}>
          Editar
        </Button>
      </div>
    </div>
  );
};
