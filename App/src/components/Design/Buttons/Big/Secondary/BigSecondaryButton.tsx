import React from "react";
import { Link } from "react-router-dom";
import style from "./BigSecondaryButton.module.css";

interface BigSecondaryButtonProps {
  to: string;
  label: string;
}

const BigSecondaryButton: React.FC<BigSecondaryButtonProps> = ({
  to,
  label,
}) => {
  return (
    <Link to={to} className={style.btn}>
      {label}
    </Link>
  );
};

export default BigSecondaryButton;
