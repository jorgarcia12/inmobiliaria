import React from "react";
import styles from "../FilterColumn.module.css";

interface SelectFilterProps {
  name: string;
  placeholder: string;
  options: string[];
  value: string | number | undefined;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const SelectFilter = ({
  name,
  placeholder,
  options,
  value,
  onChange,
}: SelectFilterProps) => (
  <select
    name={name}
    value={value || ""}
    onChange={onChange}
    className={styles.selectFilter}
  >
    <option value="">{placeholder}</option>
    {options.map((opt) => (
      <option key={opt} value={opt}>
        {opt}
      </option>
    ))}
  </select>
);
