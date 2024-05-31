import React from "react";
import style from "./Dropdown.module.css";

const Dropdown = ({ categories, onChange }) => {
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
