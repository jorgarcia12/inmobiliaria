import React from "react";
import { Button } from "react-bootstrap";
import { Search } from "lucide-react";
import styles from "../FilterColumn.module.css";

interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SearchInput = ({ value, onChange }: SearchInputProps) => (
  <div className={styles.searchFilter}>
    <input
      type="text"
      value={value}
      placeholder="Buscar Ubicacion"
      onChange={onChange}
      className={styles.searchInput}
    />
    <Button className={styles.searchbutton}>
      <Search size={20} className={styles.filterButton} />
    </Button>
  </div>
);
