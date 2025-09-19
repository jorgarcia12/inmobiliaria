import {
  useState,
  useEffect,
  type ChangeEvent,
  type FC,
  type FormEvent,
} from "react";
import type { IPropiedad } from "../../../../types/IPropiedad";
import type {
  Estado,
  TipoOperacion,
  TipoPropiedad,
} from "../../../../types/enums";
import { Button, Col, Form, Row } from "react-bootstrap";
import styles from "./FormAddProperty.module.css";
import { cloudinaryService } from "../../../../services/cloudinaryService";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { toBool } from "../../../../utils/boolToString";
import { toast } from "react-toastify";

interface IFormAddPropertyProps {
  propiedadInicial?: IPropiedad; // si existe, se está editando
  modo?: "crear" | "editar";
  onSubmit: (propiedad: IPropiedad) => Promise<void>;
}

export const FormAddProperty: FC<IFormAddPropertyProps> = ({
  propiedadInicial,
  modo = "crear",
  onSubmit,
}) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<IPropiedad>(
    propiedadInicial || {
      id: undefined,
      titulo: "",
      descripcion: "",
      precio: 0,
      supCubierta: 0,
      supTotal: 0,
      cantidadHabitaciones: 0,
      cantidadAmbientes: 0,
      cantidadBanos: 0,
      estado: "DISPONIBLE",
      tipoOperacion: "VENTA",
      tipoPropiedad: "CASA",
      publicada: false,
      patio: false,
      cochera: false,
      permuta: false,
      servicios: false,
      amoblado: false,
      pileta: false,
      aptProf: false,
      barrioPriv: false,
      direccion: {
        calle: "",
        numeracion: "",
        ciudad: "",
        provincia: "",
        pais: "",
      },
      imagenes: [],
    }
  );

  useEffect(() => {
    if (propiedadInicial) {
      setFormData({
        ...propiedadInicial,
        patio: toBool(propiedadInicial.patio),
        cochera: toBool(propiedadInicial.cochera),
        permuta: toBool(propiedadInicial.permuta),
        servicios: toBool(propiedadInicial.servicios),
        amoblado: toBool(propiedadInicial.amoblado),
        pileta: toBool(propiedadInicial.pileta),
        aptProf: toBool(propiedadInicial.aptProf),
        barrioPriv: toBool(propiedadInicial.barrioPriv),
      });
    }
  }, [propiedadInicial]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDireccionChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      direccion: { ...prev.direccion, [name]: value },
    }));
  };

  const handleImagenesChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);
    try {
      const uploadedImages = await Promise.all(
        files.map(async (file) => {
          const data = await cloudinaryService.uploadImage(file);
          return { url: data.url };
        })
      );

      setFormData((prev) => ({
        ...prev,
        imagenes: [...prev.imagenes, ...uploadedImages],
      }));
    } catch (error) {
      console.error("Error al subir imagenes:", error);
      alert("Error al subir imágenes");
    }
  };

  const handleEliminarImagen = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      imagenes: prev.imagenes.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.titulo || !formData.descripcion) return;

    try {
      await onSubmit(formData);
      // enviar al backend
      navigate("/admin"); // redirigir después de crear/editar
      toast.success("Propiedad guardada!");
    } catch (error) {
      console.error("Error al guardar propiedad:", error);
      alert("Error al guardar propiedad");
    }

    if (modo === "crear") {
      setFormData({
        id: undefined,
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
        publicada: false,
        patio: false,
        cochera: false,
        permuta: false,
        servicios: false,
        amoblado: false,
        pileta: false,
        aptProf: false,
        barrioPriv: false,
        direccion: {
          calle: "",
          numeracion: "",
          ciudad: "",
          provincia: "",
          pais: "",
        },
        imagenes: [],
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit} className={styles.formContainer}>
      {/* Columna izquierda */}
      <div className={styles.formColumn}>
        <Form.Group className="mb-3">
          <h5 className={styles.formSubtitle}>Información</h5>
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

        <h5 className={styles.formSubtitle}>Características</h5>
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
                <option value="AMBOS">Ambos</option>
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
                <option value="LOCAL_COMERCIAL">Local Comercial</option>
                <option value="GALPON">Galpón</option>
              </Form.Select>
            </Form.Group>
          </Col>

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
              <option value="RESERVADO">Reservado</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <h5 className={styles.formSubtitle}>Extras</h5>
            <div className={styles.extrasContainer}>
              <Form.Check
                type="checkbox"
                label="Patio"
                name="patio"
                checked={!!formData.patio || false}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    patio: e.target.checked,
                  }))
                }
              />

              <Form.Check
                type="checkbox"
                label="Cochera"
                name="cochera"
                checked={!!formData.cochera || false}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    cochera: e.target.checked,
                  }))
                }
              />
              <Form.Check
                type="checkbox"
                label="Permuta"
                name="permuta"
                checked={!!formData.permuta || false}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    permuta: e.target.checked,
                  }))
                }
              />
              <Form.Check
                type="checkbox"
                label="Servicios"
                name="servicios"
                checked={!!formData.servicios || false}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    servicios: e.target.checked,
                  }))
                }
              />
              <Form.Check
                type="checkbox"
                label="Amoblado"
                name="amoblado"
                checked={!!formData.amoblado || false}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    amoblado: e.target.checked,
                  }))
                }
              />
              <Form.Check
                type="checkbox"
                label="Pileta"
                name="pileta"
                checked={!!formData.pileta || false}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    pileta: e.target.checked,
                  }))
                }
              />
              <Form.Check
                type="checkbox"
                label="Apto Profesional"
                name="aptProf"
                checked={!!formData.aptProf || false}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    aptProf: e.target.checked,
                  }))
                }
              />
              <Form.Check
                type="checkbox"
                label="Barrio Privado"
                name="barrioPriv"
                checked={!!formData.barrioPriv || false}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    barrioPriv: e.target.checked,
                  }))
                }
              />
            </div>
          </Form.Group>
        </Row>
      </div>

      {/* Columna derecha */}
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
          <Col></Col>
        </Row>

        {/* CREACION DE MAPA DE GOOGLE MAPS */}
        {formData.direccion && (
          <div
            style={{
              marginTop: "20px",
              width: "100%",
              height: "300px",
              cursor: "pointer",
              border: "1px solid #ccc",
              borderRadius: "8px",
              overflow: "hidden",
            }}
            onClick={() => {
              const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                `${formData.direccion.calle} ${formData.direccion.numeracion}, ${formData.direccion.ciudad}, ${formData.direccion.provincia}, ${formData.direccion.pais}`
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
                `${formData.direccion.calle} ${formData.direccion.numeracion}, ${formData.direccion.ciudad}, ${formData.direccion.provincia}, ${formData.direccion.pais}`
              )}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
            ></iframe>
          </div>
        )}

        <Form.Group className="mb-3">
          <h5 className={styles.formSubtitle}>Imágenes</h5>
          <Form.Control
            type="file"
            className={styles.inputForm}
            onChange={handleImagenesChange}
            multiple
          />
          {formData.imagenes && formData.imagenes.length > 0 && (
            <div className={styles.imagePreviewContainer}>
              {formData.imagenes.map((img, index) => (
                <div key={index} className={styles.imageWrapper}>
                  <img
                    src={img.url}
                    alt="preview"
                    className={styles.imagePreview}
                  />
                  <button
                    type="button"
                    className={styles.deleteImageBtn}
                    onClick={() => handleEliminarImagen(index)}
                  >
                    <X />
                  </button>
                </div>
              ))}
            </div>
          )}
        </Form.Group>

        <Button type="submit" className={styles.saveProperty}>
          {modo === "editar" ? "Actualizar Propiedad" : "Agregar Propiedad"}
        </Button>
      </div>
    </Form>
  );
};
