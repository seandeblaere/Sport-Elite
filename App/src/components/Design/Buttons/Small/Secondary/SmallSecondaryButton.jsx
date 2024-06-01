import React from "react";
import { Link } from "react-router-dom";
import style from "./SmallSecondaryButton.module.css";

const SmallSecondaryButton = ({ to, label }) => {
  return (
    <Link to={to} className={style.btn}>
      <span>{label}</span>
    </Link>
  );
};

export default SmallSecondaryButton;
