import React from "react";
import { Link } from "react-router-dom";
import style from "./BigSecondaryButton.module.css";

const BigSecondaryButton = ({ to, label }) => {
  return (
    <Link to={to} className={style.btn}>
      {label}
    </Link>
  );
};

export default BigSecondaryButton;
