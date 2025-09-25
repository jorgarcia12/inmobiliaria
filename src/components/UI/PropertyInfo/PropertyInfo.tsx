import { type FC } from "react";
import type { IPropiedad } from "../../../types/IPropiedad";
import { Modal, Carousel, Button } from "react-bootstrap";
import { BedDouble, Bath, Ruler, Home, Car, Check } from "lucide-react";
import HouseIcon from "@mui/icons-material/House";
import ApartmentIcon from "@mui/icons-material/Apartment";
import { WhatsApp } from "@mui/icons-material";
import PoolIcon from "@mui/icons-material/Pool";

import styles from "./PropertyInfo.module.css";

interface PropertyInfoProps {
  propiedad: IPropiedad;
  show: boolean;
  onClose: () => void;
}
const numeroTelefono = import.meta.env.VITE_CONTACT_PHONE;
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

  const handleConsulta = () => {
    const numero = numeroTelefono;
    const mensaje = `Hola, estoy interesado en la propiedad: ${propiedad.titulo} (precio: ${precioFormateado})`;
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
  };

  return (
    <Modal
      show={show}
      onHide={onClose}
      size="xl"
      centered
      dialogClassName={styles.propertyInfoDialog}
    >
      <Modal.Header closeButton>
        <Modal.Title className={styles.propertyInfoTitle}>
          {propiedad.titulo}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className={styles.propertyInfoBody}>
        {/* FILA SUPERIOR: IMÁGENES + MAPA */}
        <div className={styles.topRow}>
          <div className={styles.carouselContainer}>
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
          </div>

          {propiedad.direccion && (
            <div className={styles.mapContainer}>
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

        {/* FILA INFERIOR: DESCRIPCIÓN + DETALLES */}
        <div className={styles.bottomRow}>
          <h5 className={styles.propertyInfoPrice}>{precioFormateado}</h5>
          <div className={styles.propertyInfoDetails}>
            <span>
              <BedDouble size={20} /> {propiedad.cantidadHabitaciones} hab.
            </span>
            <span>
              <Bath size={20} /> {propiedad.cantidadBanos} baños
            </span>
            <span>
              <Ruler size={20} /> {propiedad.supTotal} m² totales
            </span>
            <span>
              <Ruler size={20} /> {propiedad.supCubierta} m² cubiertos
            </span>
            <span>
              <HouseIcon fontSize="small" /> {propiedad.tipoPropiedad}
            </span>
            <span>
              <ApartmentIcon fontSize="small" /> {propiedad.tipoOperacion}
            </span>
          </div>
          <div className={styles.propertyExtras}>
            {propiedad.cochera && (
              <span>
                <Car size={18} /> Cochera
              </span>
            )}

            {propiedad.patio && (
              <span>
                <Home size={18} /> Patio
              </span>
            )}
            {propiedad.amoblado && (
              <span>
                <Check size={18} /> Amoblado
              </span>
            )}
            {propiedad.permuta && (
              <span>
                <Check size={18} /> Permuta
              </span>
            )}
            {propiedad.aptProf && (
              <span>
                <Check size={18} /> Apto Prof.
              </span>
            )}
            {propiedad.barrioPriv && (
              <span>
                <Check size={18} /> Barrio Privado
              </span>
            )}
            {propiedad.servicios && (
              <span>
                <Check size={18} /> Servicios
              </span>
            )}
            {propiedad.pileta && (
              <span>
                <PoolIcon /> Pileta
              </span>
            )}
          </div>
          <p className={styles.propertyInfoDescription}>
            {propiedad.descripcion}
          </p>
        </div>
      </Modal.Body>

      <Modal.Footer className={styles.propertyInfoFooter}>
        <Button
          variant="dark"
          className={styles.propertyInfoButton}
          onClick={handleConsulta}
        >
          <span className={styles.buttonText}>Consultar</span>
          <WhatsApp className={styles.whatsappIcon} />
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
