import React from "react";
import { Form } from "react-bootstrap";

interface CheckboxFilterProps {
  label: string;
  name: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CheckboxFilter = ({
  label,
  name,
  checked,
  onChange,
}: CheckboxFilterProps) => (
  <Form.Check
    type="checkbox"
    label={label}
    name={name}
    checked={checked}
    onChange={onChange}
  />
);
