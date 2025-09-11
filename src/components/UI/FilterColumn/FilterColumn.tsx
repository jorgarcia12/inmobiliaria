import { useState, useEffect } from "react";
import styles from "./FilterColumn.module.css";
import { Button } from "react-bootstrap";
import { ListFilter, Search, X } from "lucide-react";
import { Switch } from "@mui/material";
import axios from "axios";

interface FilterOption {
  id: string;
  label: string;
  type: "select" | "checkbox";
  options?: string[];
}

interface FilterColumnProps {
  apiEndpoint?: string;
  logo?: string;
}

export const FilterColumn = ({ apiEndpoint, logo }: FilterColumnProps) => {
  const [formValue, setFormValue] = useState("");
  const [filters, setFilters] = useState<Record<string, string | boolean>>({});
  const [filterOptions, setFilterOptions] = useState<FilterOption[]>([]);
  const [isOpen, setIsOpen] = useState(false);

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

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target;
    if (target instanceof HTMLInputElement) {
      const { name, type, value, checked } = target;
      setFilters((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    } else {
      setFilters((prev) => ({ ...prev, [target.name]: target.value }));
    }
  };

  const handleSwitchChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    setFilters((prev) => ({ ...prev, [event.target.name]: checked }));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormValue(e.target.value);

  return (
    <div className={styles.filterColumnWrapper}>
      {/* Botón hamburguesa mobile */}
      <div
        className={styles.hamburgerButton}
        onClick={() => setIsOpen(!isOpen)}
      >
        {logo && <img src={logo} alt="Logo" className={styles.hamburgerLogo} />}
        <span>Filtros</span>
        {isOpen ? <X size={20} /> : <ListFilter size={20} />}
      </div>

      {/* Contenedor de filtros */}
      <div
        className={`${styles.filterColumnContainer} ${
          isOpen ? styles.open : ""
        }`}
      >
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
                value={String(filters[filter.id] || "")}
                onChange={handleFilterChange}
                className={styles.selectFilter}
              >
                <option value="">Seleccionar...</option>
                {(filter.options || []).map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
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
    </div>
  );
};
