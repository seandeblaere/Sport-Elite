import React from "react";
import style from "./Dropdown.module.css";

interface DropdownProps {
  categories: string[];
  onChange: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ categories, onChange }) => {
  return (
    <select
      className={style.dropdown}
      onChange={(e) => onChange(e.target.value)}
    >
      {categories.map((category, index) => (
        <option key={index} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
