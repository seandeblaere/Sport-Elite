import { useState } from "react";
import "./App.css";
import ProductCard from "./components/Cards/Products/ProductCard";

function App() {
  return (
    <>
      <ProductCard
        imageUrl="https://playitagainsports.imgix.net/images/11733-PEN233202-1?auto=compress,format&fit=clip&w=800"
        link="#"
        name="tennis"
        price="200"
      />
    </>
  );
}

export default App;
