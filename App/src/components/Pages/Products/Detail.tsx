import { getProductById } from "../../../core/modules/products/products.api";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Product {
  _id?: string;
  name: string;
  sellerId: string;
  price: number;
  age: string;
  brand: string;
  grip: string;
  weight: string;
  imageUrl: string;
}

const ProductDetail: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getProductById(productId!);
        setProduct(response.data);
        setError(null);
      } catch (error) {
        setError("Failed to fetch product details");
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {};
  }, [productId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <img src={product.imageUrl} alt={product.name} />
      <p>Price: €{product.price}</p>
      <p>Age: {product.age}</p>
      <p>Brand: {product.brand}</p>
      <p>Grip: {product.grip}</p>
      <p>Weight: {product.weight}</p>
    </div>
  );
};

export default ProductDetail;
