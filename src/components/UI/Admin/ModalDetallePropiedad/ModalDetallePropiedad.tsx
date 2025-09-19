import { type FC } from "react";
import type { IPropiedad } from "../../../../types/IPropiedad";
import styles from "./ModalDetallePropiedad.module.css";
import { Button } from "react-bootstrap";
import { CarruselYDescripicon } from "./CarruselYDescripicon";
import { useNavigate } from "react-router-dom";
import { usePropiedadesStore } from "../../../../store/propiedadesStore";
import { TablaDetalllePropiedad } from "./TablaDetalllePropiedad";
import { confirmToast } from "../../../../utils/confirmToast";

interface ModalDetallePropiedadProps {
  propiedad: IPropiedad;
  onClose: () => void;
}
export const ModalDetallePropiedad: FC<ModalDetallePropiedadProps> = ({
  propiedad,
  onClose,
}) => {
  const navigate = useNavigate();

  const { deleteProperty } = usePropiedadesStore();

  const handleEditar = () => {
    onClose();
    navigate(`/admin/editar/${propiedad.id}`);
  };

  const handleDelete = (id: number) => {
    confirmToast({
      message: "¿Estás seguro de que deseas eliminar esta propiedad?",
      onConfirm: async () => {
        await deleteProperty(id);
      },
    });
  };
  return (
    <div className={styles.detalleContainer}>
      <h4>
        <b># ID:</b> {propiedad.id} | {propiedad.titulo}
      </h4>

      {/* Contenedor carrusel + descripción + tabla */}
      <div className={styles.infoContainer}>
        <CarruselYDescripicon propiedad={propiedad} />
        <TablaDetalllePropiedad propiedad={propiedad} />
      </div>

      {/* Botones */}
      <div className={styles.buttonsContainer}>
        <Button
          className={styles.buttonClose}
          variant="dark"
          size="sm"
          onClick={onClose}
        >
          Cerrar
        </Button>
        <Button className={styles.buttonEdit} size="sm" onClick={handleEditar}>
          Editar
        </Button>
        <Button
          className={styles.buttonDelete}
          size="sm"
          onClick={() => handleDelete(propiedad.id!)}
        >
          Eliminar
        </Button>
      </div>
    </div>
  );
};
