import React, { useState, useEffect } from "react";
import styles from "./FilterColumn.module.css";
import { Slider, Typography } from "@mui/material";
import { Button } from "react-bootstrap";
import type { FiltrosPropiedad } from "../../../types/FiltrosPropiedad";
import { SearchInput } from "./Filters/SearchInput";
import { SelectFilter } from "./Filters/SelectFilter";
import { CheckboxFilter } from "./Filters/CheckboxFilter";
import { Menu } from "lucide-react";

interface FilterColumnProps {
  filters: FiltrosPropiedad;
  setFilters: React.Dispatch<React.SetStateAction<FiltrosPropiedad>>;
}

export const FilterColumn = ({ filters, setFilters }: FilterColumnProps) => {
  const [localFilters, setLocalFilters] = useState<FiltrosPropiedad>({
    ...filters,
  });
  const [precioRange, setPrecioRange] = useState<number[]>([
    filters.precio_min || 0,
    filters.precio_max || 1000000,
  ]);
  const [open, setOpen] = useState(false); // para el menú hamburguesa

  useEffect(() => {
    setLocalFilters({ ...filters });
    setPrecioRange([filters.precio_min || 0, filters.precio_max || 1000000]);
  }, [filters]);

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setLocalFilters((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : ["habitaciones", "ambientes", "banos"].includes(name)
          ? parseInt(value) || undefined
          : value,
    }));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalFilters((prev) => ({ ...prev, search: e.target.value }));
  };

  const handlePrecioChange = (event: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      setPrecioRange(newValue);
      setLocalFilters((prev) => ({
        ...prev,
        precio_min: newValue[0],
        precio_max: newValue[1],
      }));
    }
  };

  const aplicarFiltros = () => setFilters({ ...localFilters });

  const resetearFiltros = () => {
    const reset: FiltrosPropiedad = {
      search: "",
      habitaciones: undefined,
      ambientes: undefined,
      banos: undefined,
      tipo_propiedad: "",
      tipo_operacion: "",
      precio_min: 0,
      precio_max: 1000000,
      barriopriv: false,
      patio: false,
      cochera: false,
      permuta: false,
      servicios: false,
      pileta: false,
      amoblado: false,
      apt_prof: false,
    };
    setLocalFilters(reset);
    setFilters(reset);
    setPrecioRange([0, 1000000]);
  };

  return (
    <>
      {/* Botón hamburguesa solo visible en mobile */}
      <Button
        variant="light"
        className={styles.hamburgerButton}
        onClick={() => setOpen(!open)}
      >
        <Menu size={24} />
      </Button>

      {/* Panel lateral */}
      <div
        className={`${styles.filterColumnWrapper} ${open ? styles.open : ""}`}
      >
        <h3>Refina tu Búsqueda</h3>

        <SearchInput
          value={localFilters.search || ""}
          onChange={handleSearchChange}
        />

        <div className={styles.actionButtons}>
          <Button className={styles.buttonFilters} onClick={aplicarFiltros}>
            Aplicar filtros
          </Button>
          <Button variant="dark" onClick={resetearFiltros} className="ms-2">
            Resetear filtros
          </Button>
        </div>

        <div className={styles.filtersContainer}>
          <div className={styles.selectContainer}>
            <SelectFilter
              name="habitaciones"
              placeholder="Habitaciones"
              options={["1", "2", "3", "4", "5", "6"]}
              value={localFilters.habitaciones}
              onChange={handleFilterChange}
            />
            <SelectFilter
              name="ambientes"
              placeholder="Ambientes"
              options={["1", "2", "3", "4"]}
              value={localFilters.ambientes}
              onChange={handleFilterChange}
            />
            <SelectFilter
              name="banos"
              placeholder="Baños"
              options={["1", "2", "3"]}
              value={localFilters.banos}
              onChange={handleFilterChange}
            />
            <SelectFilter
              name="tipo_propiedad"
              placeholder="Tipo de Propiedad"
              options={["casa", "dpto", "terreno", "local comercial", "galpon"]}
              value={localFilters.tipo_propiedad}
              onChange={handleFilterChange}
            />
            <SelectFilter
              name="tipo_operacion"
              placeholder="Tipo de Operacion"
              options={["venta", "alquiler", "ambos"]}
              value={localFilters.tipo_operacion}
              onChange={handleFilterChange}
            />

            <Typography gutterBottom>Precio</Typography>
            <Slider
              value={precioRange}
              onChange={handlePrecioChange}
              valueLabelDisplay="auto"
              min={0}
              max={1000000}
              step={10000}
            />
          </div>

          <div className={styles.checkboxContainer}>
            <CheckboxFilter
              label="Barrio privado"
              name="barriopriv"
              checked={!!localFilters.barriopriv}
              onChange={handleFilterChange}
            />
            <CheckboxFilter
              label="Patio"
              name="patio"
              checked={!!localFilters.patio}
              onChange={handleFilterChange}
            />
            <CheckboxFilter
              label="Cochera"
              name="cochera"
              checked={!!localFilters.cochera}
              onChange={handleFilterChange}
            />
            <CheckboxFilter
              label="Recibe Permuta"
              name="permuta"
              checked={!!localFilters.permuta}
              onChange={handleFilterChange}
            />
            <CheckboxFilter
              label="Servicios"
              name="servicios"
              checked={!!localFilters.servicios}
              onChange={handleFilterChange}
            />
            <CheckboxFilter
              label="Pileta"
              name="pileta"
              checked={!!localFilters.pileta}
              onChange={handleFilterChange}
            />
            <CheckboxFilter
              label="Amoblado"
              name="amoblado"
              checked={!!localFilters.amoblado}
              onChange={handleFilterChange}
            />
            <CheckboxFilter
              label="Apto Profesional"
              name="apt_prof"
              checked={!!localFilters.apt_prof}
              onChange={handleFilterChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};
