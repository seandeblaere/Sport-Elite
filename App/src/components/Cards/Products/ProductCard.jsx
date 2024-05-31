import React from "react";
import style from "./ProductCard.module.css";
import { Link } from "react-router-dom";

const ProductCard = ({ imageUrl, link, name, price }) => {
  return (
    <Link to={link} className={style["card-link"]}>
      <div className={style.card}>
        <div className={style["image-container"]}>
          <img src={imageUrl} alt="Image" className={style["card-image"]} />
        </div>
        <div className={style["text-wrapper"]}>
          <h4>{name}</h4>
          <p>€{price}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
