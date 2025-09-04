import { useState, type ChangeEvent, type FC, type FormEvent } from "react";
import type { IPropiedad } from "../../../../types/IPropiedad";
import type {
  Estado,
  TipoOperacion,
  TipoPropiedad,
} from "../../../../types/enums";
import { Button, Col, Form, Row } from "react-bootstrap";
import styles from "./FormAddProperty.module.css"; // tu CSS

interface IFormAddPropertyProps {
  onSubmit: (propiedad: IPropiedad) => void;
}

export const FormAddProperty: FC<IFormAddPropertyProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<Partial<IPropiedad>>({
    titulo: "",
    descripcion: "",
    precio: 0,
    supCubierta: 0,
    supTotal: 0,
    cantidadHabitaciones: 0,
    cantidadAmbientes: 0,
    cantidadBanos: 0,
    estado: "DISPONIBLE" as Estado,
    tipoOperacion: "VENTA" as TipoOperacion,
    tipoPropiedad: "CASA" as TipoPropiedad,
    direccion: {
      calle: "",
      numeracion: "",
      ciudad: "",
      provincia: "",
      pais: "",
      codPostal: "",
    },
    imagenes: [],
  });

  // Cambios en inputs simples
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Cambios en dirección
  const handleDireccionChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      direccion: { ...prev.direccion, [name]: value },
    }));
  };

  // Cambios en imágenes (split por coma y trim)
  const handleImagenesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const urls = e.target.value
      .split(",")
      .map((url) => url.trim())
      .filter((url) => url !== "")
      .map((url, index) => ({
        id: Date.now() + index,
        url,
        propiedadId: 0,
      }));
    setFormData((prev) => ({ ...prev, imagenes: urls }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (formData.titulo && formData.descripcion) {
      // Enviar objeto completo
      onSubmit(formData as IPropiedad);
      // Reset parcial
      setFormData({
        titulo: "",
        descripcion: "",
        precio: 0,
        supCubierta: 0,
        supTotal: 0,
        cantidadHabitaciones: 0,
        cantidadAmbientes: 0,
        cantidadBanos: 0,
        estado: "DISPONIBLE" as Estado,
        tipoOperacion: "VENTA" as TipoOperacion,
        tipoPropiedad: "CASA" as TipoPropiedad,
        direccion: {
          calle: "",
          numeracion: "",
          ciudad: "",
          provincia: "",
          pais: "",
          codPostal: "",
        },
        imagenes: [],
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit} className={styles.formContainer}>
      <div className={styles.formColumn}>
        <Form.Group className="mb-3">
          <h5 className={styles.formSubtitle}>Informacion</h5>
          <Form.Label className={styles.label}>Título</Form.Label>
          <Form.Control
            className={styles.inputForm}
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className={styles.label}>Descripción</Form.Label>
          <Form.Control
            as="textarea"
            className={styles.inputForm}
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <h5 className={styles.formSubtitle}>Caracteristicas</h5>
        <Row className="mb-3">
          <Col>
            <Form.Group>
              <Form.Label className={styles.label}>Precio</Form.Label>
              <Form.Control
                type="number"
                className={styles.inputForm}
                name="precio"
                value={formData.precio}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label className={styles.label}>
                Sup. Cubierta (m²)
              </Form.Label>
              <Form.Control
                type="number"
                className={styles.inputForm}
                name="supCubierta"
                value={formData.supCubierta}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label className={styles.label}>Sup. Total (m²)</Form.Label>
              <Form.Control
                type="number"
                className={styles.inputForm}
                name="supTotal"
                value={formData.supTotal}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Group>
              <Form.Label className={styles.label}>Habitaciones</Form.Label>
              <Form.Control
                type="number"
                className={styles.inputForm}
                name="cantidadHabitaciones"
                value={formData.cantidadHabitaciones}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label className={styles.label}>Ambientes</Form.Label>
              <Form.Control
                type="number"
                className={styles.inputForm}
                name="cantidadAmbientes"
                value={formData.cantidadAmbientes}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label className={styles.label}>Baños</Form.Label>
              <Form.Control
                type="number"
                className={styles.inputForm}
                name="cantidadBanos"
                value={formData.cantidadBanos}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Group>
              <Form.Label className={styles.label}>Tipo Operación</Form.Label>
              <Form.Select
                className={styles.inputForm}
                name="tipoOperacion"
                value={formData.tipoOperacion}
                onChange={handleChange}
              >
                <option value="VENTA">Venta</option>
                <option value="ALQUILER">Alquiler</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label className={styles.label}>Tipo Propiedad</Form.Label>
              <Form.Select
                className={styles.inputForm}
                name="tipoPropiedad"
                value={formData.tipoPropiedad}
                onChange={handleChange}
              >
                <option value="CASA">Casa</option>
                <option value="DEPARTAMENTO">Departamento</option>
                <option value="TERRENO">Terreno</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label className={styles.label}>Estado</Form.Label>
              <Form.Select
                className={styles.inputForm}
                name="estado"
                value={formData.estado}
                onChange={handleChange}
              >
                <option value="DISPONIBLE">Disponible</option>
                <option value="VENDIDO">Vendido</option>
                <option value="ALQUILADO">Alquilado</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
      </div>

      <div className={styles.formColumn}>
        <h5 className={styles.formSubtitle}>Dirección</h5>
        <Row className="mb-3">
          <Col>
            <Form.Group>
              <Form.Label className={styles.label}>Calle</Form.Label>
              <Form.Control
                className={styles.inputForm}
                name="calle"
                value={formData.direccion?.calle || ""}
                onChange={handleDireccionChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label className={styles.label}>Número</Form.Label>
              <Form.Control
                className={styles.inputForm}
                name="numeracion"
                value={formData.direccion?.numeracion || ""}
                onChange={handleDireccionChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label className={styles.label}>Ciudad</Form.Label>
              <Form.Control
                className={styles.inputForm}
                name="ciudad"
                value={formData.direccion?.ciudad || ""}
                onChange={handleDireccionChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Group>
              <Form.Label className={styles.label}>Provincia</Form.Label>
              <Form.Control
                className={styles.inputForm}
                name="provincia"
                value={formData.direccion?.provincia || ""}
                onChange={handleDireccionChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label className={styles.label}>País</Form.Label>
              <Form.Control
                className={styles.inputForm}
                name="pais"
                value={formData.direccion?.pais || ""}
                onChange={handleDireccionChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label className={styles.label}>Código Postal</Form.Label>
              <Form.Control
                className={styles.inputForm}
                name="codPostal"
                value={formData.direccion?.codPostal || ""}
                onChange={handleDireccionChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <h5 className={styles.formSubtitle}>Imagenes</h5>
          <Form.Control
            type="text"
            className={styles.inputForm}
            onChange={handleImagenesChange}
          />
          {formData.imagenes && formData.imagenes.length > 0 && (
            <div className={styles.imagePreviewContainer}>
              {formData.imagenes.map((img) => (
                <img
                  key={img.id}
                  src={img.url}
                  alt="preview"
                  className={styles.imagePreview}
                />
              ))}
            </div>
          )}
        </Form.Group>

        <Button type="submit" className={styles.saveProperty}>
          Agregar Propiedad
        </Button>
      </div>
    </Form>
  );
};
