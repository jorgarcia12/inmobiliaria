import { useEffect, useRef, useState } from "react";
import styles from "./FullscreenGallery.module.css";

interface Props {
  images: { url: string }[];
  startIndex: number;
  onClose: () => void;
}

export const FullscreenGallery = ({
  images,
  startIndex,
  onClose,
}: Props) => {
  const [index, setIndex] = useState(startIndex);
  const startX = useRef<number | null>(null);

  const prev = () =>
    setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () =>
    setIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  /* Teclado */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "auto";
    };
  }, []);

  /* Touch */
  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (startX.current === null) return;
    const diff = startX.current - e.changedTouches[0].clientX;
    if (diff > 50) next();
    if (diff < -50) prev();
    startX.current = null;
  };

  return (
    <div className={styles.overlay}>
      <button className={styles.close} onClick={onClose}>
        ✕
      </button>

      {/* Desktop arrows */}
      <button className={styles.left} onClick={prev}>
        ‹
      </button>

      <div
        className={styles.slider}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {images.map((img, i) => (
          <div key={i} className={styles.slide}>
            <img src={img.url} alt={`Imagen ${i + 1}`} />
          </div>
        ))}
      </div>

      <button className={styles.right} onClick={next}>
        ›
      </button>

      <div className={styles.counter}>
        {index + 1} / {images.length}
      </div>
    </div>
  );
};
