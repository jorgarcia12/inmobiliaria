import { type FC } from "react";
import type { IPropiedad } from "../../../types/IPropiedad";
import { Ruler } from "lucide-react";
import styles from "./PropertyCard.module.css";
import HouseIcon from "@mui/icons-material/House";
import ApartmentIcon from "@mui/icons-material/Apartment";
import { tipoPropiedadDisplay } from "../../../types/tipoPropiedadDisplay";
import { useNavigate } from "react-router-dom";
import { createSlugs } from "../../../utils/createSlugs";
interface PropertyCardProps {
  propiedad: IPropiedad;
}

export const PropertyCard: FC<PropertyCardProps> = ({ propiedad }) => {
  const navigate = useNavigate();
  const slug = createSlugs(propiedad.titulo);
  const precioFormateado =
    propiedad.precio != null
      ? `$${propiedad.divisa === "USD" ? "USD" : "ARS"} ${new Intl.NumberFormat(
          "es-AR",
          {
            minimumFractionDigits: 0,
          }
        ).format(propiedad.precio)}`
      : "Consultar";

  const descripcion = propiedad.descripcion ?? "Sin descripción";

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
        <h2>{propiedad.titulo || " "}</h2>
        <h3>{precioFormateado}</h3>
        <p className={styles.propDescription}>
          {descripcion.length > 100
            ? descripcion.slice(0, 250) + "..."
            : descripcion}
        </p>

        <div className={styles.propertyDetails}>
          <span>
            <Ruler size={20} /> {propiedad.supTotal ?? 0} m² totales
          </span>
          <span>
            <HouseIcon fontSize="small" />{" "}
            {tipoPropiedadDisplay[propiedad.tipoPropiedad] || "-"}
          </span>
          <span>
            <ApartmentIcon fontSize="small" /> {propiedad.tipoOperacion || "-"}
          </span>
        </div>

        <div className={styles.buttonContainer}>
          <button
            className={styles.buttonMore}
            onClick={() => navigate(`/propiedades/${slug}-${propiedad.id}`)}
          >
            Ver más
          </button>
        </div>
      </div>
    </div>
  );
};
