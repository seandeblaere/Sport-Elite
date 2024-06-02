import React from "react";
import { Link } from "react-router-dom";
import style from "./BigPrimaryButton.module.css";

interface BigPrimaryButtonProps {
  to: string;
  label: string;
}

const BigPrimaryButton: React.FC<BigPrimaryButtonProps> = ({ to, label }) => {
  return (
    <Link to={to} className={style.btn}>
      {label}
    </Link>
  );
};

export default BigPrimaryButton;
