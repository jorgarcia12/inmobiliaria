import { Table } from "react-bootstrap";
import type { IPropiedad } from "../../../../types/IPropiedad";
import styles from "./ModalDetallePropiedad.module.css";
import type { FC } from "react";
import { boolToString } from "../../../../utils/boolToString";

interface TablaDetallePropiedadProps {
  propiedad: IPropiedad;
}

export const TablaDetalllePropiedad: FC<TablaDetallePropiedadProps> = ({
  propiedad,
}) => {
  return (
    <Table bordered className={styles.tableDetalle}>
      <tbody>
        {/* Información principal */}
        <tr>
          <td>
            <strong>Precio</strong>
          </td>
          <td>${propiedad.precio.toLocaleString()}</td>
        </tr>
        <tr>
          <td>
            <strong>Divisa</strong>
          </td>
          <td>{propiedad.divisa}</td>
        </tr>
        <tr>
          <td>
            <strong>Superficie Total</strong>
          </td>
          <td>{propiedad.supTotal}</td>
        </tr>
        <tr>
          <td>
            <strong>Superficie Cubierta</strong>
          </td>
          <td>{propiedad.supCubierta}</td>
        </tr>
        <tr>
          <td>
            <strong>Habitaciones</strong>
          </td>
          <td>{propiedad.cantidadHabitaciones}</td>
        </tr>
        <tr>
          <td>
            <strong>Baños</strong>
          </td>
          <td>{propiedad.cantidadBanos}</td>
        </tr>
        <tr>
          <td>
            <strong>Estado</strong>
          </td>
          <td>{propiedad.estado}</td>
        </tr>
        <tr>
          <td>
            <strong>Tipo de Operación</strong>
          </td>
          <td>{propiedad.tipoOperacion}</td>
        </tr>
        <tr>
          <td>
            <strong>Tipo de Propiedad</strong>
          </td>
          <td>{propiedad.tipoPropiedad}</td>
        </tr>
        <tr>
          <td>
            <strong>Dirección</strong>
          </td>
          <td>
            {propiedad.direccion.calle} {propiedad.direccion.numeracion},{" "}
            {propiedad.direccion.ciudad}, {propiedad.direccion.provincia}
          </td>
        </tr>

        {/* Extras booleanos */}
        <tr>
          <td>
            <strong>Patio</strong>
          </td>
          <td>{boolToString(propiedad.patio)}</td>
        </tr>
        <tr>
          <td>
            <strong>Cochera</strong>
          </td>
          <td>{boolToString(propiedad.cochera)}</td>
        </tr>
        <tr>
          <td>
            <strong>Permuta</strong>
          </td>
          <td>{boolToString(propiedad.permuta)}</td>
        </tr>
        <tr>
          <td>
            <strong>Servicios</strong>
          </td>
          <td>{boolToString(propiedad.servicios)}</td>
        </tr>
        <tr>
          <td>
            <strong>Amoblado</strong>
          </td>
          <td>{boolToString(propiedad.amoblado)}</td>
        </tr>
        <tr>
          <td>
            <strong>Pileta</strong>
          </td>
          <td>{boolToString(propiedad.pileta)}</td>
        </tr>
        <tr>
          <td>
            <strong>Apto Profesional</strong>
          </td>
          <td>{boolToString(propiedad.aptProf)}</td>
        </tr>
        <tr>
          <td>
            <strong>Barrio Privado</strong>
          </td>
          <td>{boolToString(propiedad.barrioPriv)}</td>
        </tr>

        {/* Fechas */}
        <tr>
          <td>
            <strong>Fecha Publicación</strong>
          </td>
          <td>
            {propiedad.fechaPublicacion
              ? new Date(propiedad.fechaPublicacion).toLocaleDateString("es-AR")
              : "No registrada"}
          </td>
        </tr>
        <tr>
          <td>
            <strong>Fecha Modificación</strong>
          </td>
          <td>
            {propiedad.fechaModificacion
              ? new Date(propiedad.fechaModificacion).toLocaleString("es-AR")
              : "No registrada"}
          </td>
        </tr>
      </tbody>
    </Table>
  );
};
