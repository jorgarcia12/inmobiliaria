import type { FC } from "react";
import type { IPropiedad } from "../../../../types/IPropiedad";
import { Carousel } from "react-bootstrap";
import styles from "./ModalDetallePropiedad.module.css"
interface CarruselYDescripiconProps {
  propiedad: IPropiedad;
}
export const CarruselYDescripicon:FC<CarruselYDescripiconProps> = ({propiedad}) => {
  return (
     <div className={styles.imgYDescContainer}>
      {/* Carrusel */}
      {propiedad.imagenes.length > 0 && (
        <div className={styles.carouselContainer}>
          <Carousel>
            {propiedad.imagenes.map((img) => (
              <Carousel.Item key={img.id}>
                <img
                  className={styles.carouselImg}
                  src={img.url}
                  alt="detalle"
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      )}

      {/* Descripción */}
      <div className={styles.descripcionContainer}>
        <p>{propiedad.descripcion}</p>
      </div>
    </div>
  );
};
