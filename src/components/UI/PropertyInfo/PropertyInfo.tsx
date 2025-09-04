import { type FC } from "react";
import type { IPropiedad } from "../../../types/IPropiedad";
import { Modal, Carousel, Button } from "react-bootstrap";
import { BedDouble, Bath, Ruler } from "lucide-react";

import styles from "./PropertyInfo.module.css"



interface PropertyInfoProps {
  propiedad: IPropiedad;
  show: boolean;
  onClose: () => void;
}

export const PropertyInfo: FC<PropertyInfoProps> = ({ propiedad, show, onClose }) => {
  return (
    <Modal show={show} onHide={onClose} size="lg" centered>
      {/* Fila 1: Header */}
      <Modal.Header closeButton>
        <Modal.Title>{propiedad.titulo}</Modal.Title>
      </Modal.Header>

      {/* Fila 2: Carrusel + detalles */}
      <Modal.Body>
        <Carousel>
          {propiedad.imagenes.map((img) => (
            <Carousel.Item key={img.id}>
              <img
                className="d-block w-100"
                src={img.url}
                alt={propiedad.titulo}
                style={{ height: "400px", objectFit: "cover", borderRadius: "10px" }}
              />
            </Carousel.Item>
          ))}
        </Carousel>

        <div className="mt-3">
          <h5 className="text-danger">${propiedad.precio}</h5>
          <div className="d-flex gap-3 my-2">
            <span><BedDouble size={20} /> {propiedad.cantidadHabitaciones} hab.</span>
            <span><Bath size={20} /> {propiedad.cantidadBanos} baños</span>
            <span><Ruler size={20} /> {propiedad.supTotal} m²</span>
          </div>
          <p>{propiedad.descripcion}</p>
        </div>
      </Modal.Body>

      {/* Fila 3: Footer */}
      <Modal.Footer>
        <Button variant="dark" className={styles.propertyInfoButton} onClick={onClose}>
          Consultar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
