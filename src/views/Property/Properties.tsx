import { useEffect } from "react";
import { FilterColumn } from "../../components/UI/FilterColumn/FilterColumn";
import { ImagesSection } from "../../components/UI/ImagesSection/ImagesSection";
import styles from "./Properties.module.css";
import { usePropiedadesStore } from "../../store/propiedadesStore";
import { useSearchParams } from "react-router-dom";

export const Properties = () => {
  const {
    fetchPropiedades,
    fetchPropiedadesFiltradas,
    aplicarTipoOperacionDesdeBanner,
  } = usePropiedadesStore();

  const [searchParams] = useSearchParams();
  const tipoOperacionParam = searchParams.get("tipo_operacion");

  /** carga inicial */
  useEffect(() => {
    if (tipoOperacionParam === "VENTA" || tipoOperacionParam === "ALQUILER") {
      aplicarTipoOperacionDesdeBanner(tipoOperacionParam);
    } else {
      fetchPropiedades();
    }
  }, [tipoOperacionParam]);

  return (
    <div className={styles.propertiesContainer}>
      <div className={styles.contentContainer}>
        <div className={styles.filterColumn}>
          <FilterColumn onApply={fetchPropiedadesFiltradas} />
        </div>

        <div className={styles.propertiesCards}>
          <ImagesSection />
        </div>
      </div>
    </div>
  );
};
