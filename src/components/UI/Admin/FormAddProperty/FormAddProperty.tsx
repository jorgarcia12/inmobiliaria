import { useState, type ChangeEvent, type FC, type FormEvent } from "react";
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
import { ChevronLeft, Star, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { imagenPropiedadService } from "../../../../services/imagenPropiedadService";

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

  const extras = [
    { key: "patio", label: "Patio" },
    { key: "cochera", label: "Cochera" },
    { key: "permuta", label: "Permuta" },
    { key: "servicios", label: "Servicios" },
    { key: "amoblado", label: "Amoblado" },
    { key: "pileta", label: "Pileta" },
    { key: "aptProf", label: "Apto Profesional" },
    { key: "barrioPriv", label: "Barrio Privado" },
  ];

  const [formData, setFormData] = useState<IPropiedad>(
    propiedadInicial
      ? {
          ...propiedadInicial,
          patio: !!propiedadInicial.patio,
          cochera: !!propiedadInicial.cochera,
          permuta: !!propiedadInicial.permuta,
          servicios: !!propiedadInicial.servicios,
          amoblado: !!propiedadInicial.amoblado,
          pileta: !!propiedadInicial.pileta,
          aptProf: !!propiedadInicial.aptProf,
          barrioPriv: !!propiedadInicial.barrioPriv,
        }
      : {
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
      toast.error("Error al subir imágenes");
    }
  };

  const handleEliminarImagen = async (id: number, index: number) => {
    try {
      await imagenPropiedadService.delete(id);
      setFormData((prev) => ({
        ...prev,
        imagenes: prev.imagenes.filter((_, i) => i !== index),
      }));
      toast.success("Imagen eliminada correctamente!");
    } catch (error) {
      console.log("Error al elminar la imagen", error);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.titulo.trim()) {
      toast.error("El título es obligatorio");
      return;
    }

    if (!formData.descripcion.trim()) {
      toast.error("La descripción es obligatoria");
      return;
    }

    if (!formData.precio || formData.precio <= 0) {
      toast.error("Debe ingresar un precio válido");
      return;
    }

    if (!formData.direccion.calle.trim() || !formData.direccion.ciudad.trim()) {
      toast.error("Debe completar al menos calle y ciudad");
      return;
    }
    if (formData.supTotal < formData.supCubierta) {
      toast.error("La superficie total no puede ser menor que la cubierta");
      return;
    }

    try {
      await onSubmit(formData);
      navigate("/admin");
      toast.success("Propiedad guardada!");
    } catch (error) {
      console.error("Error al guardar propiedad:", error);
      toast.error("Error al guardar propiedad");
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
        <Button
          type="button"
          variant="secondary"
          className={styles.backButton}
          onClick={() => navigate(-1)} // vuelve a la pantalla anterior
        >
          <ChevronLeft size={18}/>
          Volver atrás
        </Button>
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

          {/* CHECKBOX */}
          <Form.Group className="mb-3">
            <h5 className={styles.formSubtitle}>Extras</h5>
            <div className={styles.extrasContainer}>
              {extras.map(({ key, label }) => (
                <Form.Check
                  key={key}
                  type="checkbox"
                  label={label}
                  name={key}
                  checked={formData[key as keyof IPropiedad] as boolean}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      [key]: e.target.checked,
                    }))
                  }
                />
              ))}
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
                  {/* Eliminar imagen */}
                  <button
                    type="button"
                    className={styles.deleteImageBtn}
                    onClick={() => handleEliminarImagen(img.id!, index)}
                  >
                    <Trash2 />
                  </button>
                  {/* Setear imagen como principal */}
                  <button
                    type="button"
                    className={`${styles.starImageBtn} ${
                      index === 0 ? styles.starActive : ""
                    }`}
                    onClick={() => {
                      if (index !== 0) {
                        setFormData((prev) => {
                          const newImages = [...prev.imagenes];
                          const [selected] = newImages.splice(index, 1);
                          newImages.unshift(selected);
                          return { ...prev, imagenes: newImages };
                        });
                        toast.success("Imagen seleccionada como portada!");
                      }
                    }}
                  >
                    <Star />
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
