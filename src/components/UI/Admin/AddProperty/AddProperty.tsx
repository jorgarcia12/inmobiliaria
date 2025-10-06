import { toast } from "react-toastify";
import { propiedadService } from "../../../../services/propiedadService";
import type { IPropiedad } from "../../../../types/IPropiedad";
import { FormAddProperty } from "../FormAddProperty/FormAddProperty";

import styles from "./AddProperty.module.css";

export const AddProperty = () => {
  const handleCreateProperty = async (propiedad: IPropiedad) => {
    try {
      const nuevaProp = await propiedadService.create(propiedad);
      console.log("Propiedad creada: ", nuevaProp);
      toast.success("Propiedad creada");
    } catch (error) {
      console.log("error al crear la propiedad: ", error);
      toast.error("Error al crear la propiedad");
    }
  };

  return (
    <div className={styles.addPropertyContainer}>
      <FormAddProperty onSubmit={handleCreateProperty} />
    </div>
  );
};
