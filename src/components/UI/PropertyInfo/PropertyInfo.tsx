import { type FC } from "react";
import type { IPropiedad } from "../../../types/IPropiedad";
import { Modal, Carousel, Button } from "react-bootstrap";
import { BedDouble, Bath, Ruler } from "lucide-react";

import styles from "./PropertyInfo.module.css";

interface PropertyInfoProps {
  propiedad: IPropiedad;
  show: boolean;
  onClose: () => void;
}

export const PropertyInfo: FC<PropertyInfoProps> = ({
  propiedad,
  show,
  onClose,
}) => {
  const precioFormateado = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(propiedad.precio);

  return (
    <Modal
      show={show}
      onHide={onClose}
      size="xl"
      centered
      dialogClassName={styles.propertyInfoDialog}
    >
      {/* Header */}
      <Modal.Header closeButton>
        <Modal.Title className={styles.propertyInfoTitle}>
          {propiedad.titulo}
        </Modal.Title>
      </Modal.Header>

      {/* Body */}
      <Modal.Body className={styles.propertyInfoBody}>
        <Carousel>
          {propiedad.imagenes.map((img) => (
            <Carousel.Item key={img.id}>
              <img
                className={styles.propertyInfoImg}
                src={img.url}
                alt={propiedad.titulo}
              />
            </Carousel.Item>
          ))}
        </Carousel>

        <div className={styles.propertyInfoContent}>
          <h5 className={styles.propertyInfoPrice}>{precioFormateado}</h5>
          <div className={styles.propertyInfoDetails}>
            <span>
              <BedDouble size={20} /> {propiedad.cantidadHabitaciones} hab.
            </span>
            <span>
              <Bath size={20} /> {propiedad.cantidadBanos} baños
            </span>
            <span>
              <Ruler size={20} /> {propiedad.supTotal} m²
            </span>
          </div>
          <p className={styles.propertyInfoDescription}>
            {propiedad.descripcion}
          </p>
          {/* MAPA */}
          {propiedad.direccion && (
            <div
              className={styles.mapContainer}
              onClick={() => {
                const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  `${propiedad.direccion.calle} ${propiedad.direccion.numeracion}, ${propiedad.direccion.ciudad}, ${propiedad.direccion.provincia}, ${propiedad.direccion.pais}`
                )}`;
                window.open(mapsUrl, "_blank");
              }}
            >
              <iframe
                title="Mapa de la propiedad"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(
                  `${propiedad.direccion.calle} ${propiedad.direccion.numeracion}, ${propiedad.direccion.ciudad}, ${propiedad.direccion.provincia}, ${propiedad.direccion.pais}`
                )}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
              ></iframe>
            </div>
          )}
        </div>
      </Modal.Body>

      {/* Footer */}
      <Modal.Footer className={styles.propertyInfoFooter}>
        <Button
          variant="dark"
          className={styles.propertyInfoButton}
          onClick={onClose}
        >
          Consultar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
