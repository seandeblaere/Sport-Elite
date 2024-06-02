import React from "react";
import useFetch from "../../../hooks/useFetch";
import { getProducts } from "../../../core/modules/products/products.api";
import ProductCard from "../../../components/Design/Cards/Products/ProductCard";
import useStores from "../../../hooks/useStores";

const Products = () => {
  const { productStore } = useStores();
  const { isLoading, data, error } = useFetch(
    getProducts,
    productStore.products.length > 0 ? productStore.products : null
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Products</h1>
      <div>
        {data && data.length > 0 ? (
          data.map((product) => (
            <ProductCard
              key={product._id}
              imageUrl={product.imageUrl}
              link={`/products/${product._id}`}
              name={product.name}
              price={product.price}
            />
          ))
        ) : (
          <div>No products available</div>
        )}
      </div>
    </div>
  );
};

export default Products;
