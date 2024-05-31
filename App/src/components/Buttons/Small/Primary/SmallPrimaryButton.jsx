import React from "react";
import { Link } from "react-router-dom";
import style from "./SmallPrimaryButton.module.css";

const SmallPrimaryButton = ({ label, isHovered, to }) => {
  const buttonStyle = isHovered
    ? {
        backgroundColor: "#ff293b",
        color: "#FDFBFA",
      }
    : {};

  return (
    <Link to={to} className={style.btn} style={buttonStyle}>
      <span>{label}</span>
    </Link>
  );
};

export default SmallPrimaryButton;
