import { useState, useEffect } from "react";
import styles from "./FilterColumn.module.css";
import { Button } from "react-bootstrap";
import { ListFilter, Search } from "lucide-react";
import { Switch } from "@mui/material";
import axios from "axios";

// Tipado de filtros
interface FilterOption {
  id: string;
  label: string;
  type: "select" | "checkbox";
  options?: string[]; // solo para select
}

interface FilterColumnProps {
  apiEndpoint?: string; // opcional: endpoint para traer filtros dinámicos
}

export const FilterColumn = ({ apiEndpoint }: FilterColumnProps) => {
  const [formValue, setFormValue] = useState<string>("");
  const [filters, setFilters] = useState<Record<string, string | boolean>>({});
  const [filterOptions, setFilterOptions] = useState<FilterOption[]>([]);

  // Traer filtros del backend si se pasa endpoint
  useEffect(() => {
    const fetchFilters = async () => {
      if (!apiEndpoint) return;
      try {
        const { data } = await axios.get<FilterOption[]>(apiEndpoint);
        setFilterOptions(data);
      } catch (error) {
        console.error("Error fetching filters:", error);
      }
    };

    fetchFilters();
  }, [apiEndpoint]);

  // Handler para selects y inputs de texto
  const handleFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const target = e.target;

    if (target instanceof HTMLInputElement) {
      // Para inputs (checkbox o texto)
      const { name, type, value, checked } = target;
      setFilters((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    } else if (target instanceof HTMLSelectElement) {
      // Para selects
      const { name, value } = target;
      setFilters((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Handler específico para el Switch (MUI)
  const handleSwitchChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    const name = event.target.name;
    setFilters((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue(e.target.value);
  };

  return (
    <div className={styles.filterColumnContainer}>
      <div className={styles.searchFilter}>
        <form className={styles.searchForm}>
          <input
            type="text"
            value={formValue}
            placeholder="Buscar..."
            onChange={handleSearchChange}
            className={styles.searchInput}
          />
          <Button className={styles.searchbutton}>
            <Search size={20} className={styles.filterButton} />
          </Button>
        </form>
      </div>

      <div className={styles.filterHeader}>
        <h3 className={styles.filterTitle}>
          Filtros <ListFilter />
        </h3>
      </div>

      {filterOptions.map((filter) => (
        <div
          key={filter.id}
          className={`${styles.filterContainer} ${
            filter.type === "checkbox" ? styles.checkboxContainer : ""
          }`}
        >
          <label htmlFor={filter.id}>{filter.label}</label>

          {filter.type === "select" && (
            <select
              name={filter.id}
              id={filter.id}
              value={String(filters[filter.id] || "")} // siempre string
              onChange={handleFilterChange}
              className={styles.selectFilter}
            >
              <option value="">Seleccionar...</option>
              {(Array.isArray(filter.options) ? filter.options : []).map(
                (opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                )
              )}
            </select>
          )}

          {filter.type === "checkbox" && (
            <Switch
              name={filter.id}
              id={filter.id}
              checked={Boolean(filters[filter.id])}
              onChange={handleSwitchChange}
              sx={{
                "& .MuiSwitch-switchBase.Mui-checked": { color: "#003a33" },
                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                  backgroundColor: "#049483ff",
                },
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
};
