import { propiedadService } from "../../../../services/propiedadService";
import type { IPropiedad } from "../../../../types/IPropiedad";
import { FormAddProperty } from "../FormAddProperty/FormAddProperty";
import { SideBarProperties } from "../SideBarProperties/SideBarProperties";
import styles from "./AddProperty.module.css";

export const AddProperty = () => {
  const handleCreateProperty = async (propiedad: IPropiedad) => {
    try {
      const nuevaProp = await propiedadService.create(propiedad);
      console.log("Propiedad creada: ", nuevaProp);
      alert("Propiedad creada")
    } catch (error) {
      console.log("error al crear la propiedad: ",error)
      alert("Error al crear la propiedad")
    }
  };

  return (
    <div className={styles.addPropertyContainer}>
      <FormAddProperty onSubmit={handleCreateProperty}
      />
      <SideBarProperties />
    </div>
  );
};
