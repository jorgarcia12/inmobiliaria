import { useEffect, useState } from "react";
import type { IPropiedad } from "../../types/IPropiedad";
import styles from "./Property.module.css";
import { Button, Carousel } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { propiedadService } from "../../services/propiedadService";
import {
  HouseIcon,
  Share2,
  BedDouble,
  Bath,
  Ruler,
  Home,
  Car,
  Check,
} from "lucide-react";
import ApartmentIcon from "@mui/icons-material/Apartment";
import PoolIcon from "@mui/icons-material/Pool";
import { WhatsApp } from "@mui/icons-material";
import { tipoPropiedadDisplay } from "../../types/tipoPropiedadDisplay";
import { FullscreenGallery } from "../../components/UI/FullScreenGallery/FullScreenGallery";

export const Property = () => {
  const { slug } = useParams<{ slug: string }>();
  const numeroTelefono = import.meta.env.VITE_CONTACT_PHONE;

  const [propiedad, setPropiedad] = useState<IPropiedad | null>(null);
  const [loading, setLoading] = useState(true);

  // 👇 estado exclusivo del fullscreen
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const id = slug ? Number(slug.split("-").pop()) : null;

  const precioFormateado =
    propiedad?.precio != null
      ? `$${propiedad.divisa === "USD" ? "USD" : "ARS"} ${new Intl.NumberFormat(
          "es-AR",
          { minimumFractionDigits: 0 }
        ).format(propiedad.precio)}`
      : "Consultar";

  const handleConsulta = () => {
    const urlPropiedad = window.location.href;

    const mensaje = `Hola, estoy interesado en la propiedad: ${propiedad?.titulo} (${precioFormateado}).

Publicacion: ${urlPropiedad}`;

    window.open(
      `https://wa.me/${numeroTelefono}?text=${encodeURIComponent(mensaje)}`,
      "_blank"
    );
  };

  const handleShare = async () => {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: propiedad?.titulo,
          text: "Mirá esta propiedad",
          url,
        });
      } catch (err) {
        console.error("Error al compartir", err);
      }
    } else {
      await navigator.clipboard.writeText(url);
      alert("Link copiado al portapapeles");
    }
  };

  const openGallery = (index: number) => {
    setGalleryIndex(index);
    setGalleryOpen(true);
    document.body.style.overflow = "hidden";
  };

  useEffect(() => {
    if (!id || Number.isNaN(id)) {
      setLoading(false);
      return;
    }

    propiedadService
      .getPropertyById(id)
      .then(setPropiedad)
      .catch((err) => {
        console.error("Error al cargar la propiedad", err);
        setPropiedad(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Cargando propiedad...</p>;
  if (!propiedad) return <p>Propiedad no encontrada</p>;

  return (
    <div className={styles.propertyContainer}>
      <div className={styles.mainInfoContainer}>
        <div className={styles.propTitle}>
          <h1>{propiedad.titulo}</h1>
        </div>

        <div className={styles.carouselContainer}>
          <Carousel>
            {propiedad.imagenes.length > 0 ? (
              propiedad.imagenes.map((img, index) => (
                <Carousel.Item key={img.id}>
                  <img
                    className={styles.propertyInfoImg}
                    src={img.url}
                    alt={propiedad.titulo}
                    onClick={() => openGallery(index)}
                  />
                </Carousel.Item>
              ))
            ) : (
              <p>Sin imágenes disponibles</p>
            )}
          </Carousel>
        </div>

        <div className={styles.amenitiesContainer}>
          <div className={styles.price}>{precioFormateado}</div>

          <div className={styles.amenities}>
            <span>
              <HouseIcon size={18} />
              {tipoPropiedadDisplay[propiedad.tipoPropiedad] || "-"}
            </span>

            <span>
              <ApartmentIcon fontSize="small" />
              {propiedad.tipoOperacion || "-"}
            </span>

            <span>
              <Ruler size={18} />
              <strong>{propiedad.supCubierta ?? 0}</strong> m² cubiertos
            </span>

            <span>
              <Ruler size={18} />
              <strong>{propiedad.supTotal}</strong> m² totales
            </span>

            <span>
              <BedDouble size={18} />
              <strong>{propiedad.cantidadHabitaciones ?? 0}</strong> hab
            </span>

            <span>
              <Bath size={18} />
              <strong>{propiedad.cantidadBanos ?? 0}</strong> baños
            </span>

            <div className={styles.propertyExtras}>
              {propiedad.cochera && (
                <span>
                  <Car size={18} /> Cochera
                </span>
              )}
              {propiedad.patio && (
                <span>
                  <Home size={18} /> Patio
                </span>
              )}
              {propiedad.amoblado && (
                <span>
                  <Check size={18} /> Amoblado
                </span>
              )}
              {propiedad.permuta && (
                <span>
                  <Check size={18} /> Permuta
                </span>
              )}
              {propiedad.aptProf && (
                <span>
                  <Check size={18} /> Apto Prof.
                </span>
              )}
              {propiedad.barrioPriv && (
                <span>
                  <Check size={18} /> Barrio Privado
                </span>
              )}
              {propiedad.servicios && (
                <span>
                  <Check size={18} /> Servicios
                </span>
              )}
              {propiedad.pileta && (
                <span>
                  <PoolIcon /> Pileta
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.descMapContainer}>
        <div className={styles.shareContainer}>
          <button className={styles.shareButton} onClick={handleShare}>
            <Share2 size={18} />
            Compartir propiedad
          </button>
        </div>

        <div className={styles.propDescription}>{propiedad.descripcion}</div>

        <div className={styles.mapContainer}>
          <iframe
            title="Mapa de la propiedad"
            width="100%"
            height="100%"
            loading="lazy"
            style={{ border: 0 }}
            src={`https://maps.google.com/maps?q=${encodeURIComponent(
              `${propiedad.direccion.calle} ${propiedad.direccion.numeracion}, ${propiedad.direccion.ciudad}, ${propiedad.direccion.provincia}, ${propiedad.direccion.pais}`
            )}&z=15&output=embed`}
          />
        </div>

        <Button
          variant="dark"
          className={styles.propConsulta}
          onClick={handleConsulta}
        >
          <span className={styles.buttonText}>Consultar</span>
          <WhatsApp className={styles.whatsappIcon} />
        </Button>
      </div>

      {galleryOpen && (
        <FullscreenGallery
          images={propiedad.imagenes}
          startIndex={galleryIndex}
          onClose={() => {
            setGalleryOpen(false);
            document.body.style.overflow = "auto";
          }}
        />
      )}
    </div>
  );
};
