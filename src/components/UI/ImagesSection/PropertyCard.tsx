import type { FC } from "react";
import type { IPropiedad } from "../../../types/IPropiedad";
import { BedDouble, Bath, Ruler } from "lucide-react";
import styles from "./PropertyCard.module.css";

interface PropertyCardProps {
  propiedad: IPropiedad;
  onOpenModal: () => void;
}

export const PropertyCard: FC<PropertyCardProps> = ({ propiedad, onOpenModal }) => {
  return (
   <div className={styles.cardContainer}>
      <div className={styles.imgContainer}>
        <img
          className={styles.imgProperty}
          src={propiedad.imagenes?.[0]?.url || "Sin Imagenes"}
          alt={propiedad.titulo}
        />
      </div>

      <div className={styles.detailContainer}>
        <h2>{propiedad.titulo}</h2>
        <p className="line-clamp-3">{propiedad.descripcion}</p>
        <div className={styles.propertyDetails}>
          <span><BedDouble size={16} /> {propiedad.cantidadHabitaciones} hab.</span>
          <span><Bath size={16} /> {propiedad.cantidadBanos} baños</span>
          <span><Ruler size={16} /> {propiedad.supTotal} m²</span>
        </div>

        <div className={styles.buttonContainer}>
          <button className={styles.buttonMore} onClick={onOpenModal}>
            Ver más
          </button>
        </div>
      </div>
    </div>
  );
};
